'use client'
import { useState, useMemo, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StylisteCard from '@/components/StylisteCard'
import { CATEGORIES, VILLES } from '@/lib/mockData'
import { formatPrix, buildWhatsAppLink } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import type { Tenue, Styliste } from '@/lib/supabase/types'
import { Search, SlidersHorizontal, X, LayoutGrid, Users, MapPin, MessageCircle, Tag, Eye } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const PRIX_MAX = 200000

type TenueWithStyliste = Tenue & { stylistes?: Styliste }

function TenueCardSupabase({ tenue }: { tenue: TenueWithStyliste }) {
  const [hovered, setHovered] = useState(false)
  const photo = tenue.photo_principale || tenue.photos?.[0] || '/visual1.jpg'
  const styliste = tenue.stylistes
  const whatsapp = styliste?.whatsapp || ''
  const wa = tenue.whatsapp_message
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(tenue.whatsapp_message)}`
    : buildWhatsAppLink(whatsapp, tenue.nom, tenue.prix)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: '#111', borderRadius: '16px', overflow: 'hidden', border: `1px solid ${hovered ? '#008751' : '#1a1a1a'}`, transition: 'all 0.3s ease', transform: hovered ? 'translateY(-6px)' : 'none', boxShadow: hovered ? '0 20px 60px rgba(0,135,81,0.2)' : '0 2px 8px rgba(0,0,0,0.3)', cursor: 'pointer' }}
    >
      <Link href={`/tenue/${tenue.id}`}>
        <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
          <Image src={photo} alt={tenue.nom} fill sizes="(max-width: 768px) 50vw, 25vw" style={{ objectFit: 'cover', transition: 'transform 0.5s ease', transform: hovered ? 'scale(1.08)' : 'scale(1)' }} />
          {!tenue.disponible && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ background: '#E8112D', color: '#fff', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'Unbounded, sans-serif' }}>ÉPUISÉ</span>
            </div>
          )}
          <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: 'rgba(0,135,81,0.9)', color: '#fff', padding: '0.3rem 0.75rem', borderRadius: '50px', fontSize: '0.65rem', fontWeight: 700, fontFamily: 'Unbounded, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Tag size={10} />{tenue.categorie}
          </div>
          <div style={{ position: 'absolute', bottom: '0.75rem', right: '0.75rem', background: 'rgba(0,0,0,0.7)', color: '#888', padding: '0.25rem 0.6rem', borderRadius: '50px', fontSize: '0.65rem', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Eye size={10} />{tenue.vues}
          </div>
        </div>
      </Link>
      <div style={{ padding: '1.25rem' }}>
        <Link href={`/tenue/${tenue.id}`}>
          <h3 style={{ fontFamily: 'Unbounded, sans-serif', fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem', lineHeight: 1.3 }}>{tenue.nom}</h3>
        </Link>
        <p style={{ color: '#888', fontSize: '0.75rem', marginBottom: '0.6rem', fontFamily: 'Montserrat, sans-serif', display: 'flex', alignItems: 'center', gap: '0.3rem', flexWrap: 'wrap' }}>
          <MapPin size={11} color="#008751" />
          {styliste?.ville || ''} · par{' '}
          <Link href={styliste?.slug ? `/styliste/${styliste.slug}` : '#'} style={{ color: '#FCD116' }}>{styliste?.nom || '—'}</Link>
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
          <span style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: '1rem', color: '#FCD116' }}>{formatPrix(tenue.prix)}</span>
          {tenue.disponible && whatsapp && (
            <a href={wa} target="_blank" rel="noopener noreferrer">
              <button style={{ background: '#25D366', color: '#fff', padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'Montserrat, sans-serif', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 4px 15px rgba(37,211,102,0.3)', border: 'none', cursor: 'pointer' }}>
                <MessageCircle size={13} fill="currentColor" />WhatsApp
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CataloguePage() {
  const [vue, setVue] = useState<'tenues' | 'stylistes'>('tenues')
  const [categorie, setCategorie] = useState('')
  const [ville, setVille] = useState('')
  const [prixMax, setPrixMax] = useState(PRIX_MAX)
  const [search, setSearch] = useState('')
  const [tenues, setTenues] = useState<TenueWithStyliste[]>([])
  const [stylistes, setStylistes] = useState<Styliste[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    const loadData = async () => {
      setLoading(true)
      const [{ data: tenuesData }, { data: stylistesData }] = await Promise.all([
        supabase
          .from('tenues')
          .select('*, stylistes(id, nom, whatsapp, slug, photo_url, ville)')
          .eq('disponible', true)
          .order('created_at', { ascending: false }),
        supabase
          .from('stylistes')
          .select('*')
          .order('created_at', { ascending: false }),
      ])
      setTenues((tenuesData as TenueWithStyliste[]) || [])
      setStylistes((stylistesData as Styliste[]) || [])
      setLoading(false)
    }
    loadData()
  }, [])

  const tenuesFiltrees = useMemo(() => {
    return tenues.filter(t => {
      if (categorie && t.categorie !== categorie) return false
      if (ville && t.stylistes?.ville !== ville) return false
      if (t.prix > prixMax) return false
      if (search) {
        const q = search.toLowerCase()
        if (!t.nom.toLowerCase().includes(q) && !t.stylistes?.nom?.toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [tenues, categorie, ville, prixMax, search])

  const stylistesFiltres = useMemo(() => {
    return stylistes.filter(s => {
      if (ville && s.ville !== ville) return false
      if (search) {
        const q = search.toLowerCase()
        if (!s.nom.toLowerCase().includes(q) && !s.ville.toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [stylistes, ville, search])

  const hasFilter = categorie || ville || prixMax < PRIX_MAX || search

  const inputStyle: React.CSSProperties = {
    background: '#111', border: '1px solid #2a2a2a', borderRadius: '10px', color: '#fff',
    padding: '0.75rem 1rem', fontSize: '0.875rem', fontFamily: 'Montserrat, sans-serif', width: '100%', cursor: 'pointer',
  }

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ paddingTop: '72px' }}>
        <div style={{ background: 'linear-gradient(180deg, #111 0%, #0A0A0A 100%)', padding: '4rem 2rem 2rem', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p style={{ color: '#008751', fontFamily: 'Unbounded, sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>DAHOMEY-TECH</p>
            <h1 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 3rem)', marginBottom: '2rem' }}>Catalogue</h1>

            <div style={{ display: 'inline-flex', background: '#1a1a1a', borderRadius: '50px', padding: '0.25rem', marginBottom: '2rem' }}>
              {([
                { key: 'tenues', label: 'Tenues', icon: <LayoutGrid size={14} /> },
                { key: 'stylistes', label: 'Stylistes', icon: <Users size={14} /> },
              ] as const).map(({ key, label, icon }) => (
                <button key={key} onClick={() => setVue(key)} style={{ padding: '0.6rem 1.5rem', borderRadius: '50px', border: 'none', fontFamily: 'Unbounded, sans-serif', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s', background: vue === key ? '#008751' : 'transparent', color: vue === key ? '#fff' : '#888', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  {icon}{label}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
                <Search size={14} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#555' }} />
                <input type="text" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} style={{ ...inputStyle, paddingLeft: '2.5rem' }} />
              </div>

              {vue === 'tenues' && (
                <div style={{ position: 'relative', flex: '1', minWidth: '180px' }}>
                  <SlidersHorizontal size={14} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#555', pointerEvents: 'none' }} />
                  <select value={categorie} onChange={e => setCategorie(e.target.value)} style={{ ...inputStyle, paddingLeft: '2.5rem' }}>
                    <option value="">Toutes catégories</option>
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>)}
                  </select>
                </div>
              )}

              <select value={ville} onChange={e => setVille(e.target.value)} style={{ ...inputStyle, maxWidth: '180px' }}>
                <option value="">Toutes villes</option>
                {VILLES.map(v => <option key={v} value={v}>{v}</option>)}
              </select>

              {vue === 'tenues' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: '240px' }}>
                  <span style={{ color: '#888', fontSize: '0.75rem', fontFamily: 'Montserrat, sans-serif', whiteSpace: 'nowrap' }}>Max: {new Intl.NumberFormat('fr-FR').format(prixMax)} XOF</span>
                  <input type="range" min={5000} max={PRIX_MAX} step={5000} value={prixMax} onChange={e => setPrixMax(Number(e.target.value))} style={{ accentColor: '#008751', flex: 1 }} />
                </div>
              )}

              {hasFilter && (
                <button onClick={() => { setCategorie(''); setVille(''); setPrixMax(PRIX_MAX); setSearch('') }} style={{ background: 'rgba(232,17,45,0.12)', border: '1px solid rgba(232,17,45,0.3)', color: '#E8112D', padding: '0.75rem 1.1rem', borderRadius: '10px', fontFamily: 'Montserrat, sans-serif', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <X size={14} /> Réinitialiser
                </button>
              )}
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2.5rem 2rem 5rem' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '5rem 2rem', color: '#555' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid #1a1a1a', borderTopColor: '#008751', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }} />
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.9rem' }}>Chargement du catalogue...</p>
              <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
            </div>
          ) : (
            <>
              <p style={{ color: '#555', fontFamily: 'Montserrat, sans-serif', fontSize: '0.875rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                {vue === 'tenues'
                  ? <><LayoutGrid size={14} color="#008751" /> {tenuesFiltrees.length} tenue(s) trouvée(s)</>
                  : <><Users size={14} color="#008751" /> {stylistesFiltres.length} styliste(s) trouvé(s)</>}
              </p>

              {vue === 'tenues' ? (
                tenuesFiltrees.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
                    {tenuesFiltrees.map(t => <TenueCardSupabase key={t.id} tenue={t} />)}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '5rem 2rem', color: '#555' }}>
                    <LayoutGrid size={48} color="#2a2a2a" style={{ margin: '0 auto 1rem' }} />
                    <p style={{ fontFamily: 'Unbounded, sans-serif', fontSize: '1rem' }}>Aucune tenue trouvée</p>
                    <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.85rem', color: '#444', marginTop: '0.5rem' }}>La base de données est vide pour l'instant.</p>
                  </div>
                )
              ) : (
                stylistesFiltres.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {stylistesFiltres.map(s => {
                      const mockStyliste = {
                        id: s.id,
                        slug: s.slug || '',
                        nom: s.nom,
                        bio: s.bio || '',
                        ville: s.ville,
                        telephone: s.telephone || '',
                        whatsapp: s.whatsapp || '',
                        instagram: s.instagram || '',
                        photo: s.photo_url || 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80',
                        nb_tenues: 0,
                        nb_vues: 0,
                        nb_commandes: 0,
                        verified: s.verified,
                      }
                      return <StylisteCard key={s.id} styliste={mockStyliste} />
                    })}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '5rem 2rem', color: '#555' }}>
                    <Users size={48} color="#2a2a2a" style={{ margin: '0 auto 1rem' }} />
                    <p style={{ fontFamily: 'Unbounded, sans-serif', fontSize: '1rem' }}>Aucun styliste trouvé</p>
                  </div>
                )
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
