import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

test("module shortcuts and page sections follow the approved order", async () => {
  const page = await source("app/page.tsx");

  const shortcutOrder = [
    'href="#venoclise"',
    'href="#eletrolitos"',
    'href="#infusoes"',
    'href="#antimicrobianos"',
    'href="#emergencia"',
    'href="#scores"',
    'href="#npt"',
  ];
  const shortcutIndexes = shortcutOrder.map((token) => page.indexOf(token));
  assert.ok(shortcutIndexes.every((index) => index >= 0));
  assert.deepEqual([...shortcutIndexes].sort((a, b) => a - b), shortcutIndexes);

  const sectionOrder = [
    'id="venoclise"',
    'id="eletrolitos"',
    'id="infusoes"',
    'id="antimicrobianos"',
    'id="emergencia"',
    'id="scores"',
    'id="npt"',
  ];
  const sectionIndexes = sectionOrder.map((token) => page.indexOf(token));
  assert.ok(sectionIndexes.every((index) => index >= 0));
  assert.deepEqual([...sectionIndexes].sort((a, b) => a - b), sectionIndexes);

  assert.match(page, /FOLHA DE PARADA \+ PERCENTIL DE PRESSÃO/);
  assert.match(page, /id="pressao"/);
  assert.match(page, /id="folha-parada"/);
  assert.match(page, /useState\("10"\)/);
  assert.match(page, /MEDICAMENTOS DE INFUSÃO CONTÍNUA/);
  assert.match(page, /Via oral · \{ORAL_ANTIBIOTICS.length\} opções/);
  assert.match(page, /<span>06<\/span><b>SCORES CLÍNICOS<\/b>/);
  assert.match(page, /<span>07<\/span><b>NUTRIÇÃO PARENTERAL TOTAL<\/b>/);
  assert.match(page, /MÓDULO 07 · NUTRIÇÃO/);
});

function parseExportedArray(sourceText, exportName) {
  const token = `export const ${exportName}: BloodPressureReference[] = `;
  const tokenIndex = sourceText.indexOf(token);
  assert.ok(tokenIndex >= 0, `missing export ${exportName}`);
  const start = sourceText.indexOf("[", tokenIndex + token.length);
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let index = start; index < sourceText.length; index += 1) {
    const character = sourceText[index];
    if (inString) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') inString = false;
      continue;
    }
    if (character === '"') inString = true;
    else if (character === "[") depth += 1;
    else if (character === "]") {
      depth -= 1;
      if (depth === 0) return JSON.parse(sourceText.slice(start, index + 1));
    }
  }
  throw new Error(`unterminated export ${exportName}`);
}

test("pressure references reproduce the supplied infant, male and female tables", async () => {
  const page = await source("app/page.tsx");
  const emergency = await source("app/EmergencyTools.tsx");
  const data = await source("app/blood-pressure-data.ts");

  const infant = parseExportedArray(data, "INFANT_BLOOD_PRESSURE_REFERENCES");
  const male = parseExportedArray(data, "MALE_BLOOD_PRESSURE_REFERENCES");
  const female = parseExportedArray(data, "FEMALE_BLOOD_PRESSURE_REFERENCES");

  assert.deepEqual(male.map((item) => item.ageYears), Array.from({ length: 18 }, (_, index) => index + 1));
  assert.deepEqual(female.map((item) => item.ageYears), Array.from({ length: 18 }, (_, index) => index + 1));
  assert.equal(infant.length, 15);
  assert.ok([...infant, ...male, ...female].every((item) => Number.isFinite(item.fcLow)));
  assert.ok([...infant, ...male, ...female].every((item) => Number.isFinite(item.fcHigh)));
  assert.ok([...infant, ...male, ...female].every((item) => Number.isFinite(item.frHigh)));

  for (const item of [...infant, ...male, ...female]) {
    assert.deepEqual(Object.keys(item.percentiles), ["P5", "P10", "P50", "P90", "P95"]);
    for (const percentile of Object.values(item.percentiles)) {
      assert.ok(Number.isFinite(percentile.systolic));
      assert.ok(Number.isFinite(percentile.diastolic));
      assert.ok(Number.isFinite(percentile.mean));
    }
  }

  assert.deepEqual(infant[0], {
    id: "1dia",
    label: "1 dia",
    ageDays: 1,
    ageYears: null,
    fcLow: 90,
    fcHigh: 180,
    frHigh: 34,
    percentiles: {
      P5: { systolic: 46, diastolic: 38, mean: 40.7 },
      P10: { systolic: 50, diastolic: 42, mean: 44.7 },
      P50: { systolic: 65, diastolic: 55, mean: 58.3 },
      P90: { systolic: 80, diastolic: 68, mean: 72 },
      P95: { systolic: 84, diastolic: 72, mean: 76 },
    },
  });

  assert.deepEqual(male[0], {
    id: "1ano-masculino",
    label: "1 ano",
    ageDays: 365.25,
    ageYears: 1,
    fcLow: 90,
    fcHigh: 180,
    frHigh: 34,
    percentiles: {
      P5: { systolic: 72, diastolic: 38, mean: 49.3 },
      P10: { systolic: 76, diastolic: 41, mean: 52.7 },
      P50: { systolic: 91, diastolic: 54, mean: 66.3 },
      P90: { systolic: 105, diastolic: 67, mean: 79.7 },
      P95: { systolic: 110, diastolic: 71, mean: 84 },
    },
  });

  assert.deepEqual(female[17], {
    id: "18anos-feminino",
    label: "18 anos",
    ageDays: 6574.5,
    ageYears: 18,
    fcLow: 60,
    fcHigh: 110,
    frHigh: 14,
    percentiles: {
      P5: { systolic: 94, diastolic: 48, mean: 63.3 },
      P10: { systolic: 98, diastolic: 52, mean: 67.3 },
      P50: { systolic: 112, diastolic: 66, mean: 81.3 },
      P90: { systolic: 127, diastolic: 80, mean: 95.7 },
      P95: { systolic: 131, diastolic: 84, mean: 99.7 },
    },
  });

  assert.match(emergency, /P5, P10, P50, P90 e P95/);
  assert.match(emergency, /PAM calculada/);
  assert.match(emergency, /FC de referência/);
  assert.match(emergency, /Limite superior de FR/);
  assert.doesNotMatch(emergency, /Sociedade Brasileira de Pediatria/);
  assert.doesNotMatch(emergency, /estimad/);
  assert.doesNotMatch(emergency, /P95 \+ 12/);
  assert.match(page, /TABELA DE PA · 1 A 18 ANOS/);
  assert.match(page, /PAS, PAD e PAM/);
  assert.match(page, /FC e FR/);
  assert.doesNotMatch(page, /estatura P50/);
  assert.match(page, /useState\("10"\)/);
});


