import React from 'react'
import { Link } from 'wouter'
import { mockChildren, mockParent } from '@/lib/mockData'
import StatCard from '@/components/StatCard'
import ChildCard from '@/components/ChildCard'

export default function ParentDashboard() {
  const children = mockChildren
  const totalPaid = children.reduce((s, c) => s + c.paid, 0)
  const totalRemaining = children.reduce((s, c) => s + (c.totalFees - c.paid), 0)

  const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-gray-800">Bonjour, {mockParent.name.split(' ')[0]} 👋</h1>
        <p className="text-gray-400 text-sm mt-1 capitalize">{today}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <StatCard icon="bx-group" label="Enfants inscrits" value={children.length} colorVariant="default" />
        <StatCard icon="bx-check-circle" label="Total payé" value={totalPaid} suffix=" XOF" colorVariant="success" />
        <StatCard icon="bx-time" label="Reste à payer" value={totalRemaining} suffix=" XOF" colorVariant="warning" />
      </div>

      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display font-bold text-xl text-gray-800">Mes enfants</h2>
        <Link href="/parent/children/add" className="inline-flex items-center gap-1.5 bg-[#2563EB] text-white text-sm px-4 py-2 rounded-xl font-semibold hover:bg-[#3B82F6] transition-colors active:scale-95 duration-100">
          <i className="bx bx-plus" />Ajouter un enfant
        </Link>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {children.map((child) => <ChildCard key={child.id} child={child} />)}
      </div>
    </div>
  )
}
