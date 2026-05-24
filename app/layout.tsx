import type { Metadata } from 'next'
import './globals.css'
import AppShell from '@/components/AppShell'

export const metadata: Metadata = {
  title: 'DAHOMEY-TECH — La mode africaine à portée de clic',
  description: 'Marketplace de stylistes africains. Découvrez des créations uniques, commandez sur WhatsApp.',
  keywords: ['mode africaine', 'styliste', 'pagne', 'boubou', 'Bénin', 'wax'],
  openGraph: {
    title: 'DAHOMEY-TECH',
    description: 'Le futur de la mode africaine arrive.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
