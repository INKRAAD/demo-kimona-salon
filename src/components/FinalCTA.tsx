import { FRESHA_URL, WHATSAPP_URL } from '../data/site'
import { KMonogram } from './KMonogram'
import { MagneticButton } from './MagneticButton'
import { SplitHeading } from './Reveal'

export function FinalCTA() {
  return (
    <section className="grain relative overflow-hidden bg-copper py-28 text-ink md:py-36" aria-label="Reserva tu cita">
      <KMonogram className="pointer-events-none absolute -right-10 -bottom-16 h-[120%] w-auto opacity-[0.12] md:right-10" letterClass="fill-ink" sparkClass="fill-washi" title="" />
      <div className="relative mx-auto max-w-7xl px-6 text-center md:px-10">
        <SplitHeading as="h2" text={'Tu próximo detalle\nte *espera*'} className="display mx-auto text-[clamp(2.8rem,7vw,6.4rem)]" emClass="italic" />
        <p className="mx-auto mt-6 max-w-md text-lg text-ink/80">
          Reserva en Fresha en menos de un minuto o escríbenos por WhatsApp.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <MagneticButton href={FRESHA_URL} external variant="teal" ariaLabel="Reservar en Fresha (se abre en una pestaña nueva)">
            Reservar en Fresha <span aria-hidden>→</span>
          </MagneticButton>
          <MagneticButton href={WHATSAPP_URL} external variant="ghost-dark" className="border-ink/40 text-ink" ariaLabel="WhatsApp (se abre en una pestaña nueva)">
            WhatsApp
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
