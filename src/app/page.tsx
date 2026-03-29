"use client";

import React, { useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import PaymentIntentModal from "@/components/PaymentIntentModal";
import PricingABTest from "@/components/PricingABTest";

const LAUNCH_MODE = process.env.NEXT_PUBLIC_LAUNCH_MODE || "waitlist";

// SVG Icons
function CalculatorIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}

function ReceiptIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function TrendingIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

// Simple Toast Component
function Toast({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 5000); // Auto-close after 5 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
      type === "success"
        ? "bg-green-50 border border-green-200 text-green-800"
        : "bg-red-50 border border-red-200 text-red-800"
    }`}>
      <div className="flex items-center gap-3">
        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
          type === "success" ? "bg-green-200" : "bg-red-200"
        }`}>
          {type === "success" ? (
            <CheckIcon />
          ) : (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <span className="font-medium">{message}</span>
        <button onClick={onClose} className={`ml-auto ${type === "success" ? "text-green-600 hover:text-green-700" : "text-red-600 hover:text-red-700"}`}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [formEngaged, setFormEngaged] = useState(false);
  const [formStartTime, setFormStartTime] = useState<number | null>(null);
  const [emailFieldInteracted, setEmailFieldInteracted] = useState(false);

  const ref = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("ref") : null;

  // Track form abandonment when component unmounts
  React.useEffect(() => {
    return () => {
      if (formEngaged && state === "idle" && formStartTime) {
        const timeSpent = Date.now() - formStartTime;
        track("waitlist_form_abandoned", {
          time_spent_ms: timeSpent,
          email_filled: !!email,
          name_filled: !!name,
          email_field_interacted: emailFieldInteracted,
        });
      }
    };
  }, [formEngaged, state, formStartTime, email, name, emailFieldInteracted]);

  const handleFormEngagement = () => {
    if (!formEngaged) {
      setFormEngaged(true);
      setFormStartTime(Date.now());
      track("waitlist_form_engaged", {
        ref: ref || undefined,
      });
    }
  };

  const handleEmailFieldInteraction = () => {
    if (!emailFieldInteracted) {
      setEmailFieldInteracted(true);
      track("waitlist_email_field_focused", {
        ref: ref || undefined,
      });
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");

    const urlParams = new URLSearchParams(window.location.search);
    const utm_source = urlParams.get("utm_source");
    const utm_medium = urlParams.get("utm_medium");
    const utm_campaign = urlParams.get("utm_campaign");

    // Track form completion time
    const timeToComplete = formStartTime ? Date.now() - formStartTime : null;

    // Track waitlist signup attempt
    track("waitlist_signup_attempt", {
      ref: ref || undefined,
      utm_source: utm_source || undefined,
      utm_medium: utm_medium || undefined,
      utm_campaign: utm_campaign || undefined,
      has_name: !!name,
      time_to_complete_ms: timeToComplete || undefined,
      form_engaged: formEngaged,
    });

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: name || undefined,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        // Track successful signup
        track("waitlist_signup_success", {
          ref: ref || undefined,
          utm_source: utm_source || undefined,
          utm_medium: utm_medium || undefined,
          utm_campaign: utm_campaign || undefined,
          time_to_complete_ms: timeToComplete || undefined,
          form_engaged: formEngaged,
        });

        setToast({ message: data.message || "Juntou-se à lista de espera com sucesso!", type: "success" });
        setState("success");

        // Reset form after successful submission
        setEmail("");
        setName("");
        setTimeout(() => setState("idle"), 2000);
      } else {
        // Track signup error
        track("waitlist_signup_error", {
          error: data.error || "unknown",
          ref: ref || undefined,
          utm_source: utm_source || undefined,
          utm_medium: utm_medium || undefined,
          utm_campaign: utm_campaign || undefined,
        });

        setToast({ message: data.error || "Ocorreu um erro. Por favor, tente novamente.", type: "error" });
        setState("error");
        setTimeout(() => setState("idle"), 2000);
      }
    } catch (err) {
      // Track fetch error
      track("waitlist_signup_error", {
        error: "network_error",
        ref: ref || undefined,
        utm_source: utm_source || undefined,
        utm_medium: utm_medium || undefined,
        utm_campaign: utm_campaign || undefined,
      });

      setToast({ message: "Erro de conexão. Por favor, tente novamente.", type: "error" });
      setState("error");
      setTimeout(() => setState("idle"), 2000);
    }
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Acesso Antecipado</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="O seu nome (opcional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={handleFormEngagement}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <input
            type="email"
            required
            placeholder="o-seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => {
              handleFormEngagement();
              handleEmailFieldInteraction();
            }}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <button
            type="submit"
            disabled={state === "loading"}
            className="w-full px-6 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {state === "loading" ? "A registar..." : "Entrar na Lista de Espera"}
          </button>
          {ref && (
            <p className="text-sm text-gray-500 text-center">
              Referido por um amigo? Terá acesso prioritário.
            </p>
          )}
        </form>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}

