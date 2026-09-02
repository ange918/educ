'use client'
import { useState } from 'react'
import ProtectedImage from './ProtectedImage'
import Lightbox from './Lightbox'

export default function StylisteAvatar({ src, alt, size, border }: { src: string; alt: string; size: number; border?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div style={{ position: 'relative', width: `${size}px`, height: `${size}px`, flexShrink: 0, background: '#E7E3D8', borderRadius: '50%', border, overflow: 'hidden' }}>
        <ProtectedImage src={src} alt={alt} fill style={{ objectFit: 'contain' }} onImageClick={() => setOpen(true)} />
      </div>
      {open && <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
    </>
  )
}
