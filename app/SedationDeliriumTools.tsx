"use client";

import { useEffect, useMemo, useState } from "react";
import {
  calculateEnteralSedationDose,
  calculateHaloperidolDose,
  calculateVolumeFromConcentration,
  risperidoneSchedule,
  roundClinicalVolume,
} from "../lib/sedation-enteral-calculations.mjs";
import { DELIRIUM_MEDICATIONS, ENTERAL_SEDATION_MEDICATIONS } from "./sedation-delirium-data";
import { PrescriptionBlock } from "./PrescriptionBlock";

export type SedationDeliriumTab = "enteral" | "delirium";

function parseNumber(value: string) {
  if (!value.trim()) return Number.NaN;
  return Number(value.replace(",", "."));
}

function fmt(value: number, digits = 2) {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("pt-BR", { maximumFractionDigits: digits }).format(value);
}

function ageToYears(value: number, unit: string) {
  if (!Number.isFinite(value) || value < 0) return Number.NaN;
  if (unit === "dias") return value / 365.25;
  if (unit === "meses") return value / 12;
  return value;
}

function EnteralSedationPanel({ initialWeight }: { initialWeight: string }) {
  const [weight, setWeight] = useState(initialWeight);
  const [medicationId, setMedicationId] = useState(ENTERAL_SEDATION_MEDICATIONS[0].id);
  const medication = ENTERAL_SEDATION_MEDICATIONS.find((item) => item.id === medicationId) ?? ENTERAL_SEDATION_MEDICATIONS[0];
  const [dosePerKg, setDosePerKg] = useState(String(medication.minDosePerKg));
  const [intervalHours, setIntervalHours] = useState(String(medication.defaultIntervalHours ?? ""));
  const [presentationId, setPresentationId] = useState(medication.presentations[0].id);
  const [manualConcentration, setManualConcentration] = useState("");
  const [route, setRoute] = useState("VO");
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    setDosePerKg(String(medication.minDosePerKg));
    setIntervalHours(String(medication.defaultIntervalHours ?? ""));
    setPresentationId(medication.presentations[0].id);
    setManualConcentration("");
    setConfirmed(false);
  }, [medication]);

  const presentation = medication.presentations.find((item) => item.id === presentationId) ?? medication.presentations[0];
  const weightKg = parseNumber(weight);
  const selectedDose = parseNumber(dosePerKg);
  const interval = medication.defaultIntervalHours === null ? null : parseNumber(intervalHours);
  const concentration = presentation.manual ? parseNumber(manualConcentration) : presentation.concentration ?? Number.NaN;
  const targetValid = Number.isFinite(selectedDose) && selectedDose >= medication.minDosePerKg && selectedDose <= medication.maxDosePerKg;
  const dose = targetValid
    ? calculateEnteralSedationDose({
        weightKg,
        dosePerKg: selectedDose,
        maximumDose: medication.maxDose,
        maximumDaily: medication.maxDaily,
        intervalHours: interval,
      })
    : null;
  const exactVolume = dose === null ? Number.NaN : calculateVolumeFromConcentration(dose, concentration);
  const volume = roundClinicalVolume(exactVolume);
  const concentrationUnit = medication.doseUnit === "mcg" ? "mcg/mL" : "mg/mL";
  const valid = Boolean(dose !== null && Number.isFinite(volume) && volume > 0 && concentration > 0 && confirmed);
  const intervalText = interval ? `${fmt(interval, 0)}/${fmt(interval, 0)}h` : "dose única / conforme protocolo";
  const preparationText = presentation.preparation ? `PREPARO: ${presentation.preparation.toLocaleUpperCase("pt-BR")}` : "";
  const prescription = [
    `${medication.name.toLocaleUpperCase("pt-BR")} — ${presentation.label.toLocaleUpperCase("pt-BR")}.`,
    preparationText,
    `ADMINISTRAR ${fmt(volume)} ML (${fmt(dose ?? Number.NaN)} ${medication.doseUnit.toLocaleUpperCase("pt-BR")}; ${fmt(selectedDose, 3)} ${medication.doseUnit.toLocaleUpperCase("pt-BR")}/KG/DOSE) ${route} ${intervalText.toLocaleUpperCase("pt-BR")}.`,
    `CONCENTRAÇÃO UTILIZADA: ${fmt(concentration, 3)} ${concentrationUnit.toLocaleUpperCase("pt-BR")}.`,
  ].filter(Boolean).join("\n");

  return (
    <>
      <div className="sedation-medication-picker">
        {ENTERAL_SEDATION_MEDICATIONS.map((item) => (
          <button className={item.id === medication.id ? "active" : ""} key={item.id} onClick={() => setMedicationId(item.id)} type="button">
            <strong>{item.name}</strong><span>{item.summary}</span>
          </button>
        ))}
      </div>

      <section className="sedation-controls">
        <div className="form-grid three">
          <label className="field"><span className="field-label">Peso</span><span className="input-wrap"><input min="0" onChange={(event) => { setWeight(event.target.value); setConfirmed(false); }} step="0.1" type="number" value={weight} /><span className="input-suffix">kg</span></span></label>
          <label className="field"><span className="field-label">Dose escolhida</span><span className="input-wrap"><input min={medication.minDosePerKg} max={medication.maxDosePerKg} onChange={(event) => { setDosePerKg(event.target.value); setConfirmed(false); }} step="any" type="number" value={dosePerKg} /><span className="input-suffix">{medication.doseUnit}/kg/dose</span></span><small>Faixa: {fmt(medication.minDosePerKg, 3)}–{fmt(medication.maxDosePerKg, 3)}</small></label>
          {medication.defaultIntervalHours === null ? <div className="sedation-static-field"><span>Intervalo</span><strong>Conforme protocolo</strong></div> : <label className="field"><span className="field-label">Intervalo</span><span className="select-wrap"><select onChange={(event) => { setIntervalHours(event.target.value); setConfirmed(false); }} value={intervalHours}>{medication.intervalOptions.map((hours) => <option key={hours} value={hours}>{hours}/{hours}h</option>)}</select></span></label>}
        </div>

        <div className="form-grid two">
          <label className="select-field"><span>Apresentação / preparo</span><select onChange={(event) => { setPresentationId(event.target.value); setConfirmed(false); }} value={presentation.id}>{medication.presentations.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
          <label className="select-field"><span>Via enteral</span><select onChange={(event) => { setRoute(event.target.value); setConfirmed(false); }} value={route}><option value="VO">Via oral</option><option value="SNG">Sonda nasogástrica</option><option value="SNE">Sonda nasoenteral</option></select></label>
        </div>
        {presentation.manual ? <label className="field sedation-manual-concentration"><span className="field-label">Concentração disponível</span><span className="input-wrap"><input min="0" onChange={(event) => { setManualConcentration(event.target.value); setConfirmed(false); }} step="any" type="number" value={manualConcentration} /><span className="input-suffix">{presentation.concentrationUnit}</span></span><small>Informe exatamente a concentração disponível na unidade.</small></label> : null}
      </section>

      {!targetValid ? <div className="danger-note">A dose escolhida deve permanecer entre {fmt(medication.minDosePerKg, 3)} e {fmt(medication.maxDosePerKg, 3)} {medication.doseUnit}/kg/dose.</div> : null}
      {presentation.preparation ? <div className="clinical-note"><strong>Preparo selecionado:</strong> {presentation.preparation}</div> : null}
      {medication.note ? <div className="clinical-note">{medication.note}</div> : null}

      <section className="sedation-result-grid" aria-live="polite">
        <div className="primary"><span>Dose calculada</span><strong>{fmt(dose ?? Number.NaN)} {medication.doseUnit}</strong></div>
        <div><span>Concentração final</span><strong>{fmt(concentration, 3)} {concentrationUnit}</strong></div>
        <div><span>Volume por dose</span><strong>{fmt(volume)} mL</strong></div>
        <div><span>Programação</span><strong>{route} · {intervalText}</strong></div>
      </section>

      <label className="guide-verification"><input checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} type="checkbox" /><span>Confirmei indicação, nível de sedação, peso, apresentação, preparo, via, intervalo, monitorização e protocolo institucional.</span></label>
      <PrescriptionBlock invalidMessage="Revise dose, peso, concentração, preparo e confirmação clínica antes de copiar." text={prescription} valid={valid} />
    </>
  );
}

