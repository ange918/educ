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
import { MessageCircle, MapPin, Eye, Package, Tag, ChevronRight, Shirt, ChevronLeft, BadgeCheck } from 'lucide-react'

export default function TenuePage({ params }: { params: { id: string } }) {
  const tenue = TENUES.find(t => t.id === params.id)
  if (!tenue) notFound()

  const styliste = STYLISTES.find(s => s.id === tenue.styliste_id)
  const autresTenues = TENUES.filter(t => t.styliste_id === tenue.styliste_id && t.id !== tenue.id).slice(0, 4)

  const [tailleChoisie, setTailleChoisie] = useState('')
  const [couleurChoisie, setCouleurChoisie] = useState('')
  const [photoActive, setPhotoActive] = useState(0)

  const allPhotos = [...tenue.photos, tenue.photos[0], tenue.photos[0], tenue.photos[0]]

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

          {/* Fil d'ariane */}
          <p style={{ color: '#555', fontSize: '0.8rem', marginBottom: '2.5rem', fontFamily: 'Montserrat, sans-serif', display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#555', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>Accueil</Link>
            <ChevronRight size={12} />
            <Link href="/catalogue" style={{ color: '#555' }}>Catalogue</Link>
            <ChevronRight size={12} />
            <span style={{ color: '#FCD116' }}>{tenue.nom}</span>
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
            {/* Galerie */}
            <div>
              <div style={{ position: 'relative', aspectRatio: '3/4', borderRadius: '20px', overflow: 'hidden', marginBottom: '1rem', border: '1px solid #1a1a1a' }}>
                <Image src={allPhotos[photoActive]} alt={tenue.nom} fill style={{ objectFit: 'cover' }} />
                {!tenue.disponible && (
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ background: '#E8112D', color: '#fff', padding: '0.6rem 1.5rem', borderRadius: '50px', fontFamily: 'Unbounded, sans-serif', fontWeight: 700 }}>ÉPUISÉ</span>
                  </div>
                )}
                {/* Navigation flèches */}
                {photoActive > 0 && (
                  <button onClick={() => setPhotoActive(p => p - 1)} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
                    <ChevronLeft size={18} />
                  </button>
                )}
                {photoActive < allPhotos.length - 1 && (
                  <button onClick={() => setPhotoActive(p => p + 1)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
                    <ChevronRight size={18} />
                  </button>
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
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(0,135,81,0.12)', border: '1px solid rgba(0,135,81,0.3)', color: '#008751', padding: '0.3rem 0.75rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 700, fontFamily: 'Unbounded, sans-serif', textTransform: 'uppercase', marginBottom: '1rem' }}>
                <Tag size={11} /> {tenue.categorie.replace('-', ' ')}
              </div>

              <h1 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem', lineHeight: 1.2 }}>{tenue.nom}</h1>

              <Link href={`/styliste/${tenue.styliste_slug}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', textDecoration: 'none' }}>
                {styliste && (
                  <div style={{ position: 'relative', width: '36px', height: '36px', flexShrink: 0 }}>
                    <Image src={styliste.photo} alt={styliste.nom} fill style={{ objectFit: 'cover', borderRadius: '50%' }} />
                  </div>
                )}
                <span style={{ color: '#888', fontFamily: 'Montserrat, sans-serif', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  par <span style={{ color: '#FCD116', fontWeight: 600 }}>{tenue.styliste_nom}</span>
                  {styliste?.verified && <BadgeCheck size={14} color="#008751" />}
                  <MapPin size={12} color="#555" /> {tenue.ville}
                </span>
              </Link>

              <div style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: '2.2rem', color: '#FCD116', marginBottom: '2rem' }}>
                {formatPrix(tenue.prix)}
              </div>

              <p style={{ fontFamily: 'Montserrat, sans-serif', color: '#999', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.95rem' }}>{tenue.description}</p>

              {/* Tailles */}
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ fontFamily: 'Unbounded, sans-serif', fontSize: '0.7rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Shirt size={13} /> Taille
                </p>
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
                <p style={{ fontFamily: 'Unbounded, sans-serif', fontSize: '0.7rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Couleur</p>
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
                      <MessageCircle size={20} fill="white" />
                      Commander sur WhatsApp — {formatPrix(tenue.prix)}
                    </button>
                  </a>
                ) : (
                  <button disabled style={{ width: '100%', background: '#1a1a1a', color: '#555', padding: '1.1rem 2rem', borderRadius: '12px', fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: '0.9rem', cursor: 'not-allowed', border: '1px solid #2a2a2a' }}>
                    Épuisé
                  </button>
                )}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center', color: '#555', fontSize: '0.8rem', fontFamily: 'Montserrat, sans-serif' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Eye size={13} /> {tenue.vues} vues</span>
                  {tenue.stock > 0 && <><span>·</span><span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Package size={13} /> {tenue.stock} en stock</span></>}
                </div>
              </div>
            </div>
          </div>

          {/* Autres tenues */}
          {autresTenues.length > 0 && (
            <div style={{ marginTop: '5rem' }}>
              <h2 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: '1.3rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Shirt size={18} color="#FCD116" />
                Autres tenues de <span style={{ color: '#FCD116', marginLeft: '0.3rem' }}>{tenue.styliste_nom}</span>
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
