import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Judul muncul per kata saat discroll (GSAP + ScrollTrigger)
 */
export default function WordReveal({
  text,
  as: Tag = 'h1',
  className = '',
  wordClassName = '',
  start = 'top 85%',
  stagger = 0.06,
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const words = el.querySelectorAll('[data-word]')
    gsap.set(words, { yPercent: 110, opacity: 0, rotateX: -40 })

    const tween = gsap.to(words, {
      yPercent: 0,
      opacity: 1,
      rotateX: 0,
      duration: 0.85,
      ease: 'power3.out',
      stagger,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none reverse',
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [text, start, stagger])

  const parts = String(text).split(' ')

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {parts.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom pb-[0.12em]">
          <span data-word className={`inline-block will-change-transform ${wordClassName}`}>
            {word}
            {i < parts.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </Tag>
  )
}
