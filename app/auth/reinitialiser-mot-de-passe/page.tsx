'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function ReinitialiserMotDePassePage() {
  const router = useRouter()
  const [pret, setPret] = useState(false)
  const [lienInvalide, setLienInvalide] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const supabase = createClient()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setPret(true)
    })

    // Si le lien a déjà été consommé par ce navigateur (ou est invalide/expiré),
    // aucun événement PASSWORD_RECOVERY n'arrive : on vérifie après un court délai
    // s'il existe malgré tout une session active avant d'afficher l'erreur.
    const verifier = setTimeout(async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) setPret(true)
      else setLienInvalide(true)
    }, 2000)

    return () => {
      subscription.unsubscribe()
      clearTimeout(verifier)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password.length < 8) { setError('Le mot de passe doit contenir au moins 8 caractères.'); return }
    if (password !== confirmation) { setError('Les deux mots de passe ne correspondent pas.'); return }
    setLoading(true)
    const supabase = createClient()
    const { error: authError } = await supabase.auth.updateUser({ password })
    setLoading(false)
    if (authError) { setError(authError.message); return }
    router.push('/dashboard')
    router.refresh()
  }

  const inputStyle: React.CSSProperties = {
    background: '#FFFFFF', border: '1px solid #E7E3D8', borderRadius: '10px',
    color: '#14201A', padding: '0.9rem 1rem 0.9rem 2.8rem',
    fontSize: '0.9rem', fontFamily: 'Inter, sans-serif', width: '100%', transition: 'border-color 0.2s',
  }
  const iconPos: React.CSSProperties = {
    position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9AA093', pointerEvents: 'none',
  }
  const labelStyle: React.CSSProperties = {
    fontFamily: 'Orbitron, sans-serif', fontSize: '0.65rem', fontWeight: 700, color: '#6E7268',
    textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.6rem',
  }

  return (
    <div style={{ background: '#F7F5EF', minHeight: '100vh', display: 'flex' }}>
      <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#F7F5EF', borderRight: '1px solid #E7E3D8' }} className="auth-panel-left">
        <div style={{ position: 'absolute', inset: 0, opacity: 0.18 }}>
          <Image src="/visual1.jpg" alt="bg" fill style={{ objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(247,245,239,0.4) 0%, #F7F5EF 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '2rem' }}>
          <Image src="/logo-icon.jpg" alt="logo" width={80} height={80} style={{ borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1.5rem', border: '3px solid #008751' }} />
          <h1 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 900, fontSize: '2rem', background: 'linear-gradient(90deg, #008751, #FCD116, #E8112D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.75rem' }}>DAHOMEY-TECH</h1>
          <p style={{ color: '#6E7268', fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', maxWidth: '300px' }}>La plateforme des stylistes africains d'excellence.</p>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
            {['#008751', '#FCD116', '#E8112D'].map(c => <div key={c} style={{ width: '30px', height: '4px', borderRadius: '2px', background: c }} />)}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          {lienInvalide ? (
            <>
              <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.75rem', color: '#14201A' }}>Lien expiré ou invalide</h2>
              <p style={{ color: '#6E7268', fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Ce lien de réinitialisation n'est plus valable (il n'est utilisable qu'une seule fois, pendant un temps limité). Demandez-en un nouveau.
              </p>
              <Link href="/auth/mot-de-passe-oublie">
                <button style={{ background: 'linear-gradient(135deg, #008751, #00a862)', color: '#fff', padding: '0.9rem 1.75rem', borderRadius: '12px', fontFamily: 'Orbitron, sans-serif', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', border: 'none' }}>
                  Recevoir un nouveau lien
                </button>
              </Link>
            </>
          ) : !pret ? (
            <p style={{ color: '#9AA093', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>Vérification du lien…</p>
          ) : (
            <>
              <Link href="/auth/login" style={{ color: '#9AA093', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '2.5rem' }}>
                <ArrowLeft size={14} /> Connexion
              </Link>
              <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 800, fontSize: '1.8rem', marginBottom: '0.5rem', color: '#14201A' }}>Nouveau mot de passe</h2>
              <p style={{ color: '#9AA093', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', marginBottom: '2rem' }}>Choisissez un mot de passe pour votre compte.</p>

              {error && <div style={{ background: 'rgba(232,17,45,0.1)', border: '1px solid rgba(232,17,45,0.3)', color: '#E8112D', padding: '0.875rem 1rem', borderRadius: '10px', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', marginBottom: '1.5rem' }}>{error}</div>}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={labelStyle}>Nouveau mot de passe</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={15} style={iconPos} />
                    <input type={showPassword ? 'text' : 'password'} name="password" id="password" autoComplete="new-password" minLength={8} required style={{ ...inputStyle, paddingRight: '3rem' }} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 8 caractères"
                      onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#E7E3D8')} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#9AA093', cursor: 'pointer', display: 'flex' }}>
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Confirmer le mot de passe</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={15} style={iconPos} />
                    <input type={showPassword ? 'text' : 'password'} name="password-confirm" id="password-confirm" autoComplete="new-password" minLength={8} required style={inputStyle} value={confirmation} onChange={e => setConfirmation(e.target.value)} placeholder="Retapez le mot de passe"
                      onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#E7E3D8')} />
                  </div>
                </div>
                <button type="submit" disabled={loading} style={{ background: loading ? '#E7E3D8' : 'linear-gradient(135deg, #008751, #00a862)', color: loading ? '#9AA093' : '#fff', padding: '1rem', borderRadius: '12px', fontFamily: 'Orbitron, sans-serif', fontWeight: 700, fontSize: '0.9rem', cursor: loading ? 'not-allowed' : 'pointer', border: 'none', marginTop: '0.5rem', transition: 'all 0.3s', boxShadow: loading ? 'none' : '0 8px 30px rgba(0,135,81,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  {loading ? 'Mise à jour...' : <><CheckCircle size={17} /> Réinitialiser le mot de passe</>}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .auth-panel-left { display: none !important; } }`}</style>
    </div>
  )
}
