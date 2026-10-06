/** Destello de 4 puntas del logo Kimona (misma curvatura que el isotipo). */
export function Sparkle({ className = '', title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="-26 -26 52 52" className={className} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title && <title>{title}</title>}
      <path
        fill="currentColor"
        d="M25.3 0C8.4 4.1 4.1 8.4 0 25.3-4.1 8.4-8.4 4.1-25.3 0-8.4-4.1-4.1-8.4 0-25.3 4.1-8.4 8.4-4.1 25.3 0Z"
      />
    </svg>
  )
}
