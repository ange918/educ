'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { createClient } from '@/lib/supabase/client'
import type { Client, Measurement } from '@/lib/supabase/types'
import { buildWhatsAppMessageLink } from '@/lib/utils'
import { ArrowLeft, Plus, X, User, Phone, CheckCircle, Users, Ruler, Calendar, AlignLeft, Pencil, MessageCircle } from 'lucide-react'

type ClientAvecMesures = Client & { measurements: Measurement[] }
type Genre = 'homme' | 'femme' | 'enfant'

const CHAMPS: Record<Genre, { key: string; label: string }[]> = {
  femme: [
    { key: 'tour_poitrine', label: 'Tour de poitrine' },
    { key: 'tour_taille', label: 'Tour de taille' },
    { key: 'tour_bassin', label: 'Tour de bassin' },
    { key: 'longueur_robe', label: 'Longueur robe' },
    { key: 'carrure', label: 'Carrure' },
    { key: 'longueur_manche', label: 'Longueur manche' },
    { key: 'tour_bras', label: 'Tour de bras' },
  ],
  homme: [
    { key: 'tour_cou', label: 'Tour de cou' },
    { key: 'tour_poitrine', label: 'Tour de poitrine' },
    { key: 'tour_taille', label: 'Tour de taille' },
    { key: 'longueur_chemise', label: 'Longueur chemise' },
    { key: 'longueur_pantalon', label: 'Longueur pantalon' },
    { key: 'tour_cuisse', label: 'Tour de cuisse' },
    { key: 'entrejambe', label: 'Entrejambe' },
  ],
  enfant: [
    { key: 'tour_poitrine', label: 'Tour de poitrine' },
    { key: 'tour_taille', label: 'Tour de taille' },
    { key: 'tour_bassin', label: 'Tour de bassin' },
    { key: 'longueur_vetement', label: "Longueur du vêtement" },
    { key: 'carrure', label: 'Carrure' },
  ],
}

const CHAMP_LABEL: Record<string, string> = Object.fromEntries(
  Object.values(CHAMPS).flat().map(c => [c.key, c.label])
)

const GENRES: { value: Genre; label: string }[] = [
  { value: 'femme', label: 'Femme' },
  { value: 'homme', label: 'Homme' },
  { value: 'enfant', label: 'Enfant' },
]

