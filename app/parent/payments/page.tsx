'use client'

import React, { useState } from 'react'
import { mockPayments, mockChildren } from '@/lib/mockData'
import { formatXOF } from '@/lib/utils'
import PaymentModal from '@/components/PaymentModal'

// MOCK DATA — replace with API

export default function PaymentsPage() {
  const [payModal, setPayModal] = useState<{
    childId: number
    childName: string
    trancheN: number
    amount: number
    label: string
  } | null>(null)

  const successPayments = mockPayments.filter((p) => p.status === 'success')
  const totalPaid = successPayments.reduce((s, p) => s + p.amount, 0)

  const pendingTranches: {
    childId: number
    childName: string
    trancheN: number
    amount: number
    label: string
  }[] = []
  mockChildren.forEach((child) => {
    child.tranches.forEach((t) => {
      if (!t.paid) {
        pendingTranches.push({
          childId: child.id,
          childName: child.name,
          trancheN: t.n,
          amount: t.amount,
          label: `Tranche ${t.n}/${child.tranches.length}`,
        })
      }
    })
  })

  const statusBadge = (status: string) => {
    if (status === 'success')
      return (
        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-semibold">
          <i className="bx bx-check-circle" />
          Payé
        </span>
      )
    if (status === 'pending')
      return (
        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-xs px-2.5 py-1 rounded-full font-semibold">
          <i className="bx bx-time" />
          En attente
        </span>
      )
    return (
      <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs px-2.5 py-1 rounded-full font-semibold">
        <i className="bx bx-x-circle" />
        Échoué
      </span>
    )
  }

  return (
    <>
      <div className="animate-fade-in">
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl text-gray-800">Paiements</h1>
          <p className="text-gray-400 text-sm mt-1">Historique et paiements en attente</p>
        </div>

        {/* Total card */}
        <div className="bg-midnight rounded-2xl p-8 mb-8 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm mb-1">Total encaissé</p>
            <p className="font-display font-bold text-white text-4xl">
              {new Intl.NumberFormat('fr-FR').format(totalPaid)} XOF
            </p>
            <p className="text-slate-500 text-xs mt-1">Année scolaire 2025–2026</p>
          </div>
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
            <i className="bx bx-credit-card text-3xl text-accent-light" />
          </div>
        </div>

        {/* Pending payments */}
        {pendingTranches.length > 0 && (
          <div className="mb-8">
            <h2 className="font-display font-bold text-xl text-gray-800 mb-4">
              Paiements en attente
              <span className="ml-2 text-sm bg-warning/20 text-warning px-2 py-0.5 rounded-full font-semibold">
                {pendingTranches.length}
              </span>
            </h2>
            <div className="space-y-3">
              {pendingTranches.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-5 py-4"
                >
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">{p.childName}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{p.label}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="font-bold text-gray-800">{formatXOF(p.amount)}</div>
                    <button
                      onClick={() => setPayModal(p)}
                      className="bg-accent text-white text-xs px-4 py-2 rounded-xl font-semibold hover:bg-accent-light transition-colors active:scale-95 duration-100"
                    >
                      Payer maintenant
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* History */}
        <div>
          <h2 className="font-display font-bold text-xl text-gray-800 mb-4">Historique</h2>
          <div className="border border-gray-200 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    {['Date', 'Enfant', 'Tranche', 'Montant', 'Méthode', 'Statut'].map((h) => (
                      <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {successPayments.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 text-gray-600">{p.date}</td>
                      <td className="px-5 py-4 font-medium text-gray-800">{p.childName}</td>
                      <td className="px-5 py-4 text-gray-600">{p.tranche}</td>
                      <td className="px-5 py-4 font-semibold text-gray-800">{formatXOF(p.amount)}</td>
                      <td className="px-5 py-4 text-gray-600">{p.method}</td>
                      <td className="px-5 py-4">{statusBadge(p.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {payModal && (
        <PaymentModal
          isOpen={true}
          onClose={() => setPayModal(null)}
          childId={payModal.childId}
          childName={payModal.childName}
          trancheLabel={payModal.label}
          trancheN={payModal.trancheN}
          amount={payModal.amount}
        />
      )}
    </>
  )
}
