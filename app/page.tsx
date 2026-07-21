'use client'
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StylisteCard from '@/components/StylisteCard'
import TenueCard from '@/components/TenueCard'
import { createClient } from '@/lib/supabase/client'
import { CATEGORIES } from '@/lib/mockData'
import type { Tenue, Styliste } from '@/lib/supabase/types'

type TenueWithStyliste = Tenue & { stylistes?: Styliste }

const TABS = [
  { id: 'tous', label: 'Pour vous' },
  { id: 'nouveautes', label: 'Nouveautés' },
  { id: 'tendances', label: 'Tendances' },
]

const TRUST = [
  { icon: 'bx-check-shield', label: 'Stylistes vérifiés' },
  { icon: 'bx-lock-alt', label: 'Commande sécurisée' },
  { icon: 'bxs-truck', label: 'Livraison suivie' },
  { icon: 'bx-diamond', label: 'Pièces uniques' },
]

const PAIEMENTS = [
  { icon: 'bx-mobile', label: 'Mobile Money', sub: 'MTN · Moov' },
  { icon: 'bx-water', label: 'Wave', sub: 'Transfert rapide' },
  { icon: 'bxl-whatsapp', label: 'Commande WhatsApp', sub: 'Direct avec le styliste' },
  { icon: 'bxs-wallet', label: 'Paiement à la livraison', sub: 'Selon le styliste' },
]

