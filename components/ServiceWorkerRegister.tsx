'use client'
import { useEffect } from 'react'

// Enregistre le service worker (nécessaire pour rendre la PWA installable).
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const onLoad = () => navigator.serviceWorker.register('/sw.js').catch(() => {})
      if (document.readyState === 'complete') onLoad()
      else window.addEventListener('load', onLoad, { once: true })
    }
  }, [])
  return null
}
