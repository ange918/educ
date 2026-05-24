'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  ArrowRight, UserPlus, ChevronDown, ChevronUp,
  Users, Shirt, ShoppingBag, Star, Target, Eye, Lightbulb,
  MessageCircle, MapPin, Phone, Mail, CheckCircle,
  Search, Heart, Zap
} from 'lucide-react'

const FAQ = [
  { q: 'Comment passer une commande ?', r: 'Trouvez une tenue qui vous plaît dans le catalogue, cliquez sur "Commander sur WhatsApp". Vous serez redirigé directement vers le styliste avec un message pré-rempli.' },
  { q: 'Les prix sont-ils négociables ?', r: "Cela dépend du styliste. La plupart acceptent de discuter des prix, surtout pour des commandes en quantité. N'hésitez pas à en parler via WhatsApp." },
  { q: 'Comment devenir styliste sur DAHOMEY-TECH ?', r: 'Créez un compte gratuit, complétez votre profil et commencez à publier vos créations. La plateforme est 100% gratuite pour les stylistes.' },
  { q: 'Les tenues sont-elles disponibles en dehors du Bénin ?', r: "Oui ! Plusieurs de nos stylistes livrent à l'international. Contactez-les directement pour connaître leurs modalités de livraison." },
  { q: 'Comment puis-je être sûr de la qualité ?', r: 'Tous les stylistes vérifiés ont été évalués par notre équipe. Les avis clients et le nombre de commandes vous aident aussi à choisir en confiance.' },
]

const STEPS = [
  { n: '01', icon: Search, color: '#008751', bg: 'rgba(0,135,81,0.12)', border: 'rgba(0,135,81,0.25)', title: 'Explorez le catalogue', desc: 'Parcourez des centaines de créations de stylistes africains talentueux, filtrées par catégorie, ville ou style.' },
  { n: '02', icon: Heart, color: '#FCD116', bg: 'rgba(252,209,22,0.1)', border: 'rgba(252,209,22,0.2)', title: 'Choisissez votre tenue', desc: 'Sélectionnez la création qui vous correspond. Consultez les photos, le prix et le profil du styliste.' },
  { n: '03', icon: MessageCircle, color: '#25D366', bg: 'rgba(37,211,102,0.1)', border: 'rgba(37,211,102,0.2)', title: 'Commandez sur WhatsApp', desc: "D'un seul clic, entrez en contact direct avec le styliste. Discutez des détails, des tailles et finalisez votre commande." },
  { n: '04', icon: Zap, color: '#E8112D', bg: 'rgba(232,17,45,0.1)', border: 'rgba(232,17,45,0.2)', title: 'Recevez votre création', desc: 'Votre styliste prépare votre commande sur mesure et vous la livre selon vos préférences.' },
]

