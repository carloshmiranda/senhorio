import { NextRequest, NextResponse } from 'next/server'

const INDEXNOW_KEY = 'a201756ab568d802e1081d2b2c75410c'

// IndexNow endpoints for major search engines
const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
]

interface IndexNowPayload {
  host: string
  key: string
  urlList: string[]
}

// All content URLs to submit to IndexNow
const CONTENT_URLS = [
  // Blog URLs
  '/blog/irs-senhorios-2026',
  '/blog/simulador-irs-arrendamento',
  '/blog/taxa-10-rendas-moderadas',
  '/blog/recibo-renda-eletronico',
  '/blog/aimi-2026',
  '/blog/englobamento-rendas',
  '/blog/contrato-arrendamento-tipo',
  '/blog/atualizar-rendas-2026',
  '/blog/inquilino-nao-paga-renda-o-que-fazer',
  '/blog/software-gestao-arrendamento-portugal-2026',
  '/blog/mapa-rendas-modelo-2-arrendamento-2026',
  // Tool pages
  '/calculadora',
  '/simulador-irs',
  '/recibos',
  '/aimi',
]

export async function GET() {
  // Auto-submit all content URLs
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://senhorio.vercel.app'
  const fullUrls = CONTENT_URLS.map(path => `${baseUrl}${path}`)

  return submitUrls(fullUrls)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { urls } = body

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: 'URLs array is required' },
        { status: 400 }
      )
    }

    return submitUrls(urls)
  } catch (error) {
    console.error('IndexNow submission error:', error)
    return NextResponse.json(
      { ok: false, error: 'Failed to submit URLs' },
      { status: 500 }
    )
  }
}

async function submitUrls(urls: string[]) {
  try {

  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://senhorio.vercel.app'
  const host = new URL(baseUrl).hostname

  const payload: IndexNowPayload = {
    host,
    key: INDEXNOW_KEY,
    urlList: urls,
  }

  // Submit to all IndexNow endpoints
  const submissions = INDEXNOW_ENDPOINTS.map(async endpoint => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(payload),
      })

      return {
        endpoint,
        status: response.status,
        ok: response.ok,
      }
    } catch (error) {
      return {
        endpoint,
        status: 0,
        ok: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  })

  const results = await Promise.all(submissions)

  return NextResponse.json({
    ok: true,
    data: {
      submitted: urls.length,
      results,
      urls,
    },
  })
  } catch (error) {
    console.error('IndexNow submission error:', error)
    return NextResponse.json(
      { ok: false, error: 'Failed to submit URLs' },
      { status: 500 }
    )
  }
}

