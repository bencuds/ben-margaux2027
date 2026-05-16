import type { CSSProperties } from 'react'

interface Props {
  className?: string
  style?: CSSProperties
  petalColor?: string
  leafColor?: string
  centerColor?: string
  stamenColor?: string
}

/**
 * Coloured hibiscus botanical illustration — inline SVG, no image files.
 * Add class "botanical-grow" (defined in globals.css) for the page-open spring animation.
 */
export default function BotanicalSvg({
  className = '',
  style,
  petalColor  = '#FF007F',  // fuchsia
  leafColor   = '#2D5A2D',  // jungle
  centerColor = '#CC0066',  // fuchsia-dark
  stamenColor = '#FFA500',  // mango
}: Props) {
  const petal = 'M 0 0 C -27 -18 -30 -65 0 -102 C 30 -65 27 -18 0 0'
  const five  = [0, 72, 144, 216, 288]

  return (
    <svg
      viewBox="0 0 300 390"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* ── Connecting stem ── */}
      <path
        d="M 78 155 Q 138 205 192 258"
        stroke={leafColor} strokeWidth="2.2" strokeLinecap="round"
      />

      {/* ── Large flower  (centre 212, 282) ── */}
      <g transform="translate(212,282)">
        {five.map(a => (
          <path key={a} d={petal} fill={petalColor} transform={`rotate(${a})`} />
        ))}
        <circle cx="0"  cy="0"   r="13"  fill={centerColor} />
        <line   x1="0" y1="-13" x2="0"  y2="-38" stroke={centerColor} strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="0"  cy="-40" r="3.2" fill={stamenColor} />
        <circle cx="-8" cy="-34" r="2"   fill={stamenColor} />
        <circle cx="8"  cy="-34" r="2"   fill={stamenColor} />
      </g>

      {/* ── Small flower  (centre 78, 130 — 58 % scale) ── */}
      <g transform="translate(78,130) scale(0.58)">
        {five.map(a => (
          <path key={a} d={petal} fill={petalColor} transform={`rotate(${a + 36})`} />
        ))}
        <circle cx="0"  cy="0"   r="13"  fill={centerColor} />
        <line   x1="0" y1="-13" x2="0"  y2="-34" stroke={centerColor} strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="0"  cy="-36" r="2.8" fill={stamenColor} />
        <circle cx="-7" cy="-30" r="1.8" fill={stamenColor} />
        <circle cx="7"  cy="-30" r="1.8" fill={stamenColor} />
      </g>

      {/* ── Bud  (mid-stem) ── */}
      <g transform="translate(152,218)">
        <path d="M 0 0 C -13 -9 -11 -32 0 -45 C 11 -32 13 -9 0 0" fill={petalColor} />
        <path d="M 0 -6 C -16 -18 -20 -38 -6 -45" stroke={petalColor} strokeWidth="1.4" strokeLinecap="round" opacity="0.65" />
        <path d="M 0 -6 C  16 -18  20 -38  6 -45" stroke={petalColor} strokeWidth="1.4" strokeLinecap="round" opacity="0.65" />
        <line x1="0" y1="0" x2="0"  y2="14" stroke={leafColor} strokeWidth="1.4" strokeLinecap="round" />
        <path d="M 0 2 C -10 6 -11 16 -5 19" stroke={leafColor} strokeWidth="1" strokeLinecap="round" />
        <path d="M 0 2 C  10 6  11 16  5 19" stroke={leafColor} strokeWidth="1" strokeLinecap="round" />
      </g>

      {/* ── Leaf — upper left ── */}
      <path d="M 78 132 C 25 104 8 128 18 168 C 48 138 70 140 78 132 Z" fill={leafColor} />
      <path d="M 78 132 C 44 118 20 138 18 168" stroke={leafColor} strokeWidth="1" strokeLinecap="round" opacity="0.4" />

      {/* ── Leaf — lower ── */}
      <path d="M 183 368 C 122 342 84 362 74 398 C 112 362 158 364 183 368 Z" fill={leafColor} />
      <path d="M 183 368 C 140 354 102 368 74 398" stroke={leafColor} strokeWidth="1" strokeLinecap="round" opacity="0.4" />

      {/* ── Leaf — small right ── */}
      <path d="M 258 288 C 290 262 300 282 292 314 C 274 287 262 288 258 288 Z" fill={leafColor} />
    </svg>
  )
}
