import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import type { TKey } from '../i18n/translations'
import Ornament from './Ornament'
import WhatsAppButton from './WhatsAppButton'

const footerLinks: { to: string; key: TKey }[] = [
  { to: '/products', key: 'nav.products' },
  { to: '/story', key: 'nav.story' },
  { to: '/guide', key: 'nav.guide' },
  { to: '/contact', key: 'nav.contact' },
]

export default function Footer() {
  const { t, formatNumber } = useLang()
  const year = formatNumber(new Date().getFullYear(), false)

  return (
    <footer className="site-footer">
      <div className="container">
        <Ornament />
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <p className="logo logo--footer">ZAREN</p>
            <p className="site-footer__slogan">BE REMEMBERED</p>
            <p className="site-footer__text">{t('footer.tagline')}</p>
          </div>

          <div>
            <h3 className="site-footer__title">{t('footer.links')}</h3>
            <ul className="site-footer__list">
              {footerLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{t(l.key)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="site-footer__title">{t('footer.order')}</h3>
            <WhatsAppButton variant="outline" size="sm" label={t('contact.whatsappBtn')} />
          </div>
        </div>

        <p className="site-footer__copy">
          © {year} ZAREN. {t('footer.rights')}
        </p>
      </div>
    </footer>
  )
}
