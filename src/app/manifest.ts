import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://senhorio.vercel.app'

  return {
    name: 'Senhorio - Gestão de Arrendamento',
    short_name: 'Senhorio',
    description: 'Plataforma completa de gestão de arrendamento para senhorios portugueses. Controle propriedades, inquilinos, recibos e impostos.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0F766E',
    orientation: 'portrait-primary',
    scope: '/',
    categories: ['productivity', 'business', 'finance'],
    lang: 'pt-PT',
    icons: [
      {
        src: `${baseUrl}/icon-192.png`,
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: `${baseUrl}/icon-192.png`,
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: `${baseUrl}/icon-512.png`,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: `${baseUrl}/icon-512.png`,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: `${baseUrl}/apple-touch-icon.png`,
        sizes: '180x180',
        type: 'image/png'
      }
    ],
    shortcuts: [
      {
        name: 'Dashboard',
        short_name: 'Dashboard',
        description: 'Acesso rápido ao painel principal',
        url: '/dashboard',
        icons: [{ src: `${baseUrl}/icon-192.png`, sizes: '192x192' }]
      },
      {
        name: 'Calculadora Fiscal',
        short_name: 'Calculadora',
        description: 'Calcular impostos de arrendamento',
        url: '/calculadora',
        icons: [{ src: `${baseUrl}/icon-192.png`, sizes: '192x192' }]
      },
      {
        name: 'Gerar Recibo',
        short_name: 'Recibos',
        description: 'Criar recibos de renda',
        url: '/recibos',
        icons: [{ src: `${baseUrl}/icon-192.png`, sizes: '192x192' }]
      },
      {
        name: 'Propriedades',
        short_name: 'Propriedades',
        description: 'Gerir propriedades e inquilinos',
        url: '/dashboard/properties',
        icons: [{ src: `${baseUrl}/icon-192.png`, sizes: '192x192' }]
      }
    ]
  }
}