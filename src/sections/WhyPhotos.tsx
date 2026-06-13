import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionBackground, SectionShell } from '@/components/SectionBackground'
import TelegramButton from '@/components/TelegramButton'
import { photoPath, TELEGRAM_URL } from '@/lib/media'

gsap.registerPlugin(ScrollTrigger)

export default function WhyPhotos() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const elements = [titleRef.current, textRef.current, buttonRef.current].filter(
      Boolean
    )
    gsap.fromTo(
      elements,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [])

  return (
    <SectionShell sectionRef={sectionRef}>
      <SectionBackground
        sectionRef={sectionRef}
        src={photoPath(2)}
        alt="Офисное пространство"
        overlay="rgba(3,3,3,0.82)"
      />

      <div className="section-content w-full px-6 md:px-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <h2
              ref={titleRef}
              className="text-2xl md:text-4xl font-medium tracking-[-0.02em] mb-6"
              style={{ color: 'var(--text-primary)', lineHeight: 1.2 }}
            >
              Почему качественные фотографии важны
            </h2>
            <p
              ref={textRef}
              className="text-base md:text-lg"
              style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}
            >
              Потенциальный клиент принимает решение открыть объявление за
              несколько секунд. Качественные фотографии помогают выделиться
              среди конкурентов, сформировать доверие к объекту ещё до
              просмотра, и, в конечном счёте, <strong>продать его по наиболее
              справедливой цене.</strong>
            </p>
          </div>

          <div ref={buttonRef} className="flex lg:justify-end">
            <TelegramButton href={TELEGRAM_URL}>
              Обсудить объект в Telegram
            </TelegramButton>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
