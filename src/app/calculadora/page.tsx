"use client";

import { useState } from "react";
import Link from "next/link";

// Portuguese municipality data - simplified list with major cities
const MUNICIPALITIES = [
  { name: "Lisboa", medianRent: 1200 },
  { name: "Porto", medianRent: 800 },
  { name: "Cascais", medianRent: 1400 },
  { name: "Oeiras", medianRent: 1300 },
  { name: "Matosinhos", medianRent: 750 },
  { name: "Braga", medianRent: 600 },
  { name: "Coimbra", medianRent: 550 },
  { name: "Aveiro", medianRent: 500 },
  { name: "Faro", medianRent: 700 },
  { name: "Setúbal", medianRent: 650 },
  { name: "Sintra", medianRent: 900 },
  { name: "Vila Nova de Gaia", medianRent: 650 },
  { name: "Amadora", medianRent: 800 },
  { name: "Odivelas", medianRent: 750 },
  { name: "Loures", medianRent: 700 }
];

interface TaxRegime {
  name: string;
  rate: number;
  annualTax: number;
  eligible: boolean;
  reason: string;
  description: string;
}

interface CalculatorInputs {
  monthlyRent: number;
  municipality: string;
  numProperties: number;
  isResident: boolean;
}

function calculateTaxRegimes(inputs: CalculatorInputs): TaxRegime[] {
  const { monthlyRent, municipality, numProperties, isResident } = inputs;
  const annualRent = monthlyRent * 12;

  const selectedMunicipality = MUNICIPALITIES.find(m => m.name === municipality);
  const medianRent = selectedMunicipality?.medianRent || 800;
  const rentBelowMedian = monthlyRent < medianRent * 0.8; // 20% below median

  // Standard IRS (25%)
  const standardTax = annualRent * 0.25;

  // Reduced Rate (10% for rents ≤€2300/mo)
  const reducedEligible = monthlyRent <= 2300;
  const reducedTax = reducedEligible ? annualRent * 0.10 : standardTax;

  // RSAA (0% for below-median rents, launching June 2026)
  const rsaaEligible = rentBelowMedian && monthlyRent <= 2300;
  const rsaaTax = rsaaEligible ? 0 : standardTax;

  // Non-Resident (28% flat)
  const nonResidentTax = annualRent * 0.28;

  return [
    {
      name: "Standard IRS",
      rate: 25,
      annualTax: standardTax,
      eligible: true,
      reason: "Sempre aplicável",
      description: "Taxa padrão de IRS sobre rendimentos prediais"
    },
    {
      name: "Taxa Reduzida",
      rate: 10,
      annualTax: reducedTax,
      eligible: reducedEligible,
      reason: reducedEligible ? `Renda ≤ €2.300/mês` : `Renda > €2.300/mês (€${monthlyRent})`,
      description: "Taxa reduzida para rendas até €2.300/mês"
    },
    {
      name: "RSAA (Arrendamento Acessível)",
      rate: 0,
      annualTax: rsaaTax,
      eligible: rsaaEligible,
      reason: rsaaEligible ?
        `Renda 20%+ abaixo da mediana de ${municipality} (€${medianRent})` :
        `Renda não é 20%+ abaixo da mediana (€${Math.round(medianRent * 0.8)})`,
      description: "Isenção total para rendas acessíveis (lança Junho 2026)"
    },
    {
      name: "Não Residente",
      rate: 28,
      annualTax: nonResidentTax,
      eligible: !isResident,
      reason: isResident ? "Apenas para não residentes" : "Aplica-se a não residentes",
      description: "Taxa fixa para proprietários não residentes"
    }
  ];
}

