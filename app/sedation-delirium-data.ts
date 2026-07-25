export type PreparedPresentation = {
  id: string;
  label: string;
  concentration: number | null;
  concentrationUnit: "mg/mL" | "mcg/mL";
  preparation?: string;
  manual?: boolean;
};

export type EnteralSedationMedication = {
  id: string;
  name: string;
  summary: string;
  doseUnit: "mg" | "mcg";
  minDosePerKg: number;
  maxDosePerKg: number;
  maxDose?: number;
  maxDaily?: number;
  defaultIntervalHours: number | null;
  intervalOptions: number[];
  presentations: PreparedPresentation[];
  note?: string;
};

export const ENTERAL_SEDATION_MEDICATIONS: EnteralSedationMedication[] = [
  {
    id: "metadona",
    name: "Metadona",
    summary: "Opioide de meia-vida longa, usado por via enteral em sedoanalgesia e abstinência.",
    doseUnit: "mg",
    minDosePerKg: 0.05,
    maxDosePerKg: 0.1,
    defaultIntervalHours: 6,
    intervalOptions: [4, 6],
    presentations: [
      { id: "xarope-1", label: "Xarope 1 mg/mL", concentration: 1, concentrationUnit: "mg/mL" },
      { id: "cp5-5ml", label: "Comprimido 5 mg + 5 mL de AD", concentration: 1, concentrationUnit: "mg/mL", preparation: "Macerar 1 comprimido de 5 mg e homogeneizar em 5 mL de água destilada, obtendo 1 mg/mL." },
      { id: "cp10-10ml", label: "Comprimido 10 mg + 10 mL de AD", concentration: 1, concentrationUnit: "mg/mL", preparation: "Macerar 1 comprimido de 10 mg e homogeneizar em 10 mL de água destilada, obtendo 1 mg/mL." },
    ],
    note: "Monitorar sedação, ventilação, intervalo QT e sinais de acúmulo conforme protocolo institucional.",
  },
  {
    id: "diazepam",
    name: "Diazepam",
    summary: "Benzodiazepínico por via enteral para sedação programada.",
    doseUnit: "mg",
    minDosePerKg: 0.2,
    maxDosePerKg: 0.3,
    maxDose: 10,
    defaultIntervalHours: 6,
    intervalOptions: [6, 8, 12],
    presentations: [
      { id: "cp5-5ml", label: "Comprimido 5 mg + 5 mL de AD", concentration: 1, concentrationUnit: "mg/mL", preparation: "Macerar 1 comprimido de 5 mg e homogeneizar em 5 mL de água destilada, obtendo 1 mg/mL." },
      { id: "cp10-10ml", label: "Comprimido 10 mg + 10 mL de AD", concentration: 1, concentrationUnit: "mg/mL", preparation: "Macerar 1 comprimido de 10 mg e homogeneizar em 10 mL de água destilada, obtendo 1 mg/mL." },
    ],
    note: "A dose oral máxima configurada é 10 mg por administração.",
  },
  {
    id: "lorazepam",
    name: "Lorazepam",
    summary: "Benzodiazepínico enteral de meia-vida longa.",
    doseUnit: "mg",
    minDosePerKg: 0.05,
    maxDosePerKg: 0.1,
    defaultIntervalHours: 6,
    intervalOptions: [4, 6, 8],
    presentations: [
      { id: "xarope-1", label: "Xarope 1 mg/mL", concentration: 1, concentrationUnit: "mg/mL" },
      { id: "cp2-2ml", label: "Comprimido 2 mg + 2 mL de AD", concentration: 1, concentrationUnit: "mg/mL", preparation: "Macerar 1 comprimido de 2 mg e homogeneizar em 2 mL de água destilada, obtendo 1 mg/mL." },
      { id: "cp2-5ml", label: "Comprimido 2 mg + 5 mL de AD", concentration: 0.4, concentrationUnit: "mg/mL", preparation: "Macerar 1 comprimido de 2 mg e homogeneizar em 5 mL de água destilada, obtendo 0,4 mg/mL." },
    ],
  },
  {
    id: "clonidina",
    name: "Clonidina",
    summary: "Agonista alfa-2 com efeito sedativo, analgésico e anti-hipertensivo.",
    doseUnit: "mcg",
    minDosePerKg: 1,
    maxDosePerKg: 5,
    maxDose: 200,
    defaultIntervalHours: 8,
    intervalOptions: [6, 8],
    presentations: [
      { id: "cp100-10ml", label: "Comprimido 100 mcg + 10 mL de AD", concentration: 10, concentrationUnit: "mcg/mL", preparation: "Macerar 1 comprimido de 100 mcg e homogeneizar em 10 mL de água destilada, obtendo 10 mcg/mL." },
    ],
    note: "Monitorar frequência cardíaca e pressão arterial. Evitar retirada abrupta pelo risco de hipertensão rebote.",
  },
  {
    id: "morfina",
    name: "Morfina",
    summary: "Opioide por via oral ou sonda para analgesia e sedação.",
    doseUnit: "mg",
    minDosePerKg: 0.05,
    maxDosePerKg: 0.2,
    defaultIntervalHours: 4,
    intervalOptions: [2, 4],
    presentations: [
      { id: "manual", label: "Solução oral · informar concentração", concentration: null, concentrationUnit: "mg/mL", manual: true },
    ],
    note: "Confirmar apresentação disponível e monitorar depressão respiratória e motilidade intestinal.",
  },
  {
    id: "hidrato-cloral",
    name: "Hidrato de cloral",
    summary: "Sedativo enteral com resposta menos previsível em crianças maiores.",
    doseUnit: "mg",
    minDosePerKg: 25,
    maxDosePerKg: 50,
    maxDaily: 2000,
    defaultIntervalHours: 6,
    intervalOptions: [6],
    presentations: [
      { id: "manual", label: "Solução oral · informar concentração", concentration: null, concentrationUnit: "mg/mL", manual: true },
    ],
    note: "Dose diária máxima configurada: 2 g/dia. O material alerta para efeito menos confiável acima de 3 anos.",
  },
  {
    id: "cetamina-vo",
    name: "Cetamina VO",
    summary: "Opção enteral de sedação dissociativa quando prevista no protocolo.",
    doseUnit: "mg",
    minDosePerKg: 6,
    maxDosePerKg: 10,
    defaultIntervalHours: null,
    intervalOptions: [],
    presentations: [
      { id: "manual", label: "Solução · informar concentração", concentration: null, concentrationUnit: "mg/mL", manual: true },
    ],
    note: "O intervalo não foi definido na tabela enviada; a prescrição fica como dose única/conforme protocolo.",
  },
];

export const DELIRIUM_MEDICATIONS = [
  { id: "haloperidol", name: "Haloperidol", summary: "Preferido nos quadros de delirium com agitação." },
  { id: "risperidona", name: "Risperidona", summary: "Opção para delirium misto, com esquema inicial e progressão após 4 dias." },
  { id: "olanzapina", name: "Olanzapina", summary: "Antipsicótico para delirium misto com dose fixa por faixa clínica." },
  { id: "clonidina", name: "Clonidina", summary: "Agonista alfa-2 com dose por peso e monitorização hemodinâmica." },
  { id: "melatonina", name: "Melatonina", summary: "Auxílio enteral para organização do ciclo sono-vigília." },
] as const;
