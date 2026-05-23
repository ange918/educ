import Link from 'next/link'
import Image from 'next/image'

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
      display: 'block',
      color: '#888',
      fontSize: '0.875rem',
      marginBottom: '0.6rem',
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

  return (
    <footer style={s.footer}>
      <div style={s.grid}>
        <div>
          <Image src="/logo-icon.jpg" alt="logo" width={48} height={48} style={{ borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem' }} />
          <span style={s.logo}>DAHOMEY-TECH</span>
          <p style={{ color: '#666', fontSize: '0.875rem', lineHeight: '1.7', fontFamily: 'Montserrat, sans-serif' }}>
            La première plateforme dédiée aux stylistes africains. Commandez, découvrez, portez la beauté africaine.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            {[
              { icon: 'bxl-instagram', color: '#E1306C' },
              { icon: 'bxl-facebook', color: '#1877F2' },
              { icon: 'bxl-tiktok', color: '#fff' },
              { icon: 'bxl-whatsapp', color: '#25D366' },
            ].map(({ icon, color }) => (
              <div key={icon} style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid #2a2a2a', transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = color; (e.currentTarget as HTMLElement).style.background = `${color}22` }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#2a2a2a'; (e.currentTarget as HTMLElement).style.background = '#1a1a1a' }}>
                <i className={`bx ${icon}`} style={{ fontSize: '1.2rem', color }} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={s.title}>Navigation</div>
          {[['Catalogue', '/catalogue'], ['Nos stylistes', '/catalogue'], ['Devenir styliste', '/auth/register'], ['Comment ça marche', '/']].map(([l, h]) => (
            <Link key={l} href={h} style={s.link}
              onMouseEnter={e => (e.currentTarget.style.color = '#FCD116')}
              onMouseLeave={e => (e.currentTarget.style.color = '#888')}>
              {l}
            </Link>
          ))}
        </div>

        <div>
          <div style={s.title}>Catégories</div>
          {['Boubou', 'Pagne Wax', 'Kaftan', 'Dashiki', 'Robe de soirée', 'Costume africain'].map(c => (
            <Link key={c} href="/catalogue" style={s.link}
              onMouseEnter={e => (e.currentTarget.style.color = '#FCD116')}
              onMouseLeave={e => (e.currentTarget.style.color = '#888')}>
              {c}
            </Link>
          ))}
        </div>

        <div>
          <div style={s.title}>Contact</div>
          <p style={{ ...s.link, cursor: 'default', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <i className="bx bx-map" style={{ color: '#008751', fontSize: '1rem' }} /> Cotonou, Bénin
          </p>
          <p style={{ ...s.link, cursor: 'default', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <i className="bx bx-phone" style={{ color: '#008751', fontSize: '1rem' }} /> +229 97 00 00 00
          </p>
          <p style={{ ...s.link, cursor: 'default', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <i className="bx bx-envelope" style={{ color: '#008751', fontSize: '1rem' }} /> contact@dahomey-tech.bj
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
          {['Confidentialité', 'CGU', 'Cookies'].map(l => (
            <span key={l} style={{ color: '#444', fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif' }}>{l}</span>
          ))}
        </div>
      </div>
    </footer>
  )
}
