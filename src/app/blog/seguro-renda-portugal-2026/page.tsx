import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seguro de Renda em Portugal 2026: Vale a Pena? | Senhorio",
  description: "Guia completo sobre seguro de renda em Portugal. Como funciona, o que cobre, quanto custa, quando compensa e como deduzir no IRS. Com comparação de coberturas.",
  keywords: [
    "seguro de renda portugal",
    "seguro renda não pagamento",
    "seguro arrendamento portugal 2026",
    "seguro renda garantida portugal",
    "proteção renda senhorio",
    "seguro inquilino não paga",
    "seguro renda fidelidade",
    "seguro arrendamento vale a pena",
    "proteção rendas portugal",
    "despesas seguro arrendamento irs",
    "seguro habitação arrendamento",
    "coberturas seguro renda",
  ],
  openGraph: {
    title: "Seguro de Renda em Portugal 2026: Como Funciona e Vale a Pena?",
    description: "O seguro de renda cobre o não pagamento pelo inquilino, custos legais e danos. Saiba quanto custa, o que cobre e quando compensa para o seu imóvel.",
    type: "article",
    publishedTime: "2026-04-09T10:00:00.000Z",
  },
  alternates: {
    canonical: "https://senhorio.vercel.app/blog/seguro-renda-portugal-2026",
  },
};

