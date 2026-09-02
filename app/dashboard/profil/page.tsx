'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { createClient } from '@/lib/supabase/client'
import type { Styliste } from '@/lib/supabase/types'
import { ArrowLeft, Camera, User, AlignLeft, MapPin, Phone, MessageCircle, AtSign, Save, CheckCircle } from 'lucide-react'

export default function ProfilPage() {
  const router = useRouter()
  const [styliste, setStyliste] = useState<Styliste | null>(null)
  const [form, setForm] = useState({ nom: '', bio: '', ville: '', telephone: '', whatsapp: '', instagram: '' })
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const supabase = createClient()
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }
      const { data } = await supabase.from('stylistes').select('*').eq('id', user.id).single()
      if (data) {
        setStyliste(data)
        setForm({ nom: data.nom || '', bio: data.bio || '', ville: data.ville || '', telephone: data.telephone || '', whatsapp: data.whatsapp || '', instagram: data.instagram || '' })
        setPhotoPreview(data.photo_url || null)
      }
      setLoading(false)
    }
    load()
  }, [router])

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) { setPhotoFile(f); setPhotoPreview(URL.createObjectURL(f)) }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!styliste) return
    setError('')
    setSaving(true)
    const supabase = createClient()

    let photo_url = styliste.photo_url

    if (photoFile) {
      const ext = photoFile.name.split('.').pop()
      const path = `${styliste.id}/profil.${ext}`
      const { error: uploadErr } = await supabase.storage.from('photos').upload(path, photoFile, { upsert: true })
      if (!uploadErr) {
        const { data: urlData } = supabase.storage.from('photos').getPublicUrl(path)
        photo_url = urlData.publicUrl
      }
    }

    const { error: updateErr } = await supabase.from('stylistes').update({
      nom: form.nom,
      bio: form.bio || null,
      ville: form.ville,
      telephone: form.telephone || null,
      whatsapp: form.whatsapp || null,
      instagram: form.instagram || null,
      photo_url,
      updated_at: new Date().toISOString(),
    }).eq('id', styliste.id)

    setSaving(false)
    if (updateErr) { setError(updateErr.message); return }
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const inputStyle: React.CSSProperties = {
    background: '#FFFFFF', border: '1px solid #E7E3D8', borderRadius: '10px', color: '#14201A',
    padding: '0.875rem 1rem 0.875rem 2.8rem', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif', width: '100%', transition: 'border-color 0.2s',
  }
  const iconPos: React.CSSProperties = { position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9AA093', pointerEvents: 'none' }
  const labelStyle: React.CSSProperties = { fontFamily: 'Orbitron, sans-serif', fontSize: '0.7rem', fontWeight: 700, color: '#6E7268', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.6rem' }

  const field = (label: string, icon: React.ReactNode, input: React.ReactNode) => (
    <div>
      <label style={labelStyle}>{label}</label>
      <div style={{ position: 'relative' }}>
        <span style={iconPos}>{icon}</span>
        {input}
      </div>
    </div>
  )

  if (loading) {
    return (
      <div style={{ background: '#F7F5EF', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid #E7E3D8', borderTopColor: '#008751', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  return (
    <div style={{ background: '#F7F5EF', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem 2rem 5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <Link href="/dashboard" style={{ color: '#9AA093', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ArrowLeft size={14} /> Retour
          </Link>
          <span style={{ color: '#C4C0B3' }}>·</span>
          <h1 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 800, fontSize: '1.5rem', color: '#14201A' }}>Mon profil</h1>
        </div>

        {error && <div style={{ background: 'rgba(232,17,45,0.1)', border: '1px solid rgba(232,17,45,0.3)', color: '#E8112D', padding: '0.875rem 1rem', borderRadius: '10px', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', marginBottom: '1.5rem' }}>{error}</div>}

        {/* Photo */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E7E3D8', borderRadius: '16px', padding: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', width: '100px', height: '100px', flexShrink: 0, borderRadius: '50%', border: '3px solid #008751', overflow: 'hidden', background: '#E7E3D8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {photoPreview ? (
              <Image src={photoPreview} alt="profil" fill style={{ objectFit: 'cover' }} />
            ) : (
              <User size={36} color="#C4C0B3" />
            )}
          </div>
          <div>
            <p style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem' }}>{form.nom}</p>
            <p style={{ color: '#6E7268', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', marginBottom: '1rem' }}>Photo de profil</p>
            <label style={{ background: 'rgba(0,135,81,0.15)', border: '1px solid rgba(0,135,81,0.3)', color: '#008751', padding: '0.6rem 1.25rem', borderRadius: '8px', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <Camera size={14} /> Changer la photo
              <input type="file" accept="image/*" onChange={handlePhoto} style={{ display: 'none' }} />
            </label>
          </div>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: '#FFFFFF', border: '1px solid #E7E3D8', borderRadius: '16px', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.85rem', fontWeight: 700, color: '#008751', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={14} /> Informations personnelles
            </h3>
            {field('Nom / atelier *', <User size={14} />,
              <input required style={inputStyle} value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })}
                onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#E7E3D8')} />
            )}
            <div>
              <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '0.4rem' }}><AlignLeft size={13} /> Bio</label>
              <textarea rows={4} style={{ background: '#FFFFFF', border: '1px solid #E7E3D8', borderRadius: '10px', color: '#14201A', padding: '0.875rem 1rem', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif', width: '100%', resize: 'vertical', transition: 'border-color 0.2s' }} value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })}
                onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#E7E3D8')} />
            </div>
            {field('Ville *', <MapPin size={14} />,
              <input required style={inputStyle} value={form.ville} onChange={e => setForm({ ...form, ville: e.target.value })}
                onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#E7E3D8')} />
            )}
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid #E7E3D8', borderRadius: '16px', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.85rem', fontWeight: 700, color: '#25D366', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageCircle size={14} /> Contacts & Réseaux
            </h3>
            {field('Téléphone', <Phone size={14} />,
              <input type="tel" style={inputStyle} value={form.telephone} onChange={e => setForm({ ...form, telephone: e.target.value })} placeholder="+229 97 XX XX XX"
                onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#E7E3D8')} />
            )}
            {field('WhatsApp (sans +)', <MessageCircle size={14} />,
              <input type="tel" style={inputStyle} value={form.whatsapp} onChange={e => setForm({ ...form, whatsapp: e.target.value })} placeholder="22997XXXXXX"
                onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#E7E3D8')} />
            )}
            {field('Instagram', <AtSign size={14} />,
              <input type="text" style={inputStyle} value={form.instagram} onChange={e => setForm({ ...form, instagram: e.target.value })} placeholder="@votre_compte"
                onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#E7E3D8')} />
            )}
          </div>

          <button type="submit" disabled={saving} style={{ background: saved ? 'linear-gradient(135deg, #006b40, #008751)' : saving ? '#E7E3D8' : 'linear-gradient(135deg, #008751, #00a862)', color: saving ? '#9AA093' : '#fff', padding: '1.1rem', borderRadius: '12px', fontFamily: 'Orbitron, sans-serif', fontWeight: 700, fontSize: '0.9rem', cursor: saving ? 'not-allowed' : 'pointer', border: 'none', transition: 'all 0.3s', boxShadow: saving ? 'none' : '0 8px 30px rgba(0,135,81,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            {saving ? 'Enregistrement...' : saved ? <><CheckCircle size={18} /> Profil enregistré !</> : <><Save size={18} /> Enregistrer le profil</>}
          </button>
        </form>
      </div>
    </div>
  )
}
