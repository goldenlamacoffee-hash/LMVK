'use client'

import { useActionState } from 'react'
import { loginAction } from '@/app/admin/actions'

export function AdminLogin() {
  const [state, formAction, pending] = useActionState(loginAction, {})

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <span className="font-sans text-lg font-semibold tracking-[0.32em] text-foreground">
            LMVK
          </span>
          <span className="mt-1.5 h-px w-7 bg-gold" />
          <span className="mt-1.5 text-[0.5rem] font-medium uppercase tracking-[0.5em] text-foreground/80">
            Group
          </span>
        </div>

        <h1 className="mt-10 text-center font-heading text-2xl font-normal text-foreground">
          Content Management
        </h1>
        <p className="mt-2 text-center text-sm leading-relaxed text-muted-foreground">
          Enter the admin password to manage site content.
        </p>

        <form action={formAction} className="mt-8 flex flex-col gap-4">
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              autoFocus
              className="w-full border border-border bg-card px-4 py-3 text-foreground outline-none transition-colors focus:border-gold"
              placeholder="Password"
            />
          </div>

          {state?.error ? (
            <p className="text-sm text-destructive" role="alert">
              {state.error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={pending}
            className="mt-2 bg-primary px-6 py-3 text-xs font-medium uppercase tracking-[0.25em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {pending ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </main>
  )
}
