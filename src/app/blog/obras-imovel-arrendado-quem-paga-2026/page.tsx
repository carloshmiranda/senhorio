import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Obras no Imóvel Arrendado: Quem Paga em 2026? | Senhorio",
  description: "Guia legal sobre obras em imóveis arrendados em Portugal. Quem paga obras de conservação, reparações urgentes, melhoramentos e como agir quando surgem problemas.",
  keywords: [
    "obras imóvel arrendado quem paga",
    "reparações arrendamento portugal",
    "obras conservação arrendamento",
    "responsabilidade obras senhorio inquilino",
    "obras urgentes arrendamento",
    "conservação ordinária arrendamento",
    "obras NRAU 2026",
    "reparações inquilino ou senhorio",
    "despesas obras arrendamento",
    "obras dedutíveis arrendamento IRS",
    "quem paga obras casa arrendada",
    "direitos senhorios obras",
  ],
  openGraph: {
    title: "Obras no Imóvel Arrendado: Quem Paga em 2026?",
    description: "A lei portuguesa distingue obras do senhorio e obras do inquilino. Saiba quem é responsável por cada tipo de obra, o que pode deduzir no IRS e como agir em caso de disputa.",
    type: "article",
    publishedTime: "2026-04-09T09:00:00.000Z",
  },
  alternates: {
    canonical: "https://senhorio.vercel.app/blog/obras-imovel-arrendado-quem-paga-2026",
  },
};

