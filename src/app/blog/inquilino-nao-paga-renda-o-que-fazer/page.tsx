import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inquilino Não Paga Renda: O Que Fazer em 2026 | Senhorio",
  description: "Guia legal completo para senhorios quando o inquilino não paga renda em 2026. Notificação, procedimento de despejo, BALP, injunção e proteção dos seus direitos.",
  keywords: [
    "inquilino não paga renda",
    "o que fazer quando inquilino não paga",
    "despejo por falta de pagamento",
    "resolução contrato arrendamento falta pagamento",
    "renda em atraso portugal",
    "BALP despejo",
    "injunção arrendamento",
    "procedimento especial despejo",
  ],
  openGraph: {
    title: "Inquilino Não Paga Renda: O Que Fazer em 2026",
    description: "Guia legal passo a passo para senhorios com rendas em atraso. Notificação, BALP, despejo e como evitar problemas futuros.",
    type: "article",
    publishedTime: "2026-04-05T09:00:00.000Z",
  },
  alternates: {
    canonical: "https://senhorio.vercel.app/blog/inquilino-nao-paga-renda-o-que-fazer",
  },
};

export default function InquilinoNaoPagaRendaPage() {
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
              <span className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full font-medium">
                Renda em Atraso
              </span>
              <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm rounded-full font-medium">
                Guia Legal
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
                Arrendamento 2026
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Inquilino Não Paga Renda: O Que Fazer em 2026
            </h1>

            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              O atraso no pagamento da renda é um dos cenários mais temidos por qualquer senhorio.
              Este guia explica, passo a passo, o que a lei portuguesa permite fazer — da primeira
              notificação ao despejo — e como proteger os seus direitos sem cometer erros que
              podem virar-se contra si.
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500 border-l-4 border-red-500 pl-4">
              <time dateTime="2026-04-05T09:00:00.000Z">
                5 de abril de 2026
              </time>
              <span>•</span>
              <span>14 minutos de leitura</span>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-gray prose-lg max-w-none">
            {/* Waitlist CTA */}
            <div className="not-prose bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-amber-900 mb-2">
                Controle todos os pagamentos em atraso num só lugar
              </h3>
              <p className="text-amber-700 mb-4">
                O Senhorio regista automaticamente quais os inquilinos que pagaram, quando e quanto.
                Nunca mais perca o rasto de rendas em atraso.
              </p>
              <Link
                href="/#waitlist"
                className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition"
              >
                Entrar na Lista de Espera →
              </Link>
            </div>

            {/* Table of Contents */}
            <nav className="not-prose bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Índice</h3>
              <ol className="space-y-2 text-sm">
                <li><a href="#quando-comecar" className="text-blue-600 hover:text-blue-800">1. A partir de quando pode agir</a></li>
                <li><a href="#notificacao" className="text-blue-600 hover:text-blue-800">2. Primeiro passo: notificação escrita</a></li>
                <li><a href="#resolucao-contrato" className="text-blue-600 hover:text-blue-800">3. Resolução do contrato por falta de pagamento</a></li>
                <li><a href="#balp" className="text-blue-600 hover:text-blue-800">4. Balcão Nacional do Arrendamento (BALP)</a></li>
                <li><a href="#injuncao" className="text-blue-600 hover:text-blue-800">5. Injunção e ação judicial</a></li>
                <li><a href="#erros-comuns" className="text-blue-600 hover:text-blue-800">6. Erros que os senhorios cometem</a></li>
                <li><a href="#prevencao" className="text-blue-600 hover:text-blue-800">7. Como evitar problemas futuros</a></li>
                <li><a href="#faq" className="text-blue-600 hover:text-blue-800">8. Perguntas frequentes</a></li>
              </ol>
            </nav>

            <h2 id="quando-comecar">1. A partir de quando pode agir</h2>

            <p>
              Segundo o <strong>artigo 1083.º do Código Civil</strong> e as regras do NRAU (Novo
              Regime de Arrendamento Urbano), o senhorio pode resolver o contrato quando o inquilino
              se encontra em mora no pagamento da renda por um período igual ou superior a
              <strong> 2 meses</strong>.
            </p>

            <p>
              Isto significa que se a renda de fevereiro não foi paga e março chegou ao fim sem
              pagamento, está reunida a condição legal para iniciar o processo de resolução.
              Não espere mais — cada mês adicional representa dinheiro que dificilmente recuperará.
            </p>

            <div className="not-prose bg-red-50 border border-red-200 rounded-xl p-5 my-6">
              <p className="text-sm font-semibold text-red-800 mb-1">Atenção — não pode fazer por conta própria:</p>
              <p className="text-sm text-red-700">
                É ilegal cortar água, luz ou gás, trocar a fechadura, retirar bens do imóvel ou
                ameaçar o inquilino para o forçar a sair. Qualquer destas ações pode torná-lo
                responsável civil e criminalmente.
              </p>
            </div>

            <h2 id="notificacao">2. Primeiro passo: notificação escrita</h2>

            <p>
              Antes de recorrer a qualquer mecanismo legal, tem de notificar formalmente o inquilino.
              Esta notificação é um requisito obrigatório e deve ser feita por escrito.
            </p>

            <h3>Como notificar corretamente</h3>

            <p>
              A notificação deve ser enviada por <strong>carta registada com aviso de receção</strong>
              ou entregue pessoalmente com documento de confirmação. Um email, mensagem ou chamada
              telefónica não têm valor legal para este efeito.
            </p>

            <p>A carta deve incluir:</p>

            <ul>
              <li>Identificação do imóvel arrendado (morada completa)</li>
              <li>Referência ao contrato de arrendamento (data de celebração)</li>
              <li>Meses em atraso e os respetivos valores</li>
              <li>Prazo para regularização (habitualmente 8 dias úteis)</li>
              <li>Advertência de que o não pagamento levará à resolução do contrato</li>
            </ul>

            <h3>O inquilino pode purgar a mora</h3>

            <p>
              A lei portuguesa permite ao inquilino <strong>purgar a mora</strong> — ou seja,
              regularizar a dívida — até ao encerramento da audiência de julgamento, se pagar
              todas as rendas em atraso, juros de mora e custas. Se purgar a mora, o contrato
              mantém-se. O senhorio não pode recusar este pagamento.
            </p>

            <p>
              A purgação só pode ser usada uma vez em cada período de 12 meses. Se o inquilino
              já a utilizou anteriormente no mesmo ano, pode avançar para a resolução mesmo que
              pague agora.
            </p>

            <h2 id="resolucao-contrato">3. Resolução do contrato por falta de pagamento</h2>

            <p>
              Se o inquilino não regularizar a situação após a notificação, pode enviar a
              <strong> comunicação de resolução do contrato</strong>. Esta comunicação também deve
              ser feita por carta registada com aviso de receção.
            </p>

            <p>A comunicação de resolução deve conter:</p>

            <ul>
              <li>Declaração expressa de que está a resolver o contrato</li>
              <li>Fundamento legal (falta de pagamento — artigo 1083.º CC)</li>
              <li>Prazo para desocupação do imóvel (30 dias é o prazo habitual em contratos habitacionais)</li>
              <li>Montante total em dívida</li>
            </ul>

            <p>
              A partir da receção desta comunicação, o inquilino está em incumprimento do contrato.
              Se não sair voluntariamente, terá de recorrer ao BALP ou aos tribunais para obter
              a desocupação do imóvel.
            </p>

            <h2 id="balp">4. Balcão Nacional do Arrendamento (BALP)</h2>

            <p>
              O BALP é o mecanismo criado em 2012 (Decreto-Lei n.º 1/2013) precisamente para
              agilizar o despejo por falta de pagamento. É mais rápido do que a via judicial
              tradicional e tem custos mais baixos.
            </p>

            <h3>Quando pode usar o BALP</h3>

            <p>
              Pode recorrer ao BALP quando o inquilino não desocupa voluntariamente o imóvel
              após a resolução do contrato. Para usar o BALP, precisa de:
            </p>

            <ul>
              <li>Cópia do contrato de arrendamento (registado na AT)</li>
              <li>Comprovativos das comunicações enviadas ao inquilino</li>
              <li>Aviso de receção comprovando que o inquilino recebeu as notificações</li>
              <li>Certidão predial do imóvel</li>
            </ul>

            <h3>O que acontece depois de entregar o requerimento</h3>

            <p>
              O BALP notifica o inquilino e concede-lhe um prazo de 15 dias para contestar ou
              sair voluntariamente. Se o inquilino não contestar e não sair, o BALP emite um
              <strong> título de desocupação</strong> que permite a entrada imediata no imóvel com
              agente de execução. O processo, quando corre sem contestação, demora entre
              <strong> 3 a 6 semanas</strong>.
            </p>

            <p>
              Se o inquilino contestar com base em situação de especial vulnerabilidade
              (doença grave, menores a cargo, etc.), o processo transita para os tribunais
              e pode demorar consideravelmente mais.
            </p>

            <div className="not-prose bg-blue-50 border border-blue-200 rounded-xl p-5 my-6">
              <p className="text-sm font-semibold text-blue-800 mb-2">Custo do requerimento BALP</p>
              <p className="text-sm text-blue-700">
                A taxa de justiça para o procedimento especial de despejo no BALP é de <strong>102 €</strong>.
                Pode receber este valor de volta do inquilino se ganhar o processo — mas só se
                efetivamente o recuperar.
              </p>
            </div>

            <h2 id="injuncao">5. Injunção e ação judicial</h2>

            <p>
              Além do despejo, precisa de recuperar as rendas em atraso. Para isso, tem dois caminhos:
            </p>

            <h3>Injunção (valores até 15.000 €)</h3>

            <p>
              A injunção é um procedimento simplificado nos tribunais para cobrar dívidas não
              contestadas. Se a dívida total de rendas em atraso for inferior a 15.000 €, pode
              apresentar uma injunção nos Balcões de Injunção ou online em <em>citius.tribunaisnet.mj.pt</em>.
            </p>

            <p>
              Se o inquilino não contestar no prazo de 15 dias, a injunção torna-se automaticamente
              um título executivo — podendo penhorar salários, contas bancárias ou bens.
            </p>

            <h3>Ação judicial (valores superiores)</h3>

            <p>
              Para valores acima de 15.000 € ou em casos contestados, a ação de condenação no
              pagamento é a via adequada. Recomenda-se a assistência de um advogado, especialmente
              se o inquilino estiver a contestar ativamente.
            </p>

            <h2 id="erros-comuns">6. Erros que os senhorios cometem</h2>

            <p>
              Alguns erros muito comuns podem atrasar o processo ou prejudicar a sua posição legal:
            </p>

            <ul>
              <li>
                <strong>Continuar a aceitar pagamentos parciais</strong> sem reserva explícita
                — aceitar qualquer valor pode ser interpretado como aceitação tácita e interromper
                o prazo de mora.
              </li>
              <li>
                <strong>Não ter o contrato registado na AT</strong> — sem registo, não tem acesso
                ao BALP e fica dependente dos tribunais comuns.
              </li>
              <li>
                <strong>Enviar notificações por email ou WhatsApp</strong> — sem valor legal para
                iniciar o processo formal.
              </li>
              <li>
                <strong>Esperar meses antes de agir</strong> — cada mês de inação aumenta a dívida
                e reduz a probabilidade de a recuperar.
              </li>
              <li>
                <strong>Não guardar todos os comprovativos</strong> de rendas pagas (transferências,
                recibos) — são essenciais para provar exatamente quais os meses em atraso.
              </li>
            </ul>

            <h2 id="prevencao">7. Como evitar problemas futuros</h2>

            <p>
              A melhor forma de gerir rendas em atraso é evitar que cheguem a esse ponto.
              Algumas práticas que fazem diferença:
            </p>

            <h3>Antes de assinar o contrato</h3>

            <ul>
              <li>Peça garantias: fiador, depósito caução (até 2 meses de renda) ou seguro de renda</li>
              <li>Verifique referências do inquilino anterior</li>
              <li>Confirme a situação de crédito se possível</li>
            </ul>

            <h3>Durante o contrato</h3>

            <ul>
              <li>Defina um IBAN fixo para pagamento e peça débito direto sempre que possível</li>
              <li>Registe cada pagamento com data e valor — evita disputas sobre quais os meses em atraso</li>
              <li>Emita sempre recibos de renda eletrónicos no Portal das Finanças ou com uma ferramenta dedicada</li>
              <li>Aja cedo: um aviso informal logo no 1.º dia de atraso resolve 90% dos casos antes de se tornarem problemas reais</li>
            </ul>

            <div className="not-prose bg-emerald-50 border border-emerald-200 rounded-xl p-6 my-8">
              <h3 className="text-lg font-semibold text-emerald-900 mb-2">
                Registo automático de pagamentos com o Senhorio
              </h3>
              <p className="text-emerald-700 mb-4">
                O Senhorio regista cada pagamento recebido, assinala automaticamente rendas em atraso
                e guarda o histórico completo de cada inquilino. Sempre que precisar, tem a
                documentação pronta.
              </p>
              <Link
                href="/#waitlist"
                className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition"
              >
                Entrar na Lista de Espera →
              </Link>
            </div>

            <h2 id="faq">8. Perguntas frequentes</h2>

            <h3>Quantos meses em atraso são necessários para poder resolver o contrato?</h3>
            <p>
              A lei exige <strong>2 meses de mora</strong> para arrendamento habitacional. No
              arrendamento não habitacional (comercial), um único mês em atraso pode ser suficiente,
              dependendo dos termos do contrato.
            </p>

            <h3>Posso cobrar juros sobre as rendas em atraso?</h3>
            <p>
              Sim. A partir da data de vencimento de cada renda, têm-se aplicado juros de mora
              à taxa legal (atualmente 4% ao ano em contratos civis). Se o contrato previr uma
              taxa diferente, prevalece a taxa contratual, desde que não seja usurária.
            </p>

            <h3>O inquilino pode ficar no imóvel enquanto o processo decorre?</h3>
            <p>
              Sim. Enquanto não existir um título de desocupação emitido pelo BALP ou uma decisão
              judicial, o inquilino tem o direito de permanecer no imóvel. Não pode forçá-lo a sair.
            </p>

            <h3>O contrato tem de estar registado na AT para usar o BALP?</h3>
            <p>
              Sim, o registo na AT é um requisito para aceder ao Procedimento Especial de Despejo
              (PED) através do BALP. Se o contrato não estiver registado, terá de recorrer à ação
              de despejo nos tribunais comuns, que é mais morosa.
            </p>

            <h3>E se o inquilino tiver filhos menores ou estiver doente?</h3>
            <p>
              O tribunal pode suspender o despejo temporariamente em casos de vulnerabilidade
              comprovada (menores de 18 anos, deficiência grave, doença oncológica, etc.).
              Nestes casos, o processo é encaminhado para os tribunais comuns e pode incluir
              prazos adicionais — geralmente entre 3 a 12 meses.
            </p>

            <h3>Posso fazer o processo sem advogado?</h3>
            <p>
              Para o BALP e para injunções até 5.000 €, não é obrigatório advogado. Para valores
              superiores ou se o inquilino contestar, é altamente recomendável ter apoio jurídico.
            </p>
          </div>

          {/* Footer CTA */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Gerencie os pagamentos de todas as suas propriedades
              </h3>
              <p className="text-gray-600 mb-4">
                Com o Senhorio, vê de imediato quem pagou e quem está em atraso — sem precisar
                de folhas de cálculo ou memória.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/#waitlist"
                  className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition"
                >
                  Entrar na Lista de Espera →
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition"
                >
                  Ver mais artigos
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
