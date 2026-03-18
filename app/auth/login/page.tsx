'use client'

import React, { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import Logo from '@/components/Logo'
import { loginUser } from '@/lib/api'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const role = searchParams.get('role') || 'parent'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    // TODO: replace with real POST /api/auth/login
    const result = await loginUser(email, password)
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'edusecure_session',
        JSON.stringify({ role: result.role, name: result.user.name, email: result.user.email, token: result.token }),
      )
    }
    setLoading(false)
    if (result.role === 'admin') {
      router.push('/admin/dashboard')
    } else {
      router.push('/parent/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div
        className="hidden md:flex flex-1 flex-col items-center justify-center p-12 relative"
        style={{ backgroundColor: '#0A1628' }}
      >
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-4 text-center">
          <Logo size="lg" variant="light" />
          <p className="text-slate-400 text-base max-w-xs leading-relaxed mt-2">
            La solution intelligente pour la gestion scolaire et le contrôle d&apos;accès QR.
          </p>
          <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6 text-left max-w-xs w-full">
            <div className="flex items-center gap-2 mb-3">
              <i className="bx bx-shield-check text-accent text-xl" />
              <span className="text-white font-semibold text-sm">Sécurisé & Fiable</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Accès QR vérifiés en temps réel. Paiements suivis automatiquement. Notifications instantanées.
            </p>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-sm animate-fade-in">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6"
            >
              <i className="bx bx-arrow-back" />
              Retour
            </Link>
            <h1 className="font-display font-bold text-3xl text-gray-800 mb-1">
              Connexion
            </h1>
            <p className="text-gray-500 text-sm">
              {role === 'admin' ? 'Espace administrateur' : 'Espace parent'}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Adresse email
              </label>
              <div className="relative">
                <i className="bx bx-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Mot de passe
              </label>
              <div className="relative">
                <i className="bx bx-lock-alt absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <i className={`bx ${showPassword ? 'bx-hide' : 'bx-show'} text-lg`} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 accent-accent rounded"
              />
              <label htmlFor="remember" className="text-sm text-gray-600">
                Se souvenir de moi
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-accent-light transition-colors active:scale-95 duration-100 disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <i className="bx bx-loader-alt animate-spin" />
                  Connexion en cours...
                </>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Pas encore de compte ?{' '}
              <Link
                href="/auth/register"
                className="text-accent font-medium hover:underline"
              >
                Créer un compte
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center text-xs text-gray-400">
            <p>Astuce : utilisez &quot;admin@...&quot; pour l&apos;espace admin</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <LoginForm />
    </Suspense>
  )
}
