'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import { TENUES, STYLISTES } from '@/lib/mockData'
import { formatPrix } from '@/lib/utils'

const MOI = STYLISTES[0]
const MES_TENUES = TENUES.filter(t => t.styliste_id === MOI.id)

export default function DashboardPage() {
  const [tenues, setTenues] = useState(MES_TENUES)

  const handleSupprimer = (id: string) => {
    if (confirm('Supprimer cette tenue ?')) {
      setTenues(tenues.filter(t => t.id !== id))
    }
  }

  const card = (bg: string, icon: string, val: number | string, label: string, sub?: string) => (
    <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: '16px', padding: '1.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>{icon}</div>
      </div>
      <div style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: '1.8rem', color: '#fff', marginBottom: '0.25rem' }}>{val}</div>
      <div style={{ color: '#555', fontFamily: 'Montserrat, sans-serif', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
      {sub && <div style={{ color: '#008751', fontFamily: 'Montserrat, sans-serif', fontSize: '0.75rem', marginTop: '0.5rem' }}>{sub}</div>}
    </div>
  )

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ paddingTop: '72px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem 5rem' }}>

          {/* En-tête profil */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ position: 'relative', width: '64px', height: '64px', flexShrink: 0 }}>
                <Image src={MOI.photo} alt={MOI.nom} fill style={{ objectFit: 'cover', borderRadius: '50%', border: '3px solid #008751' }} />
              </div>
              <div>
                <p style={{ color: '#666', fontFamily: 'Montserrat, sans-serif', fontSize: '0.8rem', marginBottom: '0.25rem' }}>Bonjour 👋</p>
                <h1 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: '1.5rem' }}>{MOI.nom}</h1>
                <p style={{ color: '#888', fontFamily: 'Montserrat, sans-serif', fontSize: '0.8rem' }}>📍 {MOI.ville}</p>
              </div>
            </div>
            <Link href="/dashboard/tenues/nouvelle">
              <button style={{ background: 'linear-gradient(135deg, #008751, #00a862)', color: '#fff', padding: '0.875rem 1.75rem', borderRadius: '12px', fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem', border: 'none', boxShadow: '0 4px 20px rgba(0,135,81,0.3)', transition: 'all 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'none')}>
                + Ajouter une tenue
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
            {card('rgba(0,135,81,0.15)', '👗', tenues.length, 'Tenues publiées', '+2 ce mois')}
            {card('rgba(252,209,22,0.15)', '👁', MOI.nb_vues.toLocaleString(), 'Vues totales', '↑ 12% cette semaine')}
            {card('rgba(37,211,102,0.15)', '📱', MOI.nb_commandes, 'Commandes WhatsApp', '↑ 8 nouvelles')}
            {card('rgba(232,17,45,0.15)', '⭐', '4.8/5', 'Note moyenne', '156 avis')}
          </div>

          {/* Liens rapides */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            {[
              { label: 'Modifier mon profil', href: '/dashboard/profil', icon: '✏️', color: '#FCD116' },
              { label: 'Voir ma page publique', href: `/styliste/${MOI.slug}`, icon: '🔗', color: '#008751' },
              { label: 'Contacter le support', href: '#', icon: '💬', color: '#E8112D' },
            ].map(({ label, href, icon, color }) => (
              <Link key={label} href={href}>
                <button style={{ background: '#111', border: `1px solid ${color}22`, color: '#fff', padding: '0.75rem 1.25rem', borderRadius: '10px', fontFamily: 'Montserrat, sans-serif', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = color; (e.currentTarget as HTMLElement).style.background = `${color}10` }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${color}22`; (e.currentTarget as HTMLElement).style.background = '#111' }}>
                  {icon} {label}
                </button>
              </Link>
            ))}
          </div>

          {/* Liste tenues */}
          <div>
            <h2 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: '1.2rem', marginBottom: '1.5rem' }}>
              Mes tenues <span style={{ color: '#FCD116' }}>({tenues.length})</span>
            </h2>

            {tenues.length === 0 ? (
              <div style={{ background: '#111', border: '2px dashed #2a2a2a', borderRadius: '16px', padding: '4rem 2rem', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👗</div>
                <p style={{ fontFamily: 'Unbounded, sans-serif', color: '#555', marginBottom: '1.5rem' }}>Aucune tenue publiée</p>
                <Link href="/dashboard/tenues/nouvelle">
                  <button style={{ background: '#008751', color: '#fff', padding: '0.875rem 1.75rem', borderRadius: '10px', fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', border: 'none' }}>
                    + Publier ma première tenue
                  </button>
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {tenues.map(tenue => (
                  <div key={tenue.id} style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '1.25rem', display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap', transition: 'border-color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = '#2a2a2a')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = '#1a1a1a')}>
                    <div style={{ position: 'relative', width: '72px', height: '72px', flexShrink: 0, borderRadius: '10px', overflow: 'hidden' }}>
                      <Image src={tenue.photos[0]} alt={tenue.nom} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: '150px' }}>
                      <h3 style={{ fontFamily: 'Unbounded, sans-serif', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.25rem' }}>{tenue.nom}</h3>
                      <p style={{ color: '#666', fontSize: '0.75rem', fontFamily: 'Montserrat, sans-serif' }}>{tenue.categorie.replace('-', ' ')} · {tenue.vues} vues</p>
                    </div>
                    <div style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, color: '#FCD116', fontSize: '1rem' }}>{formatPrix(tenue.prix)}</div>
                    <span style={{ padding: '0.3rem 0.75rem', borderRadius: '50px', fontSize: '0.65rem', fontWeight: 700, fontFamily: 'Montserrat, sans-serif', background: tenue.disponible ? 'rgba(0,135,81,0.15)' : 'rgba(232,17,45,0.15)', color: tenue.disponible ? '#008751' : '#E8112D', border: `1px solid ${tenue.disponible ? '#008751' : '#E8112D'}44` }}>
                      {tenue.disponible ? '● Disponible' : '○ Épuisé'}
                    </span>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Link href={`/dashboard/tenues/modifier/${tenue.id}`}>
                        <button style={{ background: 'rgba(252,209,22,0.1)', border: '1px solid rgba(252,209,22,0.2)', color: '#FCD116', padding: '0.5rem 1rem', borderRadius: '8px', fontFamily: 'Montserrat, sans-serif', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>✏️ Modifier</button>
                      </Link>
                      <button onClick={() => handleSupprimer(tenue.id)} style={{ background: 'rgba(232,17,45,0.1)', border: '1px solid rgba(232,17,45,0.2)', color: '#E8112D', padding: '0.5rem 1rem', borderRadius: '8px', fontFamily: 'Montserrat, sans-serif', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>🗑 Supprimer</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
