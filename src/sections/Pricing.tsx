import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionBackground, SectionShell } from '@/components/SectionBackground'
import TelegramButton from '@/components/TelegramButton'
import { photoPath, TELEGRAM_URL } from '@/lib/media'

gsap.registerPlugin(ScrollTrigger)

const includes = [
  'выезд на объект',
  'профессиональная съёмка',
  'обработка, ретушь и цветокоррекция фотографий',
  'подготовка материалов для публикации',
  'передача файлов через облако',
]

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const content = contentRef.current
    if (!content) return

    gsap.fromTo(
      content.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: content,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [])

  return (
    <SectionShell sectionRef={sectionRef}>
      <SectionBackground
        sectionRef={sectionRef}
        src={photoPath(7)}
        alt="Рабочее пространство"
        overlay="rgba(3,3,3,0.86)"
      />

      <div className="section-content w-full px-6 md:px-12 max-w-2xl mx-auto">
        <div
          ref={contentRef}
          className="glass-card glass-thick p-8 md:p-10"
          style={{ borderRadius: 28 }}
        >
          <h2
            className="text-2xl md:text-4xl font-medium tracking-[0.04em] uppercase mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Стоимость
          </h2>

          <p
            className="text-lg md:text-xl mb-8"
            style={{ color: 'var(--text-primary)', lineHeight: 1.45 }}
          >
            От{' '}
            <span className="text-gradient-gold font-medium">10&nbsp;000</span>{' '}
            рублей за типовой объект площадью до 200&nbsp;м².
          </p>

          <p
            className="text-sm font-semibold tracking-[0.08em] uppercase mb-4"
            style={{ color: 'var(--accent-gold)' }}
          >
            В стоимость входит:
          </p>

          <ul className="flex flex-col gap-2.5 mb-8">
            {includes.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm md:text-base"
                style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}
              >
                <span
                  className="mt-2 w-1 h-1 rounded-full shrink-0"
                  style={{ background: 'var(--accent-gold)' }}
                />
                {item}
              </li>
            ))}
          </ul>

          <p
            className="text-sm mb-8"
            style={{ color: 'var(--text-tertiary)', lineHeight: 1.55 }}
          >
            Итоговый объём материалов зависит от площади и особенностей объекта.
          </p>

          <TelegramButton href={TELEGRAM_URL}>
            Узнать стоимость съёмки
          </TelegramButton>
        </div>
      </div>
    </SectionShell>
  )
}