export default function SeguroRendaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-700 transition">
            ← Voltar ao Blog
          </Link>
        </div>
      </header>

      {/* Article */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <article>
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">
                Proteção Financeira
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">
                Guia Prático
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
                Senhorios 2026
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Seguro de Renda em Portugal 2026: Como Funciona e Vale a Pena?
            </h1>

            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              O seguro de renda protege o senhorio quando o inquilino não paga — cobre os meses
              em falta, custos legais e, em alguns casos, danos no imóvel. Mas tem um custo.
              Este guia explica o que cobre, quanto custa e quando realmente compensa.
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500 border-l-4 border-green-500 pl-4">
              <time dateTime="2026-04-09T10:00:00.000Z">
                9 de abril de 2026
              </time>
              <span>•</span>
              <span>11 minutos de leitura</span>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-gray prose-lg max-w-none">
            {/* Waitlist CTA */}
            <div className="not-prose bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                Controle pagamentos e detete atrasos antes de serem um problema
              </h3>
              <p className="text-green-700 mb-4">
                O Senhorio regista cada pagamento e avisa-o quando uma renda está em atraso —
                para agir cedo, antes de precisar do seguro.
              </p>
              <Link
                href="/#waitlist"
                className="inline-flex items-center px-4 py-2 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition"
              >
                Entrar na Lista de Espera →
              </Link>
            </div>

            {/* Table of Contents */}
            <nav className="not-prose bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Índice</h3>
              <ol className="space-y-2 text-sm">
                <li><a href="#o-que-e" className="text-blue-600 hover:text-blue-800">1. O que é o seguro de renda</a></li>
                <li><a href="#coberturas" className="text-blue-600 hover:text-blue-800">2. O que cobre (e o que não cobre)</a></li>
                <li><a href="#custo" className="text-blue-600 hover:text-blue-800">3. Quanto custa em Portugal</a></li>
                <li><a href="#quando-compensa" className="text-blue-600 hover:text-blue-800">4. Quando compensa contratar</a></li>
                <li><a href="#como-funciona" className="text-blue-600 hover:text-blue-800">5. Como funciona na prática</a></li>
                <li><a href="#irs" className="text-blue-600 hover:text-blue-800">6. Dedução no IRS</a></li>
                <li><a href="#alternativas" className="text-blue-600 hover:text-blue-800">7. Alternativas ao seguro de renda</a></li>
                <li><a href="#faq" className="text-blue-600 hover:text-blue-800">8. Perguntas frequentes</a></li>
              </ol>
            </nav>

            <h2 id="o-que-e">1. O que é o seguro de renda</h2>

            <p>
              O <strong>seguro de renda</strong> — também chamado seguro de renda garantida ou
              seguro de proteção de arrendamento — é um produto de seguro que protege o senhorio
              contra o não pagamento da renda pelo inquilino.
            </p>

            <p>
              Em Portugal, este tipo de seguro é relativamente recente. Ganhou relevância após
              a crise financeira de 2008-2014 e voltou a ganhar procura com a instabilidade
              económica e o aumento dos processos de despejo. As principais seguradoras portuguesas
              — Fidelidade, Tranquilidade, Allianz, Generali e outros mediadores especializados
              — oferecem produtos nesta categoria.
            </p>

            <p>
              O produto funciona como qualquer seguro: o senhorio paga um prémio anual (calculado
              como percentagem da renda) e, em caso de não pagamento pelo inquilino, a seguradora
              paga as rendas em falta até ao limite da apólice.
            </p>

            <h2 id="coberturas">2. O que cobre (e o que não cobre)</h2>

            <p>
              As coberturas variam consoante a seguradora e o plano contratado. Em geral,
              os produtos portugueses de seguro de renda cobrem:
            </p>

            <h3>Coberturas habituais</h3>

            <div className="not-prose overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="px-4 py-3 text-left font-semibold">Cobertura</th>
                    <th className="px-4 py-3 text-left font-semibold">Detalhe típico</th>
                    <th className="px-4 py-3 text-center font-semibold">Incluída</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Rendas em falta", "3 a 12 meses, conforme plano", "✓ Sempre"],
                    ["Custos legais de despejo (BALP / Tribunal)", "Honorários de advogado e custas", "✓ Em muitos planos"],
                    ["Danos no imóvel causados pelo inquilino", "Com limite máximo (ex: 3.000€)", "✓ Em planos premium"],
                    ["Obras de recuperação pós-despejo", "Com peritagem prévia", "Raramente"],
                    ["Renda durante obras pós-despejo", "Período limitado", "Raramente"],
                    ["Franchises (período de carência)", "Geralmente 1-3 meses iniciais", "⚠ Excluídas"],
                  ].map(([cobertura, detalhe, incluida], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="border border-gray-200 px-4 py-3 font-medium text-gray-800">{cobertura}</td>
                      <td className="border border-gray-200 px-4 py-3 text-gray-600 text-sm">{detalhe}</td>
                      <td className="border border-gray-200 px-4 py-3 text-center font-medium text-gray-700">{incluida}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3>O que geralmente não está coberto</h3>

            <ul>
              <li><strong>Atrasos inferiores ao período de carência</strong> (normalmente o seguro só ativa ao 2.º ou 3.º mês de não pagamento)</li>
              <li><strong>Imóveis sem contrato de arrendamento formalizado</strong> e registado na AT</li>
              <li><strong>Inquilinos sem avaliação de risco prévia</strong> aprovada pela seguradora</li>
              <li><strong>Rendas de contratos já em incumprimento</strong> à data da contratação do seguro</li>
              <li><strong>Danos de desgaste normal</strong> — apenas danos intencionais ou negligentes</li>
              <li><strong>Rendas que excedem o limite máximo da apólice</strong></li>
            </ul>

            <div className="not-prose bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
              <p className="text-amber-900 font-semibold mb-2">Ponto crítico: avaliação do inquilino</p>
              <p className="text-amber-800 text-sm">
                A maioria das seguradoras exige aprovação do perfil do inquilino antes de aceitar
                a apólice. Se o inquilino não passar na avaliação de risco (histórico de incumprimento,
                rendimentos insuficientes), o seguro pode ser recusado ou ter um prémio mais alto.
                Contrate antes de assinar o contrato de arrendamento.
              </p>
            </div>

            <h2 id="custo">3. Quanto custa em Portugal</h2>

            <p>
              O prémio do seguro de renda é calculado como percentagem da renda mensal ou anual.
              Em Portugal, os valores situam-se tipicamente entre <strong>2% e 5% da renda anual</strong>,
              dependendo do plano e do perfil de risco do inquilino.
            </p>

            <h3>Exemplo de cálculo de custo</h3>

            <div className="not-prose bg-gray-50 rounded-xl p-6 my-6">
              <p className="text-gray-900 font-semibold mb-4">Imóvel com renda de 800€/mês</p>
              <div className="space-y-3">
                {[
                  { plano: "Cobertura básica (3 meses + custas legais)", taxa: "2%", custo_anual: "192€", custo_mensal: "16€" },
                  { plano: "Cobertura intermédia (6 meses + custas + danos)", taxa: "3%", custo_anual: "288€", custo_mensal: "24€" },
                  { plano: "Cobertura alargada (12 meses + custas + danos)", taxa: "4,5%", custo_anual: "432€", custo_mensal: "36€" },
                ].map((row, i) => (
                  <div key={i} className="flex flex-wrap items-center justify-between gap-2 py-3 border-b border-gray-200 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{row.plano}</p>
                      <p className="text-xs text-gray-500">Taxa: {row.taxa} da renda anual</p>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-bold text-gray-900">{row.custo_anual}/ano</p>
                      <p className="text-xs text-gray-500">{row.custo_mensal}/mês</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">
                * Valores indicativos. O prémio real depende da seguradora, perfil do inquilino e coberturas escolhidas.
              </p>
            </div>

            <p>
              Para rendas mais altas — acima de €1.500/mês — algumas seguradoras aplicam taxas
              ligeiramente menores ou oferecem planos corporativos para senhorios com múltiplos
              imóveis. Vale a pena negociar se tiver mais de 2 ou 3 imóveis arrendados.
            </p>

            <h2 id="quando-compensa">4. Quando compensa contratar</h2>

            <p>
              A pergunta que todo o senhorio faz é: <em>vale a pena pagar 2-5% da renda por ano
              para me proteger?</em> A resposta depende de vários fatores.
            </p>

            <h3>O seguro de renda compensa mais quando:</h3>

            <ul>
              <li>
                <strong>A renda representa uma parcela significativa do seu rendimento</strong>: se depende
                das rendas para pagar a hipoteca do imóvel, 1-2 meses sem receber pode ser
                financeiramente crítico.
              </li>
              <li>
                <strong>Tem novo inquilino sem histórico</strong>: o risco é maior nos primeiros
                2-3 anos de contrato. Após esse período, pode reavaliar.
              </li>
              <li>
                <strong>O inquilino tem rendimentos variáveis</strong> (trabalhador independente,
                temporário, ou recibo verde) — menor estabilidade de rendimentos.
              </li>
              <li>
                <strong>Não tem reserva financeira para absorver 3-4 meses sem renda</strong>:
                o custo do seguro é menor do que o stress de um processo de despejo sem almofada.
              </li>
              <li>
                <strong>O imóvel tem renda acima da média local</strong>: um imóvel de €1.200/mês
                representa um risco maior a descoberto do que um de €500/mês.
              </li>
            </ul>

            <h3>O seguro de renda pode não compensar quando:</h3>

            <ul>
              <li>
                <strong>Tem inquilino de longa data e histórico impecável</strong>: 10 anos sem
                atrasos é um sinal forte. O prémio acumulado ao longo do tempo pode superar
                os riscos reais.
              </li>
              <li>
                <strong>Tem reserva financeira suficiente</strong>: se pode absorver facilmente
                6 meses sem renda, o seguro é menos urgente.
              </li>
              <li>
                <strong>O perfil do inquilino não passa na avaliação</strong>: ironicamente, o
                seguro é mais caro ou recusado nos casos de maior risco.
              </li>
            </ul>

            <h3>Exercício de break-even</h3>

            <p>
              Com um custo de 3% da renda anual, o break-even é atingido se o inquilino não
              pagar durante aproximadamente <strong>11 dias por ano</strong> (3% × 365 dias ≈ 11 dias).
              Isso significa que basta um incumprimento de 2 semanas no ano para o seguro
              "pagar-se a si próprio" — sem contar os custos legais que também cobre.
            </p>

            <h2 id="como-funciona">5. Como funciona na prática</h2>

            <h3>Ativação do seguro</h3>

            <ol>
              <li>
                <strong>Período de carência</strong>: o seguro tipicamente não ativa no 1.º mês
                de incumprimento. Só a partir do 2.º ou 3.º mês sem pagamento é que pode
                acionar a cobertura.
              </li>
              <li>
                <strong>Participação do sinistro</strong>: o senhorio contacta a seguradora com
                documentação do incumprimento (contrato de arrendamento, comprovativo de não
                pagamento, comunicação ao inquilino).
              </li>
              <li>
                <strong>Pagamento de rendas</strong>: a seguradora começa a pagar as rendas em
                falta, geralmente dentro de 30 dias da participação aprovada.
              </li>
              <li>
                <strong>Processo legal paralelo</strong>: a seguradora costuma assumir os custos
                legais do despejo se o inquilino permanecer no imóvel.
              </li>
              <li>
                <strong>Recuperação da seguradora</strong>: após o despejo, a seguradora pode
                tentar recuperar os valores junto do ex-inquilino (sub-rogação).
              </li>
            </ol>

            <h3>Documentação necessária</h3>

            <ul>
              <li>Contrato de arrendamento registado na AT</li>
              <li>Comprovativos de pagamento até ao incumprimento</li>
              <li>Notificações enviadas ao inquilino</li>
              <li>Comprovativo de propriedade (caderneta predial)</li>
            </ul>

            <h2 id="irs">6. Dedução no IRS</h2>

            <p>
              O prémio do seguro de renda é <strong>fiscalmente dedutível no IRS</strong> como
              despesa de arrendamento, tal como os seguros de incêndio e habitação relacionados
              com imóveis arrendados.
            </p>

            <p>
              Para deduzir, o seguro deve:
            </p>

            <ul>
              <li>Estar associado ao imóvel que está arrendado</li>
              <li>Ser pago pelo senhorio e faturado em seu nome</li>
              <li>Constar na apólice a identificação do imóvel</li>
            </ul>

            <p>
              O valor dedutível reduz o rendimento bruto de categoria F (rendas) no Anexo F da
              declaração de IRS. Com a nova taxa autónoma de 10% (para rendas ≤€2.300/mês),
              cada euro de despesa deduzida vale 10 cêntimos de imposto poupado — ou 25 cêntimos
              se estiver no regime geral.
            </p>

            <div className="not-prose bg-blue-50 border border-blue-200 rounded-xl p-5 my-6">
              <p className="text-blue-900 font-semibold mb-2">Exemplo de poupança fiscal</p>
              <p className="text-blue-800 text-sm">
                Com renda de 800€/mês e prémio de seguro de 288€/ano, a poupança fiscal
                no regime de taxa autónoma de 25% é de 72€ (25% × 288€). Ou seja, o custo
                líquido do seguro é de 216€/ano — 18€/mês.
              </p>
            </div>

            <h2 id="alternativas">7. Alternativas ao seguro de renda</h2>

            <p>
              O seguro de renda não é a única forma de se proteger. Considere também:
            </p>

            <h3>Caução reforçada</h3>

            <p>
              A lei permite uma caução de até 2 meses de renda (em contratos habitacionais).
              Alguns senhorios negoceiam cauções mais altas no contexto de contratos de prazo
              inferior a 1 ano — mas este ponto deve ser verificado juridicamente caso a caso.
              A caução funciona como buffer imediato para cobrir incumprimentos curtos.
            </p>

            <h3>Fiador</h3>

            <p>
              Exigir um fiador solvente no contrato de arrendamento é uma das proteções mais
              fortes. O fiador responde pessoalmente pelas rendas em dívida, o que aumenta
              significativamente a probabilidade de recuperação dos valores. Verifique sempre
              a solvência do fiador — um fiador insolvente não vale o papel em que está escrito.
            </p>

            <h3>Seleção criteriosa do inquilino</h3>

            <p>
              A melhor proteção começa antes de assinar o contrato. Pedir comprovativos de
              rendimento (recibos de vencimento dos últimos 3 meses, declaração de IRS),
              verificar referências anteriores, e calcular se a renda representa mais de 30%
              do rendimento líquido do candidato são passos que reduzem o risco de incumprimento.
            </p>

            <h3>Fundo de reserva pessoal</h3>

            <p>
              Senhorios com múltiplos imóveis ou com reservas financeiras confortáveis podem
              optar por autoassurar-se — manter uma reserva equivalente a 3-6 meses de renda
              por imóvel, em vez de pagar prémios de seguro. Este modelo resulta bem quando
              o historial de incumprimento é baixo.
            </p>

            <h2 id="faq">8. Perguntas frequentes</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Posso contratar o seguro de renda depois de o inquilino já ter deixado de pagar?
                </h3>
                <p className="text-gray-700">
                  Não. Como qualquer seguro, não pode ser contratado após o sinistro. A apólice
                  deve ser contratada antes de qualquer incumprimento — idealmente antes ou na
                  data de início do contrato de arrendamento.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  O seguro de renda cobre sempre os 12 meses em falta?
                </h3>
                <p className="text-gray-700">
                  Depende do plano. A cobertura básica costuma ser de 3 meses; planos intermédios
                  cobrem 6 meses; os mais completos chegam a 12 meses. Mas em Portugal, os processos
                  de despejo através do BALP demoram frequentemente 4 a 8 meses. Um plano de
                  cobertura mínima de 6 meses é o recomendável para a realidade portuguesa.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  O seguro paga mesmo que o inquilino fique no imóvel sem pagar?
                </h3>
                <p className="text-gray-700">
                  Sim — desde que o processo de despejo esteja em curso. A seguradora paga as
                  rendas em falta enquanto o processo legal decorre. Alguns planos assumem
                  também os custos do processo de despejo (advogado, BALP, tribunal).
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Posso mudar de seguradora a meio do contrato de arrendamento?
                </h3>
                <p className="text-gray-700">
                  Sim, mas a nova seguradora vai exigir uma nova avaliação do risco — incluindo
                  a situação atual do inquilino. Se o inquilino já tem atrasos, pode ser difícil
                  conseguir cobertura noutra seguradora. Reavaliar o seguro é melhor fazer na
                  renovação da apólice.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Preciso de seguro de renda se já tenho fiador?
                </h3>
                <p className="text-gray-700">
                  Não necessariamente. Um fiador solvente e comprometido por escrito no contrato
                  oferece proteção equivalente ou superior. O problema é que acionar um fiador
                  também tem custos legais e pode danificar relações pessoais. O seguro é mais
                  "neutro" e tem processos mais rápidos de ativação.
                </p>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="not-prose mt-12 bg-indigo-600 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-3">
                Acompanhe pagamentos e detete problemas antes de escalar
              </h2>
              <p className="text-indigo-100 mb-6 max-w-xl mx-auto">
                O Senhorio regista cada renda recebida, alerta para atrasos e mantém o histórico
                de pagamentos que precisa de apresentar à seguradora.
              </p>
              <Link
                href="/#waitlist"
                className="inline-flex items-center px-6 py-3 bg-white text-indigo-700 rounded-xl font-semibold hover:bg-indigo-50 transition text-lg"
              >
                Entrar na Lista de Espera →
              </Link>
            </div>

            {/* Related content */}
            <div className="not-prose mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Artigos relacionados</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <Link href="/blog/inquilino-nao-paga-renda-o-que-fazer" className="block p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
                  <p className="font-medium text-gray-900 mb-1">Inquilino Não Paga Renda</p>
                  <p className="text-sm text-gray-600">Procedimento legal passo a passo</p>
                </Link>
                <Link href="/blog/caucao-arrendamento-2026" className="block p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
                  <p className="font-medium text-gray-900 mb-1">Caução no Arrendamento</p>
                  <p className="text-sm text-gray-600">Montante máximo, regras e devolução</p>
                </Link>
                <Link href="/blog/despesas-dedutiveis-arrendamento-2026" className="block p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
                  <p className="font-medium text-gray-900 mb-1">Despesas Dedutíveis</p>
                  <p className="text-sm text-gray-600">O que declarar no Anexo F do IRS</p>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
