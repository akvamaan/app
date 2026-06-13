import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionBackground, SectionShell } from '@/components/SectionBackground'
import { photoPath } from '@/lib/media'

gsap.registerPlugin(ScrollTrigger)

const benefits = [
  'Больше просмотров объявления',
  'Более заинтересованные обращения',
  'Меньше нецелевых показов',
  'Более презентабельная подача объекта',
  'Усиление бренда агентства или собственника',
  'Повышение доверия к объявлению',
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

    if (list) {
      gsap.fromTo(
        list.children,
        { x: -24, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: list,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    if (discount) {
      gsap.fromTo(
        discount,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
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
              duration: 1.2,
              ease: 'power2.out',
              onUpdate: () => setDiscountNumber(Math.round(obj.value)),
            })
          },
        }
      )
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

      <div className="section-content w-full px-6 md:px-12 max-w-3xl mx-auto">
        <div ref={titleRef} className="mb-8 md:mb-10">
          <h2
            className="text-3xl md:text-[42px] font-medium tracking-[-0.02em]"
            style={{ color: 'var(--text-primary)', lineHeight: 1.2 }}
          >
            Почему профессиональная съёмка окупается
          </h2>
        </div>

        <ul ref={listRef} className="flex flex-col gap-3 mb-8">
          {benefits.map((text) => (
            <li
              key={text}
              className="glass-card flex items-start gap-4 p-4 md:p-5"
              style={{ borderRadius: 16 }}
            >
              <span
                className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: 'var(--accent-gold)' }}
              />
              <span
                className="text-sm md:text-base"
                style={{ color: 'var(--text-primary)', lineHeight: 1.55 }}
              >
                {text}
              </span>
            </li>
          ))}
        </ul>

        <div
          ref={discountRef}
          className="glass-card glass-accent p-8 md:p-10"
          style={{ borderRadius: 24 }}
        >
          <p
            className="text-xs font-semibold tracking-[0.14em] uppercase mb-3"
            style={{ color: 'var(--accent-gold)' }}
          >
            Скидка 50% на первый заказ
          </p>
          <div className="flex items-baseline gap-2 mb-4">
            <span
              className="text-6xl md:text-8xl font-extralight tracking-[-0.04em]"
              style={{
                color: 'var(--accent-gold)',
                lineHeight: 1,
                textShadow: '0 0 60px rgba(212,168,83,0.2)',
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
