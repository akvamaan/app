import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { SectionBackground, SectionShell } from '@/components/SectionBackground'
import { photoPath } from '@/lib/media'

const benefits = [
  'Больше просмотров объявления',
  'Привлекают заинтересованную и платежеспособную аудиторию',
  'Более презентабельная подача объекта создаёт условия для справедливой сделки',
  'Усиление бренда агентства и доверия к нему, которые способствуют долгосрочному сотрудничеству с собственниками',
]

export default function ROI() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const discountRef = useRef<HTMLDivElement>(null)
  const [discountNumber, setDiscountNumber] = useState(0)

  useEffect(() => {
    const title = titleRef.current
    const list = listRef.current
    const discount = discountRef.current

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

    if (list) {
      tl.fromTo(
        Array.from(list.children),
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: list,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        },
        '-=0.3'
      )
    }

    if (discount) {
      tl.fromTo(
        discount,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: discount,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          onComplete: () => {
            const obj = { value: 0 }
            gsap.to(obj, {
              value: 50,
              duration: 1,
              ease: 'power2.out',
              onUpdate: () => setDiscountNumber(Math.round(obj.value)),
            })
          },
        },
        '-=0.3'
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
        src={photoPath(5)}
        alt="Коммерческий интерьер"
        overlay="rgba(3,3,3,0.88)"
      />

      <div className="section-content w-full px-5 sm:px-6 md:px-10 max-w-3xl mx-auto">
        <div ref={titleRef} className="mb-8 md:mb-10">
          <h2
            className="text-[clamp(1.75rem,4.5vw,2.25rem)] font-medium tracking-[-0.02em]"
            style={{ color: 'var(--text-primary)', lineHeight: 1.2 }}
          >
            Почему профессиональная съёмка окупается
          </h2>
        </div>

        <ul ref={listRef} className="flex flex-col gap-2.5 mb-7 md:mb-8">
          {benefits.map((text) => (
            <li
              key={text}
              className="glass-card flex items-start gap-3 p-4 md:p-4.5"
              style={{ borderRadius: 14 }}
            >
              <span
                className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: 'var(--accent-gold)' }}
              />
              <span
                className="text-sm md:text-base"
                style={{ color: 'var(--text-primary)', lineHeight: 1.5 }}
              >
                {text}
              </span>
            </li>
          ))}
        </ul>

        <div
          ref={discountRef}
          className="glass-card glass-accent p-6 md:p-8"
          style={{ borderRadius: 20 }}
        >
          <p
            className="text-xs font-semibold tracking-[0.14em] uppercase mb-3"
            style={{ color: 'var(--accent-gold)' }}
          >
            Скидка 50% на первый заказ
          </p>
          <div className="flex items-baseline gap-2 mb-4">
            <span
              className="text-5xl md:text-7xl font-extralight tracking-[-0.04em]"
              style={{
                color: 'var(--accent-gold)',
                lineHeight: 1,
              }}
            >
              −{discountNumber}%
            </span>
          </div>
          <p
            className="text-sm md:text-base"
            style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}
          >
            Для новых клиентов действует скидка 50% на первый заказ
            стоимостью до 25&nbsp;000 рублей.
          </p>
        </div>
      </div>
    </SectionShell>
  )
}