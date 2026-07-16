'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, BadgeCheck, User } from 'lucide-react'
import type { Styliste } from '@/lib/supabase/types'

const GRADIENTS = [
  'linear-gradient(135deg, #008751, #00a862)',
  'linear-gradient(135deg, #14201A, #3a4a3f)',
  'linear-gradient(135deg, #E8112D, #b70c22)',
  'linear-gradient(135deg, #C8972A, #FCD116)',
]

function gradientFor(seed: string) {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = seed.charCodeAt(i) + ((h << 5) - h)
  return GRADIENTS[Math.abs(h) % GRADIENTS.length]
}

export default function StylisteCard({ styliste }: { styliste: Styliste }) {
  const [hovered, setHovered] = useState(false)
  const initiale = styliste.nom?.[0]?.toUpperCase() || '?'

  return (
    <Link href={`/styliste/${styliste.slug || styliste.id}`}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: 'var(--blanc)', borderRadius: '18px', overflow: 'hidden',
          border: '1px solid var(--bordure)', transition: 'all 0.25s ease',
          transform: hovered ? 'translateY(-4px)' : 'none',
          boxShadow: hovered ? '0 16px 40px rgba(20,32,26,0.1)' : '0 1px 3px rgba(20,32,26,0.05)',
          cursor: 'pointer',
        }}
      >
        <div style={{ position: 'relative', height: '150px', background: gradientFor(styliste.nom) }}>
          {styliste.photo_url ? (
            <Image src={styliste.photo_url} alt={styliste.nom} fill sizes="(max-width: 768px) 50vw, 25vw" style={{ objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '2.75rem', color: 'rgba(255,255,255,0.9)' }}>{initiale}</span>
            </div>
          )}
          {styliste.verified && (
            <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'rgba(255,255,255,0.95)', color: 'var(--vert)', padding: '0.3rem 0.65rem', borderRadius: '50px', fontSize: '0.65rem', fontWeight: 700, fontFamily: 'Sora, sans-serif', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <BadgeCheck size={12} />Vérifiée
            </div>
          )}
        </div>
        <div style={{ padding: '1rem 1.1rem 1.1rem' }}>
          <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: '0.95rem', fontWeight: 700, color: 'var(--encre)', marginBottom: '0.3rem' }}>{styliste.nom}</h3>
          <p style={{ color: 'var(--gris-texte)', fontSize: '0.75rem', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: styliste.bio ? '0.5rem' : 0 }}>
            <MapPin size={11} color="var(--vert)" />{styliste.ville}
          </p>
          {styliste.bio && (
            <p style={{ color: 'var(--gris-texte)', fontSize: '0.8rem', lineHeight: 1.5, fontFamily: 'Inter, sans-serif', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>
              {styliste.bio}
            </p>
          )}
          <div className="liser-benin" style={{ height: '3px', borderRadius: '2px', marginTop: '0.85rem', width: '36px' }} />
        </div>
      </div>
    </Link>
  )
}