function DeliriumPanel({ initialWeight }: { initialWeight: string }) {
  const [medicationId, setMedicationId] = useState<(typeof DELIRIUM_MEDICATIONS)[number]["id"]>("haloperidol");
  const [weight, setWeight] = useState(initialWeight);
  const [age, setAge] = useState("5");
  const [ageUnit, setAgeUnit] = useState("anos");
  const [confirmed, setConfirmed] = useState(false);
  const [haloperidolDailyPerKg, setHaloperidolDailyPerKg] = useState("0.05");
  const [haloperidolInterval, setHaloperidolInterval] = useState("12");
  const [haloperidolPresentation, setHaloperidolPresentation] = useState("gotas");
  const [risperidoneInitial, setRisperidoneInitial] = useState("0.2");
  const [olanzapineGroup, setOlanzapineGroup] = useState("crianca");
  const [olanzapineStrength, setOlanzapineStrength] = useState("5");
  const [clonidineDose, setClonidineDose] = useState("1");
  const [clonidineInterval, setClonidineInterval] = useState("8");
  const [melatoninGroup, setMelatoninGroup] = useState("bebe");

  const medication = DELIRIUM_MEDICATIONS.find((item) => item.id === medicationId) ?? DELIRIUM_MEDICATIONS[0];
  const weightKg = parseNumber(weight);
  const ageYears = ageToYears(parseNumber(age), ageUnit);

  useEffect(() => setConfirmed(false), [medicationId]);

  const calculation = useMemo(() => {
    if (medicationId === "haloperidol") {
      const dailyPerKg = parseNumber(haloperidolDailyPerKg);
      const interval = parseNumber(haloperidolInterval);
      const result = calculateHaloperidolDose({ weightKg, dailyDosePerKg: dailyPerKg, intervalHours: interval });
      if (!result || dailyPerKg < 0.05 || dailyPerKg > 0.15) return null;
      const concentration = haloperidolPresentation === "gotas" ? 2 : haloperidolPresentation === "cp1" ? 1 : 5;
      const quantity = result.perDose / concentration;
      const quantityLabel = haloperidolPresentation === "gotas" ? "mL" : "comprimido(s)";
      const presentationLabel = haloperidolPresentation === "gotas" ? "Gotas 2 mg/mL" : `Comprimido ${concentration} mg`;
      return {
        title: `${fmt(result.perDose)} mg por dose`,
        subtitle: `${fmt(result.dailyDose)} mg/dia`,
        volume: `${fmt(quantity, 3)} ${quantityLabel}`,
        detail: `VO ${fmt(interval, 0)}/${fmt(interval, 0)}h`,
        text: [
          `HALOPERIDOL — ${presentationLabel.toLocaleUpperCase("pt-BR")}.`,
          `ADMINISTRAR ${fmt(quantity, 3)} ${quantityLabel.toLocaleUpperCase("pt-BR")} (${fmt(result.perDose)} MG) VO ${fmt(interval, 0)}/${fmt(interval, 0)}H.`,
          `DOSE DIÁRIA: ${fmt(dailyPerKg, 3)} MG/KG/DIA = ${fmt(result.dailyDose)} MG/DIA.`,
        ].join("\n"),
        valid: Number.isFinite(quantity) && quantity > 0,
        note: "O texto enviado menciona crianças menores de 4 anos sem definir claramente uma restrição. Confirmar faixa etária e monitorização cardíaca no protocolo institucional.",
      };
    }

    if (medicationId === "risperidona") {
      const schedule = risperidoneSchedule(ageYears);
      if (!schedule) return null;
      const initial = parseNumber(risperidoneInitial);
      const initialValid = initial >= schedule.initialMin && initial <= schedule.initialMax;
      return {
        title: `${fmt(initial)} mg/dia inicialmente`,
        subtitle: `${fmt(schedule.maintenance)} mg/dia após 4 dias`,
        volume: `${fmt(initial)} mL → ${fmt(schedule.maintenance)} mL`,
        detail: `Máximo ${fmt(schedule.maximum)} mg/dia`,
        text: [
          "RISPERIDONA — SUSPENSÃO ORAL 1 MG/ML.",
          `ADMINISTRAR ${fmt(initial)} ML (${fmt(initial)} MG) VO 1X/DIA POR 4 DIAS.`,
          `A PARTIR DO 5º DIA, ADMINISTRAR ${fmt(schedule.maintenance)} ML (${fmt(schedule.maintenance)} MG) VO 1X/DIA E MANTER POR 14 DIAS.`,
          `DOSE MÁXIMA CONFIGURADA: ${fmt(schedule.maximum)} MG/DIA.`,
        ].join("\n"),
        valid: initialValid,
        note: `Faixa inicial permitida para a idade informada: ${fmt(schedule.initialMin)}–${fmt(schedule.initialMax)} mg/dia.`,
      };
    }

    if (medicationId === "olanzapina") {
      const dose = olanzapineGroup === "crianca" ? 5 : 10;
      const strength = parseNumber(olanzapineStrength);
      const tablets = dose / strength;
      return {
        title: `${fmt(dose)} mg/dia`,
        subtitle: olanzapineGroup === "crianca" ? "Faixa selecionada: criança" : "Faixa selecionada: adolescente",
        volume: `${fmt(tablets, 2)} comprimido(s)`,
        detail: "VO 1x/dia",
        text: `OLANZAPINA — COMPRIMIDO ${fmt(strength)} MG.\nADMINISTRAR ${fmt(tablets, 2)} COMPRIMIDO(S) (${fmt(dose)} MG) VO 1X/DIA.`,
        valid: Number.isFinite(tablets) && tablets > 0,
        note: "A categoria criança/adolescente deve ser selecionada pelo prescritor; o material não define um corte etário.",
      };
    }

    if (medicationId === "clonidina") {
      const target = parseNumber(clonidineDose);
      const interval = parseNumber(clonidineInterval);
      const dose = calculateEnteralSedationDose({ weightKg, dosePerKg: target, maximumDose: 200, intervalHours: interval });
      const volume = roundClinicalVolume(calculateVolumeFromConcentration(dose ?? Number.NaN, 10));
      return {
        title: `${fmt(dose ?? Number.NaN)} mcg por dose`,
        subtitle: `${fmt(target)} mcg/kg/dose`,
        volume: `${fmt(volume)} mL`,
        detail: `VO ${fmt(interval, 0)}/${fmt(interval, 0)}h`,
        text: [
          "CLONIDINA — COMPRIMIDO 100 MCG MACERADO EM 10 ML DE ÁGUA DESTILADA (10 MCG/ML).",
          `ADMINISTRAR ${fmt(volume)} ML (${fmt(dose ?? Number.NaN)} MCG) VO ${fmt(interval, 0)}/${fmt(interval, 0)}H.`,
        ].join("\n"),
        valid: target >= 1 && target <= 5 && Number.isFinite(volume) && volume > 0,
        note: "Monitorar FC e PA e evitar retirada abrupta pelo risco de hipertensão rebote.",
      };
    }

    const dose = melatoninGroup === "bebe" ? 3 : 5;
    return {
      title: `${dose} mg/dia`,
      subtitle: melatoninGroup === "bebe" ? "Faixa selecionada: bebê pequeno" : "Faixa selecionada: criança",
      volume: `${dose} mL`,
      detail: "VO 1x/dia",
      text: `MELATONINA — SUSPENSÃO 1 MG/ML.\nADMINISTRAR ${dose} ML (${dose} MG) VO 1X/DIA.`,
      valid: true,
      note: "A faixa bebê pequeno/criança deve ser selecionada manualmente, pois o texto não apresenta um corte etário objetivo.",
    };
  }, [ageYears, clonidineDose, clonidineInterval, haloperidolDailyPerKg, haloperidolInterval, haloperidolPresentation, medicationId, melatoninGroup, olanzapineGroup, olanzapineStrength, risperidoneInitial, weightKg]);

  return (
    <>
      <div className="sedation-medication-picker delirium-picker">
        {DELIRIUM_MEDICATIONS.map((item) => <button className={item.id === medicationId ? "active" : ""} key={item.id} onClick={() => setMedicationId(item.id)} type="button"><strong>{item.name}</strong><span>{item.summary}</span></button>)}
      </div>

      <section className="sedation-controls">
        <div className="form-grid three">
          <label className="field"><span className="field-label">Peso</span><span className="input-wrap"><input min="0" onChange={(event) => { setWeight(event.target.value); setConfirmed(false); }} step="0.1" type="number" value={weight} /><span className="input-suffix">kg</span></span></label>
          <label className="field"><span className="field-label">Idade</span><span className="input-wrap"><input min="0" onChange={(event) => { setAge(event.target.value); setConfirmed(false); }} step="0.1" type="number" value={age} /></span></label>
          <label className="field"><span className="field-label">Unidade</span><span className="select-wrap"><select onChange={(event) => { setAgeUnit(event.target.value); setConfirmed(false); }} value={ageUnit}><option value="dias">dias</option><option value="meses">meses</option><option value="anos">anos</option></select></span></label>
        </div>

        {medicationId === "haloperidol" ? <div className="form-grid three">
          <label className="field"><span className="field-label">Dose diária escolhida</span><span className="input-wrap"><input min="0.05" max="0.15" onChange={(event) => { setHaloperidolDailyPerKg(event.target.value); setConfirmed(false); }} step="0.01" type="number" value={haloperidolDailyPerKg} /><span className="input-suffix">mg/kg/dia</span></span></label>
          <label className="select-field"><span>Intervalo</span><select onChange={(event) => { setHaloperidolInterval(event.target.value); setConfirmed(false); }} value={haloperidolInterval}><option value="12">12/12h</option><option value="8">8/8h</option></select></label>
          <label className="select-field"><span>Apresentação</span><select onChange={(event) => { setHaloperidolPresentation(event.target.value); setConfirmed(false); }} value={haloperidolPresentation}><option value="gotas">Gotas 2 mg/mL</option><option value="cp1">Comprimido 1 mg</option><option value="cp5">Comprimido 5 mg</option></select></label>
        </div> : null}

        {medicationId === "risperidona" ? <label className="field sedation-single-control"><span className="field-label">Dose inicial diária escolhida</span><span className="input-wrap"><input onChange={(event) => { setRisperidoneInitial(event.target.value); setConfirmed(false); }} step="0.1" type="number" value={risperidoneInitial} /><span className="input-suffix">mg/dia</span></span></label> : null}

        {medicationId === "olanzapina" ? <div className="form-grid two">
          <label className="select-field"><span>Faixa clínica</span><select onChange={(event) => { setOlanzapineGroup(event.target.value); setConfirmed(false); }} value={olanzapineGroup}><option value="crianca">Criança · 5 mg/dia</option><option value="adolescente">Adolescente · 10 mg/dia</option></select></label>
          <label className="select-field"><span>Comprimido disponível</span><select onChange={(event) => { setOlanzapineStrength(event.target.value); setConfirmed(false); }} value={olanzapineStrength}><option value="2.5">2,5 mg</option><option value="5">5 mg</option><option value="7.5">7,5 mg</option><option value="10">10 mg</option></select></label>
        </div> : null}

        {medicationId === "clonidina" ? <div className="form-grid two">
          <label className="field"><span className="field-label">Dose escolhida</span><span className="input-wrap"><input min="1" max="5" onChange={(event) => { setClonidineDose(event.target.value); setConfirmed(false); }} step="0.5" type="number" value={clonidineDose} /><span className="input-suffix">mcg/kg/dose</span></span></label>
          <label className="select-field"><span>Intervalo</span><select onChange={(event) => { setClonidineInterval(event.target.value); setConfirmed(false); }} value={clonidineInterval}><option value="8">8/8h</option><option value="6">6/6h</option></select></label>
        </div> : null}

        {medicationId === "melatonina" ? <label className="select-field sedation-single-control"><span>Faixa clínica</span><select onChange={(event) => { setMelatoninGroup(event.target.value); setConfirmed(false); }} value={melatoninGroup}><option value="bebe">Bebê pequeno · 3 mg/dia</option><option value="crianca">Criança · 5 mg/dia</option></select></label> : null}
      </section>

      {calculation ? <>
        <section className="sedation-result-grid" aria-live="polite">
          <div className="primary"><span>Esquema calculado</span><strong>{calculation.title}</strong></div>
          <div><span>Progressão / total</span><strong>{calculation.subtitle}</strong></div>
          <div><span>Quantidade</span><strong>{calculation.volume}</strong></div>
          <div><span>Programação</span><strong>{calculation.detail}</strong></div>
        </section>
        <div className="clinical-note">{calculation.note}</div>
        <label className="guide-verification"><input checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} type="checkbox" /><span>Confirmei subtipo de delirium, medidas não farmacológicas, idade, peso, ECG/eletrólitos quando aplicável, estado hemodinâmico, apresentação e protocolo institucional.</span></label>
        <PrescriptionBlock invalidMessage="Revise faixa de dose, idade/peso, apresentação e confirmação clínica antes de copiar." text={calculation.text} valid={calculation.valid && confirmed} />
      </> : <p className="empty-result">Revise os dados informados para liberar o cálculo.</p>}
    </>
  );
}

