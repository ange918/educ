import React, { useState, useMemo } from 'react'
import { Link } from 'wouter'
import { mockStudents, mockStats, mockAccessLog } from '@/lib/mockData'
import { formatXOF, getInitials, getAvatarColor } from '@/lib/utils'
import StatusBadge from '@/components/StatusBadge'

const CLASSES = ['Toutes', '6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Terminale']

export default function AdminDashboard() {
  const stats = mockStats
  const [activeClass, setActiveClass] = useState('Toutes')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('Tous')

  const totalFees = mockStudents.reduce((s, st) => s + st.totalFees, 0)
  const totalPaid = mockStudents.reduce((s, st) => s + st.paid, 0)
  const totalRemaining = mockStudents.reduce((s, st) => s + st.remaining, 0)
  const fullyPaid = mockStudents.filter((st) => st.remaining === 0).length
  const partiallyPaid = mockStudents.filter((st) => st.paid > 0 && st.remaining > 0).length
  const notPaid = mockStudents.filter((st) => st.paid === 0).length

  const filtered = useMemo(() => {
    let list = mockStudents
    if (activeClass !== 'Toutes') list = list.filter((s) => s.classe.startsWith(activeClass))
    if (statusFilter === 'Actifs') list = list.filter((s) => s.accessStatus === 'active')
    else if (statusFilter === 'Suspendus') list = list.filter((s) => s.accessStatus === 'suspended')
    else if (statusFilter === 'Refusés') list = list.filter((s) => s.accessStatus === 'refused')
    else if (statusFilter === 'Soldés') list = list.filter((s) => s.remaining === 0)
    else if (statusFilter === 'Impayés') list = list.filter((s) => s.remaining > 0)
    if (search) {
      const q = search.toLowerCase()
      list = list.filter((s) => s.firstName.toLowerCase().includes(q) || s.lastName.toLowerCase().includes(q) || s.numero.toLowerCase().includes(q) || s.classe.toLowerCase().includes(q))
    }
    return list
  }, [activeClass, search, statusFilter])

  const collectedPct = Math.round((totalPaid / totalFees) * 100)

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-3xl text-gray-800">Tableau de bord</h1>
          <p className="text-gray-400 text-sm mt-1">Année scolaire 2025–2026 · Vue financière globale</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-1.5 border border-gray-200 text-gray-600 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors active:scale-95 duration-100">
            <i className="bx bx-file" />Rapport PDF
          </button>
          <Link href="/admin/students" className="inline-flex items-center gap-1.5 bg-[#2563EB] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#3B82F6] transition-colors active:scale-95 duration-100">
            <i className="bx bx-graduation" />Tous les élèves
          </Link>
        </div>
      </div>

      <div className="bg-[#112240] rounded-2xl p-7 mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-full opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 200 160"><circle cx="150" cy="80" r="100" fill="white" /></svg>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          <div>
            <p className="text-slate-400 text-xs mb-1 uppercase tracking-wide">Total attendu</p>
            <p className="font-display font-bold text-white text-2xl">{new Intl.NumberFormat('fr-FR').format(totalFees)} XOF</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs mb-1 uppercase tracking-wide">Encaissé</p>
            <p className="font-display font-bold text-emerald-400 text-2xl">{new Intl.NumberFormat('fr-FR').format(totalPaid)} XOF</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs mb-1 uppercase tracking-wide">Reste à percevoir</p>
            <p className="font-display font-bold text-amber-400 text-2xl">{new Intl.NumberFormat('fr-FR').format(totalRemaining)} XOF</p>
          </div>
        </div>
        <div className="mt-5 relative z-10">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-slate-400">Taux de recouvrement</span>
            <span className="text-white font-bold">{collectedPct}%</span>
          </div>
          <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-400 rounded-full transition-all duration-700" style={{ width: `${collectedPct}%` }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-7">
        {[
          { bg: 'bg-[#EFF6FF]', icon: 'bx-group', iconColor: 'text-[#2563EB]', val: stats.totalStudents, label: 'Élèves inscrits' },
          { bg: 'bg-emerald-100', icon: 'bx-check-double', iconColor: 'text-emerald-600', val: fullyPaid, label: 'Entièrement soldés' },
          { bg: 'bg-amber-100', icon: 'bx-time', iconColor: 'text-amber-600', val: partiallyPaid, label: 'Paiements partiels' },
          { bg: 'bg-red-100', icon: 'bx-x-circle', iconColor: 'text-red-500', val: notPaid, label: 'Aucun paiement' },
        ].map((c) => (
          <div key={c.label} className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center mb-3`}>
              <i className={`bx ${c.icon} text-xl ${c.iconColor}`} />
            </div>
            <div className="font-display font-bold text-2xl text-gray-800">{c.val}</div>
            <div className="text-gray-500 text-sm">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-xl text-gray-800">Suivi des paiements par élève</h2>
          <span className="text-sm text-gray-400">{filtered.length} élève(s)</span>
        </div>

        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <i className="bx bx-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher un élève..." className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2563EB]" />
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {['Tous', 'Soldés', 'Impayés', 'Actifs', 'Suspendus', 'Refusés'].map((f) => (
              <button key={f} onClick={() => setStatusFilter(f)} className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${statusFilter === f ? 'bg-[#2563EB] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{f}</button>
            ))}
          </div>
        </div>

        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide mb-4 pb-1">
          {CLASSES.map((tab) => (
            <button key={tab} onClick={() => setActiveClass(tab)} className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${activeClass === tab ? 'bg-[#112240] text-white' : 'text-gray-500 hover:bg-gray-100'}`}>{tab}</button>
          ))}
        </div>

        <div className="border border-gray-200 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['#', 'Élève', 'Classe', 'Frais totaux', 'Payé', 'Reste', '% payé', 'Statut'].map((h) => (
                    <th key={h} className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((s, i) => {
                  const pct = Math.round((s.paid / s.totalFees) * 100)
                  return (
                    <tr key={s.id} className="hover:bg-[#EFF6FF]/40 transition-colors">
                      <td className="px-4 py-3.5 text-gray-400 text-xs">{i + 1}</td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: getAvatarColor(`${s.firstName} ${s.lastName}`) }}>
                            {getInitials(`${s.firstName} ${s.lastName}`)}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">{s.lastName} {s.firstName}</div>
                            <div className="text-xs font-mono text-gray-400">{s.numero}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5"><span className="bg-[#EFF6FF] text-[#2563EB] text-xs px-2 py-0.5 rounded-full font-medium">{s.classe}</span></td>
                      <td className="px-4 py-3.5 text-gray-700 font-medium whitespace-nowrap">{formatXOF(s.totalFees)}</td>
                      <td className="px-4 py-3.5 whitespace-nowrap"><span className={`font-semibold ${s.remaining === 0 ? 'text-emerald-600' : 'text-gray-700'}`}>{formatXOF(s.paid)}</span></td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        {s.remaining > 0 ? <span className="font-semibold text-red-500">{formatXOF(s.remaining)}</span> : <span className="text-gray-300 font-medium">—</span>}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2 min-w-[80px]">
                          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${pct === 100 ? 'bg-emerald-500' : pct > 50 ? 'bg-amber-400' : 'bg-red-400'}`} style={{ width: `${pct}%` }} />
                          </div>
                          <span className={`text-xs font-semibold w-9 ${pct === 100 ? 'text-emerald-600' : pct > 50 ? 'text-amber-600' : 'text-red-500'}`}>{pct}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5"><StatusBadge status={s.accessStatus} size="sm" /></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400"><i className="bx bx-search text-3xl mb-2 block" />Aucun élève trouvé</div>
          )}
        </div>

        {filtered.length > 0 && (
          <div className="flex items-center justify-between mt-3 px-1">
            <span className="text-xs text-gray-400">{filtered.length} élève(s) affichés</span>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              {[{ color: 'bg-emerald-500', label: 'Soldé' }, { color: 'bg-amber-400', label: 'Partiel' }, { color: 'bg-red-400', label: 'Non payé' }].map((l) => (
                <span key={l.label} className="flex items-center gap-1"><span className={`w-2.5 h-2.5 rounded-full ${l.color} inline-block`} />{l.label}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-xl text-gray-800">Journal d'accès récent</h2>
            <span className="text-xs text-gray-400">Aujourd'hui</span>
          </div>
          <div className="border border-gray-200 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>{['Élève', 'Classe', 'Statut', 'Heure'].map((h) => (<th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>))}</tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockAccessLog.slice(0, 5).map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3.5 font-medium text-gray-800">{log.studentName}</td>
                      <td className="px-4 py-3.5 text-gray-500">{log.classe}</td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${log.status === 'authorized' ? 'text-emerald-600' : 'text-red-500'}`}>
                          <span className={`w-2 h-2 rounded-full ${log.status === 'authorized' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                          {log.status === 'authorized' ? 'Autorisé' : 'Refusé'}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 font-mono text-xs text-gray-500">{log.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-display font-bold text-xl text-gray-800 mb-4">Actions rapides</h2>
          <div className="space-y-3">
            {[
              { icon: 'bx-file', label: 'Générer rapport PDF', color: 'text-[#2563EB]', bg: 'bg-[#EFF6FF]' },
              { icon: 'bx-money', label: 'Voir tous les impayés', color: 'text-amber-600', bg: 'bg-amber-50' },
              { icon: 'bx-shield-x', label: 'Gérer exceptions', color: 'text-red-500', bg: 'bg-red-50' },
              { icon: 'bx-envelope', label: 'Notifier les parents', color: 'text-purple-600', bg: 'bg-purple-50' },
            ].map((a) => (
              <button key={a.label} className="w-full flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-sm transition-all active:scale-95 duration-100 text-left">
                <div className={`w-10 h-10 rounded-lg ${a.bg} flex items-center justify-center flex-shrink-0`}><i className={`bx ${a.icon} text-xl ${a.color}`} /></div>
                <span className="text-sm font-semibold text-gray-700">{a.label}</span>
                <i className="bx bx-chevron-right ml-auto text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
