'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Tenue, Styliste } from '@/lib/supabase/types'
import { formatPrix, buildWhatsAppLink } from '@/lib/utils'

type TenueWithStyliste = Tenue & { stylistes?: Styliste }

export default function TenueCard({ tenue }: { tenue: TenueWithStyliste }) {
  const [hovered, setHovered] = useState(false)
  const photo = tenue.photo_principale || tenue.photos?.[0] || ''
  const styliste = tenue.stylistes
  const whatsapp = styliste?.whatsapp || ''
  const wa = tenue.whatsapp_message
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(tenue.whatsapp_message)}`
    : buildWhatsAppLink(whatsapp, tenue.nom, tenue.prix)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--blanc)', borderRadius: '16px', overflow: 'hidden',
        border: '1px solid var(--bordure)', transition: 'all 0.25s ease',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? '0 16px 40px rgba(20,32,26,0.1)' : '0 1px 3px rgba(20,32,26,0.05)',
        cursor: 'pointer',
      }}
    >
      <Link href={`/tenue/${tenue.id}`}>
        <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: 'var(--creme)' }}>
          {photo ? (
            <Image src={photo} alt={tenue.nom} fill sizes="(max-width: 768px) 50vw, 25vw" style={{ objectFit: 'cover', transition: 'transform 0.4s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--bordure)' }}>
              <i className="bx bx-tag" style={{ fontSize: '34px' }} />
            </div>
          )}
          {!tenue.disponible && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,32,26,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ background: 'var(--rouge)', color: '#fff', padding: '0.35rem 0.9rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 700, fontFamily: 'Orbitron, sans-serif' }}>ÉPUISÉ</span>
            </div>
          )}
          <div style={{ position: 'absolute', top: '0.6rem', left: '0.6rem', background: 'rgba(255,255,255,0.92)', color: 'var(--vert)', padding: '0.28rem 0.65rem', borderRadius: '50px', fontSize: '0.62rem', fontWeight: 700, fontFamily: 'Orbitron, sans-serif', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {tenue.categorie}
          </div>
        </div>
      </Link>
      <div style={{ padding: '0.85rem 0.9rem 0.95rem' }}>
        <Link href={`/tenue/${tenue.id}`}>
          <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.85rem', fontWeight: 700, color: 'var(--encre)', marginBottom: '0.3rem', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>{tenue.nom}</h3>
        </Link>
        <p style={{ color: 'var(--gris-texte)', fontSize: '0.72rem', marginBottom: '0.6rem', fontFamily: 'Inter, sans-serif' }}>
          par <Link href={styliste?.slug ? `/styliste/${styliste.slug}` : '#'} style={{ color: 'var(--vert)', fontWeight: 600 }}>{styliste?.nom || '—'}</Link>
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
          <span style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 800, fontSize: '0.95rem', color: 'var(--encre)' }}>{formatPrix(tenue.prix)}</span>
          {tenue.disponible && whatsapp && (
            <a href={wa} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
              <button style={{ background: '#25D366', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', boxShadow: '0 3px 10px rgba(37,211,102,0.35)' }}>
                <i className="bx bxl-whatsapp" style={{ fontSize: '17px' }} />
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
