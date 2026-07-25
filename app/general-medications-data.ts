export type GeneralMedicationCategory =
  | "Antiparasitários"
  | "Analgésicos e antitérmicos"
  | "Trato gastrointestinal"
  | "Anti-histamínicos"
  | "Corticoides"
  | "Anafilaxia";

export type GeneralPresentation = {
  id: string;
  label: string;
  kind: "liquid" | "drops" | "solid" | "unit" | "topical";
  concentrationMgMl?: number;
  mgPerDrop?: number;
  strengthMg?: number;
  unitLabel?: string;
  note?: string;
  divisible?: boolean;
};

export type GeneralRegimen = {
  id: string;
  label: string;
  indication: string;
  route: string;
  frequency: string;
  duration?: string;
  ageLabel?: string;
  minAgeMonths?: number;
  maxAgeMonths?: number;
  minWeightKg?: number;
  maxWeightKg?: number;
  calculation:
    | { mode: "perKgDose"; min: number; max?: number; unit: "mg" | "mcg" | "g" | "mL"; maxDose?: number; administrationsPerDay?: number; maxDaily?: number }
    | { mode: "perKgDay"; min: number; max?: number; unit: "mg" | "g" | "mL"; administrationsPerDay: number; maxDaily?: number }
    | { mode: "fixed"; min: number; max?: number; unit: "mg" | "g" | "mL" | "drops" | "tablet" | "capsule" | "sachet" | "ampoule"; administrationsPerDay?: number }
    | { mode: "instruction"; text: string };
  requiredPresentationId?: string;
  note?: string;
};

export type GeneralMedication = {
  id: string;
  name: string;
  category: GeneralMedicationCategory;
  summary: string;
  presentations: GeneralPresentation[];
  regimens: GeneralRegimen[];
  warning?: string;
  notes?: string[];
};

export const GENERAL_MEDICATION_CATEGORIES: GeneralMedicationCategory[] = [
  "Antiparasitários",
  "Analgésicos e antitérmicos",
  "Trato gastrointestinal",
  "Anti-histamínicos",
  "Corticoides",
  "Anafilaxia",
];

