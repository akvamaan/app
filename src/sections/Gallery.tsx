import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { photoPath } from '@/lib/media'

gsap.registerPlugin(ScrollTrigger)

const GRID_LAYOUT: { id: number; className: string }[] = [
  { id: 1, className: 'col-span-12 md:col-span-8 row-span-2' },
  { id: 2, className: 'col-span-6 md:col-span-4' },
  { id: 3, className: 'col-span-6 md:col-span-4' },
  { id: 4, className: 'col-span-6 md:col-span-5' },
  { id: 5, className: 'col-span-6 md:col-span-7' },
  { id: 6, className: 'col-span-12 md:col-span-6' },
  { id: 7, className: 'col-span-12 md:col-span-6' },
  { id: 8, className: 'col-span-6 md:col-span-4' },
  { id: 9, className: 'col-span-6 md:col-span-4' },
  { id: 10, className: 'col-span-12 md:col-span-4' },
  { id: 11, className: 'col-span-6 md:col-span-5' },
  { id: 12, className: 'col-span-6 md:col-span-7' },
  { id: 13, className: 'col-span-6 md:col-span-6' },
  { id: 14, className: 'col-span-6 md:col-span-6' },
]

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const title = titleRef.current
    const grid = gridRef.current
    if (!title || !grid) return

    gsap.fromTo(
      title.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )

    gsap.fromTo(
      grid.children,
      { y: 40, opacity: 0, scale: 0.97 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.65,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [])

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 overflow-hidden"
      style={{ background: 'var(--deep-black)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(212,168,83,0.04) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 px-6 md:px-12 max-w-6xl mx-auto">
        <div ref={titleRef} className="mb-10 md:mb-14">
          <span
            className="text-xs font-semibold tracking-[0.14em] uppercase block mb-4"
            style={{ color: 'var(--accent-gold)' }}
          >
            Портфолио
          </span>
          <h2
            className="text-3xl md:text-5xl font-light tracking-[-0.02em]"
            style={{ color: 'var(--text-primary)', lineHeight: 1.15 }}
          >
            Примеры работ
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-12 gap-2 md:gap-3 auto-rows-[180px] md:auto-rows-[220px]"
        >
          {GRID_LAYOUT.map(({ id, className }) => (
            <div
              key={id}
              className={`relative overflow-hidden group ${className}`}
              style={{ borderRadius: 16 }}
            >
              <img
                src={photoPath(id)}
                alt={`Пример работы ${id}`}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(3,3,3,0.45) 0%, transparent 45%)',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
