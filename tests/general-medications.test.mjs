import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

test("module 08 organizes the requested medication categories", async () => {
  const page = await source("app/page.tsx");
  const data = await source("app/general-medications-data.ts");
  const tool = await source("app/GeneralMedicationTools.tsx");
  const css = await source("app/globals.css");

  for (const category of [
    "Antiparasitários",
    "Analgésicos e antitérmicos",
    "Trato gastrointestinal",
    "Anti-histamínicos",
    "Corticoides",
    "Anafilaxia",
  ]) assert.match(data, new RegExp(category));

  for (const medication of [
    "Albendazol",
    "Nitazoxanida",
    "Dipirona",
    "Paracetamol",
    "Ondansetrona",
    "Loratadina",
    "Prednisolona",
    "Adrenalina na anafilaxia",
  ]) assert.match(data, new RegExp(medication));

  assert.match(data, /0\.01, unit: "mg", maxDose: 0\.5/);
  assert.match(data, /Adrenalina 1 mg\/mL · 1:1\.000/);
  assert.match(tool, /Dose por administração/);
  assert.match(tool, /Quantidade com a apresentação escolhida/);
  assert.match(tool, /idade, peso, alergias, função renal\/hepática/);
  assert.match(page, /id="medicacoes-gerais"/);
  assert.match(page, /GENERAL_MEDICATIONS\.length/);
  assert.match(css, /\.general-medication-grid/);
  assert.doesNotMatch(data, /ALBERT SABIN|RFOFOS|Turma 49/i);
});
