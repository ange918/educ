'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Download, X, Share, SquarePlus } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const DISMISS_KEY = 'dt_install_dismissed'

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isIOS, setIsIOS] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dejaInstallee =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true
    if (dejaInstallee) return

    if (localStorage.getItem(DISMISS_KEY)) return

    const onBeforeInstall = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setVisible(true)
    }
    window.addEventListener('beforeinstallprompt', onBeforeInstall)

    const iOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent)
    if (iOS) {
      setIsIOS(true)
      setVisible(true)
    }

    return () => window.removeEventListener('beforeinstallprompt', onBeforeInstall)
  }, [])

  const fermer = () => {
    setVisible(false)
    localStorage.setItem(DISMISS_KEY, '1')
  }

  const installer = async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
    setVisible(false)
    localStorage.setItem(DISMISS_KEY, '1')
  }

  if (!visible) return null

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 3000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', background: 'rgba(20,32,26,0.45)' }} onClick={fermer}>
      <div
        onClick={e => e.stopPropagation()}
        style={{ width: '100%', maxWidth: '480px', background: '#FFFFFF', borderRadius: '20px 20px 0 0', padding: '1.75rem 1.5rem calc(1.75rem + env(safe-area-inset-bottom))', boxShadow: '0 -10px 40px rgba(20,32,26,0.2)' }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.25rem' }}>
          <Image src="/logo-icon.jpg" alt="DAHOMEY-TECH" width={52} height={52} style={{ borderRadius: '14px', objectFit: 'cover', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 800, fontSize: '1.05rem', color: '#14201A', marginBottom: '0.3rem' }}>Installer DAHOMEY-TECH</h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#6E7268', lineHeight: 1.5 }}>
              Accédez plus vite à la marketplace, comme une vraie application.
            </p>
          </div>
          <button onClick={fermer} style={{ background: 'none', border: 'none', color: '#9AA093', cursor: 'pointer', padding: '0.25rem' }}>
            <X size={18} />
          </button>
        </div>

        {isIOS ? (
          <div style={{ background: '#F7F5EF', border: '1px solid #E7E3D8', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#14201A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Share size={16} color="#008751" /> Appuyez sur <strong>Partager</strong> dans Safari
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#14201A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <SquarePlus size={16} color="#008751" /> Puis <strong>« Sur l'écran d'accueil »</strong>
            </p>
          </div>
        ) : (
          <button onClick={installer} disabled={!deferredPrompt} style={{ width: '100%', background: deferredPrompt ? 'linear-gradient(135deg, #008751, #00a862)' : '#E7E3D8', color: deferredPrompt ? '#fff' : '#9AA093', padding: '0.95rem', borderRadius: '12px', fontFamily: 'Orbitron, sans-serif', fontWeight: 700, fontSize: '0.9rem', border: 'none', cursor: deferredPrompt ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Download size={17} /> Installer
          </button>
        )}

        <button onClick={fermer} style={{ width: '100%', background: 'transparent', border: 'none', color: '#9AA093', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', fontWeight: 600, padding: '0.9rem', cursor: 'pointer' }}>
          Ignorer
        </button>
      </div>
    </div>
  )
}