const VALEURS = [
  { icon: Target, color: '#008751', label: 'Notre mission', text: "Connecter les stylistes africains talentueux avec des clients qui valorisent l'authenticité et l'élégance de la mode africaine, tout en leur offrant une visibilité digitale gratuite." },
  { icon: Eye, color: '#FCD116', label: 'Notre vision', text: "Devenir la référence incontournable de la mode africaine en ligne — une plateforme où chaque créateur du continent peut exposer son art et chaque client trouver la pièce unique qui lui ressemble." },
  { icon: Lightbulb, color: '#E8112D', label: 'Nos valeurs', text: "Authenticité africaine, excellence artisanale, accessibilité numérique et solidarité entre créateurs. Nous croyons que la mode est un vecteur de fierté culturelle et de développement économique." },
]

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [contactForm, setContactForm] = useState({ nom: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  const heroSubRef = useRef<HTMLParagraphElement>(null)
  const heroBtnsRef = useRef<HTMLDivElement>(null)
  const heroStatsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 })
    tl.fromTo(heroTitleRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
      .fromTo(heroSubRef.current,   { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .fromTo(heroBtnsRef.current,  { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .fromTo(heroStatsRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
  }, [])

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setContactForm({ nom: '', email: '', message: '' })
  }

  const inputStyle: React.CSSProperties = {
    background: '#111', border: '1px solid #2a2a2a', borderRadius: '10px',
    color: '#fff', padding: '0.9rem 1rem', fontSize: '0.9rem',
    fontFamily: 'Montserrat, sans-serif', width: '100%', transition: 'border-color 0.2s',
  }

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section id="accueil" style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image src="/visual3.jpg" alt="hero" fill sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center top' }} priority />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,10,10,0.92) 40%, rgba(10,10,10,0.65) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '8rem 2rem 4rem', width: '100%' }}>
          <h1 ref={heroTitleRef} style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: 'clamp(2.2rem, 6vw, 5rem)', lineHeight: 1.05, marginBottom: '1.5rem', maxWidth: '700px', opacity: 0 }}>
            La mode africaine<br />
            <span style={{ background: 'linear-gradient(90deg, #008751, #FCD116)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>à portée de clic</span>
          </h1>
          <p ref={heroSubRef} style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1.15rem', color: '#bbb', maxWidth: '540px', lineHeight: 1.7, marginBottom: '3rem', opacity: 0 }}>
            Découvrez des créations uniques de stylistes africains talentueux. Commandez directement sur WhatsApp. Célébrez votre identité.
          </p>
          <div ref={heroBtnsRef} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', opacity: 0 }}>
            <Link href="/catalogue">
              <button style={{ background: 'linear-gradient(135deg, #008751, #00a862)', color: '#fff', padding: '1rem 2.5rem', borderRadius: '50px', fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: '0.9rem', boxShadow: '0 8px 40px rgba(0,135,81,0.5)', transition: 'transform 0.3s', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'none')}>
                Découvrir le catalogue <ArrowRight size={17} />
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
          <div ref={heroStatsRef} style={{ display: 'flex', gap: '3rem', marginTop: '4rem', flexWrap: 'wrap', opacity: 0 }}>
            {[{ n: '200+', l: 'Stylistes', icon: <Users size={18} color="#FCD116" /> }, { n: '5 000+', l: 'Tenues', icon: <Shirt size={18} color="#FCD116" /> }, { n: '10K+', l: 'Commandes', icon: <ShoppingBag size={18} color="#FCD116" /> }].map(({ n, l, icon }) => (
              <div key={l}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: '2rem', color: '#FCD116' }}>{icon}{n}</div>
                <div style={{ color: '#555', fontSize: '0.75rem', fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.25rem' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── À PROPOS ── */}
      <section id="about" style={{ padding: '7rem 2rem', background: '#080808' }}>
        <div className="about-grid" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div data-gsap="slide-left">
            <p style={{ color: '#008751', fontFamily: 'Unbounded, sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>À PROPOS</p>
            <h2 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', marginBottom: '1.5rem', lineHeight: 1.2 }}>
              L'élégance africaine,<br />
              <span style={{ color: '#FCD116' }}>enfin digitalisée</span>
            </h2>
            <p style={{ fontFamily: 'Montserrat, sans-serif', color: '#888', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              DAHOMEY-TECH est née d'un constat simple : les stylistes africains les plus talentueux manquent souvent de visibilité digitale, tandis que les clients cherchent des créations authentiques et uniques.
            </p>
            <p style={{ fontFamily: 'Montserrat, sans-serif', color: '#888', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: '2.5rem' }}>
              Nous avons bâti un pont entre ces deux mondes — une plateforme gratuite, intuitive et pensée pour l'Afrique, où chaque création trouve son client et chaque styliste son public.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Plateforme 100% gratuite pour les stylistes', 'Commande directe sans intermédiaire', 'Stylistes vérifiés et évalués', 'Livraison locale et internationale'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontFamily: 'Montserrat, sans-serif', fontSize: '0.875rem', color: '#ccc' }}>
                  <CheckCircle size={16} color="#008751" style={{ flexShrink: 0 }} /> {item}
                </div>
              ))}
            </div>
          </div>
          <div data-gsap="slide-right" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', minHeight: '260px', gridRow: 'span 2' }}>
              <Image src="/visual1.jpg" alt="about" fill sizes="25vw" style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', minHeight: '120px' }}>
              <Image src="/visual2.jpg" alt="about" fill sizes="25vw" style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', minHeight: '120px' }}>
              <Image src="/visual3.jpg" alt="about" fill sizes="25vw" style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION / VISION / VALEURS ── */}
      <section id="mission" style={{ padding: '7rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div data-gsap="fade-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: '#FCD116', fontFamily: 'Unbounded, sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>MISSION · VISION · VALEURS</p>
            <h2 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: 'clamp(1.6rem, 3vw, 2.5rem)' }}>Ce qui nous anime</h2>
          </div>
          <div data-gsap-stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {VALEURS.map(({ icon: Icon, color, label, text }) => (
              <div key={label} style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: '20px', padding: '2.5rem 2rem', transition: 'border-color 0.3s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = color + '55')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#1a1a1a')}>
                <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: color + '18', border: `1px solid ${color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <Icon size={26} color={color} strokeWidth={1.5} />
                </div>
                <h3 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: '1rem', marginBottom: '1rem', color: '#fff' }}>{label}</h3>
                <p style={{ fontFamily: 'Montserrat, sans-serif', color: '#777', lineHeight: 1.8, fontSize: '0.9rem' }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section id="comment-ca-marche" style={{ padding: '7rem 2rem', background: '#080808' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div data-gsap="fade-up" style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
            <p style={{ color: '#E8112D', fontFamily: 'Unbounded, sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>PROCESSUS</p>
            <h2 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', marginBottom: '1rem' }}>Comment ça marche ?</h2>
            <p style={{ fontFamily: 'Montserrat, sans-serif', color: '#666', fontSize: '1rem', maxWidth: '500px', margin: '0 auto' }}>
              Commander une tenue africaine n'a jamais été aussi simple.
            </p>
          </div>
          <div data-gsap-stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {STEPS.map(({ n, icon: Icon, color, bg, border, title, desc }) => (
              <div key={n} style={{ background: '#111', border: `1px solid #1a1a1a`, borderRadius: '20px', padding: '2rem 1.75rem', position: 'relative', overflow: 'hidden', transition: 'border-color 0.3s, transform 0.3s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = border; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#1a1a1a'; (e.currentTarget as HTMLElement).style.transform = 'none' }}>
                <div style={{ position: 'absolute', top: '1.25rem', right: '1.5rem', fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: '3.5rem', color: '#1a1a1a', lineHeight: 1 }}>{n}</div>
                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: bg, border: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <Icon size={24} color={color} strokeWidth={1.5} />
                </div>
                <h3 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: '0.9rem', marginBottom: '0.75rem', color: '#fff', lineHeight: 1.4 }}>{title}</h3>
                <p style={{ fontFamily: 'Montserrat, sans-serif', color: '#666', lineHeight: 1.8, fontSize: '0.85rem' }}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link href="/catalogue">
              <button style={{ background: 'linear-gradient(135deg, #008751, #00a862)', color: '#fff', padding: '1rem 2.5rem', borderRadius: '50px', fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: '0.9rem', boxShadow: '0 8px 40px rgba(0,135,81,0.4)', transition: 'transform 0.3s', cursor: 'pointer', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'none')}>
                Commencer maintenant <ArrowRight size={17} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── BANDEAU STYLISTES ── */}
      <section style={{ background: 'linear-gradient(135deg, #008751 0%, #006b40 100%)', padding: '5rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '350px', height: '350px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(0,0,0,0.1)' }} />
        <div data-gsap="zoom-in" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Image src="/logo-icon.jpg" alt="logo" width={80} height={80} style={{ borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1.5rem', border: '3px solid rgba(255,255,255,0.3)', display: 'block' }} />
          <h2 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', marginBottom: '1rem', color: '#fff' }}>Vous êtes styliste ?</h2>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            Rejoignez la plateforme gratuitement et exposez vos créations à des milliers de clients partout en Afrique et dans la diaspora.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/auth/register">
              <button style={{ background: '#FCD116', color: '#0A0A0A', padding: '1rem 2.5rem', borderRadius: '50px', fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: '0.9rem', cursor: 'pointer', transition: 'transform 0.3s', boxShadow: '0 8px 40px rgba(252,209,22,0.4)', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
                <UserPlus size={18} /> Créer mon espace gratuit
              </button>
            </Link>
            <Link href="#comment-ca-marche">
              <button style={{ background: 'transparent', color: '#fff', padding: '1rem 2rem', borderRadius: '50px', fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.3s', border: '2px solid rgba(255,255,255,0.4)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)')}>
                En savoir plus
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ padding: '7rem 2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div data-gsap="fade-up" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ color: '#008751', fontFamily: 'Unbounded, sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>FAQ</p>
            <h2 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: 'clamp(1.6rem, 3vw, 2.5rem)' }}>Questions fréquentes</h2>
          </div>
          <div data-gsap-stagger style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: '7rem 2rem', background: '#080808' }}>
        <div className="contact-grid" style={{ maxWidth: '1100px', margin: '0 auto' }}>

          {/* Infos contact */}
          <div data-gsap="slide-left">
            <p style={{ color: '#FCD116', fontFamily: 'Unbounded, sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>CONTACT</p>
            <h2 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginBottom: '1.25rem', lineHeight: 1.2 }}>
              Parlons de votre<br /><span style={{ color: '#008751' }}>projet ensemble</span>
            </h2>
            <p style={{ fontFamily: 'Montserrat, sans-serif', color: '#666', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '3rem' }}>
              Une question, une suggestion ou envie de rejoindre la plateforme ? Notre équipe est disponible pour vous accompagner.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { icon: MapPin, color: '#008751', label: 'Localisation', val: 'Cotonou, Bénin — Afrique de l\'Ouest' },
                { icon: Phone, color: '#FCD116', label: 'WhatsApp', val: '+229 97 XX XX XX' },
                { icon: Mail, color: '#E8112D', label: 'Email', val: 'contact@dahomeytech.com' },
                { icon: Star, color: '#25D366', label: 'Réseaux sociaux', val: '@dahomeytech sur Instagram & TikTok' },
              ].map(({ icon: Icon, color, label, val }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: color + '15', border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={18} color={color} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Unbounded, sans-serif', fontSize: '0.7rem', fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>{label}</div>
                    <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.9rem', color: '#ccc' }}>{val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formulaire */}
          <div data-gsap="slide-right">
            {sent ? (
              <div style={{ background: 'rgba(0,135,81,0.1)', border: '1px solid rgba(0,135,81,0.3)', borderRadius: '20px', padding: '3rem 2rem', textAlign: 'center' }}>
                <CheckCircle size={48} color="#008751" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: '1.1rem', marginBottom: '0.75rem', color: '#fff' }}>Message envoyé !</h3>
                <p style={{ fontFamily: 'Montserrat, sans-serif', color: '#888', fontSize: '0.9rem', lineHeight: 1.7 }}>Merci pour votre message. Nous vous répondrons dans les plus brefs délais.</p>
                <button onClick={() => setSent(false)} style={{ marginTop: '1.5rem', background: 'transparent', border: '1px solid #2a2a2a', color: '#888', padding: '0.6rem 1.5rem', borderRadius: '50px', fontFamily: 'Montserrat, sans-serif', fontSize: '0.85rem', cursor: 'pointer' }}>
                  Nouveau message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContact} style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: '20px', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ fontFamily: 'Unbounded, sans-serif', fontSize: '0.65rem', fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.6rem' }}>Nom complet</label>
                  <input required style={inputStyle} placeholder="Votre nom" value={contactForm.nom} onChange={e => setContactForm({ ...contactForm, nom: e.target.value })}
                    onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#2a2a2a')} />
                </div>
                <div>
                  <label style={{ fontFamily: 'Unbounded, sans-serif', fontSize: '0.65rem', fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.6rem' }}>Email</label>
                  <input required type="email" style={inputStyle} placeholder="votre@email.com" value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                    onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#2a2a2a')} />
                </div>
                <div>
                  <label style={{ fontFamily: 'Unbounded, sans-serif', fontSize: '0.65rem', fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.6rem' }}>Message</label>
                  <textarea required rows={5} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Comment pouvons-nous vous aider ?" value={contactForm.message} onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                    onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#2a2a2a')} />
                </div>
                <button type="submit" style={{ background: 'linear-gradient(135deg, #008751, #00a862)', color: '#fff', padding: '1rem', borderRadius: '12px', fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 8px 30px rgba(0,135,81,0.3)', transition: 'transform 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'none')}>
                  Envoyer le message <ArrowRight size={17} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
