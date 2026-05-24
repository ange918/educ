'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { STYLISTES } from '@/lib/mockData'
import { ArrowLeft, Camera, User, AlignLeft, MapPin, Phone, MessageCircle, AtSign, Save, CheckCircle } from 'lucide-react'

const MOI = STYLISTES[0]

export default function ProfilPage() {
  const [form, setForm] = useState({ nom: MOI.nom, bio: MOI.bio, ville: MOI.ville, telephone: MOI.telephone, whatsapp: MOI.whatsapp, instagram: MOI.instagram })
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState(MOI.photo)
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) { setPhoto(f); setPhotoPreview(URL.createObjectURL(f)) }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const inputStyle: React.CSSProperties = {
    background: '#0A0A0A', border: '1px solid #2a2a2a', borderRadius: '10px', color: '#fff',
    padding: '0.875rem 1rem 0.875rem 2.8rem', fontSize: '0.9rem', fontFamily: 'Montserrat, sans-serif', width: '100%', transition: 'border-color 0.2s',
  }
  const iconPos: React.CSSProperties = { position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#555', pointerEvents: 'none' }
  const labelStyle: React.CSSProperties = { fontFamily: 'Unbounded, sans-serif', fontSize: '0.7rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.6rem' }

  const field = (label: string, icon: React.ReactNode, input: React.ReactNode) => (
    <div>
      <label style={labelStyle}>{label}</label>
      <div style={{ position: 'relative' }}>
        <span style={iconPos}>{icon}</span>
        {input}
      </div>
    </div>
  )

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ paddingTop: '72px', maxWidth: '700px', margin: '0 auto', padding: '3rem 2rem 5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <Link href="/dashboard" style={{ color: '#555', fontFamily: 'Montserrat, sans-serif', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ArrowLeft size={14} /> Retour
          </Link>
          <span style={{ color: '#333' }}>·</span>
          <h1 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: '1.5rem' }}>Mon profil</h1>
        </div>

        {/* Photo */}
        <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: '16px', padding: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', width: '100px', height: '100px', flexShrink: 0 }}>
            <Image src={photoPreview} alt="profil" fill style={{ objectFit: 'cover', borderRadius: '50%', border: '3px solid #008751' }} />
          </div>
          <div>
            <p style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem' }}>{form.nom}</p>
            <p style={{ color: '#666', fontFamily: 'Montserrat, sans-serif', fontSize: '0.8rem', marginBottom: '1rem' }}>Photo de profil</p>
            <label style={{ background: 'rgba(0,135,81,0.15)', border: '1px solid rgba(0,135,81,0.3)', color: '#008751', padding: '0.6rem 1.25rem', borderRadius: '8px', fontFamily: 'Montserrat, sans-serif', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <Camera size={14} /> Changer la photo
              <input type="file" accept="image/*" onChange={handlePhoto} style={{ display: 'none' }} />
            </label>
          </div>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: '16px', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontFamily: 'Unbounded, sans-serif', fontSize: '0.85rem', fontWeight: 700, color: '#FCD116', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={14} /> Informations personnelles
            </h3>
            {field('Nom / atelier *', <User size={14} />,
              <input required style={inputStyle} value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })}
                onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#2a2a2a')} />
            )}
            <div>
              <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '0.4rem' }}><AlignLeft size={13} /> Bio</label>
              <textarea rows={4} style={{ background: '#0A0A0A', border: '1px solid #2a2a2a', borderRadius: '10px', color: '#fff', padding: '0.875rem 1rem', fontSize: '0.9rem', fontFamily: 'Montserrat, sans-serif', width: '100%', resize: 'vertical', transition: 'border-color 0.2s' }} value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })}
                onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#2a2a2a')} />
            </div>
            {field('Ville *', <MapPin size={14} />,
              <input required style={inputStyle} value={form.ville} onChange={e => setForm({ ...form, ville: e.target.value })}
                onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#2a2a2a')} />
            )}
          </div>

          <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: '16px', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontFamily: 'Unbounded, sans-serif', fontSize: '0.85rem', fontWeight: 700, color: '#25D366', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageCircle size={14} /> Contacts & Réseaux
            </h3>
            {field('Téléphone', <Phone size={14} />,
              <input type="tel" style={inputStyle} value={form.telephone} onChange={e => setForm({ ...form, telephone: e.target.value })} placeholder="+229 97 XX XX XX"
                onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#2a2a2a')} />
            )}
            {field('WhatsApp (sans +)', <MessageCircle size={14} />,
              <input type="tel" style={inputStyle} value={form.whatsapp} onChange={e => setForm({ ...form, whatsapp: e.target.value })} placeholder="22997XXXXXX"
                onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#2a2a2a')} />
            )}
            {field('Instagram', <AtSign size={14} />,
              <input type="text" style={inputStyle} value={form.instagram} onChange={e => setForm({ ...form, instagram: e.target.value })} placeholder="@votre_compte"
                onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#2a2a2a')} />
            )}
          </div>

          <button type="submit" disabled={loading} style={{ background: saved ? 'linear-gradient(135deg, #006b40, #008751)' : loading ? '#1a1a1a' : 'linear-gradient(135deg, #008751, #00a862)', color: loading ? '#555' : '#fff', padding: '1.1rem', borderRadius: '12px', fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: '0.9rem', cursor: loading ? 'not-allowed' : 'pointer', border: 'none', transition: 'all 0.3s', boxShadow: loading ? 'none' : '0 8px 30px rgba(0,135,81,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            {loading ? 'Enregistrement...' : saved ? <><CheckCircle size={18} /> Profil enregistré !</> : <><Save size={18} /> Enregistrer le profil</>}
          </button>
        </form>
      </div>
    </div>
  )
}
