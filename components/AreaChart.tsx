'use client'

type Point = { jour: string; visites: number; clics: number }

// Courbe "Fréquentation" : aire des visites + ligne pointillée des clics.
export default function AreaChart({ data }: { data: Point[] }) {
  const W = 720, H = 260, padL = 34, padR = 12, padT = 16, padB = 26
  const iw = W - padL - padR, ih = H - padT - padB
  const n = Math.max(1, data.length - 1)
  const max = Math.max(4, ...data.map(d => Math.max(d.visites, d.clics)))

  const x = (i: number) => padL + (i / n) * iw
  const y = (v: number) => padT + ih - (v / max) * ih

  const linePath = (key: 'visites' | 'clics') =>
    data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(d[key]).toFixed(1)}`).join(' ')

  const areaPath =
    `${data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(d.visites).toFixed(1)}`).join(' ')}` +
    ` L ${x(data.length - 1).toFixed(1)} ${(padT + ih).toFixed(1)} L ${x(0).toFixed(1)} ${(padT + ih).toFixed(1)} Z`

  const ticks = [0, 0.25, 0.5, 0.75, 1].map(f => Math.round(max * f))
  const labelEvery = Math.ceil(data.length / 6)

  return (
    <div style={{ background: '#17181B', border: '1px solid #26272B', borderRadius: '16px', padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.25rem' }}>
        <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>Fréquentation</h3>
        <div style={{ display: 'flex', gap: '1rem', fontFamily: 'Inter, sans-serif', fontSize: '0.78rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#C8CACD' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#008751' }} /> Visites
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#C8CACD' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#2E86DE' }} /> Clics
          </span>
        </div>
      </div>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#8A8D93', marginBottom: '1rem' }}>
        Visites et clics sur les {data.length} derniers jours
      </p>

      <div style={{ width: '100%', overflowX: 'auto' }}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ minWidth: '320px', display: 'block' }} preserveAspectRatio="none">
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#008751" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#008751" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* grille + axe Y */}
          {ticks.map((t, i) => {
            const gy = padT + ih - (i / (ticks.length - 1)) * ih
            return (
              <g key={i}>
                <line x1={padL} y1={gy} x2={W - padR} y2={gy} stroke="#26272B" strokeWidth="1" />
                <text x={padL - 6} y={gy + 3} textAnchor="end" style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', fill: '#5A5D63' }}>{t}</text>
              </g>
            )
          })}

          {/* aire + lignes */}
          <path d={areaPath} fill="url(#areaGrad)" />
          <path d={linePath('visites')} fill="none" stroke="#008751" strokeWidth="2.2" />
          <path d={linePath('clics')} fill="none" stroke="#2E86DE" strokeWidth="2" strokeDasharray="5 4" />

          {/* labels X */}
          {data.map((d, i) => (i % labelEvery === 0 || i === data.length - 1) ? (
            <text key={i} x={x(i)} y={H - 8} textAnchor="middle" style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', fill: '#5A5D63' }}>
              {new Date(d.jour).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
            </text>
          ) : null)}
        </svg>
      </div>
    </div>
  )
}
