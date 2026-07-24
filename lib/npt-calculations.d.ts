export type NptInput = {
  weightKg: number;
  enteralDietMlKgDay?: number;
  otherFluidsMlDay?: number;
  quotaMlKgDay: number;
  girMgKgMin: number;
  aminoAcidsGKgDay: number;
  lipidsGKgDay: number;
  sodiumMeqKgDay: number;
  potassiumMeqKgDay: number;
  phosphateMmolKgDay: number;
  magnesiumMeqKgDay: number;
  calciumGluconateMgKgDay: number;
  traceElementsMlKgDay: number;
  vitaminsMlDay: number;
  correctionFactor?: number;
};

export type NptResult = {
  quotaTotalMlDay: number;
  enteralDietMlDay: number;
  otherFluidsMlDay: number;
  nptTargetMlDay: number;
  preparedVolumeMl: number;
  flowMlH: number;
  waterMl: number;
  additiveVolumeMl: number;
  volumes: Record<string, number>;
  grams: Record<string, number>;
  calories: Record<string, number>;
  totalCaloriesKcal: number;
  kcalKgDay: number;
  caloriePercentages: Record<string, number>;
  electrolytes: Record<string, number>;
  totalOsmoles: number;
  osmolarityMosmL: number;
  minimumPeripheralVolumeMl: number;
  minimumCentralVolumeMl: number;
  calciumPhosphorusRatio: number | null;
  calciumNeededMgKgDay: number;
  phosphateNeededMmolKgDay: number;
  nonProteinKcalPerNitrogenG: number | null;
};

export function calculateNpt(input: NptInput): NptResult | null;
