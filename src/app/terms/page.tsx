import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Serviço | Senhorio - Gestão de Arrendamento",
  description: "Termos de serviço do Senhorio. Condições de uso da nossa plataforma de gestão de arrendamento.",
  openGraph: {
    title: "Termos de Serviço | Senhorio",
    description: "Condições de uso da nossa plataforma de gestão de arrendamento.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link href="/" className="text-sm text-brand-600 hover:text-brand-700 transition">
            ← Voltar ao Senhorio
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">
            Termos de Serviço
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
            Bem-vindo ao Senhorio. Estes termos de serviço ("Termos") regem o uso do nosso website
            e serviços. Ao aceder ou usar o Senhorio, concorda com estes Termos.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Definições</h2>
          <ul className="space-y-2 text-gray-600">
            <li>• <strong>"Serviço"</strong> refere-se ao website Senhorio e todas as funcionalidades relacionadas</li>
            <li>• <strong>"Utilizador"</strong> refere-se a qualquer pessoa que acede ou usa o Serviço</li>
            <li>• <strong>"Conteúdo"</strong> refere-se a texto, dados, informações e outros materiais</li>
            <li>• <strong>"Conta"</strong> refere-se ao registo de utilizador (quando disponível)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Aceitação dos Termos</h2>
          <p className="text-gray-600 mb-4">
            Ao usar o Senhorio, confirma que:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li>• Tem pelo menos 18 anos ou tem autorização legal para usar o Serviço</li>
            <li>• Concorda em cumprir estes Termos e todas as leis aplicáveis</li>
            <li>• Fornece informações verdadeiras e precisas</li>
            <li>• Reconhece ter lido e compreendido a nossa Política de Privacidade</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Descrição do Serviço</h2>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">3.1 Fase Atual (Lista de Espera)</h3>
          <p className="text-gray-600 mb-4">
            O Senhorio encontra-se atualmente em desenvolvimento. Durante esta fase, oferecemos:
          </p>
          <ul className="space-y-2 text-gray-600 mb-6">
            <li>• Simulador fiscal gratuito para senhorios portugueses</li>
            <li>• Calculadora de atualização de rendas</li>
            <li>• Verificador de isenção AIMI 2026</li>
            <li>• Recursos educacionais e blog</li>
            <li>• Lista de espera para acesso antecipado</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">3.2 Serviços Futuros</h3>
          <p className="text-gray-600 mb-4">
            Quando lançado, o Senhorio incluirá funcionalidades adicionais como:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li>• Gestão de portfólio de propriedades</li>
            <li>• Emissão de recibos de renda eletrónicos</li>
            <li>• Acompanhamento de despesas e conformidade fiscal</li>
            <li>• Relatórios para o Portal das Finanças</li>
            <li>• Notificações automáticas e lembretes</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Uso Aceitável</h2>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">4.1 Usos Permitidos</h3>
          <p className="text-gray-600 mb-4">Pode usar o Serviço para:</p>
          <ul className="space-y-2 text-gray-600 mb-6">
            <li>• Calcular obrigações fiscais de arrendamento em Portugal</li>
            <li>• Planear estratégias fiscais legais</li>
            <li>• Gerir informações de propriedades (quando disponível)</li>
            <li>• Aceder a recursos educacionais</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">4.2 Usos Proibidos</h3>
          <p className="text-gray-600 mb-4">Não pode usar o Serviço para:</p>
          <ul className="space-y-2 text-gray-600">
            <li>• Atividades ilegais ou evasão fiscal</li>
            <li>• Fornecer informações falsas ou enganosas</li>
            <li>• Interferir com a operação do Serviço</li>
            <li>• Tentativas de acesso não autorizado aos nossos sistemas</li>
            <li>• Distribuir malware ou conteúdo prejudicial</li>
            <li>• Uso comercial não autorizado ou revenda do Serviço</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Propriedade Intelectual</h2>
          <p className="text-gray-600 mb-4">
            O Serviço e todo o seu conteúdo, incluindo texto, gráficos, logos, código e funcionalidades,
            são propriedade da Senhorio e estão protegidos por direitos de autor e outras leis de
            propriedade intelectual.
          </p>
          <p className="text-gray-600">
            Concedemos-lhe uma licença limitada, não exclusiva e revogável para usar o Serviço apenas
            para os fins pretendidos. Esta licença não inclui direitos de revenda ou uso comercial.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Precisão das Informações</h2>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">⚠️ Aviso Importante</h3>
            <p className="text-yellow-700">
              O Senhorio é uma ferramenta informativa e não constitui aconselhamento fiscal profissional.
              Os cálculos baseiam-se na legislação portuguesa atual, mas podem não refletir toda a
              complexidade da sua situação específica.
            </p>
          </div>

          <p className="text-gray-600 mb-4">
            Embora nos esforcemos para garantir a precisão das informações:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li>• Não garantimos que os cálculos sejam completamente precisos para todas as situações</li>
            <li>• As leis fiscais podem mudar sem aviso prévio</li>
            <li>• Recomendamos sempre consultar um contabilista certificado</li>
            <li>• Não somos responsáveis por decisões baseadas nas nossas ferramentas</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitação de Responsabilidade</h2>
          <p className="text-gray-600 mb-4">
            Na medida máxima permitida por lei:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li>• O Serviço é fornecido "como está" sem garantias</li>
            <li>• Não garantimos disponibilidade ininterrupta do Serviço</li>
            <li>• Não somos responsáveis por perdas diretas, indiretas ou consequenciais</li>
            <li>• A nossa responsabilidade total não excederá o valor pago pelo Serviço</li>
            <li>• Não somos responsáveis por decisões fiscais ou suas consequências</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Preços e Pagamentos</h2>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">8.1 Fase Atual</h3>
          <p className="text-gray-600 mb-4">
            Durante a fase de lista de espera, todas as funcionalidades disponíveis são gratuitas.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">8.2 Preços Futuros</h3>
          <p className="text-gray-600 mb-4">
            Quando lançado, o Senhorio oferecerá planos gratuitos e pagos:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li>• <strong>Plano Gratuito:</strong> Funcionalidades básicas permanentemente gratuitas</li>
            <li>• <strong>Planos Pagos:</strong> Funcionalidades avançadas com faturação mensal</li>
            <li>• Reservamo-nos o direito de alterar preços com aviso prévio de 30 dias</li>
            <li>• Utilizadores da lista de espera podem ter preços especiais de lançamento</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Terminação</h2>
          <p className="text-gray-600 mb-4">
            Pode deixar de usar o Serviço a qualquer momento. Podemos suspender ou terminar o seu
            acesso se violar estes Termos.
          </p>
          <p className="text-gray-600">
            Após a terminação, o seu direito de usar o Serviço cessa imediatamente, mas as disposições
            sobre propriedade intelectual e limitação de responsabilidade continuam em vigor.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Lei Aplicável</h2>
          <p className="text-gray-600">
            Estes Termos são regidos pela lei portuguesa. Qualquer disputa será resolvida nos
            tribunais competentes de Portugal.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Alterações aos Termos</h2>
          <p className="text-gray-600">
            Podemos atualizar estes Termos periodicamente. Alterações significativas serão comunicadas
            através do website. O uso continuado do Serviço após alterações constitui aceitação dos
            novos Termos.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contacto</h2>
          <p className="text-gray-600 mb-4">
            Para questões sobre estes Termos, contacte-nos:
          </p>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-600"><strong>Email:</strong> legal@senhorio.pt</p>
            <p className="text-gray-600"><strong>Website:</strong> senhorio.pt</p>
          </div>
        </section>

        <section className="bg-brand-50 border border-brand-200 rounded-lg p-6 mt-12">
          <h3 className="text-lg font-semibold text-brand-900 mb-2">Sobre o Desenvolvimento do Senhorio</h3>
          <p className="text-brand-800 text-sm">
            O Senhorio está em desenvolvimento ativo. Estes Termos aplicam-se à versão atual
            e serão atualizados conforme novas funcionalidades são lançadas. Utilizadores da
            lista de espera serão notificados de mudanças significativas nos termos de serviço.
          </p>
        </section>
      </main>
    </div>
  );
}