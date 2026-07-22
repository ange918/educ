'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ITEMS = [
  { href: '/', label: 'Accueil', icon: 'bxs-home', match: (p: string) => p === '/' },
  { href: '/catalogue', label: 'Stylistes', icon: 'bxs-group', match: (p: string) => p.startsWith('/styliste') },
  { href: '/catalogue?focus=recherche', label: 'Rechercher', icon: 'bx-search', match: (p: string) => p.startsWith('/catalogue') },
  { href: '/catalogue#categories', label: 'Catégories', icon: 'bxs-layer', match: (p: string) => p.startsWith('/tenue') },
  { href: '/auth/login', label: 'Compte', icon: 'bx-user', match: (p: string) => p.startsWith('/auth') || p.startsWith('/dashboard') },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="bottom-nav"
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 900,
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid var(--bordure)',
        display: 'flex', alignItems: 'stretch', justifyContent: 'space-around',
        height: '64px',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {ITEMS.map(({ href, label, icon, match }) => {
        const active = match(pathname)
        return (
          <Link key={label} href={href} style={{ flex: 1, display: 'flex' }} data-track={`bottomnav:${label.toLowerCase()}`}>
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: '3px', width: '100%', color: active ? 'var(--vert)' : 'var(--gris-texte)',
              transition: 'color 0.2s',
            }}>
              <i className={`bx ${icon}`} style={{ fontSize: '20px' }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', fontWeight: active ? 700 : 500 }}>{label}</span>
            </div>
          </Link>
        )
      })}
      <style>{`
        @media (min-width: 900px) { .bottom-nav { display: none !important; } }
      `}</style>
    </nav>
  )
}
