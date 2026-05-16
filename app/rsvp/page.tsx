'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

interface InviteData {
  name: string
  maxGuests: number
}

type Attending = 'yes' | 'no' | ''
type Siargao   = 'yes' | 'no' | 'maybe' | ''

interface FormState {
  attending:   Attending
  guestNames:  string[]
  dietary:     string
  siargao:     Siargao
  phone:       string
  email:       string
  notes:       string
}

/* ─── field label ─── */
function FieldLabel({ htmlFor, children }: { htmlFor?: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block font-sans text-xs tracking-[0.25em] uppercase text-jungle/60 mb-3"
    >
      {children}
    </label>
  )
}

/* ─── pill toggle ─── */
function PillGroup<T extends string>({
  options, value, onChange,
}: {
  options: { label: string; value: T }[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {options.map((opt) => {
        const active = value === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`font-sans text-sm tracking-[0.15em] uppercase px-6 py-3 border-2 transition-colors duration-200 ${
              active
                ? 'bg-fuchsia border-fuchsia text-white'
                : 'bg-white border-sandy-dark text-jungle/60 hover:border-fuchsia/50'
            }`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

/* ─── film strip ─── */
function Sprockets() {
  return (
    <div className="flex flex-col justify-around items-center py-1 w-5 flex-shrink-0">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="w-[7px] h-[10px] rounded-[1.5px] bg-white opacity-85" />
      ))}
    </div>
  )
}

function SprocketsRow({ count = 10 }: { count?: number }) {
  return (
    <div className="flex justify-around items-center h-5 px-1">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="h-[7px] w-[10px] rounded-[1.5px] bg-white opacity-85" />
      ))}
    </div>
  )
}

function FilmStripHorizontal() {
  return (
    <div
      className="lg:hidden w-full bg-[#0f0f0f] select-none mb-10"
      style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
    >
      <SprocketsRow />
      <div className="flex gap-0.5 px-0.5">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="flex-1 bg-[#1a1a1a] overflow-hidden" style={{ height: '110px' }}>
            <img
              src={`/images/rsvp/photo-${n}.jpg`}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0' }}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between px-6 py-0.5">
        {[1, 2, 3, 4].map((n) => (
          <p key={n} className="font-mono text-[7px] text-white/20 tracking-widest">
            {String(n).padStart(2, '0')}▶
          </p>
        ))}
      </div>
      <SprocketsRow />
    </div>
  )
}

function FilmStrip() {
  // Frames: 0 = dummy top, 1–4 = real photos, 5 = dummy bottom
  // Container clips to show ~60px of dummy at each end + 4 complete frames
  return (
    <div className="hidden lg:block flex-shrink-0 sticky top-32 self-start"
      style={{ animation: 'filmDrift 7s ease-in-out infinite', boxShadow: '8px 16px 40px rgba(0,0,0,0.45)' }}>

      <div className="w-[196px] overflow-hidden rounded-sm"
        style={{ height: '1120px' }}>
        <div className="bg-[#0f0f0f] select-none" style={{ marginTop: '-60px' }}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="px-0.5">
              <div className="flex items-stretch">
                <Sprockets />

                {/* Photo */}
                <div className="flex-1 aspect-[4/5] bg-[#1a1a1a] overflow-hidden mx-0.5 my-0.5">
                  <img
                    src={`/images/rsvp/photo-${n}.jpg`}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.opacity = '0'
                    }}
                  />
                </div>

                <Sprockets />
              </div>

              <p className="font-mono text-[7px] text-white/20 text-right pr-6 pb-0.5 tracking-widest">
                {String(n).padStart(2, '0')}▶
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════ */

