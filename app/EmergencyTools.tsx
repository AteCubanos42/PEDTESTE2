"use client";

import { useMemo, useState } from "react";
import {
  FEMALE_BLOOD_PRESSURE_REFERENCES,
  INFANT_BLOOD_PRESSURE_REFERENCES,
  MALE_BLOOD_PRESSURE_REFERENCES,
  type BloodPressureReference,
  type BloodPressureSex,
} from "./blood-pressure-data";

type AgeUnit = "dias" | "meses" | "anos";
type PercentileKey = "P5" | "P10" | "P50" | "P90" | "P95" | "P95Plus12";

type DoseRow = {
  name: string;
  presentation: string;
  dose: string;
  dilution: string;
  amount: number | null;
  unit: "mL" | "J";
  note?: string;
};

const PERCENTILES: PercentileKey[] = ["P5", "P10", "P50", "P90", "P95", "P95Plus12"];

const PERCENTILE_LABELS: Record<PercentileKey, string> = {
  P5: "P5",
  P10: "P10",
  P50: "P50",
  P90: "P90",
  P95: "P95",
  P95Plus12: "P95 + 12 mmHg",
};

function numeric(value: string) {
  if (!value.trim()) return Number.NaN;
  return Number(value.replace(",", "."));
}

function fmt(value: number, digits = 1) {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: digits,
    minimumFractionDigits: 0,
  }).format(value);
}

function fmtDose(value: number | null) {
  if (value === null || !Number.isFinite(value)) return "—";
  if (Math.abs(value) < 0.1) return fmt(value, 4);
  if (Math.abs(value) < 1) return fmt(value, 3);
  return fmt(value, 1);
}

function ageToDays(age: number, unit: AgeUnit) {
  if (unit === "dias") return age;
  if (unit === "meses") return age * 30.4375;
  return age * 365.25;
}

function nearestBloodPressureReference(age: number, unit: AgeUnit, sex: BloodPressureSex) {
  const days = ageToDays(age, unit);
  if (days < 365.25) {
    return INFANT_BLOOD_PRESSURE_REFERENCES.reduce((best, current) => {
      const currentDelta = Math.abs(current.ageDays - days);
      const bestDelta = Math.abs(best.ageDays - days);
      return currentDelta <= bestDelta ? current : best;
    });
  }

  const references = sex === "feminino"
    ? FEMALE_BLOOD_PRESSURE_REFERENCES
    : MALE_BLOOD_PRESSURE_REFERENCES;
  const completedYears = Math.min(17, Math.max(1, Math.floor(days / 365.25)));
  return references.find((item) => item.ageYears === completedYears) ?? references[references.length - 1];
}

function classifyMeasurement(
  value: number,
  reference: BloodPressureReference,
  field: "systolic" | "diastolic" | "mean",
) {
  if (!Number.isFinite(value)) return null;
  const p = reference.percentiles;
  if (value < p.P5[field]) return "abaixo do P5";
  if (value < p.P10[field]) return "entre P5 e P10";
  if (value < p.P50[field]) return "entre P10 e P50";
  if (value < p.P90[field]) return "entre P50 e P90";
  if (value < p.P95[field]) return "entre P90 e P95";
  if (p.P95Plus12 && value < p.P95Plus12[field]) return "entre P95 e P95 + 12 mmHg";
  return p.P95Plus12 ? "igual ou acima de P95 + 12 mmHg" : "igual ou acima do P95";
}

