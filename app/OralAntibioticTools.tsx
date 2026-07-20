"use client";

import { useState } from "react";
import { calculateAntimicrobialRegimen } from "../lib/antimicrobial-calculations.mjs";
import { dailyDosePerKgRange, ruleWithSelectedDailyDose } from "../lib/antimicrobial-dose-selection.mjs";
import { PrescriptionBlock } from "./PrescriptionBlock";
import type { OralAntibiotic, OralFormulation, OralRule } from "./oral-antibiotics-data";

function parseNumber(value: string) {
  if (!value.trim()) return Number.NaN;
  return Number(value.replace(",", "."));
}

function formatNumber(value: number | null, digits = 1) {
  if (value === null || !Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("pt-BR", { maximumFractionDigits: digits }).format(value);
}

function formatRange(minimum: number | null, maximum: number | null, unit = "mg") {
  if (minimum === null || maximum === null) return "—";
  if (Math.abs(minimum - maximum) < 1e-9) return `${formatNumber(minimum)} ${unit}`;
  return `${formatNumber(minimum)}–${formatNumber(maximum)} ${unit}`;
}

function frequencyText(rule: OralRule) {
  if (rule.once) return "EM DOSE ÚNICA";
  return rule.intervalHours ? `DE ${formatNumber(rule.intervalHours, 0)}/${formatNumber(rule.intervalHours, 0)}H` : "NA FREQUÊNCIA PRESCRITA";
}

function roundToTenth(value: number) {
  return Math.round((value + Number.EPSILON) * 10) / 10;
}

function formulationStock(formulation: OralFormulation) {
  return formulation.dosageForm === "liquid" ? formulation.concentrationMgMl : formulation.strengthMg;
}

function dosageFormLabel(formulation: OralFormulation) {
  if (formulation.dosageForm === "liquid") return "SUSPENSÃO ORAL";
  if (formulation.dosageForm === "tablet") return "COMPRIMIDO";
  if (formulation.dosageForm === "capsule") return "CÁPSULA";
  return "SACHÊ";
}

function roundedSolidUnits(exact: number, formulation: OralFormulation) {
  if (formulation.dosageForm === "tablet" && formulation.divisible) return Math.round(exact * 2) / 2;
  return Math.round(exact);
}

function OralPrescriptionBuilder({
  antibiotic,
  rule,
  result,
  weightKg,
}: {
  antibiotic: OralAntibiotic;
  rule: OralRule;
  result: NonNullable<ReturnType<typeof calculateAntimicrobialRegimen>>;
  weightKg: number;
}) {
  const requiredFormulation = rule.requiredFormulationId
    ? antibiotic.formulations.find((item) => item.id === rule.requiredFormulationId)
    : undefined;
  const initialFormulation = requiredFormulation ?? antibiotic.formulations[0];
  const initialDose = roundToTenth(result.doseMin ?? result.doseMax ?? Number.NaN);
  const [formulationId, setFormulationId] = useState(initialFormulation.id);
  const [stockValue, setStockValue] = useState(String(formulationStock(initialFormulation) ?? ""));
  const [duration, setDuration] = useState(rule.defaultDuration ? String(rule.defaultDuration) : "");
  const [confirmed, setConfirmed] = useState(false);
  const formulation = antibiotic.formulations.find((item) => item.id === formulationId) ?? initialFormulation;
  const liquid = formulation.dosageForm === "liquid";
  const stock = parseNumber(stockValue);
  const dose = initialDose;
  const minimumDose = result.doseMin ?? result.doseMax ?? Number.NaN;
  const maximumDose = result.doseMax ?? result.doseMin ?? Number.NaN;
  const doseValid = Number.isFinite(dose) && dose > 0 && dose >= minimumDose - 0.051 && dose <= maximumDose + 0.051;
  const exactQuantity = dose / stock;
  const roundedQuantity = liquid ? roundToTenth(exactQuantity) : roundedSolidUnits(exactQuantity, formulation);
  const administeredDose = roundedQuantity * stock;
  const doseAfterRoundingValid = Number.isFinite(administeredDose)
    && administeredDose >= minimumDose * 0.95 - 1e-8
    && administeredDose <= maximumDose * 1.05 + 1e-8
    && Math.abs(administeredDose - dose) / dose <= 0.05;
  const days = parseNumber(duration);
  const hasSourceDuration = Number.isFinite(rule.durationMin) && Number.isFinite(rule.durationMax);
  const durationValid = Number.isInteger(days)
    && days > 0
    && (!hasSourceDuration || (days >= (rule.durationMin ?? 0) && days <= (rule.durationMax ?? Number.POSITIVE_INFINITY)));
  const administrationsPerDay = result.administrationsPerDay ?? 1;
  const totalQuantity = liquid
    ? Math.ceil(roundedQuantity * administrationsPerDay * days * 10) / 10
    : Math.ceil(roundedQuantity * administrationsPerDay * days);
  const formulationValid = !rule.requiredFormulationId || formulation.id === rule.requiredFormulationId;
  const minimumWeightValid = !rule.minWeightKg || weightKg >= rule.minWeightKg;
  const maximumWeightValid = !rule.maxWeightKg || weightKg <= rule.maxWeightKg;
  const measurable = Number.isFinite(exactQuantity) && (liquid ? exactQuantity >= 0.05 : roundedQuantity > 0);
  const secondaryDose = liquid
    ? roundedQuantity * (formulation.secondaryConcentrationMgMl ?? Number.NaN)
    : roundedQuantity * (formulation.secondaryStrengthMg ?? Number.NaN);
  const secondaryDailyMgKg = Number.isFinite(secondaryDose) && weightKg > 0
    ? (secondaryDose * administrationsPerDay) / weightKg
    : Number.NaN;
  const secondaryWithinLimit = !rule.maxSecondaryDailyMgKg
    || !Number.isFinite(secondaryDailyMgKg)
    || secondaryDailyMgKg <= rule.maxSecondaryDailyMgKg + 0.05;
  const valid = doseValid
    && Number.isFinite(stock)
    && stock > 0
    && durationValid
    && formulationValid
    && minimumWeightValid
    && maximumWeightValid
    && measurable
    && doseAfterRoundingValid
    && secondaryWithinLimit
    && confirmed;
  const component = rule.doseComponent ? `, calculada pelo componente ${rule.doseComponent}` : "";
  const quantityLabel = liquid ? `${formatNumber(roundedQuantity)} ML` : `${formatNumber(roundedQuantity)} ${dosageFormLabel(formulation)}(S)`;
  const dispensingLabel = liquid ? `${formatNumber(totalQuantity)} ML` : `${formatNumber(totalQuantity, 0)} UNIDADE(S)`;
  const prescription = [
    `${antibiotic.name.toLocaleUpperCase("pt-BR")} — ${dosageFormLabel(formulation)} (${formulation.label}).`,
    `ADMINISTRAR ${quantityLabel} VO ${frequencyText(rule)}${rule.once ? "." : ` POR ${formatNumber(days, 0)} DIAS.`}`,
    `DOSE: ${formatNumber(administeredDose)} MG/DOSE${component.toLocaleUpperCase("pt-BR")}.`,
    ...(Number.isFinite(secondaryDose) && rule.secondaryComponent ? [`${rule.secondaryComponent.toLocaleUpperCase("pt-BR")}: ${formatNumber(secondaryDose)} MG/DOSE; ${formatNumber(secondaryDailyMgKg)} MG/KG/DIA.`] : []),
    `DISPENSAR PELO MENOS ${dispensingLabel}.`,
  ].join("\n");

  function updateFormulation(value: string) {
    const selected = antibiotic.formulations.find((item) => item.id === value);
    setFormulationId(value);
    if (selected) setStockValue(String(formulationStock(selected) ?? ""));
  }

  return (
    <section className="antimicrobial-builder oral-builder">
      <div className="antimicrobial-step"><span>02</span><div><strong>Transforme a dose em prescrição domiciliar</strong><small>Apresentação, dose e duração permanecem explícitas para conferência.</small></div></div>
      <div className="form-grid three antimicrobial-builder-grid">
        <label className="field">
          <span className="field-label">Apresentação disponível</span>
          <span className="select-wrap"><select onChange={(event) => updateFormulation(event.target.value)} value={formulationId}>{antibiotic.formulations.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></span>
          {formulation.note ? <small>{formulation.note}</small> : null}
        </label>
        <label className="field"><span className="field-label">{liquid ? "Concentração usada no cálculo" : "Quantidade por unidade"}</span><span className="input-wrap"><input inputMode="decimal" min="0" onChange={(event) => setStockValue(event.target.value)} step="any" type="number" value={stockValue} /><span className="input-suffix">{liquid ? "mg/mL" : "mg/un"}</span></span><small>Confirme na embalagem dispensada.</small></label>
        <div className="derived-field"><span>DOSE CALCULADA POR ADMINISTRAÇÃO</span><strong>{formatNumber(dose)} mg</strong><small>Após aplicação do teto máximo.</small></div>
        <label className="field"><span className="field-label">Duração definida clinicamente</span><span className="input-wrap"><input inputMode="numeric" min={hasSourceDuration ? rule.durationMin : 1} max={hasSourceDuration ? rule.durationMax : undefined} onChange={(event) => setDuration(event.target.value)} placeholder="Informar" step="1" type="number" value={duration} /><span className="input-suffix">dias</span></span><small>{hasSourceDuration ? `Permitido neste esquema: ${rule.durationMin === rule.durationMax ? `${rule.durationMin} dia(s)` : `${rule.durationMin}–${rule.durationMax} dias`}.` : rule.durationGuidance}</small></label>
        <div className="derived-field"><span>{liquid ? "VOLUME POR DOSE" : "UNIDADES POR DOSE"}</span><strong>{quantityLabel}</strong></div>
        <div className="derived-field"><span>DOSE APÓS ARREDONDAMENTO</span><strong>{formatNumber(administeredDose)} mg</strong></div>
        <div className="derived-field"><span>TOTAL A DISPENSAR</span><strong>{dispensingLabel}</strong></div>
        {Number.isFinite(secondaryDailyMgKg) && rule.secondaryComponent ? <div className="derived-field"><span>{rule.secondaryComponent.toLocaleUpperCase("pt-BR")} EM 24 H</span><strong>{formatNumber(secondaryDailyMgKg)} mg/kg/dia</strong><small>Referência configurada: até ~{formatNumber(rule.maxSecondaryDailyMgKg ?? Number.NaN)} mg/kg/dia.</small></div> : null}
      </div>

      {!doseValid ? <div className="danger-note">A dose escolhida precisa permanecer dentro da faixa calculada.</div> : null}
      {!durationValid ? <div className="danger-note">Informe uma duração inteira válida{hasSourceDuration ? " dentro da faixa deste esquema" : " conforme o diagnóstico e o protocolo local"}.</div> : null}
      {!formulationValid ? <div className="danger-note">Este esquema exige a apresentação {requiredFormulation?.label}; a cópia foi bloqueada.</div> : null}
      {!minimumWeightValid ? <div className="danger-note">Este esquema exige peso mínimo de {rule.minWeightKg} kg.</div> : null}
      {!maximumWeightValid ? <div className="danger-note">Este esquema é limitado a pacientes de até {rule.maxWeightKg} kg; acima disso, use o regime institucional apropriado.</div> : null}
      {!measurable ? <div className="danger-note">A quantidade calculada não é mensurável com a apresentação selecionada.</div> : null}
      {doseValid && measurable && !doseAfterRoundingValid ? <div className="danger-note">O fracionamento da apresentação altera a dose em mais de 5% ou a retira da faixa selecionada. Escolha outra apresentação ou valide manipulação com a farmácia.</div> : null}
      {!secondaryWithinLimit ? <div className="danger-note">A apresentação selecionada ultrapassa o limite configurado de {formatNumber(rule.maxSecondaryDailyMgKg ?? null)} mg/kg/dia de {rule.secondaryComponent}. Escolha outra proporção ou dose.</div> : null}
      {antibiotic.warning ? <div className="danger-note">{antibiotic.warning}</div> : null}
      {rule.note ? <div className="clinical-note"><strong>Regra selecionada:</strong> {rule.note}</div> : null}
      <label className="guide-verification">
        <input checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} type="checkbox" />
        <span>Confirmei indicação bacteriana, idade, peso, alergias, função renal/hepática, interações, cultura/antibiograma quando aplicável e apresentação realmente dispensada.</span>
      </label>
      <PrescriptionBlock invalidMessage="Revise dose, teto máximo, apresentação, fracionamento, duração e confirmação clínica." text={prescription} valid={valid} />
    </section>
  );
}

export function OralAntibioticCalculator({ antibiotic, initialWeight }: { antibiotic: OralAntibiotic; initialWeight: string }) {
  const [weight, setWeight] = useState(initialWeight);
  const [ruleId, setRuleId] = useState(antibiotic.rules[0]?.id ?? "");
  const rule = antibiotic.rules.find((item) => item.id === ruleId) ?? antibiotic.rules[0];
  const fixedRule = Number.isFinite(rule.fixedDoseMin) || Number.isFinite(rule.fixedDoseMax);
  const dailyRange = fixedRule ? null : dailyDosePerKgRange(rule);
  const [dailyDosePerKg, setDailyDosePerKg] = useState(dailyRange ? String(dailyRange.minimum) : "");
  const selectedDailyDose = parseNumber(dailyDosePerKg);
  const dailyDoseValid = fixedRule || (Boolean(dailyRange)
    && Number.isFinite(selectedDailyDose)
    && selectedDailyDose >= (dailyRange?.minimum ?? Number.POSITIVE_INFINITY) - 1e-8
    && selectedDailyDose <= (dailyRange?.maximum ?? Number.NEGATIVE_INFINITY) + 1e-8);
  const effectiveRule = fixedRule ? rule : dailyDoseValid ? ruleWithSelectedDailyDose(rule, selectedDailyDose) : null;
  const weightKg = parseNumber(weight);
  const result = calculateAntimicrobialRegimen({ weightKg, rule: effectiveRule });
  const interval = rule.once ? "dose única" : rule.intervalHours ? `${formatNumber(rule.intervalHours, 0)}/${formatNumber(rule.intervalHours, 0)} h` : "confirmar";
  const ceiling = [
    Number.isFinite(rule.maxDose) ? `${formatNumber(rule.maxDose ?? null)} mg/dose` : null,
    Number.isFinite(rule.maxDaily) ? `${formatNumber(rule.maxDaily ?? null)} mg/dia` : null,
  ].filter(Boolean).join(" · ");

  function updateRule(value: string) {
    const nextRule = antibiotic.rules.find((item) => item.id === value) ?? antibiotic.rules[0];
    const nextFixed = Number.isFinite(nextRule.fixedDoseMin) || Number.isFinite(nextRule.fixedDoseMax);
    const nextRange = nextFixed ? null : dailyDosePerKgRange(nextRule);
    setRuleId(value);
    setDailyDosePerKg(nextRange ? String(nextRange.minimum) : "");
  }

  return (
    <>
      <header className="tool-heading antimicrobial-heading">
        <span className="eyebrow">Antibiótico domiciliar · via oral</span>
        <h2>{antibiotic.name}</h2>
        <p>{antibiotic.summary}</p>
        <div className="antimicrobial-badges"><span>{antibiotic.className}</span><span>VO</span><span>Dose máxima ativa</span></div>
      </header>
      <section className="antimicrobial-prescription">
        <div className="antimicrobial-step"><span>01</span><div><strong>Selecione a faixa de dose e a frequência prescritas</strong><small>A calculadora não diagnostica nem escolhe o antibiótico.</small></div></div>
        <label className="select-field"><span>Dose / frequência</span><select onChange={(event) => updateRule(event.target.value)} value={ruleId}>{antibiotic.rules.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
        <label className="field"><span className="field-label">Peso do paciente</span><span className="input-wrap"><input inputMode="decimal" min="0" onChange={(event) => setWeight(event.target.value)} step="0.1" type="number" value={weight} /><span className="input-suffix">kg</span></span></label>
        {dailyRange ? <label className="field daily-dose-selector"><span className="field-label">Dose diária escolhida</span><span className="input-wrap"><input inputMode="decimal" max={dailyRange.maximum} min={dailyRange.minimum} onChange={(event) => setDailyDosePerKg(event.target.value)} step="any" type="number" value={dailyDosePerKg} /><span className="input-suffix">mg/kg/dia</span></span><small>Faixa: {formatNumber(dailyRange.minimum)}–{formatNumber(dailyRange.maximum)} mg/kg/dia. Os tetos máximos permanecem ativos.</small></label> : null}
        <div className="selected-regimen"><span>{rule.ageLabel}</span><strong>{fixedRule ? "Dose fixa selecionada" : "Dose total diária por peso"}</strong><p>{fixedRule ? `${formatNumber(rule.fixedDoseMin ?? rule.fixedDoseMax ?? null)} mg` : `${formatNumber(selectedDailyDose)} mg/kg/dia`} · {interval} · VO</p></div>
        {ceiling ? <div className="clinical-note"><strong>Dose máxima:</strong> {ceiling}. O cálculo nunca ultrapassa esse teto.</div> : null}
      </section>

      {!dailyDoseValid ? <div className="danger-note">A dose escolhida deve permanecer dentro da faixa diária exibida.</div> : null}
      {result && effectiveRule ? (
        <>
          <section className="antimicrobial-result" aria-live="polite">
            <div className="result-kicker">RESULTADO ARITMÉTICO</div>
            <div className="antimicrobial-result-grid">
              <div className="result-primary"><span>Por administração</span><strong>{formatRange(result.doseMin, result.doseMax)}</strong></div>
              <div><span>Intervalo</span><strong>{interval}</strong></div>
              <div><span>Via</span><strong>Oral</strong></div>
              <div><span>Total em 24 h após teto</span><strong>{formatRange(result.dailyMin, result.dailyMax)}</strong></div>
            </div>
            {result.capped ? <p className="cap-note">A dose máxima foi aplicada ao resultado calculado por peso.</p> : null}
          </section>
          <OralPrescriptionBuilder antibiotic={antibiotic} key={`${rule.id}:${selectedDailyDose}:${result.doseMin}:${result.doseMax}`} result={result} rule={effectiveRule} weightKg={weightKg} />
        </>
      ) : <p className="empty-result">Informe um peso válido para obter a conferência matemática.</p>}

      <div className="antimicrobial-source-note oral-source-note">
        <strong>Fonte para conferência:</strong> <a href={rule.sourceUrl} rel="noreferrer" target="_blank">{rule.sourceTitle}</a>. Validar com bula brasileira, protocolo vigente e farmácia clínica.
      </div>
    </>
  );
}
