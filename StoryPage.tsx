import { Link } from 'react-router-dom'
import Ornament from '../components/Ornament'
import Reveal from '../components/Reveal'
import SampleNotice from '../components/SampleNotice'
import { usePageTitle } from '../hooks/usePageTitle'
import { useLang } from '../i18n/LanguageContext'

export default function StoryPage() {
  const { t } = useLang()
  usePageTitle(t('story.title'))

  return (
    <>
      <section className="section section--dark page-top story-hero">
        <div className="container container--narrow center">
          <Reveal>
            <p className="kicker">ZAREN</p>
            <h1 className="section__title section__title--xl">{t('story.title')}</h1>
            <p className="hero__slogan" dir="ltr">
              {t('story.sub')}
            </p>
            <Ornament />
          </Reveal>
        </div>
      </section>

      <section className="section section--light">
        <div className="container container--narrow">
          <Reveal>
            <p className="story__lead">{t('story.p1')}</p>
          </Reveal>
          <Reveal delay={80}>
            <p className="story__p">{t('story.p2')}</p>
          </Reveal>
          <Reveal delay={160}>
            <p className="story__p">{t('story.p3')}</p>
          </Reveal>
          <SampleNotice text={t('story.note')} />
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container">
          <Reveal>
            <header className="section__head">
              <h2 className="section__title">{t('story.valuesTitle')}</h2>
              <Ornament />
            </header>
          </Reveal>
          <div className="grid grid--values">
            {(['v1', 'v2', 'v3'] as const).map((v, i) => (
              <Reveal key={v} delay={i * 100}>
                <div className="value">
                  <h3 className="value__title">{t(`story.${v}.title`)}</h3>
                  <p className="value__text">{t(`story.${v}.text`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="section__foot">
            <Link to="/products" className="btn btn--solid">
              {t('story.cta')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
