'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TenueCard from '@/components/TenueCard'
import { createClient } from '@/lib/supabase/client'
import type { Tenue, Styliste } from '@/lib/supabase/types'
import { formatPrix, buildWhatsAppLink } from '@/lib/utils'
import { MessageCircle, MapPin, Eye, Package, Tag, ChevronRight, Shirt, ChevronLeft, BadgeCheck } from 'lucide-react'

type TenueWithStyliste = Tenue & { stylistes?: Styliste }

export default function TenuePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [tenue, setTenue] = useState<TenueWithStyliste | null>(null)
  const [autresTenues, setAutresTenues] = useState<TenueWithStyliste[]>([])
  const [loading, setLoading] = useState(true)
  const [tailleChoisie, setTailleChoisie] = useState('')
  const [couleurChoisie, setCouleurChoisie] = useState('')
  const [photoActive, setPhotoActive] = useState(0)

  useEffect(() => {
    const supabase = createClient()
    const load = async () => {
      const { data, error } = await supabase
        .from('tenues')
        .select('*, stylistes(id, nom, whatsapp, slug, photo_url, ville, verified, instagram)')
        .eq('id', params.id)
        .single()

      if (error || !data) { router.replace('/catalogue'); return }
      setTenue(data as TenueWithStyliste)

      // .then() requis : le builder supabase-js n'exécute la requête qu'une fois awaité
      supabase.rpc('increment_vues', { p_tenue_id: params.id }).then(() => {})

      const { data: autres } = await supabase
        .from('tenues')
        .select('*, stylistes(id, nom, whatsapp, slug, photo_url, ville)')
        .eq('styliste_id', data.styliste_id)
        .eq('disponible', true)
        .neq('id', params.id)
        .limit(4)

      setAutresTenues((autres as TenueWithStyliste[]) || [])
      setLoading(false)
    }
    load()
  }, [params.id, router])

  if (loading) {
    return (
      <div style={{ background: '#F7F5EF', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: '#9AA093' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid #E7E3D8', borderTopColor: '#008751', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }} />
          <p style={{ fontFamily: 'Inter, sans-serif' }}>Chargement...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      </div>
    )
  }

  if (!tenue) return null

  const styliste = tenue.stylistes
  const photos = tenue.photos?.length ? tenue.photos : (tenue.photo_principale ? [tenue.photo_principale] : [])
  const whatsapp = styliste?.whatsapp || ''
  const whatsappMsg = tenue.whatsapp_message
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(tenue.whatsapp_message)}`
    : buildWhatsAppLink(
        whatsapp,
        `${tenue.nom}${tailleChoisie ? ` (Taille: ${tailleChoisie})` : ''}${couleurChoisie ? ` - ${couleurChoisie}` : ''}`,
        tenue.prix
      )

  return (
    <div className="pb-bottomnav" style={{ background: '#F7F5EF', minHeight: '100vh' }}>
      <Navbar />
      <div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem 5rem' }}>

          {/* Fil d'ariane */}
          <p style={{ color: '#9AA093', fontSize: '0.8rem', marginBottom: '2.5rem', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#9AA093' }}>Accueil</Link>
            <ChevronRight size={12} />
            <Link href="/catalogue" style={{ color: '#9AA093' }}>Catalogue</Link>
            <ChevronRight size={12} />
            <span style={{ color: '#14201A', fontWeight: 600 }}>{tenue.nom}</span>
          </p>

          <div className="tenue-detail-grid">

            {/* Galerie */}
            <div>
              <div style={{ position: 'relative', aspectRatio: '3/4', borderRadius: '20px', overflow: 'hidden', marginBottom: '1rem', border: '1px solid #E7E3D8', background: '#FFFFFF' }}>
                {photos[photoActive] ? (
                  <Image src={photos[photoActive]} alt={tenue.nom} fill style={{ objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Shirt size={60} color="#C4C0B3" />
                  </div>
                )}
                {!tenue.disponible && (
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ background: '#E8112D', color: '#fff', padding: '0.6rem 1.5rem', borderRadius: '50px', fontFamily: 'Sora, sans-serif', fontWeight: 700 }}>ÉPUISÉ</span>
                  </div>
                )}
                {photoActive > 0 && (
                  <button onClick={() => setPhotoActive(p => p - 1)} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
                    <ChevronLeft size={18} />
                  </button>
                )}
                {photoActive < photos.length - 1 && (
                  <button onClick={() => setPhotoActive(p => p + 1)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
                    <ChevronRight size={18} />
                  </button>
                )}
              </div>
              {photos.length > 1 && (
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {photos.slice(0, 4).map((p, i) => (
                    <button key={i} onClick={() => setPhotoActive(i)} style={{ position: 'relative', width: '80px', height: '80px', flexShrink: 0, borderRadius: '10px', overflow: 'hidden', border: `2px solid ${photoActive === i ? '#008751' : '#E7E3D8'}`, cursor: 'pointer', background: 'none', padding: 0 }}>
                      <Image src={p} alt="" fill style={{ objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Détails */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(0,135,81,0.12)', border: '1px solid rgba(0,135,81,0.3)', color: '#008751', padding: '0.3rem 0.75rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 700, fontFamily: 'Sora, sans-serif', textTransform: 'uppercase', marginBottom: '1rem' }}>
                <Tag size={11} /> {tenue.categorie}
              </div>

              <h1 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem', lineHeight: 1.2, color: '#14201A' }}>{tenue.nom}</h1>

              {styliste && (
                <Link href={`/styliste/${styliste.slug || styliste.id}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', textDecoration: 'none' }}>
                  {styliste.photo_url && (
                    <div style={{ position: 'relative', width: '36px', height: '36px', flexShrink: 0 }}>
                      <Image src={styliste.photo_url} alt={styliste.nom} fill style={{ objectFit: 'cover', borderRadius: '50%' }} />
                    </div>
                  )}
                  <span style={{ color: '#6E7268', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    par <span style={{ color: '#008751', fontWeight: 600 }}>{styliste.nom}</span>
                    {styliste.verified && <BadgeCheck size={14} color="#008751" />}
                    <MapPin size={12} color="#9AA093" /> {styliste.ville}
                  </span>
                </Link>
              )}

              <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '2.2rem', color: '#C8972A', marginBottom: '2rem' }}>
                {formatPrix(tenue.prix)}
              </div>

              {tenue.description && (
                <p style={{ fontFamily: 'Inter, sans-serif', color: '#6E7268', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.95rem' }}>{tenue.description}</p>
              )}

              {/* Tailles */}
              {tenue.tailles?.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '0.7rem', fontWeight: 700, color: '#6E7268', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Shirt size={13} /> Taille
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {tenue.tailles.map(t => (
                      <button key={t} onClick={() => setTailleChoisie(t)} style={{ padding: '0.5rem 1rem', border: `2px solid ${tailleChoisie === t ? '#008751' : '#E7E3D8'}`, borderRadius: '8px', background: tailleChoisie === t ? 'rgba(0,135,81,0.15)' : '#FFFFFF', color: tailleChoisie === t ? '#008751' : '#6E7268', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Couleurs */}
              {tenue.couleurs?.length > 0 && (
                <div style={{ marginBottom: '2.5rem' }}>
                  <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '0.7rem', fontWeight: 700, color: '#6E7268', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Couleur</p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {tenue.couleurs.map(c => (
                      <button key={c} onClick={() => setCouleurChoisie(c)} style={{ padding: '0.5rem 1rem', border: `2px solid ${couleurChoisie === c ? '#C8972A' : '#E7E3D8'}`, borderRadius: '8px', background: couleurChoisie === c ? '#FFF6D9' : '#FFFFFF', color: couleurChoisie === c ? '#C8972A' : '#6E7268', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {tenue.disponible && whatsapp ? (
                  <a href={whatsappMsg} target="_blank" rel="noopener noreferrer" data-track="commande:whatsapp">
                    <button style={{ width: '100%', background: '#E8112D', color: '#fff', padding: '1.1rem 2rem', borderRadius: '12px', fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', transition: 'all 0.3s', border: 'none', boxShadow: '0 8px 40px rgba(232,17,45,0.3)' }}
                      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                      onMouseLeave={e => (e.currentTarget.style.transform = 'none')}>
                      <MessageCircle size={20} fill="white" />
                      Commander sur WhatsApp — {formatPrix(tenue.prix)}
                    </button>
                  </a>
                ) : (
                  <button disabled style={{ width: '100%', background: '#E7E3D8', color: '#9AA093', padding: '1.1rem 2rem', borderRadius: '12px', fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.9rem', cursor: 'not-allowed', border: '1px solid #E7E3D8' }}>
                    Épuisé
                  </button>
                )}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center', color: '#9AA093', fontSize: '0.8rem', fontFamily: 'Inter, sans-serif' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Eye size={13} /> {tenue.vues} vues</span>
                  {(tenue.stock ?? 0) > 0 && <><span>·</span><span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Package size={13} /> {tenue.stock} en stock</span></>}
                </div>
              </div>
            </div>
          </div>

          {/* Autres tenues */}
          {autresTenues.length > 0 && (
            <div style={{ marginTop: '5rem' }}>
              <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '1.3rem', marginBottom: '2rem', color: '#14201A', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Shirt size={18} color="#C8972A" />
                Autres tenues de <span style={{ color: '#C8972A', marginLeft: '0.3rem' }}>{styliste?.nom}</span>
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
                {autresTenues.map(t => <TenueCard key={t.id} tenue={t} />)}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <style>{`
        .tenue-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
        @media (max-width: 860px) {
          .tenue-detail-grid { grid-template-columns: 1fr; gap: 2rem; }
        }
      `}</style>
    </div>
  )
}
