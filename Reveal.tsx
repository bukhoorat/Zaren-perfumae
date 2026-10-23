import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  /** تأخیر انیمیشن به میلی‌ثانیه */
  delay?: number
  className?: string
}

/** ظاهر شدن آرام محتوا هنگام رسیدن به آن در اسکرول. اگر مرورگر پشتیبانی نکند، محتوا فوراً نمایش داده می‌شود. */
export default function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal${visible ? ' is-visible' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
