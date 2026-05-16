'use client'

import Link from 'next/link'
import ScrollReveal from './ScrollReveal'
import { useEffect, useRef } from 'react'

export default function RSVPCta() {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bg = bgRef.current
    if (!bg) return

    const onScroll = () => {
      const rect = bg.parentElement?.getBoundingClientRect()
      if (!rect) return
      // How far the section's centre is from the viewport centre
      const sectionCentre = rect.top + rect.height / 2
      const offset = (window.innerHeight / 2 - sectionCentre) * 0.22
      bg.style.transform = `translateY(${offset}px)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // set initial position
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="relative py-44 md:py-60 px-6 overflow-hidden bg-jungle-dark">

      {/* Tagaytay landscape — full colour, parallax layer */}
      <div
        ref={bgRef}
        className="absolute inset-[-12%] bg-cover bg-center will-change-transform"
        style={{ backgroundImage: 'url(/images/tagaytay-bg.webp)' }}
      />
      {/* Dark base overlay for legibility */}
      <div className="absolute inset-0 bg-jungle-dark/50" />

      <div className="relative z-10 max-w-xl mx-auto text-center">
        <ScrollReveal>
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-sage mb-6">
            You&rsquo;re Invited
          </p>

          <h2 className="heading-section font-serif italic text-sandy mb-6 text-balance">
            We&rsquo;d love to<br />see you there
          </h2>

          <div className="w-10 h-[2px] bg-mango mx-auto mb-8 rounded-full opacity-60" />

          <p className="font-sans text-sandy/90 text-xl leading-relaxed mb-3">
            RSVP by{' '}
            <strong className="text-mango font-semibold">1 August 2026</strong>
          </p>
          <p className="font-sans text-sandy/65 text-base mb-12">
            You&rsquo;ll need your personal invite code — check your invitation.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <Link
            href="/rsvp"
            className="inline-flex items-center justify-center bg-fuchsia hover:bg-fuchsia-light text-white font-sans text-sm tracking-[0.25em] uppercase px-12 py-5 transition-colors duration-200"
          >
            RSVP Now &rarr;
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
