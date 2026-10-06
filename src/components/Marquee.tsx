import { Sparkle } from './Sparkle'

const ITEMS = ['Manicure en gel', 'Rubber Nails', 'Soft Gel', 'Kapping', 'Lifting de pestañas', 'Laminado de cejas', 'Depilación al hilo', 'Makeup']

export function Marquee({ tone = 'copper' }: { tone?: 'copper' | 'sand' }) {
  const row = (
    <div className="flex shrink-0 items-center">
      {ITEMS.map((t) => (
        <span key={t} className="flex items-center">
          <span className="display px-8 text-[clamp(1.6rem,3.4vw,2.8rem)] italic">{t}</span>
          <Sparkle className="h-4 w-4 opacity-70" />
        </span>
      ))}
    </div>
  )
  return (
    <div
      className={`relative overflow-hidden py-6 ${tone === 'copper' ? 'bg-copper text-ink' : 'bg-sand text-teal'}`}
      aria-label="Servicios: manicure en gel, rubber nails, soft gel, kapping, lifting de pestañas, laminado de cejas, depilación al hilo y makeup"
      role="marquee"
    >
      <div className="marquee-track flex w-max" aria-hidden>
        {row}
        {row}
      </div>
    </div>
  )
}
