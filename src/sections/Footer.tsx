export default function Footer() {
  return (
    <footer
      className="w-full py-12 px-6 md:px-12"
      style={{ background: 'var(--deep-black)' }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h3
            className="text-lg font-medium tracking-[0.08em] mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            КАКОЙ-ТО
          </h3>
          <p
            className="text-xs"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Фото, видео и 3D-туры для коммерческой недвижимости ·
            Санкт-Петербург и Ленинградская область
          </p>
        </div>

        <div
          className="w-full h-px my-6"
          style={{ background: 'var(--glass-border)' }}
        />

        <div className="flex justify-between items-center">
          <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            &copy; 2026
          </span>
          <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            Санкт-Петербург
          </span>
        </div>
      </div>
    </footer>
  )
}
