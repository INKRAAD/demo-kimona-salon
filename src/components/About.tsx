import { TEAM, img, srcSet } from '../data/site'
import { FadeIn, SplitHeading } from './Reveal'
import { Sparkle } from './Sparkle'

export function About() {
  return (
    <section id="nosotras" className="relative overflow-hidden bg-sand py-28 text-teal md:py-40" aria-labelledby="ab-title">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-12 md:px-10">
        <div className="relative md:col-span-5">
          <FadeIn className="relative aspect-[4/5] overflow-hidden rounded-t-full">
            <img
              src={img('nails-minimal', 800)}
              srcSet={srcSet('nails-minimal')}
              sizes="(min-width: 768px) 40vw, 100vw"
              alt="Mano con manicure oscura y anillos sobre una pared clara (imagen referencial)"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </FadeIn>
          <Sparkle className="absolute -right-4 top-10 h-16 w-16 text-copper md:-right-8" />
        </div>
        <div className="md:col-span-7 md:pl-8">
          <p className="eyebrow mb-6 flex items-center gap-3 text-copper-deep">
            <Sparkle className="h-3 w-3" /> Nosotras
          </p>
          <SplitHeading text={'Lujo accesible,\nhecho a *mano*'} className="display text-[clamp(2.6rem,5.4vw,5rem)]" emClass="italic text-copper-deep" />
          <h2 id="ab-title" className="sr-only">
            Sobre Kimona Salon
          </h2>
          <FadeIn className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-teal-soft">
            <p>
              Kimona es un salón especializado en uñas y maquillaje en Miraflores, donde cada detalle está diseñado para que vivas <strong className="font-medium text-teal">lujo accesible, comodidad y confianza</strong>.
            </p>
            {/* CONTENIDO DE EJEMPLO: redacción propuesta a partir del tono de marca; validar con el salón. */}
            <p>Creemos que cada pincelada y cada trazo aportan poder y belleza. Por eso trabajamos sin prisa, con técnica cuidada y productos de calidad, para que salgas sintiéndote tú, en tu mejor versión.</p>
          </FadeIn>

          <h3 className="eyebrow mt-16 text-copper-deep">Las manos detrás de Kimona</h3>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {TEAM.map((m, i) => (
              <FadeIn as="li" key={m.name} delay={i * 0.08} className="sheen group rounded-[24px] border border-teal/15 bg-washi/60 p-6 transition-colors duration-500 hover:bg-washi">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal font-display text-2xl text-sand transition-transform duration-700 group-hover:rotate-[360deg]" aria-hidden>
                  {m.name === 'La fundadora' ? 'K' : m.name[0]}
                </span>
                <p className="display mt-5 text-2xl">{m.name}</p>
                <p className="mt-1 text-sm text-teal">{m.role}</p>
                <p className="mt-3 text-xs text-teal-soft">{m.note}</p>
              </FadeIn>
            ))}
          </ul>
          <p className="mt-4 text-xs text-teal-soft">Equipo según reseñas públicas; nombres y especialidades por confirmar con el salón.</p>
        </div>
      </div>
    </section>
  )
}
