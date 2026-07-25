export function clampClinicalDose(value, maximum) {
  if (!Number.isFinite(value)) return Number.NaN;
  if (Number.isFinite(maximum)) return Math.min(value, maximum);
  return value;
}

export function calculateEnteralSedationDose({ weightKg, dosePerKg, maximumDose, maximumDaily, intervalHours }) {
  if (!Number.isFinite(weightKg) || weightKg <= 0 || !Number.isFinite(dosePerKg) || dosePerKg <= 0) return null;
  let dose = clampClinicalDose(weightKg * dosePerKg, maximumDose);
  if (Number.isFinite(maximumDaily) && Number.isFinite(intervalHours) && intervalHours > 0) {
    const administrations = 24 / intervalHours;
    dose = Math.min(dose, maximumDaily / administrations);
  }
  return dose;
}

export function calculateVolumeFromConcentration(dose, concentration) {
  if (!Number.isFinite(dose) || dose < 0 || !Number.isFinite(concentration) || concentration <= 0) return Number.NaN;
  return dose / concentration;
}

export function roundClinicalVolume(value) {
  if (!Number.isFinite(value)) return Number.NaN;
  if (value < 1) return Math.round((value + Number.EPSILON) * 100) / 100;
  return Math.round((value + Number.EPSILON) * 10) / 10;
}

export function calculateHaloperidolDose({ weightKg, dailyDosePerKg, intervalHours }) {
  if (!Number.isFinite(weightKg) || weightKg <= 0 || !Number.isFinite(dailyDosePerKg) || dailyDosePerKg <= 0) return null;
  if (![8, 12].includes(intervalHours)) return null;
  const dailyDose = weightKg * dailyDosePerKg;
  return { dailyDose, perDose: dailyDose / (24 / intervalHours) };
}

export function risperidoneSchedule(ageYears) {
  if (!Number.isFinite(ageYears) || ageYears < 0) return null;
  if (ageYears < 5) return { initialMin: 0.1, initialMax: 0.2, maintenance: 0.5, maximum: 1 };
  return { initialMin: 0.2, initialMax: 0.5, maintenance: 1, maximum: 2.5 };
}
