import BotanicalImage from './BotanicalImage'

export default function Footer() {
  return (
    <footer className="bg-jungle-dark border-t border-jungle-light/20 py-7 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <BotanicalImage
          src="/images/botanicals/hibiscus.png"
          className="mx-auto mb-5 w-8 opacity-40 brightness-200"
        />

        <p className="font-serif italic text-2xl text-sandy/80 mb-1">Ben &amp; Margaux</p>
        <p className="font-sans text-sandy/30 text-xs tracking-widest mb-4">
          #BenAndMargaux2027
        </p>
        <p className="font-sans text-sandy/25 text-[11px] tracking-[0.2em] uppercase">
          Tagaytay &amp; Siargao &middot; Philippines &middot; 4–11 April 2027
        </p>
      </div>
    </footer>
  )
}
