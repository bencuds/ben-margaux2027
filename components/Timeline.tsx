import ScrollReveal from './ScrollReveal'

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
    <svg viewBox="0 0 15 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M8.4844,1.0002 c-0.1464,0.005-0.2835,0.0731-0.375,0.1875L6.4492,3.2619L4.8438,1.7385C4.4079,1.3374,3.7599,1.893,4.0899,2.385l1.666,2.4004 C5.9472,5.061,6.3503,5.0737,6.5586,4.8108C6.7249,4.6009,7,4.133,7.5,4.133s0.7929,0.4907,0.9414,0.6777 c0.175,0.2204,0.4973,0.2531,0.7129,0.0723l1.668-1.4004c0.4408-0.3741,0.0006-1.0735-0.5273-0.8379L9,3.2268V1.5002 C9.0002,1.2179,8.7666,0.9915,8.4844,1.0002z M5,6.0002L2.0762,11.924C1.9993,12.0009,2,12.155,2,12.3088 c0,0.5385,0.3837,0.6914,0.6914,0.6914h9.6172c0.3846,0,0.6914-0.153,0.6914-0.6914c0-0.1538,0.0008-0.2309-0.0762-0.3848L10,6.0002 c-0.5,0-1,0.5-1,1v0.5c0,0.277-0.223,0.5-0.5,0.5S8,7.7772,8,7.5002v-0.5c0-0.2761-0.2238-0.5-0.5-0.5S7,6.7241,7,7.0002v2 c0,0.277-0.223,0.5-0.5,0.5S6,9.2772,6,9.0002v-2C6,6.5002,5.5,6.0002,5,6.0002z" />
    </svg>
  )
}

function CheersIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512.001 512.001" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M255.999,0c-9.336,0-16.9,7.565-16.9,16.9v33.8c0,9.336,7.565,16.9,16.9,16.9s16.9-7.565,16.9-16.9V16.9C272.899,7.565,265.335,0,255.999,0z"/>
      <path d="M200.345,50.018l-33.8-33.8c-6.601-6.601-17.297-6.601-23.898,0c-6.601,6.596-6.601,17.301,0,23.898l33.801,33.8c3.301,3.301,7.625,4.952,11.948,4.952s8.648-1.651,11.948-4.952C206.947,67.32,206.947,56.615,200.345,50.018z"/>
      <path d="M369.348,16.217c-6.601-6.601-17.297-6.601-23.898,0l-33.8,33.8c-6.601,6.596-6.601,17.301,0,23.898c3.301,3.301,7.625,4.952,11.95,4.952c4.324,0,8.648-1.651,11.948-4.952l33.8-33.8C375.95,33.52,375.95,22.814,369.348,16.217z"/>
      <path d="M493.602,458.297c-2.256-9.061-11.443-14.578-20.482-12.312l-49.2,12.267l-24.812-99.524c57.552-23.203,85.164-86.744,64.273-146.68c-4.489-12.875-1.209-5.694-61.206-118.365c-3.647-6.843-11.525-10.288-19.007-8.456l-127.177,31.707L128.83,85.228c-7.536-1.903-15.36,1.612-19.007,8.456c-8.529,16.016-48.536,91.147-53.897,101.214h0.006c-3.399,6.383-6.013,13.063-8.203,19.851c-19.297,59.777,8.924,121.276,65.163,143.975l-24.813,99.529l-49.195-12.267c-9.055-2.277-18.226,3.252-20.487,12.312c-2.256,9.055,3.257,18.226,12.312,20.487l131.186,32.711c9.089,2.263,18.232-3.284,20.488-12.312c2.256-9.055-3.257-18.226-12.312-20.487l-49.193-12.266l24.813-99.527c45.849,4.841,87.899-17.723,110.312-55.978c22.401,38.274,64.497,60.808,110.31,55.977l24.814,99.529l-49.193,12.266c-9.055,2.261-14.568,11.431-12.312,20.488c2.26,9.046,11.412,14.571,20.487,12.312l131.196-32.711C490.357,476.522,495.869,467.352,493.602,458.297z M95.616,192.282l37.839-71.065l105.643,26.341v82.057l0.012,0.003L95.616,192.282z M272.914,226.68l0.052-79.138l105.577-26.324l36.472,68.49L272.914,226.68z"/>
    </svg>
  )
}

function PalmIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M11.177 1.287c-1.75 0.007-3.372 0.363-4.163 0.61 0 0 7.174 1.217 7.771 6.17-5.451-7.86-11.397 1.646-11.397 1.646 1.24-0.325 4.79-1.291 7.16-0.883 1.622 0.279 3.203 1.749 3.135 1.73-3.865 0.951-10.006 18.153-8.963 19.55 0.93 1.068 1.861 0.704 2.79 0.162 0.46-3.646 4.052-19.641 8.447-18.35 0.001 0 0.001-0 0.002 0 0.37 0.127 0.72 0.349 0.739 0.688 0.036 0.647-0.381 1.703-0.283 2.437 0.229 1.703 0.562 2.296 1.047 2.89 1.158-0.651 2.267-2.999 2.496-4.216 1.038 0.455 2.706 1.507 4.068 5.417 0.712-3.664-0.315-6.554-3.683-7.837 1.459-0.631 7.809 2.56 8.584 4.339 0.754-3.207-4.58-7.131-9.020-6.922 0.851-0.222 1.787 0.037 2.677-0.618 1.195-0.88 2.588-1.637 3.886-2.451-4.366-1.899-8.395-0.961-8.679 1.004-0.223-4.363-3.608-5.379-6.612-5.366z" />
    </svg>
  )
}

const icons = {
  mango:   VolcanoIcon,
  fuchsia: CheersIcon,
  jungle:  PalmIcon,
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
