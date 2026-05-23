import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TenueCard from '@/components/TenueCard'
import { STYLISTES, TENUES } from '@/lib/mockData'
import { buildWhatsAppLink } from '@/lib/utils'

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

      {/* HERO */}
      <div style={{ paddingTop: '72px', position: 'relative' }}>
        <div style={{ position: 'relative', height: '400px', overflow: 'hidden' }}>
          <Image src={styliste.photo} alt={styliste.nom} fill style={{ objectFit: 'cover', filter: 'brightness(0.3)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, #0A0A0A 100%)' }} />
        </div>

        <div style={{ maxWidth: '1200px', margin: '-140px auto 0', padding: '0 2rem', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <div style={{ position: 'relative', width: '140px', height: '140px', flexShrink: 0 }}>
              <Image src={styliste.photo} alt={styliste.nom} fill style={{ objectFit: 'cover', borderRadius: '50%', border: '4px solid #008751' }} />
            </div>
            <div style={{ flex: 1, paddingBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                <h1 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>{styliste.nom}</h1>
                {styliste.verified && (
                  <span style={{ background: '#008751', color: '#fff', padding: '0.3rem 0.75rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 700, fontFamily: 'Unbounded, sans-serif' }}>✓ Vérifié</span>
                )}
              </div>
              <p style={{ color: '#888', fontFamily: 'Montserrat, sans-serif', marginBottom: '1rem' }}>📍 {styliste.ville} · {styliste.instagram}</p>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {[{ v: tenues.length, l: 'Tenues' }, { v: styliste.nb_vues, l: 'Vues' }, { v: styliste.nb_commandes, l: 'Commandes' }].map(({ v, l }) => (
                  <div key={l} style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: '1.5rem', color: '#FCD116' }}>{v}</div>
                    <div style={{ color: '#666', fontSize: '0.7rem', fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <a href={`https://wa.me/${styliste.whatsapp}`} target="_blank" rel="noopener noreferrer">
              <button style={{ background: '#25D366', color: '#fff', padding: '1rem 2rem', borderRadius: '50px', fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem', boxShadow: '0 8px 30px rgba(37,211,102,0.3)', border: 'none' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Contacter sur WhatsApp
              </button>
            </a>
          </div>

          <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: '16px', padding: '2rem', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'Unbounded, sans-serif', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#FCD116' }}>À propos</h2>
            <p style={{ fontFamily: 'Montserrat, sans-serif', color: '#aaa', lineHeight: 1.8, fontSize: '0.95rem' }}>{styliste.bio}</p>
          </div>

          <h2 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: '1.5rem', marginBottom: '2rem' }}>
            Toutes les tenues <span style={{ color: '#FCD116' }}>({tenues.length})</span>
          </h2>
          {tenues.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem', paddingBottom: '5rem' }}>
              {tenues.map(t => <TenueCard key={t.id} tenue={t} />)}
            </div>
          ) : (
            <p style={{ color: '#555', fontFamily: 'Montserrat, sans-serif', padding: '3rem 0' }}>Aucune tenue publiée pour l'instant.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
