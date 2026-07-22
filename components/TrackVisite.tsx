'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

function device(): string {
  if (typeof window === 'undefined') return 'inconnu'
  return window.innerWidth <= 768 ? 'mobile' : 'ordinateur'
}

// Enregistre une visite de page (avec l'appareil) pour les stats admin,
// et écoute les clics sur les éléments marqués data-track="...".
export default function TrackVisite() {
  const pathname = usePathname()

  useEffect(() => {
    const supabase = createClient()
    supabase.rpc('track_visite', { p_path: pathname, p_device: device() }).then(() => {})
  }, [pathname])

  useEffect(() => {
    const supabase = createClient()
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest('[data-track]') as HTMLElement | null
      if (!el) return
      const label = el.getAttribute('data-track') || '(autre)'
      supabase.rpc('track_clic', { p_element: label, p_device: device() }).then(() => {})
    }
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])

  return null
}