export function SedationDeliriumCalculator({ initialWeight, initialTab = "enteral" }: { initialWeight: string; initialTab?: SedationDeliriumTab }) {
  const [tab, setTab] = useState<SedationDeliriumTab>(initialTab);
  return (
    <>
      <header className="tool-heading sedation-heading">
        <span className="eyebrow">Módulo 09 · Terapia enteral</span>
        <h2>Sedação enteral e tratamento do delirium</h2>
        <p>Escolha a dose dentro da faixa apresentada, a preparação disponível e a via para gerar um rascunho calculado.</p>
      </header>
      <div className="sedation-tabs" role="tablist" aria-label="Sedação enteral e delirium">
        <button className={tab === "enteral" ? "active" : ""} onClick={() => setTab("enteral")} type="button">Sedação enteral</button>
        <button className={tab === "delirium" ? "active" : ""} onClick={() => setTab("delirium")} type="button">Tratamento do delirium</button>
      </div>
      <div className="danger-note"><strong>Dupla checagem obrigatória:</strong> estes cálculos organizam o material fornecido e não substituem avaliação de sedação, delirium, abstinência, interações, monitorização respiratória/hemodinâmica nem protocolo institucional.</div>
      {tab === "enteral" ? <EnteralSedationPanel initialWeight={initialWeight} /> : <DeliriumPanel initialWeight={initialWeight} />}
    </>
  );
}
