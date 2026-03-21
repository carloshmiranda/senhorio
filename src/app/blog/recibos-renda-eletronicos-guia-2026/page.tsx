import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recibos de Renda Eletrónicos: Guia Completo 2026 | Senhorio",
  description: "Guia completo sobre recibos de renda eletrónicos em Portugal 2026. Como emitir no Portal das Finanças, campos obrigatórios, prazos legais, coimas e alternativas digitais.",
  keywords: [
    "recibos de renda eletrónicos",
    "emitir recibo renda",
    "recibo arrendamento Portal Finanças",
    "recibo renda eletrónico 2026",
    "como emitir recibo arrendamento",
    "recibo renda online Portugal",
    "obrigação recibo eletrónico senhorio",
    "portal finanças arrendamento",
  ],
  openGraph: {
    title: "Recibos de Renda Eletrónicos: Guia Completo 2026",
    description: "Tudo o que precisa saber sobre recibos de renda eletrónicos em Portugal. Emissão, prazos, coimas e automatização.",
    type: "article",
    publishedTime: "2026-03-21T14:00:00.000Z",
  },
  alternates: {
    canonical: "https://senhorio.vercel.app/blog/recibos-renda-eletronicos-guia-2026",
  },
};

export default function RecibosRendaEletronicosPage() {
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
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm rounded-full font-medium">
                Recibos Eletrónicos
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">
                Portal Finanças
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full font-medium">
                Guia 2026
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Recibos de Renda Eletrónicos: Guia Completo para Senhorios 2026
            </h1>

            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              Tudo o que precisa saber sobre a emissão de recibos de renda eletrónicos em Portugal.
              Obrigações legais, passo a passo no Portal das Finanças, campos obrigatórios, prazos,
              coimas por incumprimento e como automatizar o processo.
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500 border-l-4 border-emerald-500 pl-4">
              <time dateTime="2026-03-21T14:00:00.000Z">
                21 de março de 2026
              </time>
              <span>•</span>
              <span>15 minutos de leitura</span>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-gray prose-lg max-w-none">
            {/* Waitlist CTA */}
            <div className="not-prose bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-emerald-900 mb-2">
                🚀 Automatize os Seus Recibos de Renda
              </h3>
              <p className="text-emerald-700 mb-4">
                O Senhorio está a desenvolver emissão automática de recibos eletrónicos.
                Junte-se à lista de espera e seja dos primeiros a usar.
              </p>
              <Link
                href="/#waitlist"
                className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition"
              >
                Entrar na Lista de Espera →
              </Link>
            </div>

            {/* Table of Contents */}
            <nav className="not-prose bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Índice</h3>
              <ol className="space-y-2 text-sm">
                <li><a href="#obrigacao-legal" className="text-blue-600 hover:text-blue-800">1. Obrigação Legal: Quem Deve Emitir Recibos Eletrónicos</a></li>
                <li><a href="#portal-financas" className="text-blue-600 hover:text-blue-800">2. Como Aceder ao Portal das Finanças</a></li>
                <li><a href="#passo-a-passo" className="text-blue-600 hover:text-blue-800">3. Passo a Passo: Emitir um Recibo</a></li>
                <li><a href="#campos-obrigatorios" className="text-blue-600 hover:text-blue-800">4. Campos Obrigatórios do Recibo</a></li>
                <li><a href="#prazos-legais" className="text-blue-600 hover:text-blue-800">5. Prazos Legais para Emissão</a></li>
                <li><a href="#coimas-penalizacoes" className="text-blue-600 hover:text-blue-800">6. Coimas e Penalizações</a></li>
                <li><a href="#situacoes-especiais" className="text-blue-600 hover:text-blue-800">7. Situações Especiais</a></li>
                <li><a href="#retificacao-anulacao" className="text-blue-600 hover:text-blue-800">8. Retificação e Anulação de Recibos</a></li>
                <li><a href="#irs-declaracao" className="text-blue-600 hover:text-blue-800">9. Recibos e Declaração de IRS</a></li>
                <li><a href="#automatizacao" className="text-blue-600 hover:text-blue-800">10. Automatização: O Futuro dos Recibos</a></li>
                <li><a href="#faq" className="text-blue-600 hover:text-blue-800">11. Perguntas Frequentes</a></li>
              </ol>
            </nav>

            <h2 id="obrigacao-legal">1. Obrigação Legal: Quem Deve Emitir Recibos Eletrónicos</h2>

            <p>
              Desde 2015, <strong>todos os senhorios em Portugal são obrigados a emitir recibos
              de renda eletrónicos</strong> através do Portal das Finanças da Autoridade Tributária
              e Aduaneira (AT). Esta obrigação aplica-se independentemente do valor da renda ou
              do tipo de contrato.
            </p>

            <p>
              A obrigação está prevista no <strong>artigo 115.º do Código do IRS</strong> e aplica-se a:
            </p>

            <ul>
              <li>Todos os rendimentos prediais (Categoria F do IRS)</li>
              <li>Contratos de arrendamento habitacional</li>
              <li>Contratos de arrendamento comercial (não habitacional)</li>
              <li>Subarrendamento</li>
              <li>Cedência de uso de imóvel</li>
            </ul>

            <div className="not-prose bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
              <h4 className="text-blue-900 font-semibold mb-2">💡 Quem está dispensado?</h4>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>• Senhorios com idade igual ou superior a <strong>65 anos</strong> que não disponham de acesso à internet (devem comunicar à AT)</li>
                <li>• Senhorios com <strong>incapacidade reconhecida</strong> que impossibilite o uso de meios digitais</li>
                <li>• Nestes casos, podem emitir recibos em papel, mas devem comunicar os rendimentos à AT por outros meios</li>
              </ul>
            </div>

            <h2 id="portal-financas">2. Como Aceder ao Portal das Finanças</h2>

            <p>
              Para emitir recibos eletrónicos, necessita de acesso ao <strong>Portal das Finanças</strong>
              da AT. Existem duas formas de autenticação:
            </p>

            <h3>Opção 1: Credenciais do Portal das Finanças</h3>
            <p>
              Use o seu NIF (número de identificação fiscal) e a senha de acesso ao Portal das
              Finanças. Se ainda não tem senha, pode solicitá-la online ou presencialmente num
              serviço de finanças. A senha é enviada por correio para a morada fiscal registada.
            </p>

            <h3>Opção 2: Chave Móvel Digital (CMD)</h3>
            <p>
              A <strong>Chave Móvel Digital</strong> é o método mais prático e seguro. Permite
              autenticação via telemóvel (SMS ou app Autenticação.Gov). Pode ativar a CMD:
            </p>

            <ul>
              <li>Online em <code>autenticacao.gov.pt</code> (com leitor de Cartão de Cidadão)</li>
              <li>Presencialmente em Lojas do Cidadão, balcões do IRN, ou juntas de freguesia</li>
              <li>Via app <strong>id.gov.pt</strong> com NFC e Cartão de Cidadão</li>
            </ul>

            <div className="not-prose bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
              <h4 className="text-yellow-900 font-semibold mb-2">⚠️ Dica Importante</h4>
              <p className="text-yellow-800 text-sm">
                Antes de tentar emitir recibos, certifique-se de que o seu contrato de arrendamento
                está <strong>registado no Portal das Finanças</strong>. Sem o registo do contrato,
                não poderá emitir recibos eletrónicos. O registo deve ser feito no prazo de 30 dias
                após a celebração do contrato.
              </p>
            </div>

            <h2 id="passo-a-passo">3. Passo a Passo: Emitir um Recibo no Portal das Finanças</h2>

            <p>
              Siga estes passos para emitir um recibo de renda eletrónico:
            </p>

            <div className="not-prose space-y-4 mb-6">
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Aceda ao Portal das Finanças</h4>
                    <p className="text-gray-600 text-sm">
                      Vá a <code>portaldasfinancas.gov.pt</code> e faça login com as suas credenciais
                      ou Chave Móvel Digital.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Navegue para Arrendamento</h4>
                    <p className="text-gray-600 text-sm">
                      No menu principal, selecione <strong>Cidadãos → Arrendamento → Emitir Recibo</strong>.
                      Em alternativa, pesquise &quot;recibos de renda&quot; na barra de pesquisa do portal.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Selecione o contrato</h4>
                    <p className="text-gray-600 text-sm">
                      O portal apresenta a lista dos seus contratos registados. Selecione o contrato
                      para o qual pretende emitir o recibo. Se não vê o contrato, pode ser necessário
                      registá-lo primeiro.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm">4</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Preencha os dados do recibo</h4>
                    <p className="text-gray-600 text-sm">
                      Indique o <strong>mês de referência</strong>, o <strong>valor recebido</strong>,
                      a <strong>data de recebimento</strong> e o <strong>tipo de recibo</strong>
                      (renda, compensação, caução, etc.). Os dados do inquilino e do imóvel são
                      pré-preenchidos a partir do contrato.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm">5</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Confirme e emita</h4>
                    <p className="text-gray-600 text-sm">
                      Reveja todos os dados e clique em <strong>&quot;Emitir&quot;</strong>. O recibo fica
                      imediatamente disponível para si e para o inquilino no Portal das Finanças.
                      Pode descarregar o PDF para os seus registos.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm">6</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Guarde o comprovativo</h4>
                    <p className="text-gray-600 text-sm">
                      Descarregue o recibo em PDF e guarde-o nos seus ficheiros. Embora o recibo
                      fique armazenado no portal, é boa prática manter cópias locais organizadas
                      por ano e por imóvel.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h2 id="campos-obrigatorios">4. Campos Obrigatórios do Recibo</h2>

            <p>
              Um recibo de renda eletrónico válido deve conter os seguintes campos:
            </p>

            <div className="not-prose overflow-x-auto mb-6">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Campo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Descrição</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Exemplo</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">NIF do senhorio</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Preenchido automaticamente</td>
                    <td className="px-6 py-4 text-sm text-gray-500">123 456 789</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">NIF do inquilino</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Do contrato registado</td>
                    <td className="px-6 py-4 text-sm text-gray-500">987 654 321</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Morada do imóvel</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Endereço completo do imóvel arrendado</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Rua das Flores, 42, 3.º Dto</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Artigo matricial</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Identificação na caderneta predial</td>
                    <td className="px-6 py-4 text-sm text-gray-500">U-1234, Fração C</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Período</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Mês e ano de referência</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Janeiro 2026</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Valor recebido</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Montante efetivamente recebido</td>
                    <td className="px-6 py-4 text-sm text-gray-500">€850,00</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Data de recebimento</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Data em que recebeu o pagamento</td>
                    <td className="px-6 py-4 text-sm text-gray-500">05/01/2026</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Tipo de rendimento</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Renda, compensação, caução, etc.</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Renda</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Retenção na fonte</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Se aplicável (inquilino empresa)</td>
                    <td className="px-6 py-4 text-sm text-gray-500">€212,50 (25%)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 id="prazos-legais">5. Prazos Legais para Emissão</h2>

            <p>
              Os prazos para emissão de recibos de renda eletrónicos são definidos por lei e o
              seu incumprimento pode resultar em coimas.
            </p>

            <div className="not-prose grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <h4 className="text-emerald-900 font-semibold mb-3">Prazo geral</h4>
                <p className="text-emerald-800 text-sm mb-2">
                  O recibo deve ser emitido <strong>até ao dia 5 do mês seguinte</strong> ao
                  recebimento da renda.
                </p>
                <p className="text-emerald-700 text-xs">
                  Exemplo: Renda de janeiro recebida a 3 de janeiro → emitir recibo até 5 de fevereiro.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h4 className="text-blue-900 font-semibold mb-3">Prazo para registo do contrato</h4>
                <p className="text-blue-800 text-sm mb-2">
                  O contrato de arrendamento deve ser comunicado à AT no prazo de <strong>30 dias</strong>
                  após a celebração.
                </p>
                <p className="text-blue-700 text-xs">
                  O registo é pré-requisito para a emissão de recibos eletrónicos.
                </p>
              </div>
            </div>

            <div className="not-prose bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
              <h4 className="text-yellow-900 font-semibold mb-2">⚠️ Atenção: Meses Atrasados</h4>
              <p className="text-yellow-800 text-sm">
                Se se esqueceu de emitir recibos de meses anteriores, pode emiti-los retroativamente
                no Portal das Finanças. No entanto, a emissão fora de prazo pode levar a uma
                notificação da AT. Recomendamos regularizar a situação o mais rapidamente possível
                e, se necessário, contactar o serviço de finanças da sua área.
              </p>
            </div>

            <h2 id="coimas-penalizacoes">6. Coimas e Penalizações</h2>

            <p>
              O incumprimento da obrigação de emissão de recibos eletrónicos constitui uma
              <strong> infração tributária</strong> prevista no Regime Geral das Infrações
              Tributárias (RGIT). As consequências podem ser significativas:
            </p>

            <div className="not-prose space-y-4 mb-6">
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h4 className="text-red-900 font-semibold mb-3">Coimas por não emissão de recibos</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-red-900 font-medium text-sm">Pessoa singular</p>
                    <p className="text-red-600 text-2xl font-bold">€150 - €3.750</p>
                    <p className="text-red-700 text-xs mt-1">Por cada infração</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-red-900 font-medium text-sm">Pessoa coletiva</p>
                    <p className="text-red-600 text-2xl font-bold">€300 - €7.500</p>
                    <p className="text-red-700 text-xs mt-1">Por cada infração</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <h4 className="text-orange-900 font-semibold mb-2">Outras consequências</h4>
                <ul className="text-orange-800 space-y-1 text-sm">
                  <li>• <strong>Falta de registo do contrato:</strong> Coima de €150 a €3.750 + impossibilidade de emitir recibos</li>
                  <li>• <strong>Rendimentos não declarados:</strong> Tributação oficiosa pela AT com base em valores de mercado</li>
                  <li>• <strong>Reincidência:</strong> Agravamento das coimas em 25%</li>
                  <li>• <strong>Custas processuais:</strong> Se a AT instaurar processo de contraordenação</li>
                </ul>
              </div>
            </div>

            <p>
              Note que a AT tem vindo a intensificar a <strong>fiscalização cruzada</strong>:
              compara os dados dos recibos emitidos com os contratos registados, as declarações
              de IRS e até com informação de consumos de água e eletricidade para detetar
              arrendamentos não declarados.
            </p>

            <h2 id="situacoes-especiais">7. Situações Especiais</h2>

            <h3>Vários inquilinos no mesmo imóvel</h3>
            <p>
              Quando o contrato tem <strong>mais do que um inquilino</strong> (por exemplo, um
              casal), o recibo é emitido em nome de todos os titulares do contrato. O portal
              permite adicionar os NIF de todos os inquilinos.
            </p>

            <h3>Vários senhorios (compropriedade)</h3>
            <p>
              Se o imóvel pertence a <strong>vários proprietários</strong>, cada um deve emitir
              recibo pela sua quota-parte. Exemplo: dois proprietários com 50% cada devem emitir
              recibos separados, cada um pelo valor correspondente a metade da renda.
            </p>

            <h3>Retenção na fonte</h3>
            <p>
              Quando o inquilino é uma <strong>pessoa coletiva</strong> (empresa), é obrigatório
              fazer retenção na fonte de <strong>25%</strong> sobre o valor da renda. O recibo
              deve refletir o valor bruto, a retenção e o valor líquido recebido.
            </p>

            <div className="not-prose border border-gray-200 rounded-xl p-6 mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Exemplo: Retenção na Fonte</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-center">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-500">Renda bruta</p>
                  <p className="text-gray-900 text-xl font-bold">€1.000,00</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <p className="text-red-500">Retenção (25%)</p>
                  <p className="text-red-600 text-xl font-bold">- €250,00</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-green-500">Valor líquido</p>
                  <p className="text-green-600 text-xl font-bold">€750,00</p>
                </div>
              </div>
            </div>

            <h3>Rendas em atraso</h3>
            <p>
              O recibo só deve ser emitido quando a renda é <strong>efetivamente recebida</strong>.
              Se o inquilino está em atraso, não emita recibo até ao momento do pagamento. Quando
              receber o pagamento de meses em atraso, emita recibos separados para cada mês,
              indicando o período de referência correto.
            </p>

            <h3>Caução e adiantamentos</h3>
            <p>
              A <strong>caução</strong> (depósito de garantia) não é uma renda — é uma garantia.
              Não precisa de emitir recibo de renda pela caução. No entanto, se a caução for
              aplicada para cobrir rendas em dívida, deve emitir recibo nesse momento, selecionando
              o tipo &quot;Caução&quot; no portal.
            </p>

            <h2 id="retificacao-anulacao">8. Retificação e Anulação de Recibos</h2>

            <p>
              Erros acontecem. O Portal das Finanças permite corrigir recibos emitidos com dados
              incorretos:
            </p>

            <div className="not-prose grid md:grid-cols-2 gap-6 mb-6">
              <div className="border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Retificação</h4>
                <p className="text-gray-600 text-sm mb-2">
                  Para corrigir dados como o valor ou a data de recebimento. Emita um novo recibo
                  com os dados corretos e anule o anterior.
                </p>
                <ul className="text-gray-500 text-sm space-y-1">
                  <li>• Aceda a &quot;Consultar Recibos&quot;</li>
                  <li>• Selecione o recibo a corrigir</li>
                  <li>• Clique em &quot;Substituir&quot;</li>
                  <li>• Preencha os dados corretos</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Anulação</h4>
                <p className="text-gray-600 text-sm mb-2">
                  Para casos em que o recibo foi emitido por engano (valor não recebido, contrato errado).
                </p>
                <ul className="text-gray-500 text-sm space-y-1">
                  <li>• Aceda a &quot;Consultar Recibos&quot;</li>
                  <li>• Selecione o recibo a anular</li>
                  <li>• Clique em &quot;Anular&quot;</li>
                  <li>• Indique o motivo da anulação</li>
                </ul>
              </div>
            </div>

            <div className="not-prose bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
              <h4 className="text-yellow-900 font-semibold mb-2">⚠️ Atenção: Prazo para Anulação</h4>
              <p className="text-yellow-800 text-sm">
                A anulação de recibos só é possível até ao final do prazo de entrega da declaração
                de IRS do ano a que se referem. Após esse prazo, qualquer correção exige contacto
                direto com o serviço de finanças.
              </p>
            </div>

            <h2 id="irs-declaracao">9. Recibos e Declaração de IRS</h2>

            <p>
              Os recibos eletrónicos emitidos no Portal das Finanças são <strong>automaticamente
              integrados na sua declaração de IRS</strong>. Em março/abril, quando aceder ao
              IRS Automático ou preencher a sua declaração, os rendimentos prediais aparecem
              pré-preenchidos no Anexo F.
            </p>

            <h3>O que verificar na declaração</h3>

            <ul>
              <li><strong>Anexo F:</strong> Confirme que o total de rendimentos prediais corresponde à soma dos recibos emitidos</li>
              <li><strong>Deduções:</strong> Se optou pelo englobamento, verifique se as despesas dedutíveis estão incluídas</li>
              <li><strong>Retenções:</strong> Confirme que as retenções na fonte (se aplicáveis) estão refletidas</li>
              <li><strong>Regime fiscal:</strong> Escolha o regime mais vantajoso (taxa 10%, 25% liberatória, ou englobamento)</li>
            </ul>

            <div className="not-prose bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
              <h4 className="text-green-900 font-semibold mb-2">✅ Dica: Simulador de IRS</h4>
              <p className="text-green-800 text-sm">
                Antes de submeter a declaração, use o nosso <Link href="/calculadora" className="text-green-600 underline hover:text-green-700">simulador de IRS para senhorios</Link> para
                comparar os diferentes regimes fiscais e escolher o mais vantajoso para a sua situação.
              </p>
            </div>

            <h2 id="automatizacao">10. Automatização: O Futuro dos Recibos</h2>

            <p>
              Emitir recibos manualmente todos os meses é uma tarefa repetitiva e propensa a
              erros. Com vários imóveis, o processo torna-se ainda mais moroso. A <strong>automatização</strong>
              é o futuro da gestão de arrendamento.
            </p>

            <h3>Problemas comuns da emissão manual</h3>

            <ul>
              <li>Esquecimentos que resultam em emissão fora de prazo</li>
              <li>Erros no valor (especialmente após atualizações de renda)</li>
              <li>Perda de tempo mensal com tarefas repetitivas</li>
              <li>Dificuldade em gerir múltiplos imóveis e inquilinos</li>
              <li>Falta de visão consolidada dos rendimentos</li>
            </ul>

            <h3>O que o Senhorio vai automatizar</h3>

            <p>
              O <strong>Senhorio</strong> está a desenvolver funcionalidades que vão simplificar
              drasticamente a gestão de recibos para senhorios portugueses:
            </p>

            <ul>
              <li><strong>Emissão automática:</strong> Recibos gerados e emitidos automaticamente no dia do recebimento</li>
              <li><strong>Lembretes inteligentes:</strong> Alertas quando os prazos se aproximam</li>
              <li><strong>Dashboard centralizado:</strong> Visão completa de todos os recibos, por imóvel e por inquilino</li>
              <li><strong>Exportação fiscal:</strong> Relatório anual pronto para integrar na declaração de IRS</li>
              <li><strong>Histórico completo:</strong> Arquivo organizado de todos os recibos emitidos</li>
            </ul>

            <div className="not-prose mt-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-8 text-white text-center">
              <h3 className="text-xl font-bold mb-4">
                Nunca Mais Se Esqueça de Emitir um Recibo
              </h3>
              <p className="mb-6 text-emerald-100">
                O Senhorio automatiza a emissão de recibos de renda eletrónicos.
                Junte-se à lista de espera e simplifique a sua vida como senhorio.
              </p>
              <Link
                href="/#waitlist"
                className="inline-flex items-center px-6 py-3 bg-white text-emerald-600 rounded-lg font-medium hover:bg-gray-100 transition"
              >
                Entrar na Lista de Espera →
              </Link>
            </div>

            <h2 id="faq">11. Perguntas Frequentes</h2>

            <div className="not-prose space-y-4 mb-6">
              <details className="border border-gray-200 rounded-xl overflow-hidden">
                <summary className="px-6 py-4 bg-gray-50 cursor-pointer font-medium text-gray-900 hover:bg-gray-100">
                  Posso emitir recibos em papel em vez de eletrónicos?
                </summary>
                <div className="px-6 py-4 text-sm text-gray-600">
                  Não, a emissão eletrónica é obrigatória desde 2015. Apenas senhorios com mais de
                  65 anos sem acesso à internet ou com incapacidade reconhecida estão dispensados,
                  mas devem comunicar à AT e usar meios alternativos para declarar os rendimentos.
                </div>
              </details>

              <details className="border border-gray-200 rounded-xl overflow-hidden">
                <summary className="px-6 py-4 bg-gray-50 cursor-pointer font-medium text-gray-900 hover:bg-gray-100">
                  O que acontece se o inquilino não pagar a renda?
                </summary>
                <div className="px-6 py-4 text-sm text-gray-600">
                  Se não recebeu o pagamento, não deve emitir recibo. O recibo apenas deve ser
                  emitido quando a renda é efetivamente recebida. Se mais tarde receber o
                  pagamento em atraso, emita o recibo nessa altura com a data real de recebimento
                  e o período de referência correto.
                </div>
              </details>

              <details className="border border-gray-200 rounded-xl overflow-hidden">
                <summary className="px-6 py-4 bg-gray-50 cursor-pointer font-medium text-gray-900 hover:bg-gray-100">
                  Preciso de emitir recibo pela caução?
                </summary>
                <div className="px-6 py-4 text-sm text-gray-600">
                  Não, a caução é um depósito de garantia e não constitui rendimento. Não precisa
                  de emitir recibo de renda pela caução. Só precisa de emitir recibo se a caução
                  for utilizada para cobrir rendas em dívida no final do contrato.
                </div>
              </details>

              <details className="border border-gray-200 rounded-xl overflow-hidden">
                <summary className="px-6 py-4 bg-gray-50 cursor-pointer font-medium text-gray-900 hover:bg-gray-100">
                  Como emitir recibos quando há vários proprietários?
                </summary>
                <div className="px-6 py-4 text-sm text-gray-600">
                  Cada proprietário deve emitir recibo pela sua quota-parte no imóvel. Se dois
                  proprietários têm 50% cada e a renda é €1.000, cada um emite recibo de €500.
                  O contrato deve estar registado no Portal das Finanças com a indicação de todos
                  os proprietários e respetivas quotas.
                </div>
              </details>

              <details className="border border-gray-200 rounded-xl overflow-hidden">
                <summary className="px-6 py-4 bg-gray-50 cursor-pointer font-medium text-gray-900 hover:bg-gray-100">
                  O inquilino pode ver os meus recibos no Portal das Finanças?
                </summary>
                <div className="px-6 py-4 text-sm text-gray-600">
                  Sim, o inquilino tem acesso aos recibos emitidos em seu nome no Portal das
                  Finanças, na secção de arrendamento. Isto permite-lhe confirmar os valores
                  declarados e utilizar os recibos para as suas próprias deduções fiscais.
                </div>
              </details>

              <details className="border border-gray-200 rounded-xl overflow-hidden">
                <summary className="px-6 py-4 bg-gray-50 cursor-pointer font-medium text-gray-900 hover:bg-gray-100">
                  Posso emitir recibos de meses anteriores?
                </summary>
                <div className="px-6 py-4 text-sm text-gray-600">
                  Sim, o Portal das Finanças permite emitir recibos retroativamente. No entanto,
                  recomendamos que regularize a situação rapidamente para evitar notificações da AT.
                  A emissão fora de prazo pode resultar em coimas se a AT detetar o incumprimento.
                </div>
              </details>
            </div>

            <div className="not-prose mt-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white text-center">
              <h3 className="text-xl font-bold mb-4">
                Simplifique a Gestão dos Seus Imóveis
              </h3>
              <p className="mb-6 text-blue-100">
                O Senhorio é a plataforma que automatiza recibos, calcula impostos e gere
                contratos para senhorios portugueses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/#waitlist"
                  className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition"
                >
                  Entrar na Lista de Espera
                </Link>
                <Link
                  href="/calculadora"
                  className="px-6 py-3 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-blue-600 transition"
                >
                  Usar Calculadora IRS Gratuita
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <section className="mt-16 border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Artigos Relacionados</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/blog/irs-arrendamento-2026-nova-taxa-10-porcento" className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition block">
              <h3 className="font-semibold text-gray-900 mb-2">
                IRS Arrendamento 2026: Nova Taxa de 10%
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Guia completo sobre a nova taxa fixa de 10% e comparação de regimes fiscais.
              </p>
              <span className="text-blue-600 text-sm font-medium">Ler artigo →</span>
            </Link>
            <Link href="/blog/como-calcular-atualizacoes-renda-2026" className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition block">
              <h3 className="font-semibold text-gray-900 mb-2">
                Como Calcular Atualizações de Renda 2026
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Coeficiente INE 2,24%, regras NRAU e exemplos práticos de cálculo.
              </p>
              <span className="text-blue-600 text-sm font-medium">Ler artigo →</span>
            </Link>
          </div>
        </section>
      </main>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Recibos de Renda Eletrónicos: Guia Completo para Senhorios 2026",
            "description": "Guia completo sobre recibos de renda eletrónicos em Portugal. Como emitir no Portal das Finanças, campos obrigatórios, prazos e coimas.",
            "author": {
              "@type": "Organization",
              "name": "Senhorio"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Senhorio",
              "logo": {
                "@type": "ImageObject",
                "url": "https://senhorio.vercel.app/logo.png"
              }
            },
            "datePublished": "2026-03-21T14:00:00.000Z",
            "dateModified": "2026-03-21T14:00:00.000Z",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://senhorio.vercel.app/blog/recibos-renda-eletronicos-guia-2026"
            },
            "keywords": "recibos de renda eletrónicos, emitir recibo renda, recibo arrendamento Portal Finanças, obrigação recibo senhorio",
            "articleSection": "Landlord Guide"
          })
        }}
      />
    </div>
  );
}
