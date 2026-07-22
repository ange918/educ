'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { createClient } from '@/lib/supabase/client'
import BarChart, { type BarPoint } from '@/components/BarChart'
import { Users, Eye, Shirt, ShoppingBag, ShieldCheck, ArrowLeft, Lock } from 'lucide-react'

type Serie = { jour: string; inscrits: number; visiteurs: number; tenues: number }
type AdminStats = {
  total_inscrits: number
  total_visiteurs: number
  total_tenues: number
  total_ventes: number
  series: Serie[]
  error?: string
}

export default function AdminPage() {
  const router = useRouter()
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [refuse, setRefuse] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }
      const { data } = await supabase.rpc('admin_stats', { p_days: 30 })
      if (!data || data.error) { setRefuse(true); setLoading(false); return }
      setStats(data as AdminStats)
      setLoading(false)
    }
    load()
  }, [router])

  if (loading) {
    return (
      <div style={{ background: '#F7F5EF', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid #E7E3D8', borderTopColor: '#008751', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  if (refuse) {
    return (
      <div className="pb-bottomnav" style={{ background: '#F7F5EF', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '400px' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(232,17,45,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <Lock size={32} color="#E8112D" />
            </div>
            <h1 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '1.3rem', color: '#14201A', marginBottom: '0.5rem' }}>Accès réservé</h1>
            <p style={{ color: '#6E7268', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
              Cette zone est réservée à l&apos;administrateur de la plateforme.
            </p>
            <Link href="/dashboard">
              <button style={{ background: '#008751', color: '#fff', padding: '0.85rem 1.75rem', borderRadius: '10px', fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <ArrowLeft size={16} /> Mon tableau de bord
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!stats) return null

  const series = stats.series || []
  const inscrits: BarPoint[] = series.map(s => ({ jour: s.jour, value: s.inscrits }))
  const visiteurs: BarPoint[] = series.map(s => ({ jour: s.jour, value: s.visiteurs }))
  const tenues: BarPoint[] = series.map(s => ({ jour: s.jour, value: s.tenues }))

  const cards = [
    { icon: <Users size={22} color="#008751" />, bg: 'rgba(0,135,81,0.12)', border: 'rgba(0,135,81,0.25)', val: stats.total_inscrits, label: 'Stylistes inscrits' },
    { icon: <Eye size={22} color="#C8972A" />, bg: 'rgba(200,151,42,0.12)', border: 'rgba(200,151,42,0.25)', val: stats.total_visiteurs, label: 'Visiteurs (pages vues)' },
    { icon: <Shirt size={22} color="#E8112D" />, bg: 'rgba(232,17,45,0.1)', border: 'rgba(232,17,45,0.2)', val: stats.total_tenues, label: 'Tenues totales' },
    { icon: <ShoppingBag size={22} color="#25D366" />, bg: 'rgba(37,211,102,0.1)', border: 'rgba(37,211,102,0.2)', val: stats.total_ventes, label: 'Commandes totales' },
  ]

  return (
    <div className="pb-bottomnav" style={{ background: '#F7F5EF', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem 5rem' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <ShieldCheck size={26} color="#008751" />
          <h1 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '1.6rem', color: '#14201A' }}>Tableau de bord administrateur</h1>
        </div>
        <p style={{ color: '#6E7268', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', marginBottom: '2.5rem' }}>
          Vue d&apos;ensemble de la plateforme DAHOMEY-TECH
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
          {cards.map(({ icon, bg, border, val, label }) => (
            <div key={label} style={{ background: bg, border: `1px solid ${border}`, borderRadius: '16px', padding: '1.75rem' }}>
              <div style={{ marginBottom: '1rem' }}>{icon}</div>
              <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '1.8rem', color: '#14201A', marginBottom: '0.25rem' }}>{val.toLocaleString('fr-FR')}</div>
              <div style={{ color: '#6E7268', fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: '#14201A', marginBottom: '1.5rem' }}>
          Évolution · 30 derniers jours
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <BarChart data={inscrits} color="#008751" titre="Nouveaux inscrits" icone="bxs-user-plus" />
          <BarChart data={visiteurs} color="#C8972A" titre="Visiteurs" icone="bxs-show" />
          <BarChart data={tenues} color="#E8112D" titre="Tenues ajoutées" icone="bxs-t-shirt" />
        </div>
      </div>
    </div>
  )
}
