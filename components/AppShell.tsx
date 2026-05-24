'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import GSAPInit from './GSAPInit'

const Loader = dynamic(() => import('./Loader'), { ssr: false })

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease', pointerEvents: loaded ? 'auto' : 'none' }}>
        {children}
      </div>
      {loaded && <GSAPInit />}
    </>
  )
}
