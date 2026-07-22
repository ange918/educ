'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

// Enregistre une visite de page pour les statistiques administrateur.
export default function TrackVisite() {
  const pathname = usePathname()
  useEffect(() => {
    const supabase = createClient()
    supabase.rpc('track_visite', { p_path: pathname }).then(() => {})
  }, [pathname])
  return null
}
