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

      <div className="section-content w-full px-6 md:px-12 flex flex-col items-center text-center">
        <div
          ref={cardRef}
          className="glass-card glass-thick w-full max-w-[720px] px-8 py-12 md:px-14 md:py-16 flex flex-col items-center gap-6"
          style={{ borderRadius: 28 }}
        >
          <h1
            ref={titleRef}
            className="text-[clamp(3.5rem,12vw,7rem)] font-extralight tracking-[-0.04em] leading-none"
            style={{ color: 'var(--text-primary)' }}
          >
            KAKOYTA
          </h1>

          <p
            ref={subtitleRef}
            className="text-base md:text-xl font-normal max-w-[560px]"
            style={{ color: 'var(--text-secondary)', lineHeight: 1.55 }}
          >
            Больше звонков по объекту начинается с качественной визуальной
            подачи. Фото, видео и 3D-туры для коммерческой недвижимости,
            которые помогают агентам, собственникам и бизнесу привлекать
            больше заинтересованных клиентов.
          </p>

          <p
            ref={locationRef}
            className="text-sm tracking-[0.12em] uppercase"
            style={{ color: 'var(--text-tertiary)' }}
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