function Bx({ name, size = 18, color }: { name: string; size?: number; color?: string }) {
  return <i className={`bx ${name} bx-ic`} style={{ fontSize: size, color }} />
}

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
        supabase.from('stylistes').select('*').order('created_at', { ascending: false }).limit(4),
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

  const heroTenue = tenues[0]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = `/catalogue${search ? `?q=${encodeURIComponent(search)}` : ''}`
  }

  return (
    <div className="pb-bottomnav" style={{ background: 'var(--creme)', minHeight: '100vh' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="dt-section" style={{ paddingTop: '1.75rem' }}>
        <div className="dt-container dt-hero">
          <div>
            <p style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontFamily: 'Sora, sans-serif', fontSize: '0.7rem', fontWeight: 700, color: 'var(--vert)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              <Bx name="bxs-store" size={15} /> Marketplace de stylistes vérifiés
            </p>
            <h1 className="dt-h1" style={{ marginBottom: '1.1rem' }}>
              Des créations sélectionnées, une seule adresse.
            </h1>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.02rem', color: 'var(--gris-texte)', lineHeight: 1.65, marginBottom: '1.75rem', maxWidth: '520px' }}>
              Explorez des stylistes africains vérifiés un à un. Boubou, pagne, kaftan — commandez directement sur WhatsApp, sans intermédiaire.
            </p>

            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem', maxWidth: '520px' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--blanc)', border: '1px solid var(--bordure)', borderRadius: '50px', padding: '0.8rem 1.1rem' }}>
                <Bx name="bx-search" size={17} color="var(--gris-texte)" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Rechercher une tenue, un styliste…"
                  style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontFamily: 'Inter, sans-serif', fontSize: '0.88rem', color: 'var(--encre)' }}
                />
              </div>
              <button type="submit" style={{ background: 'var(--vert)', color: '#fff', border: 'none', borderRadius: '50px', padding: '0 1.5rem', fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                Explorer <Bx name="bx-right-arrow-alt" size={17} />
              </button>
            </form>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              {[['bxs-group', '200+', 'stylistes'], ['bxs-t-shirt', '5 000+', 'tenues'], ['bxs-badge-check', '100%', 'vérifiés']].map(([ic, n, l]) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Bx name={ic} size={18} color="var(--vert)" />
                  <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.9rem', color: 'var(--encre)' }}>{n}</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: 'var(--gris-texte)' }}>{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visuel vedette */}
          <div style={{ position: 'relative', borderRadius: '22px', overflow: 'hidden', aspectRatio: '4/5', background: 'var(--vert-soft)', border: '1px solid var(--bordure)' }}>
            <Image
              src={heroTenue?.photo_principale || heroTenue?.photos?.[0] || '/visual3.jpg'}
              alt={heroTenue?.nom || 'Création vedette'}
              fill sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
              priority
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,32,26,0.35) 0%, transparent 45%)' }} />
            {heroTenue?.stylistes && (
              <div style={{ position: 'absolute', left: '1rem', bottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.55rem', background: 'rgba(255,255,255,0.95)', borderRadius: '50px', padding: '0.4rem 0.85rem 0.4rem 0.4rem' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--vert)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.8rem' }}>
                  {heroTenue.stylistes.nom?.[0]?.toUpperCase()}
                </div>
                <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '0.78rem', fontWeight: 700, color: 'var(--encre)' }}>{heroTenue.stylistes.nom}</span>
                {heroTenue.stylistes.verified && <Bx name="bxs-badge-check" size={15} color="var(--vert)" />}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── BARRE DE CONFIANCE ── */}
      <section style={{ background: 'var(--blanc)', borderTop: '1px solid var(--bordure)', borderBottom: '1px solid var(--bordure)', padding: '1.25rem 0' }}>
        <div className="dt-container dt-trust">
          {TRUST.map(t => (
            <div key={t.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', textAlign: 'center' }}>
              <Bx name={t.icon} size={24} color="var(--vert)" />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 600, color: 'var(--encre)' }}>{t.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATÉGORIES ── */}
      <section className="dt-section">
        <div className="dt-container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h2 className="dt-h2">Explorer par catégorie</h2>
            <Link href="/catalogue" style={{ fontFamily: 'Sora, sans-serif', fontSize: '0.82rem', fontWeight: 700, color: 'var(--vert)', display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
              Tout voir <Bx name="bx-chevron-right" size={16} />
            </Link>
          </div>
          <div className="dt-cats">
            {CATEGORIES.map(cat => (
              <Link key={cat.id} href={`/catalogue?categorie=${cat.id}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.55rem' }}>
                <div style={{ width: '100%', maxWidth: '78px', aspectRatio: '1/1', borderRadius: '50%', background: 'var(--vert-soft)', border: '1px solid var(--bordure)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.7rem' }}>
                  {cat.emoji}
                </div>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.74rem', fontWeight: 600, color: 'var(--encre)', textAlign: 'center' }}>{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUITS ── */}
      <section className="dt-section" style={{ paddingTop: 0 }}>
        <div className="dt-container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h2 className="dt-h2">Coups de cœur</h2>
            <Link href="/catalogue" style={{ fontFamily: 'Sora, sans-serif', fontSize: '0.82rem', fontWeight: 700, color: 'var(--vert)', display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
              Tout voir <Bx name="bx-chevron-right" size={16} />
            </Link>
          </div>
          <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                padding: '0.5rem 1.2rem', borderRadius: '50px', border: `1px solid ${tab === t.id ? 'var(--encre)' : 'var(--bordure)'}`,
                background: tab === t.id ? 'var(--encre)' : 'var(--blanc)', color: tab === t.id ? '#fff' : 'var(--encre)',
                fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer',
              }}>
                {t.label}
              </button>
            ))}
          </div>
          {tenuesAffichees.length > 0 ? (
            <div className="dt-products">
              {tenuesAffichees.map(t => <TenueCard key={t.id} tenue={t} />)}
            </div>
          ) : (
            <div style={{ padding: '2.5rem 1rem', textAlign: 'center', color: 'var(--gris-texte)', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', background: 'var(--blanc)', borderRadius: '16px', border: '1px solid var(--bordure)' }}>
              Les premières créations arrivent bientôt.
            </div>
          )}
        </div>
      </section>

      {/* ── STYLISTES VÉRIFIÉS ── */}
      <section className="dt-section" style={{ paddingTop: 0 }}>
        <div className="dt-container">
          <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '0.68rem', fontWeight: 700, color: '#C8972A', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
            Sélection vérifiée
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h2 className="dt-h2">Stylistes indépendants</h2>
            <Link href="/catalogue" style={{ fontFamily: 'Sora, sans-serif', fontSize: '0.82rem', fontWeight: 700, color: 'var(--vert)', display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
              Tout voir <Bx name="bx-chevron-right" size={16} />
            </Link>
          </div>
          {stylistes.length > 0 ? (
            <div className="dt-shops">
              {stylistes.map(s => <StylisteCard key={s.id} styliste={s} />)}
            </div>
          ) : (
            <div style={{ padding: '2.5rem 1rem', textAlign: 'center', color: 'var(--gris-texte)', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', background: 'var(--blanc)', borderRadius: '16px', border: '1px solid var(--bordure)' }}>
              Les premiers stylistes rejoignent la plateforme bientôt.
            </div>
          )}
        </div>
      </section>

      {/* ── POURQUOI ── */}
      <section className="dt-section" style={{ paddingTop: 0 }}>
        <div className="dt-container">
          <div className="dt-why" style={{ border: '1px solid var(--bordure)' }}>
            <div style={{ position: 'relative', minHeight: '260px', background: 'var(--vert-soft)' }}>
              <Image src="/visual2.jpg" alt="Mode africaine" fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ background: 'var(--encre)', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '0.68rem', fontWeight: 700, color: 'var(--jaune)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Pourquoi Dahomey-Tech
              </p>
              <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: '#fff', lineHeight: 1.2, marginBottom: '1rem' }}>
                Les meilleures créations, réunies pour vous.
              </h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.92rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                Dahomey-Tech rassemble les stylistes africains les plus talentueux en une seule adresse. Des créations uniques, des ateliers vérifiés, une commande directe — pour porter ce qui vous ressemble, en toute confiance.
              </p>
              <Link href="/catalogue">
                <button style={{ background: 'var(--jaune)', color: 'var(--encre)', border: 'none', borderRadius: '50px', padding: '0.85rem 1.75rem', fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  Explorer la marketplace <Bx name="bx-right-arrow-alt" size={17} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PAIEMENT ── */}
      <section className="dt-section" style={{ paddingTop: 0 }}>
        <div className="dt-container">
          <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '0.68rem', fontWeight: 700, color: 'var(--vert)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Paiement
          </p>
          <h2 className="dt-h2" style={{ marginBottom: '0.5rem' }}>Payez comme il vous convient</h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: 'var(--gris-texte)', lineHeight: 1.6, marginBottom: '1.75rem', maxWidth: '540px' }}>
            Chaque commande se conclut directement avec le styliste, par le moyen qui vous arrange.
          </p>
          <div className="dt-pay">
            {PAIEMENTS.map(p => (
              <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--blanc)', border: '1px solid var(--bordure)', borderRadius: '14px', padding: '1.1rem 1.25rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--vert-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Bx name={p.icon} size={22} color="var(--vert)" />
                </div>
                <div>
                  <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.9rem', color: 'var(--encre)' }}>{p.label}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: 'var(--gris-texte)' }}>{p.sub}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap', color: 'var(--gris-texte)', fontFamily: 'Inter, sans-serif', fontSize: '0.82rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Bx name="bx-lock-alt" size={15} color="var(--vert)" /> Commande sécurisée</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Bx name="bxs-truck" size={15} color="var(--vert)" /> Livraison suivie</span>
          </div>
        </div>
      </section>

      {/* ── CTA DEVENIR STYLISTE ── */}
      <section className="dt-section" style={{ paddingTop: 0 }}>
        <div className="dt-container">
          <div style={{ background: 'var(--encre)', borderRadius: '22px', padding: '2.5rem 2rem', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
            <div className="liser-benin" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px' }} />
            <Bx name="bxs-store" size={30} color="var(--jaune)" />
            <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 'clamp(1.3rem, 3vw, 1.9rem)', color: '#fff', margin: '0.8rem auto 0.6rem', lineHeight: 1.25, maxWidth: '560px' }}>
              Vous êtes styliste ? Créez votre boutique gratuitement.
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.6, marginBottom: '1.75rem', maxWidth: '480px', margin: '0 auto 1.75rem' }}>
              Publiez vos créations, recevez des commandes directement sur WhatsApp. 100% gratuit, sans commission.
            </p>
            <Link href="/auth/register">
              <button style={{ background: 'var(--jaune)', color: 'var(--encre)', border: 'none', borderRadius: '50px', padding: '0.9rem 1.9rem', fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '0.88rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Créer ma boutique <Bx name="bx-right-arrow-alt" size={17} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
