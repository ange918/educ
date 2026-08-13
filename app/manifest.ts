import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DAHOMEY-TECH — Mode africaine',
    short_name: 'DAHOMEY-TECH',
    description: 'Marketplace de stylistes africains vérifiés. Découvrez des créations uniques, commandez sur WhatsApp.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#F7F5EF',
    theme_color: '#008751',
    lang: 'fr',
    icons: [
      { src: '/logo-icon.jpg', sizes: '192x192', type: 'image/jpeg', purpose: 'any' },
      { src: '/logo-icon.jpg', sizes: '512x512', type: 'image/jpeg', purpose: 'any' },
      { src: '/logo-icon.jpg', sizes: '512x512', type: 'image/jpeg', purpose: 'maskable' },
    ],
  }
}
