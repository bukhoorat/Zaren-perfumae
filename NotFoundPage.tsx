import { Link } from 'react-router-dom'
import Ornament from '../components/Ornament'
import { usePageTitle } from '../hooks/usePageTitle'
import { useLang } from '../i18n/LanguageContext'

export default function NotFoundPage() {
  const { t } = useLang()
  usePageTitle(t('notfound.title'))

  return (
    <section className="section section--light page-top">
      <div className="container container--narrow center">
        <p className="notfound__code" dir="ltr">
          404
        </p>
        <h1 className="section__title">{t('notfound.title')}</h1>
        <Ornament />
        <p className="section__sub">{t('notfound.text')}</p>
        <Link to="/" className="btn btn--solid">
          {t('notfound.back')}
        </Link>
      </div>
    </section>
  )
}
