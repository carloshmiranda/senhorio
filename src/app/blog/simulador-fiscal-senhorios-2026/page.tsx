import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulador Fiscal para Senhorios 2026: Calculadora de Impostos Grátis | Senhorio",
  description: "Simulador fiscal grátis para senhorios portugueses. Compare os 4 regimes fiscais, calcule IRS, simule poupanças e otimize impostos com ferramentas automáticas para 2026.",
  keywords: [
    "simulador fiscal senhorio",
    "calculadora impostos arrendamento",
    "simulador IRS senhorios",
    "calculadora fiscal portugal",
    "simulador impostos propriedades",
    "calculadora senhorios 2026",
    "simulador IRS arrendamento",
    "calculadora impostos rendas"
  ].join(", "),
  openGraph: {
    title: "Simulador Fiscal para Senhorios 2026: Calculadora de Impostos Grátis",
    description: "Simulador fiscal grátis para senhorios portugueses. Compare os 4 regimes fiscais e otimize impostos com ferramentas automáticas.",
    type: "article",
    publishedTime: "2026-03-23",
  },
  alternates: {
    canonical: "https://senhorio.vercel.app/blog/simulador-fiscal-senhorios-2026"
  }
};

export default function SimuladorFiscalSenhoriosPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-700 transition">
            ← Voltar ao Blog
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">
            Simulador Fiscal para Senhorios 2026: Calculadora de Impostos Grátis
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500 mt-4">
            <time dateTime="2026-03-23">23 de março de 2026</time>
            <span>•</span>
            <span>14 min leitura</span>
            <span>•</span>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-brand-100 text-brand-600 text-xs rounded">Simulador Fiscal</span>
              <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded">Calculadora Grátis</span>
              <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded">Guia 2026</span>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-gray max-w-none">

          {/* Introduction */}
          <div className="bg-brand-50 border border-brand-200 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-brand-900 mb-3">🎯 TL;DR - Simulador Fiscal Rápido</h2>
            <p className="text-brand-800 mb-4">
              Precisa de calcular impostos sobre rendas rapidamente? Use o nosso <strong>simulador fiscal gratuito</strong>
              que compara automaticamente os 4 regimes fiscais portugueses e mostra qual é mais vantajoso para si.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/calculadora"
                className="inline-block px-6 py-3 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition text-center"
              >
                🧮 Abrir Simulador Fiscal
              </Link>
              <Link
                href="/calculadora-rendas"
                className="inline-block px-6 py-3 border border-brand-300 text-brand-700 rounded-lg font-medium hover:bg-brand-50 transition text-center"
              >
                📈 Calculadora de Rendas
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Por Que Precisa de um Simulador Fiscal?
              </h2>
              <p className="text-gray-700 mb-4">
                Como senhorio em Portugal, tem <strong>4 regimes fiscais diferentes</strong> para escolher.
                A diferença entre escolher o regime certo ou errado pode significar <strong>centenas ou milhares
                de euros por ano</strong> em impostos desnecessários.
              </p>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Problema Comum</h3>
                <p className="text-yellow-700 text-sm">
                  Muitos senhorios ficam no regime geral (IRS englobamento) por desconhecimento,
                  pagando impostos a mais quando poderiam optar pela taxa liberatória de <strong>28% ou até 10%</strong> em 2026.
                </p>
              </div>

              <p className="text-gray-700">
                Um <strong>simulador fiscal para senhorios</strong> resolve este problema ao:
              </p>

              <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
                <li>Calcular impostos nos 4 regimes automaticamente</li>
                <li>Mostrar qual regime poupa mais dinheiro</li>
                <li>Incluir deduções e despesas específicas</li>
                <li>Considerar a sua situação fiscal global (outros rendimentos, estado civil)</li>
                <li>Atualizar com as regras fiscais de 2026</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Os 4 Regimes Fiscais que o Simulador Compara
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="border border-gray-200 rounded-lg p-5">
                  <h3 className="font-semibold text-gray-900 mb-3">1. IRS Englobamento (Regime Geral)</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Rendas somadas aos outros rendimentos, tributadas pelas taxas progressivas do IRS (14.5% a 48%).
                  </p>
                  <div className="text-sm">
                    <span className="font-medium text-green-600">Vantagens:</span>
                    <ul className="text-gray-600 mt-1 space-y-1">
                      <li>• Dedução de todas as despesas comprovadas</li>
                      <li>• Beneficia quem tem poucos outros rendimentos</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-brand-200 rounded-lg p-5 bg-brand-50">
                  <h3 className="font-semibold text-brand-900 mb-3">2. Taxa Liberatória 28%</h3>
                  <p className="text-brand-700 text-sm mb-3">
                    Taxa fixa de 28% sobre as rendas brutas, sem englobar com outros rendimentos.
                  </p>
                  <div className="text-sm">
                    <span className="font-medium text-green-600">Vantagens:</span>
                    <ul className="text-brand-700 mt-1 space-y-1">
                      <li>• Taxa fixa, fácil de calcular</li>
                      <li>• Não influencia escalões de IRS</li>
                      <li>• Boa para rendimentos médios/altos</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-green-200 rounded-lg p-5 bg-green-50">
                  <h3 className="font-semibold text-green-900 mb-3">3. Taxa Liberatória 10% (NOVO 2026)</h3>
                  <p className="text-green-700 text-sm mb-3">
                    <strong>Novidade 2026:</strong> Taxa de apenas 10% para contratos novos ou renovados, com condições específicas.
                  </p>
                  <div className="text-sm">
                    <span className="font-medium text-green-600">Condições:</span>
                    <ul className="text-green-700 mt-1 space-y-1">
                      <li>• Contrato celebrado/renovado em 2026</li>
                      <li>• Arrendatário com escalão até €760/mês</li>
                      <li>• Cumprimento de requisitos específicos</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-purple-200 rounded-lg p-5 bg-purple-50">
                  <h3 className="font-semibold text-purple-900 mb-3">4. Regime Simplificado</h3>
                  <p className="text-purple-700 text-sm mb-3">
                    Dedução automática de 65% das rendas como despesas, tributando apenas 35% no IRS.
                  </p>
                  <div className="text-sm">
                    <span className="font-medium text-green-600">Vantagens:</span>
                    <ul className="text-purple-700 mt-1 space-y-1">
                      <li>• Não precisa guardar faturas</li>
                      <li>• Dedução automática generosa</li>
                      <li>• Bom para quem tem poucas despesas</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">🎯 Como o Simulador Ajuda</h3>
                <p className="text-gray-700 text-sm">
                  Em vez de calcular manualmente os 4 regimes (processo demorado e propenso a erros),
                  o simulador faz todos os cálculos automaticamente e mostra-lhe qual é mais vantajoso
                  para a sua situação específica.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Como Usar o Simulador Fiscal: Passo a Passo
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Aceda ao Simulador Fiscal</h3>
                    <p className="text-gray-700 mb-3">
                      Visite o <Link href="/calculadora" className="text-brand-600 hover:underline">simulador fiscal Senhorio</Link>
                      - é gratuito e não requer registo.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Insira os Dados das Rendas</h3>
                    <p className="text-gray-700 mb-3">
                      Introduza o valor mensal das suas rendas. Se tem várias propriedades, some todos os valores.
                    </p>
                    <div className="bg-brand-50 border border-brand-200 rounded p-3 text-sm">
                      <strong>Dica:</strong> Inclua rendas de garagens, lojas ou outros espaços arrendados.
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Configure a Sua Situação Fiscal</h3>
                    <p className="text-gray-700 mb-3">
                      Indique outros rendimentos (salários, pensões, etc.), estado civil e dependentes.
                      Isto é crucial para calcular o regime geral corretamente.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center font-semibold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Adicione Despesas (Opcional)</h3>
                    <p className="text-gray-700 mb-3">
                      Se tem despesas com a propriedade (condomínio, seguros, obras, IMI),
                      adicione-as para um cálculo mais preciso do regime geral.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Compare os Resultados</h3>
                    <p className="text-gray-700 mb-3">
                      O simulador mostra-lhe o imposto a pagar em cada regime, destacando
                      qual é mais vantajoso e quanto pode poupar.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Exemplos Práticos: Quanto Pode Poupar?
              </h2>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-5">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    📋 Exemplo 1: Jovem Casal com 1 Propriedade
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li><strong>Renda mensal:</strong> €800</li>
                      <li><strong>Outros rendimentos:</strong> €2.500/mês (ambos trabalham)</li>
                      <li><strong>Estado civil:</strong> Casados</li>
                      <li><strong>Despesas propriedade:</strong> €1.200/ano</li>
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-4 gap-3 text-sm">
                    <div className="bg-red-50 p-3 rounded">
                      <div className="font-medium text-red-800">IRS Geral</div>
                      <div className="text-red-600">€1.890/ano</div>
                    </div>
                    <div className="bg-brand-50 p-3 rounded">
                      <div className="font-medium text-brand-800">Taxa 28%</div>
                      <div className="text-brand-600">€2.688/ano</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded border border-green-300">
                      <div className="font-medium text-green-800">Taxa 10% ✅</div>
                      <div className="text-green-600">€960/ano</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded">
                      <div className="font-medium text-purple-800">Simplificado</div>
                      <div className="text-purple-600">€1.260/ano</div>
                    </div>
                  </div>

                  <p className="text-green-600 font-medium mt-3">
                    💰 Melhor regime: Taxa 10% - Poupança: €930/ano vs. IRS geral
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-5">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    📋 Exemplo 2: Reformado com 2 Propriedades
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li><strong>Renda mensal:</strong> €1.400 (€700 × 2 propriedades)</li>
                      <li><strong>Outros rendimentos:</strong> €800/mês (pensão)</li>
                      <li><strong>Estado civil:</strong> Solteiro</li>
                      <li><strong>Despesas propriedade:</strong> €3.500/ano</li>
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-4 gap-3 text-sm">
                    <div className="bg-green-50 p-3 rounded border border-green-300">
                      <div className="font-medium text-green-800">IRS Geral ✅</div>
                      <div className="text-green-600">€1.620/ano</div>
                    </div>
                    <div className="bg-brand-50 p-3 rounded">
                      <div className="font-medium text-brand-800">Taxa 28%</div>
                      <div className="text-brand-600">€4.704/ano</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="font-medium text-gray-600">Taxa 10%</div>
                      <div className="text-gray-500">Não qualifica</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded">
                      <div className="font-medium text-purple-800">Simplificado</div>
                      <div className="text-purple-600">€1.890/ano</div>
                    </div>
                  </div>

                  <p className="text-green-600 font-medium mt-3">
                    💰 Melhor regime: IRS Geral - Poupança: €270/ano vs. simplificado
                  </p>
                </div>
              </div>

              <div className="bg-brand-50 border border-brand-200 rounded-lg p-4">
                <h3 className="font-semibold text-brand-900 mb-2">🎯 Conclusão dos Exemplos</h3>
                <p className="text-brand-800 text-sm">
                  Como pode ver, o regime fiscal ótimo varia drasticamente consoante a situação.
                  O simulador elimina as dúvidas e garante que escolhe sempre a opção mais vantajosa.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Outras Calculadoras Úteis para Senhorios
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-5">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    📈 Calculadora de Atualizações de Renda
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Calcule aumentos de renda usando o coeficiente oficial do INE (2,24% em 2026).
                    Essencial para contratos NRAU e habitacionais.
                  </p>
                  <Link
                    href="/calculadora-rendas"
                    className="inline-block px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition"
                  >
                    Calcular Aumentos →
                  </Link>
                </div>

                <div className="border border-gray-200 rounded-lg p-5">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    🛡️ Calculadora de Isenção AIMI
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Verifique se qualifica para a isenção AIMI de 2026 (rendas ≤ €2.300/mês)
                    e calcule as suas poupanças potenciais.
                  </p>
                  <Link
                    href="/aimi"
                    className="inline-block px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition"
                  >
                    Verificar Isenção →
                  </Link>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Perguntas Frequentes sobre Simulador Fiscal
              </h2>

              <div className="space-y-4">
                <details className="border border-gray-200 rounded-lg">
                  <summary className="p-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-50">
                    O simulador fiscal é gratuito?
                  </summary>
                  <div className="px-4 pb-4 text-gray-700">
                    <p>Sim, o simulador fiscal Senhorio é completamente gratuito e não requer registo.
                    Pode usar quantas vezes precisar para diferentes cenários.</p>
                  </div>
                </details>

                <details className="border border-gray-200 rounded-lg">
                  <summary className="p-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-50">
                    Os resultados são juridicamente vinculativos?
                  </summary>
                  <div className="px-4 pb-4 text-gray-700">
                    <p>Não. O simulador fornece estimativas baseadas nas regras fiscais vigentes,
                    mas situações específicas podem ter nuances. Consulte sempre um contabilista
                    certificado para decisões finais.</p>
                  </div>
                </details>

                <details className="border border-gray-200 rounded-lg">
                  <summary className="p-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-50">
                    O simulador está atualizado com as regras de 2026?
                  </summary>
                  <div className="px-4 pb-4 text-gray-700">
                    <p>Sim, incluímos todas as novidades fiscais de 2026, incluindo a nova taxa
                    liberatória de 10%, atualizações nos escalões do IRS e novas isenções AIMI.</p>
                  </div>
                </details>

                <details className="border border-gray-200 rounded-lg">
                  <summary className="p-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-50">
                    Posso simular cenários com múltiplas propriedades?
                  </summary>
                  <div className="px-4 pb-4 text-gray-700">
                    <p>Sim, o simulador suporta múltiplas propriedades. Some todas as rendas
                    e despesas para obter o cálculo total dos seus impostos.</p>
                  </div>
                </details>

                <details className="border border-gray-200 rounded-lg">
                  <summary className="p-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-50">
                    Como sei se qualifica para a taxa de 10%?
                  </summary>
                  <div className="px-4 pb-4 text-gray-700">
                    <p>A taxa de 10% aplica-se a contratos celebrados ou renovados em 2026,
                    com arrendatários de escalão baixo (≤€760/mês). O simulador verifica
                    automaticamente esta elegibilidade.</p>
                  </div>
                </details>
              </div>
            </section>

          </div>

          {/* Call to Action */}
          <div className="mt-12 bg-gradient-to-r from-brand-50 to-green-50 border border-brand-200 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Pronto para Otimizar os Seus Impostos?
            </h2>
            <p className="text-gray-700 mb-6">
              Use o simulador fiscal gratuito agora e descubra quanto pode poupar
              em impostos escolhendo o regime fiscal correto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/calculadora"
                className="px-8 py-4 bg-brand-600 text-white rounded-lg font-semibold hover:bg-brand-700 transition"
              >
                🧮 Simular Impostos Agora
              </Link>
              <Link
                href="/#waitlist"
                className="px-8 py-4 border border-brand-300 text-brand-700 rounded-lg font-semibold hover:bg-brand-50 transition"
              >
                📧 Receber Dicas Fiscais
              </Link>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              💡 Junte-se a centenas de senhorios que já otimizaram os seus impostos
            </p>
          </div>

          {/* SEO Footer Content */}
          <div className="mt-12 prose prose-gray max-w-none text-sm text-gray-600">
            <h3 className="text-lg font-semibold text-gray-900">Sobre o Senhorio</h3>
            <p>
              O Senhorio é a plataforma portuguesa dedicada a senhorios, oferecendo ferramentas
              gratuitas como simuladores fiscais, calculadoras de rendas e guias sobre impostos.
              As nossas calculadoras estão sempre atualizadas com as regras fiscais mais recentes,
              incluindo as novidades de 2026 como a taxa liberatória de 10% e as novas isenções AIMI.
            </p>
          </div>

        </div>
      </article>
    </div>
  );
}