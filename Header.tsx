import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import type { TKey } from '../i18n/translations'
import MusicToggle from './MusicToggle'

const links: { to: string; key: TKey; end?: boolean }[] = [
  { to: '/', key: 'nav.home', end: true },
  { to: '/products', key: 'nav.products' },
  { to: '/story', key: 'nav.story' },
  { to: '/guide', key: 'nav.guide' },
  { to: '/contact', key: 'nav.contact' },
]

export default function Header() {
  const { t, toggleLang } = useLang()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="container site-header__inner">
        <Link to="/" className="logo" aria-label="ZAREN">
          ZAREN
        </Link>

        <nav className="nav" aria-label={t('a11y.nav')} id="main-nav">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => `nav__link${isActive ? ' is-active' : ''}`}
            >
              {t(l.key)}
            </NavLink>
          ))}
        </nav>

        <div className="site-header__tools">
          <MusicToggle />
          <button
            type="button"
            className="lang-btn"
            onClick={toggleLang}
            aria-label={t('a11y.langSwitch')}
            title={t('a11y.langSwitch')}
          >
            {t('lang.label')}
          </button>
          <button
            type="button"
            className="burger"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="main-nav"
            aria-label={t('a11y.menu')}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
