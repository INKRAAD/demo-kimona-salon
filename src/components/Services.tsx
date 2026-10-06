import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState, type KeyboardEvent } from 'react'
import { CATEGORIES, COMBO, FRESHA_URL, img, srcSet } from '../data/site'
import { useReducedMotion } from '../hooks/useMedia'
import { MagneticButton } from './MagneticButton'
import { FadeIn, SplitHeading } from './Reveal'
import { Sparkle } from './Sparkle'

const price = (n: number) => `S/ ${n}`

export function Services() {
  const [active, setActive] = useState(0)
  const reduced = useReducedMotion()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const cat = CATEGORIES[active]

  const onKey = (e: KeyboardEvent) => {
    const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const next = (active + dir + CATEGORIES.length) % CATEGORIES.length
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="servicios" className="grain relative overflow-hidden bg-teal py-28 text-sand md:py-36" aria-labelledby="sv-title">
      <div className="seigaiha pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-[0.04]" aria-hidden />
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-6 flex items-center gap-3 text-copper-light">
              <Sparkle className="h-3 w-3" /> Menú de servicios
            </p>
            <SplitHeading text={'Rituales para\nmanos y *mirada*'} className="display text-[clamp(2.6rem,6vw,5.4rem)]" emClass="italic text-copper-light" />
          </div>
          <FadeIn className="max-w-sm text-sand/75">
            <p id="sv-title-desc">Precios reales publicados en Fresha. Elige tu servicio y reserva en segundos: cada línea te lleva directo a la agenda.</p>
          </FadeIn>
        </div>
        <h2 id="sv-title" className="sr-only">
          Servicios y precios
        </h2>

        {/* Tabs */}
        <div role="tablist" aria-label="Categorías de servicios" className="mt-14 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]" onKeyDown={onKey}>
          {CATEGORIES.map((c, i) => (
            <button
              key={c.id}
              ref={(el) => {
                tabs.current[i] = el
              }}
              role="tab"
              id={`tab-${c.id}`}
              aria-selected={i === active}
              aria-controls={`panel-${c.id}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm tracking-wide transition-colors duration-500 ${
                i === active ? 'text-teal' : 'text-sand/75 hover:text-sand'
              }`}
            >
              {i === active && (
                <motion.span layoutId="tab-pill" className="absolute inset-0 -z-0 rounded-full bg-sand" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
              )}
              <span className="relative z-10">{c.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-14">
          {/* Imagen de la categoría */}
          <div className="relative md:col-span-5">
            <div className="sheen relative aspect-[4/5] overflow-hidden rounded-[2px] bg-teal-deep md:sticky md:top-28">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={cat.image}
                  src={img(cat.image, 800)}
                  srcSet={srcSet(cat.image)}
                  sizes="(min-width: 768px) 40vw, 100vw"
                  alt={cat.imageAlt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={reduced ? { opacity: 0 } : { clipPath: 'inset(100% 0 0 0)', scale: 1.15 }}
                  animate={reduced ? { opacity: 1 } : { clipPath: 'inset(0% 0 0 0)', scale: 1 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0.4 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                />
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-ink/80 to-transparent p-6">
                <p className="eyebrow text-copper-light">{cat.kicker}</p>
                <p className="display mt-2 text-3xl">{cat.label}</p>
              </div>
            </div>
          </div>

          {/* Lista de precios */}
          <div className="md:col-span-7">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={cat.id}
                role="tabpanel"
                id={`panel-${cat.id}`}
                aria-labelledby={`tab-${cat.id}`}
                initial={{ opacity: 0, y: reduced ? 0 : 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -16 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="max-w-xl text-lg leading-relaxed font-light text-sand/80">{cat.intro}</p>
                <ul className="mt-8 border-t border-sand/15">
                  {cat.services.map((s) => (
                    <li key={s.name}>
                      <a
                        href={FRESHA_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-baseline gap-4 border-b border-sand/15 py-5 transition-colors duration-500 hover:bg-sand/[0.04] md:px-3"
                        aria-label={`${s.name}${s.price ? `, ${price(s.price)}` : ''}. Reservar en Fresha`}
                      >
                        <span className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-copper-light transition-transform duration-500 group-hover:scale-y-100" aria-hidden />
                        <span className="text-[1.05rem] md:text-lg">
                          {s.name}
                          {s.note && <span className="ml-2 text-xs tracking-widest text-copper-light uppercase">{s.note}</span>}
                        </span>
                        <span className="mx-1 flex-1 translate-y-[-0.3em] border-b border-dotted border-sand/25" aria-hidden />
                        {s.price !== undefined ? (
                          <span className="font-display text-xl whitespace-nowrap text-sand md:text-2xl">
                            {s.addon ? '+ ' : ''}
                            {price(s.price)}
                          </span>
                        ) : (
                          <span className="text-sm whitespace-nowrap text-copper-light">Ver en Fresha</span>
                        )}
                        <span aria-hidden className="hidden w-6 -translate-x-2 text-copper-light opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 md:inline">
                          ↗
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            {/* Combo */}
            <FadeIn className="mt-12">
              <div className="sheen relative flex flex-col gap-6 overflow-hidden rounded-[28px] border border-copper-light/30 bg-gradient-to-br from-teal-deep to-ink p-8 sm:flex-row sm:items-center sm:justify-between md:p-10">
                <Sparkle className="absolute -top-6 -right-6 h-28 w-28 text-copper/25" />
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-copper-light px-3 py-1 text-xs font-medium tracking-widest text-ink uppercase">
                    {COMBO.badge}
                  </span>
                  <p className="display mt-4 text-3xl md:text-4xl">{COMBO.name}</p>
                  <p className="mt-1 text-sand/70">{COMBO.detail}</p>
                </div>
                <div className="flex items-center gap-6">
                  <p className="display text-5xl text-sand">{price(COMBO.price)}</p>
                  <MagneticButton href={FRESHA_URL} external variant="sand" ariaLabel="Reservar combo manicure más pedicure en Fresha">
                    Reservar
                  </MagneticButton>
                </div>
              </div>
            </FadeIn>
            <p className="mt-6 text-xs leading-relaxed text-sand/60">
              Precios en soles publicados en Fresha (consultados el 06/10/2026). Pueden variar; confirma el precio final al reservar.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