test("pressure and arrest tools expose one-click print actions and print-only layout", async () => {
  const emergency = await source("app/EmergencyTools.tsx");
  const css = await source("app/globals.css");

  assert.match(emergency, /Imprimir percentis de pressão/);
  assert.match(emergency, /Imprimir folha de parada/);
  assert.match(emergency, /window\.print\(\)/);
  assert.match(css, /@media print/);
  assert.match(css, /main > :not\(\.modal-layer\)/);
  assert.match(css, /@page \{ size: A4 portrait/);
  assert.match(css, /\.modal-close, \.print-hidden/);
});

test("continuous infusion drugs are split into the requested clinical categories", async () => {
  const page = await source("app/page.tsx");
  const css = await source("app/globals.css");

  assert.doesNotMatch(page, /Outras drogas/);
  assert.match(page, /Broncodilatadores/);
  assert.match(page, /Diuréticos/);
  assert.match(page, /Anticoagulantes/);
  assert.match(page, /name: "Salbutamol", group: "Broncodilatadores"/);
  assert.match(page, /name: "Sulfato de magnésio", group: "Broncodilatadores"/);
  assert.match(page, /name: "Terbutalina", group: "Broncodilatadores"/);
  assert.match(page, /name: "Furosemida", group: "Diuréticos"/);
  assert.match(page, /name: "Heparina não fracionada", group: "Anticoagulantes"/);
  assert.match(page, /data-group="Diuréticos" onClick=\{\(\) => setActiveTool\(\{ type: "dual" \}\)\}/);
  assert.match(css, /data-group="Broncodilatadores"/);
  assert.match(css, /data-group="Diuréticos"/);
  assert.match(css, /data-group="Anticoagulantes"/);
});

test("IM antimicrobial preparation uses selectable water volume instead of manual mg per mL", async () => {
  const builder = await source("app/AntimicrobialPrescription.tsx");
  const data = await source("app/antimicrobials-data.ts");

  assert.match(builder, /Reconstituição para via IM/);
  assert.match(builder, /\+ \{volume\} mL de água destilada/);
  assert.match(builder, /imProfile\.vialAmount \/ selectedImDiluentVolume/);
  assert.match(builder, /CONCENTRAÇÃO RESULTANTE/);
  assert.match(builder, /VOLUME POR DOSE IM/);
  assert.doesNotMatch(builder, /Concentração final para IM/);
  assert.match(builder, /SEM RECONSTITUIÇÃO/);
  assert.match(data, /kind: "powder", vialAmount: 1000, defaultDiluentVolume: 4, diluentVolumes: \[2, 3, 4\]/);
  assert.match(data, /kind: "solution", stockConcentration: 150/);
});

test("emergency print layouts fit one A4 sheet and omit nonessential PA comparison", async () => {
  const emergency = await source("app/EmergencyTools.tsx");
  const css = await source("app/globals.css");

  assert.doesNotMatch(emergency, /formula-conflict-note/);
  assert.match(css, /height: 287mm/);
  assert.match(css, /\.bp-print-document \.measurement-check \{ display: none !important; \}/);
  assert.match(css, /\.arrest-print-document \.source-note \{ display: none !important; \}/);
  assert.match(css, /\.arrest-print-document \.dose-table th/);
  assert.match(emergency, /print-document bp-print-document/);
  assert.match(emergency, /print-document arrest-print-document/);
});
