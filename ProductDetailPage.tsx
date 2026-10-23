import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Ornament from '../components/Ornament'
import ProductCard from '../components/ProductCard'
import ProductImage from '../components/ProductImage'
import SampleNotice from '../components/SampleNotice'
import WhatsAppButton from '../components/WhatsAppButton'
import { siteConfig } from '../config/site'
import { getProductBySlug, products } from '../data/products'
import { usePageTitle } from '../hooks/usePageTitle'
import { useLang } from '../i18n/LanguageContext'
import type { Localized } from '../types'

function NoteColumn({ title, notes }: { title: string; notes: Localized[] }) {
  const { loc } = useLang()
  if (notes.length === 0) return null
  return (
    <div className="notes__col">
      <h3 className="notes__title">{title}</h3>
      <ul className="notes__list">
        {notes.map((n, i) => (
          <li key={i}>{loc(n)}</li>
        ))}
      </ul>
    </div>
  )
}

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t, loc, formatPrice, formatNumber } = useLang()
  const product = getProductBySlug(slug)
  const [imageIndex, setImageIndex] = useState(0)

  useEffect(() => {
    setImageIndex(0)
  }, [slug])

  usePageTitle(product ? loc(product.name) : t('product.notFoundTitle'))

  if (!product) {
    return (
      <section className="section section--light page-top">
        <div className="container container--narrow center">
          <h1 className="section__title">{t('product.notFoundTitle')}</h1>
          <Ornament />
          <p className="section__sub">{t('product.notFoundText')}</p>
          <Link to="/products" className="btn btn--outline">
            {t('product.back')}
          </Link>
        </div>
      </section>
    )
  }

  const related = products.filter((p) => p.id !== product.id).slice(0, 3)
  const hasThumbs = product.images.length > 1

  return (
    <>
      <section className="section section--light page-top">
        <div className="container">
          <Link to="/products" className="back-link">
            <span aria-hidden="true" className="back-link__arrow">
              ←
            </span>
            {t('product.back')}
          </Link>

          <div className="detail">
            <div className="detail__gallery">
              <div className="detail__stage">
                <ProductImage product={product} index={imageIndex} />
              </div>
              {hasThumbs && (
                <div className="detail__thumbs">
                  {product.images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`detail__thumb${i === imageIndex ? ' is-active' : ''}`}
                      onClick={() => setImageIndex(i)}
                      aria-label={`${t('product.imageAlt')} ${formatNumber(i + 1)}`}
                      aria-pressed={i === imageIndex}
                    >
                      <ProductImage product={product} index={i} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="detail__info">
              <p className="kicker">{t(`gender.${product.gender}`)}</p>
              <h1 className="detail__name">{loc(product.name)}</h1>
              <p className="detail__tagline">{loc(product.tagline)}</p>
              <Ornament className="ornament--start" />

              <dl className="facts">
                <div className="facts__row">
                  <dt>{t('product.price')}</dt>
                  <dd>{product.price === null ? t('product.priceOnRequest') : formatPrice(product.price)}</dd>
                </div>
                <div className="facts__row">
                  <dt>{t('product.volume')}</dt>
                  <dd>
                    {product.volumeMl === null
                      ? t('product.volumeTbd')
                      : `${formatNumber(product.volumeMl)} ${t('product.volumeUnit')}`}
                  </dd>
                </div>
              </dl>

              <p className="detail__desc">{loc(product.description)}</p>

              <div className="detail__order">
                <WhatsAppButton product={product} />
                <p className="detail__hint">{t('product.orderHint')}</p>
              </div>

              {product.isSample && siteConfig.showSampleNotice && <SampleNotice />}
            </div>
          </div>

          <div className="notes">
            <h2 className="notes__heading">{t('product.notes')}</h2>
            <div className="notes__grid">
              <NoteColumn title={t('product.notes.top')} notes={product.notes.top} />
              <NoteColumn title={t('product.notes.heart')} notes={product.notes.heart} />
              <NoteColumn title={t('product.notes.base')} notes={product.notes.base} />
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--ivory">
          <div className="container">
            <header className="section__head">
              <h2 className="section__title">{t('product.related')}</h2>
              <Ornament />
            </header>
            <div className="grid grid--products grid--three">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
