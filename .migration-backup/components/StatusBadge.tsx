import React from 'react'

interface StatusBadgeProps {
  status: 'active' | 'suspended' | 'refused'
  size?: 'sm' | 'md'
}

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = {
    active: {
      label: 'ACTIVÉ',
      icon: 'bx-check-circle',
      bg: 'bg-emerald-100',
      text: 'text-emerald-700',
      dot: 'bg-emerald-500',
    },
    suspended: {
      label: 'SUSPENDU',
      icon: 'bx-time-five',
      bg: 'bg-amber-100',
      text: 'text-amber-700',
      dot: 'bg-amber-500',
    },
    refused: {
      label: 'REFUSÉ',
      icon: 'bx-x-circle',
      bg: 'bg-red-100',
      text: 'text-red-700',
      dot: 'bg-red-500',
    },
  }

  const { label, icon, bg, text, dot } = config[status]
  const padding = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-xs'

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${bg} ${text} ${padding}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${dot} ${status === 'suspended' ? 'animate-pulse-slow' : ''}`}
      />
      <i className={`bx ${icon}`} />
      {label}
    </span>
  )
}
