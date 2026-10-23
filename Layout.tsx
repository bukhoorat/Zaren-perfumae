import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import Footer from './Footer'
import Header from './Header'

/** با هر تغییر صفحه، به بالای صفحه برمی‌گردد */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function Layout() {
  const { t } = useLang()
  return (
    <div className="app">
      <a className="skip-link" href="#main">
        {t('a11y.skip')}
      </a>
      <ScrollToTop />
      <Header />
      <main id="main" className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
