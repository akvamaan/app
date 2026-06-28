import { useRef, type ReactNode, type RefObject } from 'react'
import { useSectionParallax } from '@/hooks/use-section-animation'

interface SectionBackgroundProps {
  sectionRef: RefObject<HTMLElement | null>
  type?: 'image' | 'video'
  src: string
  alt?: string
  overlay?: string
  parallax?: number
}

export function SectionBackground({
  sectionRef,
  type = 'image',
  src,
  alt = '',
  overlay = 'rgba(3,3,3,0.85)',
  parallax = -12,
}: SectionBackgroundProps) {
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null)

  useSectionParallax({
    sectionRef,
    mediaRef: mediaRef as RefObject<HTMLElement | null>,
    yPercent: parallax,
  })

  const mediaClass =
    'w-full h-[120%] object-cover absolute top-0 left-0 will-change-transform'

  return (
    <div className="section-bg">
      {type === 'video' ? (
        <video
          ref={mediaRef as RefObject<HTMLVideoElement>}
          autoPlay
          loop
          muted
          playsInline
          className={mediaClass}
          aria-hidden="true"
        >
          <source src={src} type={src.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
        </video>
      ) : (
        <img
          ref={mediaRef as RefObject<HTMLImageElement>}
          src={src}
          alt={alt}
          className={mediaClass}
          loading="lazy"
          decoding="async"
        />
      )}
      <div className="section-overlay" style={{ background: overlay }} />
    </div>
  )
}

interface SectionShellProps {
  id?: string
  sectionRef: RefObject<HTMLElement | null>
  children: ReactNode
  className?: string
  minHeight?: boolean
}

export function SectionShell({
  id,
  sectionRef,
  children,
  className = '',
  minHeight = true,
}: SectionShellProps) {
  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative w-full ${minHeight ? 'min-h-[100dvh]' : ''} flex items-center py-16 md:py-24 overflow-hidden ${className}`}
    >
      {children}
    </section>
  )
}
