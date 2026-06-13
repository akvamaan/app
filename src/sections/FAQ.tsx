import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { SectionBackground, SectionShell } from '@/components/SectionBackground'
import { photoPath } from '@/lib/media'

gsap.registerPlugin(ScrollTrigger)

const faqItems = [
  {
    question: 'Нужно ли готовить помещение?',
    answer:
      'Да. Чем аккуратнее выглядит объект, тем лучше будет результат съёмки. Перед съёмкой рекомендуется провести уборку и убрать лишние предметы.',
  },
  {
    question: 'Когда будут готовы материалы?',
    answer:
      'Готовые материалы передаются в течение трёх дней после съёмки.',
  },
  {
    question: 'Можно ли проводить съёмку вечером?',
    answer:
      'Да. Однако для большинства объектов рекомендуется дневное время. Естественный свет позволяет показать помещение более объёмным, светлым и привлекательным.',
  },
  {
    question: 'Делаете ли вы видео?',
    answer:
      'Да. Помимо фотографии доступны видеоролики и 3D-туры. Формат подбирается индивидуально под задачи объекта.',
  },
  {
    question: 'Работаете ли под процент или пост-оплате?',
    answer:
      'Нет. Стоимость рассчитывается индивидуально для каждого проекта. Я отвечаю за качественную визуальную подачу объекта, которая помогает привлечь внимание и повысить доверие к объявлению.'
  },
]

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const accordionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const title = titleRef.current
    const accordion = accordionRef.current

    if (title) {
      gsap.fromTo(
        title.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
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

    if (accordion) {
      gsap.fromTo(
        accordion,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: accordion,
            start: 'top 78%',
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
        src={photoPath(8)}
        alt="Архитектурный интерьер"
        overlay="rgba(3,3,3,0.88)"
      />

      <div className="section-content w-full px-6 md:px-12 max-w-2xl mx-auto">
        <div ref={titleRef} className="mb-8 md:mb-10 text-center">
          <h2
            className="text-2xl md:text-4xl font-medium tracking-[0.04em] uppercase"
            style={{ color: 'var(--text-primary)' }}
          >
            Частые вопросы
          </h2>
        </div>

        <div
          ref={accordionRef}
          className="glass-card glass-thick px-6 md:px-8"
          style={{ borderRadius: 24 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`item-${index}`}
                className="border-white/[0.06]"
              >
                <AccordionTrigger
                  className="text-base md:text-lg font-medium hover:no-underline py-5"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent
                  className="text-sm md:text-base pb-5"
                  style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}
                >
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </SectionShell>
  )
}
