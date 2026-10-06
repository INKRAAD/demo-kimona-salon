import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/scroll'
import { useReducedMotion } from '../hooks/useMedia'
import { REVIEWS, SITE } from '../data/site'
import { MagneticButton } from './MagneticButton'
import { Sparkle } from './Sparkle'

export function Reviews() {
  const root = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      const counter = { v: reduced ? SITE.reviewsCount : 0 }
      const el = root.current!.querySelector('.rv-count')
      if (!reduced) {
        gsap.to(counter, {
          v: SITE.reviewsCount,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.rv-score', start: 'top 80%', once: true },
          onUpdate: () => el && (el.textContent = String(Math.round(counter.v))),
        })
        gsap.fromTo('.rv-star', { scale: 0, rotate: -120 }, { scale: 1, rotate: 0, duration: 0.8, ease: 'back.out(2.5)', stagger: 0.08, scrollTrigger: { trigger: '.rv-score', start: 'top 80%', once: true } })
        gsap.fromTo(
          '.rv-card',
          { y: 80, rotate: (i) => [-3, 2, -1.5][i] * 2, autoAlpha: 0 },
          { y: 0, rotate: (i) => [-1.2, 0.8, -0.6][i], autoAlpha: 1, duration: 1.2, ease: 'expo.out', stagger: 0.12, scrollTrigger: { trigger: '.rv-grid', start: 'top 80%', once: true } },
        )
      }
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={root} id="resenas" className="grain relative overflow-hidden bg-washi py-28 text-teal md:py-40" aria-labelledby="rv-title">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="rv-score flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-6 flex items-center gap-3 text-copper-deep">
              <Sparkle className="h-3 w-3" /> Lo que dicen nuestras clientas
            </p>
            <h2 id="rv-title" className="display text-[clamp(2.6rem,6vw,5.4rem)]">
              Perfección, <span className="text-copper-deep italic">reseña a reseña</span>
            </h2>
          </div>
          <div className="flex items-center gap-6" aria-label={`${SITE.rating.toFixed(1)} de 5 estrellas en Google, ${SITE.reviewsCount} reseñas`}>
            <p className="display text-[6.5rem] leading-none md:text-[8rem]" aria-hidden>
              {SITE.rating.toFixed(1)}
            </p>
            <div aria-hidden>
              <div className="flex gap-1 text-copper">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Sparkle key={i} className="rv-star h-6 w-6" />
                ))}
              </div>
              <p className="mt-3 text-teal-soft">
                <span className="rv-count font-medium text-teal">{SITE.reviewsCount}</span> reseñas en Google
              </p>
            </div>
          </div>
        </div>

        <div className="rv-grid mt-20 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <figure key={i} className="rv-card sheen relative flex flex-col justify-between rounded-[28px] border border-teal/10 bg-white/60 p-8 shadow-[0_30px_60px_-30px_rgba(15,46,51,0.25)] backdrop-blur md:p-10">
              <div>
              <span className="font-display -mb-3 block h-12 text-7xl leading-none text-copper/40" aria-hidden>
                “
              </span>
              <blockquote>
                <p className="display text-[1.55rem] leading-snug italic">{r.es}</p>
                <p className="mt-5 text-sm leading-relaxed text-teal-soft" lang="en">
                  Original: “{r.original}”
                </p>
              </blockquote>
              </div>
              <figcaption className="mt-8 flex items-center justify-between border-t border-teal/10 pt-5 text-sm text-teal-soft">
                <span>Reseña de Google · {r.date}</span>
                <span className="flex text-copper" aria-label="5 estrellas">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Sparkle key={j} className="h-3 w-3" />
                  ))}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-teal-soft">Citas reales de reseñas públicas de Google (autor no disponible en la fuente). Traducción al español propia.</p>
          <MagneticButton href={SITE.mapsUrl} external variant="ghost-dark" ariaLabel="Ver todas las reseñas en Google Maps (se abre en una pestaña nueva)">
            Ver reseñas en Google
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
