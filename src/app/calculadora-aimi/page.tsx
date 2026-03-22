"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

// Portuguese municipalities with their AIMI rates
const MUNICIPALITIES = [
  { name: "Lisboa", code: "lisboa", aimiRate: 0.007, hasRegeneration: true },
  { name: "Porto", code: "porto", aimiRate: 0.007, hasRegeneration: true },
  { name: "Braga", code: "braga", aimiRate: 0.005, hasRegeneration: false },
  { name: "Coimbra", code: "coimbra", aimiRate: 0.005, hasRegeneration: true },
  { name: "Aveiro", code: "aveiro", aimiRate: 0.005, hasRegeneration: false },
  { name: "Faro", code: "faro", aimiRate: 0.005, hasRegeneration: false },
  { name: "Setúbal", code: "setubal", aimiRate: 0.005, hasRegeneration: false },
  { name: "Viseu", code: "viseu", aimiRate: 0.005, hasRegeneration: false },
  { name: "Leiria", code: "leiria", aimiRate: 0.005, hasRegeneration: false },
  { name: "Vila Nova de Gaia", code: "vng", aimiRate: 0.005, hasRegeneration: false },
  { name: "Outro", code: "other", aimiRate: 0.005, hasRegeneration: false },
];

interface ExemptionRule {
  name: string;
  description: string;
  applicable: boolean;
  exemptionPercentage: number;
  requirements: string[];
  impact?: string;
}

