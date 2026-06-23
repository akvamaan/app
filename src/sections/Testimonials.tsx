import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import { SectionBackground, SectionShell } from '@/components/SectionBackground'
import { photoPath } from '@/lib/media'

gsap.registerPlugin(ScrollTrigger)

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const title = titleRef.current
    const carousel = carouselRef.current

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

    if (carousel) {
      gsap.fromTo(
        carousel,
        { y: 34, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: carousel,
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
        src={photoPath(9)}
        alt="Интерьер коммерческого помещения"
        overlay="rgba(3,3,3,0.88)"
      />

      <div className="section-content w-full px-6 md:px-12 max-w-6xl mx-auto">
        <div ref={titleRef} className="mb-10 md:mb-14 max-w-3xl">
          <span
            className="mb-4 block text-xs font-semibold tracking-[0.14em] uppercase"
            style={{ color: 'var(--accent-gold)' }}
          >
            Отзывы клиентов
          </span>
          <h2
            className="text-3xl font-light tracking-[-0.02em] md:text-[42px]"
            style={{ color: 'var(--text-primary)', lineHeight: 1.15 }}
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
