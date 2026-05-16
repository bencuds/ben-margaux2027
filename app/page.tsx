import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Intro from '@/components/Intro'
import Timeline from '@/components/Timeline'
import RSVPCta from '@/components/RSVPCta'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Nav />
      <main className="w-full overflow-x-hidden">
        <Hero />
        <Intro />
        <Timeline />
        <RSVPCta />
      </main>
      <Footer />
    </>
  )
}
