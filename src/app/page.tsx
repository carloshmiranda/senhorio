"use client";

import { useState } from "react";
import Link from "next/link";

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

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [result, setResult] = useState<{ referral_code?: string; position?: number; already_signed_up?: boolean } | null>(null);

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
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckIcon />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {result.already_signed_up ? "Já está na lista!" : "Bem-vindo ao Senhorio!"}
          </h3>
          <p className="text-gray-600 mb-6">
            Está na posição <span className="font-bold text-blue-600">#{result.position}</span> da lista de espera.
          </p>
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-gray-700 font-medium mb-3">Partilhe o seu link para subir na lista:</p>
            <div className="flex items-center gap-3">
              <input
                readOnly
                value={referralLink}
                className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 text-sm"
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
              <button
                onClick={() => navigator.clipboard.writeText(referralLink)}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
              >
                Copiar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Acesso Antecipado</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="O seu nome (opcional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <input
          type="email"
          required
          placeholder="o-seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        {state === "error" && (
          <p className="text-sm text-red-500 text-center">
            Ocorreu um erro. Por favor, tente novamente.
          </p>
        )}
      </form>
    </div>
  );
}

export default function HomePage() {
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
          <a href="#precos" className="text-gray-600 hover:text-gray-900 transition">Preços</a>
          <a href="#faq" className="text-gray-600 hover:text-gray-900 transition">FAQ</a>
          <Link href="/calculadora" className="text-blue-600 font-medium hover:text-blue-700 transition">Simulador Fiscal</Link>
          <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition">Blog</Link>
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
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Ler Guia Completo
            </Link>
            <Link
              href="/calculadora"
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
              description: "Emissão de Recibos de Renda conforme os requisitos legais portugueses. Envie aos inquilinos automaticamente e mantenha registos organizados.",
              link: "#"
            },
            {
              icon: <TrendingIcon />,
              title: "Atualização de Rendas",
              description: "Calcule aumentos legais de renda usando os coeficientes oficiais do INE. Cumpra o NRAU e maximize o seu rendimento.",
              link: "/calculadora-rendas"
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
                <Link href={feature.link} className="text-blue-600 font-medium hover:text-blue-700 transition">
                  Experimentar agora →
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Precos */}
      <section id="precos" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Preços simples e transparentes</h2>
          <p className="text-xl text-gray-600">Escolha o plano que se adequa ao tamanho do seu portfólio</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              name: "Grátis",
              price: "€0",
              period: "para sempre",
              description: "Ideal para experimentar o Senhorio",
              features: [
                "Simulador fiscal (todos os 4 regimes)",
                "Calculadora de atualização de rendas",
                "Acompanhamento de 1 imóvel",
                "Checklist básica de conformidade",
                "Suporte por email"
              ],
              cta: "Começar",
              popular: false
            },
            {
              name: "Senhorio Pro",
              price: "€9",
              period: "por mês",
              description: "Para senhorios com vários imóveis",
              features: [
                "Até 5 imóveis",
                "Emissão automática de recibos",
                "Registo e categorização de despesas",
                "Exportação para Anexo F do IRS",
                "Notificações por email",
                "Suporte prioritário"
              ],
              cta: "Experimentar Grátis",
              popular: true
            },
            {
              name: "Senhorio Premium",
              price: "€19",
              period: "por mês",
              description: "Para profissionais de gestão de imóveis",
              features: [
                "Até 20 imóveis",
                "Gestão multi-entidade",
                "Exportação para contabilista (Excel/CSV)",
                "Acesso API",
                "Relatórios personalizados",
                "Suporte telefónico"
              ],
              cta: "Contactar",
              popular: false
            }
          ].map((plan, i) => (
            <div key={i} className={`bg-white rounded-2xl shadow-lg p-8 relative ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">Mais Popular</span>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {LAUNCH_MODE === "waitlist" ? (
                <a href="#waitlist" className={`block w-full px-6 py-3 rounded-xl font-semibold transition text-center ${plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                  Entrar na Lista de Espera
                </a>
              ) : (
                <button className={`w-full px-6 py-3 rounded-xl font-semibold transition ${plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                  {plan.cta}
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

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
                <li><Link href="/calculadora" className="hover:text-white transition">Simulador Fiscal</Link></li>
                <li><Link href="/calculadora-rendas" className="hover:text-white transition">Calculadora de Rendas</Link></li>
                <li><a href="#funcionalidades" className="hover:text-white transition">Funcionalidades</a></li>
                <li><a href="#precos" className="hover:text-white transition">Preços</a></li>
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
    </div>
  );
}
