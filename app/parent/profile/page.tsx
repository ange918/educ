'use client'

import React, { useState } from 'react'
import { mockParent } from '@/lib/mockData'
import { getInitials, getAvatarColor } from '@/lib/utils'

export default function ProfilePage() {
  const [form, setForm] = useState({
    name: mockParent.name,
    email: mockParent.email,
    phone: mockParent.phone,
    address: mockParent.address,
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // TODO: PUT /api/parent/profile
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="animate-fade-in max-w-xl">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-gray-800">Mon profil</h1>
        <p className="text-gray-400 text-sm mt-1">Gérez vos informations personnelles</p>
      </div>

      <div className="flex items-center gap-5 mb-8 p-6 bg-gray-50 rounded-2xl">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-white font-display font-bold text-2xl"
          style={{ backgroundColor: getAvatarColor(form.name) }}
        >
          {getInitials(form.name)}
        </div>
        <div>
          <div className="font-display font-bold text-xl text-gray-800">{form.name}</div>
          <div className="text-gray-500 text-sm">{form.email}</div>
          <span className="text-xs bg-accent-pale text-accent px-2.5 py-1 rounded-full font-medium mt-1.5 inline-block">
            Parent
          </span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
        <h2 className="font-display font-bold text-lg text-gray-800 mb-4">
          Informations personnelles
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom complet</label>
          <div className="relative">
            <i className="bx bx-user absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
          <div className="relative">
            <i className="bx bx-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Téléphone</label>
          <div className="relative">
            <i className="bx bx-phone absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Adresse</label>
          <div className="relative">
            <i className="bx bx-map absolute left-3 top-3.5 text-gray-400" />
            <textarea
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              rows={2}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent resize-none"
            />
          </div>
        </div>
        <button
          onClick={handleSave}
          className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-colors active:scale-95 duration-100 flex items-center justify-center gap-2 ${
            saved
              ? 'bg-emerald-500 text-white'
              : 'bg-accent text-white hover:bg-accent-light'
          }`}
        >
          {saved ? (
            <>
              <i className="bx bx-check" />
              Enregistré !
            </>
          ) : (
            'Enregistrer les modifications'
          )}
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mt-4">
        <h2 className="font-display font-bold text-lg text-gray-800 mb-4">Sécurité</h2>
        <button className="w-full border border-gray-200 text-gray-600 py-3 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
          <i className="bx bx-lock-alt" />
          Changer le mot de passe
        </button>
      </div>
    </div>
  )
}
