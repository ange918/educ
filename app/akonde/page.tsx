'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import BarChart, { type BarPoint } from '@/components/BarChart'
import { Users, Eye, Fingerprint, Shirt, ShoppingBag, ShieldCheck, Lock, RefreshCw } from 'lucide-react'

type Serie = { jour: string; inscrits: number; visiteurs: number; tenues: number }
type AdminStats = {
  total_inscrits: number
  total_visiteurs: number
  visiteurs_uniques: number
  total_tenues: number
  total_ventes: number
  visites_7j: number
  series: Serie[]
  error?: string
}

export default function AkondePage() {
  const [code, setCode] = useState('')
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const charger = async (c: string) => {
    setError('')
    setLoading(true)
    const supabase = createClient()
    const { data, error: rpcErr } = await supabase.rpc('admin_stats_code', { p_code: c, p_days: 30 })
    setLoading(false)
    if (rpcErr) { setError('Une erreur est survenue. Réessayez.'); return }
    if (!data || data.error) { setError('Code d\'accès incorrect.'); return }
    setStats(data as AdminStats)
  }

  // ── Écran code d'accès ──
  if (!stats) {
    return (
      <div style={{ background: '#0E0E10', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
        <div style={{ width: '100%', maxWidth: '400px', background: '#17181B', border: '1px solid #26272B', borderRadius: '20px', padding: '2.5rem 2rem', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'linear-gradient(135deg, #008751, #00c766)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
            <ShieldCheck size={30} color="#0E0E10" />
          </div>
          <h1 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: '#fff', marginBottom: '0.4rem' }}>Tableau de bord</h1>
          <p style={{ color: '#8A8D93', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', marginBottom: '2rem' }}>Espace administrateur DAHOMEY-TECH</p>

          <form onSubmit={e => { e.preventDefault(); charger(code) }}>
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
              <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#5A5D63' }} />
              <input
                type="password" autoFocus value={code} onChange={e => setCode(e.target.value)}
                placeholder="Code d'accès"
                style={{ width: '100%', background: '#0E0E10', border: `1px solid ${error ? '#E8112D' : '#2E2F33'}`, borderRadius: '12px', color: '#fff', padding: '0.95rem 1rem 0.95rem 2.75rem', fontSize: '0.95rem', fontFamily: 'Inter, sans-serif', outline: 'none' }}
              />
            </div>
            {error && <p style={{ color: '#E8112D', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', marginBottom: '1rem', textAlign: 'left' }}>{error}</p>}
            <button type="submit" disabled={loading || !code} style={{ width: '100%', background: loading || !code ? '#2E2F33' : 'linear-gradient(135deg, #008751, #00c766)', color: loading || !code ? '#5A5D63' : '#fff', padding: '0.95rem', borderRadius: '12px', fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.9rem', cursor: loading || !code ? 'not-allowed' : 'pointer', border: 'none', transition: 'all 0.2s' }}>
              {loading ? 'Vérification…' : 'Entrer'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ── Tableau de bord ──
  const series = stats.series || []
  const inscrits: BarPoint[] = series.map(s => ({ jour: s.jour, value: s.inscrits }))
  const visiteurs: BarPoint[] = series.map(s => ({ jour: s.jour, value: s.visiteurs }))
  const tenues: BarPoint[] = series.map(s => ({ jour: s.jour, value: s.tenues }))

  const cards = [
    { icon: <Eye size={20} color="#008751" />, val: stats.total_visiteurs, label: 'Visites totales' },
    { icon: <Fingerprint size={20} color="#C8972A" />, val: stats.visiteurs_uniques, label: 'Pages distinctes' },
    { icon: <Users size={20} color="#2E86DE" />, val: stats.total_inscrits, label: 'Stylistes inscrits' },
    { icon: <Shirt size={20} color="#E8112D" />, val: stats.total_tenues, label: 'Tenues totales' },
    { icon: <ShoppingBag size={20} color="#25D366" />, val: stats.total_ventes, label: 'Commandes' },
    { icon: <Eye size={20} color="#9B59B6" />, val: stats.visites_7j, label: 'Visites (7 jours)' },
  ]

  return (
    <div style={{ background: '#0E0E10', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.5rem 4rem' }}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '11px', background: 'linear-gradient(135deg, #008751, #00c766)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={20} color="#0E0E10" />
            </div>
            <div>
              <h1 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: '#fff' }}>DAHOMEY-TECH</h1>
              <p style={{ color: '#8A8D93', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem' }}>Tableau de bord — audience & interactions</p>
            </div>
          </div>
          <button onClick={() => charger(code)} disabled={loading} style={{ background: '#17181B', border: '1px solid #2E2F33', color: '#C8CACD', padding: '0.6rem 1rem', borderRadius: '10px', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <RefreshCw size={14} /> {loading ? 'Actualisation…' : 'Actualiser'}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.85rem', marginBottom: '2.5rem' }}>
          {cards.map(({ icon, val, label }) => (
            <div key={label} style={{ background: '#17181B', border: '1px solid #26272B', borderRadius: '14px', padding: '1.25rem' }}>
              <div style={{ marginBottom: '0.75rem' }}>{icon}</div>
              <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '1.7rem', color: '#fff', marginBottom: '0.2rem' }}>{Number(val).toLocaleString('fr-FR')}</div>
              <div style={{ color: '#8A8D93', fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#fff', marginBottom: '1.25rem' }}>Évolution · 30 derniers jours</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' }} className="akonde-charts">
          <BarChart data={visiteurs} color="#008751" titre="Visiteurs" icone="bxs-show" />
          <BarChart data={inscrits} color="#C8972A" titre="Nouveaux inscrits" icone="bxs-user-plus" />
          <BarChart data={tenues} color="#E8112D" titre="Tenues ajoutées" icone="bxs-t-shirt" />
        </div>

        <p style={{ textAlign: 'center', marginTop: '3rem', color: '#5A5D63', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem' }}>
          DAHOMEY-TECH · alimenté par Supabase — <Link href="/" style={{ color: '#008751' }}>retour au site</Link>
        </p>
      </div>
    </div>
  )
}