export default function RSVPPage() {
  const [code, setCode]       = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [invite, setInvite]   = useState<InviteData | null>(null)

  const [form, setForm] = useState<FormState>({
    attending:  '',
    guestNames: [],
    dietary:    '',
    siargao:    '',
    phone:      '',
    email:      '',
    notes:      '',
  })
  const [submitLoading, setSubmitLoading] = useState(false)
  const [submitError,   setSubmitError]   = useState('')
  const [submitted,     setSubmitted]     = useState(false)

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res  = await fetch('/api/validate-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      const data = await res.json()
      if (data.valid) {
        setInvite({ name: data.name, maxGuests: data.maxGuests })
        setForm((f) => ({ ...f, guestNames: Array(data.maxGuests).fill('') }))
      } else {
        setError("That code doesn't look right — check your invitation and try again.")
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, '')
    setCode(val)
    if (error) setError('')
  }

  const setGuestName = (i: number, val: string) => {
    setForm((f) => {
      const names = [...f.guestNames]
      names[i] = val
      return { ...f, guestNames: names }
    })
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!invite) return
    if (!form.attending) { setSubmitError('Please let us know if you can make it.'); return }

    setSubmitLoading(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/submit-rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inviteCode:  code,
          groupName:   invite.name,
          attending:   form.attending,
          guestNames:  form.guestNames.filter(Boolean),
          dietary:     form.dietary,
          siargao:     form.siargao,
          phone:       form.phone,
          email:       form.email,
          notes:       form.notes,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
      } else {
        setSubmitError('Something went wrong — please try again or email ben.cuddy1@outlook.com')
      }
    } catch {
      setSubmitError('Something went wrong — please try again or email ben.cuddy1@outlook.com')
    } finally {
      setSubmitLoading(false)
    }
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-sandy">

        {/* ══ STEP 1: code entry ══════════════════════════════ */}
        {!invite && (
          <div className="flex flex-col items-center justify-center min-h-screen px-6 py-16 md:py-24">

            <p className="font-sans text-xs tracking-[0.4em] uppercase text-fuchsia mb-6">
              RSVP
            </p>
            <h1 className="font-serif italic text-5xl md:text-7xl text-jungle text-center mb-6 leading-tight">
              You&rsquo;re Invited
            </h1>
            <div className="w-10 h-[2px] bg-fuchsia rounded-full mb-8" />
            <p className="font-sans text-jungle/50 text-xs tracking-[0.2em] uppercase text-center mb-3">
              Ben &amp; Margaux &middot; Tagaytay &middot; April 2027
            </p>
            <p className="font-sans text-jungle/70 text-lg text-center max-w-sm leading-relaxed mb-14">
              You&rsquo;ll need your personal invite code — check your invitation.
            </p>

            <form onSubmit={handleCodeSubmit} className="w-full max-w-md">
              <FieldLabel htmlFor="invite-code">Invite Code</FieldLabel>
              <input
                id="invite-code"
                type="text"
                value={code}
                onChange={handleCodeChange}
                placeholder="PH–XXXX"
                maxLength={8}
                autoComplete="off"
                autoFocus
                className="w-full bg-white border-2 border-sandy-dark focus:border-fuchsia px-6 py-5 font-mono text-center text-xl md:text-2xl tracking-[0.3em] md:tracking-[0.4em] text-jungle placeholder:text-jungle/20 focus:outline-none mb-4 transition-colors duration-200"
              />
              {error && (
                <p className="text-fuchsia text-sm mb-4 text-center leading-relaxed">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading || code.length < 4}
                className="w-full bg-fuchsia hover:bg-fuchsia-light disabled:bg-sandy-dark disabled:text-jungle/30 disabled:cursor-not-allowed text-white font-sans text-sm tracking-[0.25em] uppercase py-5 transition-colors duration-200"
              >
                {loading ? 'Checking…' : 'Continue →'}
              </button>
            </form>

            <p className="mt-12 font-sans text-jungle/40 text-sm text-center">
              RSVP deadline:{' '}
              <span className="text-mango font-semibold">1 August 2026</span>
            </p>
          </div>
        )}

        {/* ══ STEP 2: RSVP form ════════════════════════════════ */}
        {invite && !submitted && (
          <div className="max-w-4xl mx-auto px-4 md:px-6 py-16 md:py-28">

            {/* Header */}
            <FilmStripHorizontal />

            <div className="max-w-2xl">
              <p className="font-sans text-xs tracking-[0.4em] uppercase text-fuchsia mb-4">
                Welcome
              </p>
              <h1 className="font-serif italic text-5xl md:text-6xl text-jungle mb-4 leading-tight">
                Hello, {invite.name}!
              </h1>
              <div className="w-10 h-[2px] bg-fuchsia rounded-full mb-6" />
              <p className="font-sans text-jungle/70 text-base leading-relaxed mb-10">
                Please fill in your details below — it only takes a minute.
              </p>
            </div>

            {/* Outer flex: form on left, film strip on right */}
            <div className="flex gap-10 items-start">
            <form onSubmit={handleFormSubmit}
              className={`space-y-10 ${form.attending === 'yes' ? 'flex-1 min-w-0' : 'w-full max-w-2xl'}`}>

              {/* Attending toggle */}
              <div>
                <FieldLabel>Will you be joining us on 5 April?</FieldLabel>
                <PillGroup<Attending>
                  options={[
                    { label: "Yes, we'll be there", value: 'yes' },
                    { label: "Sorry, can't make it", value: 'no' },
                  ]}
                  value={form.attending}
                  onChange={(v) => setForm((f) => ({ ...f, attending: v }))}
                />
              </div>

              {form.attending === 'yes' && (
                    <>
                      {/* Guest names */}
                      <div>
                        <FieldLabel>
                          {invite.maxGuests === 1
                            ? 'Your full name'
                            : `Guest names (up to ${invite.maxGuests})`}
                        </FieldLabel>
                        <div className="space-y-3">
                          {Array.from({ length: invite.maxGuests }).map((_, i) => (
                            <input
                              key={i}
                              type="text"
                              value={form.guestNames[i] ?? ''}
                              onChange={(e) => setGuestName(i, e.target.value)}
                              placeholder={
                                invite.maxGuests === 1
                                  ? 'Full name'
                                  : i === 0
                                  ? 'Guest 1 (full name)'
                                  : `Guest ${i + 1} (full name, if attending)`
                              }
                              className="w-full bg-white border-2 border-sandy-dark focus:border-fuchsia px-5 py-4 font-sans text-base text-jungle placeholder:text-jungle/50 focus:outline-none transition-colors duration-200"
                            />
                          ))}
                        </div>
                        {invite.maxGuests > 1 && (
                          <p className="mt-2 font-sans text-xs text-jungle/40 leading-relaxed">
                            Leave blank for any guests who won&rsquo;t be attending.
                          </p>
                        )}
                      </div>

                      {/* Dietary */}
                      <div>
                        <FieldLabel htmlFor="dietary">
                          Dietary requirements or allergies
                        </FieldLabel>
                        <textarea
                          id="dietary"
                          value={form.dietary}
                          onChange={(e) => setForm((f) => ({ ...f, dietary: e.target.value }))}
                          placeholder="e.g. vegetarian, nut allergy — or leave blank if none"
                          rows={3}
                          className="w-full bg-white border-2 border-sandy-dark focus:border-fuchsia px-5 py-4 font-sans text-base text-jungle placeholder:text-jungle/50 focus:outline-none resize-none transition-colors duration-200"
                        />
                      </div>

                      {/* Siargao */}
                      <div>
                        <FieldLabel>
                          Interested in joining us in Siargao? (7 April onwards)
                        </FieldLabel>
                        <p className="font-sans text-sm text-jungle/55 mb-4 leading-relaxed">
                          An optional island escape — surf, snorkel, and island-hop with us. No
                          commitment needed yet, just let us know if you&rsquo;re tempted.
                        </p>
                        <PillGroup<Siargao>
                          options={[
                            { label: 'Yes!', value: 'yes' },
                            { label: 'Maybe', value: 'maybe' },
                            { label: 'Not this time', value: 'no' },
                          ]}
                          value={form.siargao}
                          onChange={(v) => setForm((f) => ({ ...f, siargao: v }))}
                        />
                      </div>

                      {/* Contact details — yes only */}
                      <div>
                        <FieldLabel>Contact details</FieldLabel>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="phone" className="block font-sans text-[10px] tracking-[0.2em] uppercase text-jungle/40 mb-2">
                              Phone (with country code)
                            </label>
                            <input
                              id="phone"
                              type="tel"
                              value={form.phone}
                              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                              placeholder="+63 917 123 4567"
                              className="w-full bg-white border-2 border-sandy-dark focus:border-fuchsia px-5 py-4 font-sans text-base text-jungle placeholder:text-jungle/50 focus:outline-none transition-colors duration-200"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block font-sans text-[10px] tracking-[0.2em] uppercase text-jungle/40 mb-2">
                              Email address
                            </label>
                            <input
                              id="email"
                              type="email"
                              value={form.email}
                              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                              placeholder="you@example.com"
                              className="w-full bg-white border-2 border-sandy-dark focus:border-fuchsia px-5 py-4 font-sans text-base text-jungle placeholder:text-jungle/50 focus:outline-none transition-colors duration-200"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {form.attending && (
                    <>
                      {/* Notes */}
                      <div className="border-t border-sandy-dark/40 pt-10">
                        <FieldLabel htmlFor="notes">
                          Anything else you&rsquo;d like us to know?{' '}
                          <span className="normal-case tracking-normal text-jungle/35">(optional)</span>
                        </FieldLabel>
                        <textarea
                          id="notes"
                          value={form.notes}
                          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                          placeholder={form.attending === 'no' ? 'Add a note if you like…' : 'Questions, accessibility needs, anything at all…'}
                          rows={3}
                          className="w-full bg-white border-2 border-sandy-dark focus:border-fuchsia px-5 py-4 font-sans text-base text-jungle placeholder:text-jungle/50 focus:outline-none resize-none transition-colors duration-200"
                        />
                      </div>

                      {submitError && (
                        <p className="text-fuchsia text-sm text-center leading-relaxed">{submitError}</p>
                      )}

                      <button
                        type="submit"
                        disabled={submitLoading}
                        className="w-full bg-fuchsia hover:bg-fuchsia-light disabled:bg-sandy-dark disabled:text-jungle/30 disabled:cursor-not-allowed text-white font-sans text-sm tracking-[0.25em] uppercase py-5 transition-colors duration-200"
                      >
                        {submitLoading ? 'Sending…' : 'Send RSVP →'}
                      </button>
                    </>
                  )}

            </form>

            {form.attending === 'yes' && <FilmStrip />}
            </div>{/* end outer flex */}

            <p className="mt-12 font-sans text-jungle/40 text-sm text-center">
              RSVP deadline:{' '}
              <span className="text-mango font-semibold">1 August 2026</span>
            </p>
          </div>
        )}

        {/* ══ STEP 3: confirmation ══════════════════════════════ */}
        {submitted && (
          <div className="flex flex-col items-center justify-center min-h-screen px-6 py-24 text-center">
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-fuchsia mb-6">
              Thank you
            </p>
            <h1 className="font-serif italic text-5xl md:text-7xl text-jungle mb-6 leading-tight">
              {form.attending === 'yes' ? "Can't wait to see you!" : "You'll be missed."}
            </h1>
            <div className="w-10 h-[2px] bg-fuchsia rounded-full mb-8" />
            <p className="font-sans text-jungle/70 text-base max-w-sm leading-relaxed">
              {form.attending === 'yes'
                ? "We'll be in touch personally before the date — no need to do anything else."
                : "We're sorry you can't join us. Thank you for letting us know — we'll miss you there."}
            </p>
          </div>
        )}

      </main>
      <Footer />
    </>
  )
}
