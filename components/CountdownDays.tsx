'use client'

import { useEffect, useState } from 'react'

const WEDDING_DATE = new Date('2027-04-05T00:00:00')

function getDaysRemaining() {
  const now = new Date()
  const diff = WEDDING_DATE.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export default function CountdownDays() {
  const [days, setDays] = useState<number | null>(null)

  useEffect(() => {
    setDays(getDaysRemaining())

    // Recalculate at midnight each day
    const msUntilMidnight = () => {
      const now = new Date()
      const midnight = new Date(now)
      midnight.setHours(24, 0, 0, 0)
      return midnight.getTime() - now.getTime()
    }

    let timeout: ReturnType<typeof setTimeout>
    const scheduleUpdate = () => {
      timeout = setTimeout(() => {
        setDays(getDaysRemaining())
        scheduleUpdate()
      }, msUntilMidnight())
    }
    scheduleUpdate()

    return () => clearTimeout(timeout)
  }, [])

  if (days === null) return null // avoid hydration flash

  return (
    <div className="mt-10 flex flex-col items-center gap-2">
      {/* Thin ring around the number */}
      <div className="w-36 h-36 rounded-full border-2 border-mango/60 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <span className="font-serif italic text-6xl text-mango leading-none">
            {days.toLocaleString()}
          </span>
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-mango mt-2">
            days to go
          </span>
        </div>
      </div>
    </div>
  )
}
