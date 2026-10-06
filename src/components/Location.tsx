import { useState } from 'react'
import { FRESHA_URL, HOURS, SITE, WHATSAPP_URL } from '../data/site'
import { MagneticButton } from './MagneticButton'
import { FadeIn, SplitHeading } from './Reveal'
import { Sparkle } from './Sparkle'

export function Location() {
  const [mapOn, setMapOn] = useState(false)
  return (
    <section id="visitanos" className="grain relative overflow-hidden bg-teal py-28 text-sand md:py-36" aria-labelledby="lc-title">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <p className="eyebrow mb-6 flex items-center gap-3 text-copper-light">
            <Sparkle className="h-3 w-3" /> Visítanos
          </p>
          <SplitHeading text={'En el corazón\nde *Miraflores*'} className="display text-[clamp(2.6rem,5.4vw,5rem)]" emClass="italic text-copper-light" />
          <h2 id="lc-title" className="sr-only">
            Ubicación y horario
          </h2>

          <FadeIn className="mt-10 space-y-8">
            <div>
              <h3 className="eyebrow text-copper-light">Dirección</h3>
              <address className="mt-3 text-lg leading-relaxed not-italic">
                {SITE.address}
                <br />
                {SITE.district}
              </address>
            </div>
            <div>
              <h3 className="eyebrow text-copper-light">Horario</h3>
              <dl className="mt-3 divide-y divide-sand/15 border-y border-sand/15">
                {HOURS.map((h) => (
                  <div key={h.days} className="flex justify-between py-3 text-lg">
                    <dt>{h.days}</dt>
                    <dd className="font-display">{h.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-xs text-sand/60">Horario publicado en Fresha. Para domingos, te recomendamos confirmar por WhatsApp.</p>
            </div>
            <div>
              <h3 className="eyebrow text-copper-light">Contacto</h3>
              <p className="mt-3 text-lg">
                <a href={SITE.phoneHref} className="underline decoration-sand/30 underline-offset-4 hover:decoration-sand">
                  {SITE.phoneDisplay}
                </a>
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <MagneticButton href={FRESHA_URL} external variant="sand" ariaLabel="Reservar en Fresha (se abre en una pestaña nueva)">
                Reservar cita
              </MagneticButton>
              <MagneticButton href={WHATSAPP_URL} external variant="ghost-light" ariaLabel="WhatsApp (se abre en una pestaña nueva)">
                WhatsApp
              </MagneticButton>
              <MagneticButton href={SITE.mapsUrl} external variant="ghost-light" ariaLabel="Cómo llegar en Google Maps (se abre en una pestaña nueva)">
                Cómo llegar
              </MagneticButton>
            </div>
          </FadeIn>
        </div>

        <FadeIn className="relative md:col-span-7">
          <div className="relative h-[460px] overflow-hidden rounded-[32px] border border-sand/15 bg-teal-deep md:h-full md:min-h-[620px]">
            {mapOn ? (
              <iframe
                title="Mapa: Kimona Salon, Av. Ernesto Diez Canseco 285, Miraflores"
                src={SITE.mapsEmbed}
                className="absolute inset-0 h-full w-full [filter:grayscale(0.35)_sepia(0.15)_contrast(1.05)]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <button
                type="button"
                onClick={() => setMapOn(true)}
                className="group absolute inset-0 flex h-full w-full flex-col items-center justify-center text-center"
                aria-label="Cargar mapa interactivo de Google Maps"
              >
                <MapArt />
                <span className="relative z-10 mt-6 rounded-full bg-sand px-6 py-3 text-sm font-medium text-teal transition-transform duration-500 group-hover:scale-105">
                  Ver mapa interactivo
                </span>
                <span className="relative z-10 mt-3 text-xs text-sand/60">Se carga Google Maps al pulsar</span>
              </button>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/** Mapa ilustrado ligero (sin peticiones externas) con el pin de Kimona. */
function MapArt() {
  return (
    <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full" aria-hidden preserveAspectRatio="xMidYMid slice">
      <rect width="600" height="600" fill="#12363c" />
      <g stroke="#E3D4BF" strokeOpacity="0.14" strokeWidth="14" fill="none" strokeLinecap="round">
        <path d="M-20 360 L640 250" />
        <path d="M120 -20 L230 640" />
        <path d="M400 -20 L470 640" />
        <path d="M-20 120 L640 40" />
      </g>
      <g stroke="#E3D4BF" strokeOpacity="0.07" strokeWidth="6" fill="none">
        <path d="M-20 470 L640 380" />
        <path d="M300 -20 L350 640" />
        <path d="M-20 230 L640 140" />
        <path d="M30 -20 L120 640" />
        <path d="M520 -20 L580 640" />
      </g>
      {/* Parque Kennedy (referencial) */}
      <rect x="250" y="120" width="120" height="90" rx="14" fill="#9F7D69" fillOpacity="0.18" transform="rotate(-9 310 165)" />
      <text x="262" y="110" fill="#E3D4BF" fillOpacity="0.5" fontSize="13" fontFamily="Jost Variable, sans-serif" letterSpacing="2">PARQUE KENNEDY</text>
      <text x="40" y="350" fill="#E3D4BF" fillOpacity="0.45" fontSize="12" fontFamily="Jost Variable, sans-serif" letterSpacing="2" transform="rotate(-9 40 350)">AV. ERNESTO DIEZ CANSECO</text>
      {/* Pin */}
      <circle cx="300" cy="300" r="46" fill="#E3D4BF" fillOpacity="0.08">
        <animate attributeName="r" values="30;60;30" dur="3s" repeatCount="indefinite" />
        <animate attributeName="fill-opacity" values="0.16;0;0.16" dur="3s" repeatCount="indefinite" />
      </circle>
      <path transform="translate(300 300) scale(1.1)" fill="#9F7D69" d="M25.3 0C8.4 4.1 4.1 8.4 0 25.3-4.1 8.4-8.4 4.1-25.3 0-8.4-4.1-4.1-8.4 0-25.3 4.1-8.4 8.4-4.1 25.3 0Z" />
    </svg>
  )
}
