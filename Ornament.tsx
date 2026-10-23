/** خط تزئینی ظریف با لوزی طلایی در وسط (الهام از طراحی دهه‌های ۵۰ تا ۷۰) */
export default function Ornament({ className = '' }: { className?: string }) {
  return (
    <div className={`ornament ${className}`.trim()} aria-hidden="true">
      <span className="ornament__line" />
      <span className="ornament__diamond" />
      <span className="ornament__line" />
    </div>
  )
}
