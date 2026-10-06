import { CREDITS, FRESHA_URL, SITE, WHATSAPP_URL } from '../data/site'
import { KMonogram } from './KMonogram'

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="relative bg-ink text-sand">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4">
              <KMonogram className="h-14 w-auto" />
              <div>
                <p className="font-display text-xl tracking-[0.4em] uppercase">Kimona</p>
                <p className="text-xs tracking-[0.4em] text-copper-light uppercase">Salon · {SITE.tagline}</p>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sand/75">Uñas, pestañas, cejas y maquillaje en Miraflores, Lima.</p>
          </div>
          <nav className="md:col-span-3" aria-label="Contacto">
            <h2 className="eyebrow text-copper-light">Contacto</h2>
            <ul className="mt-4 space-y-2 text-sand/80">
              <li>
                <a className="hover:text-sand" href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
              </li>
              <li>
                <a className="hover:text-sand" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </li>
              <li>
                <a className="hover:text-sand" href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">{SITE.address}, {SITE.district}</a>
              </li>
            </ul>
          </nav>
          <nav className="md:col-span-4" aria-label="Redes sociales">
            <h2 className="eyebrow text-copper-light">Síguenos</h2>
            <ul className="mt-4 space-y-2 text-sand/80">
              <li>
                <a className="hover:text-sand" href={SITE.instagram.url} target="_blank" rel="noopener noreferrer">Instagram · {SITE.instagram.handle}</a>
              </li>
              <li>
                <a className="hover:text-sand" href={SITE.facebook.url} target="_blank" rel="noopener noreferrer">Facebook · {SITE.facebook.handle}</a>
              </li>
              <li>
                <a className="hover:text-sand" href={FRESHA_URL} target="_blank" rel="noopener noreferrer">Reservas · Fresha</a>
              </li>
            </ul>
          </nav>
        </div>

        <details className="mt-16 border-t border-sand/10 pt-6 text-xs text-sand/75">
          <summary className="cursor-pointer select-none text-sand/75 hover:text-sand">Créditos de imágenes</summary>
          <ul className="mt-4 grid gap-1 sm:grid-cols-2">
            {Object.entries(CREDITS).map(([k, c]) => (
              <li key={k}>
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="underline decoration-sand/20 underline-offset-2 hover:text-sand">
                  Foto de {c.author} en {c.source}
                </a>
              </li>
            ))}
          </ul>
        </details>

        <div className="mt-8 flex flex-col gap-3 border-t border-sand/10 pt-6 text-xs text-sand/75 md:flex-row md:justify-between">
          <p>© {YEAR} Kimona Salon · Miraflores, Lima</p>
          <p>Demo conceptual no oficial de rediseño web · Propuesta de INKRAAD. Imágenes referenciales de Pexels y Unsplash.</p>
        </div>
      </div>
    </footer>
  )
}
