import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type KeyboardEvent,
} from 'react'
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { testimonials, type Testimonial } from '@/data/testimonials'
import { cn } from '@/lib/utils'

type EmblaApi = UseEmblaCarouselType[1]

interface TestimonialCardProps {
  testimonial: Testimonial
  isActive: boolean
}

const TestimonialCard = memo(({ testimonial, isActive }: TestimonialCardProps) => (
  <article
    className={cn(
      'glass-card glass-thick group relative min-h-[420px] p-6 md:p-8 transition-all duration-500 ease-out md:group-hover:-translate-y-1 md:group-hover:border-white/15',
      isActive
        ? 'translate-y-0 opacity-100'
        : 'translate-y-3 opacity-80'
    )}
    style={{ borderRadius: 28 }}
  >
    <span
      aria-hidden="true"
      className="pointer-events-none absolute right-6 top-5 select-none text-[112px] leading-none font-serif text-accent-gold/10"
    >
      “
    </span>

    <div className="relative z-10 flex h-full flex-col gap-6">
      <div className="flex items-center gap-4">
        <div
          className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full md:h-20 md:w-20"
          style={{
            border: '1px solid rgba(255,255,255,0.14)',
            boxShadow: '0 0 34px rgba(212,168,83,0.14)',
          }}
        >
          <img
            src={testimonial.photo}
            alt={`Фото клиента ${testimonial.name}`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        <div>
          <h3
            className="text-lg font-medium md:text-xl"
            style={{ color: 'var(--text-primary)' }}
          >
            {testimonial.name}
          </h3>
          <p
            className="mt-1 text-sm"
            style={{ color: 'var(--text-secondary)' }}
          >
            {testimonial.position}
          </p>
        </div>
      </div>

      <div className="flex-1">
        {testimonial.text.split('\n\n').map((paragraph) => (
          <p
            key={paragraph}
            className="text-base leading-relaxed md:text-lg"
            style={{ color: 'var(--text-primary)', lineHeight: 1.65 }}
          >
            {paragraph}
          </p>
        ))}
      </div>

      <div
        aria-hidden="true"
        className="h-px w-16 bg-accent-gold/30"
      />
    </div>
  </article>
))

TestimonialCard.displayName = 'TestimonialCard'

export default function TestimonialsCarousel() {
  const items = testimonials
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    skipSnaps: false,
  })

  const handleSelect = useCallback((api: EmblaApi) => {
    if (!api) return

    setSelectedIndex(api.selectedScrollSnap())
  }, [])

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index)
    },
    [emblaApi]
  )

  useEffect(() => {
    if (!emblaApi) return

    emblaApi.on('reInit', handleSelect)
    emblaApi.on('select', handleSelect)

    return () => {
      emblaApi.off('reInit', handleSelect)
      emblaApi.off('select', handleSelect)
    }
  }, [emblaApi, handleSelect])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        scrollPrev()
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext]
  )

  const dots = useMemo(
    () =>
      items.map((testimonial, index) => ({
        id: testimonial.id,
        index,
        label: testimonial.name,
      })),
    [items]
  )

  return (
    <div className="relative">
      <button
        type="button"
        className="absolute left-0 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white/90 backdrop-blur-xl transition-all duration-300 hover:border-accent-gold/50 hover:bg-accent-gold/15 hover:text-accent-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/50 disabled:pointer-events-none disabled:opacity-40 md:flex"
        onClick={scrollPrev}
        aria-label="Предыдущий отзыв"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div
        ref={emblaRef}
        className="overflow-hidden rounded-[28px] outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/50"
        role="region"
        aria-roledescription="carousel"
        aria-label="Отзывы клиентов"
        aria-live="polite"
        tabIndex={0}
        onKeyDownCapture={handleKeyDown}
      >
        <div className="flex touch-pan-y">
          {items.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="min-w-full px-0"
              role="group"
              aria-roledescription="slide"
              aria-label={`Отзыв ${index + 1} из ${items.length}`}
            >
              <TestimonialCard
                testimonial={testimonial}
                isActive={index === selectedIndex}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="absolute right-0 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white/90 backdrop-blur-xl transition-all duration-300 hover:border-accent-gold/50 hover:bg-accent-gold/15 hover:text-accent-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/50 disabled:pointer-events-none disabled:opacity-40 md:flex"
        onClick={scrollNext}
        aria-label="Следующий отзыв"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="mt-6 flex justify-center gap-2" aria-label="Выбор отзыва">
        {dots.map(({ id, index, label }) => (
          <button
            key={id}
            type="button"
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              index === selectedIndex
                ? 'w-8 bg-accent-gold'
                : 'w-2 bg-white/20 hover:bg-white/40'
            )}
            onClick={() => scrollTo(index)}
            aria-label={`Показать отзыв: ${label}`}
            aria-current={index === selectedIndex ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  )
}
