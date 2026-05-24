import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TenueCard from '@/components/TenueCard'
import { STYLISTES, TENUES } from '@/lib/mockData'
import { MapPin, AtSign, Shirt, Eye, ShoppingBag, BadgeCheck, ArrowLeft } from 'lucide-react'
import WhatsAppButton from '@/components/WhatsAppButton'

export function generateStaticParams() {
  return STYLISTES.map(s => ({ slug: s.slug }))
}

export default function StylistePage({ params }: { params: { slug: string } }) {
  const styliste = STYLISTES.find(s => s.slug === params.slug)
  if (!styliste) notFound()

  const tenues = TENUES.filter(t => t.styliste_id === styliste.id)

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <Navbar />

      <div style={{ paddingTop: '72px', position: 'relative' }}>
        {/* Bannière */}
        <div style={{ position: 'relative', height: '380px', overflow: 'hidden' }}>
          <Image src={styliste.photo} alt={styliste.nom} fill style={{ objectFit: 'cover', filter: 'brightness(0.25)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 20%, #0A0A0A 100%)' }} />
        </div>

        <div style={{ maxWidth: '1200px', margin: '-150px auto 0', padding: '0 2rem', position: 'relative', zIndex: 1 }}>
          {/* Profil hero */}
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <div style={{ position: 'relative', width: '130px', height: '130px', flexShrink: 0 }}>
              <Image src={styliste.photo} alt={styliste.nom} fill style={{ objectFit: 'cover', borderRadius: '50%', border: '4px solid #008751' }} />
            </div>
            <div style={{ flex: 1, paddingBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                <h1 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: 'clamp(1.6rem, 4vw, 2.5rem)' }}>{styliste.nom}</h1>
                {styliste.verified && (
                  <span style={{ background: '#008751', color: '#fff', padding: '0.3rem 0.7rem', borderRadius: '50px', fontSize: '0.65rem', fontWeight: 700, fontFamily: 'Unbounded, sans-serif', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <BadgeCheck size={12} /> Vérifié
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <span style={{ color: '#888', fontFamily: 'Montserrat, sans-serif', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <MapPin size={13} color="#008751" /> {styliste.ville}
                </span>
                <span style={{ color: '#888', fontFamily: 'Montserrat, sans-serif', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <AtSign size={13} color="#E1306C" /> {styliste.instagram}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {[{ v: tenues.length, l: 'Tenues', icon: <Shirt size={14} color="#FCD116" /> }, { v: styliste.nb_vues, l: 'Vues', icon: <Eye size={14} color="#FCD116" /> }, { v: styliste.nb_commandes, l: 'Commandes', icon: <ShoppingBag size={14} color="#FCD116" /> }].map(({ v, l, icon }) => (
                  <div key={l} style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: '1.4rem', color: '#FCD116', justifyContent: 'center' }}>{icon}{v}</div>
                    <div style={{ color: '#555', fontSize: '0.65rem', fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <WhatsAppButton whatsapp={styliste.whatsapp} />
          </div>

          {/* Bio */}
          <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: '16px', padding: '2rem', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'Unbounded, sans-serif', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem', color: '#FCD116' }}>À propos</h2>
            <p style={{ fontFamily: 'Montserrat, sans-serif', color: '#aaa', lineHeight: 1.8, fontSize: '0.95rem' }}>{styliste.bio}</p>
          </div>

          {/* Tenues */}
          <h2 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: '1.4rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Shirt size={20} color="#FCD116" /> Toutes les tenues <span style={{ color: '#FCD116' }}>({tenues.length})</span>
          </h2>
          {tenues.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem', paddingBottom: '5rem' }}>
              {tenues.map(t => <TenueCard key={t.id} tenue={t} />)}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: '#555' }}>
              <Shirt size={48} color="#2a2a2a" style={{ margin: '0 auto 1rem' }} />
              <p style={{ fontFamily: 'Montserrat, sans-serif' }}>Aucune tenue publiée pour l'instant.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
