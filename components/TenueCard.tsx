'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
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
          <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: 'rgba(0,135,81,0.9)', color: '#fff', padding: '0.3rem 0.75rem', borderRadius: '50px', fontSize: '0.65rem', fontWeight: 700, fontFamily: 'Unbounded, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em', backdropFilter: 'blur(10px)' }}>
            {tenue.categorie.replace('-', ' ')}
          </div>
        </div>
      </Link>

      <div style={{ padding: '1.25rem' }}>
        <Link href={`/tenue/${tenue.id}`}>
          <h3 style={{ fontFamily: 'Unbounded, sans-serif', fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem', lineHeight: '1.3' }}>{tenue.nom}</h3>
        </Link>
        <p style={{ color: '#888', fontSize: '0.75rem', marginBottom: '0.6rem', fontFamily: 'Montserrat, sans-serif' }}>
          📍 {tenue.ville} · par <Link href={`/styliste/${tenue.styliste_slug}`} style={{ color: '#FCD116' }}>{tenue.styliste_nom}</Link>
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
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
