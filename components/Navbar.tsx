'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, LogIn, ShoppingBag } from 'lucide-react'

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
    top: 0, left: 0, right: 0,
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

  const linkStyle: React.CSSProperties = {
    color: '#ccc',
    transition: 'color 0.2s',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '0.875rem',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
  }

  const btnStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #008751, #00a862)',
    color: '#fff',
    padding: '0.6rem 1.4rem',
    borderRadius: '50px',
    fontWeight: 600,
    fontSize: '0.875rem',
    fontFamily: 'Montserrat, sans-serif',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 20px rgba(0,135,81,0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
  }

  return (
    <>
      <nav style={navStyle}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Image src="/logo-icon.jpg" alt="logo" width={40} height={40} style={{ borderRadius: '50%', objectFit: 'cover' }} />
          <span style={logoTextStyle}>DAHOMEY-TECH</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="nav-links-desktop">
          <Link href="/catalogue" style={linkStyle}
            onMouseEnter={e => (e.currentTarget.style.color = '#FCD116')}
            onMouseLeave={e => (e.currentTarget.style.color = '#ccc')}>
            <ShoppingBag size={15} />
            Catalogue
          </Link>
          <Link href="/auth/login">
            <button style={btnStyle}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(0,135,81,0.5)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,135,81,0.3)' }}>
              <LogIn size={15} />
              Rejoindre
            </button>
          </Link>
        </div>

        <button
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'none', padding: '8px' }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav-burger"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Menu mobile */}
      <div style={{
        position: 'fixed', top: '72px', left: 0, right: 0, bottom: 0,
        background: 'rgba(10,10,10,0.98)',
        display: menuOpen ? 'flex' : 'none',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: '2.5rem', zIndex: 999, backdropFilter: 'blur(20px)',
      }}>
        <Link href="/catalogue" style={{ fontFamily: 'Unbounded, sans-serif', fontSize: '1.5rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
          onClick={() => setMenuOpen(false)}>
          <ShoppingBag size={24} color="#FCD116" />
          Catalogue
        </Link>
        <Link href="/auth/login" onClick={() => setMenuOpen(false)}>
          <button style={{ ...btnStyle, fontSize: '1rem', padding: '0.8rem 2rem' }}>
            <LogIn size={18} />
            Rejoindre
          </button>
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