export default function HomePage() {
  const [paymentIntentModal, setPaymentIntentModal] = useState({
    isOpen: false,
    selectedPlan: null as any
  });

  const handlePricingClick = (plan: any) => {
    setPaymentIntentModal({
      isOpen: true,
      selectedPlan: plan
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navegação */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
          <span className="text-xl font-bold text-gray-900">Senhorio</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#funcionalidades" className="text-gray-600 hover:text-gray-900 transition">Funcionalidades</a>
          <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition">Preços</a>
          <a href="#faq" className="text-gray-600 hover:text-gray-900 transition">FAQ</a>
          <Link
            href="/calculadora"
            onClick={() => track("nav_link_click", { destination: "calculadora", source: "nav" })}
            className="text-blue-600 font-medium hover:text-blue-700 transition"
          >
            Simulador Fiscal
          </Link>
          <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition">Blog</Link>
          {LAUNCH_MODE === "waitlist" ? (
            <a
              href="#waitlist"
              onClick={() => track("cta_click", { location: "nav", action: "acesso_antecipado" })}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Acesso Antecipado
            </a>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 text-blue-600 font-medium hover:text-blue-700 transition">Entrar</Link>
              <Link href="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">Criar Conta</Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section id="waitlist" className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              Gestão de arrendamento{" "}
              <span className="text-blue-600">feita para Portugal</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              A única plataforma desenhada especificamente para senhorios portugueses. Acompanhe rendas, gere recibos, calcule impostos e cumpra prazos do Portal das Finanças — tudo num só lugar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start mb-8">
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                10x mais barato que um contabilista
              </span>
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Disponível em Português e Inglês
              </span>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            {LAUNCH_MODE === "waitlist" && <WaitlistForm />}
            {LAUNCH_MODE !== "waitlist" && (
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">Comece Hoje</h3>
                  <div className="flex gap-4">
                    <Link href="/checkout" className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition text-center">
                      Experimentar Grátis
                    </Link>
                    <Link href="/calculadora" className="flex-1 px-6 py-4 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition text-center">
                      Simulador
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Dados */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Porque é que os senhorios portugueses escolhem o Senhorio</h2>
            <p className="text-gray-600">Construído especificamente para as leis e requisitos fiscais de Portugal</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">4</div>
              <p className="text-gray-600">Regimes fiscais comparados instantaneamente</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">2026</div>
              <p className="text-gray-600">Atualizado com as regras IRS mais recentes</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">PT + EN</div>
              <p className="text-gray-600">Feito para senhorios portugueses</p>
            </div>
          </div>
        </div>
      </section>

      {/* IRS 2026 CTA */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 text-center">
          <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium mb-4">
            IRS 2026
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Nova Taxa de 10% para Arrendamento
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Descubra as mudanças fiscais de 2026 e como a nova taxa de 10% pode beneficiar o seu negócio.
            Guia completo com simulador gratuito.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog/irs-arrendamento-2026-nova-taxa-10-porcento"
              onClick={() => track("content_click", { type: "blog", article: "irs-2026", source: "hero_cta" })}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Ler Guia Completo
            </Link>
            <Link
              href="/calculadora"
              onClick={() => track("content_click", { type: "calculator", tool: "irs-2026", source: "hero_cta" })}
              className="px-6 py-3 border border-blue-300 text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition"
            >
              Calcular IRS 2026
            </Link>
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section id="funcionalidades" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Tudo o que precisa para gerir arrendamentos</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            De cálculos fiscais a emissão de recibos, o Senhorio trata de toda a complexidade da gestão de arrendamento em Portugal.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <CalculatorIcon />,
              title: "Simulador Fiscal",
              description: "Compare os 4 regimes fiscais portugueses instantaneamente. Veja exatamente quanto vai pagar de IRS e escolha a melhor opção para a sua situação.",
              link: "/calculadora"
            },
            {
              icon: <ReceiptIcon />,
              title: "Recibos Digitais",
              description: "Gere recibos de renda eletrónicos gratuitos e conformes com a legislação portuguesa. Simples, rápido e sem necessidade de registo.",
              link: "/recibos"
            },
            {
              icon: <TrendingIcon />,
              title: "Atualização de Rendas",
              description: "Calcule aumentos legais de renda usando os coeficientes oficiais do INE. Cumpra o NRAU e maximize o seu rendimento.",
              link: "/calculadora-rendas"
            },
            {
              icon: <HomeIcon />,
              title: "Isenção AIMI",
              description: "Verifique se qualifica para a isenção AIMI 2026. Descubra se as suas rendas estão abaixo dos €2.300/mês para habitação acessível.",
              link: "/aimi"
            },
            {
              icon: <ShieldIcon />,
              title: "Conformidade Fiscal",
              description: "Acompanhe despesas dedutíveis, monitorize prazos do IRS e exporte dados prontos para o Portal das Finanças. Nunca mais perca um prazo.",
              link: "#"
            },
            {
              icon: <ClockIcon />,
              title: "Lembretes Automáticos",
              description: "Receba notificações sobre rendas em atraso, prazos fiscais e datas importantes de conformidade. Fique sempre em dia automaticamente.",
              link: "#"
            },
            {
              icon: <DatabaseIcon />,
              title: "Painel de Portfólio",
              description: "Veja todos os seus imóveis, inquilinos e rendimentos num só lugar. Acompanhe o desempenho e identifique oportunidades de otimização.",
              link: "#"
            }
          ].map((feature, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition group">
              <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              {feature.link !== "#" && (
                <Link
                  href={feature.link}
                  onClick={() => track("feature_link_click", {
                    feature: feature.title.toLowerCase().replace(/\s+/g, "_"),
                    destination: feature.link
                  })}
                  className="text-blue-600 font-medium hover:text-blue-700 transition"
                >
                  Experimentar agora →
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Preços A/B Test */}
      <PricingABTest onPricingClick={handlePricingClick} />

      {/* FAQ */}
      <section id="faq" className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Perguntas frequentes</h2>
          <p className="text-xl text-gray-600">Dúvidas comuns de senhorios portugueses</p>
        </div>

        <div className="space-y-6">
          {[
            {
              q: "Como é que o Senhorio ajuda com a conformidade fiscal portuguesa?",
              a: "O Senhorio calcula as suas obrigações de IRS usando os 4 regimes fiscais portugueses (taxa de 25%, taxa de 10%, englobamento e regime simplificado). Acompanhamos as suas despesas dedutíveis e geramos relatórios prontos para o Portal das Finanças, garantindo que nunca paga a mais nem perde prazos."
            },
            {
              q: "O Senhorio vai emitir recibos de renda?",
              a: "A emissão de recibos está no nosso plano de desenvolvimento. Quando lançada, os recibos cumprirão os requisitos legais portugueses, incluindo formatação adequada e campos obrigatórios. Atualmente, o nosso simulador fiscal ajuda-o a comparar regimes e planear as suas obrigações de IRS."
            },
            {
              q: "Posso usar o Senhorio para imóveis fora de Portugal?",
              a: "O Senhorio foi desenhado especificamente para a legislação de arrendamento e requisitos fiscais portugueses. Embora possa acompanhar imóveis noutros países, os nossos cálculos fiscais, funcionalidades de conformidade e formatos de recibos são feitos exclusivamente para Portugal."
            },
            {
              q: "Os cálculos fiscais são precisos?",
              a: "Os nossos cálculos são baseados na legislação fiscal portuguesa oficial e atualizados para as regras de 2026, incluindo o novo regime de 10%. No entanto, o Senhorio é uma ferramenta informativa, não constitui aconselhamento fiscal profissional. Para situações complexas, consulte um contabilista certificado."
            },
            {
              q: "Preciso de saber português para usar o Senhorio?",
              a: "Não! O Senhorio está disponível em português e inglês, perfeito para senhorios expatriados e investidores não residentes. Todas as funcionalidades funcionam em ambos os idiomas."
            },
            {
              q: "O que acontece aos meus dados se cancelar?",
              a: "Pode exportar todos os seus dados (recibos, registos de despesas, informações de imóveis) a qualquer momento. Mantemos os seus dados durante 30 dias após o cancelamento para o caso de querer reativar, depois são eliminados permanentemente."
            }
          ].map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
                <span className="text-xl font-bold">Senhorio</span>
              </div>
              <p className="text-gray-400 mb-4">
                A plataforma completa de gestão de arrendamento feita para senhorios portugueses.
              </p>
              <p className="text-gray-400 text-sm">
                © 2026 Senhorio. Todos os direitos reservados.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/calculadora"
                    className="hover:text-white transition"
                    onClick={() => track('Footer Link Click', { page: 'calculadora' })}
                  >
                    Simulador Fiscal
                  </Link>
                </li>
                <li>
                  <Link
                    href="/calculadora-rendas"
                    className="hover:text-white transition"
                    onClick={() => track('Footer Link Click', { page: 'calculadora-rendas' })}
                  >
                    Calculadora de Rendas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/recibos"
                    className="hover:text-white transition"
                    onClick={() => track('Footer Link Click', { page: 'recibos' })}
                  >
                    Gerador de Recibos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aimi"
                    className="hover:text-white transition"
                    onClick={() => track('Footer Link Click', { page: 'aimi' })}
                  >
                    Isenção AIMI
                  </Link>
                </li>
                <li><a href="#funcionalidades" className="hover:text-white transition">Funcionalidades</a></li>
                <li><a href="#pricing" className="hover:text-white transition">Preços</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
                <li><a href="mailto:help@senhorio.pt" className="hover:text-white transition">Contactar Suporte</a></li>
                <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/privacy" className="hover:text-white transition">Política de Privacidade</a></li>
                <li><a href="/terms" className="hover:text-white transition">Termos de Serviço</a></li>
                <li><a href="/cookies" className="hover:text-white transition">Política de Cookies</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Payment Intent Modal */}
      <PaymentIntentModal
        isOpen={paymentIntentModal.isOpen}
        onClose={() => setPaymentIntentModal({ isOpen: false, selectedPlan: null })}
        selectedPlan={paymentIntentModal.selectedPlan}
      />
    </div>
  );
}
