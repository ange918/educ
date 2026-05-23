import React from 'react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'light' | 'dark'
}

export default function Logo({ size = 'md', variant = 'light' }: LogoProps) {
  const textColor = variant === 'light' ? '#FFFFFF' : '#0A1628'
  const iconSizes = { sm: 24, md: 36, lg: 48 }
  const textSizes = { sm: 'text-lg', md: 'text-2xl', lg: 'text-4xl' }
  const s = iconSizes[size]

  return (
    <div className="flex items-center gap-2">
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="16" height="16" rx="2" fill={textColor} />
        <rect x="6" y="6" width="8" height="8" rx="1" fill={variant === 'light' ? '#0A1628' : '#FFFFFF'} />
        <rect x="30" y="2" width="16" height="16" rx="2" fill={textColor} />
        <rect x="34" y="6" width="8" height="8" rx="1" fill={variant === 'light' ? '#0A1628' : '#FFFFFF'} />
        <rect x="2" y="30" width="16" height="16" rx="2" fill={textColor} />
        <rect x="6" y="34" width="8" height="8" rx="1" fill={variant === 'light' ? '#0A1628' : '#FFFFFF'} />
        <rect x="22" y="4" width="4" height="4" rx="1" fill={textColor} opacity="0.7" />
        <rect x="4" y="22" width="4" height="4" rx="1" fill={textColor} opacity="0.7" />
        <rect x="22" y="22" width="4" height="4" rx="1" fill={textColor} />
        <rect x="30" y="22" width="4" height="4" rx="1" fill={textColor} opacity="0.7" />
        <rect x="38" y="22" width="4" height="4" rx="1" fill={textColor} opacity="0.5" />
        <rect x="22" y="30" width="4" height="4" rx="1" fill={textColor} opacity="0.7" />
        <rect x="30" y="30" width="4" height="4" rx="1" fill={textColor} opacity="0.5" />
        <rect x="38" y="30" width="4" height="4" rx="1" fill={textColor} />
        <rect x="22" y="38" width="4" height="4" rx="1" fill={textColor} opacity="0.5" />
        <rect x="30" y="38" width="4" height="4" rx="1" fill={textColor} />
        <rect x="38" y="38" width="4" height="4" rx="1" fill={textColor} opacity="0.7" />
      </svg>
      <span className={`font-display font-bold ${textSizes[size]}`} style={{ color: textColor }}>
        ÉduSecure
      </span>
    </div>
  )
}
