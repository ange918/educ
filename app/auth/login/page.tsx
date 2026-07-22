'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogIn, Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })
    setLoading(false)
    if (authError) {
      setError(authError.message === 'Invalid login credentials'
        ? 'Email ou mot de passe incorrect.'
        : authError.message)
      return
    }
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
          <Link href="/" style={{ color: '#9AA093', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '2.5rem' }}>
            <ArrowLeft size={14} /> Accueil
          </Link>
          <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 800, fontSize: '1.8rem', marginBottom: '0.5rem', color: '#14201A' }}>Connexion</h2>
          <p style={{ color: '#9AA093', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', marginBottom: '2rem' }}>Accédez à votre espace styliste</p>

          {error && <div style={{ background: 'rgba(232,17,45,0.1)', border: '1px solid rgba(232,17,45,0.3)', color: '#E8112D', padding: '0.875rem 1rem', borderRadius: '10px', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', marginBottom: '1.5rem' }}>{error}</div>}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={labelStyle}>Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={15} style={iconPos} />
                <input type="email" required style={inputStyle} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="votre@email.com"
                  onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#E7E3D8')} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Mot de passe</label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} style={iconPos} />
                <input type={showPassword ? 'text' : 'password'} required style={{ ...inputStyle, paddingRight: '3rem' }} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••••"
                  onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#E7E3D8')} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#9AA093', cursor: 'pointer', display: 'flex' }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} style={{ background: loading ? '#E7E3D8' : 'linear-gradient(135deg, #008751, #00a862)', color: loading ? '#9AA093' : '#fff', padding: '1rem', borderRadius: '12px', fontFamily: 'Orbitron, sans-serif', fontWeight: 700, fontSize: '0.9rem', cursor: loading ? 'not-allowed' : 'pointer', border: 'none', marginTop: '0.5rem', transition: 'all 0.3s', boxShadow: loading ? 'none' : '0 8px 30px rgba(0,135,81,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              {loading ? 'Connexion...' : <><LogIn size={17} /> Se connecter</>}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '2rem', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: '#9AA093' }}>
            Pas encore de compte ? <Link href="/auth/register" style={{ color: '#008751', fontWeight: 600 }}>Créer mon espace gratuit</Link>
          </p>
        </div>
      </div>
      {/* !important requis : le panneau a un style inline display:flex, qu'une
          règle de feuille de style ne peut écraser que via !important. */}
      <style>{`@media (max-width: 768px) { .auth-panel-left { display: none !important; } }`}</style>
    </div>
  )
}
