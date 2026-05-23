'use client'

import React, { useState } from 'react'
import { formatXOF } from '@/lib/utils'
import { payTranche } from '@/lib/api'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  childId: number
  childName: string
  trancheLabel: string
  trancheN: number
  amount: number
  onSuccess?: () => void
}

export default function PaymentModal({
  isOpen,
  onClose,
  childId,
  childName,
  trancheLabel,
  trancheN,
  amount,
  onSuccess,
}: PaymentModalProps) {
  const [method, setMethod] = useState<'mobile' | 'card'>('mobile')
  const [phone, setPhone] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  if (!isOpen) return null

  const handleConfirm = async () => {
    setLoading(true)
    // TODO: POST /api/payments
    await payTranche(childId, trancheN, method)
    setLoading(false)
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      onSuccess?.()
      onClose()
    }, 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-midnight/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 animate-scale-in">
        {success ? (
          <div className="flex flex-col items-center py-8 gap-4">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
              <svg viewBox="0 0 50 50" className="w-12 h-12">
                <circle
                  cx="25"
                  cy="25"
                  r="22"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3"
                />
                <polyline
                  points="14,25 22,33 36,17"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: 40,
                    strokeDashoffset: 0,
                    animation: 'none',
                  }}
                />
              </svg>
            </div>
            <div className="text-center">
              <div className="text-xl font-display font-bold text-gray-800">
                Paiement confirmé !
              </div>
              <div className="text-gray-500 text-sm mt-1">
                {formatXOF(amount)} payé avec succès
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-bold text-xl text-gray-800">
                Payer une tranche
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <i className="bx bx-x text-2xl" />
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-5">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-500">Élève</span>
                <span className="font-semibold text-gray-800">{childName}</span>
              </div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-500">Tranche</span>
                <span className="font-semibold text-gray-800">{trancheLabel}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Montant</span>
                <span className="font-bold text-accent text-lg">{formatXOF(amount)}</span>
              </div>
            </div>

            <div className="flex rounded-xl overflow-hidden border border-gray-200 mb-5">
              <button
                onClick={() => setMethod('mobile')}
                className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                  method === 'mobile'
                    ? 'bg-accent text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <i className="bx bx-mobile-alt mr-1" />
                Mobile Money
              </button>
              <button
                onClick={() => setMethod('card')}
                className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                  method === 'card'
                    ? 'bg-accent text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <i className="bx bx-credit-card mr-1" />
                Carte bancaire
              </button>
            </div>

            {method === 'mobile' ? (
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Numéro de téléphone
                </label>
                <div className="relative">
                  <i className="bx bx-phone absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+229 XX XX XX XX"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent"
                  />
                </div>
              </div>
            ) : (
              <div className="mb-5 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Numéro de carte
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Expiration
                    </label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM/AA"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="123"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleConfirm}
              disabled={loading}
              className="w-full bg-accent text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-accent-light transition-colors active:scale-95 duration-100 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <i className="bx bx-loader-alt animate-spin" />
                  Traitement en cours...
                </>
              ) : (
                <>
                  <i className="bx bx-check-circle" />
                  Confirmer le paiement — {formatXOF(amount)}
                </>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
