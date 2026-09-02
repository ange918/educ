'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const percentRef = useRef<HTMLSpanElement>(null)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const tl = gsap.timeline()

    // Logo entrance
    tl.fromTo(logoRef.current, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.7)' })
    // Pulse ring
    .fromTo('.loader-ring', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }, '-=0.2')

    // Progress fill
    const obj = { value: 0 }
    tl.to(obj, {
      value: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate() {
        const v = Math.round(obj.value)
        setPct(v)
        if (fillRef.current) fillRef.current.style.width = `${v}%`
      },
    }, '+=0.3')

    // Exit
    tl.to(logoRef.current, { scale: 1.15, duration: 0.3, ease: 'power2.in' })
    tl.to(loaderRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete,
    }, '-=0.1')

    return () => { tl.kill() }
  }, [])

  return (
    <div ref={loaderRef} style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'var(--creme)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '0',
    }}>
      {/* Logo */}
      <div ref={logoRef} style={{ position: 'relative', marginBottom: '3rem' }}>
        {/* Pulsing ring */}
        <div className="loader-ring" style={{
          position: 'absolute', inset: '-12px',
          borderRadius: '50%',
          border: '2px solid transparent',
          borderTopColor: '#008751',
          borderRightColor: '#FCD116',
          animation: 'spin 1.2s linear infinite',
        }} />
        <div className="loader-ring" style={{
          position: 'absolute', inset: '-22px',
          borderRadius: '50%',
          border: '1px solid rgba(232,17,45,0.3)',
          animation: 'spin 2s linear infinite reverse',
        }} />
        <Image
          src="/logo-icon.jpg"
          alt="DAHOMEY-TECH"
          width={100}
          height={100}
          style={{ borderRadius: '50%', objectFit: 'cover', display: 'block', border: '3px solid #008751' }}
          priority
        />
      </div>

      {/* Titre */}
      <div style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 800, fontSize: '1.1rem', background: 'linear-gradient(90deg, #008751, #FCD116, #E8112D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '0.1em', marginBottom: '2.5rem' }}>
        DAHOMEY-TECH
      </div>

      {/* Barre de progression */}
      <div style={{ width: '280px' }}>
        <div ref={progressRef} style={{ height: '3px', background: 'var(--bordure)', borderRadius: '50px', overflow: 'hidden', marginBottom: '0.75rem' }}>
          <div ref={fillRef} style={{ height: '100%', width: '0%', background: 'linear-gradient(90deg, #008751, #FCD116, #E8112D)', borderRadius: '50px', transition: 'none' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.7rem', color: 'var(--gris-texte)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Chargement</span>
          <span ref={percentRef} style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.75rem', color: 'var(--vert)', fontWeight: 700 }}>{pct}%</span>
        </div>
      </div>

      {/* Drapeau béninois strip */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', display: 'flex' }}>
        <div style={{ flex: 1, background: '#008751' }} />
        <div style={{ flex: 1, background: '#FCD116' }} />
        <div style={{ flex: 1, background: '#E8112D' }} />
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
