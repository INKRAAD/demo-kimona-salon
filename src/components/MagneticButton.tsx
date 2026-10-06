import { motion, useMotionValue, useSpring } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { useFinePointer, useReducedMotion } from '../hooks/useMedia'

type Props = {
  href: string
  children: ReactNode
  variant?: 'sand' | 'teal' | 'ghost-light' | 'ghost-dark'
  className?: string
  external?: boolean
  ariaLabel?: string
  onClick?: () => void
}

const styles: Record<NonNullable<Props['variant']>, string> = {
  sand: 'bg-sand text-teal hover:bg-washi',
  teal: 'bg-teal text-sand hover:bg-ink',
  'ghost-light': 'border border-sand/40 text-sand hover:border-sand hover:bg-sand/10',
  'ghost-dark': 'border border-teal/30 text-teal hover:border-teal hover:bg-teal/5',
}

/** Botón con atracción magnética sutil (solo puntero fino y sin reduced-motion). */
export function MagneticButton({ href, children, variant = 'sand', className = '', external, ariaLabel, onClick }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 })
  const active = fine && !reduced

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      style={active ? { x, y } : undefined}
      onPointerMove={(e) => {
        if (!active || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * 0.28)
        y.set((e.clientY - (r.top + r.height / 2)) * 0.38)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
      data-cursor="hover"
      className={`group relative inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-7 py-3.5 text-[0.95rem] font-medium tracking-wide transition-colors duration-500 ${styles[variant]} ${className}`}
    >
      {children}
    </motion.a>
  )
}
