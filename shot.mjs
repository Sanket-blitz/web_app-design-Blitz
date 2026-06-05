import { chromium } from 'playwright'

const URL = process.argv[2] || 'http://localhost:5174/'
const out = '/tmp/blitz-shots'
import { mkdirSync } from 'fs'
mkdirSync(out, { recursive: true })

const browser = await chromium.launch()

async function shoot(theme, width, height) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    colorScheme: theme === 'dark' ? 'dark' : 'light',
    deviceScaleFactor: 1,
  })
  const page = await ctx.newPage()
  // force theme via localStorage before load
  await page.addInitScript((t) => { localStorage.setItem('blitz_theme', t) }, theme)
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)

  // full page
  await page.screenshot({ path: `${out}/full-${theme}-${width}.png`, fullPage: true })

  // how-it-works section
  const section = await page.$('#how-it-works')
  if (section) {
    await section.scrollIntoViewIfNeeded()
    await page.waitForTimeout(3000) // let delivery animation run
    await section.screenshot({ path: `${out}/how-${theme}-${width}.png` })
  }
  await ctx.close()
}

for (const w of [1440, 1024, 768, 390]) {
  await shoot('light', w, 900)
  await shoot('dark', w, 900)
}

await browser.close()
console.log('done')
