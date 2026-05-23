import React, { useState } from 'react'
import { Link, useLocation } from 'wouter'
import Logo from '@/components/Logo'
import { registerUser } from '@/lib/api'

type Step = 1 | 2 | 3

export default function RegisterPage() {
  const [, navigate] = useLocation()
  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '', accepted: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const getPasswordStrength = (p: string): { level: 0 | 1 | 2 | 3; label: string; color: string } => {
    if (!p) return { level: 0, label: '', color: '' }
    if (p.length < 6) return { level: 1, label: 'Faible', color: 'bg-red-500' }
    if (p.length < 10 || !/[A-Z]/.test(p) || !/[0-9]/.test(p)) return { level: 2, label: 'Moyen', color: 'bg-amber-500' }
    return { level: 3, label: 'Fort', color: 'bg-emerald-500' }
  }

  const strength = getPasswordStrength(form.password)

  const handleSubmit = async () => {
    setLoading(true)
    await registerUser({ firstName: form.firstName, lastName: form.lastName, email: form.email, phone: form.phone, password: form.password })
    localStorage.setItem('edusecure_session', JSON.stringify({ role: 'parent', name: `${form.firstName} ${form.lastName}`, email: form.email, token: 'mock-jwt-token' }))
    setLoading(false)
    navigate('/parent/dashboard')
  }

  const steps = [{ n: 1, label: 'Informations' }, { n: 2, label: 'Sécurité' }, { n: 3, label: 'Confirmation' }]

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex flex-1 flex-col items-center justify-center p-12 relative" style={{ backgroundColor: '#0A1628' }}>
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="dots2" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="white" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#dots2)" />
          </svg>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-4 text-center">
          <Logo size="lg" variant="light" />
          <p className="text-slate-400 text-base max-w-xs leading-relaxed mt-2">Rejoignez ÉduSecure et gérez la scolarité de vos enfants simplement.</p>
        </div>
      </div>

      <div className="flex-1 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-sm animate-fade-in">
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-4">
              <i className="bx bx-arrow-back" />Retour
            </Link>
            <h1 className="font-display font-bold text-3xl text-gray-800 mb-1">Créer un compte</h1>
          </div>

          <div className="flex items-center gap-2 mb-8">
            {steps.map((s, i) => (
              <React.Fragment key={s.n}>
                <div className="flex items-center gap-1.5">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step > s.n ? 'bg-emerald-500 text-white' : step === s.n ? 'bg-[#2563EB] text-white' : 'bg-gray-200 text-gray-400'}`}>
                    {step > s.n ? <i className="bx bx-check" /> : s.n}
                  </div>
                  <span className={`text-xs ${step === s.n ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>{s.label}</span>
                </div>
                {i < steps.length - 1 && <div className={`flex-1 h-px ${step > s.n ? 'bg-emerald-400' : 'bg-gray-200'}`} />}
              </React.Fragment>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Prénom</label>
                  <div className="relative">
                    <i className="bx bx-user absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} placeholder="Akua" className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2563EB]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom</label>
                  <input type="text" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} placeholder="Osei" className="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2563EB]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <div className="relative">
                  <i className="bx bx-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="votre@email.com" className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2563EB]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Téléphone</label>
                <div className="relative">
                  <i className="bx bx-phone absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+229 XX XX XX XX" className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2563EB]" />
                </div>
              </div>
              <button onClick={() => setStep(2)} className="w-full bg-[#2563EB] text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-[#3B82F6] transition-colors active:scale-95 duration-100 mt-2">
                Suivant →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Mot de passe</label>
                <div className="relative">
                  <i className="bx bx-lock-alt absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" className="w-full pl-9 pr-10 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2563EB]" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <i className={`bx ${showPassword ? 'bx-hide' : 'bx-show'}`} />
                  </button>
                </div>
                {form.password && (
                  <div className="mt-2">
                    <div className="flex gap-1 h-1.5">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className={`flex-1 rounded-full transition-all ${strength.level >= i ? strength.color : 'bg-gray-200'}`} />
                      ))}
                    </div>
                    <p className="text-xs mt-1 text-gray-500">Force : <span className="font-medium">{strength.label}</span></p>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirmer le mot de passe</label>
                <div className="relative">
                  <i className="bx bx-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type={showPassword ? 'text' : 'password'} value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} placeholder="••••••••" className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2563EB]" />
                </div>
                {form.confirmPassword && form.password !== form.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">Les mots de passe ne correspondent pas</p>
                )}
              </div>
              <div className="flex gap-3 mt-2">
                <button onClick={() => setStep(1)} className="flex-1 border border-gray-200 text-gray-600 py-3.5 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors">← Retour</button>
                <button onClick={() => setStep(3)} disabled={form.password !== form.confirmPassword || !form.password} className="flex-1 bg-[#2563EB] text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-[#3B82F6] transition-colors active:scale-95 duration-100 disabled:opacity-60">Suivant →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <h3 className="font-semibold text-gray-700 text-sm mb-3">Récapitulatif</h3>
                {[{ label: 'Prénom', value: form.firstName }, { label: 'Nom', value: form.lastName }, { label: 'Email', value: form.email }, { label: 'Téléphone', value: form.phone }].map((r) => (
                  <div key={r.label} className="flex justify-between text-sm">
                    <span className="text-gray-500">{r.label}</span>
                    <span className="font-medium text-gray-800">{r.value || '—'}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" id="accept" checked={form.accepted} onChange={(e) => setForm({ ...form, accepted: e.target.checked })} className="w-4 h-4 mt-0.5" />
                <label htmlFor="accept" className="text-sm text-gray-600 leading-relaxed">
                  J'accepte les <span className="text-[#2563EB] font-medium cursor-pointer hover:underline">conditions d'utilisation</span>
                </label>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex-1 border border-gray-200 text-gray-600 py-3.5 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors">← Retour</button>
                <button onClick={handleSubmit} disabled={!form.accepted || loading} className="flex-1 bg-[#2563EB] text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-[#3B82F6] transition-colors active:scale-95 duration-100 disabled:opacity-60 flex items-center justify-center gap-2">
                  {loading ? <><i className="bx bx-loader-alt animate-spin" />Création...</> : 'Créer mon compte'}
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Déjà un compte ? <Link href="/auth/login" className="text-[#2563EB] font-medium hover:underline">Se connecter</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
