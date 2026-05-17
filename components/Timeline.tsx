import ScrollReveal from './ScrollReveal'
import { Palmtree } from 'lucide-react'

const events = [
  {
    index: 1,
    day: 'Sunday',
    date: '4 April 2027',
    name: 'Welcome Drinks',
    location: 'Tagaytay',
    description:
      'Arrive, settle in, and join us for sunset welcome drinks overlooking the Taal Volcano.',
    badge: null,
    accent: 'mango' as const,
  },
  {
    index: 2,
    day: 'Monday',
    date: '5 April 2027',
    name: 'The Celebration',
    location: 'Tagaytay',
    description:
      'Our main celebration — ceremony, dinner, music, and dancing with everyone we love most.',
    badge: null,
    accent: 'fuchsia' as const,
  },
  {
    index: 3,
    day: 'Wednesday onwards',
    date: '7 April 2027 onwards',
    name: 'Siargao Island',
    location: 'Siargao',
    description:
      'Join us for a few nights for an optional island escape — surf, snorkel, island-hop, and soak it all in with us.',
    badge: 'Optional',
    accent: 'jungle' as const,
  },
]

const styles = {
  mango: {
    title:   'text-mango-dark',
    badge:   'bg-mango/10 text-mango-dark',
    card:    'border-mango/30 bg-white hover:[box-shadow:6px_12px_32px_0_rgba(255,165,0,0.18)] hover:-translate-y-1',
    date:    'text-mango-dark',
    divider: 'bg-mango/30',
    icon:    'text-mango-dark',
  },
  fuchsia: {
    title:   'text-fuchsia',
    badge:   'bg-fuchsia text-white',
    card:    'border-fuchsia/40 ring-1 ring-fuchsia/20 z-10 bg-fuchsia/[0.03] [box-shadow:0_8px_40px_0_rgba(255,0,127,0.12)] hover:[box-shadow:6px_16px_40px_0_rgba(255,0,127,0.22)] hover:-translate-y-1',
    date:    'text-fuchsia',
    divider: 'bg-fuchsia/40',
    icon:    'text-fuchsia',
  },
  jungle: {
    title:   'text-jungle',
    badge:   'bg-jungle/10 text-jungle/60',
    card:    'border-jungle/25 bg-white hover:[box-shadow:6px_12px_32px_0_rgba(45,90,45,0.15)] hover:-translate-y-1',
    date:    'text-jungle/70',
    divider: 'bg-jungle/20',
    icon:    'text-jungle',
  },
}

function VolcanoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Base line */}
      <line x1="1" y1="21" x2="23" y2="21" />
      {/* Wide curved slopes */}
      <path d="M2 21Q6 14 10 9" />
      <path d="M22 21Q18 14 14 9" />
      {/* Crater opening */}
      <path d="M10 9Q12 7 14 9" />
      {/* Eruption puffs */}
      <path d="M10.5 7Q12 4.5 13.5 7" />
      <path d="M11.5 4.5Q12 2.5 12.5 4.5" />
    </svg>
  )
}

function CheersIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Left flute */}
      <path d="M4 2h5L7 9H6L4 2z" />
      <line x1="6.5" y1="9" x2="6.5" y2="16" />
      <line x1="5" y1="16" x2="8" y2="16" />
      {/* Right flute */}
      <path d="M15 2h5l-2 7h-1l-2-7z" />
      <line x1="17.5" y1="9" x2="17.5" y2="16" />
      <line x1="16" y1="16" x2="19" y2="16" />
      {/* Clink sparkle between the two glasses */}
      <line x1="9" y1="2" x2="11" y2="4" />
      <line x1="12" y1="1" x2="12" y2="4" />
      <line x1="15" y1="2" x2="13" y2="4" />
    </svg>
  )
}

const icons = {
  mango:   VolcanoIcon,
  fuchsia: CheersIcon,
  jungle:  Palmtree,
}

const leafStyle: React.CSSProperties = {
  mixBlendMode: 'multiply',
  filter: 'grayscale(100%)',
}

function LeafLeft() {
  return (
    <img
      src="/images/botanicals/banana-leaf.png"
      alt=""
      aria-hidden="true"
      className="absolute -left-32 top-2 w-[32rem] md:w-[38rem] opacity-[0.12] pointer-events-none select-none"
      style={leafStyle}
    />
  )
}

function LeafRight() {
  return (
    <img
      src="/images/botanicals/banana-leaf.png"
      alt=""
      aria-hidden="true"
      className="absolute -right-32 top-2 w-[32rem] md:w-[38rem] opacity-[0.12] pointer-events-none select-none"
      style={{ ...leafStyle, transform: 'scaleX(-1)' }}
    />
  )
}

export default function Timeline() {
  return (
    <section id="timeline" className="relative py-16 md:py-28 px-4 md:px-6 bg-sandy overflow-hidden">
      <LeafLeft />
      <LeafRight />
      <div className="max-w-5xl mx-auto">

        <ScrollReveal className="text-center mb-20">
          <p className="font-serif italic text-3xl md:text-4xl text-fuchsia mb-3">
            The Week
          </p>
          <h2 className="heading-section font-serif italic text-jungle">
            What to Expect
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch justify-items-center">
          {events.map((event) => {
            const s = styles[event.accent]
            const isFeatured = event.accent === 'fuchsia'
            return (
              <ScrollReveal key={event.index} delay={event.index * 150} className="w-full">
              <div
                className={`relative flex flex-col w-full h-full rounded-2xl border transition-all duration-300 ${isFeatured ? 'p-10' : 'p-8'} ${s.card}`}
              >
                {/* Accent icon — bottom left */}
                {(() => { const Icon = icons[event.accent]; return <Icon className={`absolute bottom-5 left-5 w-9 h-9 opacity-30 ${s.icon}`} /> })()}
                {/* Sparkles for the featured card */}
                {isFeatured && (
                  <>
                    <span className="absolute top-4 right-5 text-fuchsia/30 text-2xl select-none">✦</span>
                    <span className="absolute top-10 right-12 text-fuchsia/20 text-base select-none">✦</span>
                    <span className="absolute top-6 right-16 text-fuchsia/20 text-sm select-none">✦</span>
                    <span className="absolute bottom-6 right-6 text-fuchsia/20 text-xl select-none">✦</span>
                    <span className="absolute bottom-12 right-14 text-fuchsia/15 text-sm select-none">✦</span>
                  </>
                )}

                {/* Day + date */}
                <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-jungle/50 mb-1">
                  {event.day}
                </p>
                <p className={`font-sans text-sm font-semibold mb-5 ${s.date}`}>
                  {event.date}
                </p>

                <div className={`w-8 h-[2px] rounded-full mb-5 ${s.divider}`} />

                {/* Title */}
                <h3 className={`font-serif italic text-4xl leading-tight mb-3 ${s.title}`}>
                  {event.name}
                </h3>

                {/* Location */}
                <p className="font-sans text-sm text-jungle/40 tracking-wide mb-5">
                  📍 {event.location}
                </p>

                <p className="font-sans text-base text-jungle/60 leading-relaxed mb-6 flex-1">
                  {event.description}
                </p>

                {/* Badge at bottom — only rendered when present */}
                {event.badge && (
                  <div className="mt-auto pt-4 border-t border-sandy-dark/30 flex justify-center">
                    <span className={`inline-block font-sans text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full ${s.badge}`}>
                      {event.badge}
                    </span>
                  </div>
                )}
              </div>
              </ScrollReveal>
            )
          })}
        </div>

      </div>
    </section>
  )
}
