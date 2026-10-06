import { useEffect, useRef } from 'react'
import { useFinePointer, useReducedMotion } from '../hooks/useMedia'
import { Sparkle } from './Sparkle'

/** Cursor-destello: el brillo de 4 puntas del logo sigue al puntero y crece sobre elementos interactivos. */
export function Cursor() {
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!fine || reduced) return
    document.documentElement.classList.add('has-custom-cursor')
    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let raf = 0
    let hover = false
    let sc = 1
    let rot = 0
    let visible = false
    const move = (e: PointerEvent) => {
      mx = e.clientX
      my = e.clientY
      if (!visible) {
        visible = true
        rx = mx
        ry = my
        dot.current?.style.setProperty('opacity', '1')
        ring.current?.style.setProperty('opacity', '1')
      }
      const t = e.target as HTMLElement | null
      hover = !!t?.closest('a,button,[data-cursor="hover"],[role="tab"]')
    }
    const leave = () => {
      visible = false
      dot.current?.style.setProperty('opacity', '0')
      ring.current?.style.setProperty('opacity', '0')
    }
    const loop = () => {
      rx += (mx - rx) * 0.16
      ry += (my - ry) * 0.16
      if (dot.current) dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`
      sc += ((hover ? 1.9 : 1) - sc) * 0.18
      rot += ((hover ? 45 : 0) - rot) * 0.14
      if (ring.current)
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${sc}) rotate(${rot}deg)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    raf = requestAnimationFrame(loop)
    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
      cancelAnimationFrame(raf)
    }
  }, [fine, reduced])

  if (!fine || reduced) return null
  return (
    <>
      <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[90] opacity-0 mix-blend-difference">
        <span className="block h-1.5 w-1.5 rounded-full bg-sand" />
      </div>
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] text-copper opacity-0 will-change-transform"
      >
        <Sparkle className="h-7 w-7 drop-shadow-[0_0_10px_rgba(227,212,191,0.45)]" />
      </div>
    </>
  )
}
