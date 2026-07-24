"use client";

import { useMemo, useState } from "react";
import { calculateNpt } from "../lib/npt-calculations.mjs";
import { PrescriptionBlock } from "./PrescriptionBlock";

function number(value: string) {
  if (!value.trim()) return Number.NaN;
  return Number(value.replace(",", "."));
}

function fmt(value: number | null | undefined, digits = 1) {
  if (value === null || value === undefined || !Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: digits,
    minimumFractionDigits: 0,
  }).format(value);
}

function NptField({
  label,
  value,
  onChange,
  suffix,
  helper,
  step = "any",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  suffix: string;
  helper?: string;
  step?: string;
}) {
  return (
    <label className="field npt-field">
      <span className="field-label">{label}</span>
      <span className="input-wrap">
        <input
          inputMode="decimal"
          min="0"
          onChange={(event) => onChange(event.target.value)}
          step={step}
          type="number"
          value={value}
        />
        <span className="input-suffix">{suffix}</span>
      </span>
      {helper ? <small>{helper}</small> : null}
    </label>
  );
}

const GUIDE_STEPS = [
  {
    number: "01",
    title: "Confirme a indicação e o momento de início",
    text: "O fluxograma diferencia recém-nascidos, crianças e adolescentes e distingue nutrição parenteral parcial da total.",
  },
  {
    number: "02",
    title: "Faça a avaliação antes de iniciar",
    text: "Revise peso, altura, estado nutricional, situação clínica e exames séricos; repita a avaliação periodicamente.",
  },
  {
    number: "03",
    title: "Defina a quota hídrica disponível",
    text: "Considere dieta enteral, medicações e demais infusões dentro da quota total. O volume restante será usado pela calculadora.",
  },
  {
    number: "04",
    title: "Escolha VIG, aminoácidos e lipídios",
    text: "A planilha transforma as metas por quilo em gramas, calorias e volumes das apresentações cadastradas.",
  },
  {
    number: "05",
    title: "Inclua eletrólitos e confira Ca:P",
    text: "O módulo calcula os volumes e mostra a relação cálcio:fósforo. Correções agudas de distúrbios não devem ser feitas dentro da NPT.",
  },
  {
    number: "06",
    title: "Revise osmolaridade e volume mínimo",
    text: "A calculadora mostra a osmolaridade final e o volume mínimo matemático para os limites de 900 e 1.500 mOsm/L.",
  },
  {
    number: "07",
    title: "Faça a conferência final",
    text: "Revise água bidestilada, volume total, vazão, calorias, distribuição de macronutrientes e balanço não proteico:nitrogênio.",
  },
];

