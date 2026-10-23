import { siteConfig } from '../config/site'
import { useLang } from '../i18n/LanguageContext'

interface SampleNoticeProps {
  /** متن دلخواه؛ اگر ندهید متن پیش‌فرض نمایش داده می‌شود */
  text?: string
}

/** برچسب کوچک «محتوای نمونه». با showSampleNotice در src/config/site.ts خاموش می‌شود. */
export default function SampleNotice({ text }: SampleNoticeProps) {
  const { t } = useLang()
  if (!siteConfig.showSampleNotice) return null
  return <p className="sample-notice">{text ?? t('sample.notice')}</p>
}
