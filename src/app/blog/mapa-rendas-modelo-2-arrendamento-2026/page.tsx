import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mapa de Rendas 2026: Como Preencher o Modelo 2 na AT | Senhorio",
  description: "Guia completo para preencher o Mapa de Rendas (Modelo 2) na AT em 2026. Prazo de entrega, campos obrigatórios, como aceder ao Portal das Finanças e erros a evitar.",
  keywords: [
    "mapa de rendas",
    "modelo 2 arrendamento",
    "mapa de rendas 2026",
    "modelo 2 AT arrendamento",
    "como preencher mapa rendas",
    "comunicação rendas AT",
    "modelo 2 portal finanças",
    "rendas prediais AT modelo 2",
  ],
  openGraph: {
    title: "Mapa de Rendas 2026: Como Preencher o Modelo 2 na AT",
    description: "Passo a passo para preencher e submeter o Mapa de Rendas (Modelo 2) na AT. Prazos, campos obrigatórios e erros a evitar.",
    type: "article",
    publishedTime: "2026-04-05T11:00:00.000Z",
  },
  alternates: {
    canonical: "https://senhorio.vercel.app/blog/mapa-rendas-modelo-2-arrendamento-2026",
  },
};

export default function MapaRendasModelo2Page() {
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
              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full font-medium">
                Portal das Finanças
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">
                Obrigação Legal
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
                IRS 2026
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Mapa de Rendas 2026: Como Preencher o Modelo 2 na AT
            </h1>

            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              O Modelo 2 de arrendamento — vulgarmente conhecido como Mapa de Rendas — é uma
              declaração anual obrigatória que os senhorios têm de submeter na Autoridade
              Tributária. Este guia explica o que é, quando entregar, como preencher e que
              erros evitar.
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500 border-l-4 border-purple-500 pl-4">
              <time dateTime="2026-04-05T11:00:00.000Z">
                5 de abril de 2026
              </time>
              <span>•</span>
              <span>10 minutos de leitura</span>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-gray prose-lg max-w-none">
            {/* CTA */}
            <div className="not-prose bg-purple-50 border border-purple-200 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">
                Guarde todos os dados das suas rendas organizados por ano
              </h3>
              <p className="text-purple-700 mb-4">
                O Senhorio regista cada pagamento recebido. Na altura de preencher o Modelo 2
                ou a declaração de IRS, tem tudo pronto sem procurar recibos ou extratos.
              </p>
              <Link
                href="/#waitlist"
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition"
              >
                Entrar na Lista de Espera →
              </Link>
            </div>

            {/* Table of Contents */}
            <nav className="not-prose bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Índice</h3>
              <ol className="space-y-2 text-sm">
                <li><a href="#o-que-e" className="text-blue-600 hover:text-blue-800">1. O que é o Modelo 2 de arrendamento</a></li>
                <li><a href="#quem-entrega" className="text-blue-600 hover:text-blue-800">2. Quem tem obrigação de entregar</a></li>
                <li><a href="#prazo" className="text-blue-600 hover:text-blue-800">3. Prazo de entrega em 2026</a></li>
                <li><a href="#aceder" className="text-blue-600 hover:text-blue-800">4. Como aceder ao formulário no Portal das Finanças</a></li>
                <li><a href="#preencher" className="text-blue-600 hover:text-blue-800">5. Como preencher campo a campo</a></li>
                <li><a href="#situacoes-especiais" className="text-blue-600 hover:text-blue-800">6. Situações especiais</a></li>
                <li><a href="#erros-comuns" className="text-blue-600 hover:text-blue-800">7. Erros mais comuns</a></li>
                <li><a href="#coimas" className="text-blue-600 hover:text-blue-800">8. Coimas por entrega fora de prazo</a></li>
                <li><a href="#faq" className="text-blue-600 hover:text-blue-800">9. Perguntas frequentes</a></li>
              </ol>
            </nav>

            <h2 id="o-que-e">1. O que é o Modelo 2 de arrendamento</h2>

            <p>
              O <strong>Modelo 2 — Rendimentos Prediais</strong> é a declaração anual através da
              qual os senhorios comunicam à Autoridade Tributária e Aduaneira (AT) todos os
              rendimentos obtidos em arrendamentos durante o ano anterior.
            </p>

            <p>
              Não deve ser confundida com outras comunicações obrigatórias para senhorios:
            </p>

            <ul>
              <li>
                <strong>Registo do contrato</strong> — feito no início de cada contrato, no prazo
                de 30 dias após a celebração.
              </li>
              <li>
                <strong>Recibos de renda eletrónicos</strong> — emitidos mensalmente, até ao
                oitavo dia do mês seguinte.
              </li>
              <li>
                <strong>Declaração de IRS (Modelo 3 + Anexo F)</strong> — entregue entre abril
                e junho de cada ano, onde são declarados os rendimentos para efeitos de tributação.
              </li>
            </ul>

            <p>
              O Modelo 2 é distinto do Anexo F da declaração de IRS. Funciona como um
              <strong> registo de suporte</strong> das rendas recebidas, que a AT pode cruzar
              com os dados dos recibos eletrónicos emitidos durante o ano.
            </p>

            <div className="not-prose bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
              <p className="text-sm font-semibold text-amber-800 mb-1">Nota importante — 2026</p>
              <p className="text-sm text-amber-700">
                A AT tem cruzado sistematicamente os dados dos recibos de renda eletrónicos com
                as declarações de IRS. Divergências entre o que consta nos recibos e o que é
                declarado no IRS são uma das causas mais frequentes de inspeções a senhorios.
              </p>
            </div>

            <h2 id="quem-entrega">2. Quem tem obrigação de entregar</h2>

            <p>
              A obrigação de comunicar rendimentos de arrendamento aplica-se a todos os
              <strong> senhorios com contratos de arrendamento em vigor</strong> durante o
              ano em questão, independentemente de:
            </p>

            <ul>
              <li>Número de imóveis arrendados</li>
              <li>Valor da renda recebida</li>
              <li>Regime fiscal adotado (taxa autónoma, taxa reduzida, RSAA)</li>
              <li>O contrato ter terminado durante o ano (rendas recebidas até à data de término devem ser comunicadas)</li>
            </ul>

            <p>
              Estão isentos de entrega do Modelo 2 os proprietários que <strong>não receberam
              qualquer rendimento de arrendamento</strong> no ano em questão — por exemplo,
              se o imóvel esteve devoluto ou se o contrato ainda não tinha tido início.
            </p>

            <h2 id="prazo">3. Prazo de entrega em 2026</h2>

            <p>
              Para declarar rendimentos do ano 2025, a entrega do Modelo 2 deve ser efetuada
              <strong> até 30 de junho de 2026</strong>.
            </p>

            <p>
              Este prazo coincide com o período de entrega da declaração de IRS (Modelo 3).
              Recomenda-se submeter o Modelo 2 antes ou ao mesmo tempo que a declaração de IRS,
              para garantir coerência entre os dados comunicados.
            </p>

            <div className="not-prose overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-semibold text-gray-700">Declaração</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Prazo 2026</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Onde</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="p-3 text-gray-800">Modelo 2 — Rendimentos Prediais</td>
                    <td className="p-3 text-gray-800">Até 30 de junho</td>
                    <td className="p-3 text-gray-800">Portal das Finanças</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3 text-gray-800">Modelo 3 + Anexo F (IRS)</td>
                    <td className="p-3 text-gray-800">Abril a junho</td>
                    <td className="p-3 text-gray-800">Portal das Finanças</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-gray-800">Recibos de renda</td>
                    <td className="p-3 text-gray-800">Até ao dia 8 do mês seguinte</td>
                    <td className="p-3 text-gray-800">Portal das Finanças (mensal)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 id="aceder">4. Como aceder ao formulário no Portal das Finanças</h2>

            <p>
              Para aceder ao Modelo 2 no Portal das Finanças:
            </p>

            <ol>
              <li>Aceda a <strong>portaldasfinancas.gov.pt</strong> e autentique-se com NIF e senha ou Chave Móvel Digital</li>
              <li>No menu principal, selecione <strong>Cidadãos → Entregar → IRS</strong></li>
              <li>Escolha o ano fiscal em questão</li>
              <li>Selecione <strong>Mod. 2 — Rendimentos Prediais</strong> na lista de declarações disponíveis</li>
            </ol>

            <p>
              Se não encontrar o Modelo 2 separado, é possível que os seus rendimentos de
              arrendamento devam ser declarados diretamente no <strong>Anexo F da declaração
              de IRS</strong>. Isso acontece quando a AT já pré-preencheu a declaração com
              base nos recibos de renda emitidos. Nesse caso, verifique se os dados
              pré-preenchidos estão corretos antes de submeter.
            </p>

            <h2 id="preencher">5. Como preencher campo a campo</h2>

            <p>
              O formulário está organizado por imóvel. Para cada propriedade arrendada, terá de indicar:
            </p>

            <h3>Identificação do imóvel</h3>
            <ul>
              <li><strong>Artigo matricial</strong> — o número de identificação do imóvel na matriz predial (consta na caderneta predial ou na nota de liquidação do IMI)</li>
              <li><strong>Fração</strong> — se aplicável (imóveis em propriedade horizontal)</li>
              <li><strong>Tipo de imóvel</strong> — habitação, comércio, serviços, armazém, etc.</li>
            </ul>

            <h3>Dados do arrendatário</h3>
            <ul>
              <li>NIF do inquilino</li>
              <li>Data de início e fim do contrato (se terminou durante o ano)</li>
              <li>Tipo de contrato (habitacional, não habitacional)</li>
            </ul>

            <h3>Rendimentos recebidos</h3>
            <ul>
              <li>Total de rendas recebidas no ano (deve coincidir com o total dos recibos emitidos)</li>
              <li>Valor de eventuais despesas repercutidas ao arrendatário (como condomínio)</li>
              <li>Adiantamentos ou rendas futuras recebidas antecipadamente</li>
            </ul>

            <h3>Regime fiscal aplicado</h3>
            <p>
              Indique o regime fiscal: tributação autónoma (25%), taxa reduzida de habitação
              acessível (10%), ou isenção (RSAA). Se optou por englobamento com os restantes
              rendimentos, indique essa opção.
            </p>

            <h3>Despesas dedutíveis</h3>
            <p>
              Obras de conservação e manutenção, prémios de seguro, IMI, condomínio e juros de
              empréstimo (se aplicável). Estas despesas reduzem a base tributável e devem ter
              documentação de suporte.
            </p>

            <h2 id="situacoes-especiais">6. Situações especiais</h2>

            <h3>Imóvel arrendado parte do ano</h3>
            <p>
              Se o imóvel passou de arrendado a devoluto (ou vice-versa) durante o ano, deve
              indicar as datas de início e fim do arrendamento e o valor correspondente ao
              período em que esteve arrendado.
            </p>

            <h3>Vários inquilinos no mesmo ano</h3>
            <p>
              Se o imóvel teve mais de um inquilino durante o ano (por exemplo, um contrato
              terminou e um novo começou), deve criar uma linha para cada inquilino com os
              respetivos períodos e valores.
            </p>

            <h3>Subarrendamento</h3>
            <p>
              Se é o arrendatário e sublocou o imóvel, a diferença entre a renda que recebe
              e a renda que paga é tributada como rendimento predial e deve ser declarada.
            </p>

            <h3>Imóvel em co-propriedade</h3>
            <p>
              Se o imóvel pertence a mais de um proprietário, cada proprietário declara apenas
              a sua quota-parte nos rendimentos.
            </p>

            <h2 id="erros-comuns">7. Erros mais comuns</h2>

            <ul>
              <li>
                <strong>Divergência com os recibos de renda emitidos</strong> — o total declarado
                no Modelo 2 deve coincidir exatamente com o total dos recibos eletrónicos emitidos
                durante o ano. A AT faz este cruzamento automaticamente.
              </li>
              <li>
                <strong>Artigo matricial errado</strong> — verificar sempre o artigo na caderneta
                predial, não em documentos antigos.
              </li>
              <li>
                <strong>Esquecer imóveis com contrato de curta duração</strong> — mesmo que o
                arrendamento tenha durado apenas um mês, os rendimentos têm de ser declarados.
              </li>
              <li>
                <strong>Não declarar despesas dedutíveis</strong> — obras, seguros e IMI podem
                reduzir significativamente o imposto a pagar. Não declarar estas despesas é
                dinheiro perdido.
              </li>
              <li>
                <strong>Confundir regime fiscal</strong> — selecionar taxa autónoma quando
                qualificaria para a taxa de 10% pode resultar em pagamento de mais imposto
                do que o necessário.
              </li>
            </ul>

            <h2 id="coimas">8. Coimas por entrega fora de prazo</h2>

            <p>
              A entrega do Modelo 2 fora do prazo legal está sujeita às seguintes coimas:
            </p>

            <div className="not-prose overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-semibold text-gray-700">Situação</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Coima (mínimo)</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Coima (máximo)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="p-3 text-gray-800">Entrega fora de prazo</td>
                    <td className="p-3 text-gray-800">75 €</td>
                    <td className="p-3 text-gray-800">375 €</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3 text-gray-800">Falta de entrega (omissão total)</td>
                    <td className="p-3 text-gray-800">200 €</td>
                    <td className="p-3 text-gray-800">2.500 €</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-gray-800">Declaração com incorreções</td>
                    <td className="p-3 text-gray-800">375 €</td>
                    <td className="p-3 text-gray-800">22.500 €</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              Em caso de entrega espontânea (antes de qualquer notificação da AT), as coimas
              são reduzidas a metade. Se receber uma notificação da AT antes de regularizar,
              as coimas aplicam-se na totalidade.
            </p>

            <div className="not-prose bg-emerald-50 border border-emerald-200 rounded-xl p-6 my-8">
              <h3 className="text-lg font-semibold text-emerald-900 mb-2">
                Tenha todos os dados prontos antes do prazo
              </h3>
              <p className="text-emerald-700 mb-4">
                O Senhorio guarda o histórico completo de rendas recebidas, organizado por
                propriedade e por ano. Quando chegar a altura de preencher o Modelo 2 ou
                o Anexo F, tem todos os números num segundo.
              </p>
              <Link
                href="/#waitlist"
                className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition"
              >
                Entrar na Lista de Espera →
              </Link>
            </div>

            <h2 id="faq">9. Perguntas frequentes</h2>

            <h3>O Modelo 2 substitui o Anexo F da declaração de IRS?</h3>
            <p>
              Não. São duas obrigações distintas. O Modelo 2 é uma comunicação de rendimentos
              prediais específica para proprietários de imóveis arrendados. O Anexo F da
              declaração de IRS (Modelo 3) é onde esses rendimentos são efetivamente tributados.
              Ambos devem ser submetidos.
            </p>

            <h3>E se a AT já pré-preencheu os dados no Anexo F?</h3>
            <p>
              Isso acontece quando a AT cruza os dados dos recibos eletrónicos com a sua
              declaração. Mesmo assim, deve verificar se os valores estão corretos e se
              todas as despesas dedutíveis foram incluídas. O pré-preenchimento não é
              automático para as despesas.
            </p>

            <h3>Posso corrigir uma declaração já submetida?</h3>
            <p>
              Sim. Pode submeter uma declaração de substituição no Portal das Finanças.
              Se a correção resultar em imposto a pagar adicional, pode haver lugar a juros
              compensatórios. Se resultar em imposto a receber (por ter declarado despesas
              que não incluiu na primeira vez), receberá a diferença.
            </p>

            <h3>Tenho de declarar um imóvel que não foi arrendado o ano inteiro?</h3>
            <p>
              Só tem de declarar os meses em que o imóvel esteve efetivamente arrendado e
              gerou rendimento. Se esteve devoluto todo o ano, não há rendimento a declarar
              no Modelo 2 (embora possa existir obrigação de pagar IMI).
            </p>

            <h3>Como funciona com contratos de arrendamento de curta duração (Airbnb)?</h3>
            <p>
              Os rendimentos de alojamento local não são declarados como rendimentos prediais
              (Categoria F) mas como rendimentos empresariais e profissionais (Categoria B).
              O Modelo 2 aplica-se apenas ao arrendamento tradicional, não ao alojamento local.
            </p>
          </div>

          {/* Related links */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Artigos relacionados</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/blog/declaracao-irs-arrendamento-2026-guia-completo" className="block p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                <p className="font-medium text-gray-900 text-sm">Declaração IRS Arrendamento 2026: Guia Completo Passo a Passo</p>
                <p className="text-gray-500 text-xs mt-1">Anexo F, Portal das Finanças e estratégias de otimização fiscal</p>
              </Link>
              <Link href="/blog/despesas-dedutiveis-arrendamento-2026" className="block p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                <p className="font-medium text-gray-900 text-sm">Despesas Dedutíveis no Arrendamento 2026</p>
                <p className="text-gray-500 text-xs mt-1">O que pode e não pode deduzir no IRS</p>
              </Link>
              <Link href="/blog/recibos-renda-eletronicos-guia-2026" className="block p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                <p className="font-medium text-gray-900 text-sm">Recibos de Renda Eletrónicos: Guia Completo 2026</p>
                <p className="text-gray-500 text-xs mt-1">Como emitir, prazos, coimas e automatização</p>
              </Link>
              <Link href="/blog/registo-contrato-arrendamento-at-2026" className="block p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                <p className="font-medium text-gray-900 text-sm">Registo de Contrato de Arrendamento na AT 2026</p>
                <p className="text-gray-500 text-xs mt-1">Prazos obrigatórios e passo a passo no Portal das Finanças</p>
              </Link>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
