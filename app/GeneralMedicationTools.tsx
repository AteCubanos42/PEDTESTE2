"use client";

import { useMemo, useState } from "react";
import {
  calculateGeneralDose,
  generalAgeInMonths,
  generalRegimenEligibility,
  generalUnitLabel,
  quantityForGeneralPresentation,
} from "../lib/general-medication-calculations.mjs";
import { PrescriptionBlock } from "./PrescriptionBlock";
import type { GeneralMedication } from "./general-medications-data";

function parseNumber(value: string) {
  if (!value.trim()) return Number.NaN;
  return Number(value.replace(",", "."));
}

function formatNumber(value: number, digits = 2) {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("pt-BR", { maximumFractionDigits: digits }).format(value);
}


function doseRangeInMg(dose: { unit: string; perDoseMin: number; perDoseMax: number }) {
  const factor = dose.unit === "mg" ? 1 : dose.unit === "mcg" ? 0.001 : dose.unit === "g" ? 1000 : Number.NaN;
  return {
    minimum: dose.perDoseMin * factor,
    maximum: dose.perDoseMax * factor,
  };
}

function rangeText(minimum: number, maximum: number, unit: string, digits = 2) {
  if (!Number.isFinite(minimum) || !Number.isFinite(maximum)) return "—";
  if (Math.abs(minimum - maximum) < 1e-9) return `${formatNumber(minimum, digits)} ${unit}`;
  return `${formatNumber(minimum, digits)}–${formatNumber(maximum, digits)} ${unit}`;
}

