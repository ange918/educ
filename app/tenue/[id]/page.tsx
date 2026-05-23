'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TenueCard from '@/components/TenueCard'
import { TENUES, STYLISTES } from '@/lib/mockData'
import { formatPrix, buildWhatsAppLink } from '@/lib/utils'

export default function TenuePage({ params }: { params: { id: string } }) {
  const tenue = TENUES.find(t => t.id === params.id)
  if (!tenue) notFound()

  const styliste = STYLISTES.find(s => s.id === tenue.styliste_id)
  const autresTenues = TENUES.filter(t => t.styliste_id === tenue.styliste_id && t.id !== tenue.id).slice(0, 4)

  const [tailleChoisie, setTailleChoisie] = useState('')
  const [couleurChoisie, setCouleurChoisie] = useState('')
  const [photoActive, setPhotoActive] = useState(0)

  const allPhotos = [...tenue.photos, ...Array(3).fill(tenue.photos[0])]

  const whatsappMsg = buildWhatsAppLink(
    tenue.styliste_whatsapp,
    `${tenue.nom}${tailleChoisie ? ` (Taille: ${tailleChoisie})` : ''}${couleurChoisie ? ` - ${couleurChoisie}` : ''}`,
    tenue.prix
  )

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ paddingTop: '72px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem 5rem' }}>

          {/* Fil d'Ariane */}
          <p style={{ color: '#555', fontSize: '0.8rem', marginBottom: '2.5rem', fontFamily: 'Montserrat, sans-serif' }}>
            <Link href="/" style={{ color: '#555' }}>Accueil</Link> · <Link href="/catalogue" style={{ color: '#555' }}>Catalogue</Link> · <span style={{ color: '#FCD116' }}>{tenue.nom}</span>
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>

            {/* Galerie */}
            <div>
              <div style={{ position: 'relative', aspectRatio: '3/4', borderRadius: '20px', overflow: 'hidden', marginBottom: '1rem', border: '1px solid #1a1a1a' }}>
                <Image src={allPhotos[photoActive]} alt={tenue.nom} fill style={{ objectFit: 'cover' }} />
                {!tenue.disponible && (
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ background: '#E8112D', color: '#fff', padding: '0.6rem 1.5rem', borderRadius: '50px', fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: '0.9rem' }}>ÉPUISÉ</span>
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {allPhotos.slice(0, 4).map((p, i) => (
                  <button key={i} onClick={() => setPhotoActive(i)} style={{ position: 'relative', width: '80px', height: '80px', flexShrink: 0, borderRadius: '10px', overflow: 'hidden', border: `2px solid ${photoActive === i ? '#008751' : '#2a2a2a'}`, cursor: 'pointer', transition: 'border-color 0.2s', background: 'none', padding: 0 }}>
                    <Image src={p} alt="" fill style={{ objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Détails */}
            <div>
              <div style={{ display: 'inline-block', background: 'rgba(0,135,81,0.15)', border: '1px solid rgba(0,135,81,0.3)', color: '#008751', padding: '0.3rem 0.75rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 700, fontFamily: 'Unbounded, sans-serif', textTransform: 'uppercase', marginBottom: '1rem' }}>
                {tenue.categorie.replace('-', ' ')}
              </div>

              <h1 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '1rem', lineHeight: 1.2 }}>{tenue.nom}</h1>

              <Link href={`/styliste/${tenue.styliste_slug}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {styliste && (
                  <div style={{ position: 'relative', width: '36px', height: '36px', flexShrink: 0 }}>
                    <Image src={styliste.photo} alt={styliste.nom} fill style={{ objectFit: 'cover', borderRadius: '50%' }} />
                  </div>
                )}
                <span style={{ color: '#888', fontFamily: 'Montserrat, sans-serif', fontSize: '0.875rem' }}>
                  par <span style={{ color: '#FCD116', fontWeight: 600 }}>{tenue.styliste_nom}</span> · {tenue.ville}
                </span>
              </Link>

              <div style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: '2.2rem', color: '#FCD116', marginBottom: '2rem' }}>
                {formatPrix(tenue.prix)}
              </div>

              <p style={{ fontFamily: 'Montserrat, sans-serif', color: '#999', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.95rem' }}>{tenue.description}</p>

              {/* Tailles */}
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ fontFamily: 'Unbounded, sans-serif', fontSize: '0.75rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Taille</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {tenue.tailles.map(t => (
                    <button key={t} onClick={() => setTailleChoisie(t)} style={{ padding: '0.5rem 1rem', border: `2px solid ${tailleChoisie === t ? '#008751' : '#2a2a2a'}`, borderRadius: '8px', background: tailleChoisie === t ? 'rgba(0,135,81,0.15)' : '#111', color: tailleChoisie === t ? '#008751' : '#888', fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Couleurs */}
              <div style={{ marginBottom: '2.5rem' }}>
                <p style={{ fontFamily: 'Unbounded, sans-serif', fontSize: '0.75rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Couleur</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {tenue.couleurs.map(c => (
                    <button key={c} onClick={() => setCouleurChoisie(c)} style={{ padding: '0.5rem 1rem', border: `2px solid ${couleurChoisie === c ? '#FCD116' : '#2a2a2a'}`, borderRadius: '8px', background: couleurChoisie === c ? 'rgba(252,209,22,0.1)' : '#111', color: couleurChoisie === c ? '#FCD116' : '#888', fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {tenue.disponible ? (
                  <a href={whatsappMsg} target="_blank" rel="noopener noreferrer">
                    <button style={{ width: '100%', background: '#E8112D', color: '#fff', padding: '1.1rem 2rem', borderRadius: '12px', fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', transition: 'all 0.3s', border: 'none', boxShadow: '0 8px 40px rgba(232,17,45,0.3)' }}
                      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                      onMouseLeave={e => (e.currentTarget.style.transform = 'none')}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Commander sur WhatsApp — {formatPrix(tenue.prix)}
                    </button>
                  </a>
                ) : (
                  <button disabled style={{ width: '100%', background: '#1a1a1a', color: '#555', padding: '1.1rem 2rem', borderRadius: '12px', fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: '0.9rem', cursor: 'not-allowed', border: '1px solid #2a2a2a' }}>
                    Épuisé
                  </button>
                )}
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center', color: '#555', fontSize: '0.8rem', fontFamily: 'Montserrat, sans-serif' }}>
                  <span>👁 {tenue.vues} vues</span>
                  {tenue.stock > 0 && <><span>·</span><span>📦 {tenue.stock} en stock</span></>}
                </div>
              </div>
            </div>
          </div>

          {/* Autres tenues */}
          {autresTenues.length > 0 && (
            <div style={{ marginTop: '5rem' }}>
              <h2 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: '1.3rem', marginBottom: '2rem' }}>
                Autres tenues de <span style={{ color: '#FCD116' }}>{tenue.styliste_nom}</span>
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
                {autresTenues.map(t => <TenueCard key={t.id} tenue={t} />)}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