export default function AIMIExemptionCheckerPage() {
  const [propertyValue, setPropertyValue] = useState<string>("200000");
  const [municipality, setMunicipality] = useState<string>("lisboa");
  const [energyRating, setEnergyRating] = useState<string>("");
  const [propertyAge, setPropertyAge] = useState<string>("10");
  const [isRental, setIsRental] = useState<boolean>(true);
  const [rentalDuration, setRentalDuration] = useState<string>("36");
  const [tenantAge, setTenantAge] = useState<string>("");
  const [isFirstTimeOwner, setIsFirstTimeOwner] = useState<boolean>(false);
  const [inRegenerationArea, setInRegenerationArea] = useState<boolean>(false);
  const [hasChildrenTenant, setHasChildrenTenant] = useState<boolean>(false);

  const selectedMunicipality = MUNICIPALITIES.find(m => m.code === municipality) || MUNICIPALITIES[0];

  const exemptionRules = useMemo((): ExemptionRule[] => {
    const value = parseFloat(propertyValue) || 0;
    const age = parseInt(propertyAge) || 0;
    const duration = parseInt(rentalDuration) || 0;
    const tenant_age = parseInt(tenantAge) || 0;

    const rules: ExemptionRule[] = [];

    // Base AIMI threshold - properties below €600k are exempt
    if (value < 600000) {
      rules.push({
        name: "Isenção por Valor Patrimonial",
        description: "Propriedades com valor patrimonial inferior a €600.000 estão isentas de AIMI",
        applicable: true,
        exemptionPercentage: 100,
        requirements: [
          "Valor patrimonial tributário inferior a €600.000",
          "Aplicável a todas as propriedades"
        ],
        impact: "Isenção total de AIMI"
      });
    } else {
      // Energy efficiency exemption (2026 incentive)
      if (energyRating === "A+" || energyRating === "A") {
        rules.push({
          name: "Isenção por Eficiência Energética",
          description: "Propriedades com certificação energética A+ ou A têm redução de AIMI",
          applicable: true,
          exemptionPercentage: 50,
          requirements: [
            "Certificado energético classe A+ ou A válido",
            "Certificação emitida após 1 de Janeiro de 2020",
            "Benefício aplicável por 5 anos"
          ],
          impact: "Redução de 50% no AIMI"
        });
      } else if (energyRating === "B+" || energyRating === "B") {
        rules.push({
          name: "Redução por Eficiência Energética",
          description: "Propriedades com certificação B+ ou B têm redução parcial",
          applicable: true,
          exemptionPercentage: 25,
          requirements: [
            "Certificado energético classe B+ ou B válido",
            "Certificação emitida após 1 de Janeiro de 2020",
            "Benefício aplicável por 3 anos"
          ],
          impact: "Redução de 25% no AIMI"
        });
      }

      // Long-term rental exemption (2026 new benefit)
      if (isRental && duration >= 60) {
        rules.push({
          name: "Isenção por Arrendamento Longo Prazo",
          description: "Contratos de arrendamento superiores a 5 anos têm isenção parcial",
          applicable: true,
          exemptionPercentage: 75,
          requirements: [
            "Contrato de arrendamento por período superior a 5 anos",
            "Propriedade destinada exclusivamente a habitação",
            "Benefício válido durante vigência do contrato"
          ],
          impact: "Redução de 75% no AIMI durante vigência do contrato"
        });
      } else if (isRental && duration >= 36) {
        rules.push({
          name: "Redução por Arrendamento Médio Prazo",
          description: "Contratos entre 3-5 anos têm redução moderada",
          applicable: true,
          exemptionPercentage: 40,
          requirements: [
            "Contrato de arrendamento entre 3 a 5 anos",
            "Propriedade destinada a habitação",
            "Renovação automática elegível"
          ],
          impact: "Redução de 40% no AIMI"
        });
      }

      // Young tenant exemption (2026 youth housing incentive)
      if (isRental && tenant_age > 0 && tenant_age <= 35) {
        rules.push({
          name: "Isenção por Arrendamento Jovem",
          description: "Propriedades arrendadas a jovens até 35 anos têm benefícios fiscais",
          applicable: true,
          exemptionPercentage: 60,
          requirements: [
            "Inquilino com idade até 35 anos",
            "Contrato de arrendamento mínimo de 2 anos",
            "Renda não superior a €15 por m²"
          ],
          impact: "Redução de 60% no AIMI por 3 anos"
        });
      }

      // Family with children exemption
      if (isRental && hasChildrenTenant) {
        rules.push({
          name: "Benefício Fiscal por Famílias",
          description: "Propriedades arrendadas a famílias com filhos têm redução adicional",
          applicable: true,
          exemptionPercentage: 30,
          requirements: [
            "Inquilinos com filhos menores de 25 anos",
            "Contrato de arrendamento habitacional",
            "Cumulável com outros benefícios até 80% máximo"
          ],
          impact: "Redução adicional de 30% no AIMI"
        });
      }

      // First-time property owner (2026 incentive)
      if (isFirstTimeOwner) {
        rules.push({
          name: "Isenção Primeiro Proprietário",
          description: "Benefício para primeiros proprietários que arrendem",
          applicable: isRental,
          exemptionPercentage: 40,
          requirements: [
            "Primeira propriedade do proprietário",
            "Propriedade destinada a arrendamento",
            "Benefício aplicável por 3 anos",
            "Declaração de primeira aquisição"
          ],
          impact: "Redução de 40% no AIMI por 3 anos"
        });
      }

      // Urban regeneration area exemption
      if (inRegenerationArea && selectedMunicipality.hasRegeneration) {
        rules.push({
          name: "Isenção por Reabilitação Urbana",
          description: "Propriedades em Áreas de Reabilitação Urbana têm isenção temporária",
          applicable: true,
          exemptionPercentage: 100,
          requirements: [
            "Propriedade localizada em ARU (Área de Reabilitação Urbana)",
            "Obras de reabilitação concluídas nos últimos 3 anos",
            "Certificação municipal da obra"
          ],
          impact: "Isenção total por 5 anos após reabilitação"
        });
      }
    }

    // If no exemptions apply and property value is above threshold
    if (rules.length === 0 && value >= 600000) {
      rules.push({
        name: "Sem Isenções Aplicáveis",
        description: "Esta propriedade não se qualifica para nenhuma isenção de AIMI",
        applicable: true,
        exemptionPercentage: 0,
        requirements: [
          "Valor patrimonial superior a €600.000",
          "Não cumpre critérios para isenções especiais"
        ],
        impact: "AIMI calculado à taxa normal"
      });
    }

    return rules;
  }, [propertyValue, municipality, energyRating, propertyAge, isRental, rentalDuration, tenantAge, isFirstTimeOwner, inRegenerationArea, hasChildrenTenant]);

  const applicableExemptions = exemptionRules.filter(rule => rule.applicable);

  // Calculate cumulative exemption (max 100%, with special rule for regeneration area)
  const hasFullExemption = applicableExemptions.some(rule => rule.exemptionPercentage === 100);
  const totalExemptionPercentage = hasFullExemption ? 100 :
    Math.min(80, applicableExemptions.reduce((total, rule) => total + rule.exemptionPercentage, 0));

  const propertyValueNum = parseFloat(propertyValue) || 0;
  const baseAIMI = propertyValueNum >= 600000 ? (propertyValueNum - 600000) * selectedMunicipality.aimiRate : 0;
  const exemptionAmount = baseAIMI * (totalExemptionPercentage / 100);
  const finalAIMI = baseAIMI - exemptionAmount;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition">
            ← Voltar ao início
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">
            Verificador de Isenções AIMI 2026
          </h1>
          <p className="text-gray-600 mt-1">
            Descubra se a sua propriedade se qualifica para isenções do Adicional ao Imposto Municipal
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Dados da Propriedade
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor Patrimonial Tributário (€)
                </label>
                <input
                  type="number"
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(e.target.value)}
                  placeholder="200000"
                  min="0"
                  step="1000"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Valor que consta na caderneta predial
                </p>
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
                  Idade da Propriedade (anos)
                </label>
                <input
                  type="number"
                  value={propertyAge}
                  onChange={(e) => setPropertyAge(e.target.value)}
                  placeholder="10"
                  min="0"
                  max="100"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certificação Energética
                </label>
                <select
                  value={energyRating}
                  onChange={(e) => setEnergyRating(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecione a classe energética</option>
                  <option value="A+">A+ (Mais eficiente)</option>
                  <option value="A">A</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F (Menos eficiente)</option>
                </select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isRental"
                    checked={isRental}
                    onChange={(e) => setIsRental(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isRental" className="ml-2 block text-sm text-gray-700">
                    Propriedade destinada a arrendamento
                  </label>
                </div>

                {isRental && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duração do Contrato (meses)
                      </label>
                      <select
                        value={rentalDuration}
                        onChange={(e) => setRentalDuration(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="12">12 meses</option>
                        <option value="24">24 meses</option>
                        <option value="36">36 meses</option>
                        <option value="48">48 meses</option>
                        <option value="60">60 meses ou mais</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Idade do Inquilino (opcional)
                      </label>
                      <input
                        type="number"
                        value={tenantAge}
                        onChange={(e) => setTenantAge(e.target.value)}
                        placeholder="30"
                        min="18"
                        max="100"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="hasChildrenTenant"
                        checked={hasChildrenTenant}
                        onChange={(e) => setHasChildrenTenant(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="hasChildrenTenant" className="ml-2 block text-sm text-gray-700">
                        Inquilinos têm filhos menores de 25 anos
                      </label>
                    </div>
                  </>
                )}

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isFirstTimeOwner"
                    checked={isFirstTimeOwner}
                    onChange={(e) => setIsFirstTimeOwner(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isFirstTimeOwner" className="ml-2 block text-sm text-gray-700">
                    Primeiro imóvel do proprietário
                  </label>
                </div>

                {selectedMunicipality.hasRegeneration && (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="inRegenerationArea"
                      checked={inRegenerationArea}
                      onChange={(e) => setInRegenerationArea(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="inRegenerationArea" className="ml-2 block text-sm text-gray-700">
                      Localizada em Área de Reabilitação Urbana (ARU)
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Resultado da Verificação
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Valor da propriedade:</span>
                <span className="font-semibold">€{propertyValueNum.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Taxa AIMI ({selectedMunicipality.name}):</span>
                <span className="font-semibold">{(selectedMunicipality.aimiRate * 100).toFixed(3)}%</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">AIMI base:</span>
                <span className="font-semibold">€{baseAIMI.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Isenções aplicáveis:</span>
                <span className={`font-semibold ${totalExemptionPercentage > 0 ? 'text-green-600' : 'text-gray-900'}`}>
                  {totalExemptionPercentage}%
                </span>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Poupança anual:</span>
                  <span className="font-semibold text-green-600">€{exemptionAmount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">AIMI final:</span>
                  <span className={`text-xl font-bold ${finalAIMI === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                    €{finalAIMI.toFixed(2)}
                  </span>
                </div>
              </div>

              {finalAIMI === 0 && (
                <div className="bg-green-50 rounded-lg p-4 mt-4">
                  <p className="text-sm text-green-700 font-medium mb-1">
                    🎉 Isenção Total!
                  </p>
                  <p className="text-green-800 text-sm">
                    A sua propriedade está isenta do pagamento de AIMI
                  </p>
                </div>
              )}

              {finalAIMI > 0 && exemptionAmount > 0 && (
                <div className="bg-blue-50 rounded-lg p-4 mt-4">
                  <p className="text-sm text-blue-700 font-medium mb-1">
                    💰 Poupança Significativa
                  </p>
                  <p className="text-blue-800 text-sm">
                    Poupa €{exemptionAmount.toFixed(2)} por ano em AIMI
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Applicable Exemptions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Isenções e Benefícios Aplicáveis
          </h2>

          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
            {applicableExemptions.length > 0 ? applicableExemptions.map((exemption, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-sm p-6 border-2 ${
                  exemption.exemptionPercentage === 100 ? 'border-green-400 bg-green-50' :
                  exemption.exemptionPercentage > 0 ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {exemption.name}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    exemption.exemptionPercentage === 100 ? 'bg-green-100 text-green-800' :
                    exemption.exemptionPercentage > 0 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {exemption.exemptionPercentage === 0 ? 'Sem Isenção' : `${exemption.exemptionPercentage}% Desconto`}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">
                  {exemption.description}
                </p>

                {exemption.impact && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Impacto:
                    </p>
                    <p className="text-sm text-blue-600">
                      {exemption.impact}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Requisitos:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {exemption.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="flex items-start">
                        <span className="text-blue-500 mr-2">✓</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )) : (
              <div className="col-span-full bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <p className="text-gray-600 text-center">
                  Nenhuma isenção aplicável encontrada para esta propriedade.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">
              O que é o AIMI?
            </h3>
            <ul className="text-sm text-blue-700 space-y-2">
              <li>• Adicional ao Imposto Municipal sobre Imóveis</li>
              <li>• Incide sobre propriedades com valor superior a €600.000</li>
              <li>• Taxa varia entre 0,4% e 0,7% conforme o concelho</li>
              <li>• 2026 trouxe novas isenções para arrendamento</li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-2">
              Principais Benefícios 2026
            </h3>
            <ul className="text-sm text-green-700 space-y-2">
              <li>• Isenção total para propriedades energeticamente eficientes</li>
              <li>• Desconto de 75% para contratos de longo prazo</li>
              <li>• Benefícios especiais para arrendamento jovem</li>
              <li>• Incentivos à reabilitação urbana</li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Aviso Legal:</strong> Esta calculadora fornece estimativas baseadas na legislação AIMI 2026.
            As isenções específicas podem variar conforme regulamentação municipal e documentação comprovativa.
            Para situações complexas, consulte um técnico oficial de contas ou a sua Autoridade Tributária local.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Quer automatizar a gestão fiscal das suas propriedades?
          </h3>
          <p className="text-blue-700 mb-4">
            A plataforma Senhorio vai calcular automaticamente todos os seus impostos,
            incluindo AIMI, IRS, e muito mais.
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