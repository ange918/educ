'use client'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const s = {
    footer: {
      background: 'var(--encre)',
      padding: '3.5rem 0 2rem',
    } as React.CSSProperties,
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '2.5rem',
      marginBottom: '2.5rem',
    } as React.CSSProperties,
    title: {
      fontFamily: 'Sora, sans-serif',
      fontSize: '0.72rem',
      fontWeight: 700,
      color: 'var(--jaune)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase' as const,
      marginBottom: '1.1rem',
    },
    link: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: 'rgba(255,255,255,0.65)',
      fontSize: '0.85rem',
      marginBottom: '0.6rem',
      transition: 'color 0.2s',
      fontFamily: 'Inter, sans-serif',
    } as React.CSSProperties,
    bar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: '1.5rem',
      borderTop: '1px solid rgba(255,255,255,0.12)',
      flexWrap: 'wrap' as const,
      gap: '1rem',
    } as React.CSSProperties,
  }

  const socials = [
    { icon: 'bxl-instagram', href: '#' },
    { icon: 'bxl-facebook', href: '#' },
    { icon: 'bxl-tiktok', href: '#' },
    { icon: 'bxl-whatsapp', href: '#' },
  ]

  const navLinks: [string, string][] = [
    ['Catalogue', '/catalogue'],
    ['Nos stylistes', '/catalogue'],
    ['Devenir styliste', '/auth/register'],
    ['Connexion', '/auth/login'],
  ]

  const categories = ['Boubou', 'Pagne Wax', 'Kaftan', 'Dashiki', 'Robe de soirée', 'Costume africain']

  return (
    <footer style={s.footer}>
      <div className="dt-container">
        <div style={s.grid}>
          {/* Marque */}
          <div>
            <Image src="/logo-icon.jpg" alt="logo" width={44} height={44} style={{ borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem' }} />
            <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '1.05rem', color: '#fff', display: 'block', marginBottom: '0.75rem' }}>DAHOMEY-TECH</span>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: '1.7', fontFamily: 'Inter, sans-serif' }}>
              La marketplace des stylistes africains vérifiés. Commandez, découvrez, portez la beauté africaine.
            </p>
            <div style={{ display: 'flex', gap: '0.65rem', marginTop: '1.25rem' }}>
              {socials.map(({ icon, href }) => (
                <a key={icon} href={href} style={{ textDecoration: 'none' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.12)', transition: 'all 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--vert)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)' }}>
                    <i className={`bx ${icon}`} style={{ fontSize: '1.15rem', color: '#fff' }} />
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
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}>
                <i className="bx bx-chevron-right" style={{ fontSize: '14px', color: 'var(--vert-clair)' }} />
                {label}
              </Link>
            ))}
          </div>

          {/* Catégories */}
          <div>
            <div style={s.title}>Catégories</div>
            {categories.map(c => (
              <Link key={c} href="/catalogue" style={s.link}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}>
                <i className="bx bx-chevron-right" style={{ fontSize: '14px', color: 'var(--vert-clair)' }} />
                {c}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={s.title}>Contact</div>
            <p style={{ ...s.link, cursor: 'default' }}>
              <i className="bx bxs-map" style={{ fontSize: '15px', color: 'var(--vert-clair)' }} /> Cotonou, Bénin
            </p>
            <p style={{ ...s.link, cursor: 'default' }}>
              <i className="bx bx-phone" style={{ fontSize: '15px', color: 'var(--vert-clair)' }} /> +229 97 00 00 00
            </p>
            <p style={{ ...s.link, cursor: 'default' }}>
              <i className="bx bx-envelope" style={{ fontSize: '15px', color: 'var(--vert-clair)' }} /> contact@dahomey-tech.bj
            </p>
            <div style={{ marginTop: '1.25rem' }}>
              <div className="liser-benin" style={{ height: '4px', borderRadius: '2px', width: '60px' }} />
              <p style={{ marginTop: '0.65rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontFamily: 'Inter, sans-serif' }}>🇧🇯 Bénin · Afrique de l'Ouest</p>
            </div>
          </div>
        </div>

        <div style={s.bar}>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', fontFamily: 'Inter, sans-serif' }}>
            Fait avec fierté au Bénin 🇧🇯 — © {new Date().getFullYear()} DAHOMEY-TECH
          </p>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            {['Confidentialité', 'CGU', 'Cookies'].map(label => (
              <span key={label} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
