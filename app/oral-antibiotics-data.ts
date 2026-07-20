import type { AntimicrobialRule } from "./antimicrobials-data";

export type OralAntibioticGroup = "Penicilinas" | "Cefalosporinas" | "Macrolídeos" | "Outros";
export type OralDosageForm = "liquid" | "tablet" | "capsule" | "sachet";

export type OralFormulation = {
  id: string;
  label: string;
  dosageForm: OralDosageForm;
  concentrationMgMl?: number;
  strengthMg?: number;
  secondaryConcentrationMgMl?: number;
  secondaryStrengthMg?: number;
  divisible?: boolean;
  note?: string;
};

export type OralRule = AntimicrobialRule & {
  ageLabel: string;
  durationMin?: number;
  durationMax?: number;
  defaultDuration?: number;
  durationGuidance?: string;
  sourceTitle: string;
  sourceUrl: string;
  doseComponent?: string;
  secondaryComponent?: string;
  maxSecondaryDailyMgKg?: number;
  requiredFormulationId?: string;
  minWeightKg?: number;
  maxWeightKg?: number;
};

export type OralAntibiotic = {
  id: string;
  name: string;
  group: OralAntibioticGroup;
  className: string;
  summary: string;
  formulations: OralFormulation[];
  rules: OralRule[];
  warning?: string;
};

export const ORAL_ANTIBIOTIC_GROUPS: OralAntibioticGroup[] = ["Penicilinas", "Cefalosporinas", "Macrolídeos", "Outros"];

const durationGuidance = "Informe a duração definida clinicamente para o foco tratado e o protocolo local.";
const source = (name: string, query: string) => ({
  sourceTitle: `DailyMed — ${name}`,
  sourceUrl: `https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=${encodeURIComponent(query)}`,
});

