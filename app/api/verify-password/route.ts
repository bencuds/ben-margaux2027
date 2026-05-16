import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 })
  }

  const password =
    body && typeof body === 'object' && 'password' in body && typeof (body as { password: unknown }).password === 'string'
      ? (body as { password: string }).password
      : null

  if (!password) {
    return NextResponse.json({ success: false, error: 'No password provided' }, { status: 400 })
  }

  const sitePassword = process.env.SITE_PASSWORD

  if (!sitePassword) {
    console.error('SITE_PASSWORD env variable is not set')
    return NextResponse.json({ success: false, error: 'Not configured' }, { status: 500 })
  }

  // Deliberate delay to slow brute-force attempts
  await new Promise((r) => setTimeout(r, 400))

  if (password === sitePassword) {
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ success: false })
}
