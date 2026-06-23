import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionBackground, SectionShell } from '@/components/SectionBackground'
import TelegramButton from '@/components/TelegramButton'
import { HERO_VIDEO, TELEGRAM_URL } from '@/lib/media'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const locationRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const tl = gsap.timeline({ delay: 0.3 })
    tl.fromTo(
      card,
      { scale: 0.92, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.1, ease: 'power3.out' }
    )
      .fromTo(
        titleRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.7'
      )
      .fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.45'
      )
      .fromTo(
        locationRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.35'
      )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <SectionShell sectionRef={sectionRef} className="justify-center">
      <SectionBackground
        sectionRef={sectionRef}
        type="video"
        src={HERO_VIDEO}
        overlay="linear-gradient(to bottom, rgba(3,3,3,0.25) 0%, rgba(3,3,3,0.55) 60%, rgba(3,3,3,0.92) 100%)"
        parallax={-8}
      />

      <div className="section-content w-full px-6 md:px-12 flex flex-col items-start text-left">
        <div
          ref={cardRef}
          className="glass-card glass-thick w-full max-w-[720px] px-6 py-8 md:px-8 md:py-10 flex flex-col items-center justify-center gap-4"
          style={{ borderRadius: 28 }}
        >
          <h1
  ref={titleRef}
  className="text-3xl md:text-4xl font-medium tracking-[-0.02em] mb-6 max-w-[640px] text-center"
  style={{ color: 'var(--text-primary)', lineHeight: 1.2, textWrap: 'balance' }}
>
  «Качественная визуальная подача — первый шаг к большему количеству обращений по объекту» — 
  <span style={{ color: '#bc9549' }}>
    {" "}какой-то фотограф
  </span>
</h1>

          <p
            ref={subtitleRef}
            className="text-sm md:text-lg font-normal max-w-[600px] mx-auto text-center"
            style={{ color: 'var(--text-primary)', lineHeight: 1.65 }}
          >
            <span className="text-primary font-semibold tracking-[-0.01em]" style={{ textWrap: 'pretty' }}>
              Фото, видео и 3D-туры для коммерческой недвижимости. {" "}<br />
            </span>
             Помогаю агентам, собственникам и бизнесу привлекать<br /> больше заинтересованных клиентов.
          </p>

          <p
            ref={locationRef}
            className="text-xs tracking-[0.12em] uppercase mt-4"
            style={{ color: 'var(--text-secondary)' }}
          >
            Санкт-Петербург и Ленинградская область
          </p>

          <TelegramButton href={TELEGRAM_URL} className="mt-2">
            Получить консультацию в Telegram
          </TelegramButton>
        </div>
      </div>
    </SectionShell>
  )
}