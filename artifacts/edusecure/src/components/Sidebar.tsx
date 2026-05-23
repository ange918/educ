import React from 'react'
import { Link, useLocation } from 'wouter'
import Logo from './Logo'
import { getInitials, getAvatarColor } from '@/lib/utils'

interface NavItem {
  icon: string
  label: string
  href: string
  badge?: number
}

interface SidebarProps {
  role: 'parent' | 'admin'
  userName?: string
}

const parentNav: NavItem[] = [
  { icon: 'bx-home', label: 'Tableau de bord', href: '/parent/dashboard' },
  { icon: 'bx-group', label: 'Mes enfants', href: '/parent/children' },
  { icon: 'bx-credit-card', label: 'Paiements', href: '/parent/payments' },
  { icon: 'bx-user-circle', label: 'Mon profil', href: '/parent/profile' },
]

const adminNav: NavItem[] = [
  { icon: 'bx-tachometer', label: 'Tableau de bord', href: '/admin/dashboard' },
  { icon: 'bx-graduation', label: 'Élèves', href: '/admin/students' },
  { icon: 'bx-bell', label: 'Notifications', href: '/admin/notifications', badge: 3 },
  { icon: 'bx-cog', label: 'Paramètres', href: '/admin/settings' },
]

export default function Sidebar({ role, userName = 'Akua Osei' }: SidebarProps) {
  const [pathname, navigate] = useLocation()
  const nav = role === 'parent' ? parentNav : adminNav
  const sidebarBg = role === 'admin' ? 'bg-[#0A1628]' : 'bg-[#112240]'
  const initials = getInitials(userName)
  const avatarColor = getAvatarColor(userName)

  const handleLogout = () => {
    localStorage.removeItem('edusecure_session')
    navigate('/')
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={`hidden md:flex flex-col w-60 min-h-screen ${sidebarBg} fixed left-0 top-0 z-30`}>
        <div className="p-5 border-b border-white/10">
          <Logo size="sm" variant="light" />
        </div>

        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ backgroundColor: avatarColor }}>
              {initials}
            </div>
            <div className="overflow-hidden">
              <div className="text-white text-sm font-semibold truncate">{userName}</div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${role === 'admin' ? 'bg-amber-500/20 text-amber-400' : 'bg-[#2563EB]/20 text-[#3B82F6]'}`}>
                {role === 'admin' ? 'Administrateur' : 'Parent'}
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {nav.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${isActive ? 'bg-[#2563EB] text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}>
                <i className={`bx ${item.icon} text-xl`} />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{item.badge}</span>
                )}
              </Link>
            )
          })}
        </nav>

        <div className="p-3 border-t border-white/10">
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-200 w-full">
            <i className="bx bx-log-out text-xl" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Mobile bottom tab bar */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-30 ${sidebarBg} border-t border-white/10 flex`} style={{ height: 60 }}>
        {nav.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href} className={`flex-1 flex flex-col items-center justify-center gap-0.5 text-xs transition-colors ${isActive ? 'text-[#3B82F6]' : 'text-slate-400'}`}>
              <i className={`bx ${item.icon} text-xl`} />
              <span className="text-[10px]">{item.label.split(' ')[0]}</span>
            </Link>
          )
        })}
        <button onClick={handleLogout} className="flex-1 flex flex-col items-center justify-center gap-0.5 text-xs text-slate-400">
          <i className="bx bx-log-out text-xl" />
          <span className="text-[10px]">Sortir</span>
        </button>
      </nav>
    </>
  )
}
