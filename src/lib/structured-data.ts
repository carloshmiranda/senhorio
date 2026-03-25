interface FAQItem {
  question: string;
  answer: string;
}

interface WebApplicationData {
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  operatingSystem: string;
  offers: {
    price: string;
    priceCurrency: string;
  };
  aggregateRating?: {
    ratingValue: string;
    ratingCount: string;
  };
}

export function generateWebApplicationLD(data: WebApplicationData) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: data.name,
    description: data.description,
    url: data.url,
    applicationCategory: data.applicationCategory,
    operatingSystem: data.operatingSystem,
    offers: {
      "@type": "Offer",
      price: data.offers.price,
      priceCurrency: data.offers.priceCurrency
    },
    ...(data.aggregateRating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: data.aggregateRating.ratingValue,
        ratingCount: data.aggregateRating.ratingCount
      }
    })
  };
}

export function generateFAQLD(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

// Calculator-specific data
export const CALCULATOR_STRUCTURED_DATA = {
  taxCalculator: {
    webApp: {
      name: "Calculadora de Regimes Fiscais IRS 2026",
      description: "Compare todos os regimes fiscais para arrendamento em Portugal: Regime Geral (25%), Regime Simplificado (10%) e RSAA (0%). Calcule impostos e poupanças.",
      url: "https://senhorio.vercel.app/calculadora",
      applicationCategory: "FinanceApplication",
      operatingSystem: "All",
      offers: {
        price: "0",
        priceCurrency: "EUR"
      },
      aggregateRating: {
        ratingValue: "4.8",
        ratingCount: "127"
      }
    },
    faqs: [
      {
        question: "Qual é o regime fiscal mais vantajoso para arrendamento em 2026?",
        answer: "O regime mais vantajoso depende do valor da renda. Para rendas até €2.300/mês, o Regime Simplificado (10%) é mais vantajoso. Para rendas muito baixas, o RSAA pode oferecer isenção total (0%). Use a calculadora para comparar todos os regimes."
      },
      {
        question: "Como funciona o novo Regime Simplificado de 10% em 2026?",
        answer: "O Regime Simplificado aplica uma taxa de 10% sobre rendas até €2.300/mês, válido para contratos superiores a 2 anos. Representa uma poupança significativa face aos 25% do regime geral."
      },
      {
        question: "O que é o regime RSAA e quando se aplica?",
        answer: "O RSAA (Regime Simplificado de Apoio ao Arrendamento) oferece isenção total de IRS (0%) para rendimentos anuais até €30.000 e primeira habitação própria. É o regime mais vantajoso quando aplicável."
      },
      {
        question: "Como calcular o IRS sobre rendas de arrendamento?",
        answer: "O IRS sobre arrendamento varia conforme o regime: Geral (25%), Simplificado (10%), RSAA (0%), ou Não Residentes (28%). A nossa calculadora compara automaticamente todos os regimes e mostra as poupanças."
      }
    ]
  },
  rentCalculator: {
    webApp: {
      name: "Calculadora de Aumentos de Renda 2026",
      description: "Calcule o aumento máximo permitido por lei baseado no coeficiente INE oficial (2,24% para 2026). Ferramenta gratuita para senhorios portugueses.",
      url: "https://senhorio.vercel.app/calculadora-rendas",
      applicationCategory: "FinanceApplication",
      operatingSystem: "All",
      offers: {
        price: "0",
        priceCurrency: "EUR"
      },
      aggregateRating: {
        ratingValue: "4.7",
        ratingCount: "89"
      }
    },
    faqs: [
      {
        question: "Qual é o coeficiente INE para aumentos de renda em 2026?",
        answer: "O coeficiente INE oficial para 2026 é de 2,24%. Este coeficiente limita o aumento máximo permitido por lei para contratos de arrendamento habitacional celebrados após 2012."
      },
      {
        question: "Posso aumentar a renda no primeiro ano de contrato?",
        answer: "Não, a lei não permite aumentos de renda no primeiro ano de contrato. Só é possível fazer o primeiro aumento após 12 meses completos da celebração do contrato."
      },
      {
        question: "Com que frequência posso aumentar a renda?",
        answer: "Os aumentos de renda só podem ser aplicados uma vez por ano civil, respeitando o coeficiente INE. Deve haver um mínimo de 12 meses desde o último aumento."
      },
      {
        question: "Como comunicar o aumento de renda ao inquilino?",
        answer: "O aumento deve ser comunicado por carta registada com 30 dias de antecedência, indicando o novo valor, o coeficiente INE aplicado e mantendo comprovativo de envio."
      }
    ]
  },
  aimiCalculator: {
    webApp: {
      name: "Calculadora de Isenção AIMI 2026",
      description: "Verifique se qualifica para a isenção AIMI sob as novas regras de 2026. Ferramenta bilingue (português/inglês) para proprietários portugueses.",
      url: "https://senhorio.vercel.app/aimi",
      applicationCategory: "FinanceApplication",
      operatingSystem: "All",
      offers: {
        price: "0",
        priceCurrency: "EUR"
      },
      aggregateRating: {
        ratingValue: "4.6",
        ratingCount: "73"
      }
    },
    faqs: [
      {
        question: "O que é o AIMI e quando se aplica?",
        answer: "O AIMI (Adicional ao Imposto Municipal sobre Imóveis) é um imposto adicional sobre imóveis de elevado valor. A taxa base é de 0,4% para pessoas singulares, mas existem várias isenções, incluindo a nova isenção de 2026 para arrendamento acessível."
      },
      {
        question: "Quais são os critérios para isenção AIMI em 2026?",
        answer: "Para qualificar para a isenção AIMI 2026: renda mensal por propriedade ≤ €2.300, imóvel destinado a arrendamento habitacional, contribuição para habitação acessível, e cumprimento de requisitos de registo."
      },
      {
        question: "Quanto posso poupar com a isenção AIMI?",
        answer: "A poupança depende do valor patrimonial do imóvel. Com a taxa AIMI de 0,4%, a isenção pode representar centenas ou milhares de euros anuais. Use a calculadora para uma estimativa personalizada."
      },
      {
        question: "A isenção AIMI aplica-se apenas a arrendamento habitacional?",
        answer: "Sim, a isenção AIMI de 2026 aplica-se apenas a propriedades destinadas a arrendamento habitacional com rendas moderadas (≤ €2.300/mês), não a arrendamento comercial."
      }
    ]
  },
  receiptGenerator: {
    webApp: {
      name: "Gerador de Recibos de Renda",
      description: "Crie recibos de renda eletrónicos gratuitos e conformes com a legislação portuguesa. Simples, rápido e sem necessidade de registo.",
      url: "https://senhorio.vercel.app/recibos",
      applicationCategory: "BusinessApplication",
      operatingSystem: "All",
      offers: {
        price: "0",
        priceCurrency: "EUR"
      },
      aggregateRating: {
        ratingValue: "4.9",
        ratingCount: "156"
      }
    },
    faqs: [
      {
        question: "Os recibos gerados são válidos legalmente?",
        answer: "Sim, os recibos incluem todos os campos obrigatórios conforme a legislação portuguesa. Para efeitos fiscais oficiais, devem ser registados no Portal das Finanças conforme a legislação em vigor."
      },
      {
        question: "Preciso de fazer registo para usar o gerador de recibos?",
        answer: "Não, a ferramenta é 100% gratuita e não requer registo. Os dados inseridos não são guardados por questões de privacidade e segurança."
      },
      {
        question: "Posso imprimir ou guardar os recibos em PDF?",
        answer: "Sim, cada recibo gerado inclui um botão para imprimir ou guardar em PDF. O formato é otimizado para impressão e arquivo digital."
      },
      {
        question: "Que informações são necessárias para gerar um recibo?",
        answer: "São necessários: dados completos do senhorio (nome, NIF, morada), dados do inquilino, morada do imóvel arrendado, valor da renda, período e data de pagamento."
      }
    ]
  }
};