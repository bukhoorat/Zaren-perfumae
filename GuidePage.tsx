import Ornament from '../components/Ornament'
import Reveal from '../components/Reveal'
import SampleNotice from '../components/SampleNotice'
import WhatsAppButton from '../components/WhatsAppButton'
import { usePageTitle } from '../hooks/usePageTitle'
import { useLang } from '../i18n/LanguageContext'

const steps = ['step1', 'step2', 'step3', 'step4'] as const
const faqs = ['1', '2', '3', '4', '5', '6'] as const

export default function GuidePage() {
  const { t, formatNumber } = useLang()
  usePageTitle(t('guide.title'))

  return (
    <>
      <section className="section section--light page-top">
        <div className="container container--narrow">
          <Reveal>
            <header className="section__head">
              <h1 className="section__title">{t('guide.title')}</h1>
              <p className="section__sub">{t('guide.sub')}</p>
              <Ornament />
            </header>
          </Reveal>

          <h2 className="subhead">{t('guide.howTitle')}</h2>
          <ol className="steps">
            {steps.map((s, i) => (
              <Reveal key={s} delay={i * 80}>
                <li className="steps__item">
                  <span className="steps__num" aria-hidden="true">
                    {formatNumber(i + 1, false)}
                  </span>
                  <div>
                    <h3 className="steps__title">{t(`guide.${s}.title`)}</h3>
                    <p className="steps__text">{t(`guide.${s}.text`)}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container container--narrow">
          <h2 className="subhead">{t('guide.faqTitle')}</h2>
          <div className="faq">
            {faqs.map((n) => (
              <details key={n} className="faq__item">
                <summary className="faq__q">{t(`faq.${n}.q`)}</summary>
                <p className="faq__a">{t(`faq.${n}.a`)}</p>
              </details>
            ))}
          </div>
          <SampleNotice text={t('guide.faqNote')} />
          <div className="section__foot">
            <WhatsAppButton label={t('contact.whatsappBtn')} />
          </div>
        </div>
      </section>
    </>
  )
}
