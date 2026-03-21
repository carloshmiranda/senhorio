"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

// Portuguese municipalities with their tax rates (simplified for example)
const MUNICIPALITIES = [
  { name: "Lisboa", code: "lisboa", derrama: 0.015 },
  { name: "Porto", code: "porto", derrama: 0.015 },
  { name: "Braga", code: "braga", derrama: 0.015 },
  { name: "Coimbra", code: "coimbra", derrama: 0.015 },
  { name: "Aveiro", code: "aveiro", derrama: 0.015 },
  { name: "Faro", code: "faro", derrama: 0.015 },
  { name: "Setúbal", code: "setubal", derrama: 0.015 },
  { name: "Viseu", code: "viseu", derrama: 0.015 },
  { name: "Leiria", code: "leiria", derrama: 0.015 },
  { name: "Vila Nova de Gaia", code: "vng", derrama: 0.015 },
];

interface TaxRegime {
  name: string;
  rate: number;
  annualTax: number;
  eligible: boolean;
  description: string;
  requirements: string[];
  savings?: number;
}

export default function TaxCalculatorPage() {
  const [monthlyRent, setMonthlyRent] = useState<string>("1000");
  const [municipality, setMunicipality] = useState<string>("lisboa");
  const [propertyCount, setPropertyCount] = useState<string>("1");
  const [residency, setResidency] = useState<"resident" | "non-resident">("resident");

  const selectedMunicipality = MUNICIPALITIES.find(m => m.code === municipality) || MUNICIPALITIES[0];

  const taxRegimes = useMemo((): TaxRegime[] => {
    const rent = parseFloat(monthlyRent) || 0;
    const annualRent = rent * 12;
    const properties = parseInt(propertyCount) || 1;
    const totalAnnualRent = annualRent * properties;

    // Standard regime (25%)
    const standardTax = totalAnnualRent * 0.25;

    // Reduced regime (10%) - eligible if monthly rent ≤ €2,300
    const reducedEligible = rent <= 2300;
    const reducedTax = reducedEligible ? totalAnnualRent * 0.10 : 0;

    // RSAA regime (0%) - simplified criteria (below median income threshold)
    const rsaaEligible = totalAnnualRent <= 30000; // Simplified threshold
    const rsaaTax = rsaaEligible ? 0 : 0;

    // Non-resident regime (28%)
    const nonResidentTax = totalAnnualRent * 0.28;

    const regimes: TaxRegime[] = [
      {
        name: "Regime Geral",
        rate: 25,
        annualTax: standardTax,
        eligible: true,
        description: "Regime padrão para rendas",
        requirements: ["Todas as propriedades são elegíveis"],
      },
      {
        name: "Regime Simplificado",
        rate: 10,
        annualTax: reducedTax,
        eligible: reducedEligible,
        description: "Redução significativa para rendas moderadas",
        requirements: [
          "Renda mensal ≤ €2.300",
          "Propriedade arrendada por período superior a 2 anos"
        ],
      },
      {
        name: "RSAA (0%)",
        rate: 0,
        annualTax: rsaaTax,
        eligible: rsaaEligible,
        description: "Isenção total para rendimentos baixos",
        requirements: [
          "Rendimento anual total ≤ €30.000",
          "Primeira habitação própria"
        ],
      },
    ];

    // Add non-resident regime only for non-residents
    if (residency === "non-resident") {
      regimes.push({
        name: "Não Residentes",
        rate: 28,
        annualTax: nonResidentTax,
        eligible: true,
        description: "Regime especial para não residentes",
        requirements: ["Aplicável a proprietários não residentes em Portugal"],
      });
    }

    // Calculate savings relative to standard regime
    const lowestTax = Math.min(...regimes.filter(r => r.eligible).map(r => r.annualTax));
    regimes.forEach(regime => {
      if (regime.eligible) {
        regime.savings = standardTax - regime.annualTax;
      }
    });

    return regimes.sort((a, b) => {
      if (!a.eligible && b.eligible) return 1;
      if (a.eligible && !b.eligible) return -1;
      return a.annualTax - b.annualTax;
    });
  }, [monthlyRent, municipality, propertyCount, residency]);

  const bestRegime = taxRegimes.find(r => r.eligible) || taxRegimes[0];
  const totalAnnualRent = (parseFloat(monthlyRent) || 0) * 12 * (parseInt(propertyCount) || 1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition">
            ← Voltar ao início
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">
            Calculadora de Regimes Fiscais IRS 2026
          </h1>
          <p className="text-gray-600 mt-1">
            Compare todos os regimes fiscais e descubra quanto pode poupar
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Dados do Seu Arrendamento
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Renda Mensal (€)
                </label>
                <input
                  type="number"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(e.target.value)}
                  placeholder="1000"
                  min="0"
                  step="50"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Concelho
                </label>
                <select
                  value={municipality}
                  onChange={(e) => setMunicipality(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {MUNICIPALITIES.map((muni) => (
                    <option key={muni.code} value={muni.code}>
                      {muni.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Propriedades
                </label>
                <select
                  value={propertyCount}
                  onChange={(e) => setPropertyCount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[1,2,3,4,5].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'propriedade' : 'propriedades'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Residência Fiscal
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setResidency("resident")}
                    className={`px-4 py-3 border rounded-lg font-medium transition ${
                      residency === "resident"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Residente
                  </button>
                  <button
                    onClick={() => setResidency("non-resident")}
                    className={`px-4 py-3 border rounded-lg font-medium transition ${
                      residency === "non-resident"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Não Residente
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Resumo dos Seus Dados
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Renda mensal total:</span>
                <span className="font-semibold">€{parseFloat(monthlyRent || "0").toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Renda anual total:</span>
                <span className="font-semibold">€{totalAnnualRent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Concelho:</span>
                <span className="font-semibold">{selectedMunicipality.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Propriedades:</span>
                <span className="font-semibold">{propertyCount}</span>
              </div>

              {bestRegime && (
                <div className="border-t pt-4 mt-6">
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm text-green-700 font-medium mb-1">
                      Melhor Regime para Si
                    </p>
                    <p className="text-lg font-bold text-green-800">
                      {bestRegime.name}
                    </p>
                    <p className="text-sm text-green-600">
                      Imposto anual: €{bestRegime.annualTax.toLocaleString()}
                    </p>
                    {bestRegime.savings && bestRegime.savings > 0 && (
                      <p className="text-sm text-green-600">
                        Poupança: €{bestRegime.savings.toLocaleString()}/ano
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tax Regime Cards */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Comparação de Regimes Fiscais
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {taxRegimes.map((regime, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-sm p-6 border-2 transition ${
                  regime === bestRegime && regime.eligible
                    ? "border-green-400 bg-green-50"
                    : regime.eligible
                    ? "border-gray-200 hover:border-blue-300"
                    : "border-gray-200 bg-gray-50 opacity-75"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {regime.name}
                  </h3>
                  {regime === bestRegime && regime.eligible && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Recomendado
                    </span>
                  )}
                  {!regime.eligible && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">
                      Não Elegível
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {regime.rate}%
                  </div>
                  <div className="text-sm text-gray-500">Taxa de imposto</div>
                </div>

                {regime.eligible && (
                  <div className="mb-4">
                    <div className="text-xl font-semibold text-gray-900">
                      €{regime.annualTax.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">Imposto anual</div>

                    {regime.savings && regime.savings > 0 && (
                      <div className="mt-2">
                        <div className="text-sm font-medium text-green-600">
                          Poupança: €{regime.savings.toLocaleString()}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    {regime.description}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-700 mb-2">
                    Requisitos:
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {regime.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="flex items-start">
                        <span className="text-gray-400 mr-1">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Nota:</strong> Esta calculadora fornece uma estimativa baseada nos dados inseridos.
            Os valores reais podem variar dependendo de fatores específicos da sua situação fiscal.
            Consulte sempre um contabilista ou técnico oficial de contas para aconselhamento personalizado.
          </p>
        </div>

        {/* CTA to waitlist */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Quer gerir as suas propriedades de forma mais eficiente?
          </h3>
          <p className="text-blue-700 mb-4">
            Junte-se à nossa lista de espera para ter acesso antecipado à plataforma completa Senhorio.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Juntar à Lista de Espera
          </Link>
        </div>
      </div>
    </div>
  );
}