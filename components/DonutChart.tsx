'use client'

export type DonutSlice = { label: string; value: number; color: string }

// Camembert (donut) en SVG, sans dépendance, avec légende.
export default function DonutChart({ data, titre, sousTitre }: { data: DonutSlice[]; titre: string; sousTitre?: string }) {
  const slices = data.filter(d => d.value > 0)
  const total = slices.reduce((s, d) => s + d.value, 0)
  const R = 60, C = 2 * Math.PI * R, cx = 80, cy = 80, sw = 26

  let offset = 0
  const arcs = slices.map(d => {
    const frac = total ? d.value / total : 0
    const dash = frac * C
    const seg = { color: d.color, dash, gap: C - dash, off: -offset }
    offset += dash
    return seg
  })

  return (
    <div style={{ background: '#17181B', border: '1px solid #26272B', borderRadius: '16px', padding: '1.5rem' }}>
      <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#fff', marginBottom: '0.15rem' }}>{titre}</h3>
      {sousTitre && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#8A8D93', marginBottom: '1.25rem' }}>{sousTitre}</p>}

      {total === 0 ? (
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#5A5D63', textAlign: 'center', padding: '2.5rem 0' }}>Pas encore de données</p>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <svg width="160" height="160" viewBox="0 0 160 160" style={{ flexShrink: 0 }}>
            <circle cx={cx} cy={cy} r={R} fill="none" stroke="#26272B" strokeWidth={sw} />
            {arcs.map((a, i) => (
              <circle key={i} cx={cx} cy={cy} r={R} fill="none" stroke={a.color} strokeWidth={sw}
                strokeDasharray={`${a.dash} ${a.gap}`} strokeDashoffset={a.off}
                transform={`rotate(-90 ${cx} ${cy})`} strokeLinecap="butt" />
            ))}
            <text x={cx} y={cy - 4} textAnchor="middle" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 800, fontSize: '22px', fill: '#fff' }}>{total}</text>
            <text x={cx} y={cy + 14} textAnchor="middle" style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', fill: '#8A8D93' }}>TOTAL</text>
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, minWidth: '120px' }}>
            {slices.map(d => (
              <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '2px', background: d.color, flexShrink: 0 }} />
                <span style={{ color: '#C8CACD', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.label}</span>
                <span style={{ color: '#fff', fontWeight: 700 }}>{d.value}</span>
                <span style={{ color: '#5A5D63', fontSize: '0.72rem', width: '38px', textAlign: 'right' }}>{Math.round((d.value / total) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
