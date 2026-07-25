export function clampClinicalDose(value: number, maximum?: number): number;
export function calculateEnteralSedationDose(input: { weightKg: number; dosePerKg: number; maximumDose?: number; maximumDaily?: number; intervalHours: number | null }): number | null;
export function calculateVolumeFromConcentration(dose: number, concentration: number): number;
export function roundClinicalVolume(value: number): number;
export function calculateHaloperidolDose(input: { weightKg: number; dailyDosePerKg: number; intervalHours: number }): { dailyDose: number; perDose: number } | null;
export function risperidoneSchedule(ageYears: number): { initialMin: number; initialMax: number; maintenance: number; maximum: number } | null;
