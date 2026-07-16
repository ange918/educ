'use client'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, ShieldCheck, FileText, Cookie, ArrowRight } from 'lucide-react'

export default function Footer() {
  const s = {
    footer: {
      background: 'var(--blanc)',
      borderTop: '1px solid var(--bordure)',
      padding: '3rem 1.5rem 2rem',
    } as React.CSSProperties,
    grid: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '2.5rem',
      marginBottom: '2.5rem',
    } as React.CSSProperties,
    logo: {
      fontFamily: 'Sora, sans-serif',
      fontWeight: 800,
      fontSize: '1.05rem',
      color: 'var(--encre)',
      marginBottom: '0.75rem',
      display: 'block',
    } as React.CSSProperties,
    title: {
      fontFamily: 'Sora, sans-serif',
      fontSize: '0.72rem',
      fontWeight: 700,
      color: 'var(--vert)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase' as const,
      marginBottom: '1.1rem',
    },
    link: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: 'var(--gris-texte)',
      fontSize: '0.85rem',
      marginBottom: '0.6rem',
      transition: 'color 0.2s',
      fontFamily: 'Inter, sans-serif',
    } as React.CSSProperties,
    bar: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.5rem 0 0',
      borderTop: '1px solid var(--bordure)',
      flexWrap: 'wrap' as const,
      gap: '1rem',
    } as React.CSSProperties,
  }

  const socials = [
    { icon: 'bxl-instagram', color: '#E1306C', href: '#' },
    { icon: 'bxl-facebook', color: '#1877F2', href: '#' },
    { icon: 'bxl-tiktok', color: 'var(--encre)', href: '#' },
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
          <Image src="/logo-icon.jpg" alt="logo" width={44} height={44} style={{ borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem' }} />
          <span style={s.logo}>DAHOMEY-TECH</span>
          <p style={{ color: 'var(--gris-texte)', fontSize: '0.85rem', lineHeight: '1.7', fontFamily: 'Inter, sans-serif' }}>
            La marketplace des stylistes africains vérifiés. Commandez, découvrez, portez la beauté africaine.
          </p>
          <div style={{ display: 'flex', gap: '0.65rem', marginTop: '1.25rem' }}>
            {socials.map(({ icon, color, href }) => (
              <a key={icon} href={href} style={{ textDecoration: 'none' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--creme)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid var(--bordure)', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = color; (e.currentTarget as HTMLElement).style.background = `${color}18` }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--bordure)'; (e.currentTarget as HTMLElement).style.background = 'var(--creme)' }}>
                  <i className={`bx ${icon}`} style={{ fontSize: '1.1rem', color }} />
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
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--vert)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--gris-texte)')}>
              <ArrowRight size={13} color="var(--vert)" />
              {label}
            </Link>
          ))}
        </div>

        {/* Catégories */}
        <div>
          <div style={s.title}>Catégories</div>
          {categories.map(c => (
            <Link key={c} href="/catalogue" style={s.link}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--vert)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--gris-texte)')}>
              <ArrowRight size={13} color="var(--vert)" />
              {c}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div>
          <div style={s.title}>Contact</div>
          <p style={{ ...s.link, cursor: 'default' }}>
            <MapPin size={14} color="var(--vert)" /> Cotonou, Bénin
          </p>
          <p style={{ ...s.link, cursor: 'default' }}>
            <Phone size={14} color="var(--vert)" /> +229 97 00 00 00
          </p>
          <p style={{ ...s.link, cursor: 'default' }}>
            <Mail size={14} color="var(--vert)" /> contact@dahomey-tech.bj
          </p>
          <div style={{ marginTop: '1.25rem' }}>
            <div className="liser-benin" style={{ height: '4px', borderRadius: '2px', width: '60px' }} />
            <p style={{ marginTop: '0.65rem', color: 'var(--gris-texte)', fontSize: '0.75rem', fontFamily: 'Inter, sans-serif' }}>🇧🇯 Bénin · Afrique de l'Ouest</p>
          </div>
        </div>
      </div>

      <div style={s.bar}>
        <p style={{ color: 'var(--gris-texte)', fontSize: '0.8rem', fontFamily: 'Inter, sans-serif' }}>
          Fait avec fierté au Bénin 🇧🇯 — © {new Date().getFullYear()} DAHOMEY-TECH
        </p>
        <div style={{ display: 'flex', gap: '1.25rem' }}>
          {legalLinks.map(({ label, icon }) => (
            <span key={label} style={{ color: 'var(--gris-texte)', fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: '0.35rem', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--encre)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--gris-texte)')}>
              {icon}{label}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}
