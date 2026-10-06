import { useLayoutEffect, useRef, type ElementType, type ReactNode } from 'react'
import { gsap } from '../lib/scroll'
import { useReducedMotion } from '../hooks/useMedia'

/**
 * Titular con revelado palabra por palabra (máscara) al entrar en viewport.
 * Acepta texto con *énfasis* que se pinta en cursiva.
 */
export function SplitHeading({
  text,
  as: Tag = 'h2',
  className = '',
  emClass = 'italic',
  delay = 0,
  immediate = false,
  play = true,
}: {
  text: string
  as?: ElementType
  className?: string
  emClass?: string
  delay?: number
  immediate?: boolean
  play?: boolean
}) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const lines = text.split('\n')
  const T = Tag as unknown as 'div'

  useLayoutEffect(() => {
    if (reduced || !ref.current) return
    const words = ref.current.querySelectorAll('.split-word')
    const ctx = gsap.context(() => {
      if (!play) {
        gsap.set(words, { yPercent: 110 })
        return
      }
      gsap.fromTo(
        words,
        { yPercent: 110, rotate: 4 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.06,
          delay,
          scrollTrigger: immediate ? undefined : { trigger: ref.current, start: 'top 85%', once: true },
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [reduced, delay, immediate, play])

  return (
    <T ref={ref as React.RefObject<HTMLDivElement>} className={className} aria-label={text.replace(/\*/g, '').replace(/\n/g, ' ')}>
      {lines.map((line, li) => (
        <span key={li} className="split-line" aria-hidden="true">
          {line.split(/(\*[^*]+\*)/g).filter(Boolean).flatMap((chunk, ci) => {
            const em = chunk.startsWith('*')
            const clean = em ? chunk.slice(1, -1) : chunk
            return clean.split(/(\s+)/).map((w, wi) =>
              /^\s+$/.test(w) ? (
                ' '
              ) : (
                <span key={`${ci}-${wi}`} className={`split-word ${em ? emClass : ''}`}>
                  {w}
                </span>
              ),
            )
          })}
        </span>
      ))}
    </T>
  )
}

/** Fade + desplazamiento suave para bloques. */
export function FadeIn({ children, className = '', y = 40, delay = 0, as: Tag = 'div' }: { children: ReactNode; className?: string; y?: number; delay?: number; as?: ElementType }) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  useLayoutEffect(() => {
    if (reduced || !ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { y, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1.2, ease: 'power3.out', delay, scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true } },
      )
    })
    return () => ctx.revert()
  }, [reduced, y, delay])
  const T = Tag as unknown as 'div'
  return (
    <T ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {children}
    </T>
  )
}
