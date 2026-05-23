import React, { useState } from 'react'
import { Child } from '@/lib/mockData'
import { formatXOF, getInitials, getAvatarColor } from '@/lib/utils'
import StatusBadge from './StatusBadge'
import PaymentModal from './PaymentModal'

interface ChildCardProps {
  child: Child
  showDetails?: boolean
}

export default function ChildCard({ child, showDetails = false }: ChildCardProps) {
  const [payModal, setPayModal] = useState<{ trancheN: number; amount: number; label: string } | null>(null)
  const pct = Math.round((child.paid / child.totalFees) * 100)
  const initials = getInitials(child.name)
  const avatarColor = getAvatarColor(child.name)

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-display font-bold text-lg flex-shrink-0" style={{ backgroundColor: avatarColor }}>
              {initials}
            </div>
            <div>
              <div className="font-display font-bold text-gray-800">{child.name}</div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs bg-[#EFF6FF] text-[#2563EB] px-2 py-0.5 rounded-full font-medium">{child.classe}</span>
                <span className="text-xs text-gray-400">{child.numero}</span>
              </div>
              {showDetails && (
                <div className="text-xs text-gray-400 mt-1">
                  Inscrit le {new Date(child.dateInscription).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              )}
            </div>
          </div>
          <StatusBadge status={child.accessStatus} size="sm" />
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-gray-500">Paiements</span>
            <span className="font-medium text-gray-700">{formatXOF(child.paid)} / {formatXOF(child.totalFees)}</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#2563EB] rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
          </div>
          <div className="text-xs text-gray-400 mt-1">{pct}% payé</div>
        </div>

        <div className="flex gap-2 flex-wrap mb-4">
          {child.tranches.map((t) => (
            <div key={t.n} className="flex items-center gap-1">
              {t.paid ? (
                <span className="inline-flex items-center gap-1 bg-[#2563EB] text-white text-xs px-3 py-1.5 rounded-full font-medium">
                  <i className="bx bx-check" />T{t.n} · {formatXOF(t.amount)}
                </span>
              ) : (
                <button
                  onClick={() => setPayModal({ trancheN: t.n, amount: t.amount, label: `Tranche ${t.n}/${child.tranches.length}` })}
                  className="inline-flex items-center gap-1 border border-gray-300 text-gray-600 text-xs px-3 py-1.5 rounded-full font-medium hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
                >
                  T{t.n} · {formatXOF(t.amount)}
                  <span className="ml-1 bg-[#2563EB] text-white text-[10px] px-1.5 py-0.5 rounded-full">Payer</span>
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <a href="/parent/children" className="text-sm text-[#2563EB] font-medium hover:underline">Voir détails →</a>
        </div>
      </div>

      {payModal && (
        <PaymentModal
          isOpen={true}
          onClose={() => setPayModal(null)}
          childId={child.id}
          childName={child.name}
          trancheLabel={payModal.label}
          trancheN={payModal.trancheN}
          amount={payModal.amount}
        />
      )}
    </>
  )
}