export function NptCalculator({ initialWeight }: { initialWeight: string }) {
  const [tab, setTab] = useState<"calculator" | "guide">("calculator");
  const [weight, setWeight] = useState(initialWeight || "10");
  const [diet, setDiet] = useState("0");
  const [otherFluids, setOtherFluids] = useState("0");
  const [quota, setQuota] = useState("100");
  const [gir, setGir] = useState("6");
  const [aminoAcids, setAminoAcids] = useState("2");
  const [lipids, setLipids] = useState("1");
  const [sodium, setSodium] = useState("2");
  const [potassium, setPotassium] = useState("1");
  const [phosphate, setPhosphate] = useState("0.5");
  const [magnesium, setMagnesium] = useState("0.3");
  const [calcium, setCalcium] = useState("215");
  const [traceElements, setTraceElements] = useState("0.2");
  const [vitamins, setVitamins] = useState("5");
  const [correctionFactor, setCorrectionFactor] = useState("1");

  const result = useMemo(() => calculateNpt({
    weightKg: number(weight),
    enteralDietMlKgDay: number(diet),
    otherFluidsMlDay: number(otherFluids),
    quotaMlKgDay: number(quota),
    girMgKgMin: number(gir),
    aminoAcidsGKgDay: number(aminoAcids),
    lipidsGKgDay: number(lipids),
    sodiumMeqKgDay: number(sodium),
    potassiumMeqKgDay: number(potassium),
    phosphateMmolKgDay: number(phosphate),
    magnesiumMeqKgDay: number(magnesium),
    calciumGluconateMgKgDay: number(calcium),
    traceElementsMlKgDay: number(traceElements),
    vitaminsMlDay: number(vitamins),
    correctionFactor: number(correctionFactor),
  }), [
    weight,
    diet,
    otherFluids,
    quota,
    gir,
    aminoAcids,
    lipids,
    sodium,
    potassium,
    phosphate,
    magnesium,
    calcium,
    traceElements,
    vitamins,
    correctionFactor,
  ]);

  const composition = result ? [
    "NUTRIÇÃO PARENTERAL PEDIÁTRICA — COMPOSIÇÃO MATEMÁTICA",
    `PESO: ${fmt(number(weight), 2)} KG`,
    `VOLUME PREPARADO: ${fmt(result.preparedVolumeMl)} ML`,
    `CORRER EM 24 H POR BIC: ${fmt(result.flowMlH, 2)} ML/H`,
    "",
    `AMINOÁCIDOS 10%: ${fmt(result.volumes.aminoAcids10Ml, 2)} ML`,
    `EMULSÃO LIPÍDICA 20%: ${fmt(result.volumes.lipid20Ml, 2)} ML`,
    `GLICOSE 50%: ${fmt(result.volumes.glucose50Ml, 2)} ML`,
    `ÁGUA BIDESTILADA: ${fmt(result.waterMl, 2)} ML`,
    `FOSFATO DE POTÁSSIO 10% (2 MMOL/ML): ${fmt(result.volumes.phosphate10Ml, 2)} ML`,
    `KCL 10% (1,3 MEQ/ML): ${fmt(result.volumes.potassiumChloride10Ml, 2)} ML`,
    `NACL 20% (3,4 MEQ/ML): ${fmt(result.volumes.sodiumChloride20Ml, 2)} ML`,
    `SULFATO DE MAGNÉSIO 50% (4 MEQ/ML): ${fmt(result.volumes.magnesiumSulfate50Ml, 2)} ML`,
    `GLUCONATO DE CÁLCIO 10% (100 MG/ML): ${fmt(result.volumes.calciumGluconate10Ml, 2)} ML`,
    `OLIGOELEMENTOS PEDIÁTRICOS: ${fmt(result.volumes.traceElementsPedMl, 2)} ML`,
    `POLIVITAMÍNICO PEDIÁTRICO: ${fmt(result.volumes.vitaminsPedMl, 2)} ML`,
    "",
    `OSMOLARIDADE CALCULADA: ${fmt(result.osmolarityMosmL)} MOSM/L`,
    `RELAÇÃO CA:P: ${fmt(result.calciumPhosphorusRatio, 2)}:1`,
  ].join("\n") : "";

  return (
    <>
      <header className="tool-heading npt-heading">
        <span className="eyebrow">MÓDULO 07 · NUTRIÇÃO PARENTERAL</span>
        <h2>Planilha de NPT pediátrica</h2>
        <p>Conversão da planilha enviada para uma calculadora de composição, volume, calorias, eletrólitos, relação Ca:P e osmolaridade.</p>
      </header>

      <div className="npt-tabs" role="tablist" aria-label="Conteúdo da NPT">
        <button className={tab === "calculator" ? "active" : ""} onClick={() => setTab("calculator")} role="tab" type="button">Calculadora</button>
        <button className={tab === "guide" ? "active" : ""} onClick={() => setTab("guide")} role="tab" type="button">Como utilizar</button>
      </div>

      {tab === "guide" ? (
        <section className="npt-guide">
          <div className="npt-guide-intro">
            <div><span className="eyebrow">FLUXO RESUMIDO</span><h3>Como percorrer a planilha</h3></div>
            <div className="npt-guide-links"><a href="/npt-fluxograma.pdf" rel="noreferrer" target="_blank">Abrir fluxograma completo em PDF →</a><a href="/npt-planilha-referencia.xlsx">Baixar planilha original →</a></div>
          </div>
          <div className="npt-guide-grid">
            {GUIDE_STEPS.map((step) => (
              <article className="npt-guide-step" key={step.number}>
                <span>{step.number}</span>
                <div><h4>{step.title}</h4><p>{step.text}</p></div>
              </article>
            ))}
          </div>
          <div className="danger-note"><strong>Conferência obrigatória:</strong> valide indicação, metas, estabilidade físico-química, compatibilidade, acesso, exames e composição final com o protocolo institucional, nutrição e farmácia clínica.</div>
        </section>
      ) : (
        <>
          <section className="npt-input-section">
            <div className="subsection-title"><div><span className="eyebrow">ETAPA 01</span><h3>Volume disponível</h3></div></div>
            <div className="form-grid npt-grid">
              <NptField label="Peso" value={weight} onChange={setWeight} suffix="kg" />
              <NptField label="Quota hídrica total" value={quota} onChange={setQuota} suffix="mL/kg/dia" />
              <NptField label="Dieta enteral associada" value={diet} onChange={setDiet} suffix="mL/kg/dia" />
              <NptField label="Outros volumes na quota" value={otherFluids} onChange={setOtherFluids} suffix="mL/dia" helper="Medicações e demais infusões." />
            </div>
          </section>

          <section className="npt-input-section">
            <div className="subsection-title"><div><span className="eyebrow">ETAPA 02</span><h3>Macronutrientes e eletrólitos</h3></div></div>
            <div className="form-grid npt-grid">
              <NptField label="VIG" value={gir} onChange={setGir} suffix="mg/kg/min" />
              <NptField label="Aminoácidos" value={aminoAcids} onChange={setAminoAcids} suffix="g/kg/dia" />
              <NptField label="Lipídios" value={lipids} onChange={setLipids} suffix="g/kg/dia" />
              <NptField label="NaCl" value={sodium} onChange={setSodium} suffix="mEq/kg/dia" />
              <NptField label="KCl" value={potassium} onChange={setPotassium} suffix="mEq/kg/dia" />
              <NptField label="Fosfato de potássio" value={phosphate} onChange={setPhosphate} suffix="mmol/kg/dia" />
              <NptField label="Sulfato de magnésio" value={magnesium} onChange={setMagnesium} suffix="mEq/kg/dia" />
              <NptField label="Gluconato de cálcio" value={calcium} onChange={setCalcium} suffix="mg/kg/dia" />
              <NptField label="Oligoelementos pediátricos" value={traceElements} onChange={setTraceElements} suffix="mL/kg/dia" />
              <NptField label="Polivitamínico pediátrico" value={vitamins} onChange={setVitamins} suffix="mL/dia" />
              <NptField label="Fator de correção" value={correctionFactor} onChange={setCorrectionFactor} suffix="×" helper="Mantém 1,00 quando não houver ajuste de volume." step="0.01" />
            </div>
          </section>

          {result ? (
            <>
              <section className="npt-summary-grid">
                <div><span>Quota total</span><strong>{fmt(result.quotaTotalMlDay)} mL/dia</strong></div>
                <div><span>Volume disponível para NPT</span><strong>{fmt(result.nptTargetMlDay)} mL/dia</strong></div>
                <div className="npt-summary-primary"><span>Programar BIC</span><strong>{fmt(result.flowMlH, 2)} mL/h</strong></div>
                <div><span>Calorias</span><strong>{fmt(result.kcalKgDay)} kcal/kg/dia</strong></div>
                <div><span>Osmolaridade</span><strong>{fmt(result.osmolarityMosmL)} mOsm/L</strong></div>
                <div><span>Relação Ca:P</span><strong>{fmt(result.calciumPhosphorusRatio, 2)}:1</strong></div>
              </section>

              <section className="npt-results-layout">
                <div className="npt-composition">
                  <div className="subsection-title"><div><span className="eyebrow">COMPOSIÇÃO</span><h3>Volumes da solução</h3></div></div>
                  <div className="npt-table-wrap">
                    <table className="npt-table">
                      <thead><tr><th>Componente</th><th>Volume</th></tr></thead>
                      <tbody>
                        <tr><td>Aminoácidos 10%</td><td>{fmt(result.volumes.aminoAcids10Ml, 2)} mL</td></tr>
                        <tr><td>Emulsão lipídica 20%</td><td>{fmt(result.volumes.lipid20Ml, 2)} mL</td></tr>
                        <tr><td>Glicose 50%</td><td>{fmt(result.volumes.glucose50Ml, 2)} mL</td></tr>
                        <tr className={result.waterMl < 0 ? "invalid" : ""}><td>Água bidestilada</td><td>{fmt(result.waterMl, 2)} mL</td></tr>
                        <tr><td>Fosfato de potássio 10%</td><td>{fmt(result.volumes.phosphate10Ml, 2)} mL</td></tr>
                        <tr><td>KCl 10%</td><td>{fmt(result.volumes.potassiumChloride10Ml, 2)} mL</td></tr>
                        <tr><td>NaCl 20%</td><td>{fmt(result.volumes.sodiumChloride20Ml, 2)} mL</td></tr>
                        <tr><td>Sulfato de magnésio 50%</td><td>{fmt(result.volumes.magnesiumSulfate50Ml, 2)} mL</td></tr>
                        <tr><td>Gluconato de cálcio 10%</td><td>{fmt(result.volumes.calciumGluconate10Ml, 2)} mL</td></tr>
                        <tr><td>Oligoelementos pediátricos</td><td>{fmt(result.volumes.traceElementsPedMl, 2)} mL</td></tr>
                        <tr><td>Polivitamínico pediátrico</td><td>{fmt(result.volumes.vitaminsPedMl, 2)} mL</td></tr>
                      </tbody>
                      <tfoot><tr><th>Volume total preparado</th><th>{fmt(result.preparedVolumeMl, 2)} mL</th></tr></tfoot>
                    </table>
                  </div>
                </div>

                <div className="npt-checks">
                  <div className="subsection-title"><div><span className="eyebrow">CONFERÊNCIAS</span><h3>Resumo matemático</h3></div></div>
                  <dl>
                    <div><dt>Glicose</dt><dd>{fmt(result.grams.glucoseGDay, 2)} g/dia</dd></div>
                    <div><dt>Proteína</dt><dd>{fmt(result.grams.aminoAcidsGDay, 2)} g/dia</dd></div>
                    <div><dt>Lipídios</dt><dd>{fmt(result.grams.lipidsGDay, 2)} g/dia</dd></div>
                    <div><dt>Distribuição calórica</dt><dd>CHO {fmt(result.caloriePercentages.carbohydrate)}% · PTN {fmt(result.caloriePercentages.protein)}% · LIP {fmt(result.caloriePercentages.lipid)}%</dd></div>
                    <div><dt>Kcal não proteica/g N</dt><dd>{fmt(result.nonProteinKcalPerNitrogenG)}</dd></div>
                    <div><dt>Volume mínimo a 900 mOsm/L</dt><dd>{fmt(result.minimumPeripheralVolumeMl)} mL</dd></div>
                    <div><dt>Volume mínimo a 1.500 mOsm/L</dt><dd>{fmt(result.minimumCentralVolumeMl)} mL</dd></div>
                    <div><dt>Ca necessário pelo P prescrito</dt><dd>{fmt(result.calciumNeededMgKgDay)} mg/kg/dia</dd></div>
                    <div><dt>P necessário pelo Ca prescrito</dt><dd>{fmt(result.phosphateNeededMmolKgDay, 2)} mmol/kg/dia</dd></div>
                  </dl>
                </div>
              </section>

              {result.waterMl < 0 ? <div className="danger-note"><strong>Volume incompatível:</strong> a soma dos componentes ultrapassa o volume disponível. Ajuste a quota, os volumes reservados ou as metas prescritas antes de utilizar a composição.</div> : null}
              {result.calciumPhosphorusRatio !== null && Math.abs(result.calciumPhosphorusRatio - 2) > 0.15 ? <div className="warning-note"><strong>Relação Ca:P fora de 2:1:</strong> confira a prescrição, a estabilidade e a prioridade clínica de cada elemento.</div> : null}
              <PrescriptionBlock invalidMessage="A soma dos componentes ultrapassa o volume disponível." text={composition} valid={result.waterMl >= 0} />
            </>
          ) : <p className="empty-result">Preencha peso, quota hídrica e valores não negativos para calcular a NPT.</p>}
        </>
      )}
    </>
  );
}
