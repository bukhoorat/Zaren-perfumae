import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '../config/site'
import { useLang } from '../i18n/LanguageContext'
import { assetUrl } from '../utils/whatsapp'

/**
 * کنترل اختیاری موسیقی پس‌زمینه.
 * - هرگز خودکار پخش نمی‌شود؛ فقط بعد از کلیک کاربر.
 * - اگر فایل موسیقی وجود نداشته باشد، سایت بدون خطا کار می‌کند و یک پیغام کوتاه نشان داده می‌شود.
 */
export default function MusicToggle() {
  const { t } = useLang()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timerRef = useRef<number | undefined>(undefined)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)
  const [showNote, setShowNote] = useState(false)

  useEffect(() => {
    return () => {
      window.clearTimeout(timerRef.current)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  if (!siteConfig.music.enabled) return null

  const fail = () => {
    setPlaying(false)
    setFailed(true)
    setShowNote(true)
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setShowNote(false), 4000)
  }

  const handleClick = () => {
    if (playing) {
      audioRef.current?.pause()
      setPlaying(false)
      return
    }
    if (!audioRef.current) {
      const audio = new Audio(assetUrl(siteConfig.music.src))
      audio.loop = true
      audio.volume = Math.min(1, Math.max(0, siteConfig.music.volume))
      audio.addEventListener('error', fail)
      audioRef.current = audio
    }
    const attempt = audioRef.current.play()
    if (attempt !== undefined) {
      attempt.then(() => setPlaying(true)).catch(fail)
    } else {
      setPlaying(true)
    }
  }

  return (
    <div className="music">
      <button
        type="button"
        className={`icon-btn${playing ? ' is-active' : ''}${failed ? ' is-disabled' : ''}`}
        onClick={handleClick}
        aria-pressed={playing}
        aria-label={playing ? t('music.pause') : t('music.play')}
        title={playing ? t('music.pause') : t('music.play')}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
          {playing ? (
            <path fill="currentColor" d="M7 5h3.5v14H7V5Zm6.5 0H17v14h-3.5V5Z" />
          ) : (
            <path
              fill="currentColor"
              d="M9 18V6.3l10-2.1v11.5a2.9 2.9 0 1 1-1.6-2.6V7.4L10.6 8.8V18a2.9 2.9 0 1 1-1.6-2.6V18Z"
            />
          )}
        </svg>
      </button>
      {showNote && (
        <p className="music__note" role="status">
          {t('music.unavailable')}
        </p>
      )}
    </div>
  )
}
