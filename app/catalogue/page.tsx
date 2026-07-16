'use client'
import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StylisteCard from '@/components/StylisteCard'
import TenueCard from '@/components/TenueCard'
import { createClient } from '@/lib/supabase/client'
import type { Tenue, Styliste, Categorie } from '@/lib/supabase/types'

function Bx({ name, size = 16, color, style }: { name: string; size?: number; color?: string; style?: React.CSSProperties }) {
  return <i className={`bx ${name}`} style={{ fontSize: size, color, lineHeight: 1, ...style }} />
}

const PRIX_MAX = 200000

type TenueWithStyliste = Tenue & { stylistes?: Styliste }

function CatalogueInner() {
  const params = useSearchParams()
  const [vue, setVue] = useState<'tenues' | 'stylistes'>('tenues')
  const [categorie, setCategorie] = useState('')
  const [ville, setVille] = useState('')
  const [tri, setTri] = useState<'recent' | 'prix-asc' | 'prix-desc' | 'populaire'>('recent')
  const [search, setSearch] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [tenues, setTenues] = useState<TenueWithStyliste[]>([])
  const [stylistes, setStylistes] = useState<Styliste[]>([])
  const [categories, setCategories] = useState<Categorie[]>([])
  const [loading, setLoading] = useState(true)

  // Récupère les query params (?q=, ?categorie=) depuis la home
  useEffect(() => {
    const q = params.get('q')
    const cat = params.get('categorie')
    if (q) setSearch(q)
    if (cat) setCategorie(cat)
  }, [params])

  useEffect(() => {
    const supabase = createClient()
    const loadData = async () => {
      setLoading(true)
      const [{ data: tenuesData }, { data: stylistesData }, { data: catsData }] = await Promise.all([
        supabase
          .from('tenues')
          .select('*, stylistes(id, nom, whatsapp, slug, photo_url, ville, verified)')
          .eq('disponible', true)
          .order('created_at', { ascending: false }),
        supabase.from('stylistes').select('*').order('created_at', { ascending: false }),
        supabase.from('categories').select('*').order('ordre'),
      ])
      setTenues((tenuesData as TenueWithStyliste[]) || [])
      setStylistes((stylistesData as Styliste[]) || [])
      setCategories((catsData as Categorie[]) || [])
      setLoading(false)
    }
    loadData()
  }, [])

  const tenuesFiltrees = useMemo(() => {
    let list = tenues.filter(t => {
      if (categorie && t.categorie !== categorie) return false
      if (ville && t.stylistes?.ville !== ville) return false
      if (search) {
        const q = search.toLowerCase()
        if (!t.nom.toLowerCase().includes(q) && !t.stylistes?.nom?.toLowerCase().includes(q)) return false
      }
      return true
    })
    if (tri === 'prix-asc') list = [...list].sort((a, b) => a.prix - b.prix)
    if (tri === 'prix-desc') list = [...list].sort((a, b) => b.prix - a.prix)
    if (tri === 'populaire') list = [...list].sort((a, b) => b.vues - a.vues)
    return list
  }, [tenues, categorie, ville, search, tri])

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

  const villes = useMemo(() => {
    const set = new Set<string>()
    stylistes.forEach(s => { if (s.ville) set.add(s.ville) })
    return Array.from(set).sort()
  }, [stylistes])

  const hasFilter = categorie || ville || search
  const count = vue === 'tenues' ? tenuesFiltrees.length : stylistesFiltres.length

  const pill = (active: boolean): React.CSSProperties => ({
    padding: '0.5rem 1.1rem', borderRadius: '50px',
    border: `1px solid ${active ? 'var(--vert)' : 'var(--bordure)'}`,
    background: active ? 'var(--vert)' : 'var(--blanc)',
    color: active ? '#fff' : 'var(--encre)',
    fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.78rem',
    cursor: 'pointer', whiteSpace: 'nowrap',
  })

  const selectStyle: React.CSSProperties = {
    background: 'var(--blanc)', border: '1px solid var(--bordure)', borderRadius: '12px',
    color: 'var(--encre)', padding: '0.65rem 2.2rem 0.65rem 1rem', fontSize: '0.82rem',
    fontFamily: 'Inter, sans-serif', cursor: 'pointer', appearance: 'none' as const,
    WebkitAppearance: 'none' as const,
  }

  return (
    <div className="pb-bottomnav" style={{ background: 'var(--creme)', minHeight: '100vh' }}>
      <Navbar />

      {/* En-tête */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.75rem 1.25rem 0.5rem' }}>
        <h1 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 'clamp(1.5rem, 5vw, 2rem)', color: 'var(--encre)', marginBottom: '0.3rem' }}>
          {vue === 'tenues' ? 'Nos tenues' : 'Nos stylistes'}
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'var(--gris-texte)', marginBottom: '1.25rem' }}>
          {count} {vue === 'tenues' ? (count > 1 ? 'articles' : 'article') : (count > 1 ? 'stylistes' : 'styliste')}
        </p>

        {/* Bascule Tenues / Stylistes */}
        <div style={{ display: 'inline-flex', background: 'var(--blanc)', border: '1px solid var(--bordure)', borderRadius: '50px', padding: '0.25rem', marginBottom: '1.25rem' }}>
          {([
            { key: 'tenues', label: 'Tenues', icon: <Bx name="bx-grid-alt" size={14} /> },
            { key: 'stylistes', label: 'Stylistes', icon: <Bx name="bxs-group" size={14} /> },
          ] as const).map(({ key, label, icon }) => (
            <button key={key} onClick={() => setVue(key)} style={{
              padding: '0.5rem 1.35rem', borderRadius: '50px', border: 'none',
              fontFamily: 'Sora, sans-serif', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer',
              background: vue === key ? 'var(--encre)' : 'transparent',
              color: vue === key ? '#fff' : 'var(--gris-texte)',
              display: 'flex', alignItems: 'center', gap: '0.4rem',
            }}>
              {icon}{label}
            </button>
          ))}
        </div>

        {/* Barre recherche + tri */}
        <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '180px', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--blanc)', border: '1px solid var(--bordure)', borderRadius: '50px', padding: '0.65rem 1.1rem' }}>
            <Bx name="bx-search" size={16} color="var(--gris-texte)" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher…"
              style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'var(--encre)' }}
            />
          </div>
          <button onClick={() => setShowFilters(f => !f)} style={{ ...pill(showFilters), display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Bx name="bx-slider-alt" size={14} /> Filtres
          </button>
          {vue === 'tenues' && (
            <div style={{ position: 'relative' }}>
              <select value={tri} onChange={e => setTri(e.target.value as typeof tri)} style={selectStyle}>
                <option value="recent">Récent</option>
                <option value="populaire">Populaires</option>
                <option value="prix-asc">Prix croissant</option>
                <option value="prix-desc">Prix décroissant</option>
              </select>
              <Bx name="bx-chevron-down" size={16} color="var(--gris-texte)" style={{ position: 'absolute', right: '0.7rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            </div>
          )}
        </div>

        {/* Panneau filtres */}
        {showFilters && (
          <div style={{ background: 'var(--blanc)', border: '1px solid var(--bordure)', borderRadius: '16px', padding: '1.1rem', marginBottom: '1.25rem' }}>
            {vue === 'tenues' && categories.length > 0 && (
              <>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '0.72rem', fontWeight: 700, color: 'var(--gris-texte)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>Catégorie</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  <button onClick={() => setCategorie('')} style={pill(!categorie)}>Toutes</button>
                  {categories.map(c => (
                    <button key={c.id} onClick={() => setCategorie(c.slug)} style={pill(categorie === c.slug)}>
                      {c.icone ? `${c.icone} ` : ''}{c.nom}
                    </button>
                  ))}
                </div>
              </>
            )}
            {villes.length > 0 && (
              <>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '0.72rem', fontWeight: 700, color: 'var(--gris-texte)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>Ville</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button onClick={() => setVille('')} style={pill(!ville)}>Toutes</button>
                  {villes.map(v => (
                    <button key={v} onClick={() => setVille(v)} style={pill(ville === v)}>{v}</button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {hasFilter && (
          <button onClick={() => { setCategorie(''); setVille(''); setSearch('') }} style={{
            background: 'var(--rouge-soft)', border: '1px solid rgba(232,17,45,0.25)', color: 'var(--rouge)',
            padding: '0.5rem 1rem', borderRadius: '50px', fontFamily: 'Inter, sans-serif', fontSize: '0.78rem',
            fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.25rem',
          }}>
            <Bx name="bx-x" size={15} /> Réinitialiser les filtres
          </button>
        )}
      </div>

      {/* Grille */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0.5rem 1.25rem 3rem' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--gris-texte)' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', border: '3px solid var(--bordure)', borderTopColor: 'var(--vert)', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }} />
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>Chargement du catalogue…</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </div>
        ) : vue === 'tenues' ? (
          tenuesFiltrees.length > 0 ? (
            <div className="dt-products">
              {tenuesFiltrees.map(t => <TenueCard key={t.id} tenue={t} />)}
            </div>
          ) : (
            <EmptyState icon={<Bx name="bx-grid-alt" size={44} color="var(--bordure)" />} titre="Aucune tenue trouvée" sous="Essayez d'ajuster vos filtres ou revenez bientôt." />
          )
        ) : (
          stylistesFiltres.length > 0 ? (
            <div className="dt-products">
              {stylistesFiltres.map(s => <StylisteCard key={s.id} styliste={s} />)}
            </div>
          ) : (
            <EmptyState icon={<Bx name="bxs-group" size={44} color="var(--bordure)" />} titre="Aucun styliste trouvé" sous="Les premiers créateurs rejoignent la plateforme bientôt." />
          )
        )}
      </div>

      <Footer />
    </div>
  )
}

function EmptyState({ icon, titre, sous }: { icon: React.ReactNode; titre: string; sous: string }) {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--blanc)', borderRadius: '18px', border: '1px solid var(--bordure)' }}>
      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>{icon}</div>
      <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'var(--encre)' }}>{titre}</p>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'var(--gris-texte)', marginTop: '0.5rem' }}>{sous}</p>
    </div>
  )
}

export default function CataloguePage() {
  return (
    <Suspense fallback={<div style={{ background: 'var(--creme)', minHeight: '100vh' }} />}>
      <CatalogueInner />
    </Suspense>
  )
}
