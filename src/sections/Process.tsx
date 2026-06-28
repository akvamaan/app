import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SectionBackground, SectionShell } from '@/components/SectionBackground'
import { photoPath } from '@/lib/media'

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

    const tl = gsap.timeline({})
    if (title) {
      tl.fromTo(
        Array.from(title.children),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.08,
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
      tl.fromTo(
        Array.from(stepsEl.children),
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stepsEl,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        },
        '-=0.25'
      )
    }

    if (note) {
      tl.fromTo(
        note,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: note,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
        '-=0.2'
      )
    }

    return () => {
      tl.kill()
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

      <div className="section-content w-full px-5 sm:px-6 md:px-10 max-w-3xl mx-auto">
        <div ref={titleRef} className="mb-8 md:mb-10">
          <span
            className="text-xs font-semibold tracking-[0.14em] uppercase block mb-3"
            style={{ color: 'var(--accent-gold)' }}
          >
            Процесс
          </span>
          <h2
            className="text-[clamp(1.5rem,4vw,1.875rem)] font-light tracking-[-0.03em]"
            style={{ color: 'var(--text-primary)', lineHeight: 1.2 }}
          >
            <span className="text-gradient-gold">Как</span> проходит работа
          </h2>
        </div>

        <ol ref={stepsRef} className="flex flex-col gap-2.5 mb-7 md:mb-8">
          {steps.map((text, index) => (
            <li
              key={index}
              className="glass-card flex items-start gap-4 p-4 md:p-4.5"
              style={{ borderRadius: 14 }}
            >
              <span
                className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 text-sm font-medium"
                style={{
                  background: 'rgba(212,168,83,0.1)',
                  border: '1px solid rgba(212,168,83,0.25)',
                  color: 'var(--accent-gold)',
                }}
              >
                {index + 1}
              </span>
              <p
                className="text-sm pt-1"
                style={{ color: 'var(--text-primary)', lineHeight: 1.5 }}
              >
                {text}
              </p>
            </li>
          ))}
        </ol>

        <p
          ref={noteRef}
          className="glass-subtle px-5 py-3.5 text-sm"
          style={{
            borderRadius: 14,
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
          }}
        >
          Срок готовности материалов — до 3 дней после съёмки.
        </p>
      </div>
    </SectionShell>
  )
}