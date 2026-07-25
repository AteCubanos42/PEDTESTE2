import assert from "node:assert/strict";
import test from "node:test";
import {
  calculateGeneralDose,
  generalAgeInMonths,
  generalRegimenEligibility,
  quantityForGeneralPresentation,
} from "../lib/general-medication-calculations.mjs";

test("paracetamol range converts to the selected oral solution", () => {
  const regimen = { calculation: { mode: "perKgDose", min: 10, max: 15, unit: "mg", administrationsPerDay: 4, maxDaily: 4000 } };
  const dose = calculateGeneralDose(regimen, 10);
  assert.deepEqual(dose, {
    unit: "mg",
    perDoseMin: 100,
    perDoseMax: 150,
    dailyMin: 400,
    dailyMax: 600,
    administrationsPerDay: 4,
  });
  const quantity = quantityForGeneralPresentation(dose, { kind: "liquid", concentrationMgMl: 32, label: "Solução 160 mg/5 mL" });
  assert.equal(quantity.roundedMin, 3.1);
  assert.equal(quantity.roundedMax, 4.7);
});

test("adrenaline anaphylaxis applies the 0.5 mg ceiling and 1 mg/mL volume", () => {
  const regimen = { calculation: { mode: "perKgDose", min: 0.01, unit: "mg", maxDose: 0.5 } };
  const dose20 = calculateGeneralDose(regimen, 20);
  assert.equal(dose20.perDoseMin, 0.2);
  const volume20 = quantityForGeneralPresentation(dose20, { kind: "liquid", concentrationMgMl: 1, label: "1 mg/mL" });
  assert.equal(volume20.roundedMin, 0.2);

  const dose80 = calculateGeneralDose(regimen, 80);
  assert.equal(dose80.perDoseMin, 0.5);
  const volume80 = quantityForGeneralPresentation(dose80, { kind: "liquid", concentrationMgMl: 1, label: "1 mg/mL" });
  assert.equal(volume80.roundedMin, 0.5);
});

test("nitazoxanide weight dose calculates suspension volume", () => {
  const dose = calculateGeneralDose({ calculation: { mode: "perKgDose", min: 7.5, unit: "mg", maxDose: 300, administrationsPerDay: 2 } }, 10);
  assert.equal(dose.perDoseMin, 75);
  const quantity = quantityForGeneralPresentation(dose, { kind: "liquid", concentrationMgMl: 20, label: "Suspensão" });
  assert.equal(quantity.roundedMin, 3.8);
});

test("daily bromopride range is divided into three administrations", () => {
  const dose = calculateGeneralDose({ calculation: { mode: "perKgDay", min: 0.5, max: 1, unit: "mg", administrationsPerDay: 3, maxDaily: 60 } }, 12);
  assert.equal(dose.dailyMin, 6);
  assert.equal(dose.dailyMax, 12);
  assert.equal(dose.perDoseMin, 2);
  assert.equal(dose.perDoseMax, 4);
});

test("age and weight restrictions are evaluated before enabling a regimen", () => {
  const regimen = { minAgeMonths: 60, minWeightKg: 15 };
  assert.equal(generalAgeInMonths(5, "anos"), 60);
  assert.deepEqual(generalRegimenEligibility(regimen, 60, 15), { ageValid: true, weightValid: true, valid: true });
  assert.deepEqual(generalRegimenEligibility(regimen, 48, 14), { ageValid: false, weightValid: false, valid: false });
});
