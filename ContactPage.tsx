import Ornament from '../components/Ornament'
import Reveal from '../components/Reveal'
import WhatsAppButton from '../components/WhatsAppButton'
import { siteConfig } from '../config/site'
import { usePageTitle } from '../hooks/usePageTitle'
import { useLang } from '../i18n/LanguageContext'

export default function ContactPage() {
  const { t, loc } = useLang()
  usePageTitle(t('contact.title'))

  const { email, instagram, phoneDisplay, address } = siteConfig.contact
  const addressText = loc(address)
  const hasDetails = Boolean(email || instagram || phoneDisplay || addressText)

  return (
    <section className="section section--light page-top">
      <div className="container container--narrow">
        <Reveal>
          <header className="section__head">
            <h1 className="section__title">{t('contact.title')}</h1>
            <p className="section__sub">{t('contact.sub')}</p>
            <Ornament />
          </header>
        </Reveal>

        <Reveal>
          <div className="panel panel--center">
            <h2 className="panel__title">{t('contact.whatsappTitle')}</h2>
            <p className="panel__text">{t('contact.whatsappText')}</p>
            <WhatsAppButton label={t('contact.whatsappBtn')} />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="panel">
            <h2 className="panel__title">{t('contact.detailsTitle')}</h2>
            {hasDetails ? (
              <ul className="contact-list">
                {email && (
                  <li>
                    <span className="contact-list__label">{t('contact.email')}</span>
                    <a href={`mailto:${email}`} dir="ltr">
                      {email}
                    </a>
                  </li>
                )}
                {instagram && (
                  <li>
                    <span className="contact-list__label">{t('contact.instagram')}</span>
                    <a
                      href={`https://instagram.com/${instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      dir="ltr"
                    >
                      @{instagram}
                    </a>
                  </li>
                )}
                {phoneDisplay && (
                  <li>
                    <span className="contact-list__label">{t('contact.phone')}</span>
                    <span dir="ltr">{phoneDisplay}</span>
                  </li>
                )}
                {addressText && (
                  <li>
                    <span className="contact-list__label">{t('contact.address')}</span>
                    <span>{addressText}</span>
                  </li>
                )}
              </ul>
            ) : (
              <p className="panel__text">{t('contact.empty')}</p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
