import Image from 'next/image'
import Link from 'next/link'
import { existsSync } from 'fs'
import { join } from 'path'

function fileExists(name: string) {
  try { return existsSync(join(process.cwd(), 'public', 'images', name)) }
  catch { return false }
}

export default function Hero() {
  const hasCouple  = fileExists('couple-hero.jpg')
  const hasLeafBg  = fileExists('botanicals/leaf-bg.jpg')

  return (
    <section className="w-full min-h-screen grid grid-cols-1 md:grid-cols-[45%_55%] md:items-stretch gap-0 pt-[72px] md:pt-0">

      {/* ── LEFT: B&W couple photo ── */}
      <div className="relative bg-stone-200 min-h-[90vw] md:min-h-screen overflow-hidden">
        {hasCouple ? (
          <Image
            src="/images/couple-hero.jpg"
            alt="Ben and Margaux"
            fill
            priority
            className="object-cover object-top grayscale"
            sizes="(max-width: 768px) 100vw, 45vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-start justify-end p-10 bg-stone-100">
            <p className="font-sans text-[10px] text-jungle/30 tracking-widest uppercase">
              Place photo → public/images/couple-hero.jpg
            </p>
          </div>
        )}
      </div>

      {/* ── RIGHT: sage panel with optional leaf texture ── */}
      <div className="relative flex flex-col justify-center px-8 md:px-16 lg:px-20 py-14 md:py-0 bg-gradient-to-b from-sage-light via-sage to-sage-dark overflow-hidden">

        {/* Leaf texture — barely visible watercolour overlay.
            White bg vanishes via mix-blend-multiply; dark leaves read as
            a slightly deeper sage tint. Opacity tuned to ~8% so it's felt
            rather than seen. Place image → public/images/botanicals/leaf-bg.jpg */}
        {hasLeafBg && (
          <div
            className="absolute -inset-2 opacity-[0.05] mix-blend-multiply pointer-events-none"
            style={{
              backgroundImage: 'url(/images/botanicals/leaf-bg.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}

        <div className="relative z-10 max-w-lg">
          <p className="font-sans text-xs tracking-[0.45em] uppercase text-jungle/50 mb-8">
            Philippines &middot; April 2027
          </p>

          <h1 className="font-serif italic font-light text-jungle leading-[1.0] mb-8 text-[clamp(3rem,10vw,8rem)]">
            Ben &amp;<br />Margaux
          </h1>

          <div className="w-16 h-[2px] bg-fuchsia mb-6 rounded-full" />

          <p className="font-sans text-jungle/75 text-lg md:text-2xl leading-relaxed mb-10">
            Celebrating with you in Tagaytay &amp; Siargao
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/rsvp"
              className="inline-flex items-center justify-center bg-fuchsia hover:bg-fuchsia-light text-white font-sans text-xs tracking-[0.2em] uppercase px-10 py-4 transition-colors duration-200"
            >
              RSVP Now
            </Link>
            <a
              href="#timeline"
              className="inline-flex items-center justify-center border border-jungle/40 hover:border-fuchsia text-jungle/70 hover:text-fuchsia font-sans text-xs tracking-[0.2em] uppercase px-10 py-4 transition-colors duration-200"
            >
              View Details
            </a>
          </div>

          <p className="mt-6 font-sans text-sm font-semibold text-mango-dark">
            RSVP by 1 August 2026
          </p>
        </div>
      </div>
    </section>
  )
}
