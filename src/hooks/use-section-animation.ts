import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface UseSectionParallaxOptions {
  sectionRef: RefObject<HTMLElement | null>
  mediaRef: RefObject<HTMLElement | null>
  yPercent?: number
}

export function useSectionParallax({
  sectionRef,
  mediaRef,
  yPercent = -12,
}: UseSectionParallaxOptions) {
  useEffect(() => {
    const section = sectionRef.current
    const media = mediaRef.current
    if (!section || !media) return

    const tween = gsap.to(media, {
      yPercent,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      tween.kill()
    }
  }, [sectionRef, mediaRef, yPercent])
}

interface UseScrollRevealOptions {
  triggerRef: RefObject<HTMLElement | null>
  targets: RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[]
  y?: number
  x?: number
  stagger?: number
  scale?: number
  start?: string
}

export function useScrollReveal({
  triggerRef,
  targets,
  y = 30,
  x,
  stagger = 0.1,
  scale,
  start = 'top 75%',
}: UseScrollRevealOptions) {
  useEffect(() => {
    const trigger = triggerRef.current
    if (!trigger) return

    const targetList = Array.isArray(targets) ? targets : [targets]
    const elements = targetList
      .map((ref) => ref.current)
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const from: gsap.TweenVars = { opacity: 0 }
    const to: gsap.TweenVars = { opacity: 1, duration: 0.6, ease: 'power3.out' }

    if (y !== undefined) {
      from.y = y
      to.y = 0
    }
    if (x !== undefined) {
      from.x = x
      to.x = 0
    }
    if (scale !== undefined) {
      from.scale = scale
      to.scale = 1
    }

    const tween = gsap.fromTo(elements, from, {
      ...to,
      stagger,
      scrollTrigger: {
        trigger,
        start,
        toggleActions: 'play none none none',
      },
    })

    return () => {
      tween.kill()
    }
  }, [triggerRef, targets, y, x, stagger, scale, start])
}
