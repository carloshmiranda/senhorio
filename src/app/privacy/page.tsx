import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | Senhorio - Gestão de Arrendamento",
  description: "Política de privacidade do Senhorio. Como recolhemos, usamos e protegemos os seus dados pessoais.",
  openGraph: {
    title: "Política de Privacidade | Senhorio",
    description: "Como recolhemos, usamos e protegemos os seus dados pessoais.",
  },
  robots: {
    index: false, // Don't index legal pages
    follow: false,
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link href="/" className="text-sm text-blue-600 hover:text-blue-700 transition">
            ← Voltar ao Senhorio
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">
            Política de Privacidade
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
            A sua privacidade é importante para nós. Esta política explica como a Senhorio ("nós", "nosso", "nossa")
            recolhe, usa e protege as suas informações pessoais quando usa o nosso website e serviços.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Informações que Recolhemos</h2>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">1.1 Informações fornecidas diretamente</h3>
          <ul className="space-y-2 text-gray-600 mb-6">
            <li>• <strong>Lista de espera:</strong> Nome (opcional) e endereço de email</li>
            <li>• <strong>Calculadoras:</strong> Dados financeiros para cálculos fiscais (não armazenados)</li>
            <li>• <strong>Contacto:</strong> Informações quando nos contacta para suporte</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">1.2 Informações recolhidas automaticamente</h3>
          <ul className="space-y-2 text-gray-600 mb-6">
            <li>• <strong>Analytics:</strong> Dados de utilização através do Vercel Analytics</li>
            <li>• <strong>Cookies:</strong> Cookies essenciais e de analytics (ver Política de Cookies)</li>
            <li>• <strong>Referências:</strong> Código de referência da lista de espera</li>
            <li>• <strong>UTM:</strong> Parâmetros de campanha para medir origem do tráfego</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Como Usamos as Suas Informações</h2>
          <ul className="space-y-2 text-gray-600">
            <li>• <strong>Gestão da lista de espera:</strong> Para notificá-lo quando o Senhorio estiver disponível</li>
            <li>• <strong>Comunicação:</strong> Para enviar atualizações sobre o produto e funcionalidades</li>
            <li>• <strong>Melhoria do serviço:</strong> Para analisar uso e melhorar o website</li>
            <li>• <strong>Referências:</strong> Para processar referências e determinar prioridades na lista</li>
            <li>• <strong>Suporte:</strong> Para responder a perguntas e fornecer assistência</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Partilha de Informações</h2>
          <p className="text-gray-600 mb-4">
            Não vendemos, alugamos ou partilhamos as suas informações pessoais com terceiros, exceto:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li>• <strong>Prestadores de serviços:</strong> Vercel (hosting), Neon (base de dados), Resend (email)</li>
            <li>• <strong>Obrigações legais:</strong> Quando exigido por lei ou autoridades competentes</li>
            <li>• <strong>Proteção de direitos:</strong> Para proteger os nossos direitos, propriedade ou segurança</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Retenção de Dados</h2>
          <p className="text-gray-600 mb-4">Mantemos as suas informações durante os seguintes períodos:</p>
          <ul className="space-y-2 text-gray-600">
            <li>• <strong>Lista de espera:</strong> Até ao lançamento do produto ou até solicitar remoção</li>
            <li>• <strong>Analytics:</strong> 26 meses (política padrão do Vercel Analytics)</li>
            <li>• <strong>Logs do servidor:</strong> 30 dias</li>
            <li>• <strong>Comunicações de suporte:</strong> 3 anos</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Os Seus Direitos (RGPD)</h2>
          <p className="text-gray-600 mb-4">
            Sob o Regulamento Geral de Proteção de Dados, tem direito a:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li>• <strong>Acesso:</strong> Solicitar uma cópia dos seus dados</li>
            <li>• <strong>Retificação:</strong> Corrigir informações incorretas</li>
            <li>• <strong>Apagamento:</strong> Solicitar a eliminação dos seus dados</li>
            <li>• <strong>Portabilidade:</strong> Receber os seus dados em formato estruturado</li>
            <li>• <strong>Oposição:</strong> Opor-se ao processamento dos seus dados</li>
            <li>• <strong>Limitação:</strong> Restringir como processamos os seus dados</li>
          </ul>
          <p className="text-gray-600 mt-4">
            Para exercer qualquer destes direitos, contacte-nos em: <a href="mailto:privacy@senhorio.pt" className="text-blue-600 hover:text-blue-700">privacy@senhorio.pt</a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Segurança</h2>
          <p className="text-gray-600">
            Implementamos medidas técnicas e organizacionais adequadas para proteger as suas informações pessoais:
          </p>
          <ul className="space-y-2 text-gray-600 mt-4">
            <li>• Encriptação HTTPS em todas as comunicações</li>
            <li>• Base de dados segura com acesso restrito</li>
            <li>• Monitorização de segurança e logs de auditoria</li>
            <li>• Acesso limitado aos dados apenas ao pessoal autorizado</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Transferências Internacionais</h2>
          <p className="text-gray-600">
            Os seus dados podem ser processados em servidores localizados fora do Espaço Económico Europeu.
            Todos os nossos prestadores de serviços (Vercel, Neon, Resend) cumprem os padrões de proteção
            de dados da UE através de cláusulas contratuais padrão ou certificações adequadas.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Alterações a Esta Política</h2>
          <p className="text-gray-600">
            Podemos atualizar esta política periodicamente. Alterações significativas serão comunicadas
            através do nosso website e, se aplicável, por email. A data da "última atualização" no topo
            desta página indica quando a política foi revista pela última vez.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contacto</h2>
          <p className="text-gray-600 mb-4">
            Para questões sobre esta política de privacidade ou o tratamento dos seus dados, contacte-nos:
          </p>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-600"><strong>Email:</strong> privacy@senhorio.pt</p>
            <p className="text-gray-600"><strong>Website:</strong> senhorio.pt</p>
          </div>
        </section>

        <section className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-12">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Sobre o Senhorio</h3>
          <p className="text-blue-800 text-sm">
            O Senhorio é uma plataforma de gestão de arrendamento desenvolvida especificamente para
            senhorios portugueses. Estamos comprometidos com a transparência e proteção da sua privacidade
            enquanto lhe fornecemos as ferramentas necessárias para gerir os seus imóveis em conformidade
            com a legislação portuguesa.
          </p>
        </section>
      </main>
    </div>
  );
}