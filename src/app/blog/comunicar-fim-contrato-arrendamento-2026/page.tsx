import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comunicar Fim de Contrato de Arrendamento 2026: Pré-Aviso, Carta e Prazos | Senhorio",
  description: "Como comunicar o fim do contrato de arrendamento em Portugal 2026. Prazos de pré-aviso obrigatórios, modelo de carta, formas de envio e o que fazer se o inquilino não sair.",
  keywords: [
    "comunicar fim contrato arrendamento",
    "carta não renovação arrendamento",
    "pré-aviso arrendamento senhorio",
    "prazo pré-aviso arrendamento",
    "modelo carta fim arrendamento",
    "oposição renovação contrato arrendamento",
    "como terminar contrato arrendamento portugal",
    "denúncia contrato arrendamento",
    "não renovação arrendamento 2026",
    "pré-aviso 120 dias arrendamento",
  ],
  openGraph: {
    title: "Comunicar Fim de Contrato de Arrendamento 2026: Pré-Aviso, Carta e Prazos",
    description: "Guia prático para senhorios que querem terminar um contrato de arrendamento. Prazos, modelo de carta e procedimentos legais em 2026.",
    type: "article",
    publishedTime: "2026-04-09T09:00:00.000Z",
  },
  alternates: {
    canonical: "https://senhorio.vercel.app/blog/comunicar-fim-contrato-arrendamento-2026",
  },
};

