import { chromium } from 'playwright'
import { mkdir } from 'fs/promises'

const OUT = '/tmp/blitz-screens'
await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()

async function shot(page, name) {
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true })
  console.log(`✓ ${name}`)
}

// Light mode - landing
const page = await browser.newPage()
await page.setViewportSize({ width: 1440, height: 900 })
await page.goto('http://localhost:5174', { waitUntil: 'networkidle' })
await shot(page, '01-landing-light-1440')

await page.evaluate(() => window.scrollTo(0, 600))
await page.waitForTimeout(500)
await shot(page, '02-landing-howitworks-light')

await page.evaluate(() => window.scrollTo(0, 1400))
await page.waitForTimeout(500)
await shot(page, '03-landing-infographic-light')

await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
await page.waitForTimeout(500)
await shot(page, '04-landing-bottom-light')

// Dark mode
await page.goto('http://localhost:5174', { waitUntil: 'networkidle' })
await page.evaluate(() => {
  document.documentElement.classList.add('dark')
  localStorage.setItem('blitz_theme', 'dark')
})
await page.waitForTimeout(300)
await shot(page, '05-landing-dark-1440')

await page.evaluate(() => window.scrollTo(0, 1400))
await page.waitForTimeout(500)
await shot(page, '06-landing-infographic-dark')

// Mobile
const mobile = await browser.newPage()
await mobile.setViewportSize({ width: 390, height: 844 })
await mobile.goto('http://localhost:5174', { waitUntil: 'networkidle' })
await shot(mobile, '07-landing-mobile-light')

await mobile.evaluate(() => window.scrollTo(0, 1200))
await mobile.waitForTimeout(500)
await shot(mobile, '08-landing-mobile-infographic')

// Onboarding flow
const onb = await browser.newPage()
await onb.setViewportSize({ width: 1440, height: 900 })
await onb.goto('http://localhost:5174/onboarding', { waitUntil: 'networkidle' })
await shot(onb, '09-onboarding-step1')

// Dashboard
const dash = await browser.newPage()
await dash.setViewportSize({ width: 1440, height: 900 })
await dash.goto('http://localhost:5174/dashboard', { waitUntil: 'networkidle' })
await shot(dash, '10-dashboard-home')

await dash.evaluate(() => {
  document.documentElement.classList.add('dark')
})
await dash.waitForTimeout(300)
await shot(dash, '11-dashboard-dark')

// Create delivery
const create = await browser.newPage()
await create.setViewportSize({ width: 1440, height: 900 })
await create.goto('http://localhost:5174/dashboard/create', { waitUntil: 'networkidle' })
await shot(create, '13-create-delivery')

// Tablet
const tablet = await browser.newPage()
await tablet.setViewportSize({ width: 768, height: 1024 })
await tablet.goto('http://localhost:5174', { waitUntil: 'networkidle' })
await shot(tablet, '14-landing-tablet')

await browser.close()
console.log('\nAll screenshots saved to /tmp/blitz-screens/')
