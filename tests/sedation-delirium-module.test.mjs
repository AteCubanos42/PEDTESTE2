import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const source = (path) => readFile(new URL(path, root), "utf8");

test("module 09 exposes enteral sedation and delirium calculators", async () => {
  const page = await source("app/page.tsx");
  const data = await source("app/sedation-delirium-data.ts");
  const tool = await source("app/SedationDeliriumTools.tsx");
  const css = await source("app/globals.css");

  assert.match(page, /id="sedacao-delirium"/);
  assert.match(page, /<span>09<\/span><b>SEDAÇÃO ENTERAL \+ DELIRIUM<\/b>/);
  assert.match(page, /MÓDULO 09 · SEDAÇÃO/);
  assert.match(page, /SedationDeliriumCalculator/);

  for (const medication of ["Metadona", "Diazepam", "Lorazepam", "Clonidina", "Morfina", "Hidrato de cloral", "Cetamina VO"]) assert.match(data, new RegExp(medication));
  for (const medication of ["Haloperidol", "Risperidona", "Olanzapina", "Melatonina"]) assert.match(data, new RegExp(medication));

  assert.match(data, /Comprimido 5 mg \+ 5 mL de AD/);
  assert.match(data, /Comprimido 10 mg \+ 10 mL de AD/);
  assert.match(data, /Comprimido 2 mg \+ 2 mL de AD/);
  assert.match(data, /Comprimido 2 mg \+ 5 mL de AD/);
  assert.match(data, /Comprimido 100 mcg \+ 10 mL de AD/);
  assert.match(tool, /Sonda nasogástrica/);
  assert.match(tool, /Texto pronto para copiar|PrescriptionBlock/);
  assert.match(css, /\.sedation-medication-picker/);
});
