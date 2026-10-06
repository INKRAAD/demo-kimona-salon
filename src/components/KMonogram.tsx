import { forwardRef } from 'react'
import { K_LETTER_PATH, K_LETTER_TRANSFORM, K_SPARK_PATH, K_VIEWBOX } from './logoPaths'

type Props = {
  className?: string
  letterClass?: string
  sparkClass?: string
  title?: string
}

/** Monograma oficial (vector fiel al logo). Colores por clase para poder animarlo. */
export const KMonogram = forwardRef<SVGSVGElement, Props>(function KMonogram(
  { className = '', letterClass = 'fill-sand', sparkClass = 'fill-copper', title = 'Kimona Salon' },
  ref,
) {
  return (
    <svg ref={ref} viewBox={K_VIEWBOX} className={className} {...(title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true })}>
      <g transform={K_LETTER_TRANSFORM}>
        <path className={`k-letter ${letterClass}`} d={K_LETTER_PATH} />
      </g>
      <path className={`k-spark ${sparkClass}`} d={K_SPARK_PATH} />
    </svg>
  )
})
