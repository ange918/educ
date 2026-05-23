'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { VILLES } from '@/lib/mockData'
import { slugify } from '@/lib/utils'

type Step = 1 | 2 | 3

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState({ nom: '', email: '', telephone: '', ville: '', password: '', bio: '', whatsapp: '', instagram: '', accepted: false })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    document.cookie = 'dahomey_session=mock; path=/'
    setLoading(false)
    router.push('/dashboard')
  }

  const inputStyle: React.CSSProperties = {
    background: '#111', border: '1px solid #2a2a2a', borderRadius: '10px', color: '#fff',
    padding: '0.9rem 1rem', fontSize: '0.9rem', fontFamily: 'Montserrat, sans-serif', width: '100%', transition: 'border-color 0.2s',
  }
  const labelStyle: React.CSSProperties = {
    fontFamily: 'Unbounded, sans-serif', fontSize: '0.65rem', fontWeight: 700, color: '#888',
    textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.6rem',
  }

  const steps = [
    { n: 1 as Step, label: 'Identité' },
    { n: 2 as Step, label: 'Atelier' },
    { n: 3 as Step, label: 'Finaliser' },
  ]

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '540px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Image src="/logo-icon.jpg" alt="logo" width={60} height={60} style={{ borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1rem', border: '2px solid #008751' }} />
          <h1 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: '1.6rem', marginBottom: '0.4rem' }}>Rejoindre DAHOMEY-TECH</h1>
          <p style={{ color: '#555', fontFamily: 'Montserrat, sans-serif', fontSize: '0.875rem' }}>Espace styliste — 100% gratuit</p>
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2.5rem', gap: '0' }}>
          {steps.map((s, i) => (
            <div key={s.n} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: step > s.n ? '#008751' : step === s.n ? 'rgba(0,135,81,0.2)' : '#111', border: `2px solid ${step >= s.n ? '#008751' : '#2a2a2a'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: '0.8rem', color: step >= s.n ? '#fff' : '#555', transition: 'all 0.3s' }}>
                  {step > s.n ? '✓' : s.n}
                </div>
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.7rem', color: step === s.n ? '#fff' : '#555', fontWeight: step === s.n ? 600 : 400 }}>{s.label}</span>
              </div>
              {i < steps.length - 1 && <div style={{ flex: 1, height: '2px', background: step > s.n ? '#008751' : '#1a1a1a', margin: '0 0.5rem', marginBottom: '1.2rem', transition: 'background 0.3s' }} />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', background: '#111', border: '1px solid #1a1a1a', borderRadius: '16px', padding: '1.75rem' }}>
              <h3 style={{ fontFamily: 'Unbounded, sans-serif', fontSize: '0.85rem', fontWeight: 700, color: '#FCD116', marginBottom: '0.25rem' }}>Vos informations</h3>
              <div>
                <label style={labelStyle}>Nom / atelier *</label>
                <input required style={inputStyle} value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} placeholder="Ex: Adiza Couture"
                  onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#2a2a2a')} />
                {form.nom && <p style={{ color: '#555', fontFamily: 'Montserrat, sans-serif', fontSize: '0.75rem', marginTop: '0.4rem' }}>Page: dahomey-tech.com/styliste/{slugify(form.nom)}</p>}
              </div>
              <div>
                <label style={labelStyle}>Email *</label>
                <input required type="email" style={inputStyle} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="votre@email.com"
                  onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#2a2a2a')} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Téléphone *</label>
                  <input required type="tel" style={inputStyle} value={form.telephone} onChange={e => setForm({ ...form, telephone: e.target.value })} placeholder="+229 97..."
                    onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#2a2a2a')} />
                </div>
                <div>
                  <label style={labelStyle}>Ville *</label>
                  <select required style={inputStyle} value={form.ville} onChange={e => setForm({ ...form, ville: e.target.value })}
                    onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#2a2a2a')}>
                    <option value="">Choisir...</option>
                    {VILLES.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Mot de passe *</label>
                <input required type="password" style={inputStyle} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Min. 8 caractères"
                  onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#2a2a2a')} />
              </div>
              <button type="button" onClick={() => setStep(2)} style={{ background: 'linear-gradient(135deg, #008751, #00a862)', color: '#fff', padding: '1rem', borderRadius: '12px', fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', border: 'none', marginTop: '0.5rem', boxShadow: '0 8px 30px rgba(0,135,81,0.3)' }}>
                Continuer →
              </button>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', background: '#111', border: '1px solid #1a1a1a', borderRadius: '16px', padding: '1.75rem' }}>
              <h3 style={{ fontFamily: 'Unbounded, sans-serif', fontSize: '0.85rem', fontWeight: 700, color: '#FCD116', marginBottom: '0.25rem' }}>Votre atelier</h3>
              <div>
                <label style={labelStyle}>Bio / description</label>
                <textarea rows={4} style={{ ...inputStyle, resize: 'vertical' }} value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} placeholder="Parlez de votre style, vos spécialités..."
                  onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#2a2a2a')} />
              </div>
              <div>
                <label style={labelStyle}>💬 WhatsApp (numéro international sans +)</label>
                <input type="tel" style={inputStyle} value={form.whatsapp} onChange={e => setForm({ ...form, whatsapp: e.target.value })} placeholder="22997XXXXXX"
                  onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#2a2a2a')} />
              </div>
              <div>
                <label style={labelStyle}>📸 Instagram</label>
                <input type="text" style={inputStyle} value={form.instagram} onChange={e => setForm({ ...form, instagram: e.target.value })} placeholder="@votre_compte"
                  onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#2a2a2a')} />
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button type="button" onClick={() => setStep(1)} style={{ flex: 1, background: 'transparent', border: '1px solid #2a2a2a', color: '#888', padding: '1rem', borderRadius: '12px', fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s' }}>← Retour</button>
                <button type="button" onClick={() => setStep(3)} style={{ flex: 2, background: 'linear-gradient(135deg, #008751, #00a862)', color: '#fff', padding: '1rem', borderRadius: '12px', fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', border: 'none', boxShadow: '0 8px 30px rgba(0,135,81,0.3)' }}>Continuer →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: '16px', padding: '1.75rem' }}>
                <h3 style={{ fontFamily: 'Unbounded, sans-serif', fontSize: '0.85rem', fontWeight: 700, color: '#FCD116', marginBottom: '1.25rem' }}>Récapitulatif</h3>
                {[['Atelier', form.nom], ['Email', form.email], ['Ville', form.ville], ['WhatsApp', form.whatsapp || '—'], ['Instagram', form.instagram || '—']].map(([l, v]) => (
                  <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid #1a1a1a' }}>
                    <span style={{ color: '#555', fontFamily: 'Montserrat, sans-serif', fontSize: '0.85rem' }}>{l}</span>
                    <span style={{ color: '#fff', fontFamily: 'Montserrat, sans-serif', fontSize: '0.85rem', fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                <div onClick={() => setForm({ ...form, accepted: !form.accepted })} style={{ width: '20px', height: '20px', borderRadius: '4px', border: `2px solid ${form.accepted ? '#008751' : '#2a2a2a'}`, background: form.accepted ? '#008751' : 'transparent', flexShrink: 0, marginTop: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                  {form.accepted && <span style={{ color: '#fff', fontSize: '0.7rem' }}>✓</span>}
                </div>
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.875rem', color: '#888', lineHeight: 1.6 }}>
                  J'accepte les <span style={{ color: '#FCD116', cursor: 'pointer' }}>conditions d'utilisation</span> et la <span style={{ color: '#FCD116', cursor: 'pointer' }}>politique de confidentialité</span> de DAHOMEY-TECH.
                </span>
              </label>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button type="button" onClick={() => setStep(2)} style={{ flex: 1, background: 'transparent', border: '1px solid #2a2a2a', color: '#888', padding: '1rem', borderRadius: '12px', fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>← Retour</button>
                <button type="submit" disabled={!form.accepted || loading} style={{ flex: 2, background: !form.accepted || loading ? '#1a1a1a' : 'linear-gradient(135deg, #008751, #00a862)', color: !form.accepted || loading ? '#555' : '#fff', padding: '1rem', borderRadius: '12px', fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: '0.9rem', cursor: !form.accepted || loading ? 'not-allowed' : 'pointer', border: 'none', boxShadow: !form.accepted || loading ? 'none' : '0 8px 30px rgba(0,135,81,0.3)', transition: 'all 0.3s' }}>
                  {loading ? '⏳ Création...' : '🚀 Créer mon espace'}
                </button>
              </div>
            </div>
          )}
        </form>

        <p style={{ textAlign: 'center', marginTop: '2rem', fontFamily: 'Montserrat, sans-serif', fontSize: '0.875rem', color: '#555' }}>
          Déjà un compte ? <Link href="/auth/login" style={{ color: '#FCD116', fontWeight: 600 }}>Se connecter</Link>
        </p>
      </div>
    </div>
  )
}
