'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.05 }
    )
  }, [])

  const navStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0, left: 0, right: 0,
    zIndex: 1000,
    background: 'rgba(247,245,239,0.92)',
    backdropFilter: 'blur(14px)',
    borderBottom: scrolled ? '1px solid var(--bordure)' : '1px solid transparent',
    transition: 'border-color 0.3s ease',
  }

  const linkStyle: React.CSSProperties = {
    color: 'var(--encre)',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.875rem',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
  }

  const btnStyle: React.CSSProperties = {
    background: 'var(--vert)',
    color: '#fff',
    padding: '0.55rem 1.25rem',
    borderRadius: '50px',
    fontWeight: 700,
    fontSize: '0.8rem',
    fontFamily: 'Sora, sans-serif',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 16px rgba(0,135,81,0.28)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    border: 'none',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  }

  return (
    <>
      <nav ref={navRef} style={navStyle}>
        <div className="dt-container" style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Image src="/logo-icon.jpg" alt="DAHOMEY-TECH" width={36} height={36}
              style={{ borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--vert)' }} />
            <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '0.95rem', color: 'var(--encre)', display: 'none' }} className="nav-wordmark">
              DAHOMEY-TECH
            </span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} className="nav-links-desktop">
            <Link href="/catalogue" style={linkStyle}>
              <i className="bx bx-search" style={{ fontSize: '15px' }} /> Explorer
            </Link>
            <Link href="/catalogue" style={linkStyle}>Stylistes</Link>
            <Link href="/auth/login" style={{ ...linkStyle, color: 'var(--gris-texte)' }}>
              <i className="bx bx-log-in" style={{ fontSize: '15px' }} /> Connexion
            </Link>
            <Link href="/auth/register">
              <button style={btnStyle}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}>
                <i className="bx bxs-store" style={{ fontSize: '15px' }} /> Devenir styliste
              </button>
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }} className="nav-mobile-actions">
            <Link href="/auth/register">
              <button style={{ ...btnStyle, padding: '0.5rem 0.9rem', fontSize: '0.75rem' }}>
                <i className="bx bxs-store" style={{ fontSize: '14px' }} /> Vendre
              </button>
            </Link>
            <button
              style={{ background: 'none', border: 'none', color: 'var(--encre)', cursor: 'pointer', padding: '4px', fontSize: '24px', display: 'flex' }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu">
              <i className={`bx ${menuOpen ? 'bx-x' : 'bx-menu'}`} />
            </button>
          </div>
        </div>
      </nav>

      <div style={{
        position: 'fixed', top: '64px', left: 0, right: 0, bottom: 0,
        background: 'rgba(247,245,239,0.99)',
        display: menuOpen ? 'flex' : 'none',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: '2rem', zIndex: 999, backdropFilter: 'blur(20px)',
      }}>
        <Link href="/catalogue" style={{ fontFamily: 'Sora, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: 'var(--encre)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
          onClick={() => setMenuOpen(false)}>
          <i className="bx bx-search" style={{ fontSize: '20px', color: 'var(--vert)' }} /> Explorer le catalogue
        </Link>
        <Link href="/auth/login" style={{ fontFamily: 'Sora, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: 'var(--encre)' }}
          onClick={() => setMenuOpen(false)}>
          Connexion
        </Link>
        <Link href="/auth/register" onClick={() => setMenuOpen(false)}>
          <button style={{ ...btnStyle, fontSize: '1rem', padding: '0.8rem 2rem' }}>
            <i className="bx bxs-store" style={{ fontSize: '18px' }} /> Devenir styliste
          </button>
        </Link>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile-actions { display: none !important; }
          .nav-wordmark { display: block !important; }
        }
      `}</style>
    </>
  )
}
