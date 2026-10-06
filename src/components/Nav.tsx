import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { FRESHA_URL, SITE, WHATSAPP_URL } from '../data/site'
import { scrollToId, stopScroll } from '../lib/scroll'
import { KMonogram } from './KMonogram'

const LINKS = [
  { id: 'servicios', label: 'Servicios' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'galeria', label: 'Galería' },
  { id: 'resenas', label: 'Reseñas' },
  { id: 'visitanos', label: 'Visítanos' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    stopScroll(open)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    setTimeout(() => scrollToId(id), open ? 350 : 0)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
      <nav
        aria-label="Principal"
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full py-2 pr-2 pl-4 transition-all duration-700 ease-[var(--ease-silk)] md:pl-5 ${
          scrolled || open ? 'bg-ink/75 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.45)] backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <a href="#inicio" onClick={go('inicio')} className="flex items-center gap-3 text-sand" aria-label="Kimona Salon, ir al inicio">
          <KMonogram className="h-8 w-auto" title="" />
          <span className="font-display text-[0.95rem] tracking-[0.42em] uppercase">Kimona</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={go(l.id)}
                className="group relative rounded-full px-4 py-2 text-sm tracking-wide text-sand/80 transition-colors hover:text-sand"
              >
                {l.label}
                <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-copper-light transition-transform duration-500 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={FRESHA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-sand px-5 py-2.5 text-sm font-medium text-teal transition-colors hover:bg-washi"
          >
            Reservar
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-sand/25 text-sand lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            <span className={`absolute h-px w-5 bg-current transition-transform duration-500 ${open ? 'rotate-45' : '-translate-y-1'}`} />
            <span className={`absolute h-px w-5 bg-current transition-transform duration-500 ${open ? '-rotate-45' : 'translate-y-1'}`} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
            animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
            exit={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="seigaiha fixed inset-0 -z-10 flex flex-col justify-end bg-teal px-8 pb-12 pt-28 text-sand lg:hidden"
          >
            <ul className="space-y-2">
              {LINKS.map((l, i) => (
                <motion.li key={l.id} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 + i * 0.06, duration: 0.6 }}>
                  <a href={`#${l.id}`} onClick={go(l.id)} className="display block py-1 text-5xl">
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-1 text-sm text-sand/75">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="py-1">WhatsApp · {SITE.phoneDisplay}</a>
              <a href={SITE.instagram.url} target="_blank" rel="noopener noreferrer" className="py-1">Instagram · {SITE.instagram.handle}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
