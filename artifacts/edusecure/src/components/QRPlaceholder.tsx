import React from 'react'

interface QRPlaceholderProps {
  size?: number
  studentName?: string
}

export default function QRPlaceholder({ size = 160, studentName = '' }: QRPlaceholderProps) {
  const seed = studentName.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const cellSize = size / 21

  const pseudoRandom = (i: number) => {
    const x = Math.sin(seed + i) * 10000
    return x - Math.floor(x)
  }

  const cells: { x: number; y: number }[] = []
  for (let row = 0; row < 21; row++) {
    for (let col = 0; col < 21; col++) {
      const inTopLeft = row < 7 && col < 7
      const inTopRight = row < 7 && col >= 14
      const inBottomLeft = row >= 14 && col < 7
      if (inTopLeft || inTopRight || inBottomLeft) continue
      if (pseudoRandom(row * 21 + col) > 0.45) {
        cells.push({ x: col, y: row })
      }
    }
  }

  const cornerOuter = (x: number, y: number) => (
    <rect key={`co-${x}-${y}`} x={x * cellSize} y={y * cellSize} width={7 * cellSize} height={7 * cellSize} rx={cellSize * 0.5} fill="#0A1628" />
  )
  const cornerInner = (x: number, y: number) => (
    <rect key={`ci-${x}-${y}`} x={(x + 2) * cellSize} y={(y + 2) * cellSize} width={3 * cellSize} height={3 * cellSize} rx={cellSize * 0.3} fill="#0A1628" />
  )
  const cornerWhite = (x: number, y: number) => (
    <rect key={`cw-${x}-${y}`} x={(x + 1) * cellSize} y={(y + 1) * cellSize} width={5 * cellSize} height={5 * cellSize} rx={cellSize * 0.3} fill="white" />
  )

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg" style={{ background: 'white', borderRadius: 8, padding: 4 }}>
      <rect width={size} height={size} fill="white" />
      {cells.map((c, i) => (
        <rect key={i} x={c.x * cellSize + 0.5} y={c.y * cellSize + 0.5} width={cellSize - 1} height={cellSize - 1} rx={cellSize * 0.15} fill="#0A1628" />
      ))}
      {cornerOuter(0, 0)}{cornerWhite(0, 0)}{cornerInner(0, 0)}
      {cornerOuter(14, 0)}{cornerWhite(14, 0)}{cornerInner(14, 0)}
      {cornerOuter(0, 14)}{cornerWhite(0, 14)}{cornerInner(0, 14)}
    </svg>
  )
}