export const ORAL_ANTIBIOTICS: OralAntibiotic[] = [
  {
    id: "amoxicillin-oral", name: "Amoxicilina", group: "Penicilinas", className: "Aminopenicilina",
    summary: "Faixa pediátrica configurável em mg/kg/dia, com teto de 3 g/dia.",
    formulations: [
      { id: "250-5", label: "Suspensão 250 mg/5 mL", dosageForm: "liquid", concentrationMgMl: 50 },
      { id: "400-5", label: "Suspensão 400 mg/5 mL", dosageForm: "liquid", concentrationMgMl: 80 },
      { id: "cap-500", label: "Cápsula 500 mg", dosageForm: "capsule", strengthMg: 500 },
      { id: "tab-875", label: "Comprimido 875 mg", dosageForm: "tablet", strengthMg: 875, divisible: true },
    ],
    rules: [{ id: "50-90-q8", label: "50–90 mg/kg/dia · 8/8 h", population: "Pediátrica", ageLabel: "Idade e indicação conforme protocolo", basis: "day", doseMin: 50, doseMax: 90, unit: "mg", intervalHours: 8, maxDaily: 3000, route: "VO", durationGuidance, ...source("Amoxicillin", "amoxicillin") }],
  },
  {
    id: "amoxicillin-clavulanate-oral", name: "Amoxicilina + clavulanato", group: "Penicilinas", className: "Aminopenicilina + inibidor",
    summary: "Cálculo pela amoxicilina; a exposição ao clavulanato é mostrada separadamente.",
    formulations: [
      { id: "250-62.5-5", label: "Suspensão 250 + 62,5 mg/5 mL · 4:1", dosageForm: "liquid", concentrationMgMl: 50, secondaryConcentrationMgMl: 12.5 },
      { id: "400-57-5", label: "Suspensão 400 + 57 mg/5 mL · 7:1", dosageForm: "liquid", concentrationMgMl: 80, secondaryConcentrationMgMl: 11.4 },
      { id: "600-42.9-5", label: "Suspensão 600 + 42,9 mg/5 mL · 14:1", dosageForm: "liquid", concentrationMgMl: 120, secondaryConcentrationMgMl: 8.58 },
      { id: "tab-500-125", label: "Comprimido 500 + 125 mg", dosageForm: "tablet", strengthMg: 500, secondaryStrengthMg: 125, divisible: false },
      { id: "tab-875-125", label: "Comprimido 875 + 125 mg", dosageForm: "tablet", strengthMg: 875, secondaryStrengthMg: 125, divisible: true },
    ],
    warning: "Não intercambiar apresentações apenas pelo volume: as proporções são diferentes. Revise o clavulanato, com alvo aproximado de até 10 mg/kg/dia.",
    rules: [
      { id: "45-90-q8", label: "45–90 mg/kg/dia · 8/8 h · apresentação 4:1", population: "Pediátrica", ageLabel: "Cálculo pela amoxicilina", basis: "day", doseMin: 45, doseMax: 90, unit: "mg", intervalHours: 8, maxDaily: 3000, route: "VO", durationGuidance, doseComponent: "amoxicilina", secondaryComponent: "clavulanato", maxSecondaryDailyMgKg: 10, requiredFormulationId: "250-62.5-5", ...source("Amoxicillin/clavulanate", "amoxicillin clavulanate") },
      { id: "45-90-q12", label: "45–90 mg/kg/dia · 12/12 h · apresentação 7:1", population: "Pediátrica", ageLabel: "Cálculo pela amoxicilina", basis: "day", doseMin: 45, doseMax: 90, unit: "mg", intervalHours: 12, maxDaily: 3000, route: "VO", durationGuidance, doseComponent: "amoxicilina", secondaryComponent: "clavulanato", maxSecondaryDailyMgKg: 10, requiredFormulationId: "400-57-5", ...source("Amoxicillin/clavulanate", "amoxicillin clavulanate") },
      { id: "80-90-q12-low-clav", label: "80–90 mg/kg/dia · 12/12 h · apresentação 14:1", population: "Pediátrica", ageLabel: "Dose alta pela amoxicilina", basis: "day", doseMin: 80, doseMax: 90, unit: "mg", intervalHours: 12, maxDaily: 3000, route: "VO", durationGuidance, doseComponent: "amoxicilina", secondaryComponent: "clavulanato", maxSecondaryDailyMgKg: 10, requiredFormulationId: "600-42.9-5", ...source("Amoxicillin/clavulanate ES", "amoxicillin clavulanate 600 42.9") },
    ],
  },
  {
    id: "cephalexin-oral", name: "Cefalexina", group: "Cefalosporinas", className: "Cefalosporina de 1ª geração",
    summary: "Faixa de 50–100 mg/kg/dia, dividida de 6/6 h, com teto de 4 g/dia.",
    formulations: [
      { id: "250-5", label: "Suspensão 250 mg/5 mL", dosageForm: "liquid", concentrationMgMl: 50 },
      { id: "tab-500", label: "Comprimido/drágea 500 mg", dosageForm: "tablet", strengthMg: 500, divisible: false },
    ],
    rules: [{ id: "50-100-q6", label: "50–100 mg/kg/dia · 6/6 h", population: "Pediátrica", ageLabel: "Idade e indicação conforme protocolo", basis: "day", doseMin: 50, doseMax: 100, unit: "mg", intervalHours: 6, maxDaily: 4000, route: "VO", durationGuidance, ...source("Cephalexin", "cephalexin") }],
  },
  {
    id: "cefuroxime-oral", name: "Cefuroxima axetil", group: "Cefalosporinas", className: "Cefalosporina de 2ª geração",
    summary: "Faixa de 20–30 mg/kg/dia, dividida de 12/12 h.",
    formulations: [
      { id: "250-5", label: "Suspensão 250 mg/5 mL", dosageForm: "liquid", concentrationMgMl: 50 },
      { id: "tab-250", label: "Comprimido 250 mg", dosageForm: "tablet", strengthMg: 250, divisible: false },
      { id: "tab-500", label: "Comprimido 500 mg", dosageForm: "tablet", strengthMg: 500, divisible: false },
    ],
    warning: "Administrar a suspensão com alimento; não triturar comprimidos para substituir automaticamente a suspensão.",
    rules: [{ id: "20-30-q12", label: "20–30 mg/kg/dia · 12/12 h", population: "Pediátrica", ageLabel: "≥3 meses conforme bula", basis: "day", doseMin: 20, doseMax: 30, unit: "mg", intervalHours: 12, maxDose: 500, maxDaily: 1000, route: "VO", durationGuidance, ...source("Cefuroxime axetil", "cefuroxime axetil") }],
  },
  {
    id: "cefixime-oral", name: "Cefixima", group: "Cefalosporinas", className: "Cefalosporina de 3ª geração",
    summary: "Dose de 8 mg/kg/dia, em uma ou duas administrações.",
    formulations: [
      { id: "100-5", label: "Suspensão 100 mg/5 mL", dosageForm: "liquid", concentrationMgMl: 20 },
      { id: "cap-400", label: "Cápsula 400 mg", dosageForm: "capsule", strengthMg: 400 },
    ],
    warning: "Cobertura limitada para S. aureus e pneumococo com sensibilidade reduzida; confirmar foco e susceptibilidade.",
    rules: [
      { id: "8-q24", label: "8 mg/kg/dia · 1 vez/dia", population: "Pediátrica", ageLabel: "≥6 meses conforme bula", basis: "day", doseMin: 8, unit: "mg", intervalHours: 24, maxDaily: 400, route: "VO", durationGuidance, ...source("Cefixime", "cefixime") },
      { id: "8-q12", label: "8 mg/kg/dia · 12/12 h", population: "Pediátrica", ageLabel: "≥6 meses conforme bula", basis: "day", doseMin: 8, unit: "mg", intervalHours: 12, maxDaily: 400, route: "VO", durationGuidance, ...source("Cefixime", "cefixime") },
    ],
  },
  {
    id: "cefpodoxime-oral", name: "Cefpodoxima proxetila", group: "Cefalosporinas", className: "Cefalosporina de 3ª geração",
    summary: "Faixa de 8–10 mg/kg/dia de 12/12 h; apresentação pediátrica pode ter baixa disponibilidade.",
    formulations: [
      { id: "tab-100", label: "Comprimido 100 mg", dosageForm: "tablet", strengthMg: 100, divisible: false },
      { id: "tab-200", label: "Comprimido 200 mg", dosageForm: "tablet", strengthMg: 200, divisible: false },
    ],
    warning: "Suspensão pediátrica pode não estar comercialmente disponível; não fracionar comprimidos sem validação farmacêutica.",
    rules: [{ id: "8-10-q12", label: "8–10 mg/kg/dia · 12/12 h", population: "Pediátrica", ageLabel: "Idade e indicação conforme protocolo", basis: "day", doseMin: 8, doseMax: 10, unit: "mg", intervalHours: 12, maxDaily: 400, route: "VO", durationGuidance, ...source("Cefpodoxime proxetil", "cefpodoxime proxetil") }],
  },
  {
    id: "azithromycin-oral", name: "Azitromicina", group: "Macrolídeos", className: "Macrolídeo",
    summary: "Esquemas de três ou cinco dias separados por dose diária.",
    formulations: [
      { id: "200-5", label: "Suspensão 200 mg/5 mL", dosageForm: "liquid", concentrationMgMl: 40 },
      { id: "cap-250", label: "Cápsula 250 mg", dosageForm: "capsule", strengthMg: 250 },
      { id: "tab-500", label: "Comprimido 500 mg", dosageForm: "tablet", strengthMg: 500, divisible: false },
    ],
    rules: [
      { id: "10-3d", label: "10 mg/kg/dia · 1 vez/dia · 3 dias", population: "Pediátrica", ageLabel: "Idade conforme indicação/bula", basis: "day", doseMin: 10, unit: "mg", intervalHours: 24, maxDaily: 500, route: "VO", durationMin: 3, durationMax: 3, defaultDuration: 3, ...source("Azithromycin", "azithromycin") },
      { id: "10-d1", label: "D1 · 10 mg/kg/dia · 1 vez", population: "Pediátrica", ageLabel: "Primeiro dia do esquema de 5 dias", basis: "day", doseMin: 10, unit: "mg", intervalHours: 24, maxDaily: 500, route: "VO", durationMin: 1, durationMax: 1, defaultDuration: 1, ...source("Azithromycin", "azithromycin") },
      { id: "5-d2-d5", label: "D2–D5 · 5 mg/kg/dia · 1 vez/dia", population: "Pediátrica", ageLabel: "Manutenção do esquema de 5 dias", basis: "day", doseMin: 5, unit: "mg", intervalHours: 24, maxDaily: 500, route: "VO", durationMin: 4, durationMax: 4, defaultDuration: 4, ...source("Azithromycin", "azithromycin") },
    ],
  },
  {
    id: "clarithromycin-oral", name: "Claritromicina", group: "Macrolídeos", className: "Macrolídeo",
    summary: "Dose de 15 mg/kg/dia, dividida de 12/12 h.",
    formulations: [
      { id: "125-5", label: "Suspensão 125 mg/5 mL", dosageForm: "liquid", concentrationMgMl: 25 },
      { id: "250-5", label: "Suspensão 250 mg/5 mL", dosageForm: "liquid", concentrationMgMl: 50 },
      { id: "tab-500", label: "Comprimido 500 mg", dosageForm: "tablet", strengthMg: 500, divisible: false },
    ],
    rules: [{ id: "15-q12", label: "15 mg/kg/dia · 12/12 h", population: "Pediátrica", ageLabel: "≥6 meses conforme bula", basis: "day", doseMin: 15, unit: "mg", intervalHours: 12, maxDose: 500, maxDaily: 1000, route: "VO", durationGuidance, ...source("Clarithromycin", "clarithromycin") }],
  },
  {
    id: "clindamycin-oral", name: "Clindamicina", group: "Outros", className: "Lincosamida",
    summary: "Faixa de 20–40 mg/kg/dia, com opções de 6/6 h ou 8/8 h.",
    formulations: [{ id: "cap-300", label: "Cápsula 300 mg", dosageForm: "capsule", strengthMg: 300, note: "Sem suspensão pediátrica comercial de rotina; crianças pequenas podem exigir manipulação validada." }],
    warning: "A faixa ampliada foi configurada conforme solicitação e deve ser validada no protocolo local. Reavaliar se ocorrer diarreia importante.",
    rules: [
      { id: "20-40-q6", label: "20–40 mg/kg/dia · 6/6 h", population: "Pediátrica", ageLabel: "Confirmar idade e indicação", basis: "day", doseMin: 20, doseMax: 40, unit: "mg", intervalHours: 6, maxDose: 450, maxDaily: 1800, route: "VO", durationGuidance, ...source("Clindamycin", "clindamycin") },
      { id: "20-40-q8", label: "20–40 mg/kg/dia · 8/8 h", population: "Pediátrica", ageLabel: "Confirmar idade e indicação", basis: "day", doseMin: 20, doseMax: 40, unit: "mg", intervalHours: 8, maxDose: 450, maxDaily: 1800, route: "VO", durationGuidance, ...source("Clindamycin", "clindamycin") },
    ],
  },
  {
    id: "tmp-smx-oral", name: "Sulfametoxazol + trimetoprima", group: "Outros", className: "Sulfonamida + inibidor de folato",
    summary: "Cálculo pelo componente trimetoprima: 6–12 mg/kg/dia de 12/12 h.",
    formulations: [
      { id: "200-40-5", label: "Suspensão 200 mg SMX + 40 mg TMP/5 mL", dosageForm: "liquid", concentrationMgMl: 8, secondaryConcentrationMgMl: 40 },
      { id: "tab-400-80", label: "Comprimido 400 mg SMX + 80 mg TMP", dosageForm: "tablet", strengthMg: 80, secondaryStrengthMg: 400, divisible: true },
      { id: "tab-800-160", label: "Comprimido forte 800 mg SMX + 160 mg TMP", dosageForm: "tablet", strengthMg: 160, secondaryStrengthMg: 800, divisible: true },
    ],
    warning: "Cálculo pelo TMP. Contraindicado abaixo de 2 meses na bula consultada; confirmar função renal, alergia e interações.",
    rules: [{ id: "6-12-q12", label: "TMP 6–12 mg/kg/dia · 12/12 h", population: "Pediátrica", ageLabel: "≥2 meses", basis: "day", doseMin: 6, doseMax: 12, unit: "mg", intervalHours: 12, maxDose: 160, maxDaily: 320, route: "VO", durationGuidance, doseComponent: "trimetoprima", secondaryComponent: "sulfametoxazol", ...source("Sulfamethoxazole/trimethoprim", "sulfamethoxazole trimethoprim") }],
  },
  {
    id: "nitrofurantoin-oral", name: "Nitrofurantoína", group: "Outros", className: "Nitrofurano",
    summary: "Faixa terapêutica de 5–7 mg/kg/dia e opção profilática separada.",
    formulations: [{ id: "cap-100", label: "Cápsula 100 mg", dosageForm: "capsule", strengthMg: 100, note: "Sem suspensão pediátrica comercial de rotina; pode exigir manipulação validada." }],
    warning: "Não é opção para pielonefrite. Contraindicada abaixo de 1 mês; administrar com alimento e conferir função renal.",
    rules: [
      { id: "5-7-q6", label: "5–7 mg/kg/dia · 6/6 h", population: "Pediátrica", ageLabel: "≥1 mês", basis: "day", doseMin: 5, doseMax: 7, unit: "mg", intervalHours: 6, maxDaily: 400, route: "VO", durationGuidance, ...source("Nitrofurantoin", "nitrofurantoin") },
      { id: "prophylaxis-q24", label: "1–2 mg/kg/dose · à noite", population: "Pediátrica", ageLabel: "Profilaxia já indicada", basis: "dose", doseMin: 1, doseMax: 2, unit: "mg", intervalHours: 24, maxDose: 100, maxDaily: 100, route: "VO", durationGuidance, ...source("Nitrofurantoin", "nitrofurantoin") },
    ],
  },
  {
    id: "ciprofloxacin-oral", name: "Ciprofloxacino VO", group: "Outros", className: "Fluoroquinolona",
    summary: "Faixa de 20–40 mg/kg/dia de 12/12 h; uso pediátrico restrito.",
    formulations: [
      { id: "tab-250", label: "Comprimido 250 mg", dosageForm: "tablet", strengthMg: 250, divisible: true },
      { id: "tab-500", label: "Comprimido 500 mg", dosageForm: "tablet", strengthMg: 500, divisible: true },
    ],
    warning: "Uso pediátrico restrito e suspensão pouco disponível. Confirmar cultura, susceptibilidade, alternativas e manipulação quando necessária.",
    rules: [{ id: "20-40-q12", label: "20–40 mg/kg/dia · 12/12 h", population: "Pediátrica", ageLabel: "Uso restrito conforme protocolo", basis: "day", doseMin: 20, doseMax: 40, unit: "mg", intervalHours: 12, maxDose: 750, maxDaily: 1500, route: "VO", durationGuidance, ...source("Ciprofloxacin", "ciprofloxacin") }],
  },
  {
    id: "fosfomycin-oral", name: "Fosfomicina trometamol", group: "Outros", className: "Derivado do ácido fosfônico",
    summary: "Esquemas fixos em dose única; o uso pediátrico abaixo de 12 anos é off-label.",
    formulations: [
      { id: "sachet-3000", label: "Sachê/envelope comercial 3 g", dosageForm: "sachet", strengthMg: 3000, divisible: false },
      { id: "pharmacy-2000", label: "Dose de 2 g preparada pela farmácia · off-label", dosageForm: "sachet", strengthMg: 2000, divisible: false, note: "Não corresponde ao fracionamento doméstico do sachê de 3 g; exige preparo/validação farmacêutica." },
    ],
    warning: "A formulação é voltada a adultos/adolescentes. Não fracionar sachê para crianças sem validação farmacêutica; 2 g abaixo de 12 anos é off-label.",
    rules: [
      { id: "fixed-3000", label: "Dose fixa 3 g · dose única", population: "Adolescente", ageLabel: "≥12 anos e ≥50 kg", minWeightKg: 50, basis: "dose", fixedDoseMin: 3000, unit: "mg", once: true, maxDose: 3000, maxDaily: 3000, route: "VO", durationMin: 1, durationMax: 1, defaultDuration: 1, ...source("Fosfomycin tromethamine", "fosfomycin tromethamine") },
      { id: "fixed-2000-offlabel", label: "Dose fixa 2 g · dose única · off-label", population: "Pediátrica", ageLabel: "<12 anos · somente se já indicado", basis: "dose", fixedDoseMin: 2000, unit: "mg", once: true, maxDose: 2000, maxDaily: 2000, route: "VO", durationMin: 1, durationMax: 1, defaultDuration: 1, requiredFormulationId: "pharmacy-2000", note: "Uso off-label: exige validação especializada e farmacêutica da forma de preparo.", ...source("Fosfomycin tromethamine", "fosfomycin tromethamine") },
    ],
  },
  {
    id: "doxycycline-oral", name: "Doxiciclina", group: "Outros", className: "Tetraciclina",
    summary: "Dose do primeiro dia e manutenção em cartões separados.",
    formulations: [{ id: "tab-100", label: "Comprimido 100 mg", dosageForm: "tablet", strengthMg: 100, divisible: true }],
    warning: "Em menores de 8 anos, limitar a situações em que o benefício supere o risco e não haja alternativa, conforme avaliação especializada.",
    rules: [
      { id: "d1-4.4", label: "D1 · 4,4 mg/kg/dia · 12/12 h", population: "Pediátrica", ageLabel: "Primeiro dia", basis: "day", doseMin: 4.4, unit: "mg", intervalHours: 12, maxDose: 100, maxDaily: 200, route: "VO", durationMin: 1, durationMax: 1, defaultDuration: 1, ...source("Doxycycline", "doxycycline") },
      { id: "maintenance-2.2", label: "Manutenção · 2,2 mg/kg/dia · 12/12 h", population: "Pediátrica", ageLabel: "Após o primeiro dia", basis: "day", doseMin: 2.2, unit: "mg", intervalHours: 12, maxDose: 100, maxDaily: 200, route: "VO", durationGuidance, ...source("Doxycycline", "doxycycline") },
    ],
  },
];
