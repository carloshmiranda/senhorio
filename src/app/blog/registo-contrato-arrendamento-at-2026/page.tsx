import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registo de Contrato de Arrendamento na AT 2026: Guia Completo | Senhorio",
  description: "Como registar o contrato de arrendamento na Autoridade Tributária em 2026. Prazos, documentos, coimas por incumprimento e passo a passo no Portal das Finanças.",
  keywords: [
    "registo contrato arrendamento AT",
    "registo contrato arrendamento Portal das Finanças",
    "como registar contrato arrendamento 2026",
    "prazo registo contrato arrendamento",
    "contrato arrendamento AT obrigação",
    "coima contrato arrendamento não registado",
  ],
  openGraph: {
    title: "Registo de Contrato de Arrendamento na AT 2026: Guia Completo",
    description: "Prazos, documentos e passo a passo para registar o contrato de arrendamento na AT. Evite coimas.",
    type: "article",
    publishedTime: "2026-04-04T12:00:00.000Z",
  },
  alternates: {
    canonical: "https://senhorio.vercel.app/blog/registo-contrato-arrendamento-at-2026",
  },
};

export default function RegistoContratoArrendamento2026Page() {
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
                Obrigação Legal
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">
                Portal das Finanças
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">
                Guia Passo a Passo
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Registo de Contrato de Arrendamento na AT 2026: Como Fazer, Prazos e Coimas
            </h1>

            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              Registar o contrato de arrendamento na Autoridade Tributária é uma obrigação
              legal que muitos senhorios desconhecem ou adiam. Este guia explica exatamente
              como fazer o registo no Portal das Finanças, os prazos obrigatórios e o que
              acontece se não cumprir.
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500 border-l-4 border-red-500 pl-4">
              <time dateTime="2026-04-04T12:00:00.000Z">4 de abril de 2026</time>
              <span>•</span>
              <span>11 minutos de leitura</span>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-gray prose-lg max-w-none">

            {/* Alert Box */}
            <div className="not-prose bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
              <h3 className="text-red-900 font-semibold mb-2 flex items-center gap-2">
                Prazo obrigatório: 30 dias
              </h3>
              <p className="text-red-800 text-sm">
                O contrato de arrendamento tem de ser comunicado à AT <strong>até 30 dias após
                o início do arrendamento</strong>. A contagem começa na data em que o inquilino
                toma posse do imóvel — não na data da assinatura do contrato.
              </p>
            </div>

            {/* Table of Contents */}
            <nav className="not-prose bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Índice</h3>
              <ol className="space-y-2 text-sm">
                <li><a href="#obrigacao-legal" className="text-blue-600 hover:text-blue-800">1. Porquê é obrigatório registar?</a></li>
                <li><a href="#o-que-registar" className="text-blue-600 hover:text-blue-800">2. O que tem de comunicar à AT</a></li>
                <li><a href="#passo-a-passo" className="text-blue-600 hover:text-blue-800">3. Passo a passo no Portal das Finanças</a></li>
                <li><a href="#documentos" className="text-blue-600 hover:text-blue-800">4. Documentos necessários</a></li>
                <li><a href="#prazos" className="text-blue-600 hover:text-blue-800">5. Prazos e situações especiais</a></li>
                <li><a href="#coimas" className="text-blue-600 hover:text-blue-800">6. Coimas por incumprimento</a></li>
                <li><a href="#alteracoes" className="text-blue-600 hover:text-blue-800">7. Alterações e rescisões de contrato</a></li>
                <li><a href="#faq" className="text-blue-600 hover:text-blue-800">8. Perguntas frequentes</a></li>
              </ol>
            </nav>

            <h2 id="obrigacao-legal">1. Porquê é obrigatório registar?</h2>

            <p>
              A comunicação do contrato de arrendamento à AT está prevista no
              <strong> artigo 115.º do Código do IRS</strong>. A lógica é simples:
              a Autoridade Tributária precisa de saber que existe um arrendamento para poder
              cruzar dados e verificar se os rendimentos estão a ser declarados.
            </p>

            <p>
              Além da obrigação do IRS, o registo na AT também serve para efeitos de
              Imposto do Selo (quando aplicável) e para proteção do próprio senhorio —
              um contrato registado tem mais força jurídica numa eventual disputa com o inquilino.
            </p>

            <p>
              O registo <strong>não é uma opção nem uma formalidade menor</strong>.
              A AT tem capacidade de cruzar dados de contas bancárias, transferências e
              contratos notariais para detetar arrendamentos não declarados.
            </p>

            <h2 id="o-que-registar">2. O que tem de comunicar à AT</h2>

            <p>
              A comunicação à AT abrange todos os contratos de arrendamento urbano para
              fins habitacionais ou comerciais. Incluindo:
            </p>

            <ul>
              <li>Arrendamentos de habitação permanente</li>
              <li>Arrendamentos de habitação temporária (mais de 30 dias)</li>
              <li>Arrendamentos comerciais, industriais ou de serviços</li>
              <li>Subarrendamentos (o sublocatário também tem de comunicar)</li>
              <li>Renovações de contratos quando há alteração de condições essenciais</li>
            </ul>

            <div className="not-prose bg-yellow-50 border border-yellow-200 rounded-xl p-5 my-6">
              <h4 className="text-yellow-900 font-semibold mb-2">Exceção: alojamento local (AL)</h4>
              <p className="text-yellow-800 text-sm">
                O alojamento local tem um registo próprio no RNAL (Registo Nacional de
                Alojamento Local) e não segue as mesmas regras. Se arrenda para turismo
                de curta duração, o processo é diferente.
              </p>
            </div>

            <h2 id="passo-a-passo">3. Passo a passo no Portal das Finanças</h2>

            <p>
              O registo faz-se exclusivamente online através do Portal das Finanças
              (portaldasfinancas.gov.pt). Aqui está o processo completo:
            </p>

            <div className="not-prose space-y-4 mb-8">
              {[
                {
                  step: "1",
                  title: "Aceder ao Portal das Finanças",
                  desc: "Aceda a portaldasfinancas.gov.pt e faça login com o seu NIF e senha ou Chave Móvel Digital. Se não tiver senha, terá de se registar primeiro no balcão das Finanças ou online.",
                },
                {
                  step: "2",
                  title: "Navegue até aos Arrendamentos",
                  desc: "No menu principal, vá a: Serviços → Cidadãos → Arrendamento → Comunicar Contrato de Arrendamento. Em alternativa, use a pesquisa interna com a palavra 'arrendamento'.",
                },
                {
                  step: "3",
                  title: "Preencha os dados do contrato",
                  desc: "Introduza os dados do imóvel (artigo matricial), dados do inquilino (NIF obrigatório), data de início, duração do contrato e valor da renda mensal. Verifique tudo com atenção — correções posteriores exigem mais passos.",
                },
                {
                  step: "4",
                  title: "Submeta e guarde o comprovativo",
                  desc: "Após submissão, o sistema gera um comprovativo com número de registo. Guarde este documento — é a sua prova de que cumpriu a obrigação. Envie uma cópia ao inquilino.",
                },
              ].map((s) => (
                <div key={s.step} className="flex gap-4 bg-gray-50 rounded-xl p-5">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{s.title}</h4>
                    <p className="text-gray-600 text-sm">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 id="documentos">4. Documentos necessários</h2>

            <p>
              Antes de iniciar o registo, tenha à mão:
            </p>

            <div className="not-prose grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 rounded-xl p-5">
                <h4 className="font-semibold text-blue-900 mb-3">Sobre o imóvel</h4>
                <ul className="text-blue-800 space-y-1 text-sm">
                  <li>• Artigo matricial (caderneta predial)</li>
                  <li>• Fração (se for apartamento: fração A, B...)</li>
                  <li>• Morada completa com código postal</li>
                  <li>• Tipo de arrendamento (habitacional/comercial)</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-xl p-5">
                <h4 className="font-semibold text-green-900 mb-3">Sobre o contrato</h4>
                <ul className="text-green-800 space-y-1 text-sm">
                  <li>• NIF do(s) inquilino(s)</li>
                  <li>• Data de início do arrendamento</li>
                  <li>• Duração do contrato (ou prazo indeterminado)</li>
                  <li>• Valor da renda mensal</li>
                </ul>
              </div>
            </div>

            <p>
              O NIF do inquilino é obrigatório. Se o inquilino for estrangeiro sem NIF
              português, terá de se registar nas Finanças para obter um número de
              identificação fiscal antes do registo do contrato.
            </p>

            <h2 id="prazos">5. Prazos e situações especiais</h2>

            <div className="not-prose overflow-x-auto mb-6">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">Situação</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">Prazo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {[
                    ["Novo contrato de arrendamento", "30 dias após início do arrendamento"],
                    ["Renovação automática (mesmas condições)", "Não obrigatório comunicar"],
                    ["Renovação com alteração de renda ou prazo", "30 dias após a renovação"],
                    ["Cessação / rescisão do contrato", "30 dias após a cessação"],
                    ["Sublocação", "30 dias após início da sublocação"],
                    ["Alteração de valor de renda por acordo", "30 dias após a alteração"],
                  ].map(([situation, deadline], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-3 text-gray-900">{situation}</td>
                      <td className="px-4 py-3 text-gray-600">{deadline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3>Contrato já existente não registado</h3>
            <p>
              Se tem um contrato em vigor que nunca registou, deve fazê-lo o mais rápido
              possível. Embora o prazo de 30 dias já tenha passado, a regularização voluntária
              antes de qualquer fiscalização é sempre vista com menos severidade pela AT.
              Pode fazê-lo através do mesmo processo no Portal das Finanças — o sistema
              aceita registos tardios.
            </p>

            <h2 id="coimas">6. Coimas por incumprimento</h2>

            <p>
              O não cumprimento das obrigações de comunicação à AT constitui uma
              <strong> infração tributária</strong>, punível com coima. Os valores atualizados:
            </p>

            <div className="not-prose bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
              <h4 className="text-red-900 font-semibold mb-3">Coimas aplicáveis (2026)</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-start gap-4 pb-3 border-b border-red-200">
                  <span className="text-red-800">Falta de comunicação do contrato (pessoa singular)</span>
                  <span className="font-bold text-red-900 whitespace-nowrap">€150 — €3.750</span>
                </div>
                <div className="flex justify-between items-start gap-4 pb-3 border-b border-red-200">
                  <span className="text-red-800">Comunicação fora do prazo (pessoa singular)</span>
                  <span className="font-bold text-red-900 whitespace-nowrap">€75 — €1.875</span>
                </div>
                <div className="flex justify-between items-start gap-4 pb-3 border-b border-red-200">
                  <span className="text-red-800">Falta de comunicação (pessoa coletiva)</span>
                  <span className="font-bold text-red-900 whitespace-nowrap">€300 — €7.500</span>
                </div>
                <div className="flex justify-between items-start gap-4 text-xs text-red-700">
                  <span>As coimas acrescem ao imposto em falta se os rendimentos não foram declarados.</span>
                </div>
              </div>
            </div>

            <p>
              Além das coimas, a AT pode presumir rendimentos de arrendamento com base no
              valor patrimonial tributário do imóvel (1/15 do VPT por ano) quando existem
              indícios de arrendamento não declarado — mesmo que o senhorio alegue que o
              imóvel está vazio.
            </p>

            <h2 id="alteracoes">7. Alterações e rescisões de contrato</h2>

            <h3>Atualização da renda</h3>
            <p>
              Quando atualiza a renda (por exemplo, com o coeficiente INE anual), tem de
              comunicar a alteração à AT no prazo de 30 dias. Use a mesma plataforma, selecionando
              "Alteração de contrato" em vez de "Novo contrato". Guarde sempre o comprovativo.
            </p>

            <h3>Fim do arrendamento</h3>
            <p>
              Quando o inquilino sai e o contrato termina, tem de comunicar a cessação à AT.
              Isto é importante porque os recibos eletrónicos devem parar de ser emitidos a
              partir dessa data, e a AT fica a saber que deixou de haver rendimento de
              arrendamento naquele imóvel.
            </p>

            <div className="not-prose bg-blue-50 border border-blue-200 rounded-xl p-5 my-6">
              <h4 className="text-blue-900 font-semibold mb-2">Sobre os recibos eletrónicos</h4>
              <p className="text-blue-800 text-sm">
                Registar o contrato na AT é o passo inicial. Depois, cada mês, tem de emitir
                recibos eletrónicos no Portal das Finanças para cada renda recebida.
                Os dois processos estão relacionados mas são distintos.{" "}
                <Link href="/blog/recibos-renda-eletronicos-guia-2026" className="underline font-medium">
                  Veja o guia completo de recibos eletrónicos.
                </Link>
              </p>
            </div>

            <h2 id="faq">8. Perguntas frequentes</h2>

            <div className="not-prose space-y-4 mb-8">
              {[
                {
                  q: "Tenho de registar contratos de arrendamento de quarto?",
                  a: "Depende da natureza do contrato. Se for um contrato de arrendamento habitacional formal, sim — aplica-se o mesmo regime. Se for um contrato de hospedagem ou cedência de espaço sem arrendamento formal, as regras podem ser diferentes. Em caso de dúvida, consulte um advogado ou contabilista.",
                },
                {
                  q: "O inquilino também tem de fazer algum registo?",
                  a: "Não. A obrigação de comunicar o contrato à AT é exclusivamente do senhorio (locador). O inquilino pode consultar os contratos registados em seu nome no Portal das Finanças, mas não tem obrigação de os registar.",
                },
                {
                  q: "E se o inquilino não quiser dar o NIF?",
                  a: "O NIF do inquilino é obrigatório para o registo. Se o inquilino se recusa a fornecê-lo, está a dificultar o cumprimento de uma obrigação legal sua. Nesse caso, documente o pedido por escrito e, se necessário, consulte um advogado. Não registar o contrato por falta do NIF do inquilino não isenta o senhorio da coima.",
                },
                {
                  q: "Posso delegar o registo num contabilista?",
                  a: "Sim. Um contabilista certificado (TOC) pode realizar o registo em seu nome através do Portal das Finanças com as suas credenciais ou através de procuração. Se tiver vários imóveis arrendados, faz sentido centralizar esta gestão num profissional.",
                },
                {
                  q: "O que é o 'artigo matricial'?",
                  a: "É o número de identificação do seu imóvel nos registos da Autoridade Tributária. Encontra-o na caderneta predial urbana do imóvel, disponível no Portal das Finanças, ou na nota de cobrança do IMI. Parece algo como 'U-1234 / Fração A'.",
                },
              ].map((item, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-5">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">{item.q}</h4>
                  <p className="text-gray-600 text-sm">{item.a}</p>
                </div>
              ))}
            </div>

            <div className="not-prose mt-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white text-center">
              <h3 className="text-xl font-bold mb-3">
                Gerencie todos os seus arrendamentos num só lugar
              </h3>
              <p className="text-blue-100 mb-6 text-sm max-w-lg mx-auto">
                O Senhorio ajuda-o a controlar prazos, rendas, recibos e obrigações fiscais —
                tudo em português e desenhado para a realidade dos senhorios portugueses.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/#waitlist"
                  className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition text-sm"
                >
                  Entrar na Lista de Espera
                </Link>
                <Link
                  href="/blog/recibos-renda-eletronicos-guia-2026"
                  className="px-6 py-3 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-blue-600 transition text-sm"
                >
                  Ver Guia de Recibos
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <section className="mt-16 border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Artigos Relacionados</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/blog/recibos-renda-eletronicos-guia-2026" className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition block">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                Recibos de Renda Eletrónicos: Guia 2026
              </h3>
              <p className="text-gray-500 text-xs mb-3">Como emitir no Portal das Finanças.</p>
              <span className="text-blue-600 text-xs font-medium">Ler artigo →</span>
            </Link>
            <Link href="/blog/como-calcular-atualizacoes-renda-2026" className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition block">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                Atualização de Rendas 2026
              </h3>
              <p className="text-gray-500 text-xs mb-3">Coeficiente INE 2,24% e regras NRAU.</p>
              <span className="text-blue-600 text-xs font-medium">Ler artigo →</span>
            </Link>
            <Link href="/blog/despesas-dedutiveis-arrendamento-2026" className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition block">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                Despesas Dedutíveis no IRS 2026
              </h3>
              <p className="text-gray-500 text-xs mb-3">O que pode declarar para pagar menos.</p>
              <span className="text-blue-600 text-xs font-medium">Ler artigo →</span>
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
            "headline": "Registo de Contrato de Arrendamento na AT 2026: Guia Completo",
            "description": "Como registar o contrato de arrendamento na Autoridade Tributária. Prazos, documentos, coimas e passo a passo.",
            "author": { "@type": "Organization", "name": "Senhorio" },
            "publisher": {
              "@type": "Organization",
              "name": "Senhorio",
              "logo": { "@type": "ImageObject", "url": "https://senhorio.vercel.app/logo.png" }
            },
            "datePublished": "2026-04-04T12:00:00.000Z",
            "dateModified": "2026-04-04T12:00:00.000Z",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://senhorio.vercel.app/blog/registo-contrato-arrendamento-at-2026"
            },
            "keywords": "registo contrato arrendamento AT, Portal das Finanças, prazo registo contrato, coima arrendamento",
            "articleSection": "Legal Guide"
          })
        }}
      />
    </div>
  );
}
