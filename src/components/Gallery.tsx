import { useLayoutEffect, useRef, type PointerEvent } from 'react'
import { gsap } from '../lib/scroll'
import { useFinePointer, useReducedMotion } from '../hooks/useMedia'
import { SITE, img, srcSet } from '../data/site'
import { MagneticButton } from './MagneticButton'
import { SplitHeading } from './Reveal'
import { Sparkle } from './Sparkle'

const COLS = [
  [
    { name: 'nails-teal', alt: 'Manicure verde petróleo con anillo de perla', ratio: 'aspect-[3/4]', label: 'Gel · verde petróleo' },
    { name: 'lashes-pro', alt: 'Especialista trabajando pestañas con pinzas', ratio: 'aspect-[4/3]', label: 'Pestañas' },
  ],
  [
    { name: 'nails-french', alt: 'Manicure francesa delicada sobre fondo oscuro', ratio: 'aspect-[3/4]', label: 'French' },
    { name: 'makeup-bridal', alt: 'Maquillaje de novia con luz natural', ratio: 'aspect-[3/4]', label: 'Makeup' },
  ],
  [
    { name: 'nails-minimal', alt: 'Mano con uñas oscuras sobre pared clara', ratio: 'aspect-[3/4]', label: 'Minimal' },
    { name: 'lashes-macro', alt: 'Pestañas largas y curvadas en primer plano', ratio: 'aspect-[4/3]', label: 'Lifting' },
  ],
]

function Tile({ t }: { t: (typeof COLS)[number][number] }) {
  const ref = useRef<HTMLDivElement>(null)
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const move = (e: PointerEvent) => {
    if (!fine || reduced || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    ref.current.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg)`
  }
  const leave = () => {
    if (ref.current) ref.current.style.transform = ''
  }
  return (
    <figure
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      data-cursor="hover"
      className={`sheen group relative overflow-hidden rounded-[2px] transition-transform duration-500 ease-out ${t.ratio}`}
    >
      <img
        src={img(t.name, 800)}
        srcSet={srcSet(t.name)}
        sizes="(min-width: 768px) 33vw, 50vw"
        alt={`${t.alt} (imagen referencial)`}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-silk)] group-hover:scale-[1.06]"
      />
      <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/80 to-transparent p-5 text-sm tracking-wide text-sand opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:opacity-100">
        {t.label}
      </figcaption>
    </figure>
  )
}

export function Gallery() {
  const root = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    if (reduced || !root.current) return
    const ctx = gsap.context(() => {
      const speeds = [-8, 6, -14]
      gsap.utils.toArray<HTMLElement>('.gl-col').forEach((col, i) => {
        gsap.fromTo(col, { yPercent: -speeds[i] }, { yPercent: speeds[i], ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={root} id="galeria" className="relative overflow-hidden bg-ink py-28 text-sand md:py-40" aria-labelledby="gl-title">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-6 flex items-center gap-3 text-copper-light">
              <Sparkle className="h-3 w-3" /> Galería
            </p>
            <SplitHeading text={'El arte de\nlo *sutil*'} className="display text-[clamp(2.6rem,6vw,5.4rem)]" emClass="italic text-copper-light" />
            <h2 id="gl-title" className="sr-only">
              Galería
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-sand/75">Tonos sobrios, brillo espejo, aurora y acabados naturales. Descubre los trabajos recientes en nuestro Instagram.</p>
            <MagneticButton href={SITE.instagram.url} external variant="ghost-light" className="mt-6" ariaLabel="Ver Instagram de Kimona Salon (se abre en una pestaña nueva)">
              {SITE.instagram.handle}
            </MagneticButton>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
          {COLS.map((col, i) => (
            <div key={i} className={`gl-col flex flex-col gap-3 md:gap-6 ${i === 2 ? 'col-span-2 grid grid-cols-2 md:col-span-1 md:flex' : ''} ${i === 1 ? 'md:pt-24' : ''}`}>
              {col.map((t) => (
                <Tile key={t.name} t={t} />
              ))}
            </div>
          ))}
        </div>
        <p className="mt-10 text-xs text-sand/60">
          Imágenes referenciales de bancos libres (Pexels / Unsplash) para esta demo. En la versión final se reemplazan por fotos reales de los trabajos de Kimona.
        </p>
      </div>
    </section>
  )
}
