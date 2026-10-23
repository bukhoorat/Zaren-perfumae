import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'

// فونت‌ها از داخل پروژه بارگذاری می‌شوند (بدون وابستگی به سرویس‌های خارجی مثل Google Fonts)
import '@fontsource/vazirmatn/300.css'
import '@fontsource/vazirmatn/400.css'
import '@fontsource/vazirmatn/500.css'
import '@fontsource/vazirmatn/700.css'
import '@fontsource/cormorant-garamond/400.css'
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/600.css'
import '@fontsource/jost/300.css'
import '@fontsource/jost/400.css'
import '@fontsource/jost/500.css'

import './styles/global.css'

import App from './App'
import { siteConfig } from './config/site'
import { LanguageProvider } from './i18n/LanguageContext'

const container = document.getElementById('root')
if (!container) throw new Error('Root element #root not found')

const app = (
  <LanguageProvider>
    <App />
  </LanguageProvider>
)

createRoot(container).render(
  <StrictMode>
    {siteConfig.routerMode === 'hash' ? <HashRouter>{app}</HashRouter> : <BrowserRouter>{app}</BrowserRouter>}
  </StrictMode>,
)
