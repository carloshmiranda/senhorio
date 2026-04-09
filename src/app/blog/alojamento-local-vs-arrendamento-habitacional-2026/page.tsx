import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alojamento Local vs Arrendamento Habitacional 2026: Qual Rende Mais? | Senhorio",
  description: "Comparação detalhada entre alojamento local e arrendamento habitacional em Portugal 2026. Fiscalidade, rentabilidade, trabalho envolvido e regulação. Com cálculos reais.",
  keywords: [
    "alojamento local vs arrendamento habitacional",
    "alojamento local ou arrendamento",
    "comparar al arrendamento portugal",
    "alojamento local rentável 2026",
    "arrendamento habitacional vs al",
    "impostos alojamento local portugal",
    "al vs arrendamento longo prazo",
    "vantagens arrendamento habitacional",
    "vantagens alojamento local",
    "airbnb vs arrendamento portugal 2026",
  ],
  openGraph: {
    title: "Alojamento Local vs Arrendamento Habitacional 2026: Qual Rende Mais?",
    description: "Comparação honesta com números reais: fiscalidade, rentabilidade líquida, regulação e esforço operacional de cada modelo. Decida com informação.",
    type: "article",
    publishedTime: "2026-04-09T10:00:00.000Z",
  },
  alternates: {
    canonical: "https://senhorio.vercel.app/blog/alojamento-local-vs-arrendamento-habitacional-2026",
  },
};

export default function AlojamentoLocalVsArrendamentoPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-700 transition">
            ← Voltar ao Blog
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <article>
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full font-medium">
                Comparação
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
                Alojamento Local
              </span>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm rounded-full font-medium">
                Análise 2026
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Alojamento Local vs Arrendamento Habitacional em Portugal: Qual Rende Mais em 2026?
            </h1>

            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              Em bruto, o alojamento local parece sempre ganhar — a diária no Airbnb é muito
              superior a uma mensalidade de arrendamento. Mas depois de contar impostos,
              custos operacionais, vagas, regulação camarária e esforço de gestão, a conta
              muda. Este artigo faz a comparação honesta com números reais de 2026.
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500 border-l-4 border-orange-500 pl-4">
              <time dateTime="2026-04-09T10:00:00.000Z">9 de abril de 2026</time>
              <span>•</span>
              <span>15 minutos de leitura</span>
            </div>
          </header>

          <div className="prose prose-gray prose-lg max-w-none">
            {/* CTA */}
            <div className="not-prose bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                Gerir rendas de arrendamento não tem de ser complicado
              </h3>
              <p className="text-indigo-700 mb-4">
                O Senhorio trata dos recibos, do IRS e dos prazos legais para senhorios
                com arrendamento habitacional. Feito para o contexto português.
              </p>
              <Link
                href="/#waitlist"
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
              >
                Entrar na Lista de Espera →
              </Link>
            </div>

            {/* Table of Contents */}
            <nav className="not-prose bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Índice</h3>
              <ol className="space-y-2 text-sm">
                <li><a href="#diferenca-fundamental" className="text-blue-600 hover:text-blue-800">1. A diferença fundamental entre os dois modelos</a></li>
                <li><a href="#fiscalidade" className="text-blue-600 hover:text-blue-800">2. Fiscalidade: como cada modelo é tributado</a></li>
                <li><a href="#calculo-rentabilidade" className="text-blue-600 hover:text-blue-800">3. Simulação de rentabilidade líquida com o mesmo imóvel</a></li>
                <li><a href="#custos-operacionais" className="text-blue-600 hover:text-blue-800">4. Custos operacionais — o que raramente se conta</a></li>
                <li><a href="#regulacao" className="text-blue-600 hover:text-blue-800">5. Regulação: zonas de contenção e restrições ao AL</a></li>
                <li><a href="#esforco-gestao" className="text-blue-600 hover:text-blue-800">6. Esforço de gestão: o fator que as contas ignoram</a></li>
                <li><a href="#quando-escolher" className="text-blue-600 hover:text-blue-800">7. Quando escolher cada modelo</a></li>
                <li><a href="#faq" className="text-blue-600 hover:text-blue-800">8. Perguntas frequentes</a></li>
              </ol>
            </nav>

            <h2 id="diferenca-fundamental">1. A diferença fundamental entre os dois modelos</h2>

            <p>
              O <strong>arrendamento habitacional</strong> é um contrato de longa duração
              (mínimo 1 ano) em que o imóvel é cedido a um inquilino para habitação permanente,
              com renda mensal fixa. O senhorio tem rendimento previsível, mas perde flexibilidade
              sobre o imóvel.
            </p>

            <p>
              O <strong>alojamento local (AL)</strong> é a exploração turística do imóvel para
              estadas de curta duração — normalmente através de plataformas como Airbnb ou
              Booking. O proprietário cobra por noite, o que permite preços muito superiores
              à renda mensal equivalente. Em contrapartida, o imóvel está vago entre reservas,
              a gestão é intensiva e a rentabilidade é volátil.
            </p>

            <div className="not-prose overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Fator</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Arrendamento Habitacional</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Alojamento Local</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3">Duração</td>
                    <td className="border border-gray-200 px-4 py-3">Mínimo 1 ano</td>
                    <td className="border border-gray-200 px-4 py-3">Por noite / semana</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3">Receita</td>
                    <td className="border border-gray-200 px-4 py-3">Fixa e previsível</td>
                    <td className="border border-gray-200 px-4 py-3">Variável — sazonal</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3">Regime fiscal</td>
                    <td className="border border-gray-200 px-4 py-3">Rendimento Predial (Cat. F)</td>
                    <td className="border border-gray-200 px-4 py-3">Rendimento Empresarial (Cat. B)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3">Taxa máxima de IRS</td>
                    <td className="border border-gray-200 px-4 py-3">25% (geral) ou 10%/0% com benefícios</td>
                    <td className="border border-gray-200 px-4 py-3">Taxas progressivas até 53% (englobado)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3">Gestão operacional</td>
                    <td className="border border-gray-200 px-4 py-3">Reduzida</td>
                    <td className="border border-gray-200 px-4 py-3">Alta (check-ins, limpeza, avaliações)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3">Proteção legal (proprietário)</td>
                    <td className="border border-gray-200 px-4 py-3">Moderada</td>
                    <td className="border border-gray-200 px-4 py-3">Alta (pode cancelar a qualquer momento)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3">Restrições camarárias</td>
                    <td className="border border-gray-200 px-4 py-3">Nenhumas de regra</td>
                    <td className="border border-gray-200 px-4 py-3">Crescentes (zonas de contenção)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 id="fiscalidade">2. Fiscalidade: como cada modelo é tributado</h2>

            <h3>Arrendamento habitacional — Categoria F</h3>

            <p>
              Os rendimentos de arrendamento habitacional são tributados como <strong>rendimento
              predial (Categoria F)</strong>. Em 2026, o regime fiscal para senhorios tem
              três opções principais:
            </p>

            <ul>
              <li>
                <strong>Taxa autónoma geral de 25%</strong> — aplicável à maioria dos senhorios,
                sobre o rendimento líquido de despesas dedutíveis.
              </li>
              <li>
                <strong>Taxa reduzida de 10%</strong> — para rendas moderadas até €2.300/mês,
                com contrato mínimo de 2 anos e renda ≤ 1,1× o valor máximo do RABC.
              </li>
              <li>
                <strong>Taxa RSAA de 0%</strong> — para arrendamento acessível com renda até
                20% abaixo dos valores de referência municipais.
              </li>
            </ul>

            <p>
              Para perceber como funcionam estes regimes em detalhe, consulte:{" "}
              <Link href="/blog/irs-2026-guia-completo" className="text-blue-600 hover:text-blue-800">
                IRS 2026 para Senhorios: Guia Completo
              </Link>.
            </p>

            <h3>Alojamento local — Categoria B</h3>

            <p>
              Os rendimentos de AL são tratados como <strong>rendimentos empresariais e
              profissionais (Categoria B)</strong>. Há duas modalidades:
            </p>

            <ul>
              <li>
                <strong>Regime simplificado</strong> — tributa 35% dos rendimentos brutos
                como rendimento líquido presumido (para imóveis em zonas de pressão urbanística,
                o coeficiente sobe para 50%). Este valor é depois englobado e tributado às
                taxas progressivas do IRS.
              </li>
              <li>
                <strong>Contabilidade organizada</strong> — tributação sobre o lucro real,
                com dedução de todas as despesas comprovadas. Exige contabilista certificado.
              </li>
            </ul>

            <div className="not-prose bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
              <p className="text-sm font-semibold text-amber-800 mb-1">Coeficientes do regime simplificado (AL):</p>
              <p className="text-sm text-amber-700">
                Zona normal: 35% dos rendimentos brutos = rendimento tributável.<br />
                Zona de pressão urbanística (ex.: centros históricos de Lisboa, Porto, Cascais,
                Sintra): 50% dos rendimentos brutos = rendimento tributável.<br />
                Este valor é depois englobado às restantes receitas e tributado às taxas
                progressivas — que podem chegar a 53% nos escalões mais altos.
              </p>
            </div>

            <h2 id="calculo-rentabilidade">3. Simulação de rentabilidade líquida com o mesmo imóvel</h2>

            <p>
              Para comparar, usemos um T2 em Lisboa avaliado em €300.000, com as seguintes
              hipóteses de mercado (conservadoras):
            </p>

            <ul>
              <li><strong>Arrendamento habitacional:</strong> renda de €1.200/mês (€14.400/ano)</li>
              <li><strong>Alojamento local:</strong> 70% de taxa de ocupação a €120/noite média
                = 255 noites × €120 = €30.600/ano bruto</li>
            </ul>

            <div className="not-prose overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold"></th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Arrendamento (10% taxa)</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">AL (regime simplificado, zona normal)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3">Receita bruta</td>
                    <td className="border border-gray-200 px-4 py-3">€14.400</td>
                    <td className="border border-gray-200 px-4 py-3">€30.600</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3">Custos operacionais estimados</td>
                    <td className="border border-gray-200 px-4 py-3">€1.200 (IMI, seguro, manutenção)</td>
                    <td className="border border-gray-200 px-4 py-3">€9.500 (limpeza, plataformas, consumos, seguro, manutenção)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3">Receita líquida antes de IRS</td>
                    <td className="border border-gray-200 px-4 py-3">€13.200</td>
                    <td className="border border-gray-200 px-4 py-3">€21.100</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3">Base tributável IRS</td>
                    <td className="border border-gray-200 px-4 py-3">€13.200 (líquido de deduções)</td>
                    <td className="border border-gray-200 px-4 py-3">€10.710 (35% × €30.600)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3">IRS estimado</td>
                    <td className="border border-gray-200 px-4 py-3">€1.320 (10%)</td>
                    <td className="border border-gray-200 px-4 py-3">€2.300–€3.800 (taxa progressiva 28–37%)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 font-semibold">Rendimento líquido final</td>
                    <td className="border border-gray-200 px-4 py-3 font-semibold text-green-700">≈ €11.880</td>
                    <td className="border border-gray-200 px-4 py-3 font-semibold text-green-700">≈ €17.300–€18.800</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="not-prose bg-blue-50 border border-blue-200 rounded-xl p-5 my-6">
              <p className="text-sm font-semibold text-blue-800 mb-1">Nota sobre esta simulação:</p>
              <p className="text-sm text-blue-700">
                Os números do AL assumem 70% de ocupação durante todo o ano, o que em muitas
                localizações fora de Lisboa e Algarve é otimista. A 50% de ocupação (que é
                mais realista para cidades médias), o rendimento líquido do AL desce para
                ≈€12.000–€14.000 — muito próximo do arrendamento habitacional, mas com muito
                mais trabalho envolvido.
              </p>
            </div>

            <h2 id="custos-operacionais">4. Custos operacionais — o que raramente se conta</h2>

            <p>
              O maior erro ao comparar AL com arrendamento é subestimar os custos reais do
              alojamento local. Aqui está o que efetivamente envolve:
            </p>

            <h3>Custos do alojamento local</h3>

            <ul>
              <li>
                <strong>Comissões das plataformas:</strong> Airbnb e Booking cobram entre
                15% e 20% do valor de cada reserva. Em €30.600 brutos, isso representa
                €4.600–€6.100/ano que saem logo do topo.
              </li>
              <li>
                <strong>Limpeza entre hóspedes:</strong> cada limpeza entre reservas custa
                €40–€80, dependendo do imóvel. Com 150 reservas anuais, podem ser
                €6.000–€12.000/ano. Mesmo que o dono faça parte das limpezas, o custo
                de oportunidade existe.
              </li>
              <li>
                <strong>Consumos:</strong> água, eletricidade e internet são habitualmente
                incluídos no preço e ficam a cargo do proprietário. Em AL, o consumo
                é imprevisível — hóspedes de verão com ar condicionado permanente podem
                duplicar a fatura de eletricidade.
              </li>
              <li>
                <strong>Desgaste acelerado:</strong> imóveis em AL desgastam muito mais
                rapidamente do que imóveis arrendados a longo prazo. Repainting, substituição
                de eletrodomésticos, roupa de cama e toalhas são custos recorrentes.
              </li>
              <li>
                <strong>Seguro específico de AL:</strong> os seguros habitacionais normais
                não cobrem atividade de AL. Um seguro adequado custa mais €200–€600/ano.
              </li>
              <li>
                <strong>Contabilidade:</strong> no regime de Categoria B, os rendimentos de
                AL obrigam frequentemente a retenção na fonte, declarações trimestrais e,
                nalguns casos, contabilidade organizada com contabilista certificado.
              </li>
            </ul>

            <h3>Custos do arrendamento habitacional</h3>

            <ul>
              <li>IMI anual (habitualmente 0,3–0,8% do VPT)</li>
              <li>Seguro de incêndio e multirriscos habitação</li>
              <li>Obras de conservação necessárias (mas muitas despesas são dedutíveis no IRS)</li>
              <li>Eventuais honorários de advogado/solicitador para litígios (raros)</li>
            </ul>

            <h2 id="regulacao">5. Regulação: zonas de contenção e restrições ao AL</h2>

            <p>
              Em 2026, a regulação do alojamento local em Portugal está em fase de endurecimento
              progressivo. O quadro legal mudou significativamente nos últimos anos:
            </p>

            <h3>Zonas de contenção</h3>
            <p>
              Os municípios podem definir <strong>zonas de contenção</strong> onde novos registos
              de AL são suspensos ou limitados. Lisboa, Porto e vários concelhos do Algarve
              já têm zonas de contenção alargadas. Nestas zonas, não é possível registar
              novos AL — quem já tem registo pode manter, mas quem quer começar pode não conseguir licença.
            </p>

            <h3>Condomínios</h3>
            <p>
              A legislação aprovada em 2023 permite que os condomínios (por maioria de dois
              terços dos votos) proíbam o exercício de AL nas frações do edifício. Esta
              tendência tem crescido — antes de investir num imóvel para AL, verifique as
              atas do condomínio.
            </p>

            <h3>Renovação obrigatória do registo</h3>
            <p>
              Os registos de AL passaram a ter validade de 5 anos, sendo necessária renovação.
              A renovação pode ser condicionada por critérios que não existiam quando o registo
              original foi feito.
            </p>

            <h3>Derrama municipal</h3>
            <p>
              Vários municípios aplicam uma contribuição extraordinária a proprietários de AL
              (a chamada "taxa turística"), que pode representar €1–€2 por dormida.
              Para imóveis com alta ocupação, este custo acumula.
            </p>

            <h2 id="esforco-gestao">6. Esforço de gestão: o fator que as contas ignoram</h2>

            <p>
              O arrendamento habitacional, uma vez estabelecido, requer pouco envolvimento
              mensal: confirmar o pagamento da renda, emitir o recibo eletrónico, e gerir
              eventuais problemas de manutenção. Em média, não são mais de 1–2 horas por mês.
            </p>

            <p>
              O alojamento local é outra realidade. Mesmo com uma plataforma de gestão, os
              proprietários com gestão própria reportam:
            </p>

            <ul>
              <li>Coordenação de check-ins e check-outs (muitos hóspedes pedem check-in tardio)</li>
              <li>Resposta a mensagens de hóspedes (frequentemente fora de horas)</li>
              <li>Coordenação de limpezas entre estadias</li>
              <li>Gestão de avaliações (respostas públicas, pedidos de revisão)</li>
              <li>Ajuste dinâmico de preços (para maximizar ocupação por temporada)</li>
              <li>Resolução de incidentes (danos, reclamações, emergências)</li>
            </ul>

            <p>
              Quem recorre a uma empresa de property management para o AL pode libertar-se
              desta carga, mas paga <strong>20–35% das receitas</strong> a essa empresa,
              o que muda substancialmente o cálculo de rentabilidade.
            </p>

            <div className="not-prose bg-gray-50 border border-gray-200 rounded-xl p-5 my-6">
              <p className="text-sm font-semibold text-gray-900 mb-2">Regra prática:</p>
              <p className="text-sm text-gray-700">
                Se gerir o AL diretamente, valorize o seu tempo. A diferença de rendimento
                entre AL e arrendamento habitacional pode ser de €5.000–€7.000/ano — mas
                se dedicar 10 horas por mês ao AL (120h/ano), isso representa um "salário"
                de €40–€58/hora pelo esforço adicional. É um bom valor, mas não é passivo.
              </p>
            </div>

            <h2 id="quando-escolher">7. Quando escolher cada modelo</h2>

            <h3>O arrendamento habitacional faz mais sentido quando:</h3>
            <ul>
              <li>Quer rendimento passivo sem envolvimento operacional</li>
              <li>O imóvel está numa cidade média ou interior (mercado de AL mais fraco)</li>
              <li>Pode beneficiar dos regimes fiscais de 10% ou RSAA 0%</li>
              <li>O imóvel está num condomínio que proíbe ou pode proibir AL</li>
              <li>Está numa zona de contenção camarária</li>
              <li>Quer proteger o imóvel do desgaste acelerado</li>
              <li>Tem outros rendimentos elevados (o arrendamento tem taxas mais previsíveis)</li>
            </ul>

            <h3>O alojamento local faz mais sentido quando:</h3>
            <ul>
              <li>O imóvel está numa localização turística premium (Lisboa histórica, Algarve, Douro, centros históricos)</li>
              <li>Tem disponibilidade e perfil para a gestão operacional</li>
              <li>Quer flexibilidade para usar o imóvel ocasionalmente</li>
              <li>A diferença de rendimento bruto é muito expressiva (3× ou mais)</li>
              <li>Já tem outros imóveis com arrendamento longo e quer diversificar</li>
            </ul>

            <h3>A solução híbrida</h3>
            <p>
              Alguns proprietários optam por ter parte do portefólio em AL (imóveis em
              localizações turísticas de topo) e parte em arrendamento habitacional (imóveis
              em cidades médias ou habitação de baixo valor turístico). Esta diversificação
              combina rendimento máximo onde faz sentido com estabilidade e menor trabalho
              onde o diferencial não justifica o esforço.
            </p>

            <h2 id="faq">8. Perguntas frequentes</h2>

            <h3>Posso converter um arrendamento em AL ou vice-versa?</h3>
            <p>
              Sim, mas há procedimentos a seguir. Para passar de arrendamento para AL, tem
              de esperar pelo fim do contrato (ou chegar a acordo com o inquilino), registar
              o imóvel na plataforma da AT, e verificar se a localização permite novos registos.
              Para o inverso (AL para arrendamento), basta cancelar o registo de AL e celebrar
              o contrato de arrendamento — é mais simples.
            </p>

            <h3>O arrendamento estudantil é diferente?</h3>
            <p>
              Sim. O arrendamento para estudantes é tratado como arrendamento habitacional
              para efeitos fiscais, mas tem algumas especificidades no NRAU (prazos de contrato,
              causas de denúncia). Pode beneficiar das mesmas taxas reduzidas de IRS se cumprir
              os requisitos de renda moderada.
            </p>

            <h3>E se o imóvel estiver em propriedade horizontal — o condomínio pode proibir o AL?</h3>
            <p>
              Sim. Desde 2023, os condomínios têm este poder por deliberação em assembleia
              (dois terços dos votos). Se já tem AL num condomínio, verifique os seus estatutos.
              Se quer adquirir um imóvel para AL, verifique as atas das últimas assembleias
              e o regulamento do condomínio antes de comprar.
            </p>

            <h3>O NHR (Residente Não Habitual) muda a equação?</h3>
            <p>
              Se for residente não habitual, os rendimentos de fonte estrangeira têm tratamento
              diferente, mas para rendimentos de imóveis em Portugal tanto o arrendamento como
              o AL são sempre tributados em Portugal, independentemente do estatuto fiscal do
              proprietário.
            </p>

            {/* Final CTA */}
            <div className="not-prose bg-indigo-50 border border-indigo-200 rounded-xl p-6 mt-10">
              <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                Simplicidade na gestão do arrendamento habitacional
              </h3>
              <p className="text-indigo-700 mb-4">
                Se optou pelo arrendamento habitacional, o Senhorio trata das obrigações
                legais — recibos eletrónicos, controlo de pagamentos, prazos de IRS e alertas
                de atualização de renda. Tudo feito para a realidade portuguesa.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/#waitlist"
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
                >
                  Entrar na Lista de Espera →
                </Link>
                <Link
                  href="/simulador-irs"
                  className="inline-flex items-center px-4 py-2 bg-white text-indigo-700 border border-indigo-300 rounded-lg font-medium hover:bg-indigo-50 transition"
                >
                  Simular impostos →
                </Link>
              </div>
            </div>

            {/* Related articles */}
            <div className="not-prose mt-10 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Artigos relacionados</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Link href="/blog/irs-2026-guia-completo" className="block p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
                  <p className="font-medium text-gray-900 mb-1">IRS 2026 para Senhorios</p>
                  <p className="text-sm text-gray-600">Guia completo com simulador fiscal</p>
                </Link>
                <Link href="/blog/despesas-dedutiveis-arrendamento-2026" className="block p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
                  <p className="font-medium text-gray-900 mb-1">Despesas Dedutíveis 2026</p>
                  <p className="text-sm text-gray-600">O que pode declarar no IRS</p>
                </Link>
                <Link href="/blog/contrato-arrendamento-habitacional-2026" className="block p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
                  <p className="font-medium text-gray-900 mb-1">Contrato de Arrendamento 2026</p>
                  <p className="text-sm text-gray-600">Cláusulas obrigatórias e registo</p>
                </Link>
                <Link href="/blog/software-gestao-arrendamento-portugal-2026" className="block p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
                  <p className="font-medium text-gray-900 mb-1">Software de Gestão 2026</p>
                  <p className="text-sm text-gray-600">O que deve ter uma boa plataforma</p>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
