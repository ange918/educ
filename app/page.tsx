'use client'
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StylisteCard from '@/components/StylisteCard'
import TenueCard from '@/components/TenueCard'
import { createClient } from '@/lib/supabase/client'
import { CATEGORIES } from '@/lib/mockData'
import type { Tenue, Styliste } from '@/lib/supabase/types'
import { Search, ArrowRight, Store, Users, Shirt, BadgeCheck } from 'lucide-react'

type TenueWithStyliste = Tenue & { stylistes?: Styliste }

const TABS = [
  { id: 'tous', label: 'Tous' },
  { id: 'nouveautes', label: 'Nouveautés' },
  { id: 'tendances', label: 'Tendances' },
]

export default function LandingPage() {
  const [tenues, setTenues] = useState<TenueWithStyliste[]>([])
  const [stylistes, setStylistes] = useState<Styliste[]>([])
  const [tab, setTab] = useState('tous')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const supabase = createClient()
    const load = async () => {
      const [{ data: tenuesData }, { data: stylistesData }] = await Promise.all([
        supabase
          .from('tenues')
          .select('*, stylistes(id, nom, whatsapp, slug, photo_url, ville, verified)')
          .eq('disponible', true)
          .order('created_at', { ascending: false })
          .limit(8),
        supabase
          .from('stylistes')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(4),
      ])
      setTenues((tenuesData as TenueWithStyliste[]) || [])
      setStylistes((stylistesData as Styliste[]) || [])
    }
    load()
  }, [])

  const tenuesAffichees = useMemo(() => {
    let list = tenues
    if (tab === 'tendances') list = [...list].sort((a, b) => b.vues - a.vues)
    if (tab === 'nouveautes') list = [...list].sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
    return list.slice(0, 8)
  }, [tenues, tab])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = `/catalogue${search ? `?q=${encodeURIComponent(search)}` : ''}`
  }

  return (
    <div className="pb-bottomnav" style={{ background: 'var(--creme)', minHeight: '100vh' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ padding: '2.25rem 1.25rem 2.5rem', maxWidth: '640px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '0.7rem', fontWeight: 700, color: 'var(--vert)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
          Marketplace Dahomey-Tech · Mode africaine
        </p>
        <h1 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 'clamp(1.7rem, 6vw, 2.6rem)', lineHeight: 1.15, color: 'var(--encre)', marginBottom: '0.9rem' }}>
          Des stylistes vérifiés, une seule adresse.
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: 'var(--gris-texte)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
          Boubou, pagne, kaftan, dashiki — commandez directement auprès de créateurs africains vérifiés, sans intermédiaire, sur WhatsApp.
        </p>

        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem' }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--blanc)', border: '1px solid var(--bordure)', borderRadius: '50px', padding: '0.75rem 1.1rem' }}>
            <Search size={16} color="var(--gris-texte)" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher une tenue, un styliste…"
              style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'var(--encre)' }}
            />
          </div>
          <button type="submit" style={{ background: 'var(--vert)', color: '#fff', border: 'none', borderRadius: '50px', padding: '0 1.3rem', fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
            Explorer
          </button>
        </form>

        <div style={{ display: 'flex', gap: '1.75rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={16} color="var(--vert)" />
            <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.85rem', color: 'var(--encre)' }}>200+</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'var(--gris-texte)' }}>stylistes</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Shirt size={16} color="var(--vert)" />
            <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.85rem', color: 'var(--encre)' }}>5 000+</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'var(--gris-texte)' }}>tenues</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BadgeCheck size={16} color="var(--vert)" />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'var(--gris-texte)' }}>Stylistes vérifiés</span>
          </div>
        </div>
      </section>

      {/* ── CATÉGORIES ── */}
      <section style={{ padding: '0.5rem 1.25rem 2rem', maxWidth: '640px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '1.15rem', color: 'var(--encre)' }}>Explorer par catégorie</h2>
          <Link href="/catalogue" style={{ fontFamily: 'Sora, sans-serif', fontSize: '0.8rem', fontWeight: 700, color: 'var(--vert)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            Tout voir <ArrowRight size={14} />
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(84px, 1fr))', gap: '1.1rem' }}>
          {CATEGORIES.map(cat => (
            <Link key={cat.id} href={`/catalogue?categorie=${cat.id}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--vert-soft)', border: '1px solid var(--bordure)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}>
                {cat.emoji}
              </div>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 600, color: 'var(--encre)', textAlign: 'center' }}>{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── PRODUITS (tabs) ── */}
      <section style={{ padding: '0.5rem 1.25rem 2.5rem', maxWidth: '640px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '1.15rem', color: 'var(--encre)' }}>Coups de cœur</h2>
          <Link href="/catalogue" style={{ fontFamily: 'Sora, sans-serif', fontSize: '0.8rem', fontWeight: 700, color: 'var(--vert)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            Tout voir <ArrowRight size={14} />
          </Link>
        </div>
        <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.25rem' }}>
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: '0.5rem 1.1rem', borderRadius: '50px', border: `1px solid ${tab === t.id ? 'var(--encre)' : 'var(--bordure)'}`,
                background: tab === t.id ? 'var(--encre)' : 'var(--blanc)', color: tab === t.id ? '#fff' : 'var(--encre)',
                fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        {tenuesAffichees.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
            {tenuesAffichees.map(t => <TenueCard key={t.id} tenue={t} />)}
          </div>
        ) : (
          <div style={{ padding: '2.5rem 1rem', textAlign: 'center', color: 'var(--gris-texte)', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', background: 'var(--blanc)', borderRadius: '16px', border: '1px solid var(--bordure)' }}>
            Les premières créations arrivent bientôt.
          </div>
        )}
      </section>

      {/* ── STYLISTES VÉRIFIÉS ── */}
      <section style={{ padding: '0.5rem 1.25rem 2.5rem', maxWidth: '640px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '0.68rem', fontWeight: 700, color: 'var(--jaune)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
          Sélection vérifiée
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '1.15rem', color: 'var(--encre)' }}>Stylistes indépendants</h2>
        </div>
        {stylistes.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
            {stylistes.map(s => <StylisteCard key={s.id} styliste={s} />)}
          </div>
        ) : (
          <div style={{ padding: '2.5rem 1rem', textAlign: 'center', color: 'var(--gris-texte)', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', background: 'var(--blanc)', borderRadius: '16px', border: '1px solid var(--bordure)' }}>
            Les premiers stylistes rejoignent la plateforme bientôt.
          </div>
        )}
        <Link href="/catalogue" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', marginTop: '1.5rem', fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.85rem', color: 'var(--vert)' }}>
          Voir tous les stylistes <ArrowRight size={15} />
        </Link>
      </section>

      {/* ── CTA DEVENIR STYLISTE ── */}
      <section style={{ padding: '0 1.25rem 3rem', maxWidth: '640px', margin: '0 auto' }}>
        <div style={{ background: 'var(--encre)', borderRadius: '22px', padding: '2.25rem 1.75rem', position: 'relative', overflow: 'hidden' }}>
          <div className="liser-benin" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px' }} />
          <Store size={28} color="var(--jaune)" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: '#fff', marginBottom: '0.6rem', lineHeight: 1.25 }}>
            Vous êtes styliste ?<br />Créez votre boutique gratuitement.
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Publiez vos créations, recevez des commandes directement sur WhatsApp. 100% gratuit, sans commission.
          </p>
          <Link href="/auth/register">
            <button style={{ background: 'var(--jaune)', color: 'var(--encre)', border: 'none', borderRadius: '50px', padding: '0.85rem 1.75rem', fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Créer ma boutique <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
