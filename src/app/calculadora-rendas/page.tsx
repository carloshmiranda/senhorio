"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import { CALCULATOR_STRUCTURED_DATA } from "@/lib/structured-data";

// INE coefficients by year (2026 is the current year)
const INE_COEFFICIENTS = {
  2026: 2.24,
  2025: 2.24, // Fallback for older contracts
  2024: 5.43,
  2023: 2.0,
  2022: 0.43,
};

// Contract types and their rules
interface ContractRule {
  name: string;
  description: string;
  coefficient: number;
  applicable: boolean;
  requirements: string[];
}

export default function RentIncreaseCalculatorPage() {
  const [currentRent, setCurrentRent] = useState<string>("800");
  const [contractDate, setContractDate] = useState<string>("2020-01-01");
  const [propertyType, setPropertyType] = useState<"residential" | "commercial">("residential");
  const [lastIncreaseDate, setLastIncreaseDate] = useState<string>("");

  const contractRules = useMemo((): ContractRule[] => {
    const rent = parseFloat(currentRent) || 0;
    const contractStart = new Date(contractDate);
    const today = new Date();
    const lastIncrease = lastIncreaseDate ? new Date(lastIncreaseDate) : null;

    // Check if it's been at least 12 months since last increase
    const canIncreaseByTime = !lastIncrease ||
      (today.getTime() - lastIncrease.getTime()) >= (365 * 24 * 60 * 60 * 1000);

    // Different rules based on contract date and type
    const isOldContract = contractStart < new Date("2012-01-01");
    const isNewContract = contractStart >= new Date("2012-01-01");

    const rules: ContractRule[] = [];

    if (propertyType === "residential") {
      // New Urban Lease Law (NRAU) contracts - most common
      if (isNewContract) {
        rules.push({
          name: "NRAU - Coeficiente INE 2026",
          description: "Aumentos limitados pelo coeficiente do INE para contratos após 2012",
          coefficient: INE_COEFFICIENTS[2026],
          applicable: canIncreaseByTime,
          requirements: [
            "Contrato celebrado após 1 de Janeiro de 2012",
            "Mínimo 12 meses desde último aumento",
            "Arrendamento para habitação",
            "Coeficiente oficial do INE: 2,24%"
          ]
        });
      }

      // Old contracts with special rules
      if (isOldContract) {
        rules.push({
          name: "Contrato Anterior a 2012",
          description: "Regime especial para contratos celebrados antes do NRAU",
          coefficient: INE_COEFFICIENTS[2026],
          applicable: canIncreaseByTime,
          requirements: [
            "Contrato celebrado antes de 1 de Janeiro de 2012",
            "Sujeito a regras de transição",
            "Mínimo 12 meses desde último aumento"
          ]
        });
      }

      // Special case: no increase allowed in first year
      if ((today.getTime() - contractStart.getTime()) < (365 * 24 * 60 * 60 * 1000)) {
        rules.push({
          name: "Primeiro Ano de Contrato",
          description: "Não é permitido aumentar renda no primeiro ano",
          coefficient: 0,
          applicable: true,
          requirements: [
            "Contrato celebrado há menos de 12 meses",
            "Lei não permite aumentos no primeiro ano"
          ]
        });
      }
    } else {
      // Commercial contracts have more flexibility
      rules.push({
        name: "Arrendamento Comercial",
        description: "Regime para arrendamento não habitacional",
        coefficient: INE_COEFFICIENTS[2026],
        applicable: canIncreaseByTime,
        requirements: [
          "Arrendamento para comércio/serviços",
          "Coeficiente INE aplicável",
          "Verificar cláusulas contratuais específicas"
        ]
      });
    }

    return rules;
  }, [currentRent, contractDate, propertyType, lastIncreaseDate]);

  const applicableRule = contractRules.find(rule => rule.applicable) || contractRules[0];
  const currentRentValue = parseFloat(currentRent) || 0;
  const maxIncrease = currentRentValue * (applicableRule.coefficient / 100);
  const newMaxRent = currentRentValue + maxIncrease;

  const contractAge = useMemo(() => {
    const start = new Date(contractDate);
    const today = new Date();
    const years = today.getFullYear() - start.getFullYear();
    const months = today.getMonth() - start.getMonth();
    return { years, months: months < 0 ? months + 12 : months };
  }, [contractDate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData
        webAppData={CALCULATOR_STRUCTURED_DATA.rentCalculator.webApp}
        faqData={CALCULATOR_STRUCTURED_DATA.rentCalculator.faqs}
      />
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition">
            ← Voltar ao início
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">
            Calculadora de Aumentos de Renda 2026
          </h1>
          <p className="text-gray-600 mt-1">
            Calcule o aumento máximo permitido por lei baseado no coeficiente INE
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Dados do Contrato de Arrendamento
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Renda Atual (€)
                </label>
                <input
                  type="number"
                  value={currentRent}
                  onChange={(e) => setCurrentRent(e.target.value)}
                  placeholder="800"
                  min="0"
                  step="10"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data de Início do Contrato
                </label>
                <input
                  type="date"
                  value={contractDate}
                  onChange={(e) => setContractDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Arrendamento
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPropertyType("residential")}
                    className={`px-4 py-3 border rounded-lg font-medium transition ${
                      propertyType === "residential"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Habitação
                  </button>
                  <button
                    onClick={() => setPropertyType("commercial")}
                    className={`px-4 py-3 border rounded-lg font-medium transition ${
                      propertyType === "commercial"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Comércio/Serviços
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data do Último Aumento (opcional)
                </label>
                <input
                  type="date"
                  value={lastIncreaseDate}
                  onChange={(e) => setLastIncreaseDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Se nunca houve aumento, deixe em branco
                </p>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Resultado do Cálculo
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Renda atual:</span>
                <span className="font-semibold">€{currentRentValue.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Contrato há:</span>
                <span className="font-semibold">
                  {contractAge.years} anos, {contractAge.months} meses
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Coeficiente INE 2026:</span>
                <span className="font-semibold">{applicableRule.coefficient}%</span>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Aumento máximo permitido:</span>
                  <span className="font-semibold text-green-600">€{maxIncrease.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Nova renda máxima:</span>
                  <span className="text-xl font-bold text-gray-900">€{newMaxRent.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mt-4">
                <p className="text-sm text-blue-700 font-medium mb-1">
                  Regime Aplicável
                </p>
                <p className="text-blue-800 font-semibold">
                  {applicableRule.name}
                </p>
                <p className="text-sm text-blue-600">
                  {applicableRule.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Information */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Regime Legal Aplicável
          </h2>

          <div className="grid md:grid-cols-1 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {applicableRule.name}
              </h3>

              <div className="mb-4">
                <p className="text-gray-600 mb-4">
                  {applicableRule.description}
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Coeficiente de Atualização:
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {applicableRule.coefficient}%
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Status:
                    </p>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      applicableRule.applicable
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {applicableRule.applicable ? "Aumento Permitido" : "Aumento Não Permitido"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Condições:
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {applicableRule.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">
              Importante Saber
            </h3>
            <ul className="text-sm text-yellow-700 space-y-2">
              <li>• O coeficiente INE é publicado anualmente pelo Instituto Nacional de Estatística</li>
              <li>• Aumentos só podem ser aplicados uma vez por ano civil</li>
              <li>• O senhorio deve comunicar o aumento com 30 dias de antecedência</li>
              <li>• Em contratos anteriores a 2012, podem aplicar-se regras especiais</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">
              Como Proceder
            </h3>
            <ul className="text-sm text-blue-700 space-y-2">
              <li>• Envie carta registada ao inquilino com 30 dias de antecedência</li>
              <li>• Indique claramente o valor do novo aumento</li>
              <li>• Mencione o coeficiente INE 2026 (2,24%) como fundamento</li>
              <li>• Mantenha comprovativo de envio da comunicação</li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-8 bg-gray-100 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <strong>Aviso Legal:</strong> Esta calculadora fornece uma estimativa baseada na legislação geral
            portuguesa e no coeficiente INE oficial. As situações específicas podem variar dependendo das
            cláusulas contratuais, tipo de imóvel e outras circunstâncias. Consulte sempre um advogado
            especializado em arrendamento urbano para aconselhamento personalizado sobre o seu caso específico.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Precisa de gerir mais propriedades?
          </h3>
          <p className="text-blue-700 mb-4">
            A plataforma Senhorio vai ajudá-lo a gerir todas as suas propriedades,
            controlar aumentos de renda, e manter-se em conformidade com a lei portuguesa.
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