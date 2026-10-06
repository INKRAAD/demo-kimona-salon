import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/scroll'
import { useReducedMotion } from '../hooks/useMedia'
import { SITE, img, srcSet } from '../data/site'
import { FadeIn } from './Reveal'
import { Sparkle } from './Sparkle'

const TEXT =
  'Kimona no es solo un salón de belleza. Es un espacio donde cada detalle está pensado para ti: donde cada pincelada, cada trazo y cada detalle aporta poder y belleza.'

const PILLARS = [
  {
    n: '01',
    title: 'Lujo accesible',
    body: 'Acabados de salón premium con precios claros y publicados: desde S/15 en depilación al hilo y S/55 en manicure en gel.',
  },
  {
    n: '02',
    title: 'Comodidad',
    body: 'Reserva online cuando quieras en Fresha y llega directo a tu cita, en Diez Canseco, a pasos del Parque Kennedy.',
  },
  {
    n: '03',
    title: 'Confianza',
    body: `Higiene impecable y un equipo profesional. ${SITE.rating.toFixed(1)} estrellas en ${SITE.reviewsCount} reseñas de Google lo respaldan.`,
  },
]

export function Manifesto() {
  const root = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    if (reduced || !root.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.mf-word',
        { opacity: 0.16 },
        { opacity: 1, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: '.mf-text', start: 'top 80%', end: 'bottom 45%', scrub: true } },
      )
      gsap.fromTo(
        '.mf-img',
        { clipPath: 'polygon(50% 18%, 100% 0, 100% 100%, 0 100%, 0 0)', scale: 1.15 },
        {
          clipPath: 'polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0 0)',
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.mf-media', start: 'top 85%', end: 'bottom 40%', scrub: true },
        },
      )
      gsap.to('.mf-inner', { yPercent: -12, ease: 'none', scrollTrigger: { trigger: '.mf-media', start: 'top bottom', end: 'bottom top', scrub: true } })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={root} id="filosofia" className="grain relative overflow-hidden bg-washi py-28 md:py-40" aria-labelledby="mf-title">
      <div className="seigaiha-dark pointer-events-none absolute -right-20 top-0 h-[60%] w-[45%] opacity-[0.06]" aria-hidden />
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-12 md:gap-10 md:px-10">
        <div className="md:col-span-7">
          <p className="eyebrow mb-8 flex items-center gap-3 text-copper-deep">
            <Sparkle className="h-3 w-3" /> Nuestra filosofía
          </p>
          <h2 id="mf-title" className="sr-only">
            Nuestra filosofía
          </h2>
          <p className="mf-text display text-[clamp(1.9rem,3.6vw,3.3rem)] leading-[1.15] text-teal">
            {TEXT.split(' ').map((w, i) => (
              <span key={i} className="mf-word">
                {w}{' '}
              </span>
            ))}
          </p>
          <p className="mt-6 text-sm text-teal-soft">Inspirado en la descripción oficial de Kimona en Fresha.</p>

          <div className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-6">
            {PILLARS.map((p, i) => (
              <FadeIn key={p.n} delay={i * 0.1} className="border-t border-teal/20 pt-6">
                <span className="font-display text-sm text-copper-deep italic">{p.n}</span>
                <h3 className="display mt-3 text-2xl text-teal">{p.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-teal-soft">{p.body}</p>
              </FadeIn>
            ))}
          </div>
        </div>

        <div className="mf-media relative md:col-span-5">
          <div className="mf-img relative aspect-[3/4] overflow-hidden rounded-[2px] md:sticky md:top-28">
            <img
              className="mf-inner absolute inset-0 h-[118%] w-full object-cover"
              src={img('lashes-silk', 800)}
              srcSet={srcSet('lashes-silk')}
              sizes="(min-width: 768px) 40vw, 100vw"
              alt="Mujer con los ojos cerrados, pestañas definidas y pañuelo de seda cobre (imagen referencial)"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-6">
              <p className="display text-2xl text-sand italic">Poder y belleza.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
