import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionBackground, SectionShell } from '@/components/SectionBackground'
import TelegramButton from '@/components/TelegramButton'
import { CTA_VIDEO, TELEGRAM_URL } from '@/lib/media'

gsap.registerPlugin(ScrollTrigger)

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const elements = [
      titleRef.current,
      subtitleRef.current,
      buttonRef.current,
    ].filter(Boolean)

    gsap.fromTo(
      elements,
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [])

  return (
    <SectionShell sectionRef={sectionRef} className="justify-center">
      <SectionBackground
        sectionRef={sectionRef}
        type="video"
        src={CTA_VIDEO}
        overlay="linear-gradient(to bottom, rgba(3,3,3,0.65) 0%, rgba(3,3,3,0.88) 100%)"
      />

      <div className="section-content w-full px-6 md:px-12 flex flex-col items-center text-center max-w-xl mx-auto">
        <h2
          ref={titleRef}
          className="text-3xl md:text-[42px] font-medium tracking-[-0.02em] mb-5"
          style={{ color: 'var(--text-primary)', lineHeight: 1.2 }}
        >
          Остались вопросы?
        </h2>

        <p
          ref={subtitleRef}
          className="text-base md:text-lg mb-10"
          style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}
        >
          Напишите в Telegram — обсудим ваш объект и подберём оптимальный
          формат съёмки.
        </p>

        <div ref={buttonRef}>
          <TelegramButton href={TELEGRAM_URL} className="animate-pulse-glow">
            Получить консультацию в Telegram
          </TelegramButton>
        </div>
      </div>
    </SectionShell>
  )
}
