import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { siteConfig } from '../config/site'
import type { Lang, Localized } from '../types'
import { translations } from './translations'
import type { TKey } from './translations'

const STORAGE_KEY = 'zaren-lang'

interface LanguageContextValue {
  lang: Lang
  dir: 'rtl' | 'ltr'
  setLang: (lang: Lang) => void
  toggleLang: () => void
  /** ترجمه یک کلید ثابت */
  t: (key: TKey) => string
  /** انتخاب متن دوزبانه داده‌ها (مثل نام محصول) */
  loc: (value: Localized) => string
  /** قیمت با فرمت مناسب زبان */
  formatPrice: (price: number) => string
  /** عدد با ارقام مناسب زبان */
  formatNumber: (n: number, grouping?: boolean) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readInitialLang(): Lang {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'fa' || saved === 'en') return saved
  } catch {
    /* localStorage ممکن است در دسترس نباشد */
  }
  return siteConfig.defaultLang
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang)
  const dir: 'rtl' | 'ltr' = lang === 'fa' ? 'rtl' : 'ltr'

  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = dir
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* نادیده گرفته می‌شود */
    }
  }, [lang, dir])

  const setLang = useCallback((next: Lang) => setLangState(next), [])
  const toggleLang = useCallback(() => setLangState((cur) => (cur === 'fa' ? 'en' : 'fa')), [])

  const value = useMemo<LanguageContextValue>(() => {
    const locale = lang === 'fa' ? 'fa-IR' : 'en-US'
    const formatNumber = (n: number, grouping = true) =>
      new Intl.NumberFormat(locale, { useGrouping: grouping }).format(n)
    return {
      lang,
      dir,
      setLang,
      toggleLang,
      t: (key) => translations[lang][key],
      loc: (v) => v[lang],
      formatNumber,
      formatPrice: (price) =>
        lang === 'fa' ? `${formatNumber(price)} تومان` : `${formatNumber(price)} Toman`,
    }
  }, [lang, dir, setLang, toggleLang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>')
  return ctx
}
