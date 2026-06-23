import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionBackground, SectionShell } from '@/components/SectionBackground'
import { ABOUT_VIDEO, AVATAR } from '@/lib/media'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const avatarRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    gsap.fromTo(
      card,
      { y: 40, opacity: 0, scale: 0.97 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    )

    const inner = [avatarRef.current, titleRef.current, ...(textRef.current?.children ?? [])]
    gsap.fromTo(
      inner.filter(Boolean),
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.55,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.15,
        scrollTrigger: {
          trigger: card,
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
        type="video"
        src={ABOUT_VIDEO}
        overlay="rgba(3,3,3,0.78)"
        parallax={-10}
      />

      <div className="section-content w-full px-6 md:px-12 flex justify-center">
        <div
          ref={cardRef}
          className="glass-card glass-thick w-full max-w-[560px] p-8 md:p-10 flex flex-col items-center text-center"
          style={{ borderRadius: 28 }}
        >
          <div
            ref={avatarRef}
            className="relative mb-6 w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden"
            style={{
              border: '2px solid rgba(255,255,255,0.12)',
              boxShadow: '0 0 40px rgba(212,168,83,0.12)',
            }}
          >
            <img
              src={AVATAR}
              alt="Фотограф КАКОЙ-ТО"
              className="w-full h-full object-cover"
            />
          </div>

          <h2
            ref={titleRef}
            className="text-2xl md:text-3xl font-medium tracking-[0.06em] uppercase mb-5"
            style={{ color: 'var(--text-primary)' }}
          >
            Кто такой «какой-то»?
          </h2>

          <div ref={textRef} className="flex flex-col gap-4">
            <p
              className="text-sm md:text-base"
              style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}
            >
              Привет, меня зовут Тимур. Более 5 лет я работаю с визуальным контентом для бизнеса. В их
              числе студии дизайна, бренды одежды и инвестиционные компании.
            </p>
            <p
              className="text-sm md:text-base"
              style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}
            >
              Создаю фото, видео и 3D-туры, которые помогают выгодно
              представить объект и привлечь больше внимания к объявлению.
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
