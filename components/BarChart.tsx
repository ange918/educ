'use client'

export type BarPoint = { jour: string; value: number }

// Petit graphe en barres, sans dépendance externe, aux couleurs de la marque.
export default function BarChart({
  data,
  color,
  titre,
  icone,
}: {
  data: BarPoint[]
  color: string
  titre: string
  icone?: string
}) {
  const max = Math.max(1, ...data.map(d => d.value))
  const total = data.reduce((s, d) => s + d.value, 0)

  return (
    <div style={{ background: '#FFFFFF', border: '1px solid #E7E3D8', borderRadius: '16px', padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 600, color: '#6E7268', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {icone && <i className={`bx ${icone}`} style={{ fontSize: '15px', color }} />}
          {titre}
        </span>
        <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: '#14201A' }}>{total}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '90px' }}>
        {data.map((d, i) => (
          <div
            key={i}
            title={`${d.jour} : ${d.value}`}
            style={{
              flex: 1,
              height: `${Math.max(3, (d.value / max) * 100)}%`,
              background: color,
              opacity: d.value ? 1 : 0.12,
              borderRadius: '3px 3px 0 0',
              transition: 'height 0.3s',
            }}
          />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', color: '#9AA093' }}>
          {data[0]?.jour ? new Date(data[0].jour).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }) : ''}
        </span>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', color: '#9AA093' }}>Aujourd&apos;hui</span>
      </div>
    </div>
  )
}
