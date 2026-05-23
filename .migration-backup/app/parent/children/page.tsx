'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { mockChildren, Child } from '@/lib/mockData'
import { formatXOF, getInitials, getAvatarColor } from '@/lib/utils'
import StatusBadge from '@/components/StatusBadge'
import PaymentModal from '@/components/PaymentModal'

// TODO: GET /api/parent/children

export default function ChildrenPage() {
  const [children, setChildren] = useState<Child[]>(mockChildren)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [payModal, setPayModal] = useState<{
    childId: number
    childName: string
    trancheN: number
    amount: number
    label: string
  } | null>(null)

  const handleDelete = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet élève ?')) {
      setChildren(children.filter((c) => c.id !== id))
    }
  }

  return (
    <>
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl text-gray-800">Mes enfants</h1>
            <p className="text-gray-400 text-sm mt-1">{children.length} élève(s) inscrit(s)</p>
          </div>
          <Link
            href="/parent/children/add"
            className="inline-flex items-center gap-1.5 bg-accent text-white text-sm px-4 py-2.5 rounded-xl font-semibold hover:bg-accent-light transition-colors active:scale-95 duration-100"
          >
            <i className="bx bx-plus" />
            Ajouter
          </Link>
        </div>

        <div className="space-y-5">
          {children.map((child) => {
            const pct = Math.round((child.paid / child.totalFees) * 100)
            return (
              <div
                key={child.id}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-white font-display font-bold text-xl flex-shrink-0"
                      style={{ backgroundColor: getAvatarColor(child.name) }}
                    >
                      {getInitials(child.name)}
                    </div>
                    <div>
                      <div className="font-display font-bold text-gray-800 text-lg">{child.name}</div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-xs bg-accent-pale text-accent px-2.5 py-1 rounded-full font-medium">
                          {child.classe}
                        </span>
                        <span className="text-xs font-mono text-gray-400">{child.numero}</span>
                        <span className="text-xs text-gray-400">
                          Inscrit le{' '}
                          {new Date(child.dateInscription).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={child.accessStatus} />
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100">
                      <i className="bx bx-edit text-xl" />
                    </button>
                    <button
                      onClick={() => handleDelete(child.id)}
                      className="p-2 text-gray-400 hover:text-danger transition-colors rounded-lg hover:bg-red-50"
                    >
                      <i className="bx bx-trash text-xl" />
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Paiements</span>
                    <span className="font-medium text-gray-700">
                      {formatXOF(child.paid)} / {formatXOF(child.totalFees)}
                    </span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{pct}% payé</div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {child.tranches.map((t) =>
                    t.paid ? (
                      <span
                        key={t.n}
                        className="inline-flex items-center gap-1 bg-accent text-white text-xs px-3 py-1.5 rounded-full font-medium"
                      >
                        <i className="bx bx-check" />
                        T{t.n} · {formatXOF(t.amount)}
                      </span>
                    ) : (
                      <button
                        key={t.n}
                        onClick={() =>
                          setPayModal({
                            childId: child.id,
                            childName: child.name,
                            trancheN: t.n,
                            amount: t.amount,
                            label: `Tranche ${t.n}/${child.tranches.length}`,
                          })
                        }
                        className="inline-flex items-center gap-1 border border-gray-300 text-gray-600 text-xs px-3 py-1.5 rounded-full font-medium hover:border-accent hover:text-accent transition-colors"
                      >
                        T{t.n} · {formatXOF(t.amount)}
                        <span className="ml-1 bg-accent text-white text-[10px] px-1.5 py-0.5 rounded-full">
                          Payer
                        </span>
                      </button>
                    ),
                  )}
                </div>
              </div>
            )
          })}
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
