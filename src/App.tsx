import { useCallback, useEffect, useState } from 'react'
import { About } from './components/About'
import { Cursor } from './components/Cursor'
import { FinalCTA } from './components/FinalCTA'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Hero } from './components/Hero'
import { Loader } from './components/Loader'
import { Location } from './components/Location'
import { Manifesto } from './components/Manifesto'
import { Marquee } from './components/Marquee'
import { Nav } from './components/Nav'
import { Reviews } from './components/Reviews'
import { Ritual } from './components/Ritual'
import { Services } from './components/Services'
import { useIsMobile, useReducedMotion } from './hooks/useMedia'
import { initSmoothScroll, ScrollTrigger } from './lib/scroll'

export default function App() {
  const reduced = useReducedMotion()
  const mobile = useIsMobile()
  const [ready, setReady] = useState(false)
  const onDone = useCallback(() => setReady(true), [])

  useEffect(() => initSmoothScroll(reduced), [reduced])

  useEffect(() => {
    document.documentElement.style.overflow = ready ? '' : 'hidden'
    if (ready) requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [ready])

  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  return (
    <>
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      {!ready && <Loader reduced={reduced} onDone={onDone} />}
      <Cursor />
      <Nav />
      <main id="contenido">
        <Hero ready={ready} reduced={reduced} mobile={mobile} />
        <Marquee />
        <Manifesto />
        <Services />
        <Ritual />
        <Gallery />
        <Reviews />
        <About />
        <Location />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
