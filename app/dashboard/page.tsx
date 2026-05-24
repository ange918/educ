'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import { TENUES, STYLISTES } from '@/lib/mockData'
import { formatPrix } from '@/lib/utils'
import { Shirt, Eye, ShoppingBag, Star, Plus, Pencil, Trash2, MapPin, ExternalLink, MessageCircle, TrendingUp, CheckCircle, XCircle } from 'lucide-react'

const MOI = STYLISTES[0]
const MES_TENUES = TENUES.filter(t => t.styliste_id === MOI.id)

export default function DashboardPage() {
  const [tenues, setTenues] = useState(MES_TENUES)

  const handleSupprimer = (id: string) => {
    if (confirm('Supprimer cette tenue ?')) setTenues(tenues.filter(t => t.id !== id))
  }

  const statCards = [
    { bg: 'rgba(0,135,81,0.12)', border: 'rgba(0,135,81,0.25)', icon: <Shirt size={22} color="#008751" />, val: tenues.length, label: 'Tenues publiées', sub: '+2 ce mois', subColor: '#008751' },
    { bg: 'rgba(252,209,22,0.1)', border: 'rgba(252,209,22,0.2)', icon: <Eye size={22} color="#FCD116" />, val: MOI.nb_vues.toLocaleString(), label: 'Vues totales', sub: '↑ 12% cette semaine', subColor: '#FCD116' },
    { bg: 'rgba(37,211,102,0.1)', border: 'rgba(37,211,102,0.2)', icon: <ShoppingBag size={22} color="#25D366" />, val: MOI.nb_commandes, label: 'Commandes WhatsApp', sub: '↑ 8 nouvelles', subColor: '#25D366' },
    { bg: 'rgba(232,17,45,0.1)', border: 'rgba(232,17,45,0.2)', icon: <Star size={22} color="#E8112D" fill="#E8112D" />, val: '4.8/5', label: 'Note moyenne', sub: '156 avis', subColor: '#E8112D' },
  ]

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ paddingTop: '72px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem 5rem' }}>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ position: 'relative', width: '64px', height: '64px', flexShrink: 0 }}>
                <Image src={MOI.photo} alt={MOI.nom} fill style={{ objectFit: 'cover', borderRadius: '50%', border: '3px solid #008751' }} />
              </div>
              <div>
                <p style={{ color: '#666', fontFamily: 'Montserrat, sans-serif', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Bonjour 👋</p>
                <h1 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: '1.5rem' }}>{MOI.nom}</h1>
                <p style={{ color: '#888', fontFamily: 'Montserrat, sans-serif', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem' }}>
                  <MapPin size={12} color="#008751" /> {MOI.ville}
                </p>
              </div>
            </div>
            <Link href="/dashboard/tenues/nouvelle">
              <button style={{ background: 'linear-gradient(135deg, #008751, #00a862)', color: '#fff', padding: '0.875rem 1.75rem', borderRadius: '12px', fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem', border: 'none', boxShadow: '0 4px 20px rgba(0,135,81,0.3)', transition: 'all 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'none')}>
                <Plus size={18} /> Ajouter une tenue
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
            {statCards.map(({ bg, border, icon, val, label, sub, subColor }) => (
              <div key={label} style={{ background: bg, border: `1px solid ${border}`, borderRadius: '16px', padding: '1.75rem' }}>
                <div style={{ marginBottom: '1rem' }}>{icon}</div>
                <div style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: '1.8rem', color: '#fff', marginBottom: '0.25rem' }}>{val}</div>
                <div style={{ color: '#666', fontFamily: 'Montserrat, sans-serif', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>{label}</div>
                <div style={{ color: subColor, fontFamily: 'Montserrat, sans-serif', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <TrendingUp size={11} /> {sub}
                </div>
              </div>
            ))}
          </div>

          {/* Raccourcis */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            {[
              { label: 'Modifier mon profil', href: '/dashboard/profil', icon: <Pencil size={15} />, color: '#FCD116' },
              { label: 'Voir ma page publique', href: `/styliste/${MOI.slug}`, icon: <ExternalLink size={15} />, color: '#008751' },
              { label: 'Contact support', href: '#', icon: <MessageCircle size={15} />, color: '#E8112D' },
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
          <h2 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Shirt size={20} color="#FCD116" /> Mes tenues <span style={{ color: '#FCD116' }}>({tenues.length})</span>
          </h2>

          {tenues.length === 0 ? (
            <div style={{ background: '#111', border: '2px dashed #2a2a2a', borderRadius: '16px', padding: '4rem 2rem', textAlign: 'center' }}>
              <Shirt size={48} color="#2a2a2a" style={{ margin: '0 auto 1rem' }} />
              <p style={{ fontFamily: 'Unbounded, sans-serif', color: '#555', marginBottom: '1.5rem' }}>Aucune tenue publiée</p>
              <Link href="/dashboard/tenues/nouvelle">
                <button style={{ background: '#008751', color: '#fff', padding: '0.875rem 1.75rem', borderRadius: '10px', fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Plus size={16} /> Publier ma première tenue
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
                    <p style={{ color: '#666', fontSize: '0.75rem', fontFamily: 'Montserrat, sans-serif', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Eye size={11} color="#555" /> {tenue.vues} vues · {tenue.categorie.replace('-', ' ')}
                    </p>
                  </div>
                  <div style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, color: '#FCD116', fontSize: '1rem' }}>{formatPrix(tenue.prix)}</div>
                  <span style={{ padding: '0.3rem 0.75rem', borderRadius: '50px', fontSize: '0.65rem', fontWeight: 700, fontFamily: 'Montserrat, sans-serif', background: tenue.disponible ? 'rgba(0,135,81,0.15)' : 'rgba(232,17,45,0.15)', color: tenue.disponible ? '#008751' : '#E8112D', border: `1px solid ${tenue.disponible ? '#008751' : '#E8112D'}44`, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    {tenue.disponible ? <CheckCircle size={11} /> : <XCircle size={11} />}
                    {tenue.disponible ? 'Disponible' : 'Épuisé'}
                  </span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link href={`/dashboard/tenues/modifier/${tenue.id}`}>
                      <button style={{ background: 'rgba(252,209,22,0.1)', border: '1px solid rgba(252,209,22,0.2)', color: '#FCD116', padding: '0.5rem 1rem', borderRadius: '8px', fontFamily: 'Montserrat, sans-serif', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Pencil size={13} /> Modifier
                      </button>
                    </Link>
                    <button onClick={() => handleSupprimer(tenue.id)} style={{ background: 'rgba(232,17,45,0.1)', border: '1px solid rgba(232,17,45,0.2)', color: '#E8112D', padding: '0.5rem 1rem', borderRadius: '8px', fontFamily: 'Montserrat, sans-serif', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Trash2 size={13} /> Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
