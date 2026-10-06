import { FRESHA_URL, WHATSAPP_URL } from '../data/site'
import { KMonogram } from './KMonogram'
import { MagneticButton } from './MagneticButton'
import { SplitHeading } from './Reveal'

export function FinalCTA() {
  return (
    <section className="grain relative overflow-hidden bg-sand py-28 text-teal md:py-36" aria-label="Reserva tu cita">
      <KMonogram className="pointer-events-none absolute -right-10 -bottom-16 h-[120%] w-auto opacity-[0.18] md:right-10" letterClass="fill-copper" sparkClass="fill-teal" title="" />
      <div className="relative mx-auto max-w-7xl px-6 text-center md:px-10">
        <SplitHeading as="h2" text={'Tu próximo detalle\nte *espera*'} className="display mx-auto text-[clamp(2.8rem,7vw,6.4rem)]" emClass="italic text-copper-deep" />
        <p className="mx-auto mt-6 max-w-md text-lg text-teal">
          Reserva en Fresha en menos de un minuto o escríbenos por WhatsApp.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <MagneticButton href={FRESHA_URL} external variant="teal" ariaLabel="Reservar en Fresha (se abre en una pestaña nueva)">
            Reservar en Fresha <span aria-hidden>→</span>
          </MagneticButton>
          <MagneticButton href={WHATSAPP_URL} external variant="ghost-dark" ariaLabel="WhatsApp (se abre en una pestaña nueva)">
            WhatsApp
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
