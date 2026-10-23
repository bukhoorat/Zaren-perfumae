import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext'
import type { Product } from '../types'
import { assetUrl } from '../utils/whatsapp'
import BottleArt from './BottleArt'

interface ProductImageProps {
  product: Product
  /** کدام تصویر از لیست images نمایش داده شود */
  index?: number
}

/** نمایش تصویر محصول؛ اگر تصویر موجود نباشد یا بارگذاری نشود، طرح موقت بطری نمایش داده می‌شود. */
export default function ProductImage({ product, index = 0 }: ProductImageProps) {
  const { loc, t } = useLang()
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const src = product.images[index]

  if (!src || failedSrc === src) {
    return <BottleArt accent={product.accent} className="product-art" />
  }

  return (
    <img
      className="product-photo"
      src={assetUrl(src)}
      alt={`${t('product.imageAlt')} ${loc(product.name)}`}
      loading="lazy"
      onError={() => setFailedSrc(src)}
    />
  )
}
