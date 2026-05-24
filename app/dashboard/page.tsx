'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { formatPrix } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import type { Styliste, Tenue } from '@/lib/supabase/types'
import { Shirt, Eye, ShoppingBag, Star, Plus, Pencil, Trash2, MapPin, ExternalLink, MessageCircle, TrendingUp, CheckCircle, XCircle, LogOut } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const [styliste, setStyliste] = useState<Styliste | null>(null)
  const [tenues, setTenues] = useState<Tenue[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }

      const [{ data: stylisteData }, { data: tenuesData }] = await Promise.all([
        supabase.from('stylistes').select('*').eq('id', user.id).single(),
        supabase.from('tenues').select('*').eq('styliste_id', user.id).order('created_at', { ascending: false }),
      ])

      setStyliste(stylisteData)
      setTenues(tenuesData || [])
      setLoading(false)
    }
    load()
  }, [router])

  const handleToggleDisponible = async (id: string, current: boolean) => {
    const supabase = createClient()
    const { error } = await supabase.from('tenues').update({ disponible: !current }).eq('id', id)
    if (!error) {
      setTenues(prev => prev.map(t => t.id === id ? { ...t, disponible: !current } : t))
    }
  }

  const handleSupprimer = async (id: string) => {
    if (!confirm('Supprimer cette tenue ?')) return
    const supabase = createClient()
    const { error } = await supabase.from('tenues').delete().eq('id', id)
    if (!error) setTenues(prev => prev.filter(t => t.id !== id))
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  if (loading) {
    return (
      <div style={{ background: '#0A0A0A', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: '#555' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid #1a1a1a', borderTopColor: '#008751', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }} />
          <p style={{ fontFamily: 'Montserrat, sans-serif' }}>Chargement...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      </div>
    )
  }

  const totalVues = tenues.reduce((sum, t) => sum + (t.vues || 0), 0)

  const statCards = [
    { bg: 'rgba(0,135,81,0.12)', border: 'rgba(0,135,81,0.25)', icon: <Shirt size={22} color="#008751" />, val: tenues.length, label: 'Tenues publiées', sub: `${tenues.filter(t => t.disponible).length} disponibles`, subColor: '#008751' },
    { bg: 'rgba(252,209,22,0.1)', border: 'rgba(252,209,22,0.2)', icon: <Eye size={22} color="#FCD116" />, val: totalVues.toLocaleString(), label: 'Vues totales', sub: 'Toutes tenues', subColor: '#FCD116' },
    { bg: 'rgba(37,211,102,0.1)', border: 'rgba(37,211,102,0.2)', icon: <ShoppingBag size={22} color="#25D366" />, val: '—', label: 'Commandes WhatsApp', sub: 'Via la plateforme', subColor: '#25D366' },
    { bg: 'rgba(232,17,45,0.1)', border: 'rgba(232,17,45,0.2)', icon: <Star size={22} color="#E8112D" fill="#E8112D" />, val: styliste?.verified ? 'Vérifié' : 'En attente', label: 'Statut du compte', sub: styliste?.verified ? 'Compte certifié ✓' : 'Vérification en cours', subColor: styliste?.verified ? '#008751' : '#E8112D' },
  ]

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ paddingTop: '72px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem 5rem' }}>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ position: 'relative', width: '64px', height: '64px', flexShrink: 0 }}>
                {styliste?.photo_url ? (
                  <Image src={styliste.photo_url} alt={styliste.nom} fill style={{ objectFit: 'cover', borderRadius: '50%', border: '3px solid #008751' }} />
                ) : (
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '3px solid #008751', background: 'rgba(0,135,81,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: '1.4rem', color: '#008751' }}>
                    {styliste?.nom?.[0]?.toUpperCase() || '?'}
                  </div>
                )}
              </div>
              <div>
                <p style={{ color: '#666', fontFamily: 'Montserrat, sans-serif', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Bonjour 👋</p>
                <h1 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: '1.5rem' }}>{styliste?.nom || '—'}</h1>
                <p style={{ color: '#888', fontFamily: 'Montserrat, sans-serif', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem' }}>
                  <MapPin size={12} color="#008751" /> {styliste?.ville || '—'}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button onClick={handleLogout} style={{ background: 'transparent', border: '1px solid #2a2a2a', color: '#888', padding: '0.875rem 1.25rem', borderRadius: '12px', fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#E8112D'; (e.currentTarget as HTMLElement).style.color = '#E8112D' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#2a2a2a'; (e.currentTarget as HTMLElement).style.color = '#888' }}>
                <LogOut size={16} /> Déconnexion
              </button>
              <Link href="/dashboard/tenues/nouvelle">
                <button style={{ background: 'linear-gradient(135deg, #008751, #00a862)', color: '#fff', padding: '0.875rem 1.75rem', borderRadius: '12px', fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem', border: 'none', boxShadow: '0 4px 20px rgba(0,135,81,0.3)', transition: 'all 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'none')}>
                  <Plus size={18} /> Ajouter une tenue
                </button>
              </Link>
            </div>
          </div>

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

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            {[
              { label: 'Modifier mon profil', href: '/dashboard/profil', icon: <Pencil size={15} />, color: '#FCD116' },
              { label: 'Voir ma page publique', href: styliste?.slug ? `/styliste/${styliste.slug}` : '#', icon: <ExternalLink size={15} />, color: '#008751' },
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
              {tenues.map(tenue => {
                const photo = tenue.photo_principale || tenue.photos?.[0]
                return (
                  <div key={tenue.id} style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '1.25rem', display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap', transition: 'border-color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = '#2a2a2a')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = '#1a1a1a')}>
                    <div style={{ position: 'relative', width: '72px', height: '72px', flexShrink: 0, borderRadius: '10px', overflow: 'hidden', background: '#1a1a1a' }}>
                      {photo ? (
                        <Image src={photo} alt={tenue.nom} fill style={{ objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Shirt size={24} color="#333" />
                        </div>
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: '150px' }}>
                      <h3 style={{ fontFamily: 'Unbounded, sans-serif', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.25rem' }}>{tenue.nom}</h3>
                      <p style={{ color: '#666', fontSize: '0.75rem', fontFamily: 'Montserrat, sans-serif', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Eye size={11} color="#555" /> {tenue.vues} vues · {tenue.categorie}
                      </p>
                    </div>
                    <div style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, color: '#FCD116', fontSize: '1rem' }}>{formatPrix(tenue.prix)}</div>
                    <button
                      onClick={() => handleToggleDisponible(tenue.id, tenue.disponible)}
                      style={{ padding: '0.3rem 0.75rem', borderRadius: '50px', fontSize: '0.65rem', fontWeight: 700, fontFamily: 'Montserrat, sans-serif', background: tenue.disponible ? 'rgba(0,135,81,0.15)' : 'rgba(232,17,45,0.15)', color: tenue.disponible ? '#008751' : '#E8112D', border: `1px solid ${tenue.disponible ? '#008751' : '#E8112D'}44`, display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                      {tenue.disponible ? <CheckCircle size={11} /> : <XCircle size={11} />}
                      {tenue.disponible ? 'Disponible' : 'Épuisé'}
                    </button>
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
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
