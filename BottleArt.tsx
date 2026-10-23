import { useId } from 'react'

interface BottleArtProps {
  /** رنگ مایع داخل بطری */
  accent?: string
  className?: string
}

/**
 * طرح موقت بطری عطر (SVG). تا وقتی عکس واقعی محصول اضافه نشده، به‌جای تصویر نمایش داده می‌شود.
 * این فقط یک جایگزین گرافیکی است و عکس واقعی محصول نیست.
 */
export default function BottleArt({ accent = '#c9a36b', className }: BottleArtProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const liquid = `liquid-${uid}`
  const glass = `glass-${uid}`
  const gold = `gold-${uid}`

  return (
    <svg
      className={className}
      viewBox="0 0 240 320"
      role="img"
      aria-label="ZAREN"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={liquid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={accent} stopOpacity="0.55" />
          <stop offset="1" stopColor={accent} stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id={glass} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="0.35" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.16" />
        </linearGradient>
        <linearGradient id={gold} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d9c08a" />
          <stop offset="1" stopColor="#9c7d3e" />
        </linearGradient>
      </defs>

      {/* سایه کف */}
      <ellipse cx="120" cy="296" rx="78" ry="8" fill="#000" opacity="0.18" />

      {/* درپوش */}
      <rect x="98" y="26" width="44" height="40" rx="3" fill={`url(#${gold})`} />
      <rect x="104" y="66" width="32" height="14" fill={`url(#${gold})`} opacity="0.85" />

      {/* بدنه شیشه */}
      <rect x="50" y="80" width="140" height="208" rx="10" fill="#f4eee0" fillOpacity="0.1" stroke="#b9995a" strokeWidth="1.5" />
      {/* مایع */}
      <rect x="56" y="124" width="128" height="158" rx="6" fill={`url(#${liquid})`} />
      <rect x="50" y="80" width="140" height="208" rx="10" fill={`url(#${glass})`} />

      {/* برچسب */}
      <rect x="76" y="160" width="88" height="82" fill="#faf6ee" stroke="#b9995a" strokeWidth="1" />
      <rect x="81" y="165" width="78" height="72" fill="none" stroke="#b9995a" strokeWidth="0.6" />
      <text
        x="120"
        y="200"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="20"
        letterSpacing="4"
        fill="#161513"
      >
        ZAREN
      </text>
      <line x1="100" y1="210" x2="140" y2="210" stroke="#b9995a" strokeWidth="0.8" />
      <text
        x="120"
        y="224"
        textAnchor="middle"
        fontFamily="'Jost', Arial, sans-serif"
        fontSize="5.5"
        letterSpacing="2"
        fill="#6d6657"
      >
        PARFUM
      </text>

      {/* برق شیشه */}
      <rect x="60" y="92" width="6" height="170" rx="3" fill="#fff" opacity="0.35" />
    </svg>
  )
}
