import { Component, lazy, Suspense, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { gsap, ScrollTrigger } from '../lib/scroll'
import { FRESHA_URL, SITE, WHATSAPP_URL, img } from '../data/site'
import { MagneticButton } from './MagneticButton'
import { SplitHeading } from './Reveal'
import { Sparkle } from './Sparkle'
import { heroScroll } from './three/heroState'

const HeroScene = lazy(() => import('./three/HeroScene'))

class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

function StaticFallback() {
  return (
    <div className="absolute inset-0">
      <img src={img('nails-teal', 1600)} alt="" className="h-full w-full object-cover opacity-35" />
    </div>
  )
}

export function Hero({ ready, reduced, mobile }: { ready: boolean; reduced: boolean; mobile: boolean }) {
  const root = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(true)
  const [webgl, setWebgl] = useState(true)

  useEffect(() => {
    const ok = hasWebGL()
    setWebgl(ok)
    if (ok) import('./three/HeroScene') // precarga mientras corre el loader
  }, [])

  // Pausa el render 3D cuando el hero sale de pantalla
  useEffect(() => {
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: '100px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: 'bottom top',
        onUpdate: (s) => (heroScroll.progress = s.progress),
      })
      if (!reduced) {
        gsap.to('.hero-copy', {
          yPercent: -18,
          autoAlpha: 0.2,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
        })
      }
    }, el)
    return () => ctx.revert()
  }, [reduced])

  useLayoutEffect(() => {
    if (!ready || reduced) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-fade', { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1, ease: 'power3.out', stagger: 0.1, delay: 0.55 })
      gsap.fromTo('.hero-canvas', { autoAlpha: 0, scale: 1.06 }, { autoAlpha: 1, scale: 1, duration: 1.8, ease: 'power2.out' })
    }, root)
    return () => ctx.revert()
  }, [ready, reduced])

  return (
    <section
      ref={root}
      id="inicio"
      className="grain relative isolate flex min-h-[100svh] items-end overflow-hidden bg-teal text-sand md:items-center"
      aria-label="Kimona Salon"
    >
      {/* Fondo: degradado + olas seigaiha */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-[radial-gradient(120%_80%_at_75%_40%,#21565e_0%,#18434a_45%,#0f2e33_100%)]" />
      <div aria-hidden className="seigaiha absolute inset-0 -z-10 opacity-[0.05] [mask-image:linear-gradient(to_bottom,transparent,black_40%,black_70%,transparent)]" />

      {/* 3D */}
      <div className="hero-canvas absolute inset-0 -z-10">
        {webgl ? (
          <SceneBoundary fallback={<StaticFallback />}>
            <Suspense fallback={null}>
              {ready || reduced ? <HeroScene reduced={reduced} mobile={mobile} active={inView} /> : null}
            </Suspense>
          </SceneBoundary>
        ) : (
          <StaticFallback />
        )}
      </div>
      {/* Velo para legibilidad del texto */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-[5] bg-gradient-to-t from-ink/90 via-ink/30 to-transparent md:bg-gradient-to-r md:from-ink/70 md:via-ink/10 md:to-transparent" />

      <div className="hero-copy relative mx-auto w-full max-w-7xl px-6 pb-10 pt-32 md:px-10 md:pb-0 md:pt-24">
        <p className="hero-fade eyebrow mb-6 flex items-center gap-3 text-copper-light">
          <Sparkle className="h-3 w-3 text-copper-light" />
          Miraflores · Lima
        </p>
        <SplitHeading
          as="h1"
          immediate
          play={ready}
          delay={0.25}
          text={'Belleza en\ncada *detalle.*'}
          className="display max-w-[11ch] text-[clamp(2.9rem,9vw,8.4rem)] text-sand"
          emClass="italic text-copper-light"
        />
        <p className="hero-fade mt-5 max-w-md text-base leading-relaxed font-light text-sand/85 md:mt-7 md:text-xl">
          Uñas, pestañas, cejas y maquillaje en un espacio pensado para que vivas el <em className="font-normal not-italic text-sand">lujo accesible</em>, con comodidad y confianza.
        </p>
        <div className="hero-fade mt-7 flex flex-wrap gap-3 md:mt-9">
          <MagneticButton href={FRESHA_URL} external variant="sand" ariaLabel="Reservar cita en Fresha (se abre en una pestaña nueva)">
            <span>
              Reservar<span className="hidden sm:inline"> en Fresha</span>
            </span>
            <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </MagneticButton>
          <MagneticButton href={WHATSAPP_URL} external variant="ghost-light" ariaLabel="Escribir por WhatsApp (se abre en una pestaña nueva)">
            <span>
              <span className="hidden sm:inline">Escríbenos por </span>WhatsApp
            </span>
          </MagneticButton>
        </div>
        <a
          href={SITE.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-fade mt-7 inline-flex items-center gap-3 md:mt-10 rounded-full border border-sand/15 bg-ink/30 py-2 pr-5 pl-3 text-sm text-sand/90 backdrop-blur-md transition-colors hover:border-sand/40"
          aria-label={`Calificación ${SITE.rating.toFixed(1)} de 5 con ${SITE.reviewsCount} reseñas en Google`}
        >
          <span className="flex text-copper-light" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Sparkle key={i} className="h-3.5 w-3.5" />
            ))}
          </span>
          <strong className="font-medium text-sand">{SITE.rating.toFixed(1)}</strong>
          <span className="text-sand/70">· {SITE.reviewsCount} reseñas en Google</span>
        </a>
      </div>

      <div aria-hidden className="hero-fade absolute bottom-8 right-8 hidden items-center gap-3 text-xs tracking-[0.3em] text-sand/60 uppercase md:flex">
        <span className="h-px w-12 bg-sand/40" /> Desliza
      </div>
    </section>
  )
}
