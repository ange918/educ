'use client'
import { useState, useMemo } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TenueCard from '@/components/TenueCard'
import StylisteCard from '@/components/StylisteCard'
import { TENUES, STYLISTES, CATEGORIES, VILLES } from '@/lib/mockData'

const PRIX_MAX = 200000

export default function CataloguePage() {
  const [vue, setVue] = useState<'tenues' | 'stylistes'>('tenues')
  const [categorie, setCategorie] = useState('')
  const [ville, setVille] = useState('')
  const [prixMax, setPrixMax] = useState(PRIX_MAX)
  const [search, setSearch] = useState('')

  const tenuesFiltrees = useMemo(() => {
    return TENUES.filter(t => {
      if (categorie && t.categorie !== categorie) return false
      if (ville && t.ville !== ville) return false
      if (t.prix > prixMax) return false
      if (search && !t.nom.toLowerCase().includes(search.toLowerCase()) && !t.styliste_nom.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [categorie, ville, prixMax, search])

  const stylistesFiltres = useMemo(() => {
    return STYLISTES.filter(s => {
      if (ville && s.ville !== ville) return false
      if (search && !s.nom.toLowerCase().includes(search.toLowerCase()) && !s.ville.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [ville, search])

  const inputStyle: React.CSSProperties = {
    background: '#111',
    border: '1px solid #2a2a2a',
    borderRadius: '10px',
    color: '#fff',
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    fontFamily: 'Montserrat, sans-serif',
    width: '100%',
    cursor: 'pointer',
  }

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <Navbar />

      <div style={{ paddingTop: '72px' }}>
        {/* En-tête */}
        <div style={{ background: 'linear-gradient(180deg, #111 0%, #0A0A0A 100%)', padding: '4rem 2rem 2rem', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p style={{ color: '#008751', fontFamily: 'Unbounded, sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>DAHOMEY-TECH</p>
            <h1 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 3rem)', marginBottom: '2rem' }}>Catalogue</h1>

            {/* Toggle vue */}
            <div style={{ display: 'inline-flex', background: '#1a1a1a', borderRadius: '50px', padding: '0.25rem', marginBottom: '2rem' }}>
              {(['tenues', 'stylistes'] as const).map(v => (
                <button key={v} onClick={() => setVue(v)} style={{ padding: '0.6rem 1.5rem', borderRadius: '50px', border: 'none', fontFamily: 'Unbounded, sans-serif', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s', background: vue === v ? '#008751' : 'transparent', color: vue === v ? '#fff' : '#888', textTransform: 'capitalize' }}>
                  {v}
                </button>
              ))}
            </div>

            {/* Filtres */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
                <input type="text" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} style={{ ...inputStyle, paddingLeft: '2.5rem' }} />
                <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#555' }}>🔍</span>
              </div>

              {vue === 'tenues' && (
                <select value={categorie} onChange={e => setCategorie(e.target.value)} style={inputStyle}>
                  <option value="">Toutes les catégories</option>
                  {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              )}

              <select value={ville} onChange={e => setVille(e.target.value)} style={{ ...inputStyle, maxWidth: '200px' }}>
                <option value="">Toutes les villes</option>
                {VILLES.map(v => <option key={v} value={v}>{v}</option>)}
              </select>

              {vue === 'tenues' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: '250px' }}>
                  <span style={{ color: '#888', fontSize: '0.8rem', fontFamily: 'Montserrat, sans-serif', whiteSpace: 'nowrap' }}>Max: {new Intl.NumberFormat('fr-FR').format(prixMax)} XOF</span>
                  <input type="range" min={5000} max={PRIX_MAX} step={5000} value={prixMax} onChange={e => setPrixMax(Number(e.target.value))}
                    style={{ accentColor: '#008751', flex: 1 }} />
                </div>
              )}

              {(categorie || ville || prixMax < PRIX_MAX || search) && (
                <button onClick={() => { setCategorie(''); setVille(''); setPrixMax(PRIX_MAX); setSearch('') }} style={{ background: 'rgba(232,17,45,0.15)', border: '1px solid rgba(232,17,45,0.3)', color: '#E8112D', padding: '0.75rem 1.25rem', borderRadius: '10px', fontFamily: 'Montserrat, sans-serif', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  ✕ Réinitialiser
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Résultats */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2.5rem 2rem 5rem' }}>
          <p style={{ color: '#555', fontFamily: 'Montserrat, sans-serif', fontSize: '0.875rem', marginBottom: '2rem' }}>
            {vue === 'tenues' ? `${tenuesFiltrees.length} tenue(s) trouvée(s)` : `${stylistesFiltres.length} styliste(s) trouvé(s)`}
          </p>

          {vue === 'tenues' ? (
            tenuesFiltrees.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
                {tenuesFiltrees.map(t => <TenueCard key={t.id} tenue={t} />)}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '5rem 2rem', color: '#555' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👗</div>
                <p style={{ fontFamily: 'Unbounded, sans-serif', fontSize: '1rem' }}>Aucune tenue trouvée</p>
              </div>
            )
          ) : (
            stylistesFiltres.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {stylistesFiltres.map(s => <StylisteCard key={s.id} styliste={s} />)}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '5rem 2rem', color: '#555' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✂️</div>
                <p style={{ fontFamily: 'Unbounded, sans-serif', fontSize: '1rem' }}>Aucun styliste trouvé</p>
              </div>
            )
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
