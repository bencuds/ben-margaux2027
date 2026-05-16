'use client'

import Link from 'next/link'
import { useState } from 'react'
import LockIcon from './LockIcon'

const navLinks = [
  { label: 'RSVP',    href: '/rsvp',    locked: false },
  { label: 'Venue',   href: '/venue',   locked: true  },
  { label: 'Stay',    href: '/stay',    locked: true  },
  { label: 'Travel',  href: '/travel',  locked: true  },
  { label: 'Siargao', href: '/siargao', locked: true  },
]

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-sandy border-b border-sandy-darker shadow-[0_1px_14px_rgba(45,90,45,0.08)]">

      <div className="px-6 md:px-10 py-4 flex items-center justify-between">

        {/* Hibiscus + name — homepage link. Transparent PNG needs no blend tricks. */}
        <Link
          href="/"
          className="flex items-center gap-3 font-serif italic text-2xl text-jungle hover:text-fuchsia transition-colors duration-200"
        >
          <img
            src="/images/hibiscus-icon.png"
            alt=""
            aria-hidden="true"
            className="w-12 h-12 object-contain flex-shrink-0"
            style={{ mixBlendMode: 'multiply' }}
          />
          Ben &amp; Margaux
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative inline-flex items-center gap-1.5 font-sans text-xs tracking-[0.2em] uppercase text-jungle hover:text-fuchsia transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-fuchsia after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
              {link.locked && <LockIcon className="text-jungle/40" />}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1 text-jungle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <span className={`block w-6 h-0.5 bg-current transition-transform duration-200 ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-opacity duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-transform duration-200 ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-sandy border-t border-sandy-dark px-6 py-2 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase text-jungle hover:text-fuchsia transition-colors duration-200 py-4 border-b border-sandy-dark last:border-0"
            >
              {link.label}
              {link.locked && <LockIcon className="text-jungle/40" />}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
