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
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckIcon />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {result.already_signed_up ? "You're already on the list!" : "Welcome to Senhorio!"}
          </h3>
          <p className="text-gray-600 mb-6">
            You're <span className="font-bold text-blue-600">#{result.position}</span> on the waitlist.
          </p>
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-gray-700 font-medium mb-3">Share your link to move up:</p>
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
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Get Early Access</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="w-full px-6 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {state === "loading" ? "Joining..." : "Join the Waitlist"}
        </button>
        {ref && (
          <p className="text-sm text-gray-500 text-center">
            ✨ Referred by a friend? You'll get priority access.
          </p>
        )}
        {state === "error" && (
          <p className="text-sm text-red-500 text-center">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
          <span className="text-xl font-bold text-gray-900">Senhorio</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 hover:text-gray-900 transition">Features</a>
          <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition">Pricing</a>
          <a href="#faq" className="text-gray-600 hover:text-gray-900 transition">FAQ</a>
          <Link href="/calculadora" className="text-blue-600 font-medium hover:text-blue-700 transition">Tax Calculator</Link>
          <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition">Blog</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="waitlist" className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              Rental management{" "}
              <span className="text-blue-600">built for Portugal</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              The only platform designed specifically for Portuguese landlords. Track rents, generate compliant receipts, calculate taxes, and stay ahead of Portal das Finanças deadlines — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start mb-8">
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                ✓ 10x cheaper than accountants
              </span>
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                ✓ Portuguese & English support
              </span>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            {LAUNCH_MODE === "waitlist" && <WaitlistForm />}
            {LAUNCH_MODE !== "waitlist" && (
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">Get Started Today</h3>
                  <div className="flex gap-4">
                    <Link href="/checkout" className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition text-center">
                      Start Free Trial
                    </Link>
                    <Link href="/calculadora" className="flex-1 px-6 py-4 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition text-center">
                      Try Calculator
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Portuguese landlords choose Senhorio</h2>
            <p className="text-gray-600">Built specifically for Portugal's unique rental laws and tax requirements</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">4</div>
              <p className="text-gray-600">Tax regimes compared instantly</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">2026</div>
              <p className="text-gray-600">Updated for latest IRS rules</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">PT + EN</div>
              <p className="text-gray-600">Built for Portuguese landlords</p>
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

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything you need to manage rentals</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From tax calculations to receipt generation, Senhorio handles all the complex parts of rental management in Portugal.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <CalculatorIcon />,
              title: "Tax Calculator",
              description: "Compare all 4 Portuguese tax regimes instantly. See exactly how much you'll owe in IRS and choose the best option for your situation.",
              link: "/calculadora"
            },
            {
              icon: <ReceiptIcon />,
              title: "Digital Receipts",
              description: "Generate Recibos de Renda that meet Portuguese legal requirements. Send to tenants automatically and keep organized records.",
              link: "#"
            },
            {
              icon: <TrendingIcon />,
              title: "Rent Increases",
              description: "Calculate legal rent increases using official INE coefficients. Stay compliant with NRAU regulations and maximize your income.",
              link: "/calculadora-rendas"
            },
            {
              icon: <ShieldIcon />,
              title: "Tax Compliance",
              description: "Track deductible expenses, monitor IRS deadlines, and export data ready for Portal das Finanças. Never miss a deadline again.",
              link: "#"
            },
            {
              icon: <ClockIcon />,
              title: "Automated Reminders",
              description: "Get notified about late rent payments, tax deadlines, and important compliance dates. Stay on top of everything automatically.",
              link: "#"
            },
            {
              icon: <DatabaseIcon />,
              title: "Portfolio Dashboard",
              description: "See all your properties, tenants, and income in one place. Track performance and identify opportunities to optimize.",
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
                  Try it now →
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
          <p className="text-xl text-gray-600">Choose the plan that fits your portfolio size</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              name: "Grátis",
              price: "€0",
              period: "forever",
              description: "Perfect for trying out Senhorio",
              features: [
                "Tax calculator (all 4 regimes)",
                "Rent increase calculator",
                "1 property tracking",
                "Basic compliance checklist",
                "Email support"
              ],
              cta: "Get Started",
              popular: false
            },
            {
              name: "Senhorio Pro",
              price: "€9",
              period: "per month",
              description: "For serious landlords managing multiple properties",
              features: [
                "Up to 5 properties",
                "Automated receipt generation",
                "Expense tracking & categorization",
                "IRS Annex F export",
                "Email notifications",
                "Priority support"
              ],
              cta: "Start Free Trial",
              popular: true
            },
            {
              name: "Senhorio Premium",
              price: "€19",
              period: "per month",
              description: "For property management professionals",
              features: [
                "Up to 20 properties",
                "Multi-entity management",
                "Accountant export (Excel/CSV)",
                "API access",
                "Custom reports",
                "Phone support"
              ],
              cta: "Contact Sales",
              popular: false
            }
          ].map((plan, i) => (
            <div key={i} className={`bg-white rounded-2xl shadow-lg p-8 relative ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">Most Popular</span>
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
                  Join Waitlist
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

      {/* FAQ Section */}
      <section id="faq" className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently asked questions</h2>
          <p className="text-xl text-gray-600">Common questions from Portuguese landlords</p>
        </div>

        <div className="space-y-6">
          {[
            {
              q: "How does Senhorio help with Portuguese tax compliance?",
              a: "Senhorio calculates your exact IRS obligations using all 4 Portuguese tax regimes (25% rate, 10% rate, aggregation, and simplificado). We track your deductible expenses and generate reports ready for Portal das Finanças, ensuring you never overpay or miss deadlines."
            },
            {
              q: "Will Senhorio generate rent receipts (Recibos de Renda)?",
              a: "Receipt generation is on our roadmap. When launched, receipts will follow Portuguese legal requirements including proper formatting and required fields. Currently, our tax calculator helps you compare regimes and plan your IRS obligations."
            },
            {
              q: "Can I use Senhorio for properties outside Portugal?",
              a: "Senhorio is specifically designed for Portuguese rental law and tax requirements. While you could track properties elsewhere, our tax calculations, legal compliance features, and receipt formats are built for Portugal only."
            },
            {
              q: "How accurate are the tax calculations?",
              a: "Our tax calculations are based on official Portuguese tax law and updated for 2026 rules including the new 10% regime. However, Senhorio is an informational tool, not professional tax advice. For complex situations, consult a qualified accountant (contabilista certificado)."
            },
            {
              q: "Do I need to know Portuguese to use Senhorio?",
              a: "No! Senhorio is available in both Portuguese and English, making it perfect for expat landlords and non-resident investors. All features work in both languages."
            },
            {
              q: "What happens to my data if I cancel?",
              a: "You can export all your data (receipts, expense records, property information) at any time. We keep your data for 30 days after cancellation in case you want to reactivate, then it's permanently deleted."
            }
          ].map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
                <span className="text-xl font-bold">Senhorio</span>
              </div>
              <p className="text-gray-400 mb-4">
                The all-in-one rental management platform built for Portuguese landlords.
              </p>
              <p className="text-gray-400 text-sm">
                © 2026 Senhorio. All rights reserved.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/calculadora" className="hover:text-white transition">Tax Calculator</Link></li>
                <li><Link href="/calculadora-rendas" className="hover:text-white transition">Rent Calculator</Link></li>
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
                <li><a href="mailto:help@senhorio.pt" className="hover:text-white transition">Contact Support</a></li>
                <li><a href="/help" className="hover:text-white transition">Help Center</a></li>
                <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="/cookies" className="hover:text-white transition">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
