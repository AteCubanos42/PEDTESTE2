import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { calculateNpt } from "../lib/npt-calculations.mjs";

const root = new URL("../", import.meta.url);

test("NPT calculator converts the spreadsheet inputs into volumes and flow", () => {
  const result = calculateNpt({
    weightKg: 1.03,
    enteralDietMlKgDay: 0,
    otherFluidsMlDay: 0,
    quotaMlKgDay: 140,
    girMgKgMin: 7,
    aminoAcidsGKgDay: 3.5,
    lipidsGKgDay: 2.6,
    sodiumMeqKgDay: 4,
    potassiumMeqKgDay: 0.5,
    phosphateMmolKgDay: 0.5,
    magnesiumMeqKgDay: 0,
    calciumGluconateMgKgDay: 215,
    traceElementsMlKgDay: 0.2,
    vitaminsMlDay: 0.6,
    correctionFactor: 1,
  });
  assert.ok(result);
  assert.equal(Number(result.quotaTotalMlDay.toFixed(1)), 144.2);
  assert.equal(Number(result.volumes.aminoAcids10Ml.toFixed(2)), 36.05);
  assert.equal(Number(result.volumes.lipid20Ml.toFixed(2)), 13.39);
  assert.equal(Number(result.volumes.glucose50Ml.toFixed(4)), 20.7648);
  assert.equal(Number(result.volumes.phosphate10Ml.toFixed(4)), 0.2575);
  assert.equal(Number(result.volumes.potassiumChloride10Ml.toFixed(4)), 0.3962);
  assert.equal(Number(result.volumes.sodiumChloride20Ml.toFixed(4)), 1.2118);
  assert.equal(Number(result.volumes.calciumGluconate10Ml.toFixed(4)), 2.2145);
  assert.equal(Number(result.calciumPhosphorusRatio.toFixed(3)), 1.998);
  assert.equal(Number(result.calciumNeededMgKgDay.toFixed(1)), 215);
  assert.equal(Number(result.phosphateNeededMmolKgDay.toFixed(2)), 0.5);
});

test("associated enteral diet and other fluids reduce the available NPT volume", () => {
  const result = calculateNpt({
    weightKg: 10,
    enteralDietMlKgDay: 20,
    otherFluidsMlDay: 100,
    quotaMlKgDay: 100,
    girMgKgMin: 4,
    aminoAcidsGKgDay: 1,
    lipidsGKgDay: 1,
    sodiumMeqKgDay: 1,
    potassiumMeqKgDay: 1,
    phosphateMmolKgDay: 0.5,
    magnesiumMeqKgDay: 0.3,
    calciumGluconateMgKgDay: 100,
    traceElementsMlKgDay: 0.1,
    vitaminsMlDay: 5,
  });
  assert.ok(result);
  assert.equal(result.quotaTotalMlDay, 1000);
  assert.equal(result.enteralDietMlDay, 200);
  assert.equal(result.nptTargetMlDay, 700);
  assert.equal(Number(result.flowMlH.toFixed(2)), 29.17);
});

test("module exposes calculator, guide and original PDF", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  const npt = await readFile(new URL("app/NptTools.tsx", root), "utf8");
  const pdf = await readFile(new URL("public/npt-fluxograma.pdf", root));
  const workbook = await readFile(new URL("public/npt-planilha-referencia.xlsx", root));
  assert.match(page, /type: "npt"/);
  assert.match(page, /id="npt"/);
  assert.match(npt, /Planilha de NPT pediátrica/);
  assert.match(npt, /Como utilizar/);
  assert.match(npt, /\/npt-fluxograma\.pdf/);
  assert.ok(pdf.length > 100000);
  assert.ok(workbook.length > 10000);
});
