import assert from "node:assert/strict";
import test from "node:test";
import {
  calculateEnteralSedationDose,
  calculateHaloperidolDose,
  calculateVolumeFromConcentration,
  risperidoneSchedule,
  roundClinicalVolume,
} from "../lib/sedation-enteral-calculations.mjs";

test("methadone 0.05 mg/kg at 10 kg converts to 0.5 mL at 1 mg/mL", () => {
  const dose = calculateEnteralSedationDose({ weightKg: 10, dosePerKg: 0.05, intervalHours: 6 });
  assert.equal(dose, 0.5);
  assert.equal(roundClinicalVolume(calculateVolumeFromConcentration(dose, 1)), 0.5);
});

test("clonidine applies the 200 mcg per-dose ceiling and 10 mcg/mL preparation", () => {
  const dose = calculateEnteralSedationDose({ weightKg: 50, dosePerKg: 5, maximumDose: 200, intervalHours: 8 });
  assert.equal(dose, 200);
  assert.equal(roundClinicalVolume(calculateVolumeFromConcentration(dose, 10)), 20);
});

test("chloral hydrate respects the 2 g daily limit at q6h", () => {
  const dose = calculateEnteralSedationDose({ weightKg: 30, dosePerKg: 50, maximumDaily: 2000, intervalHours: 6 });
  assert.equal(dose, 500);
});

test("haloperidol daily dose is divided by the chosen interval", () => {
  assert.deepEqual(calculateHaloperidolDose({ weightKg: 20, dailyDosePerKg: 0.05, intervalHours: 12 }), { dailyDose: 1, perDose: 0.5 });
});

test("risperidone schedule changes at five years", () => {
  assert.deepEqual(risperidoneSchedule(4.9), { initialMin: 0.1, initialMax: 0.2, maintenance: 0.5, maximum: 1 });
  assert.deepEqual(risperidoneSchedule(5), { initialMin: 0.2, initialMax: 0.5, maintenance: 1, maximum: 2.5 });
});
