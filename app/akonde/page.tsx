'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import AreaChart from '@/components/AreaChart'
import DonutChart, { type DonutSlice } from '@/components/DonutChart'
import { Eye, MousePointerClick, Fingerprint, CalendarDays, ShieldCheck, Lock, RefreshCw, Users, BadgeCheck } from 'lucide-react'

type Serie = { jour: string; visites: number; clics: number }
type Elem = { element: string; total: number }
type StylisteRow = {
  id: string
  nom: string
  ville: string | null
  email: string | null
  whatsapp: string | null
  verified: boolean
  created_at: string
  nb_tenues: number
  nb_tenues_dispo: number
  nb_vues: number
  nb_commandes: number
  nb_clics_profil: number
}
type Stats = {
  total_visiteurs: number
  total_clics: number
  visiteurs_uniques: number
  visites_7j: number
  visites_aujourdhui: number
  clics_aujourdhui: number
  par_appareil: { ordinateur: number; mobile: number; inconnu: number }
  clics_par_element: Elem[]
  series: Serie[]
  stylistes?: StylisteRow[]
  error?: string
}

const PALETTE = ['#008751', '#2E86DE', '#C8972A', '#E8112D', '#9B59B6', '#25D366', '#E67E22', '#16A085']

export default function AkondePage() {
  const [code, setCode] = useState('')
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const charger = async (c: string) => {
    setError('')
    setLoading(true)
    const supabase = createClient()
    const { data, error: rpcErr } = await supabase.rpc('admin_stats_code', { p_code: c, p_days: 14 })
    setLoading(false)
    if (rpcErr) { setError('Une erreur est survenue. Réessayez.'); return }
    if (!data || data.error) { setError('Code d\'accès incorrect.'); return }
    setStats(data as Stats)
  }

  // ── Écran code d'accès ──
  if (!stats) {
    return (
      <div style={{ background: '#0E0E10', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
        <div style={{ width: '100%', maxWidth: '400px', background: '#17181B', border: '1px solid #26272B', borderRadius: '20px', padding: '2.5rem 2rem', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'linear-gradient(135deg, #008751, #00c766)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
            <ShieldCheck size={30} color="#0E0E10" />
          </div>
          <h1 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: '#fff', marginBottom: '0.4rem' }}>Tableau de bord</h1>
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
            <button type="submit" disabled={loading || !code} style={{ width: '100%', background: loading || !code ? '#2E2F33' : 'linear-gradient(135deg, #008751, #00c766)', color: loading || !code ? '#5A5D63' : '#fff', padding: '0.95rem', borderRadius: '12px', fontFamily: 'Orbitron, sans-serif', fontWeight: 700, fontSize: '0.9rem', cursor: loading || !code ? 'not-allowed' : 'pointer', border: 'none', transition: 'all 0.2s' }}>
              {loading ? 'Vérification…' : 'Entrer'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ── Tableau de bord ──
  const stylistes = stats.stylistes || []
  const cards = [
    { icon: <Users size={18} color="#25D366" />, val: stylistes.length, label: 'Stylistes inscrits', sub: `${stylistes.filter(s => s.verified).length} vérifiés` },
    { icon: <Eye size={18} color="#008751" />, val: stats.total_visiteurs, label: 'Visites totales', sub: `+${stats.visites_aujourdhui} aujourd'hui` },
    { icon: <MousePointerClick size={18} color="#2E86DE" />, val: stats.total_clics, label: 'Clics totaux', sub: `+${stats.clics_aujourdhui} aujourd'hui` },
    { icon: <Fingerprint size={18} color="#C8972A" />, val: stats.visiteurs_uniques, label: 'Pages distinctes', sub: 'sessions distinctes' },
    { icon: <CalendarDays size={18} color="#9B59B6" />, val: stats.visites_7j, label: 'Visites (7 jours)', sub: 'semaine en cours' },
  ]

  const appareil: DonutSlice[] = [
    { label: 'Ordinateur', value: stats.par_appareil?.ordinateur || 0, color: '#008751' },
    { label: 'Mobile', value: stats.par_appareil?.mobile || 0, color: '#2E86DE' },
    { label: 'Inconnu', value: stats.par_appareil?.inconnu || 0, color: '#5A5D63' },
  ]
  const elements: DonutSlice[] = (stats.clics_par_element || []).map((e, i) => ({
    label: e.element, value: e.total, color: PALETTE[i % PALETTE.length],
  }))

  return (
    <div style={{ background: '#0E0E10', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.5rem 4rem' }}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '11px', background: 'linear-gradient(135deg, #008751, #00c766)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={20} color="#0E0E10" />
            </div>
            <div>
              <h1 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: '#fff' }}>DAHOMEY-TECH</h1>
              <p style={{ color: '#8A8D93', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem' }}>Tableau de bord — audience & interactions</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#25D366', fontFamily: 'Inter, sans-serif', fontSize: '0.78rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#25D366' }} /> Données en direct
            </span>
            <button onClick={() => charger(code)} disabled={loading} style={{ background: '#17181B', border: '1px solid #2E2F33', color: '#C8CACD', padding: '0.55rem 0.9rem', borderRadius: '10px', fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <RefreshCw size={13} /> {loading ? '…' : 'Actualiser'}
            </button>
          </div>
        </div>

        {/* Cartes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '0.85rem', marginBottom: '1.5rem' }}>
          {cards.map(({ icon, val, label, sub }) => (
            <div key={label} style={{ background: '#17181B', border: '1px solid #26272B', borderRadius: '14px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#8A8D93', fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.6rem' }}>
                {icon} {label}
              </div>
              <div style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 800, fontSize: '1.9rem', color: '#fff', marginBottom: '0.15rem' }}>{Number(val).toLocaleString('fr-FR')}</div>
              <div style={{ color: '#25D366', fontFamily: 'Inter, sans-serif', fontSize: '0.72rem' }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* Courbe */}
        <div style={{ marginBottom: '1.5rem' }}>
          <AreaChart data={stats.series || []} />
        </div>

        {/* Camemberts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <DonutChart data={appareil} titre="Par appareil" sousTitre="Répartition des visites" />
          <DonutChart data={elements} titre="Clics par élément" sousTitre="Boutons & liens les plus cliqués" />
        </div>

        {/* Stylistes inscrits */}
        <div style={{ background: '#17181B', border: '1px solid #26272B', borderRadius: '14px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users size={16} color="#25D366" /> Stylistes inscrits
              </h2>
              <p style={{ color: '#8A8D93', fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', marginTop: '0.25rem' }}>Détail par styliste — tenues publiées, vues, commandes</p>
            </div>
            <span style={{ background: 'rgba(37,211,102,0.12)', color: '#25D366', fontFamily: 'Orbitron, sans-serif', fontWeight: 700, fontSize: '0.85rem', padding: '0.35rem 0.75rem', borderRadius: '999px' }}>
              {stylistes.length} au total
            </span>
          </div>

          {stylistes.length === 0 ? (
            <p style={{ color: '#5A5D63', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', textAlign: 'center', padding: '1.5rem 0' }}>Aucun styliste inscrit pour le moment.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '640px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #26272B' }}>
                    {['Styliste', 'Ville', 'Statut', 'Tenues', 'Dispo.', 'Vues', 'Commandes', 'Clics profil'].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '0.6rem 0.75rem', color: '#8A8D93', fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stylistes.map(s => (
                    <tr key={s.id} style={{ borderBottom: '1px solid #1D1E22' }}>
                      <td style={{ padding: '0.7rem 0.75rem' }}>
                        <div style={{ color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', fontWeight: 600 }}>{s.nom}</div>
                        {s.whatsapp && <div style={{ color: '#5A5D63', fontFamily: 'Inter, sans-serif', fontSize: '0.72rem' }}>{s.whatsapp}</div>}
                      </td>
                      <td style={{ padding: '0.7rem 0.75rem', color: '#C8CACD', fontFamily: 'Inter, sans-serif', fontSize: '0.82rem' }}>{s.ville || '—'}</td>
                      <td style={{ padding: '0.7rem 0.75rem' }}>
                        {s.verified ? (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: '#25D366', fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 600 }}>
                            <BadgeCheck size={13} /> Vérifié
                          </span>
                        ) : (
                          <span style={{ color: '#5A5D63', fontFamily: 'Inter, sans-serif', fontSize: '0.78rem' }}>En attente</span>
                        )}
                      </td>
                      <td style={{ padding: '0.7rem 0.75rem', color: '#fff', fontFamily: 'Orbitron, sans-serif', fontSize: '0.85rem' }}>{s.nb_tenues}</td>
                      <td style={{ padding: '0.7rem 0.75rem', color: '#C8CACD', fontFamily: 'Inter, sans-serif', fontSize: '0.82rem' }}>{s.nb_tenues_dispo}</td>
                      <td style={{ padding: '0.7rem 0.75rem', color: '#C8CACD', fontFamily: 'Inter, sans-serif', fontSize: '0.82rem' }}>{s.nb_vues}</td>
                      <td style={{ padding: '0.7rem 0.75rem', color: '#C8CACD', fontFamily: 'Inter, sans-serif', fontSize: '0.82rem' }}>{s.nb_commandes}</td>
                      <td style={{ padding: '0.7rem 0.75rem', color: '#C8CACD', fontFamily: 'Inter, sans-serif', fontSize: '0.82rem' }}>{s.nb_clics_profil}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p style={{ textAlign: 'center', marginTop: '3rem', color: '#5A5D63', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem' }}>
          DAHOMEY-TECH · alimenté par Supabase — <Link href="/" style={{ color: '#008751' }}>retour au site</Link>
        </p>
      </div>
    </div>
  )
}
