'use client'
import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

// Enregistre un clic/visite sur la page publique d'un styliste.
export default function TrackProfilVue({ stylisteId }: { stylisteId: string }) {
  useEffect(() => {
    if (!stylisteId) return
    const supabase = createClient()
    supabase.rpc('track_profil_vue', { p_styliste_id: stylisteId }).then(() => {})
  }, [stylisteId])
  return null
}
