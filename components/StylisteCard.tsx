'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, BadgeCheck, ChevronRight, User } from 'lucide-react'
import type { Styliste } from '@/lib/supabase/types'

export default function StylisteCard({ styliste }: { styliste: Styliste }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link href={`/styliste/${styliste.slug || styliste.id}`}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ background: '#111', borderRadius: '20px', overflow: 'hidden', border: `1px solid ${hovered ? '#FCD116' : '#1a1a1a'}`, transition: 'all 0.3s ease', transform: hovered ? 'translateY(-8px)' : 'none', boxShadow: hovered ? '0 24px 60px rgba(252,209,22,0.15)' : '0 2px 8px rgba(0,0,0,0.3)', cursor: 'pointer' }}
      >
        <div style={{ position: 'relative', height: '220px', background: '#1a1a1a' }}>
          {styliste.photo_url ? (
            <Image src={styliste.photo_url} alt={styliste.nom} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.05)' : 'scale(1)' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={48} color="#333" />
            </div>
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #111 0%, transparent 60%)' }} />
          {styliste.verified && (
            <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#008751', color: '#fff', padding: '0.3rem 0.65rem', borderRadius: '50px', fontSize: '0.65rem', fontWeight: 700, fontFamily: 'Unbounded, sans-serif', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <BadgeCheck size={11} />Vérifié
            </div>
          )}
        </div>
        <div style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
            <h3 style={{ fontFamily: 'Unbounded, sans-serif', fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{styliste.nom}</h3>
            <ChevronRight size={16} color={hovered ? '#FCD116' : '#555'} style={{ transition: 'color 0.3s' }} />
          </div>
          <p style={{ color: '#888', fontSize: '0.75rem', marginBottom: '1rem', fontFamily: 'Montserrat, sans-serif', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <MapPin size={11} color="#008751" />{styliste.ville}
          </p>
          {styliste.bio && (
            <p style={{ color: '#666', fontSize: '0.8rem', lineHeight: 1.5, fontFamily: 'Montserrat, sans-serif', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>
              {styliste.bio}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
