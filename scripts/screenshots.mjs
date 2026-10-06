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
    // Página completa «cosida» a partir de capturas de viewport (fullPage nativo rompe los pins de ScrollTrigger y las unidades svh)
    const vh = cfg.viewport.height
    const frames = []
    const h = await page.evaluate(() => document.documentElement.scrollHeight)
    for (let y = 0, i = 0; y < h; y += vh, i++) {
      const yy = Math.min(y, h - vh)
      if (i === 1) await page.addStyleTag({ content: 'header{visibility:hidden!important}' })
      await page.evaluate((v) => window.scrollTo(0, v), yy)
      await page.waitForTimeout(900)
      const f = `/tmp/kimona-frame-${cfg.name}-${i}.png`
      await page.screenshot({ path: f })
      frames.push([f, yy])
    }
    const { execFileSync } = await import('node:child_process')
    const py = `
import sys, json
from PIL import Image
frames=json.loads(sys.argv[1]); out=sys.argv[2]; total=int(sys.argv[3]); scale=float(sys.argv[4])
first=Image.open(frames[0][0]); W=first.width
canvas=Image.new('RGB',(W,int(total*scale)),'white')
for f,y in frames:
    canvas.paste(Image.open(f).convert('RGB'),(0,int(y*scale)))
if W>900: pass
else: canvas=canvas.resize((W//2,canvas.height//2))
canvas.save(out,quality=80,optimize=True,progressive=True)
`
    execFileSync('python3', ['-c', py, JSON.stringify(frames), `${OUT}${cfg.name}${suffix}-full.jpg`, String(h), String(cfg.deviceScaleFactor || 1)])
  }
  await ctx.close()
}
await browser.close()
console.log(problems.length ? problems.join('\n') : 'Sin errores ni warnings en consola.')
