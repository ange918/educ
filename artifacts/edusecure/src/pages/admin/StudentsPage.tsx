import React, { useState, useMemo } from 'react'
import { mockStudents, Student } from '@/lib/mockData'
import { formatXOF, getInitials, getAvatarColor } from '@/lib/utils'
import StatusBadge from '@/components/StatusBadge'
import QRPlaceholder from '@/components/QRPlaceholder'

const TABS = ['Toutes', '6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Terminale']

export default function StudentsPage() {
  const [activeTab, setActiveTab] = useState('Toutes')
  const [search, setSearch] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  const filtered = useMemo(() => {
    let list = mockStudents
    if (activeTab !== 'Toutes') list = list.filter((s) => s.classe.startsWith(activeTab))
    if (search) {
      const q = search.toLowerCase()
      list = list.filter((s) => s.firstName.toLowerCase().includes(q) || s.lastName.toLowerCase().includes(q) || s.numero.toLowerCase().includes(q) || s.classe.toLowerCase().includes(q))
    }
    return list
  }, [activeTab, search])

  const groupedByClass = useMemo(() => {
    if (activeTab !== 'Toutes') return null
    const groups: Record<string, Student[]> = {}
    filtered.forEach((s) => {
      if (!groups[s.classe]) groups[s.classe] = []
      groups[s.classe].push(s)
    })
    return groups
  }, [filtered, activeTab])

  const StudentTable = ({ students }: { students: Student[] }) => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {['#', 'Nom complet', 'Classe', 'N° Matricule', 'Montant payé', 'Reste à payer', 'Statut', 'Actions'].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {students.map((s, i) => (
            <tr key={s.id} className="hover:bg-[#EFF6FF] transition-colors cursor-pointer" onClick={() => setSelectedStudent(s)}>
              <td className="px-4 py-3.5 text-gray-400 text-xs">{i + 1}</td>
              <td className="px-4 py-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: getAvatarColor(`${s.firstName} ${s.lastName}`) }}>
                    {getInitials(`${s.firstName} ${s.lastName}`)}
                  </div>
                  <div className="font-semibold text-gray-800">{s.lastName} {s.firstName}</div>
                </div>
              </td>
              <td className="px-4 py-3.5"><span className="bg-[#EFF6FF] text-[#2563EB] text-xs px-2 py-0.5 rounded-full font-medium">{s.classe}</span></td>
              <td className="px-4 py-3.5 font-mono text-xs text-gray-500">{s.numero}</td>
              <td className="px-4 py-3.5"><span className={`font-semibold ${s.remaining === 0 ? 'text-emerald-600' : 'text-amber-600'}`}>{formatXOF(s.paid)}</span></td>
              <td className="px-4 py-3.5">{s.remaining > 0 ? <span className="text-red-500 font-semibold">{formatXOF(s.remaining)}</span> : <span className="text-gray-400">—</span>}</td>
              <td className="px-4 py-3.5"><StatusBadge status={s.accessStatus} size="sm" /></td>
              <td className="px-4 py-3.5">
                <div className="flex items-center gap-1">
                  <button onClick={(e) => { e.stopPropagation(); setSelectedStudent(s) }} className="p-1.5 text-gray-400 hover:text-[#2563EB] hover:bg-[#EFF6FF] rounded-lg transition-colors"><i className="bx bx-eye text-base" /></button>
                  <button onClick={(e) => e.stopPropagation()} className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"><i className="bx bx-edit text-base" /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <>
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display font-bold text-3xl text-gray-800">Élèves</h1>
            <p className="text-gray-400 text-sm mt-1">{mockStudents.length} élèves inscrits{activeTab !== 'Toutes' ? ` · ${filtered.length} dans cette classe` : ''}</p>
          </div>
          <button className="inline-flex items-center gap-1.5 border border-gray-200 text-gray-600 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors active:scale-95 duration-100">
            <i className="bx bx-export" />Exporter
          </button>
        </div>

        <div className="relative mb-5">
          <i className="bx bx-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher un élève, matricule, classe..." className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2563EB]" />
        </div>

        <div className="flex gap-1 overflow-x-auto scrollbar-hide mb-6 pb-1">
          {TABS.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab ? 'bg-[#2563EB] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>{tab}</button>
          ))}
        </div>

        <div className="border border-gray-200 rounded-2xl overflow-hidden">
          {groupedByClass ? (
            Object.entries(groupedByClass).map(([classe, students]) => (
              <div key={classe}>
                <div className="px-5 py-3.5 bg-gray-50 border-b border-gray-200 flex items-center gap-3">
                  <h3 className="font-display font-bold text-gray-700">{classe}</h3>
                  <span className="bg-[#EFF6FF] text-[#2563EB] text-xs px-2.5 py-0.5 rounded-full font-semibold">{students.length} élèves</span>
                </div>
                <StudentTable students={students} />
              </div>
            ))
          ) : (
            <StudentTable students={filtered} />
          )}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400"><i className="bx bx-search text-4xl mb-3 block" /><p>Aucun élève trouvé</p></div>
        )}
      </div>

      {selectedStudent && (
        <>
          <div className="fixed inset-0 z-40 bg-[#0A1628]/50 backdrop-blur-sm" onClick={() => setSelectedStudent(null)} />
          <div className="fixed right-0 top-0 bottom-0 z-50 w-full md:w-[420px] bg-white shadow-2xl animate-slide-in-right overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-xl text-gray-800">Fiche élève</h2>
                <button onClick={() => setSelectedStudent(null)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"><i className="bx bx-x text-2xl" /></button>
              </div>

              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-white font-display font-bold text-2xl mb-3" style={{ backgroundColor: getAvatarColor(`${selectedStudent.firstName} ${selectedStudent.lastName}`) }}>
                  {getInitials(`${selectedStudent.firstName} ${selectedStudent.lastName}`)}
                </div>
                <h3 className="font-display font-bold text-2xl text-gray-800">{selectedStudent.lastName} {selectedStudent.firstName}</h3>
                <div className="flex items-center gap-2 mt-2 flex-wrap justify-center">
                  <span className="bg-[#EFF6FF] text-[#2563EB] text-xs px-2.5 py-1 rounded-full font-medium">{selectedStudent.classe}</span>
                  <span className="font-mono text-xs text-gray-400">{selectedStudent.numero}</span>
                </div>
                <div className="mt-2"><StatusBadge status={selectedStudent.accessStatus} /></div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5 mb-5">
                <h4 className="font-semibold text-gray-700 text-sm mb-3">Paiements</h4>
                <div className="space-y-2 mb-3">
                  {[{ l: 'Total', v: formatXOF(selectedStudent.totalFees), c: 'text-gray-800' }, { l: 'Payé', v: formatXOF(selectedStudent.paid), c: 'text-emerald-600' }, { l: 'Reste', v: selectedStudent.remaining > 0 ? formatXOF(selectedStudent.remaining) : '—', c: selectedStudent.remaining > 0 ? 'text-red-500' : 'text-gray-400' }].map((r) => (
                    <div key={r.l} className="flex justify-between text-sm">
                      <span className="text-gray-500">{r.l}</span>
                      <span className={`font-semibold ${r.c}`}>{r.v}</span>
                    </div>
                  ))}
                </div>
                <div className="h-2 bg-white rounded-full overflow-hidden border border-gray-200">
                  <div className="h-full bg-[#2563EB] rounded-full transition-all duration-700" style={{ width: `${Math.round((selectedStudent.paid / selectedStudent.totalFees) * 100)}%` }} />
                </div>
                <div className="text-xs text-gray-400 mt-1">{Math.round((selectedStudent.paid / selectedStudent.totalFees) * 100)}% payé</div>
                {selectedStudent.lastPaymentDate && (
                  <div className="text-xs text-gray-400 mt-2">
                    Dernier paiement le {new Date(selectedStudent.lastPaymentDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center mb-6">
                <p className="text-sm font-medium text-gray-600 mb-3">Code QR d'accès</p>
                <QRPlaceholder size={160} studentName={`${selectedStudent.firstName} ${selectedStudent.lastName}`} />
              </div>

              <div className="space-y-3">
                <button className="w-full border border-[#2563EB] text-[#2563EB] py-3 rounded-xl text-sm font-semibold hover:bg-[#EFF6FF] transition-colors flex items-center justify-center gap-2">
                  <i className="bx bx-edit" />Modifier le statut
                </button>
                <button className="w-full bg-[#2563EB] text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#3B82F6] transition-colors flex items-center justify-center gap-2">
                  <i className="bx bx-qr" />Régénérer QR
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
