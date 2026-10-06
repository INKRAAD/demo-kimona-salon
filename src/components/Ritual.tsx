import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/scroll'
import { useIsMobile, useReducedMotion } from '../hooks/useMedia'
import { SITE, img, srcSet } from '../data/site'
import { SplitHeading } from './Reveal'
import { Sparkle } from './Sparkle'

const STEPS = [
  {
    k: '01',
    title: 'Reserva en un minuto',
    body: 'Elige servicio, día y hora en Fresha. Nuestras clientas lo dicen: reservar online es facilísimo.',
    image: 'nails-nude',
    alt: 'Manos con manicure nude y brillo (imagen referencial)',
  },
  {
    k: '02',
    title: 'Llega a tu refugio',
    body: `${SITE.address}, ${SITE.district}. Un rincón sereno en plena zona del Parque Kennedy.`,
    image: 'silk-cream',
    alt: 'Tela de seda color crema con pliegues suaves (imagen referencial)',
  },
  {
    k: '03',
    title: 'Cada detalle, a mano',
    body: 'Higiene, técnica y paciencia. «Muy limpio, profesional y el resultado se ve perfecto», cuenta una clienta.',
    image: 'nail-art',
    alt: 'Especialista aplicando esmalte en gel con pincel fino (imagen referencial)',
  },
  {
    k: '04',
    title: 'Sal brillando',
    body: 'Acabados que duran: «mis uñas tienen 11 días y siguen como nuevas», según una reseña en Google.',
    image: 'hands-rings',
    alt: 'Manos elegantes con manicure almendrada y anillos (imagen referencial)',
  },
]

export function Ritual() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const mobile = useIsMobile()
  const horizontal = !reduced && !mobile

  useLayoutEffect(() => {
    if (!horizontal || !root.current || !track.current) return
    const ctx = gsap.context(() => {
      const t = track.current!
      const dist = () => t.scrollWidth - window.innerWidth
      const tween = gsap.to(t, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${dist()}`,
          scrub: 0.8,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
      gsap.utils.toArray<HTMLElement>('.rt-img').forEach((el) => {
        gsap.fromTo(el, { xPercent: -10 }, { xPercent: 10, ease: 'none', scrollTrigger: { trigger: el, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } })
      })
      gsap.to('.rt-progress', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: () => `+=${dist()}`, scrub: true } })
    }, root)
    return () => ctx.revert()
  }, [horizontal])

  return (
    <section ref={root} id="experiencia" className="grain relative overflow-hidden bg-sand text-teal" aria-labelledby="rt-title">
      <div className={horizontal ? 'flex h-[100svh] items-center' : 'py-24'}>
        <div ref={track} className={horizontal ? 'flex h-full items-center gap-10 pr-[10vw] pl-10' : 'mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2 md:gap-x-12 md:px-10'}>
          {/* Intro */}
          <div className={horizontal ? 'w-[38vw] shrink-0' : 'md:col-span-2'}>
            <p className="eyebrow mb-6 flex items-center gap-3 text-copper-deep">
              <Sparkle className="h-3 w-3" /> La experiencia Kimona
            </p>
            <SplitHeading text={'Un ritual\nen cuatro *tiempos*'} className="display text-[clamp(2.6rem,5.6vw,5.2rem)]" emClass="italic text-copper-deep" />
            <h2 id="rt-title" className="sr-only">
              La experiencia Kimona en cuatro pasos
            </h2>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-teal-soft">De la reserva a la última capa de top coat, todo fluye con la calma de una ceremonia.</p>
          </div>

          {STEPS.map((s) => (
            <article key={s.k} className={horizontal ? 'group relative flex h-[72vh] w-[min(64vw,880px)] shrink-0 gap-8' : 'flex flex-col gap-6'}>
              <div className={`relative overflow-hidden rounded-[2px] ${horizontal ? 'h-full w-[55%]' : 'aspect-[4/5] w-full'}`}>
                <img
                  className="rt-img absolute inset-0 h-full w-[120%] max-w-none -translate-x-[8%] object-cover transition-transform duration-[1.4s] ease-[var(--ease-silk)] group-hover:scale-[1.04]"
                  src={img(s.image, 800)}
                  srcSet={srcSet(s.image)}
                  sizes="(min-width: 768px) 60vw, 160vw"
                  alt={s.alt}
                  loading="lazy"
                />
              </div>
              <div className={`flex flex-col ${horizontal ? 'w-[45%] justify-end pb-6' : ''}`}>
                <span className="font-display text-7xl leading-none text-copper italic md:text-8xl" aria-hidden>
                  {s.k}
                </span>
                <p className="eyebrow mt-6 text-copper-deep">Tiempo {Number(s.k)}</p>
                <h3 className="display mt-3 text-3xl md:text-4xl">{s.title}</h3>
                <p className="mt-4 max-w-sm leading-relaxed text-teal-soft">{s.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      {horizontal && (
        <div className="absolute inset-x-10 bottom-8 h-px bg-teal/15" aria-hidden>
          <div className="rt-progress h-full origin-left scale-x-0 bg-teal" />
        </div>
      )}
    </section>
  )
}
