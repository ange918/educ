'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { slugify } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { User, Mail, Phone, MapPin, Lock, AtSign, MessageCircle, CheckSquare, Square, ArrowLeft, ArrowRight, Rocket, CheckCircle } from 'lucide-react'

const VILLES = ['Cotonou', 'Porto-Novo', 'Parakou', 'Abomey-Calavi', 'Natitingou', 'Abidjan', 'Dakar', 'Lagos']

type Step = 1 | 2 | 3

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState({ nom: '', email: '', telephone: '', ville: '', password: '', bio: '', whatsapp: '', instagram: '', accepted: false })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.accepted) return
    setError('')
    setLoading(true)
    const supabase = createClient()

    const { data, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { full_name: form.nom } },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    if (data.user) {
      const slug = slugify(form.nom)
      // Le trigger handle_new_user crée déjà la ligne à l'inscription :
      // upsert pour la compléter sans erreur de clé dupliquée.
      const { error: insertError } = await supabase.from('stylistes').upsert({
        id: data.user.id,
        nom: form.nom,
        email: form.email,
        telephone: form.telephone || null,
        whatsapp: form.whatsapp || null,
        instagram: form.instagram || null,
        bio: form.bio || null,
        ville: form.ville || 'Cotonou',
        slug,
      })

      if (insertError) {
        setError(insertError.message)
        setLoading(false)
        return
      }
    }

    setLoading(false)
    router.push('/dashboard')
    router.refresh()
  }

  const inputStyle: React.CSSProperties = {
    background: '#FFFFFF', border: '1px solid #E7E3D8', borderRadius: '10px', color: '#14201A',
    padding: '0.9rem 1rem 0.9rem 2.8rem', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif', width: '100%', transition: 'border-color 0.2s',
  }
  const iconPos: React.CSSProperties = { position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9AA093', pointerEvents: 'none' }
  const labelStyle: React.CSSProperties = {
    fontFamily: 'Sora, sans-serif', fontSize: '0.65rem', fontWeight: 700, color: '#6E7268',
    textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.6rem',
  }

  const steps = [
    { n: 1 as Step, label: 'Identité' },
    { n: 2 as Step, label: 'Atelier' },
    { n: 3 as Step, label: 'Finaliser' },
  ]

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
    <div style={{ background: '#F7F5EF', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '540px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Image src="/logo-icon.jpg" alt="logo" width={60} height={60} style={{ borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1rem', border: '2px solid #008751' }} />
          <h1 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '1.6rem', marginBottom: '0.4rem', color: '#14201A' }}>Rejoindre DAHOMEY-TECH</h1>
          <p style={{ color: '#9AA093', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>Espace styliste — 100% gratuit</p>
        </div>

        {/* Steps indicator */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2.5rem' }}>
          {steps.map((s, i) => (
            <div key={s.n} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: step > s.n ? '#008751' : step === s.n ? 'rgba(0,135,81,0.2)' : '#FFFFFF', border: `2px solid ${step >= s.n ? '#008751' : '#E7E3D8'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>
                  {step > s.n ? <CheckCircle size={16} color="#fff" /> : <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.8rem', color: step >= s.n ? '#fff' : '#9AA093' }}>{s.n}</span>}
                </div>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: step === s.n ? '#14201A' : '#9AA093', fontWeight: step === s.n ? 600 : 400 }}>{s.label}</span>
              </div>
              {i < steps.length - 1 && <div style={{ flex: 1, height: '2px', background: step > s.n ? '#008751' : '#E7E3D8', margin: '0 0.5rem', marginBottom: '1.2rem', transition: 'background 0.3s' }} />}
            </div>
          ))}
        </div>

        {error && (
          <div style={{ background: 'rgba(232,17,45,0.1)', border: '1px solid rgba(232,17,45,0.3)', color: '#E8112D', padding: '0.875rem 1rem', borderRadius: '10px', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div style={{ background: '#FFFFFF', border: '1px solid #E7E3D8', borderRadius: '16px', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: '0.85rem', fontWeight: 700, color: '#008751', marginBottom: '0.25rem' }}>Vos informations</h3>

              {field('Nom / atelier *', <User size={15} />,
                <input required style={inputStyle} value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} placeholder="Ex: Adiza Couture"
                  onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#E7E3D8')} />
              )}
              {form.nom && <p style={{ color: '#9AA093', fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', marginTop: '-0.75rem' }}>Page: /styliste/{slugify(form.nom)}</p>}

              {field('Email *', <Mail size={15} />,
                <input required type="email" style={inputStyle} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="votre@email.com"
                  onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#E7E3D8')} />
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {field('Téléphone *', <Phone size={15} />,
                  <input required type="tel" style={inputStyle} value={form.telephone} onChange={e => setForm({ ...form, telephone: e.target.value })} placeholder="+229 97..."
                    onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#E7E3D8')} />
                )}
                <div>
                  <label style={labelStyle}><MapPin size={11} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.3rem' }} />Ville *</label>
                  <div style={{ position: 'relative' }}>
                    <MapPin size={15} style={iconPos} />
                    <select required style={inputStyle} value={form.ville} onChange={e => setForm({ ...form, ville: e.target.value })}
                      onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#E7E3D8')}>
                      <option value="">Ville...</option>
                      {VILLES.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {field('Mot de passe *', <Lock size={15} />,
                <input required type="password" minLength={8} style={inputStyle} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Min. 8 caractères"
                  onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#E7E3D8')} />
              )}

              <button type="button" onClick={() => { if (!form.nom || !form.email || !form.telephone || !form.ville || form.password.length < 8) return; setStep(2) }} style={{ background: 'linear-gradient(135deg, #008751, #00a862)', color: '#fff', padding: '1rem', borderRadius: '12px', fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', border: 'none', marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 8px 30px rgba(0,135,81,0.3)' }}>
                Continuer <ArrowRight size={17} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div style={{ background: '#FFFFFF', border: '1px solid #E7E3D8', borderRadius: '16px', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: '0.85rem', fontWeight: 700, color: '#008751' }}>Votre atelier</h3>
              <div>
                <label style={labelStyle}>Bio / description</label>
                <textarea rows={4} style={{ background: '#FFFFFF', border: '1px solid #E7E3D8', borderRadius: '10px', color: '#14201A', padding: '0.9rem 1rem', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif', width: '100%', resize: 'vertical', transition: 'border-color 0.2s' }} value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} placeholder="Parlez de votre style..."
                  onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#E7E3D8')} />
              </div>
              {field('WhatsApp (sans +)', <MessageCircle size={15} />,
                <input type="tel" style={inputStyle} value={form.whatsapp} onChange={e => setForm({ ...form, whatsapp: e.target.value })} placeholder="22997XXXXXX"
                  onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#E7E3D8')} />
              )}
              {field('Instagram', <AtSign size={15} />,
                <input type="text" style={inputStyle} value={form.instagram} onChange={e => setForm({ ...form, instagram: e.target.value })} placeholder="@votre_compte"
                  onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#E7E3D8')} />
              )}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button type="button" onClick={() => setStep(1)} style={{ flex: 1, background: 'transparent', border: '1px solid #E7E3D8', color: '#6E7268', padding: '1rem', borderRadius: '12px', fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                  <ArrowLeft size={15} /> Retour
                </button>
                <button type="button" onClick={() => setStep(3)} style={{ flex: 2, background: 'linear-gradient(135deg, #008751, #00a862)', color: '#fff', padding: '1rem', borderRadius: '12px', fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 8px 30px rgba(0,135,81,0.3)' }}>
                  Continuer <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ background: '#FFFFFF', border: '1px solid #E7E3D8', borderRadius: '16px', padding: '1.75rem' }}>
                <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: '0.85rem', fontWeight: 700, color: '#008751', marginBottom: '1.25rem' }}>Récapitulatif</h3>
                {[['Atelier', form.nom], ['Email', form.email], ['Ville', form.ville], ['WhatsApp', form.whatsapp || '—'], ['Instagram', form.instagram || '—']].map(([l, v]) => (
                  <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid #E7E3D8' }}>
                    <span style={{ color: '#9AA093', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>{l}</span>
                    <span style={{ color: '#14201A', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }} onClick={() => setForm({ ...form, accepted: !form.accepted })}>
                {form.accepted ? <CheckSquare size={20} color="#008751" style={{ flexShrink: 0, marginTop: '2px' }} /> : <Square size={20} color="#9AA093" style={{ flexShrink: 0, marginTop: '2px' }} />}
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: '#6E7268', lineHeight: 1.6 }}>
                  J'accepte les <span style={{ color: '#008751', cursor: 'pointer', fontWeight: 600 }}>conditions d'utilisation</span> et la <span style={{ color: '#008751', cursor: 'pointer', fontWeight: 600 }}>politique de confidentialité</span>.
                </span>
              </label>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button type="button" onClick={() => setStep(2)} style={{ flex: 1, background: 'transparent', border: '1px solid #E7E3D8', color: '#6E7268', padding: '1rem', borderRadius: '12px', fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                  <ArrowLeft size={15} /> Retour
                </button>
                <button type="submit" disabled={!form.accepted || loading} style={{ flex: 2, background: !form.accepted || loading ? '#E7E3D8' : 'linear-gradient(135deg, #008751, #00a862)', color: !form.accepted || loading ? '#9AA093' : '#fff', padding: '1rem', borderRadius: '12px', fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.9rem', cursor: !form.accepted || loading ? 'not-allowed' : 'pointer', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: !form.accepted || loading ? 'none' : '0 8px 30px rgba(0,135,81,0.3)', transition: 'all 0.3s' }}>
                  {loading ? 'Création...' : <><Rocket size={15} /> Créer mon espace</>}
                </button>
              </div>
            </div>
          )}
        </form>

        <p style={{ textAlign: 'center', marginTop: '2rem', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: '#9AA093' }}>
          Déjà un compte ? <Link href="/auth/login" style={{ color: '#008751', fontWeight: 600 }}>Se connecter</Link>
        </p>
      </div>
    </div>
  )
}