export default function CalculadoraPage() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    monthlyRent: 1000,
    municipality: "Lisboa",
    numProperties: 1,
    isResident: true
  });

  const [language, setLanguage] = useState<"pt" | "en">("pt");
  const [showResults, setShowResults] = useState(false);

  const taxRegimes = calculateTaxRegimes(inputs);
  const bestRegime = taxRegimes
    .filter(regime => regime.eligible)
    .sort((a, b) => a.annualTax - b.annualTax)[0];

  const maxTax = Math.max(...taxRegimes.map(r => r.annualTax));
  const savings = bestRegime ? maxTax - bestRegime.annualTax : 0;

  const handleCalculate = () => {
    setShowResults(true);
  };

  const texts = {
    pt: {
      title: "Calculadora de Regimes de IRS para Senhorios",
      subtitle: "Compare todos os regimes fiscais de 2026 para o seu caso específico",
      monthlyRent: "Renda mensal (€)",
      municipality: "Concelho",
      numProperties: "Número de propriedades",
      resident: "Residente em Portugal",
      yes: "Sim",
      no: "Não",
      calculate: "Calcular Impostos",
      results: "Resultados da Simulação",
      bestOption: "A sua melhor opção é",
      savings: "poupa €{amount}/ano vs. a opção mais cara",
      eligible: "Elegível",
      notEligible: "Não elegível",
      backHome: "← Voltar ao Senhorio",
      joinWaitlist: "Junte-se à Lista de Espera",
      regime: "Regime",
      tax: "Imposto Anual",
      status: "Elegibilidade"
    },
    en: {
      title: "Portuguese Landlord Tax Regime Calculator",
      subtitle: "Compare all 2026 tax regimes for your specific situation",
      monthlyRent: "Monthly rent (€)",
      municipality: "Municipality",
      numProperties: "Number of properties",
      resident: "Portugal resident",
      yes: "Yes",
      no: "No",
      calculate: "Calculate Taxes",
      results: "Simulation Results",
      bestOption: "Your best option is",
      savings: "saves €{amount}/year vs. highest tax option",
      eligible: "Eligible",
      notEligible: "Not eligible",
      backHome: "← Back to Senhorio",
      joinWaitlist: "Join Waitlist",
      regime: "Tax Regime",
      tax: "Annual Tax",
      status: "Eligibility"
    }
  };

  const t = texts[language];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="text-gray-600 hover:text-gray-900 transition">
            {t.backHome}
          </Link>
          <button
            onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition"
          >
            {language === "pt" ? "English" : "Português"}
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Calculator Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Monthly Rent */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.monthlyRent}
              </label>
              <input
                type="number"
                min="0"
                step="50"
                value={inputs.monthlyRent}
                onChange={(e) => setInputs({...inputs, monthlyRent: parseInt(e.target.value) || 0})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Municipality */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.municipality}
              </label>
              <select
                value={inputs.municipality}
                onChange={(e) => setInputs({...inputs, municipality: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {MUNICIPALITIES.map(municipality => (
                  <option key={municipality.name} value={municipality.name}>
                    {municipality.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Number of Properties */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.numProperties}
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={inputs.numProperties}
                onChange={(e) => setInputs({...inputs, numProperties: parseInt(e.target.value) || 1})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Resident Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.resident}
              </label>
              <div className="flex gap-4 pt-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={inputs.isResident}
                    onChange={() => setInputs({...inputs, isResident: true})}
                    className="mr-2"
                  />
                  {t.yes}
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={!inputs.isResident}
                    onChange={() => setInputs({...inputs, isResident: false})}
                    className="mr-2"
                  />
                  {t.no}
                </label>
              </div>
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            {t.calculate}
          </button>
        </div>

        {/* Results */}
        {showResults && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t.results}
            </h2>

            {/* Best Option Banner */}
            {bestRegime && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-lg font-medium text-green-900 mb-1">
                  {t.bestOption} <span className="font-bold">{bestRegime.name}</span>
                </p>
                {savings > 0 && (
                  <p className="text-green-700">
                    {t.savings.replace("{amount}", savings.toLocaleString("pt-PT"))}
                  </p>
                )}
              </div>
            )}

            {/* Tax Regimes Comparison */}
            <div className="grid md:grid-cols-2 gap-4">
              {taxRegimes.map((regime, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg border-2 ${
                    regime === bestRegime && regime.eligible
                      ? "border-green-500 bg-green-50"
                      : regime.eligible
                      ? "border-gray-200 bg-white"
                      : "border-gray-200 bg-gray-50 opacity-60"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">
                      {regime.name}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded ${
                      regime.eligible
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {regime.eligible ? t.eligible : t.notEligible}
                    </span>
                  </div>

                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    €{regime.annualTax.toLocaleString("pt-PT")}
                    <span className="text-sm font-normal text-gray-500 ml-1">
                      /ano ({regime.rate}%)
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-2">
                    {regime.description}
                  </p>

                  <p className="text-xs text-gray-500">
                    {regime.reason}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 text-center">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Quer gerir todas as suas rendas automaticamente?
                </h3>
                <p className="text-blue-700 mb-4">
                  O Senhorio simplifica tudo: rastreamento de rendas, lembretes de recibos,
                  calculadora de aumentos e exportação anual para o IRS.
                </p>
                <Link
                  href="/#waitlist"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  {t.joinWaitlist}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}