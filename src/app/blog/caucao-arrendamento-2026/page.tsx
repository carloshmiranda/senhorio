import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Caução no Arrendamento 2026: Montante, Regras e Devolução | Senhorio",
  description: "Tudo sobre a caução no arrendamento em Portugal 2026. Montante máximo, como registar, o que pode ser retido, prazo de devolução e como resolver conflitos.",
  keywords: [
    "caução arrendamento",
    "caução arrendamento 2026",
    "montante caução arrendamento",
    "devolução caução arrendamento",
    "caução arrendamento portugal",
    "depósito arrendamento",
    "caucao renda",
    "regras caução arrendamento habitacional",
  ],
  openGraph: {
    title: "Caução no Arrendamento 2026: Montante, Regras e Devolução",
    description: "Guia completo sobre a caução no arrendamento habitacional em Portugal. Montante máximo, o que pode reter e como devolver corretamente.",
    type: "article",
    publishedTime: "2026-04-08T10:00:00.000Z",
  },
  alternates: {
    canonical: "https://senhorio.vercel.app/blog/caucao-arrendamento-2026",
  },
};

export default function CaucaoArrendamentoPage() {
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
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">
                Caução
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
                Contrato Arrendamento
              </span>
              <span className="px-3 py-1 bg-teal-100 text-teal-700 text-sm rounded-full font-medium">
                Guia 2026
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Caução no Arrendamento 2026: Montante Máximo, Regras e Devolução
            </h1>

            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              A caução é uma das primeiras questões a resolver quando celebra um contrato de
              arrendamento. Quanto pode exigir? Em que condições pode reter parte do valor?
              Que prazo tem para devolver? Este guia responde a todas essas perguntas com base
              na legislação portuguesa em vigor.
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500 border-l-4 border-blue-500 pl-4">
              <time dateTime="2026-04-08T10:00:00.000Z">
                8 de abril de 2026
              </time>
              <span>•</span>
              <span>11 minutos de leitura</span>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-gray prose-lg max-w-none">
            {/* Waitlist CTA */}
            <div className="not-prose bg-teal-50 border border-teal-200 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-teal-900 mb-2">
                Registe cauções e pagamentos num só lugar
              </h3>
              <p className="text-teal-700 mb-4">
                O Senhorio regista a caução paga por cada inquilino, associa-a ao contrato e
                alerta quando a devolução está próxima. Nunca mais se esqueça de um prazo.
              </p>
              <Link
                href="/#waitlist"
                className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition"
              >
                Entrar na Lista de Espera →
              </Link>
            </div>

            {/* Table of Contents */}
            <nav className="not-prose bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Índice</h3>
              <ol className="space-y-2 text-sm">
                <li><a href="#o-que-e" className="text-blue-600 hover:text-blue-800">1. O que é a caução e qual a sua função</a></li>
                <li><a href="#montante-maximo" className="text-blue-600 hover:text-blue-800">2. Montante máximo permitido por lei</a></li>
                <li><a href="#como-registar" className="text-blue-600 hover:text-blue-800">3. Como registar a caução no contrato</a></li>
                <li><a href="#o-que-pode-reter" className="text-blue-600 hover:text-blue-800">4. O que pode reter da caução ao fim do contrato</a></li>
                <li><a href="#devolucao" className="text-blue-600 hover:text-blue-800">5. Prazo e processo de devolução</a></li>
                <li><a href="#conflitos" className="text-blue-600 hover:text-blue-800">6. Conflitos sobre a caução — como resolver</a></li>
                <li><a href="#perguntas-frequentes" className="text-blue-600 hover:text-blue-800">7. Perguntas frequentes</a></li>
              </ol>
            </nav>

            <h2 id="o-que-e">1. O que é a caução e qual a sua função</h2>

            <p>
              A caução (também chamada <em>depósito de garantia</em>) é uma soma em dinheiro
              que o inquilino entrega ao senhorio no início do contrato como garantia do
              cumprimento das suas obrigações. Serve para cobrir duas situações principais:
              rendas em atraso não pagas e danos causados no imóvel que excedam o desgaste
              normal de utilização.
            </p>

            <p>
              Ao contrário do que alguns pensam, a caução <strong>não é adiantamento de renda</strong>.
              O inquilino continua obrigado a pagar todas as mensalidades até ao último dia do contrato.
              Qualquer acordo que consista em "ficar o último mês sem pagar" está em incumprimento do
              contrato e retira ao senhorio o direito de cobrir eventuais danos com a caução.
            </p>

            <div className="not-prose bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
              <p className="text-sm font-semibold text-amber-800 mb-1">Nota importante:</p>
              <p className="text-sm text-amber-700">
                A caução pode ser prestada em dinheiro, garantia bancária ou seguro-caução. Na
                prática, a grande maioria dos contratos habitacionais utiliza dinheiro. Este guia
                trata exclusivamente da modalidade monetária.
              </p>
            </div>

            <h2 id="montante-maximo">2. Montante máximo permitido por lei</h2>

            <p>
              Para os contratos de <strong>arrendamento habitacional</strong> — aqueles para fins de
              habitação permanente — a caução em dinheiro está limitada a
              <strong> dois meses de renda</strong>, de acordo com o Código Civil e as regras do
              NRAU (Novo Regime do Arrendamento Urbano, Lei n.º 6/2006 de 27 de fevereiro e
              respetivas alterações).
            </p>

            <div className="not-prose overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Tipo de contrato</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Limite legal</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Exemplo (renda €800/mês)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3">Habitacional (habitação permanente)</td>
                    <td className="border border-gray-200 px-4 py-3">Máximo 2 meses de renda</td>
                    <td className="border border-gray-200 px-4 py-3">Máximo €1.600</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3">Não habitacional (comércio, serviços)</td>
                    <td className="border border-gray-200 px-4 py-3">Sem limite legal — livre negociação</td>
                    <td className="border border-gray-200 px-4 py-3">Negociável entre as partes</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              Exigir uma caução superior a dois meses em contratos habitacionais é ilegal. Mesmo que
              o inquilino aceite e pague, a cláusula é nula — e o inquilino pode exigir a devolução
              imediata do excedente. Em caso de conflito, um tribunal dará razão ao inquilino.
            </p>

            <p>
              Para contratos de curta duração (arrendamento por temporada ou finalidade não habitacional),
              as partes negociam livremente o montante. É comum exigir 1 a 3 meses nestes casos.
            </p>

            <h2 id="como-registar">3. Como registar a caução no contrato</h2>

            <p>
              A caução deve estar expressamente prevista no contrato de arrendamento. A cláusula deve
              indicar:
            </p>

            <ul>
              <li>O montante exato da caução</li>
              <li>A data em que foi entregue</li>
              <li>O modo de pagamento (transferência bancária, cheque, numerário)</li>
              <li>As condições em que pode ser retida total ou parcialmente</li>
              <li>O prazo para devolução após o fim do contrato</li>
            </ul>

            <p>
              Se a caução for paga por transferência bancária — o método mais seguro — guarde o
              comprovativo. Em caso de litígio, é a prova de que o dinheiro foi efetivamente entregue.
            </p>

            <div className="not-prose bg-blue-50 border border-blue-200 rounded-xl p-5 my-6">
              <p className="text-sm font-semibold text-blue-800 mb-1">Boas práticas:</p>
              <p className="text-sm text-blue-700">
                No dia da entrega das chaves, elabore um auto de vistoria com fotografias datadas do
                estado do imóvel. Este documento é fundamental se precisar de reter parte da caução
                por danos no fim do contrato.
              </p>
            </div>

            <h2 id="o-que-pode-reter">4. O que pode reter da caução ao fim do contrato</h2>

            <p>
              Quando o contrato termina, o senhorio pode reter da caução os valores correspondentes a:
            </p>

            <h3>Rendas em atraso</h3>
            <p>
              Se o inquilino deixou mensalidades por pagar, pode descontar o valor em dívida da caução.
              Documente sempre os atrasos com extratos bancários ou registos de pagamento.
            </p>

            <h3>Danos que excedam o desgaste normal</h3>
            <p>
              O desgaste natural do imóvel — pintura amarelada pelo tempo, pequenas marcas de uso,
              o soalho com sinais de uso normal — é esperado e não pode ser imputado ao inquilino.
              O que pode cobrar são danos efetivos: buracos na parede, janelas partidas, manchas
              permanentes em alcatifas, eletrodomésticos avariados por mau uso.
            </p>

            <p>
              A distinção entre <em>desgaste normal</em> e <em>dano</em> é frequentemente o ponto
              de conflito. O auto de vistoria inicial (com fotos) é a melhor proteção que tem.
            </p>

            <h3>Outras obrigações contratuais incumpridas</h3>
            <p>
              Se o contrato previa que o inquilino era responsável pela manutenção de um jardim,
              piscina ou equipamento específico, e esse dever não foi cumprido, pode incluir os
              custos de reposição no que retém da caução.
            </p>

            <div className="not-prose bg-red-50 border border-red-200 rounded-xl p-5 my-6">
              <p className="text-sm font-semibold text-red-800 mb-1">Não pode reter a caução por:</p>
              <ul className="text-sm text-red-700 list-disc list-inside space-y-1 mt-2">
                <li>Desgaste normal decorrente de utilização cuidada</li>
                <li>Avarias pré-existentes que não foram documentadas</li>
                <li>Obras que o senhorio queira fazer por escolha própria (remodelação)</li>
                <li>Não gostar da forma como o inquilino decorou (se não há dano permanente)</li>
              </ul>
            </div>

            <h2 id="devolucao">5. Prazo e processo de devolução</h2>

            <p>
              A lei portuguesa não estabelece um prazo fixo para devolução da caução — ao contrário
              do que acontece noutros países europeus. O que a lei exige é que a devolução seja feita
              num <strong>prazo razoável</strong> após o fim do contrato.
            </p>

            <p>
              Na prática, o entendimento jurisprudencial dominante situa esse prazo em
              <strong> 30 dias</strong> após a entrega das chaves, salvo se houver necessidade de
              vistoria técnica ou orçamentação de reparações — caso em que o prazo pode estender-se,
              mas não indefinidamente.
            </p>

            <h3>Como devolver corretamente</h3>

            <p>
              Devolva sempre por transferência bancária, guardando comprovativo. Se retiver parte
              do valor, envie ao inquilino:
            </p>

            <ul>
              <li>Um documento explicando o montante retido e o respetivo motivo</li>
              <li>Faturas ou orçamentos das reparações realizadas</li>
              <li>O valor devolvido e a data da transferência</li>
            </ul>

            <p>
              Mesmo que discordem do valor retido, este processo protege-o legalmente ao demonstrar
              boa-fé e transparência. Um senhorio que guarda silêncio e não devolve nada durante
              meses tem muito mais dificuldade em justificar a retenção num eventual processo judicial.
            </p>

            <h3>E se a caução não chegar para cobrir os danos?</h3>

            <p>
              A caução é uma garantia, não uma responsabilidade limitada. Se os danos ou as rendas
              em atraso forem superiores ao valor da caução, pode exigir ao inquilino o valor
              remanescente através de injunção ou ação de condenação nos tribunais. A dívida mantém-se
              exigível nos prazos de prescrição gerais do Código Civil.
            </p>

            <h2 id="conflitos">6. Conflitos sobre a caução — como resolver</h2>

            <p>
              Os conflitos sobre caução são dos mais frequentes no arrendamento. Quando há
              desacordo sobre o montante a reter, os caminhos disponíveis são:
            </p>

            <h3>Negociação direta</h3>
            <p>
              É sempre o caminho mais rápido e barato. Apresente ao inquilino as faturas das
              reparações e proponha um acordo. Muitas vezes um valor intermédio resolve a situação
              sem custos judiciais.
            </p>

            <h3>Julgados de Paz</h3>
            <p>
              Para litígios de valor reduzido (tipicamente até €15.000), os Julgados de Paz são
              uma alternativa ágil e económica aos tribunais comuns. O processo é mais simples,
              as audiências são mais rápidas e as custas são significativamente mais baixas.
            </p>

            <h3>Tribunal de Pequena Instância Cível</h3>
            <p>
              Para valores superiores ou quando os Julgados de Paz não são competentes, a ação
              nos tribunais cíveis é o caminho. O processo pode demorar meses a anos, pelo que
              deve reservar esta opção para valores que justifiquem o investimento em tempo e custas.
            </p>

            <div className="not-prose bg-gray-50 border border-gray-200 rounded-xl p-5 my-6">
              <p className="text-sm font-semibold text-gray-800 mb-2">Documentação que deve guardar:</p>
              <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                <li>Contrato de arrendamento assinado</li>
                <li>Comprovativo de transferência da caução</li>
                <li>Auto de vistoria inicial com fotografias datadas</li>
                <li>Auto de vistoria final (idealmente realizado na presença de ambas as partes)</li>
                <li>Faturas de todas as reparações</li>
                <li>Registos de pagamento das rendas (extratos bancários)</li>
              </ul>
            </div>

            <h2 id="perguntas-frequentes">7. Perguntas frequentes</h2>

            <h3>Posso exigir caução e fiança ao mesmo tempo?</h3>
            <p>
              Sim — são garantias distintas. A caução é um depósito em dinheiro; a fiança é o
              compromisso de um terceiro (o fiador) de pagar o que o inquilino não pague. Não há
              nenhuma norma que proíba a existência de ambas no mesmo contrato.
            </p>

            <h3>O inquilino pode pedir a caução de volta antes do fim do contrato?</h3>
            <p>
              Não. A caução fica na posse do senhorio durante toda a duração do contrato. O inquilino
              só tem direito à sua devolução (deduzida de eventuais dívidas ou danos) após a entrega
              das chaves e verificação do estado do imóvel.
            </p>

            <h3>A caução rende juros?</h3>
            <p>
              Em teoria, como o dinheiro permanece na posse do senhorio durante anos, poderia
              argumentar-se que os juros pertencem ao inquilino. Na prática, é muito raro que
              os contratos prevejam a devolução com juros, e a lei não o exige expressamente.
              Se quiser evitar qualquer ambiguidade, inclua uma cláusula no contrato que esclareça
              que a caução não vence juros.
            </p>

            <h3>O que acontece à caução se o imóvel for vendido durante o contrato?</h3>
            <p>
              A venda do imóvel não afeta o contrato de arrendamento nem os direitos do inquilino
              (princípio <em>emptio non tollit locatum</em>). O novo proprietário assume os direitos
              e obrigações do contrato, incluindo a responsabilidade de devolver a caução no fim.
              É habitual que o valor da caução seja descontado no preço de compra e venda, ficando
              a questão acertada entre comprador e vendedor.
            </p>

            <h3>Posso atualizar o valor da caução quando atualizo a renda?</h3>
            <p>
              A lei não obriga à atualização da caução quando a renda sobe. Se quiser exigir uma
              caução atualizada, precisa do acordo do inquilino. Na prática, a maioria dos senhorios
              mantém o valor da caução inicial durante toda a duração do contrato.
            </p>

            {/* Final CTA */}
            <div className="not-prose bg-teal-50 border border-teal-200 rounded-xl p-6 mt-10">
              <h3 className="text-lg font-semibold text-teal-900 mb-2">
                Gerencie cauções, rendas e contratos num só lugar
              </h3>
              <p className="text-teal-700 mb-4">
                O Senhorio regista cauções por imóvel, emite recibos de renda em conformidade legal
                e exporta dados para o IRS — tudo sem sair da plataforma.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/#waitlist"
                  className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition"
                >
                  Entrar na Lista de Espera →
                </Link>
                <Link
                  href="/blog/registo-contrato-arrendamento-at-2026"
                  className="inline-flex items-center px-4 py-2 bg-white text-teal-700 border border-teal-300 rounded-lg font-medium hover:bg-teal-50 transition"
                >
                  Registar contrato na AT →
                </Link>
              </div>
            </div>

            {/* Related articles */}
            <div className="not-prose mt-10 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Artigos relacionados</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Link href="/blog/inquilino-nao-paga-renda-o-que-fazer" className="block p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
                  <p className="font-medium text-gray-900 mb-1">Inquilino Não Paga Renda: O Que Fazer</p>
                  <p className="text-sm text-gray-600">Passo a passo legal — da notificação ao BALP</p>
                </Link>
                <Link href="/blog/registo-contrato-arrendamento-at-2026" className="block p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
                  <p className="font-medium text-gray-900 mb-1">Registo de Contrato de Arrendamento na AT</p>
                  <p className="text-sm text-gray-600">Prazos, documentos e passo a passo no Portal</p>
                </Link>
                <Link href="/blog/despesas-dedutiveis-arrendamento-2026" className="block p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
                  <p className="font-medium text-gray-900 mb-1">Despesas Dedutíveis no Arrendamento 2026</p>
                  <p className="text-sm text-gray-600">O que pode declarar no IRS e como calcular</p>
                </Link>
                <Link href="/blog/recibos-renda-eletronicos-guia-2026" className="block p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
                  <p className="font-medium text-gray-900 mb-1">Recibos de Renda Eletrónicos</p>
                  <p className="text-sm text-gray-600">Obrigações legais, prazos e como emitir</p>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
