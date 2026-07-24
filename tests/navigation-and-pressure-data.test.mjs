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

test("SBP references use height P50 and restore P5/P10 estimates, PAM, FC and FR", async () => {
  const page = await source("app/page.tsx");
  const emergency = await source("app/EmergencyTools.tsx");
  const data = await source("app/blood-pressure-data.ts");

  const infant = parseExportedArray(data, "INFANT_BLOOD_PRESSURE_REFERENCES");
  const male = parseExportedArray(data, "MALE_BLOOD_PRESSURE_REFERENCES");
  const female = parseExportedArray(data, "FEMALE_BLOOD_PRESSURE_REFERENCES");

  assert.deepEqual(male.map((item) => item.ageYears), Array.from({ length: 17 }, (_, index) => index + 1));
  assert.deepEqual(female.map((item) => item.ageYears), Array.from({ length: 17 }, (_, index) => index + 1));
  assert.ok(male.every((item) => Number.isFinite(item.heightP50Cm)));
  assert.ok(female.every((item) => Number.isFinite(item.heightP50Cm)));
  assert.ok(male.every((item) => item.lowerPercentilesEstimated === true));
  assert.ok(female.every((item) => item.lowerPercentilesEstimated === true));
  assert.ok(infant.every((item) => item.lowerPercentilesEstimated === false));

  for (const item of [...male, ...female]) {
    const { P5, P10, P50, P90, P95, P95Plus12 } = item.percentiles;
    assert.equal(P10.systolic, 2 * P50.systolic - P90.systolic);
    assert.equal(P10.diastolic, 2 * P50.diastolic - P90.diastolic);
    assert.equal(P5.systolic, 2 * P50.systolic - P95.systolic);
    assert.equal(P5.diastolic, 2 * P50.diastolic - P95.diastolic);
    for (const percentile of [P5, P10, P50, P90, P95, P95Plus12]) {
      assert.equal(percentile.mean, Math.round(((percentile.systolic + 2 * percentile.diastolic) / 3) * 10) / 10);
    }
    assert.ok(Number.isFinite(item.fcLow));
    assert.ok(Number.isFinite(item.fcHigh));
    assert.ok(Number.isFinite(item.frHigh));
  }

  assert.deepEqual(male[0], {
    id: "1ano-masculino",
    label: "1 ano",
    ageDays: 365.25,
    ageYears: 1,
    heightP50Cm: 82.4,
    fcLow: 90,
    fcHigh: 180,
    frHigh: 34,
    lowerPercentilesEstimated: true,
    percentiles: {
      P5: { systolic: 69, diastolic: 27, mean: 41 },
      P10: { systolic: 72, diastolic: 29, mean: 43.3 },
      P50: { systolic: 86, diastolic: 41, mean: 56 },
      P90: { systolic: 100, diastolic: 53, mean: 68.7 },
      P95: { systolic: 103, diastolic: 55, mean: 71 },
      P95Plus12: { systolic: 115, diastolic: 67, mean: 83 },
    },
  });
  assert.deepEqual(female[16].percentiles, {
    P5: { systolic: 93, diastolic: 51, mean: 65 },
    P10: { systolic: 96, diastolic: 55, mean: 68.7 },
    P50: { systolic: 110, diastolic: 66, mean: 80.7 },
    P90: { systolic: 124, diastolic: 77, mean: 92.7 },
    P95: { systolic: 127, diastolic: 81, mean: 96.3 },
    P95Plus12: { systolic: 139, diastolic: 93, mean: 108.3 },
  });

  assert.match(emergency, /P5, P10, P50, P90, P95/);
  assert.match(emergency, /P5 e P10 estimados/);
  assert.match(emergency, /PAM calculada/);
  assert.match(emergency, /FC de referência/);
  assert.match(emergency, /Limite superior de FR/);
  assert.match(emergency, /Sociedade Brasileira de Pediatria/);
  assert.match(page, /TABELA DE PA · 1 A 17 ANOS/);
  assert.match(page, /PAS, PAD e PAM/);
  assert.match(page, /FC e FR/);
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
  assert.match(css, /@page \{ size: A4 landscape/);
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
  assert.match(css, /height: 199mm/);
  assert.match(css, /\.bp-print-document \.measurement-check \{ display: none !important; \}/);
  assert.match(css, /\.arrest-print-document \.source-note \{ display: none !important; \}/);
  assert.match(css, /\.arrest-print-document \.dose-table th/);
  assert.match(emergency, /print-document bp-print-document/);
  assert.match(emergency, /print-document arrest-print-document/);
});
