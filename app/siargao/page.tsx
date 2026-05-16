import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import LockedPage from '@/components/LockedPage'

export const metadata = {
  title: 'Siargao | Ben & Margaux',
}

export default function SiargaoPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-cream pt-20">
        <LockedPage pageName="Siargao">
          {/* Siargao content goes here once ready */}
          <div className="max-w-3xl mx-auto py-20 px-6 text-center">
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-fuchsia mb-4">
              Siargao
            </p>
            <h1 className="font-serif italic text-5xl text-jungle mb-6">
              Siargao Island
            </h1>
            <p className="font-sans text-jungle/50 leading-relaxed">
              Everything you need to know about the optional Siargao leg — where to stay, what to do, and how to get there.
            </p>
          </div>
        </LockedPage>
      </main>
      <Footer />
    </>
  )
}
