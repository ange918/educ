'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [userName, setUserName] = useState('Akua Osei')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const raw = localStorage.getItem('edusecure_session')
    if (!raw) {
      router.push('/')
      return
    }
    try {
      const session = JSON.parse(raw)
      if (session.role !== 'parent') {
        router.push('/')
        return
      }
      setUserName(session.name || 'Akua Osei')
    } catch {
      router.push('/')
      return
    }
    setReady(true)
  }, [router])

  if (!ready) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <i className="bx bx-loader-alt animate-spin text-3xl text-accent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar role="parent" userName={userName} />
      <main className="md:ml-60 pb-16 md:pb-0">
        <div className="bg-white min-h-screen p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
