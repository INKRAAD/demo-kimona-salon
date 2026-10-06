import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/scroll'
import { K_LETTER_PATH, K_LETTER_TRANSFORM, K_SPARK_PATH, K_VIEWBOX } from './logoPaths'

/**
 * Loader de marca: el monograma K se dibuja con un trazo de seda, aparece el destello cobre
 * y la cortina se abre en diagonal, como el cruce del cuello de un kimono.
 */
export function Loader({ reduced, onDone }: { reduced: boolean; onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.to(el, { autoAlpha: 0, duration: 0.4, delay: 0.3, onComplete: onDone })
        return
      }
      const tl = gsap.timeline({ onComplete: onDone })
      tl.set('.ld-letter', { strokeDasharray: 1, strokeDashoffset: 1, fillOpacity: 0 })
        .set('.ld-spark', { scale: 0, rotate: -90, transformOrigin: '50% 50%' })
        .to('.ld-letter', { strokeDashoffset: 0, duration: 1.25, ease: 'power2.inOut' })
        .to('.ld-letter', { fillOpacity: 1, duration: 0.6, ease: 'power1.out' }, '-=0.45')
        .to('.ld-spark', { scale: 1, rotate: 0, duration: 0.7, ease: 'back.out(2.2)' }, '-=0.4')
        .fromTo('.ld-word', { yPercent: 120 }, { yPercent: 0, duration: 0.7, ease: 'expo.out', stagger: 0.05 }, '-=0.5')
        .to('.ld-mark', { scale: 1.08, autoAlpha: 0, duration: 0.6, ease: 'power2.in' }, '+=0.25')
        .to('.ld-left', { xPercent: -105, duration: 1.05, ease: 'expo.inOut' }, '-=0.35')
        .to('.ld-right', { xPercent: 105, duration: 1.05, ease: 'expo.inOut' }, '<')
        .set(el, { display: 'none' })
    }, el)
    return () => ctx.revert()
  }, [reduced, onDone])

  return (
    <div ref={root} className="fixed inset-0 z-[80]" role="status" aria-live="polite" aria-label="Cargando Kimona Salon">
      {/* Cortinas con borde diagonal (cuello de kimono) */}
      <div className="ld-left absolute inset-y-0 left-0 w-[62%] bg-teal" style={{ clipPath: 'polygon(0 0, 100% 0, 62% 100%, 0 100%)' }} />
      <div className="ld-right absolute inset-y-0 right-0 w-[62%] bg-teal-deep" style={{ clipPath: 'polygon(38% 0, 100% 0, 100% 100%, 0 100%)' }} />
      <div className="ld-mark absolute inset-0 flex flex-col items-center justify-center gap-6">
        <svg viewBox={K_VIEWBOX} className="h-32 w-auto md:h-40" aria-hidden="true">
          <g transform={K_LETTER_TRANSFORM}>
            <path className="ld-letter fill-sand stroke-sand" strokeWidth={70} pathLength={1} d={K_LETTER_PATH} />
          </g>
          <path className="ld-spark fill-copper" d={K_SPARK_PATH} />
        </svg>
        <p className="flex gap-[0.6em] overflow-hidden font-display text-lg tracking-[0.5em] text-sand uppercase">
          <span className="ld-word inline-block">Kimona</span>
          <span className="ld-word inline-block">Salon</span>
        </p>
      </div>
    </div>
  )
}
