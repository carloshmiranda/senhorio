import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Como Calcular Atualizações de Renda 2026: Coeficiente INE e Regras NRAU | Senhorio",
  description: "Guia completo sobre como calcular atualizações de renda em 2026. Coeficiente INE de 2,24%, regras do NRAU, contratos habitacionais e comerciais, exemplos práticos e passo a passo.",
  keywords: [
    "atualização rendas 2026",
    "coeficiente INE 2026",
    "aumento renda legal",
    "NRAU atualização renda",
    "calcular aumento renda Portugal",
    "coeficiente atualização rendas",
    "atualização renda arrendamento 2026",
    "calculadora atualização rendas",
  ],
  openGraph: {
    title: "Como Calcular Atualizações de Renda 2026: Coeficiente INE e NRAU",
    description: "Guia passo a passo para calcular atualizações de renda em 2026. Coeficiente INE, regras NRAU, exemplos práticos.",
    type: "article",
    publishedTime: "2026-03-21T12:00:00.000Z",
  },
  alternates: {
    canonical: "https://senhorio.vercel.app/blog/como-calcular-atualizacoes-renda-2026",
  },
};

export default function AtualizacoesRenda2026Page() {
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
                Atualização Rendas
              </span>
              <span className="px-3 py-1 bg-brand-100 text-brand-700 text-sm rounded-full font-medium">
                Coeficiente INE
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">
                NRAU
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Como Calcular Atualizações de Renda 2026: Guia Completo com Coeficiente INE
            </h1>

            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              Saiba como calcular legalmente o aumento de renda dos seus imóveis arrendados
              em 2026. Coeficiente INE de 2,24%, regras do NRAU, diferenças entre contratos
              habitacionais e comerciais, e exemplos práticos passo a passo.
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500 border-l-4 border-orange-500 pl-4">
              <time dateTime="2026-03-21T12:00:00.000Z">
                21 de março de 2026
              </time>
              <span>•</span>
              <span>12 minutos de leitura</span>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-gray prose-lg max-w-none">
            {/* Calculator CTA */}
            <div className="not-prose bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-orange-900 mb-2">
                🧮 Calculadora de Atualização de Rendas
              </h3>
              <p className="text-orange-700 mb-4">
                Calcule automaticamente o novo valor da sua renda com o coeficiente INE atualizado.
              </p>
              <Link
                href="/calculadora-rendas"
                className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition"
              >
                Calcular Atualização de Renda →
              </Link>
            </div>

            {/* Table of Contents */}
            <nav className="not-prose bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Índice</h3>
              <ol className="space-y-2 text-sm">
                <li><a href="#o-que-e-atualizacao" className="text-brand-600 hover:text-brand-800">1. O Que É a Atualização de Rendas?</a></li>
                <li><a href="#coeficiente-ine-2026" className="text-brand-600 hover:text-brand-800">2. Coeficiente INE 2026: O Valor Atual</a></li>
                <li><a href="#nrau-regras" className="text-brand-600 hover:text-brand-800">3. Regras do NRAU para Atualização de Rendas</a></li>
                <li><a href="#habitacional-vs-comercial" className="text-brand-600 hover:text-brand-800">4. Contratos Habitacionais vs. Comerciais</a></li>
                <li><a href="#passo-a-passo" className="text-brand-600 hover:text-brand-800">5. Passo a Passo: Como Calcular</a></li>
                <li><a href="#exemplos-praticos" className="text-brand-600 hover:text-brand-800">6. Exemplos Práticos com Cálculos</a></li>
                <li><a href="#comunicacao-inquilino" className="text-brand-600 hover:text-brand-800">7. Como Comunicar ao Inquilino</a></li>
                <li><a href="#excecoes-limites" className="text-brand-600 hover:text-brand-800">8. Exceções e Limites Legais</a></li>
                <li><a href="#historico-coeficientes" className="text-brand-600 hover:text-brand-800">9. Histórico de Coeficientes INE</a></li>
                <li><a href="#erros-comuns" className="text-brand-600 hover:text-brand-800">10. Erros Comuns a Evitar</a></li>
              </ol>
            </nav>

            <h2 id="o-que-e-atualizacao">1. O Que É a Atualização de Rendas?</h2>

            <p>
              A <strong>atualização de rendas</strong> é o mecanismo legal que permite aos senhorios
              ajustar o valor da renda ao longo do tempo, acompanhando a inflação. Em Portugal, este
              processo é regulado pelo <strong>Novo Regime do Arrendamento Urbano (NRAU)</strong> e
              baseia-se no <strong>coeficiente de atualização</strong> publicado anualmente pelo
              Instituto Nacional de Estatística (INE).
            </p>

            <p>
              Ao contrário do que muitos senhorios pensam, <strong>não é possível aumentar a renda
              livremente</strong>. O aumento está limitado ao coeficiente publicado pelo INE,
              calculado com base na variação do Índice de Preços no Consumidor (IPC). Este mecanismo
              protege tanto senhorios como inquilinos, garantindo que as rendas acompanham o custo
              de vida sem aumentos abusivos.
            </p>

            <div className="not-prose bg-brand-50 border border-brand-200 rounded-xl p-6 mb-6">
              <h4 className="text-brand-900 font-semibold mb-2">💡 Conceitos-Chave</h4>
              <ul className="text-brand-800 space-y-1 text-sm">
                <li>• <strong>Coeficiente INE:</strong> Percentagem máxima de aumento de renda, publicada anualmente</li>
                <li>• <strong>NRAU:</strong> Lei n.º 6/2006 — regime legal do arrendamento urbano</li>
                <li>• <strong>IPC:</strong> Índice de Preços no Consumidor, base do cálculo</li>
                <li>• <strong>Atualização ordinária:</strong> Aumento anual dentro do coeficiente legal</li>
              </ul>
            </div>

            <h2 id="coeficiente-ine-2026">2. Coeficiente INE 2026: O Valor Atual</h2>

            <p>
              Para o ano de 2026, o <strong>coeficiente de atualização de rendas publicado pelo INE
              é de 1,0224</strong>, o que corresponde a um aumento máximo de <strong>2,24%</strong>.
              Este valor reflete a variação do IPC nos 12 meses anteriores a agosto de 2025.
            </p>

            <p>
              O coeficiente é publicado em Aviso no Diário da República, tipicamente em outubro
              do ano anterior, e aplica-se a partir de 1 de janeiro do ano seguinte. Para 2026,
              o aviso foi publicado em outubro de 2025.
            </p>

            <div className="not-prose bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
              <h4 className="text-green-900 font-semibold mb-2">✅ Coeficiente 2026 em Resumo</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white rounded-lg p-4 text-center">
                  <p className="text-green-600 text-2xl font-bold">1,0224</p>
                  <p className="text-green-800 mt-1">Coeficiente multiplicador</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <p className="text-green-600 text-2xl font-bold">2,24%</p>
                  <p className="text-green-800 mt-1">Aumento máximo</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <p className="text-green-600 text-2xl font-bold">Jan 2026</p>
                  <p className="text-green-800 mt-1">Data de aplicação</p>
                </div>
              </div>
            </div>

            <p>
              Comparando com anos anteriores, o coeficiente de 2026 representa uma
              <strong> estabilização</strong> após os aumentos excecionais registados em 2023 e 2024
              devido à inflação elevada. O governo optou por não aplicar tetos extraordinários
              em 2026, permitindo a aplicação integral do coeficiente.
            </p>

            <h2 id="nrau-regras">3. Regras do NRAU para Atualização de Rendas</h2>

            <p>
              O <strong>NRAU (Lei n.º 6/2006)</strong>, com as alterações subsequentes, estabelece
              as regras para a atualização de rendas em Portugal. As principais disposições são:
            </p>

            <h3>Contratos celebrados após 1990 (regime do NRAU)</h3>
            <p>
              Para contratos celebrados ao abrigo do NRAU, a atualização segue estritamente o
              coeficiente INE. O senhorio pode aplicar o coeficiente uma vez por ano, desde que:
            </p>

            <ul>
              <li>O contrato tenha pelo menos <strong>1 ano de vigência</strong></li>
              <li>A comunicação seja feita por <strong>carta registada</strong> ou outro meio que comprove a receção</li>
              <li>A comunicação seja enviada com <strong>antecedência mínima de 30 dias</strong></li>
              <li>A nova renda entre em vigor no <strong>mês seguinte ao da comunicação</strong> (ou no mês subsequente, se comunicada nos últimos 10 dias do mês)</li>
            </ul>

            <h3>Contratos anteriores a 1990 (regime transitório)</h3>
            <p>
              Para contratos antigos em regime transitório, aplicam-se regras especiais. O senhorio
              pode propor uma <strong>atualização para o valor de mercado</strong>, mas o inquilino
              tem proteções adicionais baseadas no rendimento anual bruto corrigido (RABC) do
              agregado familiar. Se o RABC for inferior a 5 RMNA (retribuição mínima nacional anual),
              o inquilino pode invocar proteção especial.
            </p>

            <div className="not-prose bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
              <h4 className="text-yellow-900 font-semibold mb-2">⚠️ Atenção: Contratos Antigos</h4>
              <p className="text-yellow-800 text-sm">
                A atualização de rendas em contratos anteriores a 1990 segue regras específicas do
                regime transitório do NRAU. Recomendamos consulta jurídica para estes casos, pois
                os procedimentos são mais complexos e os prazos diferentes.
              </p>
            </div>

            <h2 id="habitacional-vs-comercial">4. Contratos Habitacionais vs. Comerciais</h2>

            <p>
              O tipo de contrato — <strong>habitacional</strong> ou <strong>comercial (não habitacional)</strong> —
              influencia as regras de atualização, embora o coeficiente base seja o mesmo.
            </p>

            <div className="not-prose overflow-x-auto mb-6">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Aspeto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Habitacional
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Comercial
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Coeficiente aplicável</td>
                    <td className="px-6 py-4 text-sm text-gray-500">2,24% (INE 2026)</td>
                    <td className="px-6 py-4 text-sm text-gray-500">2,24% (INE 2026)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Aviso prévio mínimo</td>
                    <td className="px-6 py-4 text-sm text-gray-500">30 dias</td>
                    <td className="px-6 py-4 text-sm text-gray-500">30 dias</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Proteção especial</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Sim (inquilinos vulneráveis)</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Não</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Regime transitório</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Regras RABC aplicáveis</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Atualização gradual (5 anos)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Negociação livre</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Na renovação do contrato</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Na renovação do contrato</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Obras como fundamento</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Sim, com limites</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Sim, mais flexível</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              Note que em <strong>ambos os casos</strong>, a atualização anual ordinária está limitada
              ao coeficiente INE. A diferença principal está no regime transitório e nas proteções
              especiais para inquilinos habitacionais em situação de vulnerabilidade.
            </p>

            <h2 id="passo-a-passo">5. Passo a Passo: Como Calcular a Atualização</h2>

            <p>
              O cálculo da atualização de renda é simples e segue uma fórmula direta. Veja o
              processo passo a passo:
            </p>

            <div className="not-prose space-y-4 mb-6">
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Identifique a renda atual</h4>
                    <p className="text-gray-600 text-sm">
                      Verifique o valor da renda mensal atualmente em vigor. Use o valor que consta
                      no contrato ou na última atualização comunicada. Exemplo: <strong>€750,00/mês</strong>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Consulte o coeficiente INE</h4>
                    <p className="text-gray-600 text-sm">
                      Para 2026, o coeficiente é <strong>1,0224</strong> (aumento de 2,24%).
                      Consulte sempre o Diário da República ou o site do INE para confirmar o
                      valor oficial.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Aplique a fórmula</h4>
                    <p className="text-gray-600 text-sm">
                      <strong>Nova Renda = Renda Atual × Coeficiente INE</strong><br />
                      Exemplo: €750,00 × 1,0224 = <strong>€766,80</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">4</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Arredonde corretamente</h4>
                    <p className="text-gray-600 text-sm">
                      O valor da nova renda deve ser arredondado <strong>ao cêntimo</strong> (duas
                      casas decimais). O arredondamento segue as regras normais: ≥5 arredonda para
                      cima, &lt;5 arredonda para baixo.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">5</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Comunique ao inquilino</h4>
                    <p className="text-gray-600 text-sm">
                      Envie carta registada com aviso de receção indicando: o novo valor, o
                      coeficiente aplicado, a base legal e a data de início da nova renda. Guarde
                      sempre o comprovativo de envio.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h2 id="exemplos-praticos">6. Exemplos Práticos com Cálculos</h2>

            <div className="not-prose space-y-6">
              <div className="border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Exemplo 1: Apartamento T2 em Lisboa (Habitacional)</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-700 mb-2">Dados:</p>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Renda atual: €850,00/mês</li>
                      <li>• Contrato: Habitacional (2019)</li>
                      <li>• Coeficiente 2026: 1,0224</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 mb-2">Cálculo:</p>
                    <ul className="text-orange-600 space-y-1">
                      <li>• €850,00 × 1,0224 = <strong>€869,04</strong></li>
                      <li>• Aumento: €19,04/mês</li>
                      <li>• Aumento anual: €228,48</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Exemplo 2: Loja no Porto (Comercial)</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-700 mb-2">Dados:</p>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Renda atual: €1.200,00/mês</li>
                      <li>• Contrato: Comercial (2020)</li>
                      <li>• Coeficiente 2026: 1,0224</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 mb-2">Cálculo:</p>
                    <ul className="text-orange-600 space-y-1">
                      <li>• €1.200,00 × 1,0224 = <strong>€1.226,88</strong></li>
                      <li>• Aumento: €26,88/mês</li>
                      <li>• Aumento anual: €322,56</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Exemplo 3: Estúdio em Coimbra (Habitacional)</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-700 mb-2">Dados:</p>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Renda atual: €450,00/mês</li>
                      <li>• Contrato: Habitacional (2022)</li>
                      <li>• Coeficiente 2026: 1,0224</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 mb-2">Cálculo:</p>
                    <ul className="text-orange-600 space-y-1">
                      <li>• €450,00 × 1,0224 = <strong>€460,08</strong></li>
                      <li>• Aumento: €10,08/mês</li>
                      <li>• Aumento anual: €120,96</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Exemplo 4: Moradia no Algarve (Habitacional, renda elevada)</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-700 mb-2">Dados:</p>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Renda atual: €2.500,00/mês</li>
                      <li>• Contrato: Habitacional (2021)</li>
                      <li>• Coeficiente 2026: 1,0224</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 mb-2">Cálculo:</p>
                    <ul className="text-orange-600 space-y-1">
                      <li>• €2.500,00 × 1,0224 = <strong>€2.556,00</strong></li>
                      <li>• Aumento: €56,00/mês</li>
                      <li>• Aumento anual: €672,00</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <h2 id="comunicacao-inquilino">7. Como Comunicar ao Inquilino</h2>

            <p>
              A comunicação da atualização de renda deve cumprir requisitos legais específicos
              para ser válida. Uma comunicação incorreta pode ser impugnada pelo inquilino.
            </p>

            <h3>Requisitos da comunicação</h3>

            <ul>
              <li><strong>Forma:</strong> Carta registada com aviso de receção (AR) ou entrega em mão com recibo assinado</li>
              <li><strong>Prazo:</strong> Mínimo 30 dias antes da data de aplicação da nova renda</li>
              <li><strong>Conteúdo obrigatório:</strong> Valor atual, novo valor, coeficiente aplicado, base legal (artigo 24.º do NRAU)</li>
              <li><strong>Data de efeito:</strong> A nova renda aplica-se no 1.º dia do mês seguinte ao término do prazo de 30 dias</li>
            </ul>

            <div className="not-prose bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
              <h4 className="text-gray-900 font-semibold mb-3">Modelo de Comunicação</h4>
              <div className="bg-white rounded-lg p-4 text-sm text-gray-700 font-mono whitespace-pre-line leading-relaxed">
{`Exmo(a) Sr(a). [Nome do Inquilino],

Nos termos do artigo 24.º da Lei n.º 6/2006 (NRAU),
venho comunicar a atualização da renda do imóvel sito
em [morada completa], com efeitos a partir de [data].

Renda atual: €[valor atual]
Coeficiente de atualização (INE 2026): 1,0224
Nova renda: €[valor atualizado]

Esta atualização baseia-se no coeficiente publicado
no Diário da República, Aviso n.º [número], de [data].

Com os melhores cumprimentos,
[Nome do Senhorio]
[Data]`}
              </div>
            </div>

            <h2 id="excecoes-limites">8. Exceções e Limites Legais</h2>

            <p>
              Existem situações em que a atualização de renda não pode ser aplicada ou está
              sujeita a limitações adicionais:
            </p>

            <div className="not-prose space-y-4 mb-6">
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h4 className="text-red-900 font-semibold mb-2">Quando NÃO pode atualizar</h4>
                <ul className="text-red-800 space-y-1 text-sm">
                  <li>• Contrato com menos de 1 ano de vigência</li>
                  <li>• Já foi feita uma atualização nos últimos 12 meses</li>
                  <li>• O contrato exclui expressamente a atualização</li>
                  <li>• Existe uma ação judicial pendente sobre o contrato</li>
                  <li>• O imóvel não cumpre condições de habitabilidade (contratos habitacionais)</li>
                </ul>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <h4 className="text-purple-900 font-semibold mb-2">Proteções do inquilino</h4>
                <ul className="text-purple-800 space-y-1 text-sm">
                  <li>• <strong>Inquilinos com mais de 65 anos:</strong> Proteção especial em contratos anteriores a 1990</li>
                  <li>• <strong>Inquilinos com deficiência (≥60%):</strong> Mesma proteção</li>
                  <li>• <strong>RABC baixo:</strong> Rendimento inferior a 5 RMNA impede atualização para valor de mercado</li>
                  <li>• <strong>Contestação:</strong> O inquilino pode contestar a atualização no prazo de 30 dias</li>
                </ul>
              </div>
            </div>

            <h2 id="historico-coeficientes">9. Histórico de Coeficientes INE</h2>

            <p>
              Para contextualizar o coeficiente de 2026, veja a evolução dos últimos anos:
            </p>

            <div className="not-prose overflow-x-auto mb-6">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Ano</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Coeficiente</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Aumento</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Nota</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">2026</td>
                    <td className="px-6 py-4 text-sm text-gray-500">1,0224</td>
                    <td className="px-6 py-4 text-sm text-green-600 font-medium">2,24%</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Sem teto extraordinário</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">2025</td>
                    <td className="px-6 py-4 text-sm text-gray-500">1,0241</td>
                    <td className="px-6 py-4 text-sm text-green-600 font-medium">2,41%</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Normalização pós-inflação</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">2024</td>
                    <td className="px-6 py-4 text-sm text-gray-500">1,0694</td>
                    <td className="px-6 py-4 text-sm text-orange-600 font-medium">6,94%</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Teto de 6,94% (lei extraordinária)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">2023</td>
                    <td className="px-6 py-4 text-sm text-gray-500">1,0200</td>
                    <td className="px-6 py-4 text-sm text-green-600 font-medium">2,00%</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Teto de 2% (lei extraordinária)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">2022</td>
                    <td className="px-6 py-4 text-sm text-gray-500">1,0043</td>
                    <td className="px-6 py-4 text-sm text-green-600 font-medium">0,43%</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Pré-inflação</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 id="erros-comuns">10. Erros Comuns a Evitar</h2>

            <p>
              Muitos senhorios cometem erros na atualização de rendas que podem ter consequências
              legais. Evite os seguintes:
            </p>

            <div className="not-prose space-y-3 mb-6">
              <div className="flex items-start gap-3 bg-red-50 rounded-lg p-4">
                <span className="text-red-500 font-bold text-lg">1.</span>
                <div>
                  <p className="text-red-900 font-medium text-sm">Aplicar um aumento superior ao coeficiente INE</p>
                  <p className="text-red-700 text-sm">O coeficiente é o máximo legal. Qualquer valor acima pode ser contestado e anulado pelo inquilino.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-red-50 rounded-lg p-4">
                <span className="text-red-500 font-bold text-lg">2.</span>
                <div>
                  <p className="text-red-900 font-medium text-sm">Não enviar comunicação escrita formal</p>
                  <p className="text-red-700 text-sm">Um aviso verbal ou SMS não tem validade legal. Use sempre carta registada com AR.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-red-50 rounded-lg p-4">
                <span className="text-red-500 font-bold text-lg">3.</span>
                <div>
                  <p className="text-red-900 font-medium text-sm">Não respeitar o prazo de 30 dias</p>
                  <p className="text-red-700 text-sm">A nova renda só entra em vigor após 30 dias da comunicação. Enviar tarde significa adiar o aumento.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-red-50 rounded-lg p-4">
                <span className="text-red-500 font-bold text-lg">4.</span>
                <div>
                  <p className="text-red-900 font-medium text-sm">Atualizar antes de completar 12 meses</p>
                  <p className="text-red-700 text-sm">A atualização só pode ser feita uma vez por ano. Duas atualizações num período de 12 meses são ilegais.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-red-50 rounded-lg p-4">
                <span className="text-red-500 font-bold text-lg">5.</span>
                <div>
                  <p className="text-red-900 font-medium text-sm">Não guardar comprovativos</p>
                  <p className="text-red-700 text-sm">Guarde sempre os recibos de envio e os avisos de receção. Em caso de litígio, são a sua prova.</p>
                </div>
              </div>
            </div>

            <div className="not-prose mt-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-8 text-white text-center">
              <h3 className="text-xl font-bold mb-4">
                Calcule a Atualização da Sua Renda em Segundos
              </h3>
              <p className="mb-6 text-orange-100">
                Use a calculadora gratuita do Senhorio para aplicar o coeficiente INE 2026
                automaticamente e gerar a comunicação ao inquilino.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/calculadora-rendas"
                  className="px-6 py-3 bg-white text-orange-600 rounded-lg font-medium hover:bg-gray-100 transition"
                >
                  Usar Calculadora de Rendas
                </Link>
                <Link
                  href="/"
                  className="px-6 py-3 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-orange-600 transition"
                >
                  Saber Mais sobre o Senhorio
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
              <span className="text-brand-600 text-sm font-medium">Ler artigo →</span>
            </Link>
            <Link href="/blog/recibos-renda-eletronicos-guia-2026" className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition block">
              <h3 className="font-semibold text-gray-900 mb-2">
                Recibos de Renda Eletrónicos: Guia Completo 2026
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Como emitir recibos eletrónicos no Portal das Finanças, prazos e penalizações.
              </p>
              <span className="text-brand-600 text-sm font-medium">Ler artigo →</span>
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
            "headline": "Como Calcular Atualizações de Renda 2026: Coeficiente INE e Regras NRAU",
            "description": "Guia completo sobre como calcular atualizações de renda em 2026 usando o coeficiente INE de 2,24% e as regras do NRAU.",
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
            "datePublished": "2026-03-21T12:00:00.000Z",
            "dateModified": "2026-03-21T12:00:00.000Z",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://senhorio.vercel.app/blog/como-calcular-atualizacoes-renda-2026"
            },
            "keywords": "atualização rendas 2026, coeficiente INE 2026, aumento renda legal, NRAU, calcular aumento renda Portugal",
            "articleSection": "Rent Update Guide"
          })
        }}
      />
    </div>
  );
}
