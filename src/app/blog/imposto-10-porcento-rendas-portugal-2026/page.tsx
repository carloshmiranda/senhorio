import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imposto 10% Rendas Portugal 2026: Guia Completo da Nova Taxa",
  description: "Guia completo sobre o imposto de 10% em rendas de casa em Portugal para 2026. Saiba quando aplicar, vantagens, desvantagens e como calcular com exemplos práticos.",
  keywords: "imposto 10% rendas portugal, taxa 10% rendas casa, IRS arrendamento 10%, imposto rendas portugal 2026, taxa fixa rendas",
  openGraph: {
    title: "Imposto 10% Rendas Portugal 2026: Guia Completo",
    description: "Descubra tudo sobre o imposto de 10% em rendas de casa em Portugal. Guia 2026 com exemplos, calculadora e quando é vantajoso aplicar.",
    type: "article",
  },
  alternates: {
    canonical: "https://senhorio.vercel.app/blog/imposto-10-porcento-rendas-portugal-2026",
  },
};

export default function Imposto10PorcentoRendasPortugal() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-700 transition">
            ← Voltar ao Blog
          </Link>
          <div className="mt-4">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2 py-1 bg-brand-100 text-brand-700 text-xs rounded font-medium">
                Imposto 10%
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-medium">
                Guia 2026
              </span>
              <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded font-medium">
                IRS Arrendamento
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Imposto 10% Rendas Portugal 2026: Guia Completo da Nova Taxa
            </h1>
            <p className="text-gray-600 mt-2">
              Tudo sobre o imposto de 10% em rendas de casa: quando aplicar, vantagens e como calcular
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500 mt-4">
              <time dateTime="2026-03-22">22 de março, 2026</time>
              <span>•</span>
              <span>15 min de leitura</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-lg prose-gray max-w-none">

          {/* Introduction */}
          <div className="bg-brand-50 border border-brand-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-brand-900 mb-3">
              🎯 Resumo Executivo
            </h2>
            <p className="text-brand-800 mb-2">
              O <strong>imposto de 10% sobre rendas em Portugal</strong> é uma das quatro opções fiscais disponíveis para senhorios em 2026.
              É uma taxa fixa aplicada sobre o valor bruto das rendas, sem deduções.
            </p>
            <ul className="text-brand-800 space-y-1 text-sm">
              <li>✅ <strong>Vantajoso para:</strong> Senhorios com poucas despesas dedutíveis</li>
              <li>✅ <strong>Simplicidade:</strong> Sem necessidade de guardar faturas</li>
              <li>❌ <strong>Desvantagem:</strong> Não permite dedução de despesas reais</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            O que é o Imposto de 10% em Rendas?
          </h2>

          <p>
            O <strong>imposto de 10% sobre rendas de casa em Portugal</strong> é um regime fiscal opcional
            introduzido para simplificar a tributação de rendimentos prediais. Também conhecido como
            "taxa liberatória de 10%", permite aos senhorios pagar um imposto fixo de 10% sobre o
            valor bruto das rendas recebidas.
          </p>

          <p>
            Este regime faz parte das <strong>4 opções fiscais para arrendamento em Portugal</strong>:
          </p>

          <div className="bg-gray-50 rounded-lg p-6 my-6">
            <ol className="space-y-3">
              <li className="flex items-start">
                <span className="bg-brand-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                <div>
                  <strong>Taxa fixa de 10%</strong> - Sobre rendas brutas (sem deduções)
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-brand-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                <div>
                  <strong>Englobamento</strong> - Rendas somadas aos outros rendimentos
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-brand-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                <div>
                  <strong>Regime simplificado</strong> - Com dedução automática de 65%
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-brand-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                <div>
                  <strong>Contabilidade organizada</strong> - Com dedução de despesas reais
                </div>
              </li>
            </ol>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Como Funciona o Imposto de 10% em 2026?
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Cálculo Simples
          </h3>

          <p>
            O cálculo do <strong>imposto de 10% sobre rendas</strong> é extremamente simples:
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 my-6">
            <p className="text-lg font-semibold text-green-800 mb-2">
              💡 Fórmula: Rendas Brutas × 10%
            </p>
            <p className="text-green-700">
              <strong>Exemplo:</strong> Renda de €800/mês = €9.600/ano<br/>
              Imposto = €9.600 × 10% = <strong>€960 por ano</strong>
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Características Principais
          </h3>

          <div className="grid md:grid-cols-2 gap-6 my-6">
            <div className="border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">✅ Vantagens</h4>
              <ul className="text-green-700 space-y-1 text-sm">
                <li>• Cálculo simples e previsível</li>
                <li>• Sem necessidade de guardar faturas</li>
                <li>• Ideal para propriedades com baixas despesas</li>
                <li>• Pagamento antecipado opcional</li>
                <li>• Não varia com outros rendimentos</li>
              </ul>
            </div>

            <div className="border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2">❌ Desvantagens</h4>
              <ul className="text-red-700 space-y-1 text-sm">
                <li>• Sem dedução de despesas reais</li>
                <li>• Pode ser mais caro em propriedades antigas</li>
                <li>• Não beneficia de deduções fiscais</li>
                <li>• Taxa fixa independente de lucro real</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Quando é Vantajoso Escolher a Taxa de 10%?
          </h2>

          <p>
            A <strong>taxa de 10% sobre rendas em Portugal</strong> é mais vantajosa em situações específicas:
          </p>

          <div className="space-y-6 my-8">
            <div className="bg-brand-50 border border-brand-200 rounded-lg p-6">
              <h3 className="font-semibold text-brand-900 mb-3">🏠 Propriedades Novas ou Bem Conservadas</h3>
              <p className="text-brand-800">
                Imóveis com poucas despesas de manutenção, onde as despesas dedutíveis são inferiores a 35% das rendas brutas.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="font-semibold text-purple-900 mb-3">💼 Senhorios com Altos Rendimentos</h3>
              <p className="text-purple-800">
                Contribuintes em escalões de IRS altos (acima de 37%), onde a taxa de 10% é inferior à taxa marginal.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-3">📋 Preferência por Simplicidade</h3>
              <p className="text-green-800">
                Senhorios que preferem não manter contabilidade detalhada ou guardar faturas de despesas.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Exemplos Práticos de Cálculo
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Exemplo 1: Apartamento T2 no Porto
          </h3>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-6">
            <div className="space-y-3">
              <p><strong>Situação:</strong> Renda de €750/mês, propriedade nova</p>
              <p><strong>Rendas anuais:</strong> €750 × 12 = €9.000</p>
              <p><strong>Despesas estimadas:</strong> €1.500/ano (16% das rendas)</p>

              <div className="mt-4 pt-4 border-t border-gray-300">
                <p className="font-semibold text-gray-800">Comparação de Regimes:</p>
                <div className="grid md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm font-medium text-brand-700">Taxa 10%:</p>
                    <p className="text-lg font-bold text-brand-800">€900</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Simplificado (35% ded.):</p>
                    <p className="text-lg font-bold text-gray-800">€1.350*</p>
                    <p className="text-xs text-gray-600">*assumindo escalão 23%</p>
                  </div>
                </div>
                <p className="text-sm text-green-700 font-medium mt-2">
                  ✅ Poupança com taxa 10%: €450/ano
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Exemplo 2: Moradia Antiga em Lisboa
          </h3>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-6">
            <div className="space-y-3">
              <p><strong>Situação:</strong> Renda de €1.200/mês, muitas reparações</p>
              <p><strong>Rendas anuais:</strong> €1.200 × 12 = €14.400</p>
              <p><strong>Despesas reais:</strong> €6.000/ano (41% das rendas)</p>

              <div className="mt-4 pt-4 border-t border-gray-300">
                <p className="font-semibold text-gray-800">Comparação de Regimes:</p>
                <div className="grid md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm font-medium text-brand-700">Taxa 10%:</p>
                    <p className="text-lg font-bold text-brand-800">€1.440</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Contab. Organizada:</p>
                    <p className="text-lg font-bold text-gray-800">€1.036*</p>
                    <p className="text-xs text-gray-600">*assumindo escalão 45%</p>
                  </div>
                </div>
                <p className="text-sm text-red-700 font-medium mt-2">
                  ❌ Taxa 10% menos vantajosa: +€404/ano
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Como Optar pela Taxa de 10% em 2026
          </h2>

          <p>
            Para aplicar o <strong>imposto de 10% sobre rendas em Portugal</strong>, deve:
          </p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 my-6">
            <h3 className="font-semibold text-yellow-800 mb-3">📋 Passos para Optar</h3>
            <ol className="space-y-2 text-yellow-800">
              <li><strong>1.</strong> Comunicar a opção no Portal das Finanças</li>
              <li><strong>2.</strong> Entregar o Anexo F do IRS até 31 de março</li>
              <li><strong>3.</strong> Emitir recibos verdes mensais com taxa de 10%</li>
              <li><strong>4.</strong> Pagar IRS por conta (se aplicável)</li>
            </ol>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Prazos Importantes para 2026
          </h3>

          <ul className="space-y-2 my-4">
            <li><strong>31 de março 2026:</strong> Entrega do IRS com Anexo F</li>
            <li><strong>Até dia 20 de cada mês:</strong> Emissão de recibos verdes</li>
            <li><strong>31 de julho e 15 de setembro:</strong> Pagamentos por conta (se aplicável)</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Perguntas Frequentes sobre o Imposto 10%
          </h2>

          <div className="space-y-6 my-8">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-2">
                ❓ Posso mudar de regime fiscal durante o ano?
              </h3>
              <p className="text-gray-700">
                Não. A opção pelo imposto de 10% ou outro regime fiscal deve ser mantida durante todo o ano fiscal.
                Só pode alterar na declaração do ano seguinte.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-2">
                ❓ O imposto de 10% aplica-se a rendas comerciais?
              </h3>
              <p className="text-gray-700">
                Sim, a taxa de 10% pode ser aplicada tanto a arrendamento habitacional como comercial.
                No entanto, deve avaliar se é a opção mais vantajosa para cada caso.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-2">
                ❓ Preciso de emitir faturas com taxa de 10%?
              </h3>
              <p className="text-gray-700">
                Sim, deve emitir recibos verdes mensais através do Portal das Finanças, indicando a taxa
                de retenção de 10% sobre o valor das rendas.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-2">
                ❓ A taxa de 10% é definitiva?
              </h3>
              <p className="text-gray-700">
                Sim, quando opta pela taxa liberatória de 10%, esta é a taxa final de imposto.
                Não há acerto adicional na declaração de IRS.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-brand-50 to-brand-100 border border-brand-200 rounded-xl p-8 my-12 text-center">
            <h2 className="text-2xl font-bold text-brand-900 mb-4">
              💡 Calcule o Seu Imposto de Rendas
            </h2>
            <p className="text-brand-800 mb-6">
              Use a nossa calculadora gratuita para comparar todos os regimes fiscais e descobrir
              qual é mais vantajoso para a sua situação.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/calculadora"
                className="px-8 py-4 bg-brand-600 text-white rounded-lg font-semibold hover:bg-brand-700 transition inline-flex items-center justify-center"
              >
                🧮 Calculadora Fiscal Gratuita
              </Link>
              <Link
                href="/calculadora-rendas"
                className="px-8 py-4 border-2 border-brand-600 text-brand-600 rounded-lg font-semibold hover:bg-brand-50 transition inline-flex items-center justify-center"
              >
                📈 Calculadora de Rendas
              </Link>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Conclusão: Vale a Pena o Imposto de 10%?
          </h2>

          <p>
            O <strong>imposto de 10% sobre rendas em Portugal</strong> pode ser uma excelente opção para senhorios que:
          </p>

          <ul className="my-4 space-y-2">
            <li>✅ Têm propriedades com baixas despesas de manutenção</li>
            <li>✅ Preferem simplicidade administrativa</li>
            <li>✅ Estão em escalões de IRS elevados</li>
            <li>✅ Não querem manter contabilidade detalhada</li>
          </ul>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 my-6">
            <p className="text-orange-800">
              <strong>⚠️ Importante:</strong> Antes de optar pela taxa de 10%, faça sempre uma simulação
              comparativa com os outros regimes. A melhor opção depende das suas circunstâncias específicas.
            </p>
          </div>

          <p>
            <strong>Recomendação:</strong> Use a nossa <Link href="/calculadora" className="text-brand-600 hover:text-brand-800 underline">calculadora fiscal gratuita</Link> para
            comparar todos os regimes e tomar uma decisão informada sobre o seu imposto de rendas em 2026.
          </p>

          {/* Related Articles */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              📚 Artigos Relacionados
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/blog/irs-arrendamento-2026-nova-taxa-10-porcento" className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                <h4 className="font-semibold text-gray-800 mb-2">IRS Arrendamento 2026: Nova Taxa de 10%</h4>
                <p className="text-sm text-gray-600">Descubra as mudanças fiscais para senhorios em 2026</p>
              </Link>
              <Link href="/blog/como-calcular-atualizacoes-renda-2026" className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                <h4 className="font-semibold text-gray-800 mb-2">Como Calcular Atualizações de Renda 2026</h4>
                <p className="text-sm text-gray-600">Coeficiente INE de 2,24% e regras do NRAU</p>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}