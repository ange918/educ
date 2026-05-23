import React, { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import Sidebar from '@/components/Sidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [, navigate] = useLocation()
  const [userName, setUserName] = useState('Admin')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const raw = localStorage.getItem('edusecure_session')
    if (!raw) {
      navigate('/')
      return
    }
    try {
      const session = JSON.parse(raw)
      if (session.role !== 'admin') {
        navigate('/')
        return
      }
      setUserName(session.name || 'Admin')
    } catch {
      navigate('/')
      return
    }
    setReady(true)
  }, [navigate])

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
        <i className="bx bx-loader-alt animate-spin text-3xl text-[#2563EB]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar role="admin" userName={userName} />
      <main className="md:ml-60 pb-16 md:pb-0">
        <div className="bg-white min-h-screen p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
