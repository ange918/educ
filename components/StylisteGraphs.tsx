'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import BarChart, { type BarPoint } from './BarChart'
import { BarChart3 } from 'lucide-react'

type Serie = { jour: string; tenues: number; ventes: number; clics: number }
type Stats = {
  total_tenues: number
  total_ventes: number
  total_clics_profil: number
  total_vues_tenues: number
  ca_total: number
  series: Serie[]
}

export default function StylisteGraphs() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase.rpc('styliste_stats', { p_days: 30 }).then(({ data }) => {
      if (data && !data.error) setStats(data as Stats)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div style={{ background: '#FFFFFF', border: '1px solid #E7E3D8', borderRadius: '16px', padding: '3rem', textAlign: 'center', color: '#9AA093' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '3px solid #E7E3D8', borderTopColor: '#008751', animation: 'spin 0.8s linear infinite', margin: '0 auto' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }
  if (!stats) return null

  const series = stats.series || []
  const tenues: BarPoint[] = series.map(s => ({ jour: s.jour, value: s.tenues }))
  const ventes: BarPoint[] = series.map(s => ({ jour: s.jour, value: s.ventes }))
  const clics: BarPoint[] = series.map(s => ({ jour: s.jour, value: s.clics }))

  return (
    <div style={{ marginTop: '3.5rem' }}>
      <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '1.2rem', marginBottom: '1.5rem', color: '#14201A', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <BarChart3 size={20} color="#008751" /> Mes statistiques <span style={{ color: '#9AA093', fontWeight: 500, fontSize: '0.9rem' }}>· 30 derniers jours</span>
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '1rem' }}>
        <BarChart data={tenues} color="#008751" titre="Tenues ajoutées" icone="bxs-t-shirt" />
        <BarChart data={ventes} color="#C8972A" titre="Ventes / commandes" icone="bxs-cart" />
        <BarChart data={clics} color="#E8112D" titre="Clics sur mon profil" icone="bxs-mouse" />
      </div>
    </div>
  )
}
