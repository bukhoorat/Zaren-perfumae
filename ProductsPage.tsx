import { useSearchParams } from 'react-router-dom'
import Ornament from '../components/Ornament'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import { products } from '../data/products'
import { usePageTitle } from '../hooks/usePageTitle'
import { useLang } from '../i18n/LanguageContext'
import type { Gender } from '../types'

type Filter = 'all' | Gender
const filters: Filter[] = ['all', 'women', 'men', 'unisex']

function parseFilter(value: string | null): Filter {
  return value === 'women' || value === 'men' || value === 'unisex' ? value : 'all'
}

export default function ProductsPage() {
  const { t } = useLang()
  const [params, setParams] = useSearchParams()
  const active = parseFilter(params.get('gender'))
  usePageTitle(t('products.title'))

  const visible = active === 'all' ? products : products.filter((p) => p.gender === active)

  const select = (f: Filter) => {
    if (f === 'all') setParams({}, { replace: true })
    else setParams({ gender: f }, { replace: true })
  }

  return (
    <section className="section section--light page-top">
      <div className="container">
        <Reveal>
          <header className="section__head">
            <h1 className="section__title">{t('products.title')}</h1>
            <p className="section__sub">{t('products.sub')}</p>
            <Ornament />
          </header>
        </Reveal>

        <div className="filters" role="group" aria-label={t('products.filterLabel')}>
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              className={`filters__btn${active === f ? ' is-active' : ''}`}
              aria-pressed={active === f}
              onClick={() => select(f)}
            >
              {t(`gender.${f}`)}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="empty">{t('products.empty')}</p>
        ) : (
          <div className="grid grid--products">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
