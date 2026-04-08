import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contrato de Arrendamento Habitacional 2026: Cláusulas Obrigatórias e Registo | Senhorio",
  description: "Guia completo sobre o contrato de arrendamento habitacional em Portugal 2026. Cláusulas obrigatórias, duração, renovação automática, erros comuns e como registar na AT.",
  keywords: [
    "contrato arrendamento habitacional 2026",
    "contrato arrendamento portugal",
    "clausulas contrato arrendamento",
    "modelo contrato arrendamento 2026",
    "contrato arrendamento obrigatorio",
    "NRAU contrato arrendamento",
    "duração contrato arrendamento",
    "renovação contrato arrendamento",
  ],
  openGraph: {
    title: "Contrato de Arrendamento Habitacional 2026: Cláusulas Obrigatórias e Registo",
    description: "O que tem de constar obrigatoriamente num contrato de arrendamento habitacional em Portugal. Duração mínima, renovação, cláusulas essenciais e erros a evitar.",
    type: "article",
    publishedTime: "2026-04-08T11:00:00.000Z",
  },
  alternates: {
    canonical: "https://senhorio.vercel.app/blog/contrato-arrendamento-habitacional-2026",
  },
};

export default function ContratoArrendamentoHabitacionalPage() {
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
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full font-medium">
                Contrato Arrendamento
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
                Obrigações Legais
              </span>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm rounded-full font-medium">
                Guia 2026
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Contrato de Arrendamento Habitacional 2026: Cláusulas Obrigatórias, Duração e Registo
            </h1>

            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              Um contrato de arrendamento mal redigido pode custar caro — seja por não conseguir
              provar direitos que pensava ter, seja por incluir cláusulas que a lei considera nulas.
              Este guia percorre o que a lei portuguesa exige, o que convém incluir por razões
              práticas, e os erros mais comuns que os senhorios cometem.
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500 border-l-4 border-indigo-500 pl-4">
              <time dateTime="2026-04-08T11:00:00.000Z">
                8 de abril de 2026
              </time>
              <span>•</span>
              <span>13 minutos de leitura</span>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-gray prose-lg max-w-none">
            {/* Waitlist CTA */}
            <div className="not-prose bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                Gira os seus contratos, rendas e recibos num só lugar
              </h3>
              <p className="text-indigo-700 mb-4">
                O Senhorio organiza todos os seus contratos, regista pagamentos e emite recibos
                legais automaticamente. Feito para a realidade do senhorio português.
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
                <li><a href="#forma-obrigatoria" className="text-blue-600 hover:text-blue-800">1. Forma escrita e assinatura — o mínimo legal</a></li>
                <li><a href="#clausulas-obrigatorias" className="text-blue-600 hover:text-blue-800">2. Cláusulas obrigatórias por lei</a></li>
                <li><a href="#duracao" className="text-blue-600 hover:text-blue-800">3. Duração do contrato e renovação automática</a></li>
                <li><a href="#clausulas-recomendadas" className="text-blue-600 hover:text-blue-800">4. Cláusulas recomendadas (não obrigatórias)</a></li>
                <li><a href="#clausulas-nulas" className="text-blue-600 hover:text-blue-800">5. Cláusulas nulas — o que não pode incluir</a></li>
                <li><a href="#registo-at" className="text-blue-600 hover:text-blue-800">6. Registo obrigatório na AT</a></li>
                <li><a href="#erros-comuns" className="text-blue-600 hover:text-blue-800">7. Erros mais comuns que os senhorios cometem</a></li>
                <li><a href="#faq" className="text-blue-600 hover:text-blue-800">8. Perguntas frequentes</a></li>
              </ol>
            </nav>

            <h2 id="forma-obrigatoria">1. Forma escrita e assinatura — o mínimo legal</h2>

            <p>
              O contrato de arrendamento habitacional <strong>tem de ser celebrado por escrito</strong>,
              de acordo com o artigo 1069.º do Código Civil. Um acordo verbal não tem valor legal para
              fins de arrendamento habitacional e não pode ser registado na Autoridade Tributária.
            </p>

            <p>
              O contrato deve ser assinado por ambas as partes (senhorio e inquilino) e, quando
              existam, por todos os arrendatários e sublocatários. A assinatura deve estar em todas
              as páginas ou, no mínimo, na última página com rubrica nas anteriores.
            </p>

            <div className="not-prose bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
              <p className="text-sm font-semibold text-amber-800 mb-1">Quantos exemplares?</p>
              <p className="text-sm text-amber-700">
                O contrato deve ser feito em tantos exemplares quantas as partes, ficando cada uma
                com o seu original. Guarde sempre um exemplar em local seguro — é o seu documento
                base em qualquer litígio futuro.
              </p>
            </div>

            <h2 id="clausulas-obrigatorias">2. Cláusulas obrigatórias por lei</h2>

            <p>
              A lei não impõe um modelo único de contrato, mas exige que certos elementos estejam
              presentes. Um contrato que omita informação obrigatória pode ser inválido para certos
              fins legais (como o registo na AT) ou dar origem a interpretações desfavoráveis ao senhorio.
            </p>

            <h3>Identificação das partes</h3>
            <ul>
              <li>Nome completo e NIF (número de identificação fiscal) do senhorio</li>
              <li>Nome completo e NIF do inquilino (e eventuais co-arrendatários)</li>
              <li>Morada de cada parte para efeitos de notificações</li>
            </ul>

            <h3>Identificação do imóvel</h3>
            <ul>
              <li>Morada completa com código postal</li>
              <li>Artigo matricial (necessário para o registo na AT)</li>
              <li>Fração ou letra (se for apartamento num prédio em propriedade horizontal)</li>
              <li>Finalidade do arrendamento (habitação permanente)</li>
            </ul>

            <h3>Valor da renda</h3>
            <ul>
              <li>Montante mensal em euros</li>
              <li>Dia de vencimento (habitualmente o primeiro dia de cada mês ou até ao 8.º dia)</li>
              <li>Conta bancária do senhorio para pagamento (recomendável)</li>
            </ul>

            <h3>Duração do contrato</h3>
            <ul>
              <li>Data de início</li>
              <li>Data de fim (se for prazo determinado) ou menção de que é por tempo indeterminado</li>
            </ul>

            <h3>Caução (se aplicável)</h3>
            <ul>
              <li>Montante</li>
              <li>Data e forma de pagamento</li>
              <li>Condições de retenção e devolução</li>
            </ul>

            <h2 id="duracao">3. Duração do contrato e renovação automática</h2>

            <p>
              O NRAU define regras diferentes consoante a duração do contrato que as partes escolham.
            </p>

            <div className="not-prose overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Duração acordada</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Renovação automática</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Pré-aviso do senhorio para não renovar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3">Igual ou superior a 6 anos</td>
                    <td className="border border-gray-200 px-4 py-3">Renova por períodos iguais</td>
                    <td className="border border-gray-200 px-4 py-3">240 dias de antecedência</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3">Entre 1 e 6 anos</td>
                    <td className="border border-gray-200 px-4 py-3">Renova por períodos iguais</td>
                    <td className="border border-gray-200 px-4 py-3">120 dias de antecedência</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3">Entre 6 meses e 1 ano</td>
                    <td className="border border-gray-200 px-4 py-3">Renova por períodos iguais</td>
                    <td className="border border-gray-200 px-4 py-3">60 dias de antecedência</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3">Inferior a 6 meses</td>
                    <td className="border border-gray-200 px-4 py-3">Renova por 1 único período igual</td>
                    <td className="border border-gray-200 px-4 py-3">Não pode oponor-se à primeira renovação</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              O contrato mais comum em Portugal é de <strong>1 ano</strong>. Renova automaticamente
              por mais 1 ano se nenhuma das partes comunicar a intenção de não renovar com 120 dias
              de antecedência (senhorio) ou 30 dias (inquilino).
            </p>

            <div className="not-prose bg-red-50 border border-red-200 rounded-xl p-5 my-6">
              <p className="text-sm font-semibold text-red-800 mb-1">Atenção ao pré-aviso:</p>
              <p className="text-sm text-red-700">
                O prazo de pré-aviso conta a partir da data em que o inquilino <em>recebe</em> a
                comunicação, não da data em que a envia. Se enviar uma carta registada que demora
                3 dias a chegar, esses 3 dias não contam para o pré-aviso. Envie com folga.
              </p>
            </div>

            <h3>Duração mínima: 1 ano</h3>

            <p>
              Para arrendamento habitacional, a lei proíbe contratos com prazo inferior a 1 ano
              (salvo situações específicas como arrendamento por temporada, estudantes ou razões
              profissionais temporárias). Se as partes acordarem um prazo inferior, o contrato
              converte-se automaticamente num contrato de 1 ano.
            </p>

            <h2 id="clausulas-recomendadas">4. Cláusulas recomendadas (não obrigatórias)</h2>

            <p>
              Além do mínimo legal, existem cláusulas que, embora não sejam obrigatórias, protegem
              o senhorio em situações comuns:
            </p>

            <h3>Obras e benfeitorias</h3>
            <p>
              Especifique que o inquilino não pode realizar obras sem autorização escrita prévia
              do senhorio. Indique também quem fica com o benefício das benfeitorias realizadas
              com autorização (regra geral: ficam integradas no imóvel sem direito a indemnização,
              salvo acordo em contrário).
            </p>

            <h3>Sublocação</h3>
            <p>
              Proíba expressamente a sublocação ou subarrendamento sem consentimento escrito.
              Por defeito, a lei permite sublocação parcial sem autorização em alguns casos —
              uma cláusula de proibição elimina qualquer ambiguidade.
            </p>

            <h3>Animais de estimação</h3>
            <p>
              Atenção: a lei portuguesa proíbe a inclusão de cláusulas que vedem em absoluto
              a detenção de animais de companhia (Lei n.º 8/2017). Pode, no entanto, incluir
              condições razoáveis (número máximo, raças específicas, regras de conduta).
            </p>

            <h3>Número de ocupantes</h3>
            <p>
              Indique o número máximo de pessoas que podem habitar o imóvel. Não pode impedir a
              habitação de filhos menores que nasçam durante o contrato, mas pode limitar a
              entrada de terceiros sem relação familiar próxima.
            </p>

            <h3>Atualização anual da renda</h3>
            <p>
              Inclua uma cláusula que permita a atualização anual da renda com base no coeficiente
              publicado pelo INE. Sem esta cláusula, as atualizações são permitidas por lei, mas
              a comunicação ao inquilino torna-se mais complexa.
            </p>

            <h3>Vistoria e auto de estado</h3>
            <p>
              Mencione que foi realizado um auto de vistoria inicial (e que o mesmo fica anexo ao
              contrato). Isto vincula ambas as partes ao estado documentado no início do contrato.
            </p>

            <h2 id="clausulas-nulas">5. Cláusulas nulas — o que não pode incluir</h2>

            <p>
              Certas cláusulas são nulas por lei, mesmo que ambas as partes as assinem. Incluí-las
              não produz efeito legal e pode gerar conflitos desnecessários:
            </p>

            <ul>
              <li>
                <strong>Renúncia à renovação automática</strong> — o inquilino não pode renunciar
                antecipadamente ao direito de renovação do contrato
              </li>
              <li>
                <strong>Proibição absoluta de ter animais de companhia</strong> — a lei proíbe esta
                limitação desde 2017 (pode haver condições, não proibição absoluta)
              </li>
              <li>
                <strong>Caução superior a 2 meses de renda</strong> em contratos habitacionais
              </li>
              <li>
                <strong>Limitação do direito de uso pleno do imóvel</strong> — não pode proibir
                o inquilino de usar certas divisões do imóvel que arrendou
              </li>
              <li>
                <strong>Obrigação de aceitar obras não urgentes sem prazo razoável de aviso</strong>
              </li>
            </ul>

            <h2 id="registo-at">6. Registo obrigatório na AT</h2>

            <p>
              O registo do contrato de arrendamento na Autoridade Tributária é obrigatório.
              O prazo é de <strong>30 dias</strong> a contar da data de início do contrato.
              O incumprimento pode implicar coimas e impossibilita a dedução de despesas
              relacionadas com o imóvel no IRS.
            </p>

            <p>
              O registo faz-se no Portal das Finanças, em <em>Cidadãos → Propriedades → Arrendamento
              → Registar Contrato</em>. Precisa do NIF e senha de acesso ao portal, do artigo matricial
              do imóvel e do contrato assinado (em alguns casos é pedida cópia digitalizada).
            </p>

            <p>
              Para um guia detalhado passo a passo do registo na AT, consulte:{" "}
              <Link href="/blog/registo-contrato-arrendamento-at-2026" className="text-blue-600 hover:text-blue-800">
                Registo de Contrato de Arrendamento na AT 2026
              </Link>.
            </p>

            <h2 id="erros-comuns">7. Erros mais comuns que os senhorios cometem</h2>

            <h3>Usar modelos desatualizados</h3>
            <p>
              O NRAU foi alterado várias vezes na última década. Contratos escritos antes de 2012,
              2017 ou 2022 podem ter cláusulas que entretanto se tornaram nulas ou que já não
              refletem a lei em vigor. Reveja o modelo antes de o usar — ou peça assessoria jurídica.
            </p>

            <h3>Não fazer auto de vistoria inicial</h3>
            <p>
              Sem registo fotográfico do estado do imóvel na entrega das chaves, qualquer dano
              será palavra contra palavra. Esta é provavelmente a proteção mais simples e mais
              negligenciada pelos senhorios.
            </p>

            <h3>Não registar o contrato na AT a tempo</h3>
            <p>
              O prazo de 30 dias passa rápido, especialmente se o arrendamento começa no verão com
              outras distrações. Configure um lembrete no dia em que assinar o contrato.
            </p>

            <h3>Não identificar o imóvel com o artigo matricial</h3>
            <p>
              Um contrato que apenas refere a morada, sem artigo matricial, não pode ser registado
              na AT. Confirme o artigo matricial na caderneta predial antes de assinar.
            </p>

            <h3>Incluir o número de NIF do inquilino errado</h3>
            <p>
              Soa básico, mas acontece. Um NIF errado inviabiliza o registo e pode causar problemas
              na emissão de recibos eletrónicos e na declaração de IRS. Confirme sempre com documento
              de identificação na mão.
            </p>

            <h3>Não comunicar a opção fiscal ao inquilino</h3>
            <p>
              Se optar pelo regime de taxa reduzida de 10% (rendas moderadas) ou RSAA 0%, o inquilino
              precisa de saber que está vinculado a um teto de renda para que o senhorio mantenha o
              benefício fiscal. Esta comunicação deve estar documentada.
            </p>

            <h2 id="faq">8. Perguntas frequentes</h2>

            <h3>Preciso de advogado para redigir o contrato?</h3>
            <p>
              A lei não obriga, mas para imóveis de valor elevado ou situações complexas (vários
              co-arrendatários, arrendamento com opção de compra, imóvel em propriedade horizontal
              com regras de condomínio complexas), a assessoria jurídica de um advogado ou solicitador
              vale o custo. Para um arrendamento habitacional padrão, um modelo bem atualizado é
              suficiente.
            </p>

            <h3>O contrato pode ser alterado depois de assinado?</h3>
            <p>
              Sim, mas apenas com acordo de ambas as partes e por escrito. Uma alteração unilateral
              por parte do senhorio (como aumentar a renda fora das condições previstas) não tem
              validade legal. Qualquer adenda ao contrato deve ser assinada pelas mesmas partes que
              assinaram o original.
            </p>

            <h3>O que acontece se o contrato terminar e o inquilino não sair?</h3>
            <p>
              Se o contrato for de prazo certo e o senhorio comunicou devidamente a não renovação,
              o inquilino que permaneça no imóvel após o fim do prazo está em incumprimento. O senhorio
              pode recorrer ao BALP ou aos tribunais para obter a desocupação. O inquilino fica obrigado
              a pagar uma indemnização equivalente à renda durante o tempo em que permaneça sem título.
            </p>

            <h3>Pode o inquilino transmitir o contrato a outra pessoa?</h3>
            <p>
              Em caso de morte do arrendatário, o cônjuge ou companheiro de facto e descendentes ou
              ascendentes que com ele vivessem têm direito à transmissão do contrato. Fora destes
              casos, a transmissão (cessão de posição contratual) exige o consentimento do senhorio.
            </p>

            <h3>E se o contrato não tiver data de fim?</h3>
            <p>
              Contratos habitacionais sem indicação de prazo consideram-se celebrados por 2 anos,
              de acordo com o NRAU. Renovam-se automaticamente por períodos iguais se nenhuma das
              partes comunicar a não renovação com a antecedência legalmente exigida.
            </p>

            {/* Final CTA */}
            <div className="not-prose bg-indigo-50 border border-indigo-200 rounded-xl p-6 mt-10">
              <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                Organize todos os seus contratos e rendas num só lugar
              </h3>
              <p className="text-indigo-700 mb-4">
                O Senhorio armazena os dados de cada contrato, calcula atualizações anuais de renda,
                emite recibos legais e exporta os dados para o IRS. Feito para o contexto português.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/#waitlist"
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
                >
                  Entrar na Lista de Espera →
                </Link>
                <Link
                  href="/blog/caucao-arrendamento-2026"
                  className="inline-flex items-center px-4 py-2 bg-white text-indigo-700 border border-indigo-300 rounded-lg font-medium hover:bg-indigo-50 transition"
                >
                  Guia sobre a caução →
                </Link>
              </div>
            </div>

            {/* Related articles */}
            <div className="not-prose mt-10 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Artigos relacionados</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Link href="/blog/registo-contrato-arrendamento-at-2026" className="block p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
                  <p className="font-medium text-gray-900 mb-1">Registo de Contrato na AT 2026</p>
                  <p className="text-sm text-gray-600">Passo a passo no Portal das Finanças</p>
                </Link>
                <Link href="/blog/caucao-arrendamento-2026" className="block p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
                  <p className="font-medium text-gray-900 mb-1">Caução no Arrendamento 2026</p>
                  <p className="text-sm text-gray-600">Montante máximo, retenção e devolução</p>
                </Link>
                <Link href="/blog/como-calcular-atualizacoes-renda-2026" className="block p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
                  <p className="font-medium text-gray-900 mb-1">Atualização de Rendas 2026</p>
                  <p className="text-sm text-gray-600">Coeficiente INE e regras do NRAU</p>
                </Link>
                <Link href="/blog/inquilino-nao-paga-renda-o-que-fazer" className="block p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
                  <p className="font-medium text-gray-900 mb-1">Inquilino Não Paga Renda</p>
                  <p className="text-sm text-gray-600">Da notificação ao BALP — guia legal</p>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
