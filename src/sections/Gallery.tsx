import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { photoPath } from '@/lib/media'

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

    const tl = gsap.timeline({})
    tl.fromTo(
      Array.from(title.children),
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )

    tl.fromTo(
      Array.from(grid.children),
      { y: 32, opacity: 0, scale: 0.97 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.04,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      },
      '-=0.3'
    )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative w-full py-16 md:py-28 overflow-hidden"
      style={{ background: 'var(--deep-black)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(212,168,83,0.04) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 px-5 sm:px-6 md:px-10 max-w-6xl mx-auto">
        <div ref={titleRef} className="mb-8 md:mb-12">
          <span
            className="text-xs font-semibold tracking-[0.14em] uppercase block mb-4"
            style={{ color: 'var(--accent-gold)' }}
          >
            Портфолио
          </span>
          <h2
            className="text-[clamp(1.75rem,4.5vw,2.5rem)] font-light tracking-[-0.02em]"
            style={{ color: 'var(--text-primary)', lineHeight: 1.2 }}
          >
            Примеры работ
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-12 gap-2 md:gap-2.5 auto-rows-[160px] sm:auto-rows-[180px] md:auto-rows-[200px]"
        >
          {GRID_LAYOUT.map(({ id, className }) => (
            <div
              key={id}
              className={`relative overflow-hidden ${className}`}
              style={{ borderRadius: 12 }}
            >
              <img
                src={photoPath(id)}
                alt={`Пример работы ${id}`}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}