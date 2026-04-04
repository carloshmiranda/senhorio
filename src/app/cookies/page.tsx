import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies | Senhorio - Gestão de Arrendamento",
  description: "Política de cookies do Senhorio. Como utilizamos cookies para melhorar a sua experiência.",
  openGraph: {
    title: "Política de Cookies | Senhorio",
    description: "Como utilizamos cookies para melhorar a sua experiência.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link href="/" className="text-sm text-brand-600 hover:text-brand-700 transition">
            ← Voltar ao Senhorio
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">
            Política de Cookies
          </h1>
          <p className="text-gray-600 mt-2">
            Última atualização: 22 de março de 2026
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 prose prose-gray max-w-none">
        <section className="mb-8">
          <p className="text-lg text-gray-600 leading-relaxed">
            Esta política explica como o Senhorio usa cookies e tecnologias similares no nosso website.
            Ao continuar a usar o nosso site, concorda com o uso de cookies conforme descrito aqui.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. O que são Cookies</h2>
          <p className="text-gray-600 mb-4">
            Cookies são pequenos ficheiros de texto armazenados no seu dispositivo (computador, tablet, telemóvel)
            quando visita um website. Eles permitem que o site "lembre" as suas ações e preferências durante
            um período de tempo.
          </p>
          <p className="text-gray-600">
            Existem diferentes tipos de cookies com funções distintas, desde funcionalidades essenciais
            até análise de como os utilizadores interagem com o site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Cookies que Utilizamos</h2>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">2.1 Cookies Essenciais</h3>
          <p className="text-gray-600 mb-4">
            Estes cookies são necessários para o funcionamento básico do website:
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="space-y-3">
              <div>
                <strong className="text-gray-900">Gestão de Sessão</strong>
                <p className="text-sm text-gray-600">Mantêm o estado da sua sessão durante a visita</p>
                <p className="text-xs text-gray-500">Duração: Sessão do browser</p>
              </div>
              <div>
                <strong className="text-gray-900">Preferências</strong>
                <p className="text-sm text-gray-600">Lembram configurações como idioma selecionado</p>
                <p className="text-xs text-gray-500">Duração: 30 dias</p>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">2.2 Cookies de Analytics</h3>
          <p className="text-gray-600 mb-4">
            Utilizamos o Vercel Analytics para compreender como o site é usado:
          </p>
          <div className="bg-brand-50 border border-brand-200 rounded-lg p-4 mb-6">
            <div className="space-y-3">
              <div>
                <strong className="text-brand-900">Vercel Analytics</strong>
                <p className="text-sm text-brand-800">Recolhe dados anónimos sobre visualizações de páginas e comportamento</p>
                <p className="text-xs text-brand-600">Duração: 26 meses</p>
                <p className="text-xs text-brand-600">Finalidade: Melhorar a performance e experiência do utilizador</p>
              </div>
              <div>
                <strong className="text-brand-900">Vercel Speed Insights</strong>
                <p className="text-sm text-brand-800">Monitoriza a velocidade de carregamento do site</p>
                <p className="text-xs text-brand-600">Duração: 26 meses</p>
                <p className="text-xs text-brand-600">Finalidade: Otimizar performance técnica</p>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">2.3 Cookies de Funcionalidade</h3>
          <p className="text-gray-600 mb-4">
            Estes cookies melhoram a sua experiência de uso:
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="space-y-3">
              <div>
                <strong className="text-green-900">Referências da Lista de Espera</strong>
                <p className="text-sm text-green-800">Acompanham códigos de referência para a lista de espera</p>
                <p className="text-xs text-green-600">Duração: 30 dias</p>
              </div>
              <div>
                <strong className="text-green-900">Parâmetros UTM</strong>
                <p className="text-sm text-green-800">Identificam a origem do tráfego para medir campanhas</p>
                <p className="text-xs text-green-600">Duração: 7 dias</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cookies de Terceiros</h2>
          <p className="text-gray-600 mb-4">
            Alguns cookies são definidos por serviços de terceiros que utilizamos:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Serviço</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Finalidade</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Política</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Vercel Analytics</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Analytics anónimos do website</td>
                  <td className="px-4 py-3 text-sm text-brand-600">
                    <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener" className="hover:text-brand-700">
                      Ver política →
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Vercel Speed Insights</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Monitorização de performance</td>
                  <td className="px-4 py-3 text-sm text-brand-600">
                    <a href="https://vercel.com/docs/speed-insights/privacy-policy" target="_blank" rel="noopener" className="hover:text-brand-700">
                      Ver política →
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Finalidades do Uso de Cookies</h2>
          <p className="text-gray-600 mb-4">Utilizamos cookies para:</p>
          <ul className="space-y-2 text-gray-600">
            <li>• <strong>Funcionalidade:</strong> Garantir que o website funciona corretamente</li>
            <li>• <strong>Experiência:</strong> Lembrar as suas preferências e configurações</li>
            <li>• <strong>Analytics:</strong> Entender como os utilizadores usam o site</li>
            <li>• <strong>Performance:</strong> Monitorizar velocidade e identificar problemas técnicos</li>
            <li>• <strong>Referências:</strong> Acompanhar referências da lista de espera</li>
            <li>• <strong>Campanhas:</strong> Medir eficácia de marketing e origem do tráfego</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Gestão de Cookies</h2>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">5.1 Controlos do Browser</h3>
          <p className="text-gray-600 mb-4">
            Pode gerir cookies através das configurações do seu browser:
          </p>
          <ul className="space-y-2 text-gray-600 mb-6">
            <li>• <strong>Chrome:</strong> Definições → Privacidade e segurança → Cookies</li>
            <li>• <strong>Firefox:</strong> Opções → Privacidade e segurança → Cookies</li>
            <li>• <strong>Safari:</strong> Preferências → Privacidade → Cookies</li>
            <li>• <strong>Edge:</strong> Definições → Cookies e permissões do site</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">5.2 Impacto de Desativar Cookies</h3>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 mb-3">
              <strong>⚠️ Cookies Essenciais:</strong> Não podem ser desativados sem afetar a funcionalidade do site.
            </p>
            <p className="text-yellow-700 text-sm">
              Se desativar cookies de analytics, não conseguiremos melhorar o site com base no seu uso,
              mas todas as funcionalidades principais continuarão a funcionar normalmente.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Retenção e Segurança</h2>
          <p className="text-gray-600 mb-4">
            <strong>Período de retenção:</strong>
          </p>
          <ul className="space-y-2 text-gray-600 mb-6">
            <li>• Cookies essenciais: Durante a sessão do browser</li>
            <li>• Cookies de preferências: 30 dias</li>
            <li>• Cookies de analytics: 26 meses</li>
            <li>• Cookies de referência: 30 dias</li>
          </ul>

          <p className="text-gray-600">
            <strong>Segurança:</strong> Todos os cookies são transmitidos de forma segura através de HTTPS
            e não contêm informações sensíveis como passwords ou dados financeiros.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Alterações a Esta Política</h2>
          <p className="text-gray-600">
            Podemos atualizar esta política de cookies periodicamente para refletir mudanças na nossa
            utilização de cookies ou por outras razões operacionais, legais ou regulamentares.
            Recomendamos que reveja esta página ocasionalmente.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contacto</h2>
          <p className="text-gray-600 mb-4">
            Para questões sobre cookies ou esta política, contacte-nos:
          </p>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-600"><strong>Email:</strong> privacy@senhorio.pt</p>
            <p className="text-gray-600"><strong>Website:</strong> senhorio.pt</p>
          </div>
        </section>

        <section className="bg-brand-50 border border-brand-200 rounded-lg p-6 mt-12">
          <h3 className="text-lg font-semibold text-brand-900 mb-2">Compromisso com a Privacidade</h3>
          <p className="text-brand-800 text-sm">
            O Senhorio utiliza cookies de forma responsável e transparente. Não utilizamos cookies
            para rastreamento invasivo ou partilha de dados com terceiros para fins publicitários.
            O nosso foco é melhorar a sua experiência e fornecer as melhores ferramentas para
            senhorios portugueses.
          </p>
        </section>
      </main>
    </div>
  );
}