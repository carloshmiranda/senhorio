import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Despesas Dedutíveis no Arrendamento 2026: Tudo o que Pode Declarar no IRS | Senhorio",
  description: "Guia completo das despesas dedutíveis no IRS de arrendamento 2026. Obras, condomínio, seguros, juros, IMI — saiba o que pode e não pode deduzir com exemplos reais.",
  keywords: [
    "despesas dedutíveis arrendamento",
    "despesas dedutíveis IRS arrendamento 2026",
    "o que deduzir IRS arrendamento",
    "deduções senhorios IRS 2026",
    "despesas permitidas arrendamento Portugal",
    "obras dedutíveis IRS arrendamento",
  ],
  openGraph: {
    title: "Despesas Dedutíveis no Arrendamento 2026: Tudo o que Pode Declarar",
    description: "Guia completo das despesas dedutíveis no IRS de arrendamento 2026. Obras, condomínio, seguros, juros e muito mais.",
    type: "article",
    publishedTime: "2026-04-04T10:00:00.000Z",
  },
  alternates: {
    canonical: "https://senhorio.vercel.app/blog/despesas-dedutiveis-arrendamento-2026",
  },
};

export default function DespesasDedutiveis2026Page() {
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
              <span className="px-3 py-1 bg-brand-100 text-brand-700 text-sm rounded-full font-medium">
                IRS 2026
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">
                Despesas Dedutíveis
              </span>
              <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full font-medium">
                Guia Prático
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Despesas Dedutíveis no Arrendamento 2026: Tudo o que Pode Declarar no IRS
            </h1>

            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              Muitos senhorios pagam impostos a mais porque não sabem o que podem deduzir.
              Este guia lista todas as despesas permitidas no IRS de arrendamento 2026 —
              obras, condomínio, seguros, juros de empréstimo, IMI — com exemplos concretos
              e valores reais.
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500 border-l-4 border-brand-500 pl-4">
              <time dateTime="2026-04-04T10:00:00.000Z">4 de abril de 2026</time>
              <span>•</span>
              <span>13 minutos de leitura</span>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-gray prose-lg max-w-none">

            {/* Calculator CTA */}
            <div className="not-prose bg-brand-50 border border-brand-200 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-brand-900 mb-2">
                Calcule quanto poupa com as deduções
              </h3>
              <p className="text-brand-700 mb-4 text-sm">
                Introduza as suas rendas e despesas no nosso simulador e veja automaticamente
                se compensa o regime de englobamento (com deduções) ou a taxa fixa de 10%.
              </p>
              <Link
                href="/calculadora"
                className="inline-flex items-center px-4 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition text-sm"
              >
                Abrir Simulador Fiscal Gratuito →
              </Link>
            </div>

            {/* Table of Contents */}
            <nav className="not-prose bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Índice</h3>
              <ol className="space-y-2 text-sm">
                <li><a href="#quando-deduzir" className="text-brand-600 hover:text-brand-800">1. Quando Faz Sentido Deduzir Despesas?</a></li>
                <li><a href="#despesas-permitidas" className="text-brand-600 hover:text-brand-800">2. Despesas Totalmente Dedutíveis</a></li>
                <li><a href="#obras" className="text-brand-600 hover:text-brand-800">3. Obras e Reparações: Regras Especiais</a></li>
                <li><a href="#imi-aimi" className="text-brand-600 hover:text-brand-800">4. IMI e AIMI: Dedução Parcial</a></li>
                <li><a href="#nao-dedutivel" className="text-brand-600 hover:text-brand-800">5. O que NÃO Pode Deduzir</a></li>
                <li><a href="#tabela-resumo" className="text-brand-600 hover:text-brand-800">6. Tabela Resumo Completa</a></li>
                <li><a href="#exemplos" className="text-brand-600 hover:text-brand-800">7. Exemplos Práticos com Cálculos</a></li>
                <li><a href="#documentacao" className="text-brand-600 hover:text-brand-800">8. Documentação Necessária</a></li>
              </ol>
            </nav>

            <h2 id="quando-deduzir">1. Quando Faz Sentido Deduzir Despesas?</h2>

            <p>
              A primeira decisão que um senhorio tem de tomar em 2026 é escolher o regime fiscal.
              Só faz sentido declarar despesas se optar pelo <strong>regime de englobamento</strong>
              (escalões normais do IRS) — no regime de taxa fixa de 10%, as despesas não são relevantes
              porque o imposto incide sobre o rendimento bruto.
            </p>

            <p>
              Como regra prática: se as suas despesas anuais ultrapassarem cerca de
              <strong> 15% das suas rendas brutas</strong>, o englobamento costuma ser mais vantajoso.
              Se tiver poucas despesas, a taxa de 10% é geralmente mais simples e favorável.
            </p>

            <div className="not-prose bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
              <h4 className="text-yellow-900 font-semibold mb-2">Exemplo rápido</h4>
              <p className="text-yellow-800 text-sm">
                Renda de €12.000/ano + despesas de €4.000/ano. Com taxa 10%: paga €1.200.
                Com englobamento (taxa marginal 28.5%): tributável = €8.000 → imposto ≈ €2.280.
                Conclusão: mesmo com deduções, a taxa de 10% pode ser melhor. Use o simulador para confirmar.
              </p>
            </div>

            <h2 id="despesas-permitidas">2. Despesas Totalmente Dedutíveis</h2>

            <p>
              No regime de englobamento, as despesas dedutíveis estão listadas no artigo 41.º
              do Código do IRS. Aqui estão as principais categorias que pode deduzir na totalidade:
            </p>

            <h3>Juros de empréstimos</h3>
            <p>
              Os juros pagos em empréstimos bancários contraídos para aquisição, construção
              ou obras do imóvel arrendado são <strong>100% dedutíveis</strong>. Atenção:
              apenas os <em>juros</em> — as amortizações de capital não são dedutíveis.
            </p>
            <p>
              O banco envia-lhe anualmente um documento com o valor de juros pagos. Guarde-o.
              Se arrendar apenas uma parte do imóvel, só pode deduzir a proporção correspondente.
            </p>

            <h3>Condomínio e encargos comuns</h3>
            <p>
              Quotas de condomínio, fundo de reserva, e outros encargos comuns do edifício
              são dedutíveis — desde que a fatura esteja em seu nome e o imóvel esteja arrendado
              nesse período. Se o imóvel ficou vazio durante meses, pode deduzir apenas a parte
              proporcional ao período arrendado.
            </p>

            <h3>Seguros</h3>
            <p>
              O seguro multirriscos (incêndio + recheio) e o seguro de responsabilidade civil
              do imóvel arrendado são dedutíveis. O seguro de vida associado ao crédito
              habitação também pode ser deduzido.
            </p>

            <h3>Honorários de gestão e mediação</h3>
            <p>
              Comissões pagas a agências imobiliárias pela gestão do arrendamento ou
              mediação na busca de inquilinos são despesas elegíveis. O mesmo se aplica
              a honorários de um gestor de propriedades (property manager) externo.
            </p>

            <h2 id="obras">3. Obras e Reparações: Regras Especiais</h2>

            <p>
              Esta é a área onde há mais dúvidas e onde os senhorios cometem mais erros.
              A distinção fundamental é entre <strong>obras de conservação</strong> e
              <strong>obras de beneficiação (valorização)</strong>.
            </p>

            <h3>Obras de conservação e reparação — dedutíveis</h3>
            <p>
              Destinam-se a manter o imóvel nas condições originais, sem aumentar o seu valor:
            </p>
            <ul>
              <li>Reparação de canalizações, eletricidade, telhado ou janelas avariadas</li>
              <li>Pintura de paredes (manutenção)</li>
              <li>Substituição de equipamentos avariados (caldeira, esquentador)</li>
              <li>Desentupimento, desinfestação, tratamento de humidades</li>
              <li>Reparação de pavimento deteriorado</li>
            </ul>
            <p>
              Estas despesas são <strong>dedutíveis no ano em que ocorrem</strong>.
            </p>

            <h3>Obras de beneficiação — regime especial</h3>
            <p>
              Obras que aumentam significativamente o valor do imóvel (remodelação total,
              ampliação, construção de terraço) seguem regras diferentes.
              Tecnicamente, devem ser amortizadas ao longo de vários anos —
              embora na prática muitos contabilistas as tratem como despesas correntes
              se o valor for moderado. Em caso de dúvida, consulte um contabilista.
            </p>

            <div className="not-prose bg-green-50 border border-green-200 rounded-xl p-5 my-6">
              <h4 className="text-green-900 font-semibold mb-2">Dica prática</h4>
              <p className="text-green-800 text-sm">
                Peça sempre fatura com NIF quando contratar obras. Sem fatura, a despesa não é
                dedutível — mesmo que tenha feito um pagamento por transferência bancária.
                A fatura é obrigatória.
              </p>
            </div>

            <h2 id="imi-aimi">4. IMI e AIMI: Dedução Parcial</h2>

            <h3>IMI (Imposto Municipal sobre Imóveis)</h3>
            <p>
              O IMI pago pelo imóvel arrendado é <strong>totalmente dedutível</strong>
              enquanto encargo de manutenção do imóvel. Se o mesmo imóvel estiver arrendado
              apenas parte do ano, deduz proporcionalmente.
            </p>

            <h3>AIMI (Adicional ao IMI)</h3>
            <p>
              O AIMI é deduível nas rendas quando o imóvel está sujeito a tributação em
              categoria F. No entanto, se beneficiar da isenção de AIMI por praticar
              rendas acessíveis (abaixo de €2.300/mês), este ponto não se aplica.
            </p>

            <p>
              Utilize a nossa{" "}
              <Link href="/aimi" className="text-brand-600 hover:text-brand-700 underline">
                calculadora de isenção AIMI
              </Link>{" "}
              para verificar se qualifica para a isenção de 2026.
            </p>

            <h2 id="nao-dedutivel">5. O que NÃO Pode Deduzir</h2>

            <p>
              Há despesas que muitos senhorios tentam deduzir sem saber que não são
              aceites pela Autoridade Tributária:
            </p>

            <ul>
              <li>
                <strong>Mobília e eletrodomésticos</strong> — equipamentos novos para imóvel
                arrendado mobilado não são despesas de conservação; são bens de capital.
              </li>
              <li>
                <strong>Deslocações ao imóvel</strong> — combustível, portagens e tempo gasto
                a visitar o imóvel não são dedutíveis.
              </li>
              <li>
                <strong>IMT (Imposto Municipal sobre Transmissões)</strong> — pago na compra,
                não dedutível nas rendas.
              </li>
              <li>
                <strong>Amortizações de capital do empréstimo</strong> — apenas os juros são
                dedutíveis, não o pagamento do capital em dívida.
              </li>
              <li>
                <strong>Despesas do seu próprio trabalho no imóvel</strong> — se fizer
                reparações pessoalmente, não pode deduzir o "custo" do seu tempo.
              </li>
              <li>
                <strong>Despesas sem fatura</strong> — qualquer gasto sem documento fiscal
                não pode ser deduzido, independentemente do montante.
              </li>
            </ul>

            <h2 id="tabela-resumo">6. Tabela Resumo Completa</h2>

            <div className="not-prose overflow-x-auto mb-8">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">Despesa</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">Dedutível?</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">Condições</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {[
                    ["Juros do empréstimo hipotecário", "✅ Sim", "Apenas juros, não amortizações"],
                    ["Condomínio e fundo de reserva", "✅ Sim", "Proporcional ao período arrendado"],
                    ["Seguro multirriscos do imóvel", "✅ Sim", "Fatura em nome do senhorio"],
                    ["IMI do imóvel arrendado", "✅ Sim", "Total ou proporcional"],
                    ["AIMI (se não isento)", "✅ Sim", "Apenas parte proporcional às rendas"],
                    ["Obras de conservação", "✅ Sim", "Com fatura; manutenção, não valorização"],
                    ["Honorários de mediação/gestão", "✅ Sim", "Fatura do prestador de serviços"],
                    ["Despesas de publicidade do imóvel", "✅ Sim", "Para encontrar inquilino"],
                    ["Obras de beneficiação (grandes)", "⚠️ Parcial", "Amortização em vários anos"],
                    ["Mobília e equipamentos novos", "❌ Não", "São imobilizado, não despesa corrente"],
                    ["Amortizações de capital", "❌ Não", "Apenas juros são dedutíveis"],
                    ["IMT e custos de aquisição", "❌ Não", "Custo de capital, não operacional"],
                    ["Deslocações ao imóvel", "❌ Não", "Não previsto no artigo 41.º do CIRS"],
                    ["Despesas sem fatura", "❌ Não", "Sem documento fiscal, sem dedução"],
                  ].map(([item, status, note], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-3 text-gray-900">{item}</td>
                      <td className="px-4 py-3 font-medium">{status}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 id="exemplos">7. Exemplos Práticos com Cálculos</h2>

            <div className="not-prose space-y-6 mb-8">
              <div className="border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Exemplo 1: Apartamento T2 no Porto com crédito hipotecário
                </h4>
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <p className="font-medium text-gray-700 mb-2">Situação:</p>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Renda mensal: €950 (€11.400/ano)</li>
                      <li>• Juros hipoteca: €2.800/ano</li>
                      <li>• Condomínio: €600/ano</li>
                      <li>• Seguro: €250/ano</li>
                      <li>• IMI: €480/ano</li>
                      <li>• Total despesas: €4.130/ano</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 mb-2">Comparação fiscal:</p>
                    <ul className="space-y-1">
                      <li className="text-brand-700">• Taxa 10%: €11.400 × 10% = <strong>€1.140</strong></li>
                      <li className="text-green-700">• Englobamento (28.5%): €7.270 × 28.5% = <strong>€2.072</strong></li>
                      <li className="text-brand-700 font-semibold mt-2">→ Taxa 10% poupa €932 neste caso</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Exemplo 2: Moradia T3 com hipoteca e obras recentes
                </h4>
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <p className="font-medium text-gray-700 mb-2">Situação:</p>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Renda mensal: €1.400 (€16.800/ano)</li>
                      <li>• Juros hipoteca: €5.200/ano</li>
                      <li>• Obras de conservação: €3.500/ano</li>
                      <li>• Condomínio + IMI: €1.100/ano</li>
                      <li>• Total despesas: €9.800/ano</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 mb-2">Comparação fiscal:</p>
                    <ul className="space-y-1">
                      <li className="text-orange-700">• Taxa 10%: €16.800 × 10% = <strong>€1.680</strong></li>
                      <li className="text-green-700">• Englobamento (35%): €7.000 × 35% = <strong>€2.450</strong></li>
                      <li className="text-brand-700 font-semibold mt-2">→ Neste caso, taxa 10% ainda é melhor</li>
                      <li className="text-gray-500 text-xs mt-1">Mas com despesas ainda maiores ou taxa marginal mais baixa, o englobamento pode ganhar</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-brand-50 border border-brand-200 rounded-xl p-5">
                <p className="text-brand-800 text-sm">
                  <strong>Conclusão prática:</strong> Na maioria dos casos em 2026, a taxa de 10%
                  acaba por ser mais vantajosa porque incide sobre o bruto mas a taxa é muito baixa.
                  O englobamento só compensa se tiver despesas muito elevadas (acima de 40-50%
                  do rendimento bruto) ou se o seu rendimento total for baixo (taxa marginal baixa).
                  Use o nosso simulador para o seu caso específico.
                </p>
              </div>
            </div>

            <h2 id="documentacao">8. Documentação Necessária</h2>

            <p>
              Para deduzir despesas no IRS, não precisa de enviar os documentos com a declaração,
              mas tem de os conservar durante <strong>4 anos</strong> (o prazo de prescrição
              das obrigações fiscais). Se a AT pedir justificação, tem de apresentar:
            </p>

            <div className="not-prose grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-5">
                <h4 className="font-semibold text-gray-900 mb-3">Documentos a guardar</h4>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Faturas de obras (com NIF do emitente)</li>
                  <li>• Recibos de condomínio e atas</li>
                  <li>• Apólices e recibos de seguros</li>
                  <li>• Declaração anual de juros do banco</li>
                  <li>• Nota de cobrança do IMI/AIMI</li>
                  <li>• Comprovativos de pagamento de tudo</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-5">
                <h4 className="font-semibold text-gray-900 mb-3">Onde declarar no IRS</h4>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Rendimentos: Anexo F, Quadro 4</li>
                  <li>• Despesas: Anexo F, Quadro 5</li>
                  <li>• Juros hipoteca: Quadro 5B</li>
                  <li>• Obras: Quadro 5A</li>
                  <li>• IMI/AIMI: Quadros específicos</li>
                  <li>• Prazo: até 30 de junho de 2026</li>
                </ul>
              </div>
            </div>

            <div className="not-prose mt-12 bg-gradient-to-r from-brand-600 to-brand-700 rounded-xl p-8 text-white text-center">
              <h3 className="text-xl font-bold mb-3">
                Não deixe dinheiro na mesa
              </h3>
              <p className="text-brand-100 mb-6 text-sm max-w-lg mx-auto">
                O simulador fiscal do Senhorio calcula automaticamente se vale a pena deduzir despesas
                ou optar pela taxa fixa de 10%. Em segundos, tem a resposta.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/calculadora"
                  className="px-6 py-3 bg-white text-brand-600 rounded-lg font-medium hover:bg-gray-100 transition text-sm"
                >
                  Simular Agora — É Grátis
                </Link>
                <Link
                  href="/blog/declaracao-irs-arrendamento-2026-guia-completo"
                  className="px-6 py-3 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-brand-600 transition text-sm"
                >
                  Ver Guia Declaração IRS
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <section className="mt-16 border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Artigos Relacionados</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/blog/declaracao-irs-arrendamento-2026-guia-completo" className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition block">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                Declaração IRS Arrendamento 2026: Passo a Passo
              </h3>
              <p className="text-gray-500 text-xs mb-3">Anexo F, Portal das Finanças e prazos.</p>
              <span className="text-brand-600 text-xs font-medium">Ler artigo →</span>
            </Link>
            <Link href="/blog/imposto-10-porcento-rendas-portugal-2026" className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition block">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                Imposto 10% Rendas Portugal 2026
              </h3>
              <p className="text-gray-500 text-xs mb-3">Tudo sobre a nova taxa fixa.</p>
              <span className="text-brand-600 text-xs font-medium">Ler artigo →</span>
            </Link>
            <Link href="/blog/isencao-aimi-2026-qualificar-nova-isencao" className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition block">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                Isenção AIMI 2026: Como Qualificar
              </h3>
              <p className="text-gray-500 text-xs mb-3">Critérios e poupanças estimadas.</p>
              <span className="text-brand-600 text-xs font-medium">Ler artigo →</span>
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
            "headline": "Despesas Dedutíveis no Arrendamento 2026: Tudo o que Pode Declarar no IRS",
            "description": "Guia completo das despesas dedutíveis no IRS de arrendamento 2026 — obras, condomínio, seguros, juros, IMI.",
            "author": { "@type": "Organization", "name": "Senhorio" },
            "publisher": {
              "@type": "Organization",
              "name": "Senhorio",
              "logo": { "@type": "ImageObject", "url": "https://senhorio.vercel.app/logo.png" }
            },
            "datePublished": "2026-04-04T10:00:00.000Z",
            "dateModified": "2026-04-04T10:00:00.000Z",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://senhorio.vercel.app/blog/despesas-dedutiveis-arrendamento-2026"
            },
            "keywords": "despesas dedutíveis arrendamento, deduções IRS arrendamento 2026, obras dedutíveis senhorio",
            "articleSection": "Tax Guide"
          })
        }}
      />
    </div>
  );
}
