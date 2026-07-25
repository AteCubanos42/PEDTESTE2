export function generalAgeInMonths(value, unit) {
  if (!Number.isFinite(value) || value < 0) return Number.NaN;
  if (unit === "dias") return value / 30.4375;
  if (unit === "meses") return value;
  return value * 12;
}

export function generalUnitLabel(unit) {
  const labels = {
    mg: "mg",
    mcg: "mcg",
    g: "g",
    mL: "mL",
    drops: "gotas",
    tablet: "comprimido(s)",
    capsule: "cápsula(s)",
    sachet: "sachê(s)",
    ampoule: "flaconete(s)",
  };
  return labels[unit] ?? unit;
}

function doseToMg(value, unit) {
  if (unit === "mg") return value;
  if (unit === "mcg") return value / 1000;
  if (unit === "g") return value * 1000;
  return Number.NaN;
}

export function generalRegimenEligibility(regimen, ageMonths, weightKg) {
  const ageValid = Number.isFinite(ageMonths)
    && (regimen.minAgeMonths === undefined || ageMonths >= regimen.minAgeMonths)
    && (regimen.maxAgeMonths === undefined || ageMonths <= regimen.maxAgeMonths);
  const weightValid = Number.isFinite(weightKg)
    && weightKg > 0
    && (regimen.minWeightKg === undefined || weightKg >= regimen.minWeightKg)
    && (regimen.maxWeightKg === undefined || weightKg <= regimen.maxWeightKg);
  return { ageValid, weightValid, valid: ageValid && weightValid };
}

export function calculateGeneralDose(regimen, weightKg) {
  const calc = regimen.calculation;
  if (calc.mode === "instruction") return null;

  if (calc.mode === "fixed") {
    const administrations = calc.administrationsPerDay ?? null;
    return {
      unit: calc.unit,
      perDoseMin: calc.min,
      perDoseMax: calc.max ?? calc.min,
      dailyMin: administrations ? calc.min * administrations : null,
      dailyMax: administrations ? (calc.max ?? calc.min) * administrations : null,
      administrationsPerDay: administrations,
    };
  }

  if (!Number.isFinite(weightKg) || weightKg <= 0) return null;

  if (calc.mode === "perKgDose") {
    let minimum = weightKg * calc.min;
    let maximum = weightKg * (calc.max ?? calc.min);
    if (calc.maxDose !== undefined) {
      minimum = Math.min(minimum, calc.maxDose);
      maximum = Math.min(maximum, calc.maxDose);
    }
    const administrations = calc.administrationsPerDay ?? null;
    if (calc.maxDaily !== undefined && administrations) {
      const perDoseCeiling = calc.maxDaily / administrations;
      minimum = Math.min(minimum, perDoseCeiling);
      maximum = Math.min(maximum, perDoseCeiling);
    }
    return {
      unit: calc.unit,
      perDoseMin: minimum,
      perDoseMax: maximum,
      dailyMin: administrations ? minimum * administrations : null,
      dailyMax: administrations ? maximum * administrations : null,
      administrationsPerDay: administrations,
    };
  }

  let dailyMinimum = weightKg * calc.min;
  let dailyMaximum = weightKg * (calc.max ?? calc.min);
  if (calc.maxDaily !== undefined) {
    dailyMinimum = Math.min(dailyMinimum, calc.maxDaily);
    dailyMaximum = Math.min(dailyMaximum, calc.maxDaily);
  }
  return {
    unit: calc.unit,
    perDoseMin: dailyMinimum / calc.administrationsPerDay,
    perDoseMax: dailyMaximum / calc.administrationsPerDay,
    dailyMin: dailyMinimum,
    dailyMax: dailyMaximum,
    administrationsPerDay: calc.administrationsPerDay,
  };
}

function roundQuantity(value, presentation, label) {
  if (!Number.isFinite(value)) return Number.NaN;
  if (label === "gotas") return Math.max(1, Math.round(value));
  if (["comprimido(s)", "cápsula(s)"].includes(label)) {
    return presentation.divisible ? Math.round(value * 2) / 2 : Math.max(1, Math.round(value));
  }
  if (["sachê(s)", "flaconete(s)"].includes(label)) return Math.max(1, Math.round(value));
  return Math.round((value + Number.EPSILON) * 10) / 10;
}

export function quantityForGeneralPresentation(dose, presentation) {
  if (["mL", "drops", "tablet", "capsule", "sachet", "ampoule"].includes(dose.unit)) {
    const label = generalUnitLabel(dose.unit);
    return {
      exactMin: dose.perDoseMin,
      exactMax: dose.perDoseMax,
      roundedMin: roundQuantity(dose.perDoseMin, presentation, label),
      roundedMax: roundQuantity(dose.perDoseMax, presentation, label),
      label,
      administeredMinMg: null,
      administeredMaxMg: null,
    };
  }

  const doseMinMg = doseToMg(dose.perDoseMin, dose.unit);
  const doseMaxMg = doseToMg(dose.perDoseMax, dose.unit);
  if (!Number.isFinite(doseMinMg) || !Number.isFinite(doseMaxMg)) return null;

  let exactMin = Number.NaN;
  let exactMax = Number.NaN;
  let label = "";
  let mgPerUnit = Number.NaN;

  if (presentation.kind === "liquid" && presentation.concentrationMgMl) {
    exactMin = doseMinMg / presentation.concentrationMgMl;
    exactMax = doseMaxMg / presentation.concentrationMgMl;
    label = "mL";
    mgPerUnit = presentation.concentrationMgMl;
  } else if (presentation.kind === "drops" && presentation.mgPerDrop) {
    exactMin = doseMinMg / presentation.mgPerDrop;
    exactMax = doseMaxMg / presentation.mgPerDrop;
    label = "gotas";
    mgPerUnit = presentation.mgPerDrop;
  } else if (presentation.kind === "solid" && presentation.strengthMg) {
    exactMin = doseMinMg / presentation.strengthMg;
    exactMax = doseMaxMg / presentation.strengthMg;
    const lower = presentation.label.toLocaleLowerCase("pt-BR");
    label = lower.includes("cáps") ? "cápsula(s)" : lower.includes("sachê") ? "sachê(s)" : "comprimido(s)";
    mgPerUnit = presentation.strengthMg;
  } else {
    return null;
  }

  const roundedMin = roundQuantity(exactMin, presentation, label);
  const roundedMax = roundQuantity(exactMax, presentation, label);
  return {
    exactMin,
    exactMax,
    roundedMin,
    roundedMax,
    label,
    administeredMinMg: Number.isFinite(mgPerUnit) ? roundedMin * mgPerUnit : null,
    administeredMaxMg: Number.isFinite(mgPerUnit) ? roundedMax * mgPerUnit : null,
  };
}
