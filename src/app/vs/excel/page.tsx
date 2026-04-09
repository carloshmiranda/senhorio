import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Senhorio vs Excel: Por Que a Folha de Cálculo Não Chega para Gerir Arrendamentos | Senhorio",
  description: "Comparação entre o Senhorio e folhas de cálculo Excel para gestão de arrendamento em Portugal. Descubra o que falta ao Excel e como uma plataforma dedicada poupa tempo e evita erros.",
  keywords: [
    "senhorio vs excel",
    "gestão arrendamento excel alternativa",
    "software arrendamento portugal",
    "alternativa excel gestão rendas",
    "folha calculo arrendamento",
    "gerir arrendamento excel",
    "plataforma gestão arrendamento",
    "excel vs software senhorio",
    "automatizar gestão arrendamento",
    "controlo rendas portugal",
  ],
  openGraph: {
    title: "Senhorio vs Excel: Por Que a Folha de Cálculo Não Chega para Gerir Arrendamentos",
    description: "O que o Excel não faz (e você acaba por fazer à mão): recibos eletrónicos, alertas de prazo, cálculos de IRS. Veja a comparação.",
    type: "website",
  },
  alternates: {
    canonical: "https://senhorio.vercel.app/vs/excel",
  },
};

export default function VsExcelPage() {
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
            Senhorio vs Excel
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A maior parte dos senhorios portugueses gere as suas rendas num Excel. Funciona —
            até deixar de funcionar. Veja exatamente o que falta.
          </p>
        </div>

        {/* Quick comparison */}
        <div className="not-prose overflow-x-auto mb-12">
          <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="px-5 py-4 text-left font-semibold">Funcionalidade</th>
                <th className="px-5 py-4 text-center font-semibold">Excel / Sheets</th>
                <th className="px-5 py-4 text-center font-semibold text-indigo-300">Senhorio</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Registo de pagamentos de renda", "✓ Manual", "✓ Automático"],
                ["Recibos eletrónicos legais (Portal Finanças)", "✗", "✓"],
                ["Alertas de prazos (pré-avisos, AT, IRS)", "✗", "✓"],
                ["Cálculo de atualização de renda (INE)", "Manual, com erros", "✓ Automático"],
                ["Simulação de IRS e regimes fiscais", "✗", "✓"],
                ["Relatório para declaração de IRS (Anexo F)", "✗", "✓"],
                ["Registo de despesas dedutíveis", "Manual", "✓ Com categorias legais"],
                ["Histórico de contratos e documentos", "Ficheiros dispersos", "✓ Centralizado"],
                ["Acesso multi-dispositivo (telemóvel)", "✗ (ficheiro local)", "✓"],
                ["Backups automáticos", "✗", "✓"],
                ["Conformidade com NRAU e AT", "Responsabilidade do utilizador", "✓ Atualizado"],
              ].map(([feature, excel, senhorio], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-200 px-5 py-3 font-medium text-gray-800">{feature}</td>
                  <td className="border border-gray-200 px-5 py-3 text-center text-gray-500">{excel}</td>
                  <td className="border border-gray-200 px-5 py-3 text-center text-indigo-700 font-medium">{senhorio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detailed sections */}
        <div className="prose prose-gray prose-lg max-w-none">

          <h2>O problema real com o Excel para gerir arrendamentos</h2>

          <p>
            O Excel é uma ferramenta extraordinária. É flexível, conhecida por toda a gente,
            e para muitas tarefas é exatamente o que precisa. Mas a gestão de arrendamento em
            Portugal tem um conjunto de obrigações legais específicas que o Excel simplesmente
            não resolve.
          </p>

          <p>
            O resultado é que o Excel fica a fazer metade do trabalho — o registo de
            pagamentos e os cálculos básicos — enquanto o senhorio trata do resto à mão:
            ir ao Portal das Finanças emitir o recibo, lembrar-se dos prazos sem aviso,
            calcular o coeficiente INE para atualizar a renda, reunir os dados para o
            Anexo F do IRS.
          </p>

          <h2>O que o Excel não faz — e o custo real disso</h2>

          <h3>1. Recibos eletrónicos legais</h3>

          <p>
            A lei portuguesa obriga todos os senhorios a emitir recibo eletrónico através
            do Portal das Finanças para cada pagamento de renda. O Excel pode registar o
            pagamento, mas não emite o recibo — isso exige login no Portal das Finanças,
            preencher os campos manualmente para cada recibo, e guardar o comprovativo.
          </p>

          <p>
            Para um senhorio com 3 imóveis, são 36 recibos por ano. Se demorar 5 minutos
            cada (login incluído), são 3 horas/ano só em recibos. Para 10 imóveis: 10 horas.
          </p>

          <h3>2. Alertas de prazos críticos</h3>

          <p>
            Um contrato de arrendamento de 1 ano que termina a 31 de dezembro obriga o
            senhorio a comunicar a não renovação até 2 de setembro (120 dias antes). O Excel
            não avisa. O senhorio que se esquece perde o prazo e fica preso a mais um ano.
          </p>

          <p>
            Os prazos críticos num arrendamento habitacional incluem:
          </p>

          <ul>
            <li>Pré-aviso de não renovação (120 ou 240 dias, consoante o contrato)</li>
            <li>Registo do contrato na AT (30 dias após início)</li>
            <li>Entrega do Modelo 2 / Mapa de Rendas (até 15 de fevereiro)</li>
            <li>Comunicação de atualização de renda ao inquilino (antes do início do ano)</li>
            <li>Prazo de declaração de IRS (abril–junho)</li>
          </ul>

          <h3>3. Cálculo de atualização de renda</h3>

          <p>
            O coeficiente de atualização de rendas publicado pelo INE muda todos os anos.
            Para 2026 é 2,24%. O cálculo é simples, mas o senhorio tem de saber que o
            coeficiente foi publicado, encontrar o valor, aplicá-lo, e comunicar ao
            inquilino com antecedência adequada.
          </p>

          <p>
            No Excel, esse processo é manual. O Senhorio aplica o coeficiente automaticamente
            e prepara a comunicação ao inquilino.
          </p>

          <h3>4. IRS — a parte que mais assusta</h3>

          <p>
            O Anexo F da declaração de IRS exige o rendimento bruto por contrato, as despesas
            dedutíveis, o NIF de cada inquilino e o número do contrato. Recolher tudo isto
            de um Excel espalhado por vários ficheiros no final de março é um exercício de
            stress anual para muitos senhorios.
          </p>

          <p>
            Além disso, a decisão entre taxa autónoma (25%), taxa reduzida (10%) e englobamento
            depende da situação fiscal total do senhorio — e o Excel não faz essa análise.
          </p>

          <h2>Quando o Excel começa a falhar</h2>

          <p>
            Para um senhorio com 1 imóvel e um inquilino estável há 5 anos, o Excel funciona
            razoavelmente. Os problemas começam quando:
          </p>

          <ul>
            <li><strong>Há mais do que 1 imóvel</strong> — a complexidade multiplica-se</li>
            <li><strong>Há mudança de inquilino</strong> — novo contrato, novo registo, nova caução</li>
            <li><strong>Há obras ou despesas dedutíveis</strong> — registar e categorizar corretamente é crítico</li>
            <li><strong>Muda a lei</strong> — o Excel com as fórmulas do ano passado fica desatualizado</li>
            <li><strong>Há litígio</strong> — é preciso provar tudo com documentação organizada</li>
          </ul>

          <h2>O Senhorio como alternativa ao Excel</h2>

          <p>
            O Senhorio foi construído para o contexto legal e fiscal português. Não é uma
            plataforma genérica de gestão de propriedades adaptada — é feito especificamente
            para senhorios portugueses com as obrigações da AT, do NRAU e do IRS.
          </p>

          <div className="not-prose grid sm:grid-cols-3 gap-4 my-8">
            {[
              {
                title: "Recibos em segundos",
                description: "Emita recibos eletrónicos legais sem sair da plataforma. Sem logins manuais no Portal das Finanças.",
                icon: "🧾",
              },
              {
                title: "Prazos automáticos",
                description: "Alertas para pré-avisos de contratos, registo na AT, Mapa de Rendas e declaração de IRS.",
                icon: "📅",
              },
              {
                title: "IRS sem stress",
                description: "Exporta tudo o que precisa para o Anexo F. Simula os três regimes para escolher o mais vantajoso.",
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

          <h2>É para si?</h2>

          <p>
            O Senhorio é para senhorios que querem ter a gestão do arrendamento organizada
            sem dedicar horas a processos manuais. Se tem 1 ou mais imóveis arrendados em
            Portugal e já passou por alguma destas situações — esqueceu um prazo, ficou em
            dúvida sobre o IRS, perdeu tempo com recibos — é exatamente para si.
          </p>

          <p>
            Se tem apenas 1 imóvel muito estável e nunca muda nada, o Excel pode ser
            suficiente. Mas quando a situação complica, é melhor estar preparado.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-indigo-600 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Substitua o Excel por uma plataforma feita para senhorios portugueses
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ferramentas gratuitas do Senhorio</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link href="/simulador-irs" className="block p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
              <p className="font-medium text-gray-900 mb-1">Simulador IRS 2026</p>
              <p className="text-sm text-gray-600">Calcule os seus impostos nos 3 regimes</p>
            </Link>
            <Link href="/calculadora-rendas" className="block p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
              <p className="font-medium text-gray-900 mb-1">Calculadora de Rendas</p>
              <p className="text-sm text-gray-600">Atualização com coeficiente INE 2026</p>
            </Link>
            <Link href="/calculadora" className="block p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
              <p className="font-medium text-gray-900 mb-1">Calculadora de Impostos</p>
              <p className="text-sm text-gray-600">Compare todos os regimes fiscais</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
