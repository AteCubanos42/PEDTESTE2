import type { GeneralPresentation, GeneralRegimen } from "../app/general-medications-data";

export type GeneralDoseResult = {
  unit: string;
  perDoseMin: number;
  perDoseMax: number;
  dailyMin: number | null;
  dailyMax: number | null;
  administrationsPerDay: number | null;
};

export type GeneralQuantityResult = {
  exactMin: number;
  exactMax: number;
  roundedMin: number;
  roundedMax: number;
  label: string;
  administeredMinMg: number | null;
  administeredMaxMg: number | null;
};

export function generalAgeInMonths(value: number, unit: string): number;
export function generalUnitLabel(unit: string): string;
export function generalRegimenEligibility(regimen: GeneralRegimen, ageMonths: number, weightKg: number): { ageValid: boolean; weightValid: boolean; valid: boolean };
export function calculateGeneralDose(regimen: GeneralRegimen, weightKg: number): GeneralDoseResult | null;
export function quantityForGeneralPresentation(dose: GeneralDoseResult, presentation: GeneralPresentation): GeneralQuantityResult | null;
