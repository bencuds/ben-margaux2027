import { NextRequest, NextResponse } from 'next/server'

type InviteMap = Record<string, { name: string; maxGuests: number }>

// In-memory cache — refreshes every 5 minutes
let cache: { data: InviteMap; fetchedAt: number } | null = null
const CACHE_TTL_MS = 5 * 60 * 1000

async function getInviteCodes(): Promise<InviteMap> {
  const now = Date.now()
  if (cache && now - cache.fetchedAt < CACHE_TTL_MS) return cache.data

  const url = process.env.GOOGLE_SHEET_WEBHOOK
  if (!url) throw new Error('Webhook not configured')

  const res = await fetch(url, { cache: 'no-store', redirect: 'follow' })
  if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`)
  const data = (await res.json()) as InviteMap
  cache = { data, fetchedAt: now }
  return data
}

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ valid: false, error: 'Invalid request' }, { status: 400 })
  }

  const code =
    body && typeof body === 'object' && 'code' in body && typeof (body as { code: unknown }).code === 'string'
      ? (body as { code: string }).code.toUpperCase().trim()
      : null

  if (!code) {
    return NextResponse.json({ valid: false, error: 'No code provided' }, { status: 400 })
  }

  let map: InviteMap
  try {
    map = await getInviteCodes()
  } catch {
    return NextResponse.json({ valid: false, error: 'Could not load invite list' }, { status: 500 })
  }

  const invite = map[code]

  if (!invite) {
    await new Promise((r) => setTimeout(r, 400))
    return NextResponse.json({ valid: false })
  }

  return NextResponse.json({ valid: true, name: invite.name, maxGuests: invite.maxGuests })
}