export function BloodPressureCalculator({ initialSex = "masculino", onSexChange }: { initialSex?: BloodPressureSex; onSexChange?: (sex: BloodPressureSex) => void }) {
  const [age, setAge] = useState("1");
  const [unit, setUnit] = useState<AgeUnit>("anos");
  const [sex, setSex] = useState<BloodPressureSex>(initialSex);
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");

  const chooseSex = (nextSex: BloodPressureSex) => {
    setSex(nextSex);
    onSexChange?.(nextSex);
  };

  const ageNumber = numeric(age);
  const ageDays = ageToDays(ageNumber, unit);
  const validAge = Number.isFinite(ageNumber) && ageNumber > 0 && ageDays < 18 * 365.25;
  const sexApplies = validAge && ageDays >= 365.25;
  const reference = useMemo(
    () => (validAge ? nearestBloodPressureReference(ageNumber, unit, sex) : null),
    [ageNumber, sex, unit, validAge],
  );
  const systolicNumber = numeric(systolic);
  const diastolicNumber = numeric(diastolic);
  const measuredMean = Number.isFinite(systolicNumber) && Number.isFinite(diastolicNumber)
    ? (systolicNumber + 2 * diastolicNumber) / 3
    : Number.NaN;
  const percentileRows = reference
    ? PERCENTILES.filter((percentile) => percentile !== "P95Plus12" || reference.percentiles.P95Plus12)
    : [];
  const referenceBase = reference
    ? reference.ageYears
      ? `SBP · estatura P50 · tabela ${sex === "feminino" ? "feminina" : "masculina"}`
      : "Referência por faixa etária"
    : "—";

  return (
    <>
      <header className="tool-heading emergency-heading">
        <span className="eyebrow">PA PEDIÁTRICA</span>
        <h2>Percentis de pressão arterial</h2>
        <p>Consulte PAS, PAD e PAM nos níveis P5, P10, P50, P90, P95 e P95 + 12 mmHg.</p>
      </header>

      <div className="print-toolbar print-hidden">
        <div>
          <strong>Impressão rápida</strong>
          <span>Imprime a idade, o sexo selecionado, as referências vitais, a tabela de percentis e a comparação preenchida.</span>
        </div>
        <button onClick={() => window.print()} type="button">Imprimir percentis de pressão</button>
      </div>

      <div className="form-grid four emergency-inputs">
        <label className="field">
          <span className="field-label">Idade</span>
          <span className="input-wrap"><input inputMode="decimal" min="0" onChange={(event) => setAge(event.target.value)} step="1" type="number" value={age} /></span>
        </label>
        <label className="field">
          <span className="field-label">Unidade</span>
          <span className="select-wrap">
            <select onChange={(event) => setUnit(event.target.value as AgeUnit)} value={unit}>
              <option value="dias">dias</option>
              <option value="meses">meses</option>
              <option value="anos">anos</option>
            </select>
          </span>
        </label>
        <div className="field bp-sex-field">
          <span className="field-label">Sexo da tabela de PA (1–17 anos)</span>
          <div className="bp-sex-buttons modal-sex-buttons" role="group" aria-label="Escolha do sexo para os percentis de pressão arterial">
            <button aria-pressed={sex === "masculino"} className={sex === "masculino" ? "active" : ""} disabled={!sexApplies} onClick={() => chooseSex("masculino")} type="button">Masculino</button>
            <button aria-pressed={sex === "feminino"} className={sex === "feminino" ? "active" : ""} disabled={!sexApplies} onClick={() => chooseSex("feminino")} type="button">Feminino</button>
          </div>
          {sexApplies ? <small>Tabela ativa: {sex === "feminino" ? "feminina" : "masculina"}.</small> : null}
        </div>
        <div className="derived-field emergency-reference">
          <span>REFERÊNCIA SELECIONADA</span>
          <strong>{reference?.label ?? "—"}</strong>
          <small>{reference?.ageYears ? "Idade completa informada." : "Faixa etária disponível mais próxima."}</small>
        </div>
      </div>

      {!validAge ? <div className="danger-note">Informe uma idade válida entre 1 dia e 17 anos.</div> : null}

      {reference ? (
        <>
          <div className="vital-reference-strip">
            <div><span>FC de referência</span><strong>{reference.fcLow ?? "—"}–{reference.fcHigh ?? "—"} bpm</strong></div>
            <div><span>Limite superior de FR</span><strong>{reference.frHigh ? `>${reference.frHigh} irpm` : "—"}</strong></div>
            <div><span>Estatura de referência</span><strong>{reference.heightP50Cm ? `${fmt(reference.heightP50Cm)} cm · P50` : "—"}</strong></div>
            <div><span>Base utilizada</span><strong>{referenceBase}</strong></div>
          </div>

          {reference.lowerPercentilesEstimated ? (
            <div className="estimated-percentile-note">
              <strong>P5 e P10 estimados:</strong> a tabela da SBP publica P50, P90, P95 e P95 + 12 mmHg. Os níveis inferiores foram calculados por simetria em torno do P50 e aparecem marcados como estimativas.
            </div>
          ) : null}

          <div className="bp-table-wrap">
            <table className="clinical-table bp-table">
              <thead><tr><th>Percentil da PA</th><th>PAS</th><th>PAD</th><th>PAM</th></tr></thead>
              <tbody>
                {percentileRows.map((percentile) => {
                  const values = reference.percentiles[percentile];
                  if (!values) return null;
                  const estimated = reference.lowerPercentilesEstimated && (percentile === "P5" || percentile === "P10");
                  return (
                    <tr key={percentile}>
                      <th>{PERCENTILE_LABELS[percentile]}{estimated ? <small>estimado</small> : null}</th>
                      <td>{fmt(values.systolic)} <small>mmHg</small></td>
                      <td>{fmt(values.diastolic)} <small>mmHg</small></td>
                      <td>{fmt(values.mean)} <small>mmHg</small></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <section className="subsection measurement-check">
            <div className="subsection-title"><div><span className="eyebrow">OPCIONAL</span><h3>Comparar uma pressão medida</h3></div></div>
            <div className="form-grid two">
              <label className="field"><span className="field-label">Pressão sistólica</span><span className="input-wrap"><input inputMode="decimal" min="0" onChange={(event) => setSystolic(event.target.value)} step="1" type="number" value={systolic} /><span className="input-suffix">mmHg</span></span></label>
              <label className="field"><span className="field-label">Pressão diastólica</span><span className="input-wrap"><input inputMode="decimal" min="0" onChange={(event) => setDiastolic(event.target.value)} step="1" type="number" value={diastolic} /><span className="input-suffix">mmHg</span></span></label>
            </div>
            {Number.isFinite(systolicNumber) || Number.isFinite(diastolicNumber) ? (
              <div className="measurement-results">
                <div><span>PAS</span><strong>{classifyMeasurement(systolicNumber, reference, "systolic") ?? "—"}</strong></div>
                <div><span>PAD</span><strong>{classifyMeasurement(diastolicNumber, reference, "diastolic") ?? "—"}</strong></div>
                <div><span>PAM calculada</span><strong>{Number.isFinite(measuredMean) ? `${fmt(measuredMean)} mmHg · ${classifyMeasurement(measuredMean, reference, "mean")}` : "—"}</strong></div>
              </div>
            ) : null}
          </section>

          {reference.ageYears ? (
            <div className="source-note emergency-source-note">
              <strong>Referência:</strong> Sociedade Brasileira de Pediatria, “Hipertensão arterial na infância e adolescência”, usando a coluna de estatura P50. P5 e P10 são estimativas matemáticas; a PAM é calculada por (PAS + 2 × PAD) ÷ 3.
            </div>
          ) : null}
        </>
      ) : null}
    </>
  );
}

function arrestRows(weight: number) {
  const valid = Number.isFinite(weight) && weight > 0;
  const v = (value: number) => valid ? value : null;
  const emergency: DoseRow[] = [
    { name: "Adrenalina IV/IO", presentation: "0,1 mg/mL após diluição 1 + 9", dose: "0,01 mg/kg · máximo 1 mg", dilution: "1 mL de 1 mg/mL + 9 mL de AD", amount: v(Math.min(weight * 0.1, 10)), unit: "mL", note: "Algoritmo AHA/AAP 2025." },
    { name: "Bicarbonato de sódio 8,4%", presentation: "1 mEq/mL", dose: "1 mEq/kg", dilution: "1 mL + 1 mL de AD", amount: v(weight * 2), unit: "mL" },
    { name: "Glicose 50%", presentation: "0,5 g/mL", dose: "0,5 g/kg", dilution: "1 mL + 1 mL de AD", amount: v(weight * 2), unit: "mL" },
    { name: "Glicose 10%", presentation: "0,1 g/mL", dose: "0,5 g/kg", dilution: "Puro", amount: v(weight * 5), unit: "mL" },
    { name: "Gluconato de cálcio 10%", presentation: "100 mg/mL", dose: "60 mg/kg · máximo 3.000 mg", dilution: "Puro", amount: v(Math.min(weight * 0.6, 30)), unit: "mL" },
    { name: "Ringer lactato", presentation: "Solução pronta", dose: "20 mL/kg · máximo 500 mL", dilution: "Puro", amount: v(Math.min(weight * 20, 500)), unit: "mL" },
    { name: "Soro fisiológico 0,9%", presentation: "Solução pronta", dose: "20 mL/kg · máximo 500 mL", dilution: "Puro", amount: v(Math.min(weight * 20, 500)), unit: "mL" },
    { name: "Sulfato de magnésio 10%", presentation: "100 mg/mL", dose: "50 mg/kg · máximo 2.000 mg", dilution: "1 mL + 1 mL de SG 5%", amount: v(Math.min(weight, 40)), unit: "mL" },
    { name: "Sulfato de magnésio 50%", presentation: "500 mg/mL", dose: "50 mg/kg · máximo 2.000 mg", dilution: "1 mL + 9 mL de SG 5%", amount: v(Math.min(weight, 40)), unit: "mL" },
  ];

  const shock: DoseRow[] = [
    { name: "1º choque", presentation: "Desfibrilação", dose: "2 J/kg", dilution: "—", amount: v(weight * 2), unit: "J", note: "Algoritmo AHA/AAP 2025." },
    { name: "2º choque", presentation: "Desfibrilação", dose: "4 J/kg", dilution: "—", amount: v(weight * 4), unit: "J", note: "Algoritmo AHA/AAP 2025." },
    { name: "Choques seguintes", presentation: "Desfibrilação", dose: "≥4 J/kg até 10 J/kg ou dose adulta", dilution: "—", amount: v(weight * 4), unit: "J", note: `Faixa pelo peso: ${valid ? `${fmt(weight * 4)}–${fmt(weight * 10)} J` : "—"}.` },
    { name: "Amiodarona", presentation: "50 mg/mL", dose: "5 mg/kg · máximo 300 mg", dilution: "Puro", amount: v(Math.min(weight * 0.1, 6)), unit: "mL", note: "Algoritmo AHA/AAP 2025." },
    { name: "Lidocaína", presentation: "10 mg/mL", dose: "1 mg/kg", dilution: "Puro", amount: v(weight * 0.1), unit: "mL", note: "Alternativa à amiodarona no algoritmo AHA/AAP 2025." },
    { name: "Lidocaína", presentation: "20 mg/mL", dose: "1 mg/kg", dilution: "Puro", amount: v(weight * 0.05), unit: "mL" },
  ];

  const atropine025 = !valid ? null : weight < 5 ? 0.4 : weight <= 25 ? weight * 0.08 : 2;
  const atropine05 = !valid ? null : weight < 5 ? 0.2 : weight <= 25 ? weight * 0.04 : 1;
  const rsi: DoseRow[] = [
    { name: "Atropina", presentation: "0,25 mg/mL", dose: "0,02 mg/kg · mínimo 0,1 mg · máximo 0,5 mg", dilution: "Puro", amount: atropine025, unit: "mL" },
    { name: "Atropina", presentation: "0,5 mg/mL", dose: "0,02 mg/kg · mínimo 0,1 mg · máximo 0,5 mg", dilution: "Puro", amount: atropine05, unit: "mL" },
    { name: "Midazolam", presentation: "5 mg/mL", dose: "0,2 mg/kg · máximo 5 mg", dilution: "Puro", amount: v(Math.min(weight * 0.04, 1)), unit: "mL" },
    { name: "Flumazenil", presentation: "0,1 mg/mL", dose: "0,01 mg/kg · máximo 0,2 mg/dose", dilution: "Puro", amount: v(Math.min(weight * 0.1, 2)), unit: "mL" },
    { name: "Fentanil", presentation: "50 mcg/mL", dose: "1 mcg/kg · máximo 50 mcg", dilution: "1 mL + 9 mL de AD", amount: v(Math.min(weight * 0.2, 10)), unit: "mL" },
    { name: "Naloxona", presentation: "0,4 mg/mL", dose: "0,1 mg/kg · máximo 2 mg", dilution: "Puro", amount: v(Math.min(weight * 0.25, 5)), unit: "mL" },
    { name: "Cetamina", presentation: "50 mg/mL", dose: "1 mg/kg · máximo 50 mg", dilution: "1 mL + 9 mL de AD", amount: v(Math.min(weight * 0.2, 10)), unit: "mL" },
    { name: "Propofol", presentation: "10 mg/mL", dose: "1 mg/kg", dilution: "Puro", amount: v(weight * 0.1), unit: "mL" },
    { name: "Rocurônio", presentation: "10 mg/mL", dose: "1 mg/kg", dilution: "Puro", amount: v(weight * 0.1), unit: "mL" },
    { name: "Pancurônio", presentation: "2 mg/mL", dose: "0,1 mg/kg", dilution: "Puro", amount: v(weight * 0.05), unit: "mL" },
    { name: "Succinilcolina", presentation: "20 mg/mL", dose: "2 mg/kg · máximo 150 mg", dilution: "1 mL + 9 mL de AD", amount: v(Math.min(weight, 75)), unit: "mL", note: "A observação sobre atropina foi mantida como nota do arquivo original e deve ser conferida no protocolo local." },
  ];

  return { emergency, shock, rsi };
}

function DoseTable({ rows }: { rows: DoseRow[] }) {
  return (
    <div className="dose-table-wrap">
      <table className="clinical-table dose-table">
        <thead><tr><th>Droga / ação</th><th>Apresentação</th><th>Dose</th><th>Diluição</th><th>Administrar</th></tr></thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row.name}-${row.presentation}-${index}`}>
              <th>{row.name}{row.note ? <small>{row.note}</small> : null}</th>
              <td>{row.presentation}</td>
              <td>{row.dose}</td>
              <td>{row.dilution}</td>
              <td className="dose-result">{fmtDose(row.amount)} <small>{row.unit}</small></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CardiacArrestCalculator({ initialWeight }: { initialWeight: string }) {
  const [weight, setWeight] = useState(initialWeight);
  const [copied, setCopied] = useState(false);
  const weightNumber = numeric(weight);
  const valid = Number.isFinite(weightNumber) && weightNumber > 0;
  const rows = useMemo(() => arrestRows(weightNumber), [weightNumber]);

  const copySheet = async () => {
    if (!valid) return;
    const section = (title: string, items: DoseRow[]) => [
      title,
      ...items.map((item) => `${item.name} | ${item.presentation} | ${item.dose} | ${item.dilution} | ADMINISTRAR: ${fmtDose(item.amount)} ${item.unit}${item.note ? ` | ${item.note}` : ""}`),
    ].join("\n");
    const text = [
      "FOLHA DE PARADA PEDIÁTRICA",
      `PESO: ${fmt(weightNumber, 2)} KG`,
      "",
      section("MEDICAÇÕES DE URGÊNCIA", rows.emergency),
      "",
      "ADRENALINA ENDOTRAQUEAL: NÃO AUTOMATIZADA — HÁ DIVERGÊNCIA ENTRE A DOSE MÁXIMA DESCRITA E A FÓRMULA DA PLANILHA ORIGINAL; REVISAR PROTOCOLO.",
      "",
      section("FV / TV SEM PULSO", rows.shock),
      "",
      section("SEQUÊNCIA RÁPIDA DE INTUBAÇÃO", rows.rsi),
      "",
      "CONFERIR INDICAÇÃO, APRESENTAÇÃO, DILUIÇÃO, VIA, LIMITES E PROTOCOLO INSTITUCIONAL ANTES DO USO.",
    ].join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <>
      <header className="tool-heading emergency-heading">
        <span className="eyebrow">EMERGÊNCIA PEDIÁTRICA</span>
        <h2>Folha de parada</h2>
        <p>Volumes e energias calculados pelo peso, com os itens da planilha fornecida e conferência dos componentes centrais pelo algoritmo AHA/AAP 2025.</p>
      </header>

      <div className="arrest-weight-panel">
        <label className="field">
          <span className="field-label">Peso da criança</span>
          <span className="input-wrap"><input inputMode="decimal" min="0" onChange={(event) => setWeight(event.target.value)} step="0.01" type="number" value={weight} /><span className="input-suffix">kg</span></span>
        </label>
        <div className="arrest-actions print-hidden">
          <button disabled={!valid} onClick={copySheet} type="button">{copied ? "Folha copiada" : "Copiar folha completa"}</button>
          <button className="secondary-print-button" disabled={!valid} onClick={() => window.print()} type="button">Imprimir folha de parada</button>
        </div>
      </div>

      {!valid ? <div className="danger-note">Informe um peso maior que zero para calcular a folha.</div> : null}

      <div className="critical-warning">
        <strong>Dupla checagem obrigatória</strong>
        <span>Confirme indicação, concentração disponível, preparo, acesso, limite máximo e protocolo institucional. Esta tela reproduz cálculos e não substitui a decisão clínica.</span>
      </div>

      <section className="arrest-section">
        <div className="arrest-section-heading"><span>01</span><div><small>SUPORTE E REVERSÃO</small><h3>Medicações de urgência</h3></div></div>
        <DoseTable rows={rows.emergency} />
        <div className="formula-conflict-note"><strong>Adrenalina endotraqueal:</strong> não foi automatizada porque a planilha original apresenta divergência entre a dose máxima escrita e a fórmula da célula. A via IV/IO está destacada conforme o algoritmo AHA/AAP 2025.</div>
      </section>

      <section className="arrest-section">
        <div className="arrest-section-heading"><span>02</span><div><small>RITMO CHOCÁVEL</small><h3>FV ou TV sem pulso</h3></div></div>
        <DoseTable rows={rows.shock} />
      </section>

      <section className="arrest-section">
        <div className="arrest-section-heading"><span>03</span><div><small>VIA AÉREA</small><h3>Sequência rápida de intubação</h3></div></div>
        <DoseTable rows={rows.rsi} />
      </section>

      <div className="source-note emergency-source-note">
        <strong>Fontes:</strong> planilha “parada nova (ped)” fornecida pelo usuário. Epinefrina IV/IO, desfibrilação, amiodarona e lidocaína foram comparadas ao algoritmo oficial AHA/AAP 2025. Os demais itens devem ser validados no protocolo institucional antes do uso.
        <a href="https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Algorithms/Algorithm-PALS-CA-250123.pdf" rel="noreferrer" target="_blank">Abrir algoritmo oficial</a>
      </div>
    </>
  );
}
