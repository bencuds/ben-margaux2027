import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import LockedPage from '@/components/LockedPage'

export const metadata = {
  title: 'Travel | Ben & Margaux',
}

export default function TravelPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-cream pt-20">
        <LockedPage pageName="Travel">
          {/* Travel content goes here once ready */}
          <div className="max-w-3xl mx-auto py-20 px-6 text-center">
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-fuchsia mb-4">
              Travel
            </p>
            <h1 className="font-serif italic text-5xl text-jungle mb-6">
              Getting There
            </h1>
            <p className="font-sans text-jungle/50 leading-relaxed">
              Flights, transfers, and getting-to-Tagaytay details coming soon.
            </p>
          </div>
        </LockedPage>
      </main>
      <Footer />
    </>
  )
}
