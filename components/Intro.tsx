import Image from 'next/image'
import { existsSync } from 'fs'
import { join } from 'path'
import CountdownDays from './CountdownDays'
import ScrollReveal from './ScrollReveal'

function fileExists(name: string) {
  try { return existsSync(join(process.cwd(), 'public', 'images', name)) }
  catch { return false }
}

export default function Intro() {
  const hasPhoto = fileExists('story-photo.jpg')

  return hasPhoto ? (
    /* ── Two-column layout (photo present) ── */
    <section className="relative bg-sandy-dark overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[55%_45%] items-stretch">

        {/* Left: text */}
        <div className="flex flex-col px-10 md:px-16 lg:px-20 py-16 md:py-24">
          <ScrollReveal>
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-fuchsia mb-8">
              Our Story
            </p>
            <blockquote className="font-serif italic text-jungle leading-[1.3] mb-8 text-2xl md:text-3xl lg:text-4xl">
              &ldquo;We did the vows quietly in Abu Dhabi.<br />
              Now it&rsquo;s party time &mdash; and we want you there.&rdquo;
            </blockquote>
            <div className="w-12 h-[3px] bg-fuchsia mb-8 rounded-full" />
            <p className="font-sans text-jungle/70 leading-relaxed text-base">
              Just us, the sunshine, and zero speeches &mdash; exactly how we wanted it.
              Now we&rsquo;re heading to the Philippines to celebrate properly, and we&rsquo;d love you to come.
              A few days in Tagaytay, and Siargao waiting for those who can stay on.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200} className="mt-10 md:mt-12">
            <CountdownDays />
          </ScrollReveal>
        </div>

        {/* Right: photo */}
        <div className="relative min-h-[60vw] md:min-h-0">
          <Image
            src="/images/story-photo.jpg"
            alt="Ben and Margaux"
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 45vw"
          />
        </div>

      </div>
    </section>
  ) : (
    /* ── Centred single-column layout (no photo yet) ── */
    <section className="relative py-28 px-6 bg-sandy-dark overflow-hidden">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <ScrollReveal>
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-fuchsia mb-8">
            Our Story
          </p>
          <blockquote className="font-serif italic text-jungle leading-[1.3] mb-8 text-2xl md:text-3xl lg:text-4xl">
            &ldquo;We did the vows quietly in Abu Dhabi.<br />
            Now it&rsquo;s party time &mdash; and we want you there.&rdquo;
          </blockquote>
          <div className="w-12 h-[3px] bg-fuchsia mx-auto mb-8 rounded-full" />
          <p className="font-sans text-jungle/70 leading-relaxed text-base max-w-2xl mx-auto">
            Just us, the sunshine, and zero speeches &mdash; exactly how we wanted it.
            Now we&rsquo;re heading to the Philippines to celebrate properly, and we&rsquo;d love you to come.
            A few days in Tagaytay, and Siargao waiting for those who can stay on.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={200} className="mt-10">
          <CountdownDays />
        </ScrollReveal>
      </div>
    </section>
  )
}