export const GENERAL_MEDICATIONS: GeneralMedication[] = [
  {
    id: "albendazol",
    name: "Albendazol",
    category: "Antiparasitários",
    summary: "Anti-helmíntico com esquemas por idade e indicação.",
    presentations: [
      { id: "susp-40", label: "Suspensão 400 mg/10 mL", kind: "liquid", concentrationMgMl: 40 },
      { id: "cp-400", label: "Comprimido 400 mg", kind: "solid", strengthMg: 400, divisible: true },
    ],
    regimens: [
      { id: "maior-2", label: "> 2 anos · esquema habitual", indication: "Parasitoses intestinais", route: "VO", frequency: "1x/dia", duration: "3 a 5 dias", minAgeMonths: 24, calculation: { mode: "fixed", min: 400, unit: "mg", administrationsPerDay: 1 } },
      { id: "menor-2", label: "< 2 anos · avaliar risco-benefício", indication: "Parasitoses intestinais", route: "VO", frequency: "1x/dia", duration: "3 a 5 dias", maxAgeMonths: 23.99, calculation: { mode: "fixed", min: 200, unit: "mg", administrationsPerDay: 1 }, note: "Uso abaixo de 2 anos requer avaliação individual de risco-benefício." },
      { id: "toxocariase", label: "Toxocaríase", indication: "Toxocaríase", route: "VO", frequency: "12/12h", duration: "5 dias", calculation: { mode: "fixed", min: 400, unit: "mg", administrationsPerDay: 2 } },
      { id: "estrongiloidiase", label: "Estrongiloidíase", indication: "Estrongiloidíase", route: "VO", frequency: "12/12h", duration: "7 dias", calculation: { mode: "fixed", min: 400, unit: "mg", administrationsPerDay: 2 } },
    ],
  },
  {
    id: "ivermectina",
    name: "Ivermectina",
    category: "Antiparasitários",
    summary: "Dose única por peso; escabiose pode exigir repetição.",
    presentations: [{ id: "cp-6", label: "Comprimido 6 mg", kind: "solid", strengthMg: 6, divisible: true }],
    regimens: [
      { id: "200mcg", label: "Estrongiloidíase, filariose, ascaridíase, escabiose ou pediculose", indication: "Esquema 200 mcg/kg", route: "VO", frequency: "dose única", duration: "Escabiose: pode repetir após 1 a 2 semanas", minAgeMonths: 60, minWeightKg: 15, calculation: { mode: "perKgDose", min: 200, unit: "mcg" } },
      { id: "150mcg", label: "Oncocercose", indication: "Esquema 150 mcg/kg", route: "VO", frequency: "dose única", minAgeMonths: 60, minWeightKg: 15, calculation: { mode: "perKgDose", min: 150, unit: "mcg" } },
    ],
    warning: "O material limita o uso rotineiro a maiores de 5 anos e acima de 15 kg; fora disso, revisar indicação e protocolo.",
  },
  {
    id: "mebendazol",
    name: "Mebendazol",
    category: "Antiparasitários",
    summary: "Anti-helmíntico por via oral.",
    presentations: [
      { id: "susp-20", label: "Suspensão 100 mg/5 mL", kind: "liquid", concentrationMgMl: 20 },
      { id: "cp-100", label: "Comprimido 100 mg", kind: "solid", strengthMg: 100 },
    ],
    regimens: [{ id: "habitual", label: "Esquema habitual", indication: "Parasitoses intestinais", route: "VO", frequency: "1x/dia", duration: "3 a 7 dias", minAgeMonths: 24, calculation: { mode: "fixed", min: 100, unit: "mg", administrationsPerDay: 1 } }],
    warning: "Contraindicado abaixo de 1 ano; entre 1 e 2 anos, avaliar risco-benefício.",
  },
  {
    id: "nitazoxanida",
    name: "Nitazoxanida",
    category: "Antiparasitários",
    summary: "Esquema por peso para maiores de 1 ano.",
    presentations: [
      { id: "susp-20", label: "Suspensão 20 mg/mL", kind: "liquid", concentrationMgMl: 20 },
      { id: "cp-500", label: "Comprimido 500 mg", kind: "solid", strengthMg: 500 },
    ],
    regimens: [
      { id: "peso", label: "1 a 11 anos · por peso", indication: "Parasitoses intestinais", route: "VO", frequency: "12/12h", duration: "3 dias", minAgeMonths: 12, maxAgeMonths: 143.99, calculation: { mode: "perKgDose", min: 7.5, unit: "mg", maxDose: 300, administrationsPerDay: 2 }, requiredPresentationId: "susp-20" },
      { id: "adolescente", label: "≥ 12 anos", indication: "Parasitoses intestinais", route: "VO", frequency: "12/12h", duration: "3 dias", minAgeMonths: 144, calculation: { mode: "fixed", min: 500, unit: "mg", administrationsPerDay: 2 } },
      { id: "cripto-cd4-maior", label: "Criptosporidíase em imunodeprimido · CD4 > 50", indication: "Criptosporidíase", route: "VO", frequency: "12/12h", duration: "14 dias", calculation: { mode: "perKgDose", min: 7.5, unit: "mg", maxDose: 500, administrationsPerDay: 2 } },
      { id: "cripto-cd4-menor", label: "Criptosporidíase em imunodeprimido · CD4 < 50", indication: "Criptosporidíase", route: "VO", frequency: "12/12h", duration: "8 semanas ou até resolução", calculation: { mode: "perKgDose", min: 7.5, unit: "mg", maxDose: 500, administrationsPerDay: 2 } },
    ],
  },
  {
    id: "secnidazol",
    name: "Secnidazol",
    category: "Antiparasitários",
    summary: "Amebíase, giardíase e vaginose bacteriana.",
    presentations: [
      { id: "susp-30", label: "Suspensão reconstituída 30 mg/mL", kind: "liquid", concentrationMgMl: 30 },
      { id: "cp-500", label: "Comprimido 500 mg", kind: "solid", strengthMg: 500 },
      { id: "cp-1000", label: "Comprimido 1.000 mg", kind: "solid", strengthMg: 1000 },
    ],
    regimens: [
      { id: "intestinal", label: "Amebíase intestinal ou giardíase", indication: "Amebíase intestinal / giardíase", route: "VO", frequency: "dose única", calculation: { mode: "perKgDose", min: 30, unit: "mg", maxDose: 2000 } },
      { id: "hepatica", label: "Amebíase hepática", indication: "Amebíase hepática", route: "VO", frequency: "1x/dia", duration: "5 a 7 dias", calculation: { mode: "perKgDose", min: 30, unit: "mg", maxDose: 2000, administrationsPerDay: 1 } },
      { id: "vaginose", label: "Vaginose bacteriana em adolescente", indication: "Vaginose bacteriana", route: "VO", frequency: "dose única", minAgeMonths: 120, calculation: { mode: "fixed", min: 2000, unit: "mg" } },
    ],
  },
  {
    id: "permetrina-5",
    name: "Permetrina loção 5%",
    category: "Antiparasitários",
    summary: "Tratamento tópico da escabiose.",
    presentations: [{ id: "locao", label: "Loção 5%", kind: "topical" }],
    regimens: [{ id: "escabiose", label: "Escabiose", indication: "Escabiose", route: "Tópica", frequency: "Aplicar à noite", duration: "Repetir após 7 e 14 dias", minAgeMonths: 2, calculation: { mode: "instruction", text: "Aplicar em todo o corpo à noite, deixar agir por 8 a 14 horas e lavar pela manhã." } }],
    warning: "Não aprovada para menores de 2 meses.",
  },
  {
    id: "permetrina-1",
    name: "Permetrina loção 1%",
    category: "Antiparasitários",
    summary: "Tratamento tópico da pediculose.",
    presentations: [{ id: "locao", label: "Loção 1%", kind: "topical" }],
    regimens: [{ id: "pediculose", label: "Pediculose", indication: "Pediculose", route: "Tópica", frequency: "Aplicação única", duration: "Repetir após 14 dias se necessário", minAgeMonths: 2, calculation: { mode: "instruction", text: "Aplicar nos cabelos limpos e úmidos, deixar agir por 10 minutos, usar pente fino e enxaguar com água morna." } }],
    warning: "Não aprovada para menores de 2 meses.",
  },

  {
    id: "cetoprofeno",
    name: "Cetoprofeno",
    category: "Analgésicos e antitérmicos",
    summary: "Analgésico e anti-inflamatório com apresentações oral e parenteral.",
    presentations: [
      { id: "gotas-20", label: "Gotas 20 mg/mL · 1 mg/gota", kind: "drops", mgPerDrop: 1 },
      { id: "fa-50", label: "Frasco-ampola 50 mg/mL", kind: "liquid", concentrationMgMl: 50 },
      { id: "caps-50", label: "Cápsula 50 mg", kind: "solid", strengthMg: 50 },
    ],
    regimens: [
      { id: "1-6", label: "1 a 6 anos", indication: "Dor / febre", route: "VO", frequency: "6/6h ou 8/8h", minAgeMonths: 12, maxAgeMonths: 83.99, calculation: { mode: "perKgDose", min: 1, unit: "mg", administrationsPerDay: 4, maxDaily: 300 } },
      { id: "7-11", label: "7 a 11 anos", indication: "Dor / febre", route: "VO", frequency: "6/6h ou 8/8h", minAgeMonths: 84, maxAgeMonths: 143.99, calculation: { mode: "fixed", min: 25, unit: "mg", administrationsPerDay: 4 } },
      { id: "maior-11", label: "> 11 anos", indication: "Dor / febre", route: "VO", frequency: "6/6h ou 8/8h", minAgeMonths: 132, calculation: { mode: "fixed", min: 50, unit: "mg", administrationsPerDay: 4 } },
      { id: "ev", label: "Endovenoso", indication: "Dor / febre", route: "EV", frequency: "Conforme prescrição", calculation: { mode: "perKgDose", min: 1, unit: "mg", maxDose: 100 }, note: "Diluir em 50 a 100 mL de SF 0,9% e infundir em 30 minutos." },
    ],
  },
  {
    id: "cetorolaco",
    name: "Cetorolaco",
    category: "Analgésicos e antitérmicos",
    summary: "Analgésico não opioide por via IM, EV ou sublingual.",
    presentations: [
      { id: "fa-30", label: "Frasco-ampola 30 mg/mL", kind: "liquid", concentrationMgMl: 30 },
      { id: "cp-10", label: "Comprimido sublingual 10 mg", kind: "solid", strengthMg: 10 },
    ],
    regimens: [
      { id: "parenteral", label: "≥ 2 anos · IM ou EV", indication: "Dor", route: "IM/EV", frequency: "6/6h ou 8/8h", minAgeMonths: 24, calculation: { mode: "perKgDose", min: 0.5, unit: "mg", administrationsPerDay: 4, maxDaily: 60 }, note: "Pode ser administrado em bolus sem diluição; se diluir, usar SF 0,9%. Infusão mínima em 15 segundos." },
      { id: "vo", label: "Via oral / sublingual", indication: "Dor", route: "VO/SL", frequency: "4/4h ou 6/6h", minAgeMonths: 24, calculation: { mode: "perKgDose", min: 1, unit: "mg", maxDose: 10, administrationsPerDay: 4 }, requiredPresentationId: "cp-10" },
    ],
  },
  {
    id: "dipirona",
    name: "Dipirona",
    category: "Analgésicos e antitérmicos",
    summary: "Analgésico e antitérmico por via oral, IM ou EV.",
    presentations: [
      { id: "gotas", label: "Gotas 500 mg/mL · 25 mg/gota", kind: "drops", mgPerDrop: 25 },
      { id: "solucao", label: "Solução 50 mg/mL", kind: "liquid", concentrationMgMl: 50 },
      { id: "ampola", label: "Ampola 500 mg/mL", kind: "liquid", concentrationMgMl: 500 },
      { id: "cp-500", label: "Comprimido 500 mg", kind: "solid", strengthMg: 500, divisible: true },
      { id: "cp-1000", label: "Comprimido 1.000 mg", kind: "solid", strengthMg: 1000, divisible: true },
    ],
    regimens: [
      { id: "convencional", label: "Dose convencional", indication: "Dor / febre", route: "VO/IM/EV", frequency: "6/6h", minAgeMonths: 3, calculation: { mode: "perKgDose", min: 15, max: 25, unit: "mg", administrationsPerDay: 4, maxDaily: 4000 } },
      { id: "faixa-menor", label: "Faixa de 10 a 16 mg/kg/dose", indication: "Dor / febre", route: "VO/IM/EV", frequency: "6/6h", minAgeMonths: 3, calculation: { mode: "perKgDose", min: 10, max: 16, unit: "mg", administrationsPerDay: 4, maxDaily: 4000 } },
    ],
    notes: ["Para EV, o material orienta concentração final máxima de 50 mg/mL."],
  },
  {
    id: "ibuprofeno",
    name: "Ibuprofeno",
    category: "Analgésicos e antitérmicos",
    summary: "Analgésico, antitérmico e anti-inflamatório por via oral.",
    presentations: [
      { id: "susp-20", label: "Suspensão 100 mg/5 mL", kind: "liquid", concentrationMgMl: 20 },
      { id: "gotas-50", label: "Gotas 50 mg/mL · 5 mg/gota", kind: "drops", mgPerDrop: 5 },
      { id: "gotas-100", label: "Gotas 100 mg/mL · 10 mg/gota", kind: "drops", mgPerDrop: 10 },
      { id: "cp-400", label: "Comprimido 400 mg", kind: "solid", strengthMg: 400, divisible: true },
      { id: "cp-600", label: "Comprimido 600 mg", kind: "solid", strengthMg: 600, divisible: true },
    ],
    regimens: [
      { id: "analgesico", label: "Analgésico e antitérmico", indication: "Dor / febre", route: "VO", frequency: "Conforme prescrição", calculation: { mode: "perKgDose", min: 5, max: 10, unit: "mg", maxDose: 600 } },
      { id: "antiinflamatorio", label: "Anti-inflamatório", indication: "Inflamação", route: "VO", frequency: "6/6h ou 8/8h", duration: "No máximo 10 dias", calculation: { mode: "perKgDose", min: 15, max: 20, unit: "mg", administrationsPerDay: 4, maxDaily: 2400 } },
    ],
  },
  {
    id: "morfina",
    name: "Morfina",
    category: "Analgésicos e antitérmicos",
    summary: "Opioide para dor moderada a intensa.",
    presentations: [
      { id: "fa-1", label: "Frasco-ampola 1 mg/mL", kind: "liquid", concentrationMgMl: 1 },
      { id: "fa-10", label: "Frasco-ampola 10 mg/mL", kind: "liquid", concentrationMgMl: 10, note: "O material sugere diluir 1 mL + 9 mL de AD para obter 1 mg/mL." },
    ],
    regimens: [
      { id: "menor-6m", label: "< 6 meses", indication: "Analgesia", route: "EV/IM", frequency: "2/2h a 4/4h", maxAgeMonths: 5.99, calculation: { mode: "perKgDose", min: 0.025, max: 0.05, unit: "mg" } },
      { id: "maior-6m", label: "> 6 meses e < 50 kg", indication: "Analgesia", route: "EV/IM", frequency: "2/2h a 4/4h", minAgeMonths: 6, maxWeightKg: 49.99, calculation: { mode: "perKgDose", min: 0.05, max: 0.1, unit: "mg" } },
      { id: "maior-50kg", label: "> 50 kg", indication: "Analgesia", route: "EV/IM", frequency: "2/2h a 4/4h", minWeightKg: 50, calculation: { mode: "fixed", min: 2, max: 5, unit: "mg" } },
    ],
    warning: "Preferir a menor dose em paciente sem uso prévio de opioide. Não suspender abruptamente após uso prolongado.",
  },
  {
    id: "paracetamol",
    name: "Paracetamol",
    category: "Analgésicos e antitérmicos",
    summary: "Analgésico e antitérmico por via oral.",
    presentations: [
      { id: "gotas-200", label: "Gotas 200 mg/mL · 10 mg/gota", kind: "drops", mgPerDrop: 10 },
      { id: "gotas-100", label: "Gotas 100 mg/mL · 5 mg/gota", kind: "drops", mgPerDrop: 5 },
      { id: "sol-32", label: "Solução 160 mg/5 mL", kind: "liquid", concentrationMgMl: 32 },
      { id: "sol-100", label: "Solução 100 mg/mL", kind: "liquid", concentrationMgMl: 100 },
      { id: "cp-500", label: "Comprimido 500 mg", kind: "solid", strengthMg: 500, divisible: true },
      { id: "cp-750", label: "Comprimido 750 mg", kind: "solid", strengthMg: 750, divisible: true },
    ],
    regimens: [{ id: "habitual", label: "Dose habitual", indication: "Dor / febre", route: "VO", frequency: "Até 6/6h", calculation: { mode: "perKgDose", min: 10, max: 15, unit: "mg", administrationsPerDay: 4, maxDaily: 4000 } }],
  },
  {
    id: "tramadol",
    name: "Tramadol",
    category: "Analgésicos e antitérmicos",
    summary: "Analgésico opioide por via oral ou parenteral.",
    presentations: [
      { id: "gotas", label: "Gotas 100 mg/mL · 2,5 mg/gota", kind: "drops", mgPerDrop: 2.5 },
      { id: "ampola", label: "Ampola 50 mg/mL", kind: "liquid", concentrationMgMl: 50 },
      { id: "capsula", label: "Cápsula 50 mg", kind: "solid", strengthMg: 50 },
    ],
    regimens: [{ id: "habitual", label: "Dose habitual", indication: "Dor", route: "VO/EV/IM", frequency: "4/4h a 6/6h", calculation: { mode: "perKgDose", min: 1, max: 2, unit: "mg", maxDose: 100, maxDaily: 400 }, note: "Se EV, diluir em 50 a 100 mL de SF 0,9% e infundir em 30 minutos." }],
    notes: ["Pode causar náuseas; avaliar necessidade de antiemético."],
  },

  {
    id: "bromoprida",
    name: "Bromoprida",
    category: "Trato gastrointestinal",
    summary: "Pró-cinético e antiemético por via oral ou EV.",
    presentations: [
      { id: "gotas", label: "Gotas 4 mg/mL · 0,17 mg/gota", kind: "drops", mgPerDrop: 0.17 },
      { id: "fa", label: "Frasco-ampola 5 mg/mL", kind: "liquid", concentrationMgMl: 5 },
    ],
    regimens: [{ id: "habitual", label: "Dose diária dividida em 3 administrações", indication: "Náuseas / vômitos / dismotilidade", route: "VO/EV", frequency: "8/8h", calculation: { mode: "perKgDay", min: 0.5, max: 1, unit: "mg", administrationsPerDay: 3, maxDaily: 60 }, note: "Para EV, o material sugere diluir a dose em 20 mL de AD ou SF 0,9%." }],
  },
  {
    id: "dimenidrinato",
    name: "Dimenidrinato",
    category: "Trato gastrointestinal",
    summary: "Antiemético e antivertiginoso.",
    presentations: [
      { id: "gotas", label: "Gotas 25 mg/mL · 1 mg/gota", kind: "drops", mgPerDrop: 1 },
      { id: "fa", label: "Frasco-ampola 50 mg/mL", kind: "liquid", concentrationMgMl: 50 },
      { id: "caps-25", label: "Cápsula 25 mg", kind: "solid", strengthMg: 25 },
      { id: "caps-50", label: "Cápsula 50 mg", kind: "solid", strengthMg: 50 },
      { id: "cp-100", label: "Comprimido 100 mg", kind: "solid", strengthMg: 100 },
    ],
    regimens: [
      { id: "vo", label: "2 a 12 anos · VO", indication: "Náuseas / vômitos", route: "VO", frequency: "6/6h", minAgeMonths: 24, maxAgeMonths: 143.99, calculation: { mode: "perKgDose", min: 1, max: 1.5, unit: "mg", maxDose: 25, administrationsPerDay: 4 } },
      { id: "im", label: "2 a 12 anos · IM", indication: "Náuseas / vômitos", route: "IM", frequency: "6/6h", minAgeMonths: 24, maxAgeMonths: 143.99, calculation: { mode: "perKgDose", min: 1.25, unit: "mg", maxDose: 75, administrationsPerDay: 4 } },
      { id: "ev", label: "2 a 12 anos · EV", indication: "Náuseas / vômitos", route: "EV", frequency: "Conforme prescrição", minAgeMonths: 24, maxAgeMonths: 143.99, calculation: { mode: "perKgDose", min: 0.5, unit: "mg", maxDose: 25 } },
    ],
  },
  {
    id: "domperidona",
    name: "Domperidona",
    category: "Trato gastrointestinal",
    summary: "Pró-cinético e antiemético por via oral.",
    presentations: [
      { id: "susp", label: "Suspensão 1 mg/mL", kind: "liquid", concentrationMgMl: 1 },
      { id: "cp", label: "Comprimido 10 mg", kind: "solid", strengthMg: 10 },
    ],
    regimens: [
      { id: "menor-35", label: "< 35 kg", indication: "Náuseas / dismotilidade", route: "VO", frequency: "8/8h", maxWeightKg: 34.99, calculation: { mode: "perKgDose", min: 0.25, unit: "mg", administrationsPerDay: 3 } },
      { id: "maior-35", label: "> 35 kg", indication: "Náuseas / dismotilidade", route: "VO", frequency: "8/8h", minWeightKg: 35, calculation: { mode: "fixed", min: 10, unit: "mg", administrationsPerDay: 3 } },
    ],
  },
  {
    id: "escopolamina",
    name: "Escopolamina",
    category: "Trato gastrointestinal",
    summary: "Antiespasmódico por via oral, IM ou EV.",
    presentations: [
      { id: "gotas", label: "Gotas 10 mg/mL · 0,5 mg/gota", kind: "drops", mgPerDrop: 0.5 },
      { id: "cp", label: "Comprimido 10 mg", kind: "solid", strengthMg: 10 },
      { id: "fa", label: "Frasco-ampola 20 mg/mL", kind: "liquid", concentrationMgMl: 20 },
    ],
    regimens: [
      { id: "vo", label: "Via oral", indication: "Espasmo / cólica", route: "VO", frequency: "8/8h a 24/24h", calculation: { mode: "perKgDose", min: 0.3, max: 0.5, unit: "mg" } },
      { id: "parenteral", label: "IM ou EV", indication: "Espasmo / cólica", route: "IM/EV", frequency: "8/8h a 24/24h", calculation: { mode: "perKgDose", min: 0.3, max: 0.6, unit: "mg" }, note: "Diluir em SF ou SG e infundir em 5 minutos." },
    ],
    warning: "Evitar em lactentes.",
  },
  {
    id: "escopolamina-dipirona",
    name: "Escopolamina + dipirona",
    category: "Trato gastrointestinal",
    summary: "Associação antiespasmódica e analgésica.",
    presentations: [
      { id: "gotas", label: "Gotas 0,33 mg + 16,67 mg por gota", kind: "drops", mgPerDrop: 16.67, note: "O cálculo de gotas usa o componente dipirona apenas como aproximação de quantidade; confira a associação completa." },
      { id: "fa", label: "Ampola 4 mg/mL + 500 mg/mL", kind: "liquid", concentrationMgMl: 500, note: "A concentração cadastrada refere-se ao componente dipirona." },
    ],
    regimens: [
      { id: "menor-3", label: "< 3 anos · evitar", indication: "Cólica", route: "VO", frequency: "6/6h", maxAgeMonths: 35.99, calculation: { mode: "fixed", min: 5, max: 7, unit: "drops", administrationsPerDay: 4 } },
      { id: "3-6", label: "3 a 6 anos · evitar", indication: "Cólica", route: "VO", frequency: "6/6h", minAgeMonths: 36, maxAgeMonths: 83.99, calculation: { mode: "fixed", min: 7, max: 12, unit: "drops", administrationsPerDay: 4 } },
      { id: "maior-6", label: "> 6 anos", indication: "Cólica", route: "VO", frequency: "6/6h", minAgeMonths: 72, calculation: { mode: "fixed", min: 13, max: 20, unit: "drops", administrationsPerDay: 4 } },
      { id: "ev", label: "Endovenoso", indication: "Cólica", route: "EV", frequency: "Conforme prescrição", calculation: { mode: "perKgDose", min: 15, unit: "mg", maxDose: 2500 }, requiredPresentationId: "fa", note: "Equivalente à regra prática de 0,03 mL/kg da ampola. Administrar lentamente em 5 minutos; máximo 5 mL/dose." },
    ],
  },
  {
    id: "ondansetrona",
    name: "Ondansetrona",
    category: "Trato gastrointestinal",
    summary: "Antiemético por via oral ou EV.",
    presentations: [
      { id: "fa", label: "Frasco-ampola 2 mg/mL", kind: "liquid", concentrationMgMl: 2 },
      { id: "sol", label: "Solução 0,8 mg/mL", kind: "liquid", concentrationMgMl: 0.8 },
      { id: "gotas", label: "Gotas 8 mg/mL · 0,4 mg/gota", kind: "drops", mgPerDrop: 0.4 },
      { id: "cp-4", label: "Comprimido 4 mg", kind: "solid", strengthMg: 4, divisible: true },
      { id: "cp-8", label: "Comprimido 8 mg", kind: "solid", strengthMg: 8, divisible: true },
    ],
    regimens: [
      { id: "vo-menor-15", label: "VO · < 15 kg", indication: "Náuseas / vômitos", route: "VO", frequency: "8/8h", minAgeMonths: 3, maxWeightKg: 14.99, calculation: { mode: "perKgDose", min: 0.2, unit: "mg", administrationsPerDay: 3, maxDose: 16 } },
      { id: "vo-15-30", label: "VO · 15 a 30 kg", indication: "Náuseas / vômitos", route: "VO", frequency: "8/8h", minWeightKg: 15, maxWeightKg: 30, calculation: { mode: "fixed", min: 4, unit: "mg", administrationsPerDay: 3 } },
      { id: "vo-maior-30", label: "VO · > 30 kg", indication: "Náuseas / vômitos", route: "VO", frequency: "8/8h", minWeightKg: 30.01, calculation: { mode: "fixed", min: 8, unit: "mg", administrationsPerDay: 3 } },
      { id: "ev", label: "EV", indication: "Náuseas / vômitos", route: "EV", frequency: "Conforme prescrição", minAgeMonths: 3, calculation: { mode: "perKgDose", min: 0.15, max: 0.3, unit: "mg", maxDose: 16 }, note: "Pode ser administrada em push puro em 2 a 5 minutos ou diluída em 50 mL de SF 0,9% por 15 minutos." },
    ],
  },
  {
    id: "esomeprazol",
    name: "Esomeprazol",
    category: "Trato gastrointestinal",
    summary: "Inibidor de bomba de prótons por via oral.",
    presentations: [
      { id: "cp-20", label: "Comprimido 20 mg", kind: "solid", strengthMg: 20, divisible: true },
      { id: "cp-40", label: "Comprimido 40 mg", kind: "solid", strengthMg: 40, divisible: true },
    ],
    regimens: [
      { id: "por-peso", label: "Dose por peso", indication: "Supressão ácida", route: "VO", frequency: "1x/dia", calculation: { mode: "perKgDay", min: 0.7, max: 3.3, unit: "mg", administrationsPerDay: 1, maxDaily: 40 } },
      { id: "menor-20", label: "< 20 kg · dose fixa", indication: "Supressão ácida", route: "VO", frequency: "1x/dia", maxWeightKg: 19.99, calculation: { mode: "fixed", min: 10, unit: "mg", administrationsPerDay: 1 } },
      { id: "maior-20", label: "> 20 kg · dose fixa", indication: "Supressão ácida", route: "VO", frequency: "1x/dia", minWeightKg: 20, calculation: { mode: "fixed", min: 20, unit: "mg", administrationsPerDay: 1 } },
    ],
    notes: ["A apresentação dispersível indicada no material pode ser diluída em água."],
  },
  {
    id: "omeprazol",
    name: "Omeprazol",
    category: "Trato gastrointestinal",
    summary: "Inibidor de bomba de prótons por via oral ou EV.",
    presentations: [
      { id: "caps-10", label: "Cápsula 10 mg", kind: "solid", strengthMg: 10 },
      { id: "caps-20", label: "Cápsula 20 mg", kind: "solid", strengthMg: 20 },
      { id: "caps-40", label: "Cápsula 40 mg", kind: "solid", strengthMg: 40 },
      { id: "fa-4", label: "Frasco-ampola 4 mg/mL", kind: "liquid", concentrationMgMl: 4, note: "Usar o diluente próprio da apresentação." },
    ],
    regimens: [{ id: "habitual", label: "Dose habitual", indication: "Supressão ácida", route: "VO/EV", frequency: "1x/dia ou 12/12h em situações específicas", calculation: { mode: "perKgDay", min: 1, max: 2, unit: "mg", administrationsPerDay: 1, maxDaily: 40 } }],
    notes: ["A apresentação dispersível mencionada no material pode ser diluída em água e administrada por sonda."],
  },
  {
    id: "simeticona",
    name: "Simeticona",
    category: "Trato gastrointestinal",
    summary: "Antifisético por via oral.",
    presentations: [{ id: "gotas", label: "Gotas 75 mg/mL · referência 3 mg/gota", kind: "drops", mgPerDrop: 3, note: "A quantidade de mg por gota varia por fabricante; confirme na embalagem." }],
    regimens: [
      { id: "por-peso", label: "Dose por peso", indication: "Distensão gasosa", route: "VO", frequency: "6/6h", calculation: { mode: "perKgDose", min: 1, unit: "mg", administrationsPerDay: 4 } },
      { id: "menor-2", label: "< 2 anos · regra prática", indication: "Distensão gasosa", route: "VO", frequency: "Até 6/6h", maxAgeMonths: 23.99, calculation: { mode: "fixed", min: 5, unit: "drops", administrationsPerDay: 4 } },
      { id: "2-12", label: "2 a 12 anos · regra prática", indication: "Distensão gasosa", route: "VO", frequency: "Até 6/6h", minAgeMonths: 24, maxAgeMonths: 143.99, calculation: { mode: "fixed", min: 10, unit: "drops", administrationsPerDay: 4 } },
      { id: "maior-12", label: "> 12 anos · regra prática", indication: "Distensão gasosa", route: "VO", frequency: "Até 6/6h", minAgeMonths: 144, calculation: { mode: "fixed", min: 10, max: 30, unit: "drops", administrationsPerDay: 4 } },
    ],
  },
  {
    id: "zinco",
    name: "Biozinc / Unizinco",
    category: "Trato gastrointestinal",
    summary: "Suplementação de zinco na diarreia aguda.",
    presentations: [{ id: "sol-4", label: "Solução com 4 mg de zinco/mL", kind: "liquid", concentrationMgMl: 4 }],
    regimens: [
      { id: "menor-6", label: "< 6 meses", indication: "Diarreia aguda", route: "VO", frequency: "1x/dia", duration: "10 a 14 dias", maxAgeMonths: 5.99, calculation: { mode: "fixed", min: 2.5, unit: "mL", administrationsPerDay: 1 } },
      { id: "maior-6", label: "> 6 meses", indication: "Diarreia aguda", route: "VO", frequency: "1x/dia", duration: "10 a 14 dias", minAgeMonths: 6, calculation: { mode: "fixed", min: 5, unit: "mL", administrationsPerDay: 1 } },
    ],
  },
  {
    id: "s-boulardii",
    name: "Saccharomyces boulardii",
    category: "Trato gastrointestinal",
    summary: "Repositor de flora em sachê ou cápsula.",
    presentations: [
      { id: "sache-100", label: "Sachê 100 mg", kind: "solid", strengthMg: 100 },
      { id: "sache-200", label: "Sachê 200 mg", kind: "solid", strengthMg: 200 },
      { id: "caps-100", label: "Cápsula 100 mg", kind: "solid", strengthMg: 100 },
      { id: "caps-200", label: "Cápsula 200 mg", kind: "solid", strengthMg: 200 },
    ],
    regimens: [{ id: "habitual", label: "A partir de 1 ano", indication: "Diarreia", route: "VO", frequency: "12/12h", duration: "3 a 5 dias", minAgeMonths: 12, calculation: { mode: "fixed", min: 200, unit: "mg", administrationsPerDay: 2 } }],
    warning: "O material orienta evitar uma das marcas citadas em pacientes com APLV por possibilidade de traços de leite; confirme o produto utilizado.",
  },
  {
    id: "l-reuteri",
    name: "Lactobacillus reuteri",
    category: "Trato gastrointestinal",
    summary: "Probiótico em gotas, comprimido mastigável ou sachê.",
    presentations: [
      { id: "gotas", label: "Gotas · 5 gotas por dose", kind: "unit", unitLabel: "gotas" },
      { id: "cp", label: "Comprimido mastigável", kind: "unit", unitLabel: "comprimido" },
      { id: "sache", label: "Sachê", kind: "unit", unitLabel: "sachê" },
    ],
    regimens: [
      { id: "gotas", label: "Gotas", indication: "Reposição de flora", route: "VO", frequency: "1x/dia", duration: "Diarreia aguda: 5 a 7 dias", calculation: { mode: "fixed", min: 5, unit: "drops", administrationsPerDay: 1 }, requiredPresentationId: "gotas" },
      { id: "cp", label: "Comprimido", indication: "Reposição de flora", route: "VO", frequency: "1x/dia", calculation: { mode: "fixed", min: 1, unit: "tablet", administrationsPerDay: 1 }, requiredPresentationId: "cp" },
      { id: "sache", label: "Sachê", indication: "Reposição de flora", route: "VO", frequency: "1x/dia", calculation: { mode: "fixed", min: 1, unit: "sachet", administrationsPerDay: 1 }, requiredPresentationId: "sache", note: "Diluir em 10 mL de água." },
    ],
  },
  {
    id: "florax",
    name: "Florax",
    category: "Trato gastrointestinal",
    summary: "Repositor de flora em flaconete.",
    presentations: [{ id: "flaconete", label: "Flaconete 5 mL", kind: "unit", unitLabel: "flaconete" }],
    regimens: [{ id: "habitual", label: "Esquema habitual", indication: "Reposição de flora", route: "VO", frequency: "12/12h", calculation: { mode: "fixed", min: 1, unit: "ampoule", administrationsPerDay: 2 } }],
    notes: ["O material informa que pode ser usado em APLV."],
  },
  {
    id: "racecadotrila",
    name: "Racecadotrila",
    category: "Trato gastrointestinal",
    summary: "Antissecretor para diarreia aguda.",
    presentations: [
      { id: "sache-10", label: "Sachê 10 mg", kind: "solid", strengthMg: 10 },
      { id: "sache-30", label: "Sachê 30 mg", kind: "solid", strengthMg: 30 },
      { id: "cp-100", label: "Comprimido 100 mg", kind: "solid", strengthMg: 100 },
    ],
    regimens: [{ id: "habitual", label: "Dose habitual", indication: "Diarreia aguda", route: "VO", frequency: "8/8h", minAgeMonths: 3, calculation: { mode: "perKgDose", min: 1.5, unit: "mg", administrationsPerDay: 3, maxDaily: 400 }, note: "Suspender quando cessar a diarreia." }],
    warning: "Não utilizar em menores de 3 meses.",
  },
  {
    id: "sro",
    name: "Soro de reidratação oral",
    category: "Trato gastrointestinal",
    summary: "Reposição oral após vômitos ou evacuações diarreicas.",
    presentations: [{ id: "solucao", label: "Sachê reconstituído ou solução pronta", kind: "unit", unitLabel: "mL" }],
    regimens: [
      { id: "menor-1", label: "< 1 ano · Plano A", indication: "Prevenção da desidratação", route: "VO", frequency: "Após cada vômito ou evacuação", maxAgeMonths: 11.99, calculation: { mode: "fixed", min: 50, max: 100, unit: "mL" } },
      { id: "1-10", label: "1 a 10 anos · Plano A", indication: "Prevenção da desidratação", route: "VO", frequency: "Após cada vômito ou evacuação", minAgeMonths: 12, maxAgeMonths: 120, calculation: { mode: "fixed", min: 100, max: 200, unit: "mL" } },
    ],
    notes: ["Para prevenção, o material prefere soluções com 45 a 60 mmol/L de sódio; para tratamento, 75 a 90 mmol/L."],
  },
  {
    id: "colestiramina",
    name: "Colestiramina",
    category: "Trato gastrointestinal",
    summary: "Resina de troca aniônica; esquema requer conferência da unidade no protocolo local.",
    presentations: [{ id: "sache", label: "Sachê 4 g", kind: "unit", unitLabel: "sachê" }],
    regimens: [{ id: "referencia", label: "Esquema do material", indication: "Indicação clínica definida", route: "VO", frequency: "2x/dia", calculation: { mode: "instruction", text: "Diluir o sachê em cerca de 100 mL de água. Confirmar a unidade da dose por peso no protocolo institucional antes de prescrever." } }],
    warning: "Não usar em dieta zero; exige pelo menos dieta trófica.",
  },
  {
    id: "loperamida",
    name: "Loperamida",
    category: "Trato gastrointestinal",
    summary: "Antidiarreico por via oral.",
    presentations: [{ id: "cp-2", label: "Comprimido 2 mg", kind: "solid", strengthMg: 2, divisible: true }],
    regimens: [{ id: "habitual", label: "Dose por peso", indication: "Diarreia não infecciosa", route: "VO", frequency: "2 a 3x/dia", calculation: { mode: "perKgDose", min: 0.08, max: 0.24, unit: "mg", administrationsPerDay: 3 } }],
    warning: "Não utilizar em diarreias infecciosas.",
  },
  {
    id: "ursodesoxicolico",
    name: "Ácido ursodesoxicólico",
    category: "Trato gastrointestinal",
    summary: "Ácido biliar para diferentes causas de colestase.",
    presentations: [
      { id: "cp-50", label: "Comprimido 50 mg", kind: "solid", strengthMg: 50, divisible: true },
      { id: "cp-150", label: "Comprimido 150 mg", kind: "solid", strengthMg: 150, divisible: true },
      { id: "cp-300", label: "Comprimido 300 mg", kind: "solid", strengthMg: 300, divisible: true },
    ],
    regimens: [
      { id: "kasai", label: "Atresia de via biliar pós-Kasai", indication: "Atresia de via biliar", route: "VO/SNG/SNE", frequency: "8/8h ou 12/12h", calculation: { mode: "perKgDay", min: 10, max: 20, unit: "mg", administrationsPerDay: 2, maxDaily: 600 } },
      { id: "fibrose", label: "Fibrose cística", indication: "Fibrose cística", route: "VO/SNG/SNE", frequency: "12/12h", calculation: { mode: "perKgDay", min: 20, unit: "mg", administrationsPerDay: 2, maxDaily: 600 } },
      { id: "npt", label: "Colestase por NPT", indication: "Colestase por NPT", route: "VO/SNG/SNE", frequency: "8/8h", calculation: { mode: "perKgDay", min: 30, unit: "mg", administrationsPerDay: 3, maxDaily: 600 } },
      { id: "prurido", label: "Prurido por colestase", indication: "Prurido colestático", route: "VO/SNG/SNE", frequency: "12/12h", calculation: { mode: "perKgDay", min: 15, max: 20, unit: "mg", administrationsPerDay: 2, maxDaily: 600 } },
    ],
  },
  {
    id: "sucralfato",
    name: "Sucralfato",
    category: "Trato gastrointestinal",
    summary: "Protetor de mucosa por via oral.",
    presentations: [
      { id: "susp", label: "Suspensão 200 mg/mL", kind: "liquid", concentrationMgMl: 200 },
      { id: "cp", label: "Comprimido mastigável 1 g", kind: "solid", strengthMg: 1000, divisible: true },
    ],
    regimens: [
      { id: "ulcera", label: "Úlcera péptica", indication: "Úlcera péptica", route: "VO", frequency: "6/6h", calculation: { mode: "perKgDay", min: 40, max: 80, unit: "mg", administrationsPerDay: 4 }, note: "O material informa dose máxima de 1.000 mg; confirme se o teto local é por dose." },
      { id: "esofagite-menor", label: "Esofagite · 3 meses a 5 anos", indication: "Esofagite", route: "VO", frequency: "6/6h", minAgeMonths: 3, maxAgeMonths: 71.99, calculation: { mode: "fixed", min: 500, unit: "mg", administrationsPerDay: 4 } },
      { id: "esofagite-maior", label: "Esofagite · ≥ 6 anos", indication: "Esofagite", route: "VO", frequency: "6/6h", minAgeMonths: 72, calculation: { mode: "fixed", min: 1000, unit: "mg", administrationsPerDay: 4 } },
    ],
  },
  {
    id: "lactulose",
    name: "Lactulose",
    category: "Trato gastrointestinal",
    summary: "Laxativo osmótico e opção para encefalopatia hepática.",
    presentations: [
      { id: "xarope", label: "Xarope 667 mg/mL", kind: "liquid", concentrationMgMl: 667 },
      { id: "sache", label: "Sachê 10 g/15 mL", kind: "unit", unitLabel: "sachê" },
    ],
    regimens: [
      { id: "constipacao", label: "Constipação", indication: "Constipação", route: "VO", frequency: "Preferencialmente 1x/dia", minAgeMonths: 6, calculation: { mode: "perKgDay", min: 1, max: 3, unit: "mL", administrationsPerDay: 1, maxDaily: 60 }, note: "Começar pela menor dose; considerar dividir se o volume for elevado." },
      { id: "eh-lactente", label: "Encefalopatia hepática · lactente", indication: "Encefalopatia hepática", route: "VO", frequency: "6/6h a 8/8h", calculation: { mode: "fixed", min: 2.5, max: 10, unit: "mL" }, note: "Ajustar para 2 a 3 evacuações por dia." },
      { id: "eh-crianca", label: "Encefalopatia hepática · criança/adolescente", indication: "Encefalopatia hepática", route: "VO", frequency: "4/4h a 8/8h", calculation: { mode: "instruction", text: "Ajustar a dose ao objetivo de 2 a 3 evacuações por dia. Confirmar a faixa de volume diário no protocolo institucional antes de automatizar." } },
    ],
  },
  {
    id: "polietilenoglicol",
    name: "Polietilenoglicol",
    category: "Trato gastrointestinal",
    summary: "Laxativo osmótico em sachês.",
    presentations: [
      { id: "sache-8.5", label: "Sachê 8,5 g", kind: "solid", strengthMg: 8500 },
      { id: "sache-14", label: "Sachê 14 g", kind: "solid", strengthMg: 14000 },
      { id: "sache-17", label: "Sachê 17 g", kind: "solid", strengthMg: 17000 },
    ],
    regimens: [
      { id: "desimpactacao", label: "Desimpactação", indication: "Desimpactação fecal", route: "VO", frequency: "1x/dia ou dividido", duration: "3 a 6 dias", calculation: { mode: "perKgDay", min: 1, max: 1.5, unit: "g", administrationsPerDay: 1, maxDaily: 100 } },
      { id: "constipacao", label: "Constipação", indication: "Constipação", route: "VO", frequency: "1x/dia", duration: "Manter por pelo menos 2 meses após desimpactação", calculation: { mode: "perKgDay", min: 0.4, max: 1, unit: "g", administrationsPerDay: 1, maxDaily: 17 } },
    ],
  },
  {
    id: "clister",
    name: "Clister",
    category: "Trato gastrointestinal",
    summary: "Opções glicerinada e com soro fisiológico.",
    presentations: [
      { id: "glicerinado", label: "Clister glicerinado 12,5%", kind: "unit", unitLabel: "mL" },
      { id: "sf", label: "Clister com SF 0,9%", kind: "unit", unitLabel: "mL" },
    ],
    regimens: [
      { id: "glicerinado", label: "Clister glicerinado", indication: "Evacuação retal", route: "Retal", frequency: "dose única", calculation: { mode: "perKgDose", min: 10, unit: "mL", maxDose: 250 }, requiredPresentationId: "glicerinado" },
      { id: "sf", label: "Clister com SF 0,9%", indication: "Evacuação retal", route: "Retal", frequency: "gota a gota", calculation: { mode: "perKgDose", min: 20, unit: "mL", maxDose: 500 }, requiredPresentationId: "sf" },
    ],
  },
  {
    id: "solucao-mucosite",
    name: "Solução para mucosite",
    category: "Trato gastrointestinal",
    summary: "Preparação tópica oral para bochecho.",
    presentations: [{ id: "preparo", label: "Preparação magistral", kind: "unit", unitLabel: "preparo" }],
    regimens: [{ id: "preparo", label: "Preparo e administração", indication: "Mucosite", route: "Bochecho", frequency: "8/8h", calculation: { mode: "instruction", text: "Misturar xilocaína 5 mL + nistatina 5 mL + eritromicina 5 mL + hidróxido de alumínio 5 mL. Bochechar e cuspir." } }],
    warning: "Revisar compatibilidade, estabilidade e protocolo institucional antes do preparo.",
  },
  {
    id: "nistatina",
    name: "Nistatina",
    category: "Trato gastrointestinal",
    summary: "Antifúngico oral para candidíase de mucosa.",
    presentations: [{ id: "susp", label: "Suspensão oral 100.000 UI/mL", kind: "unit", unitLabel: "mL" }],
    regimens: [{ id: "habitual", label: "Esquema do material", indication: "Candidíase oral", route: "VO", frequency: "6/6h", duration: "Até 2 dias após resolução das lesões", calculation: { mode: "fixed", min: 4, unit: "mL", administrationsPerDay: 4 } }],
  },

  {
    id: "hidroxizina",
    name: "Hidroxizina",
    category: "Anti-histamínicos",
    summary: "Anti-histamínico sedativo por via oral.",
    presentations: [
      { id: "xarope", label: "Xarope 10 mg/5 mL", kind: "liquid", concentrationMgMl: 2 },
      { id: "cp", label: "Comprimido 25 mg", kind: "solid", strengthMg: 25, divisible: true },
    ],
    regimens: [
      { id: "menor-40-q6", label: "≤ 40 kg · 6/6h", indication: "Alergia / prurido", route: "VO", frequency: "6/6h", maxWeightKg: 40, calculation: { mode: "perKgDay", min: 2, unit: "mg", administrationsPerDay: 4, maxDaily: 100 } },
      { id: "menor-40-q8", label: "≤ 40 kg · 8/8h", indication: "Alergia / prurido", route: "VO", frequency: "8/8h", maxWeightKg: 40, calculation: { mode: "perKgDay", min: 2, unit: "mg", administrationsPerDay: 3, maxDaily: 75 } },
      { id: "maior-40", label: "> 40 kg", indication: "Alergia / prurido", route: "VO", frequency: "1 a 2x/dia", minWeightKg: 40.01, calculation: { mode: "fixed", min: 25, max: 50, unit: "mg", administrationsPerDay: 2 } },
    ],
    notes: ["Em insuficiência renal moderada a grave, o material orienta reduzir a dose pela metade."],
  },
  {
    id: "loratadina",
    name: "Loratadina",
    category: "Anti-histamínicos",
    summary: "Anti-histamínico de segunda geração.",
    presentations: [
      { id: "xarope", label: "Xarope 1 mg/mL", kind: "liquid", concentrationMgMl: 1 },
      { id: "cp", label: "Comprimido 10 mg", kind: "solid", strengthMg: 10, divisible: true },
    ],
    regimens: [
      { id: "2-6", label: "2 a < 6 anos", indication: "Alergia", route: "VO", frequency: "1x/dia", minAgeMonths: 24, maxAgeMonths: 71.99, calculation: { mode: "fixed", min: 5, unit: "mg", administrationsPerDay: 1 } },
      { id: "maior-6", label: "≥ 6 anos", indication: "Alergia", route: "VO", frequency: "1x/dia ou dividido em 2 tomadas", minAgeMonths: 72, calculation: { mode: "fixed", min: 10, unit: "mg", administrationsPerDay: 1 } },
    ],
  },
  {
    id: "desloratadina",
    name: "Desloratadina",
    category: "Anti-histamínicos",
    summary: "Anti-histamínico de segunda geração com doses por idade.",
    presentations: [
      { id: "xarope", label: "Xarope 0,5 mg/mL", kind: "liquid", concentrationMgMl: 0.5 },
      { id: "gotas", label: "Gotas 1,25 mg/mL · 0,0625 mg/gota", kind: "drops", mgPerDrop: 0.0625 },
      { id: "cp", label: "Comprimido 5 mg", kind: "solid", strengthMg: 5 },
    ],
    regimens: [
      { id: "6-11m", label: "6 a 11 meses", indication: "Alergia", route: "VO", frequency: "1x/dia", minAgeMonths: 6, maxAgeMonths: 11.99, calculation: { mode: "fixed", min: 1, unit: "mg", administrationsPerDay: 1 } },
      { id: "1-5a", label: "1 a 5 anos", indication: "Alergia", route: "VO", frequency: "1x/dia", minAgeMonths: 12, maxAgeMonths: 71.99, calculation: { mode: "fixed", min: 1.25, unit: "mg", administrationsPerDay: 1 } },
      { id: "6-11a", label: "6 a 11 anos", indication: "Alergia", route: "VO", frequency: "1x/dia", minAgeMonths: 72, maxAgeMonths: 143.99, calculation: { mode: "fixed", min: 2.5, unit: "mg", administrationsPerDay: 1 } },
      { id: "maior-12", label: "≥ 12 anos", indication: "Alergia", route: "VO", frequency: "1x/dia", minAgeMonths: 144, calculation: { mode: "fixed", min: 5, unit: "mg", administrationsPerDay: 1 } },
    ],
  },
  {
    id: "dexclorfeniramina",
    name: "Dexclorfeniramina",
    category: "Anti-histamínicos",
    summary: "Anti-histamínico de primeira geração.",
    presentations: [
      { id: "solucao", label: "Solução 0,4 mg/mL", kind: "liquid", concentrationMgMl: 0.4 },
      { id: "gotas", label: "Gotas 0,14 mg/gota", kind: "drops", mgPerDrop: 0.14 },
      { id: "cp", label: "Comprimido 2 mg", kind: "solid", strengthMg: 2, divisible: true },
    ],
    regimens: [
      { id: "2-6", label: "2 a < 6 anos", indication: "Alergia", route: "VO", frequency: "4/4h ou 6/6h", minAgeMonths: 24, maxAgeMonths: 71.99, calculation: { mode: "fixed", min: 0.5, unit: "mg" } },
      { id: "6-12", label: "6 a < 12 anos", indication: "Alergia", route: "VO", frequency: "4/4h ou 6/6h", minAgeMonths: 72, maxAgeMonths: 143.99, calculation: { mode: "fixed", min: 1, unit: "mg" } },
      { id: "maior-12", label: "≥ 12 anos", indication: "Alergia", route: "VO", frequency: "4/4h ou 6/6h", minAgeMonths: 144, calculation: { mode: "fixed", min: 2, unit: "mg" } },
    ],
  },
  {
    id: "difenidramina",
    name: "Difenidramina",
    category: "Anti-histamínicos",
    summary: "Anti-histamínico parenteral.",
    presentations: [{ id: "fa", label: "Frasco-ampola 50 mg/mL", kind: "liquid", concentrationMgMl: 50 }],
    regimens: [{ id: "ev", label: "Endovenoso", indication: "Alergia", route: "EV", frequency: "6/6h ou 8/8h", calculation: { mode: "perKgDose", min: 1, unit: "mg", maxDose: 50 }, note: "Infundir em 10 a 15 minutos; o material informa velocidade máxima de 25 mg/min em SF 0,9% ou SG 5%." }],
  },
  {
    id: "fexofenadina",
    name: "Fexofenadina",
    category: "Anti-histamínicos",
    summary: "Anti-histamínico de segunda geração com doses por idade e peso.",
    presentations: [
      { id: "solucao", label: "Solução 6 mg/mL", kind: "liquid", concentrationMgMl: 6 },
      { id: "cp-60", label: "Comprimido 60 mg", kind: "solid", strengthMg: 60 },
      { id: "cp-120", label: "Comprimido 120 mg", kind: "solid", strengthMg: 120 },
      { id: "cp-180", label: "Comprimido 180 mg", kind: "solid", strengthMg: 180 },
    ],
    regimens: [
      { id: "6m-2a-menor", label: "6 meses a < 2 anos e < 10,5 kg", indication: "Alergia", route: "VO", frequency: "12/12h", minAgeMonths: 6, maxAgeMonths: 23.99, maxWeightKg: 10.49, calculation: { mode: "fixed", min: 15, unit: "mg", administrationsPerDay: 2 } },
      { id: "6m-2a-maior", label: "6 meses a < 2 anos e ≥ 10,5 kg", indication: "Alergia", route: "VO", frequency: "12/12h", minAgeMonths: 6, maxAgeMonths: 23.99, minWeightKg: 10.5, calculation: { mode: "fixed", min: 30, unit: "mg", administrationsPerDay: 2 } },
      { id: "2-12", label: "2 a < 12 anos", indication: "Alergia", route: "VO", frequency: "12/12h", minAgeMonths: 24, maxAgeMonths: 143.99, calculation: { mode: "fixed", min: 30, unit: "mg", administrationsPerDay: 2 } },
      { id: "maior-12-q12", label: "≥ 12 anos · 12/12h", indication: "Alergia", route: "VO", frequency: "12/12h", minAgeMonths: 144, calculation: { mode: "fixed", min: 60, unit: "mg", administrationsPerDay: 2 } },
      { id: "maior-12-q24", label: "≥ 12 anos · 1x/dia", indication: "Alergia", route: "VO", frequency: "1x/dia", minAgeMonths: 144, calculation: { mode: "fixed", min: 120, max: 180, unit: "mg", administrationsPerDay: 1 } },
    ],
    notes: ["Em disfunção renal, o material apresenta reduções específicas por faixa etária; revisar função renal antes de liberar a dose."],
  },
  {
    id: "ebastina",
    name: "Ebastina",
    category: "Anti-histamínicos",
    summary: "Anti-histamínico de segunda geração.",
    presentations: [
      { id: "solucao", label: "Solução 1 mg/mL", kind: "liquid", concentrationMgMl: 1 },
      { id: "cp", label: "Comprimido 10 mg", kind: "solid", strengthMg: 10, divisible: true },
    ],
    regimens: [
      { id: "2-5", label: "2 a 5 anos", indication: "Alergia", route: "VO", frequency: "1x/dia", minAgeMonths: 24, maxAgeMonths: 71.99, calculation: { mode: "fixed", min: 2.5, unit: "mg", administrationsPerDay: 1 } },
      { id: "6-11", label: "6 a 11 anos", indication: "Alergia", route: "VO", frequency: "1x/dia", minAgeMonths: 72, maxAgeMonths: 143.99, calculation: { mode: "fixed", min: 5, unit: "mg", administrationsPerDay: 1 } },
      { id: "maior-12", label: "≥ 12 anos", indication: "Alergia", route: "VO", frequency: "1x/dia", minAgeMonths: 144, calculation: { mode: "fixed", min: 10, unit: "mg", administrationsPerDay: 1 } },
    ],
    warning: "Não recomendada abaixo de 2 anos.",
  },
  {
    id: "bilastina",
    name: "Bilastina",
    category: "Anti-histamínicos",
    summary: "Anti-histamínico de segunda geração.",
    presentations: [
      { id: "solucao", label: "Solução 2,5 mg/mL", kind: "liquid", concentrationMgMl: 2.5 },
      { id: "cp-10", label: "Comprimido 10 mg", kind: "solid", strengthMg: 10 },
      { id: "cp-20", label: "Comprimido 20 mg", kind: "solid", strengthMg: 20 },
    ],
    regimens: [
      { id: "4-11", label: "4 a 11 anos e ≥ 16 kg", indication: "Alergia", route: "VO", frequency: "1x/dia", minAgeMonths: 48, maxAgeMonths: 143.99, minWeightKg: 16, calculation: { mode: "fixed", min: 10, unit: "mg", administrationsPerDay: 1 } },
      { id: "maior-12", label: "≥ 12 anos", indication: "Alergia", route: "VO", frequency: "1x/dia", minAgeMonths: 144, calculation: { mode: "fixed", min: 20, unit: "mg", administrationsPerDay: 1 } },
    ],
  },
  {
    id: "prometazina",
    name: "Prometazina",
    category: "Anti-histamínicos",
    summary: "Anti-histamínico sedativo por via oral ou IM; evitar EV.",
    presentations: [
      { id: "fa", label: "Frasco-ampola 25 mg/mL", kind: "liquid", concentrationMgMl: 25 },
      { id: "cp", label: "Comprimido 25 mg", kind: "solid", strengthMg: 25 },
    ],
    regimens: [{ id: "pediatrico", label: "≥ 2 anos", indication: "Alergia", route: "VO/IM", frequency: "4/4h ou 6/6h", minAgeMonths: 24, calculation: { mode: "perKgDose", min: 0.25, max: 1, unit: "mg", maxDose: 25 } }],
    warning: "Evitar a via EV. Administrar lentamente quando a via parenteral for necessária.",
  },

  {
    id: "prednisolona",
    name: "Prednisolona",
    category: "Corticoides",
    summary: "Corticoide sistêmico por via oral.",
    presentations: [
      { id: "solucao", label: "Solução 15 mg/5 mL", kind: "liquid", concentrationMgMl: 3 },
      { id: "cp-5", label: "Comprimido 5 mg", kind: "solid", strengthMg: 5, divisible: true },
      { id: "cp-10", label: "Comprimido 10 mg", kind: "solid", strengthMg: 10, divisible: true },
      { id: "cp-20", label: "Comprimido 20 mg", kind: "solid", strengthMg: 20, divisible: true },
      { id: "cp-40", label: "Comprimido 40 mg", kind: "solid", strengthMg: 40, divisible: true },
    ],
    regimens: [
      { id: "asma-menor-12", label: "Asma · < 12 anos", indication: "Exacerbação de asma", route: "VO", frequency: "1 a 2 tomadas/dia", maxAgeMonths: 143.99, calculation: { mode: "perKgDay", min: 1, max: 2, unit: "mg", administrationsPerDay: 1, maxDaily: 60 } },
      { id: "asma-maior-12", label: "Asma · ≥ 12 anos", indication: "Exacerbação de asma", route: "VO", frequency: "1 a 2 tomadas/dia", minAgeMonths: 144, calculation: { mode: "fixed", min: 40, max: 60, unit: "mg", administrationsPerDay: 1 } },
      { id: "antiinflamatorio", label: "Anti-inflamatório / imunossupressor", indication: "Indicação clínica definida", route: "VO", frequency: "Conforme prescrição", calculation: { mode: "perKgDay", min: 0.1, max: 2, unit: "mg", administrationsPerDay: 1, maxDaily: 60 } },
      { id: "anafilaxia-adjuvante", label: "Anafilaxia · terapia adjuvante", indication: "Anafilaxia", route: "VO", frequency: "Conforme prescrição", calculation: { mode: "perKgDay", min: 0.5, max: 1, unit: "mg", administrationsPerDay: 1, maxDaily: 60 }, note: "Não substitui adrenalina IM." },
    ],
  },
  {
    id: "hidrocortisona",
    name: "Hidrocortisona",
    category: "Corticoides",
    summary: "Corticoide sistêmico por via IM ou EV.",
    presentations: [{ id: "fa", label: "Frasco-ampola 500 mg + 5 mL · 100 mg/mL", kind: "liquid", concentrationMgMl: 100 }],
    regimens: [
      { id: "asma-ataque", label: "Asma · ataque", indication: "Exacerbação de asma", route: "IM/EV", frequency: "dose de ataque", calculation: { mode: "perKgDose", min: 10, unit: "mg", maxDose: 200 } },
      { id: "asma-manutencao", label: "Asma · manutenção", indication: "Exacerbação de asma", route: "EV", frequency: "4/4h ou 6/6h", calculation: { mode: "perKgDose", min: 4, max: 6, unit: "mg", maxDaily: 500 }, note: "O material orienta concentração máxima de 5 mg/mL em SF 0,9% ou SG 5%, com infusão em 1 hora." },
    ],
  },
  {
    id: "metilprednisolona",
    name: "Metilprednisolona",
    category: "Corticoides",
    summary: "Corticoide sistêmico por via EV.",
    presentations: [
      { id: "fa-40", label: "Apresentação 40 mg/mL", kind: "liquid", concentrationMgMl: 40 },
      { id: "fa-62.5", label: "Apresentação 62,5 mg/mL", kind: "liquid", concentrationMgMl: 62.5 },
    ],
    regimens: [
      { id: "asma-menor-12", label: "Asma · < 12 anos", indication: "Exacerbação de asma", route: "EV", frequency: "Dividido ao longo do dia", maxAgeMonths: 143.99, calculation: { mode: "perKgDay", min: 1, max: 2, unit: "mg", administrationsPerDay: 1, maxDaily: 60 } },
      { id: "asma-maior-12", label: "Asma · ≥ 12 anos", indication: "Exacerbação de asma", route: "EV", frequency: "Conforme prescrição", minAgeMonths: 144, calculation: { mode: "fixed", min: 40, max: 60, unit: "mg" } },
      { id: "grave-ataque", label: "Exacerbação grave · ataque", indication: "Exacerbação grave", route: "EV", frequency: "dose de ataque", calculation: { mode: "perKgDose", min: 2, unit: "mg" } },
      { id: "grave-manutencao", label: "Exacerbação grave · manutenção inicial", indication: "Exacerbação grave", route: "EV", frequency: "6/6h por 48 horas", duration: "48 horas", calculation: { mode: "perKgDay", min: 2, max: 4, unit: "mg", administrationsPerDay: 4, maxDaily: 120 }, note: "Após 48 horas, o material sugere reduzir para 2 mg/kg/dia." },
    ],
    warning: "Somente o succinato de metilprednisolona é apropriado para administração EV. Confirmar a apresentação disponível.",
  },
  {
    id: "dexametasona",
    name: "Dexametasona",
    category: "Corticoides",
    summary: "Corticoide sistêmico com diferentes esquemas por indicação.",
    presentations: [
      { id: "fa-4", label: "Ampola 4 mg/mL", kind: "liquid", concentrationMgMl: 4 },
      { id: "fa-8", label: "Ampola 8 mg/mL", kind: "liquid", concentrationMgMl: 8 },
      { id: "elixir", label: "Elixir 0,1 mg/mL", kind: "liquid", concentrationMgMl: 0.1 },
      { id: "cp", label: "Comprimido 4 mg", kind: "solid", strengthMg: 4, divisible: true },
    ],
    regimens: [
      { id: "crupe", label: "Crupe", indication: "Crupe", route: "VO/IM/EV", frequency: "dose única", calculation: { mode: "perKgDose", min: 0.6, unit: "mg", maxDose: 16 } },
      { id: "crupe-leve", label: "Crupe · faixa de 0,15 a 0,6 mg/kg", indication: "Crupe leve", route: "VO/IM/EV", frequency: "dose única", calculation: { mode: "perKgDose", min: 0.15, max: 0.6, unit: "mg", maxDose: 16 } },
      { id: "antiinflamatorio", label: "Anti-inflamatório", indication: "Indicação clínica definida", route: "VO/IM/EV", frequency: "6/6h ou 12/12h", calculation: { mode: "perKgDay", min: 0.02, max: 0.3, unit: "mg", administrationsPerDay: 2 } },
      { id: "asma", label: "Exacerbação de asma", indication: "Exacerbação de asma", route: "VO/IM/EV", frequency: "1x/dia", calculation: { mode: "perKgDose", min: 0.6, unit: "mg", maxDose: 16, administrationsPerDay: 1 } },
      { id: "ev-q6", label: "Bebês > 6 semanas e crianças · EV", indication: "Indicação clínica definida", route: "EV", frequency: "6/6h", minAgeMonths: 1.5, calculation: { mode: "perKgDose", min: 0.15, unit: "mg", administrationsPerDay: 4 }, note: "Infundir em 30 minutos." },
    ],
  },

  {
    id: "adrenalina-anafilaxia",
    name: "Adrenalina na anafilaxia",
    category: "Anafilaxia",
    summary: "Primeira linha da anafilaxia, por via intramuscular no vasto lateral.",
    presentations: [{ id: "fa-1", label: "Adrenalina 1 mg/mL · 1:1.000", kind: "liquid", concentrationMgMl: 1 }],
    regimens: [
      { id: "peso", label: "Dose por peso", indication: "Anafilaxia", route: "IM no vasto lateral", frequency: "Repetir a cada 5 a 15 minutos, até 3 doses", calculation: { mode: "perKgDose", min: 0.01, unit: "mg", maxDose: 0.5 } },
      { id: "menor-6m", label: "Alternativa fixa · < 6 meses", indication: "Anafilaxia", route: "IM no vasto lateral", frequency: "Repetir a cada 5 a 15 minutos, até 3 doses", maxAgeMonths: 5.99, calculation: { mode: "fixed", min: 0.1, max: 0.15, unit: "mg" } },
      { id: "6m-6a", label: "Alternativa fixa · 6 meses a 6 anos", indication: "Anafilaxia", route: "IM no vasto lateral", frequency: "Repetir a cada 5 a 15 minutos, até 3 doses", minAgeMonths: 6, maxAgeMonths: 83.99, calculation: { mode: "fixed", min: 0.15, unit: "mg" } },
      { id: "6-12a", label: "Alternativa fixa · 6 a 12 anos", indication: "Anafilaxia", route: "IM no vasto lateral", frequency: "Repetir a cada 5 a 15 minutos, até 3 doses", minAgeMonths: 72, maxAgeMonths: 143.99, calculation: { mode: "fixed", min: 0.3, unit: "mg" } },
      { id: "maior-12a", label: "Alternativa fixa · > 12 anos", indication: "Anafilaxia", route: "IM no vasto lateral", frequency: "Repetir a cada 5 a 15 minutos, até 3 doses", minAgeMonths: 144, calculation: { mode: "fixed", min: 0.5, unit: "mg" } },
    ],
    warning: "Anafilaxia é emergência. Não atrasar adrenalina IM. Casos graves ou com múltiplas doses exigem observação prolongada e monitorização.",
    notes: ["Observação sugerida no material: 4 a 6 horas em quadros leves; 12 a 24 horas em quadros graves ou após múltiplas doses, devido ao risco de reação bifásica."],
  },
];
