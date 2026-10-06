/**
 * Datos de Kimona Salon.
 * Fuente: /brand/brand.md (investigación 06-oct-2026: Google Maps vía Exa Places, Fresha, Instagram, Facebook).
 * TODO lo que aquí aparece es real salvo lo marcado explícitamente como «CONTENIDO DE EJEMPLO».
 */

export const FRESHA_URL =
  'https://www.fresha.com/es/a/kimona-miraflores-kimona-salon-unas-y-maquillaje-avenida-ernesto-diez-canseco-285-kmltfdcm'

export const WHATSAPP_NUMBER = '51978373736'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hola Kimona, quisiera información para reservar una cita.',
)}`

export const SITE = {
  name: 'Kimona Salon',
  tagline: 'Nail & Makeup',
  phoneDisplay: '+51 978 373 736',
  phoneHref: 'tel:+51978373736',
  address: 'Av. Ernesto Diez Canseco 285, Local 9, primer piso',
  district: 'Miraflores, Lima',
  coords: { lat: -12.122361, lng: -77.02795 },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Kimona+Salon%2C+Av.+Ernesto+Diez+Canseco+285%2C+Miraflores%2C+Lima',
  mapsEmbed: 'https://maps.google.com/maps?q=-12.122361,-77.02795&z=17&output=embed',
  instagram: { url: 'https://www.instagram.com/kimona.salon/', handle: '@kimona.salon' },
  facebook: { url: 'https://www.facebook.com/kimonabeauty/', handle: 'kimonabeauty' },
  rating: 5.0,
  reviewsCount: 64,
}

/**
 * Horario: se usa el publicado en Fresha (indicación del cliente).
 * OJO: Google Maps indica «Domingo cerrado»; Fresha indica «Domingo 10:00–17:00». Discrepancia anotada en el README.
 */
export const HOURS = [
  { days: 'Lunes a sábado', time: '10:00 – 20:00' },
  { days: 'Domingo', time: '10:00 – 17:00' },
]

export type Service = { name: string; price?: number; note?: string; addon?: boolean }
export type Category = {
  id: string
  label: string
  kicker: string
  intro: string
  image: string
  imageAlt: string
  services: Service[]
}

/** Precios públicos en Fresha (PEN), consultados el 06-oct-2026. */
export const CATEGORIES: Category[] = [
  {
    id: 'unas',
    label: 'Uñas',
    kicker: 'Nails',
    intro: 'Esmaltado tradicional o en gel, rubber nails, soft gel y gel constructor: acabados pulidos que se ven impecables por más tiempo.',
    image: 'nails-teal',
    imageAlt: 'Mano con manicure verde petróleo y anillo de perla (imagen referencial)',
    services: [
      { name: 'Manicura esmaltado tradicional', price: 30 },
      { name: 'Manicure esmaltado en gel', price: 55 },
      { name: 'Pedicure esmaltado tradicional', price: 45 },
      { name: 'Pedicure limpieza profunda + esmaltado tradicional', price: 50 },
      { name: 'Pedicure esmaltado en gel', price: 65 },
      { name: 'Rubber Nails', price: 80 },
      { name: 'Retoque Rubber Nails', price: 90 },
      { name: 'Kapping con gel constructor', price: 90 },
      { name: 'Gel constructor con tips', price: 110 },
      { name: 'Soft Gel Nail', price: 110 },
      { name: 'Diseño efecto aurora o espejo', price: 10, addon: true, note: 'adicional' },
    ],
  },
  {
    id: 'pestanas-cejas',
    label: 'Pestañas y cejas',
    kicker: 'Lashes & Brows',
    intro: 'Una mirada definida sin esfuerzo: lifting que eleva tus pestañas naturales y laminado que ordena y da forma a tus cejas.',
    image: 'lashes-macro',
    imageAlt: 'Primer plano de un ojo con pestañas largas y curvadas (imagen referencial)',
    services: [
      { name: 'Lifting de pestañas', price: 105 },
      { name: 'Laminado de cejas', price: 70 },
    ],
  },
  {
    id: 'hilo',
    label: 'Depilación al hilo',
    kicker: 'Threading',
    intro: 'Técnica precisa y delicada con la piel para perfilar cejas, bozo o rostro completo.',
    image: 'brows',
    imageAlt: 'Especialista perfilando las cejas de una clienta (imagen referencial)',
    services: [
      { name: 'Rostro completo', price: 60 },
      { name: 'Cejas', price: 30 },
      { name: 'Bozo', price: 15 },
    ],
  },
  {
    id: 'makeup',
    label: 'Makeup',
    kicker: 'Makeup',
    intro: 'Maquillaje para eventos, sesiones y ocasiones especiales. Consulta opciones y disponibilidad directamente en Fresha.',
    image: 'makeup-bridal',
    imageAlt: 'Maquilladora aplicando maquillaje a una novia con luz natural (imagen referencial)',
    // Los precios de maquillaje no están expuestos públicamente: no se muestran (no se inventan).
    services: [{ name: 'Servicios de maquillaje', note: 'Precio y opciones en Fresha' }],
  },
]

export const COMBO = {
  name: 'Combo manicure + pedicure',
  detail: '2 servicios · 1 h',
  price: 150,
  badge: 'Ahorra 14%',
}

/** Reseñas reales de Google (autor no disponible en la fuente). Traducción al español: propia. */
export const REVIEWS = [
  {
    original: 'Amazing gel manicure! Very clean, professional, and the result looks perfect.',
    es: '¡Una manicure en gel increíble! Muy limpio, profesional y el resultado se ve perfecto.',
    date: 'dic. 2025',
  },
  {
    original:
      '…what I liked about Kimona was not only the glowing reviews, but how easy it was to schedule an appointment online.',
    es: '…lo que me gustó de Kimona no fueron solo sus excelentes reseñas, sino lo fácil que fue reservar una cita online.',
    date: 'nov. 2025',
  },
  {
    original:
      'Kety was super nice and professional… My nails are 11 days old and still looking fresh. She even said that the service has a guarantee…',
    es: 'Kety fue súper amable y profesional… Mis uñas tienen 11 días y siguen como nuevas. Incluso me dijo que el servicio tiene garantía…',
    date: 'jun. 2025',
  },
]

/**
 * Equipo: nombres citados por clientas en reseñas de Google (Kety, Mabel) y la dueña (lifting/tinte de pestañas).
 * CONTENIDO POR CONFIRMAR: especialidades exactas, apellidos y fotos. Sin fotos reales: se usan monogramas.
 */
export const TEAM = [
  { name: 'Kety', role: 'Uñas', note: 'Mencionada en reseñas de Google' },
  { name: 'Mabel', role: 'Equipo Kimona', note: 'Mencionada en reseñas de Google' },
  { name: 'La fundadora', role: 'Lifting y tinte de pestañas', note: 'Según reseñas de clientas' },
]

/** Créditos de imágenes de stock (licencias Pexels / Unsplash: uso gratuito, comercial permitido). */
export const CREDITS: Record<string, { author: string; source: 'Pexels' | 'Unsplash'; url: string }> = {
  'nails-teal': { author: 'Salim Da', source: 'Pexels', url: 'https://www.pexels.com/photo/elegant-hand-with-green-manicure-and-pearl-ring-34971922/' },
  'silk-cream': { author: 'Davis Vidal', source: 'Pexels', url: 'https://www.pexels.com/photo/close-up-photo-of-a-smooth-cream-textile-8465948/' },
  'lashes-silk': { author: 'Fatoba Tolulope Ifemide', source: 'Pexels', url: 'https://www.pexels.com/photo/black-woman-with-eyes-closed-and-artificial-lashes-5017084/' },
  'lashes-pro': { author: 'Ekaterina Myasoed', source: 'Pexels', url: 'https://www.pexels.com/photo/close-up-of-woman-at-beautician-8554941/' },
  brows: { author: 'George Milton', source: 'Pexels', url: 'https://www.pexels.com/photo/crop-visagiste-painting-eyebrows-of-client-6953617/' },
  'nail-art': { author: 'Kerim Eveyik', source: 'Pexels', url: 'https://www.pexels.com/photo/nail-art-22668324/' },
  'makeup-bridal': { author: 'Alexander Mass', source: 'Pexels', url: 'https://www.pexels.com/photo/bridal-makeup-preparation-in-soft-lighting-32427370/' },
  'nails-minimal': { author: 'Alesya Gorbunova', source: 'Pexels', url: 'https://www.pexels.com/photo/person-hand-with-nail-polish-8872288/' },
  'nails-french': { author: 'Salim Da', source: 'Pexels', url: 'https://www.pexels.com/photo/delicate-hand-with-stylish-french-manicure-35031987/' },
  'lashes-macro': { author: 'Milky Way Lashes', source: 'Unsplash', url: 'https://unsplash.com/photos/a-close-up-of-a-persons-eye-with-long-lashes-GEct9d7zgos' },
  'nails-nude': { author: 'Mailén Aguirre', source: 'Unsplash', url: 'https://unsplash.com/photos/a-womans-hand-with-a-manicured-nail-polish-YmQszA5_GkE' },
  'flowers-hold': { author: 'Arina Krasnikova', source: 'Pexels', url: 'https://www.pexels.com/photo/close-up-shot-of-person-holding-flowers-7752610/' },
  'hands-rings': { author: 'Elijah Pilchard', source: 'Unsplash', url: 'https://unsplash.com/photos/close-up-of-elegant-manicured-hands-with-rings-vFpYTyGxXNE' },
}

export const img = (name: string, w: 800 | 1600 = 1600) => `/images/${name}-${w}.webp`
export const srcSet = (name: string) => `/images/${name}-800.webp 800w, /images/${name}-1600.webp 1600w`
