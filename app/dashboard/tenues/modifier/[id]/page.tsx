'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { createClient } from '@/lib/supabase/client'
import type { Categorie, Tenue } from '@/lib/supabase/types'
import { ArrowLeft, Camera, X, Plus, CheckCircle, Tag, AlignLeft, DollarSign, Layers, Package, ToggleLeft, ToggleRight, Upload, Trash2 } from 'lucide-react'

const TAILLES_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'Sur mesure']

export default function ModifierTenuePage() {
  const router = useRouter()
  const params = useParams()
  const tenueId = String(params.id)

  const [categories, setCategories] = useState<Categorie[]>([])
  const [form, setForm] = useState({ nom: '', description: '', prix: '', categorie: '', disponible: true, stock: '1' })
  const [tailles, setTailles] = useState<string[]>([])
  const [couleurs, setCouleurs] = useState<string[]>([''])
  const [photosExistantes, setPhotosExistantes] = useState<string[]>([]) // URLs déjà en base
  const [nouvellesPhotos, setNouvellesPhotos] = useState<File[]>([])      // fichiers à uploader
  const [chargement, setChargement] = useState(true)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [introuvable, setIntrouvable] = useState(false)

  // Chargement des catégories + de la tenue à éditer
  useEffect(() => {
    const supabase = createClient()
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }

      const [{ data: cats }, { data: tenue, error: tErr }] = await Promise.all([
        supabase.from('categories').select('*').order('ordre'),
        supabase.from('tenues').select('*').eq('id', tenueId).single(),
      ])
      setCategories(cats || [])

      const t = tenue as Tenue | null
      if (tErr || !t) { setIntrouvable(true); setChargement(false); return }
      // Sécurité : seul le propriétaire peut éditer
      if (t.styliste_id !== user.id) { setIntrouvable(true); setChargement(false); return }

      setForm({
        nom: t.nom || '',
        description: t.description || '',
        prix: String(t.prix ?? ''),
        categorie: t.categorie || '',
        disponible: t.disponible ?? true,
        stock: String(t.stock ?? '1'),
      })
      setTailles(t.tailles || [])
      setCouleurs(t.couleurs && t.couleurs.length > 0 ? t.couleurs : [''])
      setPhotosExistantes(t.photos || [])
      setChargement(false)
    }
    load()
  }, [tenueId, router])

  const toggleTaille = (t: string) => setTailles(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
  const addCouleur = () => setCouleurs([...couleurs, ''])
  const updateCouleur = (i: number, v: string) => setCouleurs(couleurs.map((c, idx) => idx === i ? v : c))
  const removeCouleur = (i: number) => setCouleurs(couleurs.filter((_, idx) => idx !== i))

  const totalPhotos = photosExistantes.length + nouvellesPhotos.length
  const handlePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 5 - totalPhotos)
    setNouvellesPhotos([...nouvellesPhotos, ...files])
  }
  const removePhotoExistante = (url: string) => setPhotosExistantes(photosExistantes.filter(p => p !== url))
  const removeNouvellePhoto = (i: number) => setNouvellesPhotos(nouvellesPhotos.filter((_, idx) => idx !== i))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/auth/login'); return }

    // Upload des nouvelles photos
    const uploadedUrls: string[] = []
    for (const file of nouvellesPhotos) {
      const ext = file.name.split('.').pop()
      const path = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
      const { error: uploadErr } = await supabase.storage.from('photos').upload(path, file)
      if (!uploadErr) {
        const { data: urlData } = supabase.storage.from('photos').getPublicUrl(path)
        uploadedUrls.push(urlData.publicUrl)
      }
    }

    const photosFinales = [...photosExistantes, ...uploadedUrls]
    const couleursFiltered = couleurs.filter(c => c.trim() !== '')

    const { error: updateErr } = await supabase.from('tenues').update({
      nom: form.nom,
      description: form.description || null,
      prix: Number(form.prix),
      categorie: form.categorie,
      disponible: form.disponible,
      stock: Number(form.stock),
      tailles,
      couleurs: couleursFiltered,
      photos: photosFinales,
      photo_principale: photosFinales[0] || null,
    }).eq('id', tenueId).eq('styliste_id', user.id)

    setLoading(false)
    if (updateErr) { setError(updateErr.message); return }
    setSuccess(true)
    setTimeout(() => router.push('/dashboard'), 1500)
  }

  const handleSupprimer = async () => {
    if (!confirm('Supprimer définitivement cette tenue ?')) return
    setLoading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/auth/login'); return }
    const { error: delErr } = await supabase.from('tenues').delete().eq('id', tenueId).eq('styliste_id', user.id)
    setLoading(false)
    if (delErr) { setError(delErr.message); return }
    router.push('/dashboard')
  }

  const inputStyle: React.CSSProperties = {
    background: '#FFFFFF', border: '1px solid #E7E3D8', borderRadius: '10px', color: '#14201A',
    padding: '0.875rem 1rem 0.875rem 2.8rem', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif', width: '100%', transition: 'border-color 0.2s',
  }
  const iconPos: React.CSSProperties = { position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9AA093', pointerEvents: 'none' }
  const labelStyle: React.CSSProperties = { fontFamily: 'Sora, sans-serif', fontSize: '0.7rem', fontWeight: 700, color: '#6E7268', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.6rem' }

  // États plein écran
  if (chargement) return (
    <div className="pb-bottomnav" style={{ background: '#F7F5EF', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem' }}>
        <div style={{ textAlign: 'center', color: '#9AA093' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid #E7E3D8', borderTopColor: '#008751', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }} />
          <p style={{ fontFamily: 'Inter, sans-serif' }}>Chargement de la tenue…</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      </div>
    </div>
  )

  if (introuvable) return (
    <div className="pb-bottomnav" style={{ background: '#F7F5EF', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '360px' }}>
          <X size={48} color="#E7E3D8" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '1.3rem', color: '#14201A', marginBottom: '0.5rem' }}>Tenue introuvable</h2>
          <p style={{ color: '#6E7268', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
            Cette tenue n'existe pas ou ne vous appartient pas.
          </p>
          <Link href="/dashboard">
            <button style={{ background: '#008751', color: '#fff', padding: '0.85rem 1.75rem', borderRadius: '10px', fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <ArrowLeft size={16} /> Retour au tableau de bord
            </button>
          </Link>
        </div>
      </div>
    </div>
  )

  if (success) return (
    <div style={{ background: '#F7F5EF', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <CheckCircle size={64} color="#008751" style={{ margin: '0 auto 1.5rem' }} />
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '1.5rem', color: '#14201A', marginBottom: '0.5rem' }}>Modifications enregistrées !</h2>
        <p style={{ color: '#6E7268', fontFamily: 'Inter, sans-serif' }}>Redirection vers le tableau de bord…</p>
      </div>
    </div>
  )

  return (
    <div className="pb-bottomnav" style={{ background: '#F7F5EF', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem 5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <Link href="/dashboard" style={{ color: '#9AA093', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ArrowLeft size={14} /> Retour
          </Link>
          <span style={{ color: '#C4C0B3' }}>·</span>
          <h1 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '1.5rem', color: '#14201A' }}>Modifier la tenue</h1>
        </div>

        {error && <div style={{ background: 'rgba(232,17,45,0.1)', border: '1px solid rgba(232,17,45,0.3)', color: '#E8112D', padding: '0.875rem 1rem', borderRadius: '10px', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', marginBottom: '1.5rem' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Photos */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E7E3D8', borderRadius: '16px', padding: '1.75rem' }}>
            <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
              <Camera size={14} /> Photos (max 5)
            </label>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              {/* Photos déjà enregistrées */}
              {photosExistantes.map((url, i) => (
                <div key={url} style={{ position: 'relative', width: '100px', height: '100px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #E7E3D8' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {i === 0 && (
                    <span style={{ position: 'absolute', bottom: '4px', left: '4px', background: 'rgba(0,135,81,0.92)', color: '#fff', fontFamily: 'Sora, sans-serif', fontSize: '0.55rem', fontWeight: 700, padding: '0.15rem 0.4rem', borderRadius: '50px' }}>Principale</span>
                  )}
                  <button type="button" onClick={() => removePhotoExistante(url)} style={{ position: 'absolute', top: '4px', right: '4px', background: '#E8112D', color: '#fff', border: 'none', borderRadius: '50%', width: '22px', height: '22px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <X size={12} />
                  </button>
                </div>
              ))}
              {/* Nouvelles photos (aperçu local) */}
              {nouvellesPhotos.map((f, i) => (
                <div key={i} style={{ position: 'relative', width: '100px', height: '100px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #008751' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={URL.createObjectURL(f)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button type="button" onClick={() => removeNouvellePhoto(i)} style={{ position: 'absolute', top: '4px', right: '4px', background: '#E8112D', color: '#fff', border: 'none', borderRadius: '50%', width: '22px', height: '22px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <X size={12} />
                  </button>
                </div>
              ))}
              {totalPhotos < 5 && (
                <label style={{ width: '100px', height: '100px', borderRadius: '10px', border: '2px dashed #E7E3D8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#9AA093', transition: 'all 0.2s', gap: '0.35rem' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#008751'; (e.currentTarget as HTMLElement).style.color = '#008751' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#E7E3D8'; (e.currentTarget as HTMLElement).style.color = '#9AA093' }}>
                  <Upload size={20} />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem' }}>Ajouter</span>
                  <input type="file" accept="image/*" multiple onChange={handlePhotos} style={{ display: 'none' }} />
                </label>
              )}
            </div>
            <p style={{ color: '#9AA093', fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Camera size={12} /> La première photo sert de visuel principal
            </p>
          </div>

          {/* Infos */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E7E3D8', borderRadius: '16px', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: '0.85rem', fontWeight: 700, color: '#008751', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Tag size={14} /> Informations
            </h3>
            <div>
              <label style={labelStyle}>Nom de la tenue *</label>
              <div style={{ position: 'relative' }}>
                <Tag size={14} style={iconPos} />
                <input required style={inputStyle} value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} placeholder="Ex: Boubou Royal Brodé"
                  onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#E7E3D8')} />
              </div>
            </div>
            <div>
              <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '0.4rem' }}><AlignLeft size={13} /> Description</label>
              <textarea rows={4} style={{ background: '#FFFFFF', border: '1px solid #E7E3D8', borderRadius: '10px', color: '#14201A', padding: '0.875rem 1rem', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif', width: '100%', resize: 'vertical', transition: 'border-color 0.2s' }} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Décrivez votre création..."
                onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#E7E3D8')} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Prix (XOF) *</label>
                <div style={{ position: 'relative' }}>
                  <DollarSign size={14} style={iconPos} />
                  <input required type="number" min={0} style={inputStyle} value={form.prix} onChange={e => setForm({ ...form, prix: e.target.value })} placeholder="45000"
                    onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#E7E3D8')} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Catégorie *</label>
                <div style={{ position: 'relative' }}>
                  <Layers size={14} style={iconPos} />
                  <select required style={inputStyle} value={form.categorie} onChange={e => setForm({ ...form, categorie: e.target.value })}
                    onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#E7E3D8')}>
                    <option value="">Choisir...</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.slug}>{c.icone ? `${c.icone} ` : ''}{c.nom}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Tailles */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E7E3D8', borderRadius: '16px', padding: '1.75rem' }}>
            <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }}><Layers size={13} /> Tailles disponibles</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {TAILLES_OPTIONS.map(t => (
                <button type="button" key={t} onClick={() => toggleTaille(t)} style={{ padding: '0.5rem 1rem', border: `2px solid ${tailles.includes(t) ? '#008751' : '#E7E3D8'}`, borderRadius: '8px', background: tailles.includes(t) ? 'rgba(0,135,81,0.15)' : 'transparent', color: tailles.includes(t) ? '#008751' : '#6E7268', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  {tailles.includes(t) && <CheckCircle size={12} />} {t}
                </button>
              ))}
            </div>
          </div>

          {/* Couleurs */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E7E3D8', borderRadius: '16px', padding: '1.75rem' }}>
            <label style={labelStyle}>Couleurs disponibles</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '0.75rem' }}>
              {couleurs.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem' }}>
                  <input value={c} onChange={e => updateCouleur(i, e.target.value)} placeholder="Ex: Bleu royal" style={{ ...inputStyle, paddingLeft: '1rem' }}
                    onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#E7E3D8')} />
                  {couleurs.length > 1 && (
                    <button type="button" onClick={() => removeCouleur(i)} style={{ background: 'rgba(232,17,45,0.1)', border: '1px solid rgba(232,17,45,0.2)', color: '#E8112D', padding: '0.5rem 0.75rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      <X size={15} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {couleurs.length < 6 && (
              <button type="button" onClick={addCouleur} style={{ background: 'transparent', border: '1px dashed #E7E3D8', color: '#9AA093', padding: '0.6rem 1.25rem', borderRadius: '8px', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#008751'; (e.currentTarget as HTMLElement).style.color = '#008751' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#E7E3D8'; (e.currentTarget as HTMLElement).style.color = '#9AA093' }}>
                <Plus size={14} /> Ajouter une couleur
              </button>
            )}
          </div>

          {/* Stock & dispo */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E7E3D8', borderRadius: '16px', padding: '1.75rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div>
              <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Package size={13} /> Stock</label>
              <div style={{ position: 'relative' }}>
                <Package size={14} style={iconPos} />
                <input type="number" min={0} style={{ ...inputStyle, width: '120px' }} value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })}
                  onFocus={e => (e.target.style.borderColor = '#008751')} onBlur={e => (e.target.style.borderColor = '#E7E3D8')} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <label style={{ ...labelStyle, margin: 0 }}>Disponible à la vente</label>
              <div onClick={() => setForm({ ...form, disponible: !form.disponible })} style={{ cursor: 'pointer', color: form.disponible ? '#008751' : '#9AA093', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}>
                {form.disponible ? <ToggleRight size={36} /> : <ToggleLeft size={36} />}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button type="submit" disabled={loading} style={{ flex: 1, minWidth: '200px', background: loading ? '#E7E3D8' : 'linear-gradient(135deg, #008751, #00a862)', color: loading ? '#9AA093' : '#fff', padding: '1.1rem', borderRadius: '12px', fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.9rem', cursor: loading ? 'not-allowed' : 'pointer', border: 'none', transition: 'all 0.3s', boxShadow: loading ? 'none' : '0 8px 30px rgba(0,135,81,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              {loading ? 'Enregistrement…' : <><CheckCircle size={18} /> Enregistrer les modifications</>}
            </button>
            <button type="button" onClick={handleSupprimer} disabled={loading} style={{ background: '#FDE7E9', border: '1px solid rgba(232,17,45,0.3)', color: '#E8112D', padding: '1.1rem 1.5rem', borderRadius: '12px', fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.85rem', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <Trash2 size={16} /> Supprimer
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
