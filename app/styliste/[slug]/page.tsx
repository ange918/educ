import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TenueCard from '@/components/TenueCard'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { Tenue, Styliste } from '@/lib/supabase/types'
import { MapPin, AtSign, Shirt, Eye, BadgeCheck, ArrowLeft } from 'lucide-react'
import WhatsAppButton from '@/components/WhatsAppButton'

type TenueWithStyliste = Tenue & { stylistes?: Styliste }

export default async function StylistePage({ params }: { params: { slug: string } }) {
  const supabase = await createServerSupabaseClient()

  const { data: styliste } = await supabase
    .from('stylistes')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!styliste) notFound()

  const { data: tenues } = await supabase
    .from('tenues')
    .select('*, stylistes(id, nom, whatsapp, slug, photo_url, ville)')
    .eq('styliste_id', styliste.id)
    .eq('disponible', true)
    .order('created_at', { ascending: false })

  const tenuesList = (tenues as TenueWithStyliste[]) || []
  const totalVues = tenuesList.reduce((sum, t) => sum + (t.vues || 0), 0)

  return (
    <div className="pb-bottomnav" style={{ background: '#F7F5EF', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ position: 'relative' }}>

        {/* Bannière */}
        <div style={{ position: 'relative', height: '380px', overflow: 'hidden', background: '#FFFFFF' }}>
          {styliste.photo_url && (
            <Image src={styliste.photo_url} alt={styliste.nom} fill style={{ objectFit: 'cover', filter: 'brightness(0.9)' }} />
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(247,245,239,0.1) 20%, #F7F5EF 100%)' }} />
        </div>

        <div style={{ maxWidth: '1200px', margin: '-150px auto 0', padding: '0 2rem', position: 'relative', zIndex: 1 }}>

          <Link href="/catalogue" style={{ color: '#9AA093', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '2rem' }}>
            <ArrowLeft size={14} /> Retour au catalogue
          </Link>

          {/* Profil hero */}
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <div style={{ position: 'relative', width: '130px', height: '130px', flexShrink: 0, background: '#E7E3D8', borderRadius: '50%', border: '4px solid #008751', overflow: 'hidden' }}>
              {styliste.photo_url && (
                <Image src={styliste.photo_url} alt={styliste.nom} fill style={{ objectFit: 'cover' }} />
              )}
            </div>
            <div style={{ flex: 1, paddingBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                <h1 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', color: '#14201A' }}>{styliste.nom}</h1>
                {styliste.verified && (
                  <span style={{ background: '#008751', color: '#fff', padding: '0.3rem 0.7rem', borderRadius: '50px', fontSize: '0.65rem', fontWeight: 700, fontFamily: 'Sora, sans-serif', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <BadgeCheck size={12} /> Vérifié
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <span style={{ color: '#6E7268', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <MapPin size={13} color="#008751" /> {styliste.ville}
                </span>
                {styliste.instagram && (
                  <span style={{ color: '#6E7268', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <AtSign size={13} color="#E1306C" /> {styliste.instagram}
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {[
                  { v: tenuesList.length, l: 'Tenues', icon: <Shirt size={14} color="#C8972A" /> },
                  { v: totalVues, l: 'Vues', icon: <Eye size={14} color="#C8972A" /> },
                ].map(({ v, l, icon }) => (
                  <div key={l} style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: '#C8972A', justifyContent: 'center' }}>{icon}{v}</div>
                    <div style={{ color: '#9AA093', fontSize: '0.65rem', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            {styliste.whatsapp && <WhatsAppButton whatsapp={styliste.whatsapp} />}
          </div>

          {/* Bio */}
          {styliste.bio && (
            <div style={{ background: '#FFFFFF', border: '1px solid #E7E3D8', borderRadius: '16px', padding: '2rem', marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem', color: '#008751' }}>À propos</h2>
              <p style={{ fontFamily: 'Inter, sans-serif', color: '#6E7268', lineHeight: 1.8, fontSize: '0.95rem' }}>{styliste.bio}</p>
            </div>
          )}

          {/* Tenues */}
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '1.4rem', marginBottom: '2rem', color: '#14201A', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Shirt size={20} color="#C8972A" /> Toutes les tenues <span style={{ color: '#C8972A' }}>({tenuesList.length})</span>
          </h2>
          {tenuesList.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem', paddingBottom: '5rem' }}>
              {tenuesList.map(t => <TenueCard key={t.id} tenue={t} />)}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: '#9AA093', paddingBottom: '5rem' }}>
              <Shirt size={48} color="#E7E3D8" style={{ margin: '0 auto 1rem' }} />
              <p style={{ fontFamily: 'Inter, sans-serif' }}>Aucune tenue publiée pour l'instant.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
