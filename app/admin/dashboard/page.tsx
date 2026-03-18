'use client'

import React from 'react'
import { mockStats, mockAccessLog } from '@/lib/mockData'
import { formatXOF } from '@/lib/utils'
import StatCard from '@/components/StatCard'

// MOCK DATA — replace with API

export default function AdminDashboard() {
  const stats = mockStats

  return (
    <div className="animate-fade-in">
      {/* Top banner */}
      <div className="bg-midnight-mid rounded-2xl p-8 mb-8 overflow-hidden relative">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-slate-400 text-sm mb-2">Total encaissé · Année 2025–2026</p>
            <p className="font-display font-bold text-white text-5xl leading-tight">
              {new Intl.NumberFormat('fr-FR').format(stats.totalCollected)} XOF
            </p>
            <p className="text-emerald-400 text-sm mt-2 flex items-center gap-1">
              <i className="bx bx-trending-up" />
              +12.4% vs. année précédente
            </p>
          </div>
          <div className="hidden md:block">
            <svg width="180" height="80" viewBox="0 0 180 80">
              <polyline
                points="0,70 30,60 60,45 90,50 120,30 150,20 180,10"
                fill="none"
                stroke="#10B981"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.8"
              />
              <polyline
                points="0,70 30,60 60,45 90,50 120,30 150,20 180,10"
                fill="url(#grad)"
                stroke="none"
                opacity="0.15"
              />
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon="bx-group"
          label="Élèves inscrits"
          value={stats.totalStudents}
          colorVariant="default"
        />
        <StatCard
          icon="bx-check-circle"
          label="Présents aujourd'hui"
          value={stats.presentToday}
          colorVariant="success"
        />
        <StatCard
          icon="bx-qr"
          label="Cartes actives"
          value={stats.activeCards}
          colorVariant="success"
        />
        <StatCard
          icon="bx-block"
          label="Cartes suspendues"
          value={stats.suspendedCards}
          colorVariant="danger"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Access log */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-xl text-gray-800">Journal d&apos;accès récent</h2>
            <span className="text-xs text-gray-400">Aujourd&apos;hui</span>
          </div>
          <div className="border border-gray-200 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    {['Élève', 'Classe', 'Statut', 'Heure'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockAccessLog.slice(0, 5).map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3.5 font-medium text-gray-800">{log.studentName}</td>
                      <td className="px-4 py-3.5 text-gray-500">{log.classe}</td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                            log.status === 'authorized'
                              ? 'text-emerald-600'
                              : 'text-red-500'
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              log.status === 'authorized' ? 'bg-emerald-500' : 'bg-red-500'
                            }`}
                          />
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

        {/* Quick actions */}
        <div>
          <h2 className="font-display font-bold text-xl text-gray-800 mb-4">Actions rapides</h2>
          <div className="space-y-3">
            {[
              { icon: 'bx-file', label: 'Générer rapport PDF', color: 'text-accent', bg: 'bg-accent-pale' },
              { icon: 'bx-money', label: 'Voir impayés', color: 'text-amber-600', bg: 'bg-amber-50' },
              { icon: 'bx-shield-x', label: 'Gérer exceptions', color: 'text-red-500', bg: 'bg-red-50' },
            ].map((a) => (
              <button
                key={a.label}
                className="w-full flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-sm transition-all active:scale-95 duration-100 text-left"
              >
                <div className={`w-10 h-10 rounded-lg ${a.bg} flex items-center justify-center`}>
                  <i className={`bx ${a.icon} text-xl ${a.color}`} />
                </div>
                <span className="text-sm font-semibold text-gray-700">{a.label}</span>
                <i className="bx bx-chevron-right ml-auto text-gray-400" />
              </button>
            ))}
          </div>

          <div className="mt-6 bg-midnight-mid rounded-xl p-5">
            <p className="text-slate-400 text-xs mb-1">Impayés totaux</p>
            <p className="font-display font-bold text-white text-2xl">
              {new Intl.NumberFormat('fr-FR').format(stats.pendingAmount)} XOF
            </p>
            <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-warning rounded-full"
                style={{ width: `${Math.round((stats.pendingAmount / (stats.totalCollected + stats.pendingAmount)) * 100)}%` }}
              />
            </div>
            <p className="text-slate-500 text-xs mt-1">
              {Math.round((stats.pendingAmount / (stats.totalCollected + stats.pendingAmount)) * 100)}% du total non encaissé
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
