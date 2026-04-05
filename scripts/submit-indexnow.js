#!/usr/bin/env node

/**
 * Submit all content URLs to IndexNow for instant search engine indexing
 * Can be run as: node scripts/submit-indexnow.js
 */

const INDEXNOW_KEY = 'a201756ab568d802e1081d2b2c75410c'

// IndexNow endpoints for major search engines
const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
]

// All content URLs to submit (14 blog URLs + 4 tool pages = 18 total)
const CONTENT_URLS = [
  // Blog URLs (14)
  '/blog/como-calcular-atualizacoes-renda-2026',
  '/blog/declaracao-irs-arrendamento-2026-guia-completo',
  '/blog/imposto-10-porcento-rendas-portugal-2026',
  '/blog/inquilino-nao-paga-renda-o-que-fazer',
  '/blog/irs-arrendamento-2026-nova-taxa-10-porcento',
  '/blog/despesas-dedutiveis-arrendamento-2026',
  '/blog/irs-2026-guia-completo-simulador',
  '/blog/irs-senhorios-2026-guia-definitivo',
  '/blog/isencao-aimi-2026-qualificar-nova-isencao',
  '/blog/registo-contrato-arrendamento-at-2026',
  '/blog/recibos-renda-eletronicos-guia-2026',
  '/blog/portugal-landlord-tax-calculator-2026',
  '/blog/portugal-expat-landlord-compliance-guide-2026',
  '/blog/mapa-rendas-modelo-2-arrendamento-2026',
  // Tool pages (4)
  '/calculadora-rendas',
  '/calculadora',
  '/simulador-irs',
  '/recibos',
]

async function submitToIndexNow() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://senhorio.vercel.app'
    const host = new URL(baseUrl).hostname
    const fullUrls = CONTENT_URLS.map(path => `${baseUrl}${path}`)

    const payload = {
      host,
      key: INDEXNOW_KEY,
      urlList: fullUrls,
    }

    console.log(`🚀 Submitting ${fullUrls.length} URLs to IndexNow...`)
    console.log(`Host: ${host}`)

    // Submit to all IndexNow endpoints
    const submissions = INDEXNOW_ENDPOINTS.map(async (endpoint, index) => {
      try {
        console.log(`📡 Submitting to endpoint ${index + 1}/${INDEXNOW_ENDPOINTS.length}: ${endpoint}`)

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(payload),
        })

        const result = {
          endpoint,
          status: response.status,
          ok: response.ok,
        }

        if (response.ok) {
          console.log(`✅ Success: ${endpoint} (${response.status})`)
        } else {
          const errorText = await response.text()
          console.log(`❌ Failed: ${endpoint} (${response.status}) - ${errorText}`)
          result.error = errorText
        }

        return result
      } catch (error) {
        const result = {
          endpoint,
          status: 0,
          ok: false,
          error: error.message,
        }
        console.log(`❌ Error: ${endpoint} - ${error.message}`)
        return result
      }
    })

    const results = await Promise.all(submissions)
    const successCount = results.filter(r => r.ok).length

    console.log('\n📊 Summary:')
    console.log(`URLs submitted: ${fullUrls.length}`)
    console.log(`Successful submissions: ${successCount}/${INDEXNOW_ENDPOINTS.length}`)
    console.log(`URLs per submission: ${CONTENT_URLS.length}`)

    if (successCount > 0) {
      console.log('\n✅ IndexNow submission completed successfully!')
    } else {
      console.log('\n❌ All IndexNow submissions failed!')
      process.exit(1)
    }

    return results
  } catch (error) {
    console.error('❌ IndexNow submission failed:', error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  submitToIndexNow()
}

module.exports = { submitToIndexNow }