export default function ComunicarFimContratoArrendamento() {
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
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full font-medium">
                Contrato Arrendamento
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
                Pré-Aviso
              </span>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm rounded-full font-medium">
                Guia 2026
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Comunicar Fim de Contrato de Arrendamento: Pré-Aviso, Carta e Prazos em 2026
            </h1>

            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              Não comunicar o fim do contrato a tempo pode forçar o senhorio a suportar mais um
              período de arrendamento que não quer. Os prazos de pré-aviso são rígidos e
              a forma de comunicação tem de estar certa — uma carta entregue tarde ou com vícios
              formais não produz efeitos legais.
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500 border-l-4 border-indigo-500 pl-4">
              <time dateTime="2026-04-09T09:00:00.000Z">9 de abril de 2026</time>
              <span>•</span>
              <span>11 minutos de leitura</span>
            </div>
          </header>

          <div className="prose prose-gray prose-lg max-w-none">
            {/* CTA */}
            <div className="not-prose bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                Nunca perca um prazo de pré-aviso
              </h3>
              <p className="text-indigo-700 mb-4">
                O Senhorio avisa-o automaticamente quando se aproxima o prazo para comunicar
                o fim ou não renovação do contrato. Sem surpresas, sem prazos perdidos.
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
                <li><a href="#tipos-termino" className="text-blue-600 hover:text-blue-800">1. As diferentes formas de terminar um contrato</a></li>
                <li><a href="#prazos-preaviso" className="text-blue-600 hover:text-blue-800">2. Prazos de pré-aviso por tipo de contrato</a></li>
                <li><a href="#como-comunicar" className="text-blue-600 hover:text-blue-800">3. Como tem de ser feita a comunicação</a></li>
                <li><a href="#modelo-carta" className="text-blue-600 hover:text-blue-800">4. Modelo de carta de não renovação</a></li>
                <li><a href="#causas-resolucao" className="text-blue-600 hover:text-blue-800">5. Resolução do contrato por incumprimento</a></li>
                <li><a href="#inquilino-nao-sai" className="text-blue-600 hover:text-blue-800">6. O que fazer se o inquilino não sai</a></li>
                <li><a href="#erros-comuns" className="text-blue-600 hover:text-blue-800">7. Erros que invalidam a comunicação</a></li>
                <li><a href="#faq" className="text-blue-600 hover:text-blue-800">8. Perguntas frequentes</a></li>
              </ol>
            </nav>

            <h2 id="tipos-termino">1. As diferentes formas de terminar um contrato</h2>

            <p>
              Nem todos os fins de contrato funcionam da mesma forma. O NRAU distingue quatro
              situações com regras diferentes:
            </p>

            <ul>
              <li>
                <strong>Oposição à renovação</strong> — o contrato tem prazo determinado e renova
                automaticamente, mas o senhorio comunica que não quer que renove. É o caso mais comum.
              </li>
              <li>
                <strong>Denúncia livre</strong> — o senhorio resolve o contrato antes de o prazo
                acabar, sem necessidade de causa (apenas permitida em contratos de prazo igual
                ou superior a 2 anos, com pré-aviso mais longo).
              </li>
              <li>
                <strong>Resolução por incumprimento</strong> — o inquilino não cumpre as obrigações
                contratuais (renda em atraso, uso indevido do imóvel), e o senhorio resolve o
                contrato com base nesse incumprimento.
              </li>
              <li>
                <strong>Mútuo acordo</strong> — ambas as partes acordam terminar o contrato em
                qualquer momento, sem pré-aviso obrigatório, desde que o acordo seja reduzido a escrito.
              </li>
            </ul>

            <div className="not-prose bg-blue-50 border border-blue-200 rounded-xl p-5 my-6">
              <p className="text-sm font-semibold text-blue-800 mb-1">O caso mais frequente</p>
              <p className="text-sm text-blue-700">
                A esmagadora maioria dos senhorios quer simplesmente que o contrato não renove
                quando chegar ao fim do prazo. Isso chama-se <strong>oposição à renovação</strong>
                e tem regras claras de prazo e forma. Este guia foca-se principalmente nessa situação.
              </p>
            </div>

            <h2 id="prazos-preaviso">2. Prazos de pré-aviso por tipo de contrato</h2>

            <p>
              O prazo de pré-aviso que o senhorio tem de respeitar para comunicar a não renovação
              depende da duração do contrato:
            </p>

            <div className="not-prose overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Duração do contrato</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Pré-aviso do senhorio</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Pré-aviso do inquilino</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3">Igual ou superior a 6 anos</td>
                    <td className="border border-gray-200 px-4 py-3 font-medium text-red-700">240 dias</td>
                    <td className="border border-gray-200 px-4 py-3">120 dias</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3">Entre 1 e 6 anos</td>
                    <td className="border border-gray-200 px-4 py-3 font-medium text-red-700">120 dias</td>
                    <td className="border border-gray-200 px-4 py-3">60 dias</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3">Entre 6 meses e 1 ano</td>
                    <td className="border border-gray-200 px-4 py-3 font-medium text-red-700">60 dias</td>
                    <td className="border border-gray-200 px-4 py-3">30 dias</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3">Inferior a 6 meses</td>
                    <td className="border border-gray-200 px-4 py-3 font-medium text-red-700">Não pode opor-se à 1.ª renovação</td>
                    <td className="border border-gray-200 px-4 py-3">15 dias</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              O contrato mais comum em Portugal é de 1 ano. O senhorio tem de comunicar a não
              renovação <strong>com pelo menos 120 dias de antecedência</strong> relativamente
              ao fim do prazo contratual.
            </p>

            <div className="not-prose bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
              <p className="text-sm font-semibold text-amber-800 mb-2">Exemplo prático:</p>
              <p className="text-sm text-amber-700">
                Contrato de 1 ano que termina a <strong>31 de dezembro de 2026</strong>. O senhorio
                tem de comunicar a não renovação até ao dia <strong>2 de setembro de 2026</strong>
                (120 dias antes). Se comunicar no dia 3 de setembro, chega tarde — o contrato
                renova automaticamente por mais um ano.
              </p>
            </div>

            <h3>Denúncia livre (resolução antecipada)</h3>

            <p>
              Para terminar o contrato <em>antes</em> do prazo, o senhorio necessita de pré-avisos
              ainda mais longos:
            </p>

            <ul>
              <li>Contrato com 2 anos ou mais: pré-aviso de <strong>120 dias</strong></li>
              <li>Contrato com 1 a 2 anos: pré-aviso de <strong>60 dias</strong></li>
              <li>Contrato com menos de 1 ano: <strong>não é permitida a denúncia livre</strong></li>
            </ul>

            <p>
              A denúncia livre implica, na maioria dos casos, o pagamento de uma compensação
              ao inquilino equivalente a um mês de renda por cada ano (ou fração) que reste do
              contrato. Esta possibilidade deve estar expressamente prevista no contrato ou
              consentida pelo inquilino.
            </p>

            <h2 id="como-comunicar">3. Como tem de ser feita a comunicação</h2>

            <p>
              A lei é clara: a comunicação de oposição à renovação tem de respeitar dois
              requisitos cumulativos.
            </p>

            <h3>Forma escrita</h3>
            <p>
              A comunicação tem de ser feita por escrito, com indicação da intenção de não renovar
              e a data em que o contrato termina. Um telefonema, uma mensagem de texto ou um
              email sem confirmação de receção <strong>não têm valor legal</strong> para este efeito.
            </p>

            <h3>Meios de comunicação admissíveis</h3>
            <ul>
              <li>
                <strong>Carta registada com aviso de receção (A/R)</strong> — o meio mais seguro.
                O carimbo dos CTT com a data de entrega é prova judicial do momento em que o
                inquilino recebeu a comunicação.
              </li>
              <li>
                <strong>Entrega em mão com recibo assinado</strong> — válida, mas requer que
                o inquilino assine um documento a confirmar que recebeu. Se recusar, voltamos
                ao problema da prova.
              </li>
              <li>
                <strong>Notificação por notário ou solicitador</strong> — a opção mais robusta
                juridicamente, útil quando há conflito antecipado com o inquilino.
              </li>
            </ul>

            <div className="not-prose bg-red-50 border border-red-200 rounded-xl p-5 my-6">
              <p className="text-sm font-semibold text-red-800 mb-1">Atenção crítica ao prazo:</p>
              <p className="text-sm text-red-700">
                O prazo conta a partir do momento em que o inquilino <em>recebe</em> a carta —
                não da data em que foi enviada. Se enviar no dia 2 de setembro e a carta demorar
                3 dias a chegar, só há 117 dias de antecedência. <strong>Envie sempre com
                margem de pelo menos uma semana.</strong>
              </p>
            </div>

            <h2 id="modelo-carta">4. Modelo de carta de não renovação</h2>

            <p>
              Não existe um modelo oficial obrigatório, mas a carta deve conter elementos mínimos
              para ser eficaz. Eis um exemplo adaptável:
            </p>

            <div className="not-prose bg-gray-50 border border-gray-200 rounded-xl p-6 my-6 font-mono text-sm">
              <p className="text-gray-500 mb-4 font-sans font-medium text-base not-italic">Modelo de carta de oposição à renovação</p>
              <div className="space-y-3 text-gray-800">
                <p>[Nome do Senhorio]<br />[Morada do Senhorio]<br />[NIF do Senhorio]</p>
                <p>[Localidade], [Data]</p>
                <p><strong>Exmo(a). Sr(a).</strong> [Nome do Inquilino]<br />[Morada do Imóvel Arrendado]</p>
                <p><strong>Assunto: Oposição à renovação do contrato de arrendamento</strong></p>
                <p>
                  Na qualidade de senhorio do imóvel sito em [morada completa], identificado
                  pelo artigo matricial [n.º do artigo] da freguesia de [nome da freguesia],
                  venho por meio da presente comunicar que <strong>me oponho à renovação</strong>
                  do contrato de arrendamento celebrado em [data do contrato], cujo prazo
                  termina em [data de fim do contrato].
                </p>
                <p>
                  Nos termos do artigo 1097.º do Código Civil, fica desde já notificado(a) de
                  que deverá proceder à entrega do imóvel livre e devoluto na data de
                  [data de fim do contrato], em conformidade com o disposto no referido contrato
                  e na lei.
                </p>
                <p>Com os melhores cumprimentos,</p>
                <p>[Assinatura]<br />[Nome completo]</p>
              </div>
            </div>

            <div className="not-prose bg-blue-50 border border-blue-200 rounded-xl p-5 my-6">
              <p className="text-sm font-semibold text-blue-800 mb-1">Dica de uso:</p>
              <p className="text-sm text-blue-700">
                Guarde uma cópia da carta enviada e o comprovativo dos CTT do registo A/R (incluindo
                o aviso de receção assinado quando for devolvido). São os seus documentos de prova
                em caso de litígio.
              </p>
            </div>

            <h2 id="causas-resolucao">5. Resolução do contrato por incumprimento</h2>

            <p>
              Quando há incumprimento do inquilino, o senhorio pode resolver o contrato
              <em>antes</em> do fim do prazo, sem necessidade de cumprir os prazos de
              pré-aviso acima. As causas mais comuns são:
            </p>

            <h3>Falta de pagamento de renda</h3>
            <p>
              A falta de pagamento de 2 ou mais rendas consecutivas é causa de resolução.
              O senhorio tem de notificar o inquilino da mora e conceder-lhe um prazo de
              8 dias para regularizar. Se não pagar, pode enviar a comunicação de resolução
              e desencadear o procedimento de despejo no Balcão Nacional do Arrendamento
              (BALP).
            </p>

            <h3>Uso do imóvel para fins não contratuais</h3>
            <p>
              Se o imóvel estiver a ser usado para fins não previstos no contrato
              (ex.: transformação em alojamento local sem autorização, atividade comercial
              num imóvel habitacional), é causa de resolução.
            </p>

            <h3>Subarrendamento sem autorização</h3>
            <p>
              Se o contrato proibir o subarrendamento e o inquilino sublocar sem
              autorização escrita do senhorio, é também causa de resolução.
            </p>

            <h3>Obras não autorizadas</h3>
            <p>
              Obras de remodelação ou modificação estrutural feitas pelo inquilino sem
              autorização do senhorio e que alterem o imóvel são causa de resolução.
            </p>

            <p>
              Para um guia completo sobre o que fazer em caso de renda em atraso e o
              procedimento no BALP, consulte:{" "}
              <Link href="/blog/inquilino-nao-paga-renda-o-que-fazer" className="text-blue-600 hover:text-blue-800">
                Inquilino Não Paga Renda: O Que Fazer em 2026
              </Link>.
            </p>

            <h2 id="inquilino-nao-sai">6. O que fazer se o inquilino não sai</h2>

            <p>
              Comunicou devidamente a não renovação, o prazo do contrato terminou, mas o
              inquilino não saiu. O que pode fazer?
            </p>

            <h3>Situação legal do inquilino</h3>
            <p>
              Após a data de fim do contrato, o inquilino que permanece no imóvel sem
              título está em <strong>mora no cumprimento da obrigação de restituição</strong>.
              É devida uma indemnização ao senhorio equivalente ao dobro do valor da renda
              pelo tempo em que permanece sem título, além de eventuais danos.
            </p>

            <h3>Procedimento especial de despejo (BALP)</h3>
            <p>
              O senhorio pode requerer o despejo no <strong>Balcão Nacional do Arrendamento
              (BALP)</strong>. O procedimento é relativamente ágil quando há prova da
              comunicação de não renovação e do fim do prazo contratual:
            </p>
            <ol>
              <li>Apresentar requerimento no BALP com os documentos do contrato e da comunicação</li>
              <li>O inquilino é notificado e tem prazo para contestar</li>
              <li>Se não contestar ou a contestação for improcedente, o BALP emite título de desocupação</li>
              <li>O agente de execução assegura a desocupação, se necessário com auxílio de autoridade policial</li>
            </ol>

            <div className="not-prose bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
              <p className="text-sm font-semibold text-amber-800 mb-1">Prazo do BALP:</p>
              <p className="text-sm text-amber-700">
                O BALP tem prazos legais para concluir o procedimento, mas na prática os
                atrasos acontecem. A chave para um processo rápido é ter a documentação toda
                em ordem: contrato, comunicação de não renovação com prova de receção, e
                prova do fim do prazo contratual.
              </p>
            </div>

            <h2 id="erros-comuns">7. Erros que invalidam a comunicação</h2>

            <h3>Comunicar por email ou WhatsApp</h3>
            <p>
              Sem confirmação de receção legal, estes meios não servem como prova do momento
              em que o inquilino foi notificado. O prazo de pré-aviso não começa a contar
              quando o senhorio envia — começa quando o inquilino recebe.
            </p>

            <h3>Não guardar o aviso de receção (A/R)</h3>
            <p>
              O comprovativo de envio dos CTT não chega. O aviso de receção assinado pelo
              inquilino (ou pelo familiar que recebeu a carta) é o documento que prova a data
              de entrega. Sem ele, o prazo de pré-aviso fica por provar.
            </p>

            <h3>Carta enviada para a morada errada</h3>
            <p>
              A carta deve ser enviada para a morada do imóvel arrendado ou para a morada
              alternativa que o inquilino indicou no contrato para efeitos de notificações.
              Senhorios que enviam para moradas desatualizadas ficam sem prova de entrega válida.
            </p>

            <h3>Calcular o prazo a partir da data de envio</h3>
            <p>
              O erro mais comum: o senhorio envia a carta 120 dias antes do fim do contrato
              mas a carta demora 3 dias a ser entregue. Só há 117 dias de antecedência —
              o prazo legal não foi respeitado.
            </p>

            <h3>Usar o prazo do inquilino em vez do prazo do senhorio</h3>
            <p>
              Os prazos de pré-aviso são assimétricos: o inquilino tem prazos mais curtos
              do que o senhorio. Se o senhorio usar os prazos do inquilino por engano, a
              comunicação pode ser considerada ineficaz.
            </p>

            <h2 id="faq">8. Perguntas frequentes</h2>

            <h3>Posso terminar o contrato se precisar do imóvel para uso próprio?</h3>
            <p>
              Sim, mas esta é a <strong>denúncia para habitação própria</strong>, que tem
              regras específicas. O senhorio tem de provar que necessita do imóvel para
              habitação própria ou de descendentes em 1.º grau, tem de respeitar prazos de
              pré-aviso mais longos (mínimo 2 anos de contrato restante) e pode ser obrigado
              a pagar indemnização ao inquilino. Consulte um advogado neste caso.
            </p>

            <h3>Se eu não comunicar a tempo, o contrato renova obrigatoriamente?</h3>
            <p>
              Sim. A renovação automática é a regra — a oposição à renovação é a exceção e
              tem de ser comunicada dentro do prazo. Se perder o prazo, o contrato renova
              por mais um período igual, e terá de aguardar até ao fim desse novo período
              para comunicar novamente.
            </p>

            <h3>O inquilino pode impedir a não renovação?</h3>
            <p>
              Em princípio não, para contratos habitacionais normais. O inquilino pode
              tentar invocar razões de necessidade habitacional em tribunal (ex.: falta de
              alternativa habitacional), mas para contratos celebrados com prazo certo e
              comunicação feita nos termos legais, a posição do senhorio é sólida.
            </p>

            <h3>Preciso de motivo para não querer renovar?</h3>
            <p>
              Para a oposição à renovação simples (contrato de prazo certo que chegou ao
              fim): não. O senhorio não precisa de justificar a razão. Para a denúncia
              antecipada (terminar antes do prazo): em geral também não, mas tem de pagar
              compensação ao inquilino.
            </p>

            <h3>O que acontece às chaves e à caução?</h3>
            <p>
              Na data de fim do contrato, o inquilino deve entregar as chaves e o imóvel
              em bom estado de conservação. O senhorio tem 30 dias para devolver a caução,
              deduzindo eventuais danos comprovados. Para detalhes sobre a caução, consulte{" "}
              <Link href="/blog/caucao-arrendamento-2026" className="text-blue-600 hover:text-blue-800">
                Caução no Arrendamento 2026
              </Link>.
            </p>

            {/* Final CTA */}
            <div className="not-prose bg-indigo-50 border border-indigo-200 rounded-xl p-6 mt-10">
              <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                Gerencie prazos de arrendamento sem stress
              </h3>
              <p className="text-indigo-700 mb-4">
                O Senhorio regista as datas de fim de cada contrato e avisa-o com antecedência
                suficiente para agir a tempo. Nunca mais perca um prazo de pré-aviso.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/#waitlist"
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
                >
                  Entrar na Lista de Espera →
                </Link>
                <Link
                  href="/blog/contrato-arrendamento-habitacional-2026"
                  className="inline-flex items-center px-4 py-2 bg-white text-indigo-700 border border-indigo-300 rounded-lg font-medium hover:bg-indigo-50 transition"
                >
                  Guia sobre contratos →
                </Link>
              </div>
            </div>

            {/* Related articles */}
            <div className="not-prose mt-10 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Artigos relacionados</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Link href="/blog/contrato-arrendamento-habitacional-2026" className="block p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
                  <p className="font-medium text-gray-900 mb-1">Contrato de Arrendamento 2026</p>
                  <p className="text-sm text-gray-600">Cláusulas obrigatórias e registo na AT</p>
                </Link>
                <Link href="/blog/inquilino-nao-paga-renda-o-que-fazer" className="block p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
                  <p className="font-medium text-gray-900 mb-1">Inquilino Não Paga Renda</p>
                  <p className="text-sm text-gray-600">Da notificação ao BALP — guia legal</p>
                </Link>
                <Link href="/blog/caucao-arrendamento-2026" className="block p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
                  <p className="font-medium text-gray-900 mb-1">Caução no Arrendamento 2026</p>
                  <p className="text-sm text-gray-600">Montante máximo, retenção e devolução</p>
                </Link>
                <Link href="/blog/como-calcular-atualizacoes-renda-2026" className="block p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
                  <p className="font-medium text-gray-900 mb-1">Atualização de Rendas 2026</p>
                  <p className="text-sm text-gray-600">Coeficiente INE e regras do NRAU</p>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
