// Capturas headless (Playwright + Chrome del sistema). Uso: node scripts/screenshots.mjs [url]
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const URL = process.argv[2] || 'http://localhost:4317/'
const OUT = new globalThis.URL('../screenshots/', import.meta.url).pathname
mkdirSync(OUT, { recursive: true })
const exe = process.env.CHROME_PATH || '/usr/bin/google-chrome'

const browser = await chromium.launch({
  executablePath: exe,
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--enable-webgl'],
})

const sections = ['filosofia', 'servicios', 'experiencia', 'galeria', 'resenas', 'nosotras', 'visitanos']
const configs = [
  { name: 'desktop', viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  { name: 'mobile', viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
]
const problems = []

for (const cfg of configs) {
  const ctx = await browser.newContext({ ...cfg, reducedMotion: process.env.REDUCED ? 'reduce' : 'no-preference' })
  const page = await ctx.newPage()
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') problems.push(`[${cfg.name}] console.${m.type()}: ${m.text()}`)
  })
  page.on('pageerror', (e) => problems.push(`[${cfg.name}] pageerror: ${e.message}`))
  page.on('requestfailed', (r) => problems.push(`[${cfg.name}] requestfailed: ${r.url()} ${r.failure()?.errorText}`))
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(5200) // loader + entrada del hero
  const suffix = process.env.REDUCED ? '-reduced' : ''
  await page.screenshot({ path: `${OUT}${cfg.name}${suffix}-hero.png` })

  // Recorre la página para disparar las animaciones de scroll
  const total = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < total; y += 500) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y)
    await page.waitForTimeout(120)
  }
  for (const id of sections) {
    await page.evaluate((i) => {
      const el = document.getElementById(i)
      if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY)
    }, id)
    await page.waitForTimeout(1600)
    await page.screenshot({ path: `${OUT}${cfg.name}${suffix}-${id}.png` })
  }
  if (!process.env.SKIP_FULL) {
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(800)
    await page.screenshot({ path: `${OUT}${cfg.name}${suffix}-full.png`, fullPage: true })
  }
  await ctx.close()
}
await browser.close()
console.log(problems.length ? problems.join('\n') : 'Sin errores ni warnings en consola.')
