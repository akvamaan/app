import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SectionBackground, SectionShell } from '@/components/SectionBackground'
import TelegramButton from '@/components/TelegramButton'
import { photoPath, TELEGRAM_URL } from '@/lib/media'

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
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.55,
        stagger: 0.08,
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

      <div className="section-content w-full px-5 sm:px-6 md:px-10 max-w-6xl mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          <div>
            <h2
              ref={titleRef}
              className="text-[clamp(1.5rem,4vw,1.75rem)] font-medium tracking-[-0.02em] mb-5"
              style={{ color: 'var(--text-primary)', lineHeight: 1.25 }}
            >
              Почему качественные фотографии важны
            </h2>
            <p
              ref={textRef}
              className="text-sm md:text-base"
              style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}
            >
              Потенциальный клиент принимает решение открыть объявление за
              несколько секунд. Качественные фотографии помогают выделиться
              среди конкурентов, сформировать доверие к объекту ещё до
              просмотра, и, в конечном счёте, <strong>продать его по наиболее справедливой цене.</strong>
            </p>
          </div>

          <div ref={buttonRef} className="flex w-full lg:justify-end">
            <TelegramButton href={TELEGRAM_URL} className="w-full lg:w-auto">
              Обсудить объект в Telegram
            </TelegramButton>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}