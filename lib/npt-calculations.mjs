const finitePositive = (value) => Number.isFinite(value) && value > 0;
const finiteNonNegative = (value) => Number.isFinite(value) && value >= 0;

export function calculateNpt(input) {
  const {
    weightKg,
    enteralDietMlKgDay = 0,
    otherFluidsMlDay = 0,
    quotaMlKgDay,
    girMgKgMin,
    aminoAcidsGKgDay,
    lipidsGKgDay,
    sodiumMeqKgDay,
    potassiumMeqKgDay,
    phosphateMmolKgDay,
    magnesiumMeqKgDay,
    calciumGluconateMgKgDay,
    traceElementsMlKgDay,
    vitaminsMlDay,
    correctionFactor = 1,
  } = input;

  const values = [
    weightKg,
    enteralDietMlKgDay,
    otherFluidsMlDay,
    quotaMlKgDay,
    girMgKgMin,
    aminoAcidsGKgDay,
    lipidsGKgDay,
    sodiumMeqKgDay,
    potassiumMeqKgDay,
    phosphateMmolKgDay,
    magnesiumMeqKgDay,
    calciumGluconateMgKgDay,
    traceElementsMlKgDay,
    vitaminsMlDay,
    correctionFactor,
  ];
  if (!finitePositive(weightKg) || !finitePositive(quotaMlKgDay) || !finitePositive(correctionFactor)) return null;
  if (!values.every((value) => finiteNonNegative(value))) return null;

  const quotaTotalMlDay = weightKg * quotaMlKgDay;
  const enteralDietMlDay = weightKg * enteralDietMlKgDay;
  const nptTargetMlDay = quotaTotalMlDay - enteralDietMlDay - otherFluidsMlDay;
  if (!finitePositive(nptTargetMlDay)) return null;

  const aminoAcidsGDay = aminoAcidsGKgDay * weightKg;
  const lipidsGDay = lipidsGKgDay * weightKg;
  const glucoseGDay = girMgKgMin * weightKg * 1.44;

  const volumes = {
    aminoAcids10Ml: aminoAcidsGDay * 10 * correctionFactor,
    lipid20Ml: lipidsGDay * 5 * correctionFactor,
    glucose50Ml: glucoseGDay * 2 * correctionFactor,
    phosphate10Ml: (phosphateMmolKgDay * weightKg / 2) * correctionFactor,
    potassiumChloride10Ml: (potassiumMeqKgDay * weightKg / 1.3) * correctionFactor,
    sodiumChloride20Ml: (sodiumMeqKgDay * weightKg / 3.4) * correctionFactor,
    magnesiumSulfate50Ml: (magnesiumMeqKgDay * weightKg / 4) * correctionFactor,
    calciumGluconate10Ml: (calciumGluconateMgKgDay * weightKg / 100) * correctionFactor,
    traceElementsPedMl: traceElementsMlKgDay * weightKg * correctionFactor,
    vitaminsPedMl: vitaminsMlDay * correctionFactor,
  };
  const additiveVolumeMl = Object.values(volumes).reduce((sum, value) => sum + value, 0);
  const preparedVolumeMl = nptTargetMlDay * correctionFactor;
  const waterMl = preparedVolumeMl - additiveVolumeMl;

  const calories = {
    carbohydrateKcal: glucoseGDay * 3.4,
    proteinKcal: aminoAcidsGDay * 4,
    lipidKcal: lipidsGDay * 10,
  };
  const totalCaloriesKcal = calories.carbohydrateKcal + calories.proteinKcal + calories.lipidKcal;
  const caloriePercentages = totalCaloriesKcal > 0 ? {
    carbohydrate: calories.carbohydrateKcal / totalCaloriesKcal * 100,
    protein: calories.proteinKcal / totalCaloriesKcal * 100,
    lipid: calories.lipidKcal / totalCaloriesKcal * 100,
  } : { carbohydrate: 0, protein: 0, lipid: 0 };

  const electrolytes = {
    sodiumMeq: sodiumMeqKgDay * weightKg,
    potassiumMeq: potassiumMeqKgDay * weightKg,
    phosphateMmol: phosphateMmolKgDay * weightKg,
    magnesiumMeq: magnesiumMeqKgDay * weightKg,
    calciumMeq: calciumGluconateMgKgDay * weightKg / 100 * 0.45,
  };

  const totalOsmoles =
    aminoAcidsGDay * 11 +
    glucoseGDay * 5.5 +
    lipidsGDay * 0.3 +
    electrolytes.sodiumMeq * 2 +
    electrolytes.potassiumMeq * 2 +
    electrolytes.phosphateMmol * 2 +
    electrolytes.magnesiumMeq +
    electrolytes.calciumMeq * 1.4;
  const osmolarityMosmL = totalOsmoles * 1000 / preparedVolumeMl;

  const calciumPhosphorusRatio = phosphateMmolKgDay > 0
    ? calciumGluconateMgKgDay / 215.19 / phosphateMmolKgDay
    : null;
  const nonProteinCalories = calories.carbohydrateKcal + calories.lipidKcal;
  const nitrogenG = aminoAcidsGDay / 6.25;
  const nonProteinKcalPerNitrogenG = nitrogenG > 0 ? nonProteinCalories / nitrogenG : null;

  return {
    quotaTotalMlDay,
    enteralDietMlDay,
    otherFluidsMlDay,
    nptTargetMlDay,
    preparedVolumeMl,
    flowMlH: preparedVolumeMl / 24,
    waterMl,
    additiveVolumeMl,
    volumes,
    grams: {
      glucoseGDay,
      aminoAcidsGDay,
      lipidsGDay,
    },
    calories,
    totalCaloriesKcal,
    kcalKgDay: totalCaloriesKcal / weightKg,
    caloriePercentages,
    electrolytes,
    totalOsmoles,
    osmolarityMosmL,
    minimumPeripheralVolumeMl: totalOsmoles * 1000 / 900,
    minimumCentralVolumeMl: totalOsmoles * 1000 / 1500,
    calciumPhosphorusRatio,
    calciumNeededMgKgDay: phosphateMmolKgDay * 430,
    phosphateNeededMmolKgDay: calciumGluconateMgKgDay / 430,
    nonProteinKcalPerNitrogenG,
  };
}
