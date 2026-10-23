import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext'
import type { Product } from '../types'
import { buildWhatsappUrl, productPageUrl } from '../utils/whatsapp'

interface WhatsAppButtonProps {
  /** اگر محصول بدهید، پیام شامل نام و لینک همان محصول می‌شود؛ وگرنه پیام عمومی ارسال می‌شود */
  product?: Product
  /** متن دکمه (اختیاری) */
  label?: string
  variant?: 'solid' | 'outline'
  size?: 'md' | 'sm'
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12.04 2a9.93 9.93 0 0 0-8.5 15.07L2 22l5.07-1.5A9.94 9.94 0 1 0 12.04 2Zm0 18.1a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3 .88.9-2.92-.2-.31A8.1 8.1 0 1 1 12.04 20.1Zm4.44-6.06c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06a6.63 6.63 0 0 1-1.95-1.2 7.3 7.3 0 0 1-1.35-1.68c-.14-.24-.01-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.47-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z"
      />
    </svg>
  )
}

export default function WhatsAppButton({
  product,
  label,
  variant = 'solid',
  size = 'md',
}: WhatsAppButtonProps) {
  const { t, loc } = useLang()
  const [showNotice, setShowNotice] = useState(false)

  const text = product
    ? `${t('whatsapp.message')}\n${loc(product.name)}\n${t('whatsapp.pageLabel')}: ${productPageUrl(product.slug)}`
    : t('whatsapp.generalMessage')

  const href = buildWhatsappUrl(text)
  const buttonLabel = label ?? t('product.order')
  const className = `btn btn--${variant}${size === 'sm' ? ' btn--sm' : ''}`

  if (href) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon />
        <span>{buttonLabel}</span>
      </a>
    )
  }

  // شماره هنوز تنظیم نشده: دکمه کار می‌کند و پیغام روشن نشان می‌دهد (هیچ شماره جعلی استفاده نمی‌شود)
  return (
    <div className="wa-pending">
      <button type="button" className={className} onClick={() => setShowNotice((v) => !v)}>
        <WhatsAppIcon />
        <span>{buttonLabel}</span>
      </button>
      {showNotice && (
        <p className="wa-pending__notice" role="status">
          {t('whatsapp.notConfigured')}
        </p>
      )}
    </div>
  )
}
