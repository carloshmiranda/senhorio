import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Senhorio vs Google Sheets: Por Que o Sheets Não Chega para Gerir Rendas | Senhorio",
  description: "Comparação entre Senhorio e Google Sheets para gestão de arrendamento em Portugal. O que falta ao Sheets e por que uma plataforma dedicada poupa tempo e evita erros fiscais.",
  keywords: [
    "senhorio vs google sheets",
    "gestão arrendamento google sheets",
    "alternativa google sheets arrendamento",
    "google sheets gestão rendas",
    "software arrendamento portugal alternativa sheets",
    "planilha google arrendamento portugal",
    "gerir rendas google sheets",
    "google sheets vs software senhorio",
    "arrendamento online portugal ferramenta",
    "controlo rendas portugal plataforma",
  ],
  openGraph: {
    title: "Senhorio vs Google Sheets: Por Que o Sheets Não Chega para Gerir Rendas",
    description: "O Google Sheets é gratuito e funciona — mas não emite recibos legais, não avisa prazos, nem simula o IRS. Veja o que falta e o que uma plataforma dedicada muda.",
    type: "website",
  },
  alternates: {
    canonical: "https://senhorio.vercel.app/vs/google-sheets",
  },
};

export default function VsGoogleSheetsPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition">
            ← Voltar ao Senhorio
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full font-medium mb-4">
            Comparação
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Senhorio vs Google Sheets
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            O Google Sheets é a escolha de muitos senhorios portugueses — é gratuito, está
            sempre disponível e sincroniza automaticamente. Mas há coisas que simplesmente
            não consegue fazer.
          </p>
        </div>

        {/* Quick comparison */}
        <div className="not-prose overflow-x-auto mb-12">
          <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="px-5 py-4 text-left font-semibold">Funcionalidade</th>
                <th className="px-5 py-4 text-center font-semibold">Google Sheets</th>
                <th className="px-5 py-4 text-center font-semibold text-indigo-300">Senhorio</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Registo de pagamentos de renda", "✓ Manual", "✓ Automático"],
                ["Recibos eletrónicos legais (Portal Finanças)", "✗", "✓"],
                ["Acesso em qualquer dispositivo", "✓ (conta Google)", "✓"],
                ["Alertas de prazos contratuais", "✗ (tem de configurar)", "✓ Automático"],
                ["Cálculo de atualização de renda (INE)", "Manual, com fórmulas", "✓ Automático"],
                ["Simulação de IRS e regimes fiscais", "✗", "✓"],
                ["Relatório para Anexo F do IRS", "✗", "✓"],
                ["Registo de despesas dedutíveis", "Manual", "✓ Com categorias legais"],
                ["Histórico de contratos e documentos", "Ficheiros dispersos no Drive", "✓ Centralizado"],
                ["Custo", "Gratuito", "Plano pago"],
                ["Conformidade com NRAU e AT", "Responsabilidade do utilizador", "✓ Atualizado"],
                ["Partilha com contabilista", "✓ Partilha de ficheiro", "✓ Exportação estruturada"],
                ["Segurança de dados", "Depende da conta Google", "✓ Dedicada"],
              ].map(([feature, sheets, senhorio], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-200 px-5 py-3 font-medium text-gray-800">{feature}</td>
                  <td className="border border-gray-200 px-5 py-3 text-center text-gray-500">{sheets}</td>
                  <td className="border border-gray-200 px-5 py-3 text-center text-indigo-700 font-medium">{senhorio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detailed sections */}
        <div className="prose prose-gray prose-lg max-w-none">

          <h2>O Google Sheets funciona — até surgir o primeiro problema</h2>

          <p>
            O Google Sheets tem vantagens reais sobre o Excel para gerir rendas: está sempre
            acessível no telemóvel, sincroniza em tempo real, e pode ser partilhado com o
            cônjuge ou contabilista sem enviar ficheiros por e-mail.
          </p>

          <p>
            Para um senhorio com 1 imóvel e rotina estável, um Sheets bem organizado
            pode funcionar durante anos. O problema começa quando a lei exige ações que um
            Sheets simplesmente não pode executar — e quando um erro nessas ações tem custas
            fiscais ou legais.
          </p>

          <h2>O que o Google Sheets não faz por si</h2>

          <h3>1. Emitir recibos eletrónicos legais</h3>

          <p>
            A lei portuguesa obriga todos os senhorios a emitir recibo eletrónico no Portal das
            Finanças para cada pagamento de renda recebido. O Google Sheets pode registar o
            pagamento — mas não emite o recibo.
          </p>

          <p>
            Emitir um recibo no Portal das Finanças significa: fazer login, navegar até à área
            de recibos, preencher NIF do inquilino, valor, período, tipo de renda, e submeter.
            Para 3 imóveis, são 36 recibos por ano. Para 10 imóveis, são 120. O tempo acumula.
          </p>

          <p>
            A coima por não emissão de recibo pode ir até 3.750€ para pessoas singulares.
            Um Sheets não o avisa quando está em falta — e não o pode substituir no Portal das
            Finanças.
          </p>

          <h3>2. Alertar para prazos que esquece</h3>

          <p>
            Um contrato de arrendamento de 1 ano que termina a 31 de dezembro exige que o
            senhorio envie a carta de não renovação até 2 de setembro (120 dias antes). Perdeu
            esse prazo? O contrato renova automaticamente.
          </p>

          <p>
            É possível configurar um Google Sheets para alertar para datas? Em teoria, sim —
            com scripts do Google Apps Script ou integração com o Google Calendar. Na prática,
            a maioria dos senhorios não o faz, ou configura uma vez e esquece de manter
            quando há mudanças de contrato.
          </p>

          <p>
            Os prazos críticos que um Sheets não gere automaticamente incluem:
          </p>

          <ul>
            <li>Pré-aviso de não renovação de contrato (120 ou 240 dias)</li>
            <li>Registo do contrato na AT (30 dias após início)</li>
            <li>Entrega do Mapa de Rendas / Modelo 2 (15 de fevereiro)</li>
            <li>Comunicação de atualização de renda ao inquilino (antes do início do ano)</li>
            <li>Prazo de declaração de IRS (abril–junho)</li>
          </ul>

          <h3>3. Calcular o IRS da forma certa</h3>

          <p>
            Desde 2025, o IRS de arrendamento tem três regimes fiscais distintos: o RSAA (taxa 0%,
            com critérios de renda máxima), a taxa reduzida de 10% (para contratos habitacionais
            ≤€2.300/mês), e o regime geral de 25% (ou englobamento). A decisão entre os três
            depende da situação fiscal total do senhorio.
          </p>

          <p>
            Um Sheets pode ter fórmulas para simular estes regimes — mas alguém tem de as
            construir, manter atualizadas quando a lei muda, e o senhorio tem de saber
            interpretar os resultados. A lei fiscal mudou em 2024, 2025 e 2026. Quem tem um
            Sheets com as regras de 2023 pode estar a calcular mal há dois anos sem saber.
          </p>

          <h3>4. Preparar o Anexo F do IRS</h3>

          <p>
            O Anexo F da declaração de IRS exige o rendimento bruto por contrato, as despesas
            dedutíveis categorizadas, o NIF do inquilino, o número do contrato registado na AT
            e o município do imóvel. Reunir tudo isto de um Sheets no final de março é um
            processo propenso a erros — especialmente se houve mudanças de inquilino, obras,
            ou despesas variáveis.
          </p>

          <h2>Onde o Google Sheets ainda tem vantagem</h2>

          <p>
            Sendo honesto: o Sheets tem pontos fortes reais que merecem reconhecimento.
          </p>

          <ul>
            <li><strong>É gratuito</strong>: para um senhorio com 1 imóvel e renda baixa, o custo de um software dedicado pode não justificar-se</li>
            <li><strong>É flexível</strong>: pode adaptar completamente a estrutura às suas necessidades específicas</li>
            <li><strong>A partilha é simples</strong>: enviar o link ao contabilista é rápido</li>
            <li><strong>Não há lock-in</strong>: os dados são seus, exportáveis a qualquer momento</li>
          </ul>

          <p>
            O Sheets é uma ferramenta honesta. O problema não é o que o Sheets é — é o que
            a gestão de arrendamento em Portugal exige que vai além do que o Sheets pode dar.
          </p>

          <h2>Para quem o Senhorio é a alternativa certa</h2>

          <p>
            O Senhorio foi construído especificamente para senhorios portugueses — não é uma
            plataforma internacional adaptada com um add-on para o mercado português. O que
            isso significa na prática:
          </p>

          <div className="not-prose grid sm:grid-cols-3 gap-4 my-8">
            {[
              {
                title: "Recibos legais integrados",
                description: "Emissão de recibos eletrónicos em conformidade com os requisitos da AT, sem sair da plataforma.",
                icon: "🧾",
              },
              {
                title: "Prazos automáticos",
                description: "Alertas para pré-avisos contratuais, registo na AT, Mapa de Rendas e declaração de IRS — sem configurar scripts.",
                icon: "📅",
              },
              {
                title: "IRS atualizado",
                description: "Simulação dos três regimes fiscais de 2026 com as regras corretas, atualizada a cada mudança legislativa.",
                icon: "📊",
              },
            ].map((item) => (
              <div key={item.title} className="border border-gray-200 rounded-xl p-5">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <h2>Quando faz sentido mudar do Sheets para o Senhorio</h2>

          <p>
            Não é preciso mudar imediatamente se o Sheets está a funcionar para si.
            Mas estes são os sinais de que uma plataforma dedicada começa a fazer sentido:
          </p>

          <ul>
            <li>Tem 2 ou mais imóveis arrendados</li>
            <li>Mudou de inquilino e teve de gerir novos registos, cauções e prazos</li>
            <li>Já esqueceu um prazo da AT ou um pré-aviso de contrato</li>
            <li>Passou horas a reunir dados para o IRS em março</li>
            <li>Quer ter a certeza de que os recibos estão todos emitidos correctamente</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-indigo-600 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Substitua o Sheets por uma plataforma feita para senhorios portugueses
          </h2>
          <p className="text-indigo-100 mb-6 max-w-xl mx-auto">
            O Senhorio está em desenvolvimento. Seja dos primeiros a usar e receba acesso
            prioritário quando lançarmos.
          </p>
          <Link
            href="/#waitlist"
            className="inline-flex items-center px-6 py-3 bg-white text-indigo-700 rounded-xl font-semibold hover:bg-indigo-50 transition text-lg"
          >
            Entrar na Lista de Espera →
          </Link>
        </div>

        {/* Related content */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Comparações e ferramentas</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link href="/vs/excel" className="block p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
              <p className="font-medium text-gray-900 mb-1">Senhorio vs Excel</p>
              <p className="text-sm text-gray-600">A mesma análise para utilizadores de Excel</p>
            </Link>
            <Link href="/simulador-irs" className="block p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
              <p className="font-medium text-gray-900 mb-1">Simulador IRS 2026</p>
              <p className="text-sm text-gray-600">Calcule os seus impostos nos 3 regimes</p>
            </Link>
            <Link href="/calculadora-rendas" className="block p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
              <p className="font-medium text-gray-900 mb-1">Calculadora de Rendas</p>
              <p className="text-sm text-gray-600">Atualização com coeficiente INE 2026</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