export function GeneralMedicationCalculator({ medication, initialWeight }: { medication: GeneralMedication; initialWeight: string }) {
  const [weight, setWeight] = useState(initialWeight);
  const [age, setAge] = useState("1");
  const [ageUnit, setAgeUnit] = useState("anos");
  const [regimenId, setRegimenId] = useState(medication.regimens[0]?.id ?? "");
  const [presentationId, setPresentationId] = useState(medication.presentations[0]?.id ?? "");
  const [confirmed, setConfirmed] = useState(false);

  const regimen = medication.regimens.find((item) => item.id === regimenId) ?? medication.regimens[0]!;
  const presentation = medication.presentations.find((item) => item.id === presentationId) ?? medication.presentations[0]!;
  const weightKg = parseNumber(weight);
  const ageMonths = generalAgeInMonths(parseNumber(age), ageUnit);
  const eligibility = generalRegimenEligibility(regimen, ageMonths, weightKg);
  const dose = calculateGeneralDose(regimen, weightKg);
  const quantity = dose ? quantityForGeneralPresentation(dose, presentation) : null;
  const instructionOnly = regimen.calculation.mode === "instruction";
  const requiredPresentationValid = !regimen.requiredPresentationId || regimen.requiredPresentationId === presentation.id;
  const measurable = instructionOnly || Boolean(quantity);
  const targetDoseMg = dose ? doseRangeInMg(dose) : null;
  const roundedDoseValid = !quantity
    || quantity.administeredMinMg === null
    || quantity.administeredMaxMg === null
    || !targetDoseMg
    || !Number.isFinite(targetDoseMg.minimum)
    || (quantity.administeredMinMg >= targetDoseMg.minimum * 0.9 - 1e-9
      && quantity.administeredMaxMg <= targetDoseMg.maximum * 1.1 + 1e-9);
  const valid = eligibility.valid && requiredPresentationValid && measurable && roundedDoseValid && confirmed;

  const doseText = dose ? rangeText(dose.perDoseMin, dose.perDoseMax, generalUnitLabel(dose.unit)) : "Orientação de uso";
  const quantityText = quantity ? rangeText(quantity.roundedMin, quantity.roundedMax, quantity.label, quantity.label === "mL" ? 1 : 2) : "—";
  const dailyText = dose && dose.dailyMin !== null && dose.dailyMax !== null
    ? rangeText(dose.dailyMin, dose.dailyMax, `${generalUnitLabel(dose.unit)}/dia`)
    : null;

  const prescription = regimen.calculation.mode === "instruction"
    ? [
        medication.name.toLocaleUpperCase("pt-BR"),
        `${regimen.route.toLocaleUpperCase("pt-BR")} · ${regimen.frequency.toLocaleUpperCase("pt-BR")}.`,
        regimen.calculation.text.toLocaleUpperCase("pt-BR"),
        regimen.duration ? `DURAÇÃO: ${regimen.duration.toLocaleUpperCase("pt-BR")}.` : "",
      ].filter(Boolean).join("\n")
    : [
        `${medication.name.toLocaleUpperCase("pt-BR")} — ${presentation.label.toLocaleUpperCase("pt-BR")}.`,
        `ADMINISTRAR ${quantityText.toLocaleUpperCase("pt-BR")} ${regimen.route.toLocaleUpperCase("pt-BR")} ${regimen.frequency.toLocaleUpperCase("pt-BR")}.`,
        `DOSE CALCULADA: ${doseText.toLocaleUpperCase("pt-BR")}.`,
        dailyText ? `TOTAL DIÁRIO ESTIMADO: ${dailyText.toLocaleUpperCase("pt-BR")}.` : "",
        regimen.duration ? `DURAÇÃO: ${regimen.duration.toLocaleUpperCase("pt-BR")}.` : "",
      ].filter(Boolean).join("\n");

  const applicableRegimens = useMemo(
    () => medication.regimens.filter((item) => generalRegimenEligibility(item, ageMonths, weightKg).valid),
    [ageMonths, medication.regimens, weightKg],
  );

  return (
    <>
      <header className="tool-heading general-medication-heading">
        <span className="eyebrow">Módulo de medicações · {medication.category}</span>
        <h2>{medication.name}</h2>
        <p>{medication.summary}</p>
        <div className="general-medication-badges"><span>{medication.category}</span><span>{medication.regimens.length} esquema(s)</span><span>{medication.presentations.length} apresentação(ões)</span></div>
      </header>

      <section className="general-medication-controls">
        <div className="form-grid three">
          <label className="field"><span className="field-label">Peso do paciente</span><span className="input-wrap"><input inputMode="decimal" min="0" onChange={(event) => setWeight(event.target.value)} step="0.1" type="number" value={weight} /><span className="input-suffix">kg</span></span></label>
          <label className="field"><span className="field-label">Idade</span><span className="input-wrap"><input inputMode="decimal" min="0" onChange={(event) => setAge(event.target.value)} step="0.1" type="number" value={age} /></span></label>
          <label className="field"><span className="field-label">Unidade da idade</span><span className="select-wrap"><select onChange={(event) => setAgeUnit(event.target.value)} value={ageUnit}><option value="dias">dias</option><option value="meses">meses</option><option value="anos">anos</option></select></span></label>
        </div>

        <label className="select-field"><span>Indicação / esquema</span><select onChange={(event) => { setRegimenId(event.target.value); setConfirmed(false); }} value={regimen.id}>{medication.regimens.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
        <label className="select-field"><span>Apresentação disponível</span><select onChange={(event) => { setPresentationId(event.target.value); setConfirmed(false); }} value={presentation.id}>{medication.presentations.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>

        <div className="general-regimen-summary">
          <div><span>INDICAÇÃO</span><strong>{regimen.indication}</strong></div>
          <div><span>VIA</span><strong>{regimen.route}</strong></div>
          <div><span>FREQUÊNCIA</span><strong>{regimen.frequency}</strong></div>
          <div><span>DURAÇÃO</span><strong>{regimen.duration ?? "Conforme evolução / prescrição"}</strong></div>
        </div>
      </section>

      {applicableRegimens.length > 0 && !eligibility.valid ? <div className="clinical-note"><strong>Esquemas compatíveis com idade e peso informados:</strong> {applicableRegimens.map((item) => item.label).join(" · ")}.</div> : null}
      {!eligibility.ageValid ? <div className="danger-note">A idade informada está fora da faixa configurada para este esquema. Selecione outro esquema ou revise a indicação.</div> : null}
      {!eligibility.weightValid ? <div className="danger-note">O peso informado está fora da faixa configurada para este esquema. Selecione outro esquema ou revise a indicação.</div> : null}
      {!requiredPresentationValid ? <div className="danger-note">Este esquema foi configurado para a apresentação {medication.presentations.find((item) => item.id === regimen.requiredPresentationId)?.label}. A cópia está bloqueada.</div> : null}
      {!roundedDoseValid ? <div className="danger-note">O fracionamento da apresentação escolhida altera a dose em mais de 10%. Selecione outra apresentação ou valide uma formulação manipulada com a farmácia.</div> : null}

      {regimen.calculation.mode === "instruction" ? (
        <section className="general-instruction-result">
          <span>ORIENTAÇÃO ORGANIZADA</span>
          <strong>{regimen.calculation.text}</strong>
        </section>
      ) : dose ? (
        <section className="general-dose-result" aria-live="polite">
          <div className="general-dose-primary"><span>Dose por administração</span><strong>{doseText}</strong></div>
          <div><span>Quantidade com a apresentação escolhida</span><strong>{quantityText}</strong></div>
          {dailyText ? <div><span>Total diário estimado</span><strong>{dailyText}</strong></div> : null}
          {quantity && quantity.administeredMinMg !== null && quantity.administeredMaxMg !== null ? <div><span>Dose após arredondamento</span><strong>{rangeText(quantity.administeredMinMg, quantity.administeredMaxMg, "mg")}</strong></div> : null}
        </section>
      ) : <p className="empty-result">Informe peso e idade válidos.</p>}

      {presentation.note ? <div className="clinical-note"><strong>Apresentação:</strong> {presentation.note}</div> : null}
      {regimen.note ? <div className="clinical-note"><strong>Esquema selecionado:</strong> {regimen.note}</div> : null}
      {medication.warning ? <div className="danger-note">{medication.warning}</div> : null}
      {medication.notes?.map((note) => <div className="clinical-note" key={note}>{note}</div>)}

      <label className="guide-verification">
        <input checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} type="checkbox" />
        <span>Confirmei indicação, idade, peso, alergias, função renal/hepática, via, apresentação, dose máxima e protocolo institucional.</span>
      </label>
      <PrescriptionBlock invalidMessage="Revise idade, peso, esquema, apresentação e confirmação clínica antes de copiar." text={prescription} valid={valid} />
    </>
  );
}
