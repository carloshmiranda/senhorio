import { NextResponse } from 'next/server'

const INDEXNOW_KEY = 'a201756ab568d802e1081d2b2c75410c'

// Submit all sitemap URLs to IndexNow
export async function POST() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://senhorio.vercel.app'
    const host = new URL(baseUrl).hostname

    // Get sitemap and extract URLs
    const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`)

    if (!sitemapResponse.ok) {
      return NextResponse.json(
        { ok: false, error: 'Failed to fetch sitemap' },
        { status: 500 }
      )
    }

    const sitemapXml = await sitemapResponse.text()
    const urlMatches = sitemapXml.match(/<loc>(.*?)<\/loc>/g)
    const urls = urlMatches?.map(match => match.replace(/<\/?loc>/g, '')) || []

    if (urls.length === 0) {
      return NextResponse.json(
        { ok: false, error: 'No URLs found in sitemap' },
        { status: 400 }
      )
    }

    // Submit to IndexNow endpoints
    const endpoints = [
      'https://api.indexnow.org/indexnow',
      'https://www.bing.com/indexnow',
    ]

    const payload = {
      host,
      key: INDEXNOW_KEY,
      urlList: urls,
    }

    const submissions = endpoints.map(async endpoint => {
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
          response: response.ok ? 'Success' : await response.text(),
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
    const successCount = results.filter(r => r.ok).length

    return NextResponse.json({
      ok: true,
      data: {
        urlsSubmitted: urls.length,
        successfulSubmissions: successCount,
        totalEndpoints: endpoints.length,
        results,
        urls,
      },
    })
  } catch (error) {
    console.error('IndexNow sitemap submission error:', error)
    return NextResponse.json(
      { ok: false, error: 'Failed to submit sitemap URLs' },
      { status: 500 }
    )
  }
}