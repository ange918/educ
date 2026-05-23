'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import QRPlaceholder from '@/components/QRPlaceholder'
import { addChild } from '@/lib/api'

const classes = ['6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Terminale']
const suffixes = ['A', 'B', 'C', 'S', 'D']

export default function AddChildPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dateNaissance: '',
    sexe: '',
    classe: '',
    suffix: 'A',
    numero: `N°${Math.floor(1000 + Math.random() * 9000)}`,
    annee: '2025-2026',
    totalFees: '',
    nbTranches: '3',
    tranches: [
      { amount: '', dueDate: '' },
      { amount: '', dueDate: '' },
      { amount: '', dueDate: '' },
    ],
  })
  const [photo, setPhoto] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [loading, setLoading] = useState(false)
  const [successModal, setSuccessModal] = useState(false)
  const [newChild, setNewChild] = useState<{ name: string; classe: string } | null>(null)

  const handlePhotoChange = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => setPhoto(reader.result as string)
    reader.readAsDataURL(file)
  }

  const updateTranche = (i: number, field: 'amount' | 'dueDate', val: string) => {
    const updated = [...form.tranches]
    updated[i] = { ...updated[i], [field]: val }
    setForm({ ...form, tranches: updated })
  }

  const handleNbTranches = (n: string) => {
    const nb = parseInt(n)
    const tranches = Array.from({ length: nb }, (_, i) => form.tranches[i] || { amount: '', dueDate: '' })
    setForm({ ...form, nbTranches: n, tranches })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const result = await addChild({
      firstName: form.firstName,
      lastName: form.lastName,
      dateNaissance: form.dateNaissance,
      sexe: form.sexe,
      classe: `${form.classe} ${form.suffix}`,
      numero: form.numero,
      annee: form.annee,
      totalFees: parseInt(form.totalFees) || 0,
      tranches: form.tranches.map((t) => ({
        amount: parseInt(t.amount) || 0,
        dueDate: t.dueDate,
      })),
    })
    setLoading(false)
    setNewChild({
      name: `${form.firstName} ${form.lastName}`,
      classe: `${form.classe} ${form.suffix}`,
    })
    setSuccessModal(true)
  }

  return (
    <>
      <div className="animate-fade-in max-w-2xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-3"
          >
            <i className="bx bx-arrow-back" />
            Retour
          </button>
          <h1 className="font-display font-bold text-3xl text-gray-800">Inscrire un élève</h1>
          <p className="text-gray-400 text-sm mt-1">Remplissez le formulaire pour inscrire un nouvel élève</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Identité */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="font-display font-bold text-lg text-gray-800 mb-5 flex items-center gap-2">
              <i className="bx bx-user text-accent" />
              Identité de l&apos;élève
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Prénom</label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  placeholder="Kwame"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom</label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  placeholder="Osei"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Date de naissance</label>
                <input
                  type="date"
                  value={form.dateNaissance}
                  onChange={(e) => setForm({ ...form, dateNaissance: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Sexe</label>
                <select
                  value={form.sexe}
                  onChange={(e) => setForm({ ...form, sexe: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent bg-white"
                >
                  <option value="">Sélectionner</option>
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Photo</label>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault()
                  setDragOver(false)
                  const file = e.dataTransfer.files[0]
                  if (file) handlePhotoChange(file)
                }}
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                  dragOver ? 'border-accent bg-accent-pale' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {photo ? (
                  <div className="flex items-center justify-center gap-3">
                    <img src={photo} alt="Photo" className="w-16 h-16 rounded-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setPhoto(null)}
                      className="text-sm text-danger hover:underline"
                    >
                      Supprimer
                    </button>
                  </div>
                ) : (
                  <div>
                    <i className="bx bx-cloud-upload text-3xl text-gray-400 mb-2 block" />
                    <p className="text-sm text-gray-500">
                      Glissez une photo ici ou{' '}
                      <label className="text-accent font-medium cursor-pointer hover:underline">
                        parcourez
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => e.target.files?.[0] && handlePhotoChange(e.target.files[0])}
                        />
                      </label>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Scolaire */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="font-display font-bold text-lg text-gray-800 mb-5 flex items-center gap-2">
              <i className="bx bx-graduation text-accent" />
              Informations scolaires
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Classe</label>
                <select
                  value={form.classe}
                  onChange={(e) => setForm({ ...form, classe: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent bg-white"
                >
                  <option value="">Sélectionner</option>
                  {classes.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Section</label>
                <select
                  value={form.suffix}
                  onChange={(e) => setForm({ ...form, suffix: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent bg-white"
                >
                  {suffixes.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">N° Matricule</label>
                <input
                  type="text"
                  value={form.numero}
                  onChange={(e) => setForm({ ...form, numero: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Année scolaire</label>
                <input
                  type="text"
                  value={form.annee}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-100 rounded-xl text-sm bg-gray-50 text-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Frais */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="font-display font-bold text-lg text-gray-800 mb-5 flex items-center gap-2">
              <i className="bx bx-credit-card text-accent" />
              Frais de scolarité
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Montant total</label>
                <div className="relative">
                  <input
                    type="number"
                    value={form.totalFees}
                    onChange={(e) => setForm({ ...form, totalFees: e.target.value })}
                    placeholder="225000"
                    className="w-full pl-4 pr-14 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">
                    XOF
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre de tranches</label>
                <select
                  value={form.nbTranches}
                  onChange={(e) => handleNbTranches(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent bg-white"
                >
                  <option value="1">1 tranche</option>
                  <option value="2">2 tranches</option>
                  <option value="3">3 tranches</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {form.tranches.map((t, i) => (
                <div key={i} className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Tranche {i + 1} — Montant (XOF)
                    </label>
                    <input
                      type="number"
                      value={t.amount}
                      onChange={(e) => updateTranche(i, 'amount', e.target.value)}
                      placeholder="75000"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Tranche {i + 1} — Date d&apos;échéance
                    </label>
                    <input
                      type="date"
                      value={t.dueDate}
                      onChange={(e) => updateTranche(i, 'dueDate', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-accent-light transition-colors active:scale-95 duration-100 disabled:opacity-60"
          >
            {loading ? (
              <>
                <i className="bx bx-loader-alt animate-spin" />
                Inscription en cours...
              </>
            ) : (
              <>
                <i className="bx bx-qr" />
                Inscrire l&apos;élève & Générer la carte QR
              </>
            )}
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {successModal && newChild && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-midnight/60 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8 animate-scale-in text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="bx bx-check-circle text-3xl text-emerald-500" />
            </div>
            <h2 className="font-display font-bold text-2xl text-gray-800 mb-1">Inscription réussie !</h2>
            <p className="text-gray-500 text-sm mb-6">
              {newChild.name} — {newChild.classe}
            </p>
            <div className="flex justify-center mb-6">
              <QRPlaceholder size={160} studentName={newChild.name} />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setSuccessModal(false)}
                className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl text-sm font-semibold hover:bg-gray-50"
              >
                Fermer
              </button>
              <button className="flex-1 bg-accent text-white py-3 rounded-xl text-sm font-semibold hover:bg-accent-light transition-colors flex items-center justify-center gap-1.5">
                <i className="bx bx-download" />
                Télécharger la carte
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
