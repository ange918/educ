'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, MessageCircle, Tag, Eye } from 'lucide-react'
import type { Tenue } from '@/lib/mockData'
import { formatPrix, buildWhatsAppLink } from '@/lib/utils'

export default function TenueCard({ tenue }: { tenue: Tenue }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#111',
        borderRadius: '16px',
        overflow: 'hidden',
        border: `1px solid ${hovered ? '#008751' : '#1a1a1a'}`,
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-6px)' : 'none',
        boxShadow: hovered ? '0 20px 60px rgba(0,135,81,0.2)' : '0 2px 8px rgba(0,0,0,0.3)',
        cursor: 'pointer',
      }}
    >
      <Link href={`/tenue/${tenue.id}`}>
        <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
          <Image
            src={tenue.photos[0]}
            alt={tenue.nom}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            style={{ objectFit: 'cover', transition: 'transform 0.5s ease', transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
          />
          {!tenue.disponible && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ background: '#E8112D', color: '#fff', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'Unbounded, sans-serif' }}>ÉPUISÉ</span>
            </div>
          )}
          <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: 'rgba(0,135,81,0.9)', color: '#fff', padding: '0.3rem 0.75rem', borderRadius: '50px', fontSize: '0.65rem', fontWeight: 700, fontFamily: 'Unbounded, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Tag size={10} />
            {tenue.categorie.replace('-', ' ')}
          </div>
          <div style={{ position: 'absolute', bottom: '0.75rem', right: '0.75rem', background: 'rgba(0,0,0,0.7)', color: '#888', padding: '0.25rem 0.6rem', borderRadius: '50px', fontSize: '0.65rem', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Eye size={10} />
            {tenue.vues}
          </div>
        </div>
      </Link>

      <div style={{ padding: '1.25rem' }}>
        <Link href={`/tenue/${tenue.id}`}>
          <h3 style={{ fontFamily: 'Unbounded, sans-serif', fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem', lineHeight: '1.3' }}>{tenue.nom}</h3>
        </Link>
        <p style={{ color: '#888', fontSize: '0.75rem', marginBottom: '0.6rem', fontFamily: 'Montserrat, sans-serif', display: 'flex', alignItems: 'center', gap: '0.3rem', flexWrap: 'wrap' }}>
          <MapPin size={11} color="#008751" />
          {tenue.ville} · par <Link href={`/styliste/${tenue.styliste_slug}`} style={{ color: '#FCD116' }}>{tenue.styliste_nom}</Link>
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
          <span style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: '1rem', color: '#FCD116' }}>{formatPrix(tenue.prix)}</span>
          {tenue.disponible && (
            <a href={buildWhatsAppLink(tenue.styliste_whatsapp, tenue.nom, tenue.prix)} target="_blank" rel="noopener noreferrer">
              <button style={{
                background: '#25D366',
                color: '#fff',
                padding: '0.5rem 1rem',
                borderRadius: '50px',
                fontSize: '0.75rem',
                fontWeight: 700,
                fontFamily: 'Montserrat, sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 4px 15px rgba(37,211,102,0.3)',
                border: 'none',
                cursor: 'pointer',
              }}>
                <MessageCircle size={13} fill="currentColor" />
                WhatsApp
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