export default function ObrasImovelArrendadoPage() {
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
              <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full font-medium">
                Obras e Reparações
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">
                Guia Legal
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
                Arrendamento 2026
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Obras no Imóvel Arrendado: Quem Paga em 2026?
            </h1>

            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              Obras no imóvel arrendado são uma das maiores fontes de conflito entre senhorios e inquilinos.
              A lei portuguesa é clara na distinção — mas nem sempre fácil de interpretar na prática.
              Este guia explica quem paga o quê, em que circunstâncias, e o que pode deduzir no IRS.
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500 border-l-4 border-orange-500 pl-4">
              <time dateTime="2026-04-09T09:00:00.000Z">
                9 de abril de 2026
              </time>
              <span>•</span>
              <span>12 minutos de leitura</span>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-gray prose-lg max-w-none">
            {/* Waitlist CTA */}
            <div className="not-prose bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-orange-900 mb-2">
                Registe despesas de obras e calcule deduções de IRS automaticamente
              </h3>
              <p className="text-orange-700 mb-4">
                O Senhorio categoriza as despesas por tipo legal e prepara o relatório para o Anexo F
                do IRS — sem precisar de decorar o que é dedutível.
              </p>
              <Link
                href="/#waitlist"
                className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition"
              >
                Entrar na Lista de Espera →
              </Link>
            </div>

            {/* Table of Contents */}
            <nav className="not-prose bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Índice</h3>
              <ol className="space-y-2 text-sm">
                <li><a href="#principio-geral" className="text-blue-600 hover:text-blue-800">1. O princípio geral da lei</a></li>
                <li><a href="#obras-senhorio" className="text-blue-600 hover:text-blue-800">2. Obras da responsabilidade do senhorio</a></li>
                <li><a href="#obras-inquilino" className="text-blue-600 hover:text-blue-800">3. Obras da responsabilidade do inquilino</a></li>
                <li><a href="#obras-urgentes" className="text-blue-600 hover:text-blue-800">4. Obras urgentes: regras especiais</a></li>
                <li><a href="#melhoramentos" className="text-blue-600 hover:text-blue-800">5. Melhoramentos e benfeitorias</a></li>
                <li><a href="#irs-deducoes" className="text-blue-600 hover:text-blue-800">6. Deduções de IRS para obras</a></li>
                <li><a href="#conflitos" className="text-blue-600 hover:text-blue-800">7. O que fazer em caso de conflito</a></li>
                <li><a href="#faq" className="text-blue-600 hover:text-blue-800">8. Perguntas frequentes</a></li>
              </ol>
            </nav>

            <h2 id="principio-geral">1. O princípio geral da lei</h2>

            <p>
              A lei portuguesa estabelece uma distinção clara entre dois tipos de obras em imóveis arrendados:
              as <strong>obras de conservação ordinária</strong> e as <strong>obras de conservação extraordinária</strong>.
              Esta distinção está no coração do Código Civil e do NRAU (Novo Regime de Arrendamento Urbano).
            </p>

            <p>
              A regra base é simples: o inquilino deve devolver o imóvel no estado em que o recebeu
              (art. 1043.º do Código Civil), com desgaste normal de uso. Para isso, compete-lhe
              as obras de pequena conservação. Tudo o que vai além disso — grandes reparações,
              infraestruturas, estrutura — é responsabilidade do senhorio.
            </p>

            <div className="not-prose bg-blue-50 border border-blue-200 rounded-xl p-5 my-6">
              <p className="text-blue-900 font-medium mb-2">Regra prática</p>
              <p className="text-blue-800 text-sm">
                Se a obra é consequência do uso normal e não envolve montantes significativos,
                é do inquilino. Se é consequência da degradação natural do imóvel, de defeito estrutural,
                ou de avaria em sistemas essenciais, é do senhorio.
              </p>
            </div>

            <h2 id="obras-senhorio">2. Obras da responsabilidade do senhorio</h2>

            <p>
              Segundo o art. 1074.º do Código Civil e as disposições do NRAU, o senhorio é
              responsável pelas <strong>obras de conservação extraordinária</strong> — as que não decorrem
              do uso normal do imóvel e que implicam investimento significativo para manter as
              condições de habitabilidade.
            </p>

            <h3>O que são obras de conservação extraordinária</h3>

            <p>
              As obras de conservação extraordinária incluem, em regra, tudo o que respeita:
            </p>

            <ul>
              <li><strong>Estrutura do edifício</strong>: telhado, paredes exteriores, fundações, lajes</li>
              <li><strong>Instalação elétrica</strong>: substituição do quadro elétrico, cablagem principal, tomadas defeituosas que não resultam de uso</li>
              <li><strong>Canalização e saneamento</strong>: tubagens, coletores, sistema de esgotos</li>
              <li><strong>Aquecimento e ventilação</strong>: caldeira central, sistema de aquecimento central, condutas</li>
              <li><strong>Impermeabilização</strong>: infiltrações por fissuras exteriores, humidade estrutural</li>
              <li><strong>Elevadores</strong> (em propriedade horizontal, partilhado com condomínio)</li>
              <li><strong>Janelas e portas exteriores</strong>: quando degradadas estruturalmente</li>
            </ul>

            <h3>Exemplos práticos</h3>

            <div className="not-prose overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="px-4 py-3 text-left font-semibold">Situação</th>
                    <th className="px-4 py-3 text-center font-semibold text-red-300">Senhorio</th>
                    <th className="px-4 py-3 text-center font-semibold text-green-300">Inquilino</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Telhado com infiltrações", "✓", "—"],
                    ["Caldeira avariada (uso normal)", "✓", "—"],
                    ["Canalização entupida (sem culpa do inquilino)", "✓", "—"],
                    ["Pintura interior (ao fim do contrato)", "—", "✓"],
                    ["Torneira a pingar (substituição de vedante)", "—", "✓"],
                    ["Vidro partido pelo inquilino", "—", "✓"],
                    ["Porta interior danificada pelo inquilino", "—", "✓"],
                    ["Janela exterior degradada (sem culpa)", "✓", "—"],
                    ["Infiltração por fissura na fachada", "✓", "—"],
                    ["Parquet riscado por uso normal", "—", "✓ (desgaste)"],
                    ["Electrodoméstico avariado incluído no arrendamento", "✓", "—"],
                    ["Lâmpada fundida", "—", "✓"],
                  ].map(([situacao, senhorio, inquilino], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="border border-gray-200 px-4 py-3 text-gray-800">{situacao}</td>
                      <td className="border border-gray-200 px-4 py-3 text-center text-red-700 font-medium">{senhorio}</td>
                      <td className="border border-gray-200 px-4 py-3 text-center text-green-700 font-medium">{inquilino}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 id="obras-inquilino">3. Obras da responsabilidade do inquilino</h2>

            <p>
              O art. 1043.º do Código Civil obriga o inquilino a manter o imóvel em bom estado
              de conservação para o uso a que se destina, realizando as <strong>obras de conservação
              ordinária</strong>. Estas são obras de manutenção corrente, de pequena dimensão e custo,
              que resultam do uso quotidiano do imóvel.
            </p>

            <h3>O que são obras de conservação ordinária</h3>

            <ul>
              <li>Pintura interior (reparação de pequenos danos nas paredes)</li>
              <li>Substituição de torneiras, vedantes, sifões</li>
              <li>Substituição de lâmpadas, interruptores, tomadas danificadas pelo uso</li>
              <li>Reparação de vidros partidos (exceto por causas estruturais)</li>
              <li>Lubrificação e pequenas reparações em fechaduras e dobradiças</li>
              <li>Limpeza de redes de esgotos entupidas por uso normal</li>
              <li>Reparação de danos causados pelo próprio inquilino</li>
            </ul>

            <p>
              O limite entre o que é "ordinário" e o que é "extraordinário" nem sempre é nítido.
              A jurisprudência tende a avaliar o valor da reparação em relação ao valor do imóvel
              e à natureza da causa — se resultou de uso normal, é ordinária; se resultou de
              degradação inevitável ou causa externa, tende a ser extraordinária.
            </p>

            <h2 id="obras-urgentes">4. Obras urgentes: regras especiais</h2>

            <p>
              Quando o imóvel apresenta danos que colocam em risco a segurança dos ocupantes
              ou a própria habitabilidade — uma infiltração grave, um curto-circuito na instalação
              elétrica, uma avaria na caldeira no inverno — o art. 1036.º do Código Civil prevê
              um regime especial.
            </p>

            <h3>Como funciona o procedimento de obra urgente</h3>

            <ol>
              <li>
                <strong>O inquilino notifica o senhorio</strong> por escrito, descrevendo o problema
                e solicitando intervenção urgente. A notificação deve ser enviada por carta registada
                com aviso de receção, e-mail com leitura confirmada, ou outro meio que permita
                comprovar a data e o conteúdo.
              </li>
              <li>
                <strong>O senhorio tem o prazo de 90 dias</strong> para realizar a obra, salvo nos
                casos de real urgência (risco imediato de segurança ou saúde), em que o prazo é
                o estritamente necessário para intervir.
              </li>
              <li>
                <strong>Se o senhorio não agir</strong> dentro do prazo, o inquilino pode realizar
                a obra e deduzir o custo das rendas futuras — mas tem de comprovar os gastos com
                faturas em seu nome.
              </li>
            </ol>

            <div className="not-prose bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
              <p className="text-amber-900 font-semibold mb-2">Atenção: forma da notificação</p>
              <p className="text-amber-800 text-sm">
                A notificação de obras urgentes deve ser sempre feita por escrito e de forma que
                permita comprovar a data. Uma mensagem de WhatsApp ou uma chamada telefónica não
                têm valor legal suficiente para desencadear o prazo de 90 dias.
              </p>
            </div>

            <h2 id="melhoramentos">5. Melhoramentos e benfeitorias</h2>

            <p>
              Distinto das obras de conservação são os <strong>melhoramentos ou benfeitorias</strong> —
              obras que acrescentam valor ao imóvel mas que não são necessárias para o manter nas
              condições normais de habitabilidade. Aqui as regras são diferentes.
            </p>

            <h3>Benfeitorias úteis</h3>

            <p>
              São obras que aumentam o valor do imóvel sem ser indispensáveis (ex: instalar
              ar condicionado, renovar a casa de banho com materiais de qualidade superior,
              adicionar um deck no terraço). Em princípio, o inquilino pode realizá-las
              <strong>só com autorização escrita do senhorio</strong>.
            </p>

            <p>
              Ao fim do contrato, o inquilino pode:
            </p>

            <ul>
              <li><strong>Levantar as benfeitorias</strong> se não causar dano ao imóvel, ou</li>
              <li><strong>Exigir indemnização</strong> pelo valor das benfeitorias que ficam no imóvel, se o senhorio as retiver</li>
            </ul>

            <h3>Benfeitorias voluptuárias</h3>

            <p>
              São obras de luxo ou mero embelezamento sem valor prático acrescido (pintar
              paredes com murais artísticos, instalar piso aquecido numa casa de luxo, etc.).
              Ao fim do contrato, o inquilino pode levantá-las mas não tem direito a indemnização.
            </p>

            <h3>A cláusula contratual é determinante</h3>

            <p>
              O contrato de arrendamento pode e deve regular expressamente o que acontece a
              obras e melhoramentos realizados pelo inquilino. Uma cláusula clara evita litígios.
              Em contratos omissos, aplica-se o regime geral do Código Civil.
            </p>

            <h2 id="irs-deducoes">6. Deduções de IRS para obras</h2>

            <p>
              As despesas com obras no imóvel arrendado são <strong>dedutíveis no IRS</strong>,
              mas com condicionantes importantes. Só são dedutíveis as despesas que o senhorio
              suporta efetivamente — não as que são da responsabilidade do inquilino.
            </p>

            <h3>O que pode deduzir</h3>

            <ul>
              <li><strong>Obras de conservação e reparação</strong> do imóvel arrendado, documentadas com fatura</li>
              <li><strong>Encargos de condomínio</strong> (incluindo obras em partes comuns)</li>
              <li><strong>IMI pago pelo senhorio</strong></li>
              <li><strong>Seguros</strong> relacionados com o imóvel arrendado</li>
            </ul>

            <h3>O que não pode deduzir</h3>

            <ul>
              <li>Obras de valorização ou ampliação (não são despesas de manutenção)</li>
              <li>Obras que aumentam a área útil do imóvel</li>
              <li>Obras realizadas em imóveis não arrendados no ano fiscal</li>
              <li>Despesas não documentadas com fatura emitida ao senhorio</li>
            </ul>

            <div className="not-prose bg-green-50 border border-green-200 rounded-xl p-5 my-6">
              <p className="text-green-900 font-semibold mb-2">Regra de ouro para IRS</p>
              <p className="text-green-800 text-sm">
                Todas as faturas de obras devem estar emitidas em nome do senhorio,
                com o NIF do senhorio, e referenciando explicitamente o imóvel arrendado.
                Faturas em nome do inquilino ou sem referência ao imóvel não são aceites pela AT.
              </p>
            </div>

            <h3>Limite de dedução</h3>

            <p>
              No regime de tributação autónoma (taxa de 25% ou a nova taxa de 10%), as despesas
              com obras podem ser deduzidas ao rendimento bruto de rendas, reduzindo o valor
              tributável. No regime de englobamento, as mesmas despesas são deduzidas ao rendimento
              bruto no Anexo F da declaração de IRS.
            </p>

            <h2 id="conflitos">7. O que fazer em caso de conflito</h2>

            <p>
              Quando há divergência sobre quem deve pagar uma obra, a situação pode escalar
              rapidamente. Eis como gerir o conflito de forma eficaz.
            </p>

            <h3>Passos para o senhorio</h3>

            <ol>
              <li>
                <strong>Avaliar objetivamente o tipo de obra</strong>: é conservação ordinária ou extraordinária?
                Em caso de dúvida, consulte um advogado especialista em arrendamento.
              </li>
              <li>
                <strong>Comunicar por escrito</strong>: toda a comunicação sobre obras deve ser
                por escrito. Guarde cópias de tudo.
              </li>
              <li>
                <strong>Obter orçamentos documentados</strong>: se tiver de fazer obras, obtenha
                pelo menos dois orçamentos de profissionais certificados.
              </li>
              <li>
                <strong>Notificar o inquilino da necessidade de acesso</strong>: para fazer obras,
                o senhorio deve notificar o inquilino com antecedência mínima de 15 dias (exceto
                em caso de urgência).
              </li>
            </ol>

            <h3>Quando o inquilino se recusa a fazer obras que são da sua responsabilidade</h3>

            <p>
              Se o inquilino não realiza obras de conservação ordinária que claramente lhe competem,
              criando danos progressivos no imóvel, o senhorio pode:
            </p>

            <ul>
              <li>Notificar por escrito para realizar as obras num prazo razoável</li>
              <li>Em caso de recusa, pode constituir fundamento para resolução do contrato por incumprimento (art. 1083.º CC)</li>
              <li>No final do contrato, pode reter a caução para cobrir custos de reparação</li>
            </ul>

            <h2 id="faq">8. Perguntas frequentes</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  O inquilino fez obras sem autorização. O que posso fazer?
                </h3>
                <p className="text-gray-700">
                  Se as obras são benfeitorias úteis feitas sem autorização escrita, pode exigir que o
                  inquilino as remova e repare o estado anterior, ou ficar com elas sem pagar qualquer
                  indemnização. Obras que causem dano estrutural são fundamento de resolução do contrato.
                  Documente tudo com fotos e comunicações escritas.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  O imóvel tem humidade. Quem paga?
                </h3>
                <p className="text-gray-700">
                  Depende da origem. Humidade de infiltração exterior (fachada, telhado, cobertura)
                  é sempre do senhorio. Humidade de condensação por falta de ventilação adequada do
                  inquilino ou por ausência de aquecimento é mais disputada. Humidade por
                  canalização interior avariada sem culpa do inquilino é do senhorio. A origem da
                  humidade deve ser determinada por perito.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  A caldeira avariou. É sempre do senhorio?
                </h3>
                <p className="text-gray-700">
                  Se a caldeira estava incluída no arrendamento e avariou por desgaste normal, é
                  responsabilidade do senhorio. Se avariou por uso indevido ou falta de manutenção
                  da parte do inquilino (não fazer as revisões obrigatórias, por exemplo), pode ser
                  do inquilino — mas é preciso provar a causa. Exija sempre relatório técnico do
                  técnico que intervém.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Posso entrar no imóvel para fazer obras sem avisar o inquilino?
                </h3>
                <p className="text-gray-700">
                  Não. O senhorio tem de notificar o inquilino com pelo menos 15 dias de antecedência
                  para obras não urgentes. Em caso de urgência (risco de segurança imediato), o
                  prazo pode ser encurtado, mas deve sempre avisar com a antecedência possível.
                  Entrar no imóvel sem aviso pode configurar violação de domicílio.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  O inquilino pode reter a renda se eu não fizer obras?
                </h3>
                <p className="text-gray-700">
                  Não diretamente. O inquilino não pode simplesmente deixar de pagar a renda porque
                  o senhorio não fez obras. O procedimento legal é: notificar por escrito, esperar
                  90 dias (ou o prazo urgente), e só então fazer as obras e deduzir o custo nas rendas
                  seguintes — com comprovativo de despesas. Reter a renda unilateralmente pode levar
                  ao despejo por falta de pagamento.
                </p>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="not-prose mt-12 bg-indigo-600 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-3">
                Registe obras e despesas dedutíveis sem complicações
              </h2>
              <p className="text-indigo-100 mb-6 max-w-xl mx-auto">
                O Senhorio ajuda-o a categorizar despesas por tipo legal e a preparar tudo
                para o Anexo F do IRS. Sem folhas de cálculo, sem erros.
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
                <Link href="/blog/despesas-dedutiveis-arrendamento-2026" className="block p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
                  <p className="font-medium text-gray-900 mb-1">Despesas Dedutíveis no IRS</p>
                  <p className="text-sm text-gray-600">O que pode declarar no Anexo F em 2026</p>
                </Link>
                <Link href="/blog/contrato-arrendamento-habitacional-2026" className="block p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
                  <p className="font-medium text-gray-900 mb-1">Contrato de Arrendamento</p>
                  <p className="text-sm text-gray-600">Cláusulas obrigatórias e registo na AT</p>
                </Link>
                <Link href="/blog/inquilino-nao-paga-renda-o-que-fazer" className="block p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
                  <p className="font-medium text-gray-900 mb-1">Inquilino Não Paga Renda</p>
                  <p className="text-sm text-gray-600">Procedimento legal passo a passo</p>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
