'use client'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton({ whatsapp }: { whatsapp: string }) {
  return (
    <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">
      <button
        style={{ background: '#25D366', color: '#fff', padding: '0.875rem 1.75rem', borderRadius: '50px', fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem', boxShadow: '0 8px 30px rgba(37,211,102,0.3)', border: 'none', transition: 'transform 0.2s' }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
      >
        <MessageCircle size={18} fill="white" /> Contacter sur WhatsApp
      </button>
    </a>
  )
}
