import React, { useEffect, useState } from 'react'

interface StatCardProps {
  icon: string
  label: string
  value: number | string
  trend?: string
  colorVariant?: 'default' | 'success' | 'warning' | 'danger' | 'dark'
  prefix?: string
  suffix?: string
  animate?: boolean
}

export default function StatCard({
  icon, label, value, trend, colorVariant = 'default', suffix = '', animate = true,
}: StatCardProps) {
  const [displayed, setDisplayed] = useState(0)
  const isNumber = typeof value === 'number'

  useEffect(() => {
    if (!isNumber || !animate) return
    const target = value as number
    const duration = 1000
    const steps = 40
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setDisplayed(target)
        clearInterval(timer)
      } else {
        setDisplayed(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [value, isNumber, animate])

  const variants = {
    default: { bg: 'bg-[#112240]', text: 'text-white', subtext: 'text-slate-400', iconBg: 'bg-[#1B3358]', iconColor: 'text-[#3B82F6]' },
    success: { bg: 'bg-white', text: 'text-gray-800', subtext: 'text-gray-500', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
    warning: { bg: 'bg-white', text: 'text-gray-800', subtext: 'text-gray-500', iconBg: 'bg-amber-100', iconColor: 'text-amber-600' },
    danger: { bg: 'bg-white', text: 'text-gray-800', subtext: 'text-gray-500', iconBg: 'bg-red-100', iconColor: 'text-red-600' },
    dark: { bg: 'bg-[#0A1628]', text: 'text-white', subtext: 'text-slate-400', iconBg: 'bg-[#112240]', iconColor: 'text-[#3B82F6]' },
  }

  const v = variants[colorVariant]
  const formatted = isNumber ? new Intl.NumberFormat('fr-FR').format(displayed) + suffix : String(value)

  return (
    <div className={`${v.bg} rounded-2xl p-6 border border-white/10 shadow-sm flex flex-col gap-3`}>
      <div className={`w-12 h-12 rounded-xl ${v.iconBg} flex items-center justify-center`}>
        <i className={`bx ${icon} text-2xl ${v.iconColor}`} />
      </div>
      <div>
        <div className={`text-2xl font-display font-bold ${v.text}`}>{formatted}</div>
        <div className={`text-sm mt-0.5 ${v.subtext}`}>{label}</div>
      </div>
      {trend && <div className="text-xs text-emerald-400 font-medium">{trend}</div>}
    </div>
  )
}
