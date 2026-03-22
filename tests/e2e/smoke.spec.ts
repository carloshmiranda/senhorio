import { test, expect } from '@playwright/test'

test.describe('Smoke Tests', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/')

    // Check page loads
    await expect(page).toHaveTitle(/Senhorio/)

    // Check critical elements are present
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('main')).toBeVisible()

    // Check no critical JS errors
    const errors: string[] = []
    page.on('pageerror', (error) => {
      errors.push(error.message)
    })

    await page.waitForLoadState('networkidle')
    expect(errors.length).toBe(0)
  })

  test('calculadora page loads', async ({ page }) => {
    await page.goto('/calculadora')

    await expect(page).toHaveTitle(/Calculadora/)
    await expect(page.locator('main')).toBeVisible()

    // Check calculator form is present
    await expect(page.locator('form, [role="form"]')).toBeVisible()
  })

  test('AIMI page loads', async ({ page }) => {
    await page.goto('/aimi')

    await expect(page).toHaveTitle(/AIMI/)
    await expect(page.locator('main')).toBeVisible()
  })

  test('blog page loads', async ({ page }) => {
    await page.goto('/blog')

    await expect(page).toHaveTitle(/Blog/)
    await expect(page.locator('main')).toBeVisible()
  })

  test('health endpoint returns 200', async ({ request }) => {
    const response = await request.get('/api/health')
    expect(response.status()).toBe(200)

    const data = await response.json()
    expect(data.ok).toBe(true)
    expect(data.data.status).toBe('healthy')
  })

  test('stats endpoint returns 200', async ({ request }) => {
    const response = await request.get('/api/stats')
    expect(response.status()).toBe(200)

    const data = await response.json()
    expect(data.ok).toBe(true)
    expect(data.data).toHaveProperty('waitlist')
    expect(data.data).toHaveProperty('pricing')
    expect(data.data).toHaveProperty('email')
    expect(data.data).toHaveProperty('customers')
  })

  test('pricing intent endpoint accepts POST', async ({ request }) => {
    const response = await request.post('/api/pricing-intent', {
      data: {
        tier: 'pro',
        source_path: '/pricing'
      }
    })

    expect(response.status()).toBe(200)

    const data = await response.json()
    expect(data.ok).toBe(true)
  })

  test('waitlist API endpoint exists', async ({ request }) => {
    // Test that the endpoint exists (should return 400 for missing data)
    const response = await request.post('/api/waitlist')
    expect(response.status()).toBe(400) // Missing required fields
  })

  test('navigation works correctly', async ({ page }) => {
    await page.goto('/')

    // Check main navigation links work
    const navLinks = [
      { text: 'Calculadora', href: '/calculadora' },
      { text: 'AIMI', href: '/aimi' },
      { text: 'Blog', href: '/blog' }
    ]

    for (const link of navLinks) {
      const linkElement = page.locator(`a[href="${link.href}"]`).first()
      if (await linkElement.isVisible()) {
        await linkElement.click()
        await page.waitForURL(`**${link.href}`)
        await expect(page.locator('main')).toBeVisible()
        await page.goBack()
      }
    }
  })

  test('mobile responsiveness', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Check page is still functional on mobile
    await expect(page.locator('main')).toBeVisible()

    // Check no horizontal scroll
    const bodyWidth = await page.locator('body').evaluate((el) => el.scrollWidth)
    const viewportWidth = page.viewportSize()?.width || 375
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1) // Allow 1px tolerance
  })
})