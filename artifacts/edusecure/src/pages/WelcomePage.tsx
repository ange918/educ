import React from 'react'
import { Link } from 'wouter'
import Logo from '@/components/Logo'

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 animate-fade-in" style={{ backgroundColor: '#0A1628' }}>
      <div className="flex flex-col items-center gap-2 mb-12">
        <Logo size="lg" variant="light" />
        <p className="text-slate-400 text-base font-light mt-2">Gestion scolaire intelligente</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <Link href="/auth/login?role=parent" className="block group">
          <div className="w-72 p-10 rounded-2xl border border-white/20 flex flex-col gap-5 cursor-pointer transition-all duration-200 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-[#2563EB]/10" style={{ backgroundColor: '#112240' }}>
            <i className="bx bx-user text-4xl text-[#2563EB]" />
            <div>
              <h2 className="font-display font-bold text-white text-2xl mb-2">Parent</h2>
              <p className="text-slate-400 text-sm leading-relaxed">Accédez au suivi scolaire et aux paiements de vos enfants.</p>
            </div>
            <button className="w-full bg-[#2563EB] text-white py-3 rounded-xl font-semibold text-sm mt-2 active:scale-95 transition-transform duration-100 hover:bg-[#3B82F6]">
              Continuer →
            </button>
          </div>
        </Link>

        <Link href="/auth/login?role=admin" className="block group">
          <div className="w-72 p-10 rounded-2xl border border-white/20 flex flex-col gap-5 cursor-pointer transition-all duration-200 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-[#2563EB]/10" style={{ backgroundColor: '#112240' }}>
            <i className="bx bx-shield text-4xl text-[#2563EB]" />
            <div>
              <h2 className="font-display font-bold text-white text-2xl mb-2">Administrateur</h2>
              <p className="text-slate-400 text-sm leading-relaxed">Gérez les élèves, les accès et les statistiques de l'école.</p>
            </div>
            <button className="w-full bg-[#2563EB] text-white py-3 rounded-xl font-semibold text-sm mt-2 active:scale-95 transition-transform duration-100 hover:bg-[#3B82F6]">
              Continuer →
            </button>
          </div>
        </Link>
      </div>

      <p className="text-slate-600 text-xs mt-16">v1.0.0</p>
    </div>
  )
}
