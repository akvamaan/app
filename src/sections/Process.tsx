import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionBackground, SectionShell } from '@/components/SectionBackground'
import { photoPath } from '@/lib/media'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  'Обсуждаем задачу в чате или по телефону.',
  'Согласовываем дату и время съёмки.',
  'Провожу съёмку объекта.',
  'Обрабатываю материалы и подготавливаю их к публикации.',
  'Передаю готовые фотографии, видео и дополнительные материалы в удобном формате для размещения на сайтах, в объявлениях и презентациях.',
]

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLOListElement>(null)
  const noteRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const title = titleRef.current
    const stepsEl = stepsRef.current
    const note = noteRef.current

    if (title) {
      gsap.fromTo(
        title.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    if (stepsEl) {
      gsap.fromTo(
        stepsEl.children,
        { x: -28, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stepsEl,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    if (note) {
      gsap.fromTo(
        note,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: note,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }
  }, [])

  return (
    <SectionShell sectionRef={sectionRef}>
      <SectionBackground
        sectionRef={sectionRef}
        src={photoPath(6)}
        alt="Переговорная комната"
        overlay="rgba(3,3,3,0.87)"
      />

      <div className="section-content w-full px-6 md:px-12 max-w-3xl mx-auto">
        <div ref={titleRef} className="mb-10 md:mb-12">
          <span
            className="text-xs font-semibold tracking-[0.14em] uppercase block mb-3"
            style={{ color: 'var(--accent-gold)' }}
          >
            Процесс
          </span>
          <h2
            className="text-[clamp(2rem,5vw,3rem)] font-light tracking-[-0.03em]"
            style={{ color: 'var(--text-primary)', lineHeight: 1.15 }}
          >
            <span className="text-gradient-gold">Как</span> проходит работа
          </h2>
        </div>

        <ol ref={stepsRef} className="flex flex-col gap-3 mb-8">
          {steps.map((text, index) => (
            <li
              key={index}
              className="glass-card flex items-start gap-5 p-5 md:p-6"
              style={{ borderRadius: 18 }}
            >
              <span
                className="flex items-center justify-center w-9 h-9 rounded-full shrink-0 text-sm font-medium"
                style={{
                  background: 'rgba(212,168,83,0.1)',
                  border: '1px solid rgba(212,168,83,0.25)',
                  color: 'var(--accent-gold)',
                }}
              >
                {index + 1}
              </span>
              <p
                className="text-sm md:text-base pt-1.5"
                style={{ color: 'var(--text-primary)', lineHeight: 1.55 }}
              >
                {text}
              </p>
            </li>
          ))}
        </ol>

        <p
          ref={noteRef}
          className="glass-subtle px-6 py-4 text-sm md:text-base"
          style={{
            borderRadius: 16,
            color: 'var(--text-secondary)',
            lineHeight: 1.55,
          }}
        >
          Срок готовности материалов — до 3 дней после съёмки.
        </p>
      </div>
    </SectionShell>
  )
}
