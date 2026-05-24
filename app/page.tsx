'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TenueCard from '@/components/TenueCard'
import StylisteCard from '@/components/StylisteCard'
import { STYLISTES, TENUES, CATEGORIES } from '@/lib/mockData'
import { ArrowRight, UserPlus, ChevronDown, ChevronUp, Users, Shirt, ShoppingBag, Flame, Star, Scissors, Gem, Palette, Sparkles, Crown } from 'lucide-react'

const FAQ = [
  { q: 'Comment passer une commande ?', r: 'Trouvez une tenue qui vous plaît, cliquez sur "Commander sur WhatsApp". Vous serez redirigé directement vers le styliste avec un message pré-rempli.' },
  { q: 'Les prix sont-ils négociables ?', r: 'Cela dépend du styliste. La plupart acceptent de discuter des prix, surtout pour des commandes en quantité. N\'hésitez pas à en parler via WhatsApp.' },
  { q: 'Comment devenir styliste sur DAHOMEY-TECH ?', r: 'Créez un compte gratuit, complétez votre profil et commencez à publier vos créations. La plateforme est 100% gratuite pour les stylistes.' },
  { q: 'Les tenues sont-elles disponibles en dehors du Bénin ?', r: 'Oui ! Plusieurs de nos stylistes livrent à l\'international. Contactez-les directement pour connaître leurs modalités de livraison.' },
  { q: 'Comment puis-je être sûr de la qualité ?', r: 'Tous les stylistes vérifiés ont été évalués par notre équipe. Les avis clients et le nombre de commandes vous aident aussi à choisir en confiance.' },
]

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image src="/visual3.jpg" alt="hero" fill sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center top' }} priority />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,10,10,0.92) 40%, rgba(10,10,10,0.65) 100%)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '8rem 2rem 4rem', width: '100%' }}>
          <h1 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: 'clamp(2.2rem, 6vw, 5rem)', lineHeight: 1.05, marginBottom: '1.5rem', maxWidth: '700px' }}>
            La mode africaine<br />
            <span style={{ background: 'linear-gradient(90deg, #008751, #FCD116)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>à portée de clic</span>
          </h1>

          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1.15rem', color: '#bbb', maxWidth: '540px', lineHeight: 1.7, marginBottom: '3rem' }}>
            Découvrez des créations uniques de stylistes africains talentueux. Commandez directement sur WhatsApp. Célébrez votre identité.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/catalogue">
              <button style={{ background: 'linear-gradient(135deg, #008751, #00a862)', color: '#fff', padding: '1rem 2.5rem', borderRadius: '50px', fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: '0.9rem', boxShadow: '0 8px 40px rgba(0,135,81,0.5)', transition: 'all 0.3s', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'none')}>
                Découvrir les stylistes <ArrowRight size={17} />
              </button>
            </Link>
            <Link href="/auth/register">
              <button style={{ background: 'transparent', color: '#fff', padding: '1rem 2.5rem', borderRadius: '50px', fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: '0.9rem', border: '2px solid rgba(255,255,255,0.3)', transition: 'all 0.3s', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#FCD116'; (e.currentTarget as HTMLElement).style.color = '#FCD116' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)'; (e.currentTarget as HTMLElement).style.color = '#fff' }}>
                <UserPlus size={17} /> Devenir styliste
              </button>
            </Link>
          </div>

          <div style={{ display: 'flex', gap: '3rem', marginTop: '4rem', flexWrap: 'wrap' }}>
            {[{ n: '200+', l: 'Stylistes', icon: <Users size={18} color="#FCD116" /> }, { n: '5000+', l: 'Tenues', icon: <Shirt size={18} color="#FCD116" /> }, { n: '10K+', l: 'Commandes', icon: <ShoppingBag size={18} color="#FCD116" /> }].map(({ n, l, icon }) => (
              <div key={l}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: '2rem', color: '#FCD116' }}>{icon}{n}</div>
                <div style={{ color: '#555', fontSize: '0.75rem', fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.25rem' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STYLISTES EN VEDETTE ── */}
      <section style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p style={{ color: '#008751', fontFamily: 'Unbounded, sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Users size={13} /> NOS CRÉATEURS
            </p>
            <h2 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: 'clamp(1.6rem, 3vw, 2.5rem)' }}>Stylistes en vedette</h2>
          </div>
          <Link href="/catalogue" style={{ color: '#FCD116', fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            Voir tous <ArrowRight size={15} />
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {STYLISTES.slice(0, 3).map(s => <StylisteCard key={s.id} styliste={s} />)}
        </div>
      </section>

      {/* ── CATÉGORIES ── */}
      <section style={{ padding: '5rem 2rem', background: '#080808' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ color: '#FCD116', fontFamily: 'Unbounded, sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>COLLECTIONS</p>
            <h2 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: 'clamp(1.6rem, 3vw, 2.5rem)' }}>Explorez par catégorie</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '1rem' }}>
            {[
              { id: 'boubou',     label: 'Boubou',          icon: Shirt,     color: '#008751', bg: 'rgba(0,135,81,0.12)',    border: 'rgba(0,135,81,0.3)' },
              { id: 'pagne',      label: 'Pagne',            icon: Scissors,  color: '#FCD116', bg: 'rgba(252,209,22,0.1)',   border: 'rgba(252,209,22,0.25)' },
              { id: 'kaftan',     label: 'Kaftan',           icon: Gem,       color: '#E8112D', bg: 'rgba(232,17,45,0.1)',    border: 'rgba(232,17,45,0.25)' },
              { id: 'dashiki',    label: 'Dashiki',          icon: Palette,   color: '#FCD116', bg: 'rgba(252,209,22,0.1)',   border: 'rgba(252,209,22,0.25)' },
              { id: 'robe-soiree',label: 'Robe de soirée',  icon: Sparkles,  color: '#008751', bg: 'rgba(0,135,81,0.12)',    border: 'rgba(0,135,81,0.3)' },
              { id: 'costume',    label: 'Costume africain', icon: Crown,     color: '#E8112D', bg: 'rgba(232,17,45,0.1)',    border: 'rgba(232,17,45,0.25)' },
            ].map(({ id, label, icon: Icon, color, bg, border }) => (
              <Link href={`/catalogue?categorie=${id}`} key={id}>
                <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: '16px', padding: '2rem 1rem', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = border; el.style.transform = 'translateY(-6px)'; el.style.background = bg; el.style.boxShadow = `0 12px 40px ${color}22` }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#1a1a1a'; el.style.transform = 'none'; el.style.background = '#111'; el.style.boxShadow = 'none' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: bg, border: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                    <Icon size={28} color={color} strokeWidth={1.5} />
                  </div>
                  <div style={{ fontFamily: 'Unbounded, sans-serif', fontSize: '0.78rem', fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{label}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TENUES TENDANCE ── */}
      <section style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p style={{ color: '#E8112D', fontFamily: 'Unbounded, sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Flame size={13} /> TENDANCES
            </p>
            <h2 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: 'clamp(1.6rem, 3vw, 2.5rem)' }}>Tenues du moment</h2>
          </div>
          <Link href="/catalogue" style={{ color: '#FCD116', fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            Voir tout <ArrowRight size={15} />
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {TENUES.slice(0, 4).map(t => <TenueCard key={t.id} tenue={t} />)}
        </div>
      </section>

      {/* ── BANDEAU PROMO ── */}
      <section style={{ background: 'linear-gradient(135deg, #008751 0%, #006b40 100%)', padding: '5rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Image src="/logo-icon.jpg" alt="logo" width={80} height={80} style={{ borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1.5rem', border: '3px solid rgba(255,255,255,0.3)' }} />
          <h2 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', marginBottom: '1rem', color: '#fff' }}>Vous êtes styliste ?</h2>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            Rejoignez la plateforme gratuitement et exposez vos créations à des milliers de clients partout en Afrique et dans la diaspora.
          </p>
          <Link href="/auth/register">
            <button style={{ background: '#FCD116', color: '#0A0A0A', padding: '1rem 2.5rem', borderRadius: '50px', fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 8px 40px rgba(252,209,22,0.4)', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
              <UserPlus size={18} /> Créer mon espace gratuit
            </button>
          </Link>
        </div>
      </section>

      {/* ── VISUELS ── */}
      <section style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ color: '#FCD116', fontFamily: 'Unbounded, sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
            <Star size={13} fill="#FCD116" /> L'UNIVERS DAHOMEY
          </p>
          <h2 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: 'clamp(1.6rem, 3vw, 2.5rem)' }}>Le futur de la mode africaine arrive.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto', gap: '1rem', maxHeight: '600px' }}>
          <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', gridRow: 'span 2' }}>
            <Image src="/visual1.jpg" alt="visual" fill sizes="50vw" style={{ objectFit: 'cover' }} />
          </div>
          <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', minHeight: '280px' }}>
            <Image src="/visual2.jpg" alt="visual" fill sizes="50vw" style={{ objectFit: 'cover' }} />
          </div>
          <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', minHeight: '280px' }}>
            <Image src="/visual3.jpg" alt="visual" fill sizes="50vw" style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '6rem 2rem', background: '#080808' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ color: '#008751', fontFamily: 'Unbounded, sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>FAQ</p>
            <h2 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: 'clamp(1.6rem, 3vw, 2.5rem)' }}>Questions fréquentes</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {FAQ.map((item, i) => (
              <div key={i} style={{ background: '#111', border: `1px solid ${openFaq === i ? '#008751' : '#1a1a1a'}`, borderRadius: '12px', overflow: 'hidden', transition: 'border-color 0.3s' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem', background: 'none', cursor: 'pointer', textAlign: 'left', border: 'none' }}>
                  <span style={{ fontFamily: 'Unbounded, sans-serif', fontSize: '0.875rem', fontWeight: 700, color: '#fff', paddingRight: '1rem', lineHeight: 1.4 }}>{item.q}</span>
                  {openFaq === i ? <ChevronUp size={18} color="#008751" /> : <ChevronDown size={18} color="#555" />}
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 1.5rem 1.25rem' }}>
                    <p style={{ fontFamily: 'Montserrat, sans-serif', color: '#888', lineHeight: 1.7, fontSize: '0.9rem' }}>{item.r}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
