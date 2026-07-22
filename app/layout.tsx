import type { Metadata } from 'next'
import './globals.css'
import 'boxicons/css/boxicons.min.css'
import AppShell from '@/components/AppShell'
import BottomNav from '@/components/BottomNav'
import TrackVisite from '@/components/TrackVisite'

export const metadata: Metadata = {
  title: 'DAHOMEY-TECH — Stylistes vérifiés, une seule adresse',
  description: 'Marketplace de stylistes africains vérifiés. Découvrez des créations uniques, commandez sur WhatsApp.',
  keywords: ['mode africaine', 'styliste', 'pagne', 'boubou', 'Bénin', 'wax'],
  openGraph: {
    title: 'DAHOMEY-TECH',
    description: 'Des stylistes vérifiés, une seule adresse.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <AppShell>{children}</AppShell>
        <BottomNav />
        <TrackVisite />
      </body>
    </html>
  )
}
