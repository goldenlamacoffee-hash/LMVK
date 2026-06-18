import 'server-only'
import { cookies } from 'next/headers'
import { createHmac, timingSafeEqual } from 'node:crypto'

const COOKIE_NAME = 'lmvk_admin'
const MAX_AGE_SECONDS = 60 * 60 * 12 // 12 hours

function getSecret(): string {
  const secret = process.env.ADMIN_PASSWORD
  if (!secret) {
    throw new Error('ADMIN_PASSWORD is not set')
  }
  return secret
}

/** The cookie value is an HMAC of a fixed payload + expiry, keyed by the password. */
function sign(expiresAt: number): string {
  const payload = `admin.${expiresAt}`
  const mac = createHmac('sha256', getSecret()).update(payload).digest('hex')
  return `${expiresAt}.${mac}`
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  if (ab.length !== bb.length) return false
  return timingSafeEqual(ab, bb)
}

/** Verify a submitted password against ADMIN_PASSWORD in constant time. */
export function verifyPassword(submitted: string): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false
  return safeEqual(submitted, expected)
}

/** Set the signed admin session cookie. */
export async function createAdminSession(): Promise<void> {
  const expiresAt = Date.now() + MAX_AGE_SECONDS * 1000
  const value = sign(expiresAt)
  const store = await cookies()
  store.set(COOKIE_NAME, value, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE_SECONDS,
  })
}

/** Clear the admin session cookie. */
export async function destroyAdminSession(): Promise<void> {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}

/** Returns true when the current request carries a valid, unexpired admin cookie. */
export async function isAdminAuthenticated(): Promise<boolean> {
  if (!process.env.ADMIN_PASSWORD) return false
  const store = await cookies()
  const raw = store.get(COOKIE_NAME)?.value
  if (!raw) return false

  const [expiresStr] = raw.split('.')
  const expiresAt = Number(expiresStr)
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false

  return safeEqual(raw, sign(expiresAt))
}
