"use client";

import { useState } from "react";
import Link from "next/link";

const LAUNCH_MODE = process.env.NEXT_PUBLIC_LAUNCH_MODE || "waitlist";

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [result, setResult] = useState<{ referral_code?: string; position?: number; already_signed_up?: boolean } | null>(null);

  // Get referral code from URL
  const ref = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("ref") : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: name || undefined,
          ref: ref || undefined,
          utm_source: new URLSearchParams(window.location.search).get("utm_source") || undefined,
          utm_medium: new URLSearchParams(window.location.search).get("utm_medium") || undefined,
          utm_campaign: new URLSearchParams(window.location.search).get("utm_campaign") || undefined,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setResult(data);
        setState("success");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  if (state === "success" && result) {
    const referralLink = `${window.location.origin}?ref=${result.referral_code}`;
    return (
      <div className="text-center">
        <p className="text-lg font-medium text-gray-900 mb-2">
          {result.already_signed_up ? "You're already on the list!" : "You're in!"}
        </p>
        <p className="text-gray-600 mb-4">
          You're <span className="font-bold">#{result.position}</span> on the waitlist.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 text-sm">
          <p className="text-gray-500 mb-2">Share your link to move up:</p>
          <div className="flex items-center gap-2">
            <input
              readOnly
              value={referralLink}
              className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded text-gray-700 text-sm"
              onClick={(e) => (e.target as HTMLInputElement).select()}
            />
            <button
              onClick={() => navigator.clipboard.writeText(referralLink)}
              className="px-3 py-2 bg-gray-900 text-white rounded text-sm hover:bg-gray-800 transition"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Your name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
      />
      <div className="flex gap-2">
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50"
        >
          {state === "loading" ? "..." : "Join"}
        </button>
      </div>
      {ref && <p className="text-sm text-gray-500">Referred by a friend? You'll get priority access.</p>}
      {state === "error" && <p className="text-sm text-red-500">Something went wrong. Please try again.</p>}
    </form>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <header className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Senhorio
          </h1>
          <h2 className="text-2xl text-gray-700 mb-4 font-medium">
            Gestão de Arrendamento para Senhorios Portugueses
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            <strong>4 regimes fiscais sobrepostos.</strong> Recibos eletrónicos obrigatórios.
            Multas de €150 a €3.750. <br />
            <span className="text-blue-600 font-semibold">O Senhorio simplifica tudo.</span>
          </p>

          {/* Calculator CTA */}
          <div className="mb-12">
            <Link
              href="/calculadora"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition shadow-lg"
            >
              🧮 Calculadora de IRS Gratuita
            </Link>
            <p className="text-sm text-gray-500 mt-3">
              Compare todos os regimes de 2026 · Sem registo necessário
            </p>
          </div>

          {LAUNCH_MODE === "waitlist" && (
            <div id="waitlist" className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Junte-se à Lista de Espera
              </h3>
              <p className="text-gray-600 mb-6">
                Seja notificado quando a plataforma completa estiver disponível
              </p>
              <WaitlistForm />
            </div>
          )}
        </div>
      </header>

      {/* Problem Section */}
      <section className="bg-red-50 border-t border-red-100">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Os Desafios de Ser Senhorio em 2026
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-red-200">
              <div className="text-red-600 text-2xl mb-3">⚠️</div>
              <h3 className="font-semibold text-gray-900 mb-2">4 Regimes Fiscais Sobrepostos</h3>
              <p className="text-gray-600 text-sm">
                IRS padrão 25%, taxa reduzida 10%, RSAA 0%, não residentes 28%.
                Uma escolha errada pode custar milhares de euros.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-red-200">
              <div className="text-red-600 text-2xl mb-3">📋</div>
              <h3 className="font-semibold text-gray-900 mb-2">Recibos Eletrónicos Obrigatórios</h3>
              <p className="text-gray-600 text-sm">
                Todos os pagamentos de renda devem ter recibo eletrónico.
                Falhas resultam em multas automáticas.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-red-200">
              <div className="text-red-600 text-2xl mb-3">💸</div>
              <h3 className="font-semibold text-gray-900 mb-2">Multas de €150 a €3.750</h3>
              <p className="text-gray-600 text-sm">
                Portal das Finanças aplica multas automaticamente por atrasos,
                valores incorretos ou falta de documentação.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-red-200">
              <div className="text-red-600 text-2xl mb-3">📊</div>
              <h3 className="font-semibold text-gray-900 mb-2">Declaração de IRS Complexa</h3>
              <p className="text-gray-600 text-sm">
                Anexo F, despesas dedutíveis, aumentos de renda, coeficientes de desvalorização.
                Um erro pode custar uma inspeção fiscal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Preview */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Como o Senhorio Resolve Tudo
        </h2>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Plataforma completa que automatiza toda a gestão de arrendamento,
          desde o cálculo fiscal até à declaração de IRS.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🧮</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Calculadora de Regimes</h3>
            <p className="text-sm text-gray-600">
              Compare automaticamente os 4 regimes fiscais e descubra o que mais poupa.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Gestão de Rendas</h3>
            <p className="text-sm text-gray-600">
              Rastreamento automático de pagamentos, lembretes de recibos, controlo de aumentos.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Exportação para IRS</h3>
            <p className="text-sm text-gray-600">
              Relatório anual pronto para anexar à declaração de IRS. Zero stress fiscal.
            </p>
          </div>
        </div>

        {/* Pricing Comparison */}
        <div className="bg-blue-50 rounded-xl p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Preço: 10-18x Mais Barato que um Contabilista
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500">Contabilista</p>
              <p className="text-lg font-bold text-gray-900">€50-150/mês</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Software genérico</p>
              <p className="text-lg font-bold text-gray-900">€25-50/mês</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Gestão manual</p>
              <p className="text-lg font-bold text-red-600">Multas + Stress</p>
            </div>
            <div className="bg-blue-600 text-white rounded-lg p-4">
              <p className="text-sm opacity-90">Senhorio</p>
              <p className="text-lg font-bold">€5-19/mês</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-gray-50 border-t">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            O Mercado de Arrendamento Português
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-3xl font-bold text-blue-600">923K</p>
              <p className="text-sm text-gray-600">Fogos de renda</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">300K+</p>
              <p className="text-sm text-gray-600">Senhorios</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">2026</p>
              <p className="text-sm text-gray-600">Novas regras fiscais</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">€3.750</p>
              <p className="text-sm text-gray-600">Multa máxima</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Perguntas Frequentes
        </h2>
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              Qual é a diferença entre os regimes de IRS?
            </h3>
            <p className="text-gray-600 text-sm">
              Standard IRS (25%) aplica-se sempre. Taxa reduzida (10%) para rendas ≤€2.300/mês.
              RSAA (0%) para rendas acessíveis 20%+ abaixo da mediana municipal.
              Não residentes pagam 28% fixo.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              O Senhorio substitui o meu contabilista?
            </h3>
            <p className="text-gray-600 text-sm">
              Para gestão básica de rendas sim. Para questões fiscais complexas,
              o Senhorio prepara todos os dados que o seu contabilista precisa,
              poupando tempo e custos.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              Quando estará disponível?
            </h3>
            <p className="text-gray-600 text-sm">
              A calculadora de regimes fiscais já está disponível gratuitamente.
              A plataforma completa será lançada progressivamente durante 2026.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-3xl mx-auto px-6 py-12 text-center text-sm text-gray-400 border-t">
        <p className="mb-4">
          <strong className="text-gray-600">Senhorio</strong> · Gestão de Arrendamento para Senhorios Portugueses
        </p>
        <p>
          🇵🇹 Feito em Portugal · Dados seguros · Conformidade fiscal garantida
        </p>
      </footer>
    </div>
  );
}
