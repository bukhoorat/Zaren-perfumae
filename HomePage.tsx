import { Link } from 'react-router-dom'
import BottleArt from '../components/BottleArt'
import Ornament from '../components/Ornament'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import WhatsAppButton from '../components/WhatsAppButton'
import { products } from '../data/products'
import { usePageTitle } from '../hooks/usePageTitle'
import { useLang } from '../i18n/LanguageContext'
import type { Gender } from '../types'

const categories: Gender[] = ['women', 'men', 'unisex']

export default function HomePage() {
  const { t } = useLang()
  usePageTitle()

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__text">
            <p className="kicker">{t('home.kicker')}</p>
            <h1 className="hero__brand" dir="ltr">
              ZAREN
            </h1>
            <p className="hero__slogan" dir="ltr">
              BE REMEMBERED
            </p>
            <Ornament />
            <p className="hero__lead">{t('home.heroText')}</p>
            <Link to="/products" className="btn btn--solid">
              {t('home.cta')}
            </Link>
          </div>

          <div className="hero__art" aria-hidden="true">
            <div className="arch">
              <div className="arch__inner">
                <BottleArt accent="#c9a36b" className="arch__bottle" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <header className="section__head">
              <h2 className="section__title">{t('home.collectionTitle')}</h2>
              <p className="section__sub">{t('home.collectionSub')}</p>
              <Ornament />
            </header>
          </Reveal>
          <div className="grid grid--products">
            {products.slice(0, 4).map((p, i) => (
              <Reveal key={p.id} delay={i * 90}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
          <div className="section__foot">
            <Link to="/products" className="btn btn--outline">
              {t('home.viewAll')}
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <header className="section__head">
              <h2 className="section__title">{t('home.categoriesTitle')}</h2>
              <p className="section__sub">{t('home.categoriesSub')}</p>
              <Ornament />
            </header>
          </Reveal>
          <div className="grid grid--categories">
            {categories.map((g, i) => (
              <Reveal key={g} delay={i * 100}>
                <Link to={`/products?gender=${g}`} className="category">
                  <span className="category__name">{t(`gender.${g}`)}</span>
                  <span className="category__text">{t(`home.${g}.text`)}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container container--narrow">
          <Reveal>
            <div className="philosophy">
              <h2 className="section__title">{t('home.philosophyTitle')}</h2>
              <Ornament />
              <p className="philosophy__text">{t('home.philosophyText')}</p>
              <Link to="/story" className="btn btn--outline">
                {t('home.storyCta')}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--dark section--tight">
        <div className="container container--narrow">
          <Reveal>
            <div className="order-band">
              <h2 className="section__title">{t('home.orderTitle')}</h2>
              <p className="section__sub">{t('home.orderText')}</p>
              <div className="order-band__actions">
                <WhatsAppButton label={t('contact.whatsappBtn')} />
                <Link to="/guide" className="btn btn--outline">
                  {t('home.orderCta')}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