const inputStyle: React.CSSProperties = {
  background: '#FFFFFF', border: '1px solid #E7E3D8', borderRadius: '10px', color: '#14201A',
  padding: '0.875rem 1rem 0.875rem 2.8rem', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif', width: '100%', transition: 'border-color 0.2s',
}
const iconPos: React.CSSProperties = { position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9AA093', pointerEvents: 'none' }
const labelStyle: React.CSSProperties = { fontFamily: 'Orbitron, sans-serif', fontSize: '0.7rem', fontWeight: 700, color: '#6E7268', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.6rem' }

function Overlay({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(20,32,26,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', overflowY: 'auto' }}>
      <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: '520px', background: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', maxHeight: '90vh', overflowY: 'auto' }}>
        {children}
      </div>
    </div>
  )
}

export default function ClientsPage() {
  const router = useRouter()
  const [userId, setUserId] = useState<string | null>(null)
  const [clients, setClients] = useState<ClientAvecMesures[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [showAjouter, setShowAjouter] = useState(false)
  const [clientDetail, setClientDetail] = useState<ClientAvecMesures | null>(null)
  const [mesureForm, setMesureForm] = useState<{ client: ClientAvecMesures; existante: Measurement | null } | null>(null)

  const charger = async (uid: string) => {
    const supabase = createClient()
    const { data, error: err } = await supabase
      .from('clients')
      .select('*, measurements(*)')
      .eq('styliste_id', uid)
      .order('created_at', { ascending: false })
    if (err) { setError(err.message); return }
    setClients((data as ClientAvecMesures[]) || [])
  }

  useEffect(() => {
    const supabase = createClient()
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }
      setUserId(user.id)
      await charger(user.id)
      setLoading(false)
    }
    load()
  }, [router])

  const derniereMesure = (c: ClientAvecMesures): Measurement | null => {
    if (!c.measurements?.length) return null
    return [...c.measurements].sort((a, b) => b.created_at.localeCompare(a.created_at))[0]
  }

  if (loading) {
    return (
      <div style={{ background: '#F7F5EF', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: '#9AA093' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid #E7E3D8', borderTopColor: '#008751', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }} />
          <p style={{ fontFamily: 'Inter, sans-serif' }}>Chargement...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#F7F5EF', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem 5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/dashboard" style={{ color: '#9AA093', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ArrowLeft size={14} /> Retour
            </Link>
            <span style={{ color: '#C4C0B3' }}>·</span>
            <h1 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 800, fontSize: '1.5rem', color: '#14201A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={22} color="#2E86DE" /> Mes clients
            </h1>
          </div>
          <button onClick={() => setShowAjouter(true)} style={{ background: 'linear-gradient(135deg, #008751, #00a862)', color: '#fff', padding: '0.875rem 1.5rem', borderRadius: '12px', fontFamily: 'Orbitron, sans-serif', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 20px rgba(0,135,81,0.3)' }}>
            <Plus size={17} /> Ajouter un client
          </button>
        </div>

        {error && <div style={{ background: 'rgba(232,17,45,0.1)', border: '1px solid rgba(232,17,45,0.3)', color: '#E8112D', padding: '0.875rem 1rem', borderRadius: '10px', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', marginBottom: '1.5rem' }}>{error}</div>}

        {clients.length === 0 ? (
          <div style={{ background: '#FFFFFF', border: '1px solid #E7E3D8', borderRadius: '16px', padding: '3rem 2rem', textAlign: 'center' }}>
            <Users size={48} color="#E7E3D8" style={{ margin: '0 auto 1rem' }} />
            <p style={{ color: '#9AA093', fontFamily: 'Inter, sans-serif' }}>Aucun client enregistré pour l'instant.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {clients.map(c => {
              const derniere = derniereMesure(c)
              return (
                <div key={c.id} onClick={() => setClientDetail(c)} style={{ background: '#FFFFFF', border: '1px solid #E7E3D8', borderRadius: '14px', padding: '1.1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#008751')} onMouseLeave={e => (e.currentTarget.style.borderColor = '#E7E3D8')}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'rgba(0,135,81,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: 'Orbitron, sans-serif', fontWeight: 800, color: '#008751' }}>
                    {c.nom_complet[0]?.toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700, fontSize: '0.9rem', color: '#14201A' }}>{c.nom_complet}</span>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 600, color: '#6E7268', background: '#F7F5EF', padding: '0.15rem 0.55rem', borderRadius: '50px', textTransform: 'capitalize' }}>{c.genre}</span>
                    </div>
                    <p style={{ color: '#9AA093', fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', marginTop: '0.2rem' }}>
                      {derniere?.date_livraison ? `Livraison prévue : ${new Date(derniere.date_livraison).toLocaleDateString('fr-FR')}` : 'Aucune mesure enregistrée'}
                    </p>
                  </div>
                  <a href={buildWhatsAppMessageLink(c.telephone, `Bonjour ${c.nom_complet},`)} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                    style={{ background: '#25D366', color: '#fff', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MessageCircle size={17} />
                  </a>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {showAjouter && userId && (
        <AjouterClientModal
          userId={userId}
          onClose={() => setShowAjouter(false)}
          onAjoute={async () => { setShowAjouter(false); await charger(userId) }}
        />
      )}

      {clientDetail && (
        <DetailClientModal
          client={clientDetail}
          onClose={() => setClientDetail(null)}
          onNouvelleMesure={() => { setMesureForm({ client: clientDetail, existante: null }); setClientDetail(null) }}
          onModifierMesure={m => { setMesureForm({ client: clientDetail, existante: m }); setClientDetail(null) }}
        />
      )}

      {mesureForm && userId && (
        <MesureModal
          client={mesureForm.client}
          existante={mesureForm.existante}
          onClose={() => setMesureForm(null)}
          onEnregistre={async () => { setMesureForm(null); await charger(userId) }}
        />
      )}
    </div>
  )
}

function AjouterClientModal({ userId, onClose, onAjoute }: { userId: string; onClose: () => void; onAjoute: () => void }) {
  const [nom, setNom] = useState('')
  const [telephone, setTelephone] = useState('')
  const [genre, setGenre] = useState<Genre>('femme')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const supabase = createClient()
    const { error: err } = await supabase.from('clients').insert({
      styliste_id: userId, nom_complet: nom, telephone, genre,
    })
    setLoading(false)
    if (err) { setError(err.message); return }
    onAjoute()
  }

  return (
    <Overlay onClose={onClose}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: '#14201A' }}>Ajouter un client</h2>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#9AA093', cursor: 'pointer' }}><X size={20} /></button>
      </div>
      {error && <div style={{ background: 'rgba(232,17,45,0.1)', border: '1px solid rgba(232,17,45,0.3)', color: '#E8112D', padding: '0.875rem 1rem', borderRadius: '10px', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', marginBottom: '1.25rem' }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label style={labelStyle}>Nom complet *</label>
          <div style={{ position: 'relative' }}>
            <User size={15} style={iconPos} />
            <input required style={inputStyle} value={nom} onChange={e => setNom(e.target.value)} placeholder="Ex: Adjoavi Koffi"
              onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#E7E3D8')} />
          </div>
        </div>
        <div>
          <label style={labelStyle}>Téléphone / WhatsApp *</label>
          <div style={{ position: 'relative' }}>
            <Phone size={15} style={iconPos} />
            <input required type="tel" style={inputStyle} value={telephone} onChange={e => setTelephone(e.target.value)} placeholder="22997XXXXXX"
              onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#E7E3D8')} />
          </div>
        </div>
        <div>
          <label style={labelStyle}>Genre</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {GENRES.map(g => (
              <button type="button" key={g.value} onClick={() => setGenre(g.value)} style={{ flex: 1, padding: '0.6rem', border: `2px solid ${genre === g.value ? '#008751' : '#E7E3D8'}`, borderRadius: '8px', background: genre === g.value ? 'rgba(0,135,81,0.15)' : 'transparent', color: genre === g.value ? '#008751' : '#6E7268', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}>
                {g.label}
              </button>
            ))}
          </div>
        </div>
        <button type="submit" disabled={loading} style={{ background: loading ? '#E7E3D8' : 'linear-gradient(135deg, #008751, #00a862)', color: loading ? '#9AA093' : '#fff', padding: '1rem', borderRadius: '12px', fontFamily: 'Orbitron, sans-serif', fontWeight: 700, fontSize: '0.9rem', cursor: loading ? 'not-allowed' : 'pointer', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          {loading ? 'Ajout...' : <><CheckCircle size={17} /> Ajouter</>}
        </button>
      </form>
    </Overlay>
  )
}

function DetailClientModal({ client, onClose, onNouvelleMesure, onModifierMesure }: {
  client: ClientAvecMesures
  onClose: () => void
  onNouvelleMesure: () => void
  onModifierMesure: (m: Measurement) => void
}) {
  const historique = [...client.measurements].sort((a, b) => b.created_at.localeCompare(a.created_at))
  return (
    <Overlay onClose={onClose}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: '#14201A' }}>{client.nom_complet}</h2>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#9AA093', cursor: 'pointer' }}><X size={20} /></button>
      </div>
      <p style={{ color: '#9AA093', fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', marginBottom: '1.25rem', textTransform: 'capitalize' }}>{client.genre} · {client.telephone}</p>

      <a href={buildWhatsAppMessageLink(client.telephone, `Bonjour ${client.nom_complet},`)} target="_blank" rel="noopener noreferrer"
        style={{ background: '#25D366', color: '#fff', padding: '0.7rem 1.25rem', borderRadius: '10px', fontFamily: 'Orbitron, sans-serif', fontWeight: 700, fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', marginBottom: '1.5rem' }}>
        <MessageCircle size={16} /> Contacter sur WhatsApp
      </a>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
        <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.8rem', fontWeight: 700, color: '#6E7268', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Historique des mesures</h3>
        <button onClick={onNouvelleMesure} style={{ background: 'rgba(0,135,81,0.1)', border: 'none', color: '#008751', padding: '0.5rem 0.9rem', borderRadius: '8px', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Plus size={14} /> Nouvelle prise
        </button>
      </div>

      {historique.length === 0 ? (
        <p style={{ color: '#9AA093', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', textAlign: 'center', padding: '1.5rem 0' }}>Aucune mesure enregistrée.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {historique.map(m => (
            <div key={m.id} style={{ background: '#F7F5EF', border: '1px solid #E7E3D8', borderRadius: '12px', padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.8rem', fontWeight: 700, color: '#14201A', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Calendar size={13} color="#008751" /> {m.date_livraison ? new Date(m.date_livraison).toLocaleDateString('fr-FR') : 'Date non précisée'}
                </span>
                <button onClick={() => onModifierMesure(m)} style={{ background: 'none', border: 'none', color: '#9AA093', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontFamily: 'Inter, sans-serif', fontSize: '0.75rem' }}>
                  <Pencil size={13} /> Modifier
                </button>
              </div>
              {m.notes && <p style={{ color: '#6E7268', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{m.notes}</p>}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {Object.entries(m.data).map(([key, val]) => (
                  <span key={key} style={{ background: '#FFFFFF', border: '1px solid #E7E3D8', borderRadius: '50px', padding: '0.25rem 0.65rem', fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: '#14201A' }}>
                    {CHAMP_LABEL[key] || key} : <strong>{val} cm</strong>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Overlay>
  )
}

function MesureModal({ client, existante, onClose, onEnregistre }: {
  client: ClientAvecMesures
  existante: Measurement | null
  onClose: () => void
  onEnregistre: () => void
}) {
  const champs = CHAMPS[client.genre]
  const [valeurs, setValeurs] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {}
    champs.forEach(c => { init[c.key] = existante?.data?.[c.key] != null ? String(existante.data[c.key]) : '' })
    return init
  })
  const [dateLivraison, setDateLivraison] = useState(existante?.date_livraison?.slice(0, 10) || '')
  const [notes, setNotes] = useState(existante?.notes || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const supabase = createClient()
    const data: Record<string, number> = {}
    champs.forEach(c => { if (valeurs[c.key]) data[c.key] = Number(valeurs[c.key]) })

    const payload = {
      client_id: client.id,
      styliste_id: client.styliste_id,
      date_livraison: dateLivraison || null,
      notes: notes || null,
      data,
    }

    const { error: err } = existante
      ? await supabase.from('measurements').update(payload).eq('id', existante.id)
      : await supabase.from('measurements').insert(payload)

    setLoading(false)
    if (err) { setError(err.message); return }
    onEnregistre()
  }

  return (
    <Overlay onClose={onClose}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
        <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 800, fontSize: '1.15rem', color: '#14201A' }}>
          {existante ? 'Modifier la prise de mesures' : 'Nouvelle prise de mesures'}
        </h2>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#9AA093', cursor: 'pointer' }}><X size={20} /></button>
      </div>
      <p style={{ color: '#9AA093', fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', marginBottom: '1.25rem' }}>{client.nom_complet}</p>

      {error && <div style={{ background: 'rgba(232,17,45,0.1)', border: '1px solid rgba(232,17,45,0.3)', color: '#E8112D', padding: '0.875rem 1rem', borderRadius: '10px', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', marginBottom: '1.25rem' }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
          {champs.map(c => (
            <div key={c.key}>
              <label style={labelStyle}>{c.label} (cm)</label>
              <div style={{ position: 'relative' }}>
                <Ruler size={14} style={iconPos} />
                <input type="number" min={0} step="0.5" style={inputStyle} value={valeurs[c.key]} onChange={e => setValeurs({ ...valeurs, [c.key]: e.target.value })}
                  onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#E7E3D8')} />
              </div>
            </div>
          ))}
        </div>

        <div>
          <label style={labelStyle}>Date de livraison prévue</label>
          <div style={{ position: 'relative' }}>
            <Calendar size={14} style={iconPos} />
            <input type="date" style={inputStyle} value={dateLivraison} onChange={e => setDateLivraison(e.target.value)}
              onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#E7E3D8')} />
          </div>
        </div>

        <div>
          <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '0.4rem' }}><AlignLeft size={13} /> Notes</label>
          <textarea rows={3} style={{ background: '#FFFFFF', border: '1px solid #E7E3D8', borderRadius: '10px', color: '#14201A', padding: '0.875rem 1rem', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif', width: '100%', resize: 'vertical' }} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Ex: Wax 3 pagnes - Motif bleu"
            onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#E7E3D8')} />
        </div>

        <button type="submit" disabled={loading} style={{ background: loading ? '#E7E3D8' : 'linear-gradient(135deg, #008751, #00a862)', color: loading ? '#9AA093' : '#fff', padding: '1rem', borderRadius: '12px', fontFamily: 'Orbitron, sans-serif', fontWeight: 700, fontSize: '0.9rem', cursor: loading ? 'not-allowed' : 'pointer', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          {loading ? 'Enregistrement...' : <><CheckCircle size={17} /> Enregistrer</>}
        </button>
      </form>
    </Overlay>
  )
}
