import type { Metadata, Viewport } from 'next'
import './globals.css'
import 'boxicons/css/boxicons.min.css'
import AppShell from '@/components/AppShell'
import BottomNav from '@/components/BottomNav'
import TrackVisite from '@/components/TrackVisite'
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister'

export const metadata: Metadata = {
  title: 'DAHOMEY-TECH — Stylistes vérifiés, une seule adresse',
  description: 'Marketplace de stylistes africains vérifiés. Découvrez des créations uniques, commandez sur WhatsApp.',
  keywords: ['mode africaine', 'styliste', 'pagne', 'boubou', 'Bénin', 'wax'],
  applicationName: 'DAHOMEY-TECH',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'DAHOMEY-TECH',
  },
  icons: {
    icon: '/logo-icon.jpg',
    apple: '/logo-icon.jpg',
  },
  openGraph: {
    title: 'DAHOMEY-TECH',
    description: 'Des stylistes vérifiés, une seule adresse.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#008751',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <AppShell>{children}</AppShell>
        <BottomNav />
        <TrackVisite />
        <ServiceWorkerRegister />
      </body>
    </html>
  )
}
