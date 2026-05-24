'use client'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, ShieldCheck, FileText, Cookie, ArrowRight } from 'lucide-react'

export default function Footer() {
  const s = {
    footer: {
      background: '#080808',
      borderTop: '1px solid #1a1a1a',
      padding: '4rem 2rem 2rem',
    } as React.CSSProperties,
    grid: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '3rem',
      marginBottom: '3rem',
    } as React.CSSProperties,
    logo: {
      fontFamily: 'Unbounded, sans-serif',
      fontWeight: 900,
      fontSize: '1.2rem',
      background: 'linear-gradient(90deg, #008751, #FCD116, #E8112D)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '1rem',
      display: 'block',
    } as React.CSSProperties,
    title: {
      fontFamily: 'Unbounded, sans-serif',
      fontSize: '0.75rem',
      fontWeight: 700,
      color: '#008751',
      letterSpacing: '0.1em',
      textTransform: 'uppercase' as const,
      marginBottom: '1.2rem',
    },
    link: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#888',
      fontSize: '0.875rem',
      marginBottom: '0.65rem',
      transition: 'color 0.2s',
      fontFamily: 'Montserrat, sans-serif',
    } as React.CSSProperties,
    bar: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.5rem 0 0',
      borderTop: '1px solid #1a1a1a',
      flexWrap: 'wrap' as const,
      gap: '1rem',
    } as React.CSSProperties,
  }

  const socials = [
    { icon: 'bxl-instagram', color: '#E1306C', href: '#' },
    { icon: 'bxl-facebook', color: '#1877F2', href: '#' },
    { icon: 'bxl-tiktok', color: '#fff', href: '#' },
    { icon: 'bxl-whatsapp', color: '#25D366', href: '#' },
  ]

  const navLinks = [
    ['Catalogue', '/catalogue'],
    ['Nos stylistes', '/catalogue'],
    ['Devenir styliste', '/auth/register'],
    ['Comment ça marche', '/'],
  ]

  const categories = ['Boubou', 'Pagne Wax', 'Kaftan', 'Dashiki', 'Robe de soirée', 'Costume africain']

  const legalLinks = [
    { label: 'Confidentialité', icon: <ShieldCheck size={14} /> },
    { label: 'CGU', icon: <FileText size={14} /> },
    { label: 'Cookies', icon: <Cookie size={14} /> },
  ]

  return (
    <footer style={s.footer}>
      <div style={s.grid}>
        {/* Colonne marque */}
        <div>
          <Image src="/logo-icon.jpg" alt="logo" width={48} height={48} style={{ borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem' }} />
          <span style={s.logo}>DAHOMEY-TECH</span>
          <p style={{ color: '#666', fontSize: '0.875rem', lineHeight: '1.7', fontFamily: 'Montserrat, sans-serif' }}>
            La première plateforme dédiée aux stylistes africains. Commandez, découvrez, portez la beauté africaine.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            {socials.map(({ icon, color, href }) => (
              <a key={icon} href={href} style={{ textDecoration: 'none' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid #2a2a2a', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = color; (e.currentTarget as HTMLElement).style.background = `${color}22` }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#2a2a2a'; (e.currentTarget as HTMLElement).style.background = '#1a1a1a' }}>
                  <i className={`bx ${icon}`} style={{ fontSize: '1.2rem', color }} />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <div style={s.title}>Navigation</div>
          {navLinks.map(([label, href]) => (
            <Link key={label} href={href} style={s.link}
              onMouseEnter={e => (e.currentTarget.style.color = '#FCD116')}
              onMouseLeave={e => (e.currentTarget.style.color = '#888')}>
              <ArrowRight size={13} color="#008751" />
              {label}
            </Link>
          ))}
        </div>

        {/* Catégories */}
        <div>
          <div style={s.title}>Catégories</div>
          {categories.map(c => (
            <Link key={c} href="/catalogue" style={s.link}
              onMouseEnter={e => (e.currentTarget.style.color = '#FCD116')}
              onMouseLeave={e => (e.currentTarget.style.color = '#888')}>
              <ArrowRight size={13} color="#008751" />
              {c}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div>
          <div style={s.title}>Contact</div>
          <p style={{ ...s.link, cursor: 'default' }}>
            <MapPin size={14} color="#008751" /> Cotonou, Bénin
          </p>
          <p style={{ ...s.link, cursor: 'default' }}>
            <Phone size={14} color="#008751" /> +229 97 00 00 00
          </p>
          <p style={{ ...s.link, cursor: 'default' }}>
            <Mail size={14} color="#008751" /> contact@dahomey-tech.bj
          </p>
          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ background: 'linear-gradient(135deg, #008751 33%, #FCD116 33% 66%, #E8112D 66%)', height: '4px', borderRadius: '2px', width: '60px' }} />
            <p style={{ marginTop: '0.75rem', color: '#555', fontSize: '0.75rem', fontFamily: 'Montserrat, sans-serif' }}>🇧🇯 Bénin · Afrique de l'Ouest</p>
          </div>
        </div>
      </div>

      <div style={s.bar}>
        <p style={{ color: '#444', fontSize: '0.875rem', fontFamily: 'Montserrat, sans-serif' }}>
          Fait avec fierté au Bénin 🇧🇯 — © {new Date().getFullYear()} DAHOMEY-TECH
        </p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {legalLinks.map(({ label, icon }) => (
            <span key={label} style={{ color: '#444', fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', display: 'flex', alignItems: 'center', gap: '0.35rem', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#888')}
              onMouseLeave={e => (e.currentTarget.style.color = '#444')}>
              {icon}{label}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}
