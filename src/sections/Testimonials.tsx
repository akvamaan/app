import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import { SectionBackground, SectionShell } from '@/components/SectionBackground'
import { photoPath } from '@/lib/media'

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const title = titleRef.current
    const carousel = carouselRef.current

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

    if (carousel) {
      tl.fromTo(
        carousel,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: carousel,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        },
        '-=0.25'
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
        src={photoPath(9)}
        alt="Интерьер коммерческого помещения"
        overlay="rgba(3,3,3,0.88)"
      />

      <div className="section-content w-full px-5 sm:px-6 md:px-10 max-w-6xl mx-auto">
        <div ref={titleRef} className="mb-8 md:mb-12 max-w-3xl">
          <span
            className="mb-3 block text-xs font-semibold tracking-[0.14em] uppercase"
            style={{ color: 'var(--accent-gold)' }}
          >
            Отзывы клиентов
          </span>
          <h2
            className="text-[clamp(1.75rem,4.5vw,2.25rem)] font-light tracking-[-0.02em]"
            style={{ color: 'var(--text-primary)', lineHeight: 1.2 }}
          >
            Что говорят клиенты после съёмки
          </h2>
        </div>

        <div ref={carouselRef}>
          <TestimonialsCarousel />
        </div>
      </div>
    </SectionShell>
  )
}
