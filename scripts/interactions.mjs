// Pruebas de interacción + capturas extra (loader, tabs, mapa, menú móvil, reduced-motion)
import { chromium } from 'playwright'
const URL = process.argv[2] || 'http://localhost:4317/'
const OUT = new globalThis.URL('../screenshots/', import.meta.url).pathname
const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] })
const problems = []
const watch = (page, tag) => {
  page.on('console', (m) => ['error', 'warning'].includes(m.type()) && problems.push(`[${tag}] ${m.type()}: ${m.text()}`))
  page.on('pageerror', (e) => problems.push(`[${tag}] pageerror: ${e.message}`))
}
// Desktop
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  watch(page, 'desktop')
  await page.goto(URL)
  await page.waitForTimeout(900)
  await page.screenshot({ path: `${OUT}desktop-loader.png` })
  await page.waitForTimeout(4500)
  await page.evaluate(() => document.getElementById('servicios').scrollIntoView())
  await page.waitForTimeout(1200)
  await page.getByRole('tab', { name: 'Pestañas y cejas' }).click()
  await page.waitForTimeout(1400)
  await page.screenshot({ path: `${OUT}desktop-servicios-pestanas.png` })
  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(1200)
  const sel = await page.evaluate(() => document.querySelector('[role=tab][aria-selected=true]')?.textContent)
  console.log('Tab tras ArrowRight:', sel)
  await page.evaluate(() => document.getElementById('visitanos').scrollIntoView())
  await page.waitForTimeout(1200)
  await page.getByRole('button', { name: 'Cargar mapa interactivo de Google Maps' }).click()
  await page.waitForTimeout(4000)
  await page.screenshot({ path: `${OUT}desktop-mapa.png` })
  await page.close()
}
// Mobile menu
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
  const page = await ctx.newPage()
  watch(page, 'mobile')
  await page.goto(URL)
  await page.waitForTimeout(5000)
  await page.getByRole('button', { name: 'Abrir menú' }).click()
  await page.waitForTimeout(1200)
  await page.screenshot({ path: `${OUT}mobile-menu.png` })
  await ctx.close()
}
// Reduced motion
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
  const page = await ctx.newPage()
  watch(page, 'reduced')
  await page.goto(URL)
  await page.waitForTimeout(2500)
  await page.screenshot({ path: `${OUT}desktop-reduced-hero.png` })
  await page.evaluate(() => document.getElementById('experiencia').scrollIntoView())
  await page.waitForTimeout(800)
  await page.screenshot({ path: `${OUT}desktop-reduced-experiencia.png` })
  await ctx.close()
}
await browser.close()
console.log(problems.length ? problems.join('\n') : 'Sin errores ni warnings en consola.')
