"use client";

import React, { useState, useEffect } from "react";
import { track } from "@vercel/analytics";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

interface PricingVariant {
  id: string;
  name: string;
  description: string;
  plans: PricingPlan[];
}

const PRICING_VARIANTS: PricingVariant[] = [
  // Control variant - current copy
  {
    id: "control",
    name: "Control",
    description: "Escolha o plano que se adequa ao tamanho do seu portfólio",
    plans: [
      {
        name: "Grátis",
        price: "€0",
        period: "sempre",
        description: "Para explorar as funcionalidades básicas",
        features: ["Simulador fiscal", "1 propriedade", "Suporte por email"],
        cta: "Experimentar Grátis"
      },
      {
        name: "Essencial",
        price: "€9",
        period: "mês",
        description: "Para senhorios com 1-5 propriedades",
        features: ["Tudo do plano Grátis", "5 propriedades", "Recibos digitais", "Dashboard completo"],
        popular: true,
        cta: "Registar Interesse"
      },
      {
        name: "Profissional",
        price: "€19",
        period: "mês",
        description: "Para portfólios maiores e gestores profissionais",
        features: ["Tudo do plano Essencial", "Propriedades ilimitadas", "Relatórios avançados", "Suporte prioritário"],
        cta: "Registar Interesse"
      }
    ]
  },
  // Variant A - Value-focused copy
  {
    id: "value_focused",
    name: "Value Focused",
    description: "Poupança garantida com os nossos simuladores fiscais automáticos",
    plans: [
      {
        name: "Grátis",
        price: "€0",
        period: "sempre",
        description: "Descubra quanto pode poupar nos seus impostos",
        features: ["Simulador fiscal avançado", "1 propriedade", "Suporte especializado"],
        cta: "Descobrir Poupanças"
      },
      {
        name: "Essencial",
        price: "€9",
        period: "mês",
        description: "Poupe centenas de euros por ano em impostos",
        features: ["Simulador automático", "Até 5 propriedades", "Recibos legais", "Otimização fiscal"],
        popular: true,
        cta: "Começar a Poupar"
      },
      {
        name: "Profissional",
        price: "€19",
        period: "mês",
        description: "Gestão profissional com máxima poupança fiscal",
        features: ["Poupança máxima", "Propriedades ilimitadas", "Relatórios fiscais", "Consultoria prioritária"],
        cta: "Maximizar Poupanças"
      }
    ]
  },
  // Variant B - Compliance-focused copy
  {
    id: "compliance_focused",
    name: "Compliance Focused",
    description: "Mantenha-se 100% conforme com as obrigações fiscais portuguesas",
    plans: [
      {
        name: "Grátis",
        price: "€0",
        period: "sempre",
        description: "Verifique se está conforme com o IRS 2026",
        features: ["Verificação de conformidade", "1 propriedade", "Alertas legais"],
        cta: "Verificar Conformidade"
      },
      {
        name: "Essencial",
        price: "€9",
        period: "mês",
        description: "Conformidade automática para até 5 propriedades",
        features: ["Conformidade total", "5 propriedades", "Recibos certificados", "Alertas AT"],
        popular: true,
        cta: "Estar em Conformidade"
      },
      {
        name: "Profissional",
        price: "€19",
        period: "mês",
        description: "Gestão profissional com garantia de conformidade",
        features: ["Conformidade garantida", "Propriedades ilimitadas", "Auditoria completa", "Suporte AT"],
        cta: "Garantir Conformidade"
      }
    ]
  }
];

// Generate consistent variant for user (based on session)
function getUserVariant(): PricingVariant {
  if (typeof window === 'undefined') return PRICING_VARIANTS[0];

  let storedVariant = sessionStorage.getItem('pricing_ab_variant');

  if (!storedVariant) {
    // Assign variant based on hash of timestamp + random for even distribution
    const seed = Date.now() + Math.random();
    const variantIndex = Math.floor((seed * 31) % PRICING_VARIANTS.length);
    storedVariant = PRICING_VARIANTS[variantIndex].id;
    sessionStorage.setItem('pricing_ab_variant', storedVariant);

    // Track variant assignment
    track("pricing_ab_assigned", {
      variant: storedVariant,
      total_variants: PRICING_VARIANTS.length
    });
  }

  return PRICING_VARIANTS.find(v => v.id === storedVariant) || PRICING_VARIANTS[0];
}

interface PricingABTestProps {
  onPricingClick: (plan: PricingPlan) => void;
}

export default function PricingABTest({ onPricingClick }: PricingABTestProps) {
  const [variant, setVariant] = useState<PricingVariant>(PRICING_VARIANTS[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setVariant(getUserVariant());
    setMounted(true);
  }, []);

  // Track variant exposure when component is viewed
  useEffect(() => {
    if (mounted) {
      track("pricing_ab_exposed", {
        variant: variant.id,
        variant_name: variant.name
      });
    }
  }, [mounted, variant.id, variant.name]);

  const handlePlanClick = (plan: PricingPlan) => {
    // Track plan click with variant info
    track("pricing_cta_click", {
      location: "pricing",
      plan: plan.name.toLowerCase(),
      popular: plan.popular,
      price: plan.price,
      variant: variant.id,
      variant_name: variant.name,
      cta_text: plan.cta
    });

    onPricingClick(plan);
  };

  function CheckIcon() {
    return (
      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    );
  }

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Preços Transparentes
          </h2>
          <p className="text-xl text-gray-600">{variant.description}</p>

          {/* Debug info - only in development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-2 bg-yellow-100 border border-yellow-300 rounded text-sm text-yellow-800">
              <strong>A/B Test:</strong> {variant.name} ({variant.id})
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {variant.plans.map((plan, i) => (
            <div key={i} className={`bg-white rounded-2xl shadow-lg p-8 relative ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                  Mais Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <CheckIcon />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePlanClick(plan)}
                className={`w-full px-6 py-3 rounded-xl font-semibold transition text-center ${plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}