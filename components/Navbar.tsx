'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: '0 2rem',
    height: '72px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'all 0.3s ease',
    background: scrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
    backdropFilter: scrolled ? 'blur(20px)' : 'none',
    borderBottom: scrolled ? '1px solid rgba(0,135,81,0.2)' : 'none',
  }

  const logoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  }

  const logoTextStyle: React.CSSProperties = {
    fontFamily: 'Unbounded, sans-serif',
    fontWeight: 900,
    fontSize: '1.1rem',
    letterSpacing: '0.05em',
    background: 'linear-gradient(90deg, #008751, #FCD116, #E8112D)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  }

  const linksStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '0.875rem',
    fontWeight: 500,
  }

  const btnStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #008751, #00a862)',
    color: '#fff',
    padding: '0.6rem 1.5rem',
    borderRadius: '50px',
    fontWeight: 600,
    fontSize: '0.875rem',
    fontFamily: 'Montserrat, sans-serif',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 20px rgba(0,135,81,0.3)',
  }

  const mobileMenuStyle: React.CSSProperties = {
    position: 'fixed',
    top: '72px',
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(10,10,10,0.98)',
    display: menuOpen ? 'flex' : 'none',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',
    zIndex: 999,
    backdropFilter: 'blur(20px)',
  }

  return (
    <>
      <nav style={navStyle}>
        <Link href="/" style={logoStyle}>
          <Image src="/logo-icon.jpg" alt="logo" width={40} height={40} style={{ borderRadius: '50%', objectFit: 'cover' }} />
          <span style={logoTextStyle}>DAHOMEY-TECH</span>
        </Link>

        <div style={{ ...linksStyle, display: 'flex' }} className="nav-links-desktop">
          <Link href="/catalogue" style={{ color: '#ccc', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#FCD116')}
            onMouseLeave={e => (e.currentTarget.style.color = '#ccc')}>
            Catalogue
          </Link>
          <Link href="/catalogue" style={{ color: '#ccc', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#FCD116')}
            onMouseLeave={e => (e.currentTarget.style.color = '#ccc')}>
            Stylistes
          </Link>
          <Link href="/dashboard" style={{ color: '#ccc', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#FCD116')}
            onMouseLeave={e => (e.currentTarget.style.color = '#ccc')}>
            Dashboard
          </Link>
          <Link href="/auth/login">
            <button style={btnStyle}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(0,135,81,0.5)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,135,81,0.3)' }}>
              Rejoindre
            </button>
          </Link>
        </div>

        <button
          style={{ background: 'none', display: 'none', flexDirection: 'column', gap: '5px', padding: '8px' }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav-burger"
        >
          {[0,1,2].map(i => (
            <span key={i} style={{ display: 'block', width: '24px', height: '2px', background: '#fff', transition: 'all 0.3s' }} />
          ))}
        </button>
      </nav>

      <div style={mobileMenuStyle}>
        {['Catalogue', 'Stylistes', 'Dashboard'].map(item => (
          <Link key={item} href={`/${item.toLowerCase()}`} style={{ fontFamily: 'Unbounded, sans-serif', fontSize: '1.5rem', color: '#fff' }}
            onClick={() => setMenuOpen(false)}>
            {item}
          </Link>
        ))}
        <Link href="/auth/login" onClick={() => setMenuOpen(false)}>
          <button style={{ ...btnStyle, fontSize: '1rem', padding: '0.8rem 2rem' }}>Rejoindre</button>
        </Link>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-burger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
