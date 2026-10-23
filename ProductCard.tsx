import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import type { Product } from '../types'
import ProductImage from './ProductImage'
import WhatsAppButton from './WhatsAppButton'

export default function ProductCard({ product }: { product: Product }) {
  const { t, loc, formatPrice, formatNumber } = useLang()
  const href = `/product/${product.slug}`

  return (
    <article className="card">
      <Link to={href} className="card__link" aria-label={`${t('product.view')}: ${loc(product.name)}`}>
        <div className="card__media">
          <span className="card__badge">{t(`gender.${product.gender}`)}</span>
          <ProductImage product={product} />
        </div>
        <div className="card__body">
          <h3 className="card__name">{loc(product.name)}</h3>
          <p className="card__tagline">{loc(product.tagline)}</p>
          <p className="card__meta">
            <span>{product.price === null ? t('product.priceOnRequest') : formatPrice(product.price)}</span>
            {product.volumeMl !== null && (
              <span>
                {formatNumber(product.volumeMl)} {t('product.volumeUnit')}
              </span>
            )}
          </p>
        </div>
      </Link>
      <div className="card__actions">
        <WhatsAppButton product={product} variant="outline" size="sm" />
      </div>
    </article>
  )
}
