'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Mail, User, Eye, EyeOff, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StarField } from '@/components/star-field'
import { useAuth } from '@/components/auth-provider'
import { cn } from '@/lib/utils'

function friendlyError(code: string): string {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.'
    case 'auth/invalid-email':
      return 'Please enter a valid email address.'
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.'
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Incorrect email or password.'
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.'
    default:
      return 'Something went wrong. Please try again.'
  }
}

type AuthMode = 'login' | 'registration'

function FieldIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
      {children}
    </span>
  )
}

const inputClass =
  'h-12 w-full rounded-xl border border-border bg-input/40 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/40'

export function AuthCard({ mode }: { mode: AuthMode }) {
  const router = useRouter()
  const { login, register } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const isLogin = mode === 'login'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    setSubmitting(true)
    try {
      if (isLogin) {
        await login(email, password)
      } else {
        await register(name, email, password)
      }
      router.push('/dashboard')
    } catch (err) {
      const code =
        err && typeof err === 'object' && 'code' in err
          ? String((err as { code: string }).code)
          : ''
      setError(friendlyError(code))
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-card-enter border-luxe surface-luxe card-corner-glow relative w-full max-w-md rounded-3xl p-6 shadow-2xl sm:p-8">
      {/* Tabs */}
      <div
        className="auth-rise relative z-10 grid grid-cols-2 gap-1 rounded-xl border border-border bg-input/30 p-1"
        style={{ '--rise-delay': '80ms' } as React.CSSProperties}
      >
        <Link
          href="/login"
          aria-current={isLogin ? 'page' : undefined}
          className={cn(
            'flex h-10 items-center justify-center rounded-lg text-sm font-semibold transition-colors',
            isLogin
              ? 'btn-luxe text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          Login
        </Link>
        <Link
          href="/registration"
          aria-current={!isLogin ? 'page' : undefined}
          className={cn(
            'flex h-10 items-center justify-center rounded-lg text-sm font-semibold transition-colors',
            !isLogin
              ? 'btn-luxe text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          Registration
        </Link>
      </div>

      {/* Heading */}
      <div
        className="auth-rise relative z-10 mt-6 text-center"
        style={{ '--rise-delay': '150ms' } as React.CSSProperties}
      >
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {isLogin ? 'Welcome back' : 'Create your account'}
        </h1>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
          {isLogin
            ? 'Sign in to access your Vertex AI trading dashboard.'
            : 'Join Vertex AI and start trading with automated signals.'}
        </p>
      </div>

      {/* Form */}
      <form
        className="relative z-10 mt-7 flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        {!isLogin && (
          <div
            className="auth-rise relative"
            style={{ '--rise-delay': '210ms' } as React.CSSProperties}
          >
            <FieldIcon>
              <User className="h-[18px] w-[18px]" />
            </FieldIcon>
            <input
              type="text"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              autoComplete="name"
              className={inputClass}
            />
          </div>
        )}

        <div
          className="auth-rise relative"
          style={{ '--rise-delay': '270ms' } as React.CSSProperties}
        >
          <FieldIcon>
            <Mail className="h-[18px] w-[18px]" />
          </FieldIcon>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            autoComplete="email"
            className={inputClass}
          />
        </div>

        <div
          className="auth-rise relative"
          style={{ '--rise-delay': '330ms' } as React.CSSProperties}
        >
          <FieldIcon>
            <Lock className="h-[18px] w-[18px]" />
          </FieldIcon>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            className={cn(inputClass, 'pr-11')}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          >
            {showPassword ? (
              <EyeOff className="h-[18px] w-[18px]" />
            ) : (
              <Eye className="h-[18px] w-[18px]" />
            )}
          </button>
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2.5 text-sm text-destructive"
          >
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={submitting}
          className="btn-luxe auth-rise mt-1 h-12 w-full gap-2 rounded-xl text-base font-semibold disabled:opacity-70"
          style={{ '--rise-delay': '440ms' } as React.CSSProperties}
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitting
            ? isLogin
              ? 'Signing in...'
              : 'Creating account...'
            : isLogin
              ? 'Sign in'
              : 'Create account'}
        </Button>
      </form>

      {/* Footer switch */}
      <p
        className="auth-rise relative z-10 mt-6 text-center text-sm text-muted-foreground"
        style={{ '--rise-delay': '500ms' } as React.CSSProperties}
      >
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <Link
          href={isLogin ? '/registration' : '/login'}
          className="font-semibold text-accent transition-colors hover:text-foreground"
        >
          {isLogin ? 'Register now' : 'Sign in'}
        </Link>
      </p>
    </div>
  )
}

const brandPoints = [
  'Automated AI trading signals in real time',
  'AI that analyzes markets faster than you can blink',
  'Trusted by traders worldwide',
]

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative grid min-h-dvh grid-cols-1 bg-background lg:grid-cols-2">
      <StarField />
      {/* Branding panel - visible on large screens */}
      <aside className="relative z-10 hidden flex-col justify-between border-r border-border p-10 xl:p-14 lg:flex">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/vertex-logo.png"
            alt="Vertex AI"
            width={44}
            height={44}
            className="rounded-xl"
          />
          <span className="text-xl font-bold tracking-tight">
            Vertex <span className="text-shine">AI</span>
          </span>
        </Link>

        <div className="max-w-md">
          <h2 className="text-balance text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
            Trade smarter with AI powered signals.
          </h2>
          <ul className="mt-8 flex flex-col gap-4">
            {brandPoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="btn-luxe mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  <Check className="h-3.5 w-3.5 text-primary-foreground" />
                </span>
                <span className="text-pretty text-sm leading-relaxed text-muted-foreground">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-muted-foreground">
          {'© '}
          {new Date().getFullYear()} Vertex AI. All rights reserved.
        </p>
      </aside>

      {/* Form panel */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-12 sm:px-6">
        <div className="auth-logo-enter relative z-10 mb-8 flex flex-col items-center gap-3 lg:hidden">
          <Link href="/" className="relative flex items-center justify-center">
            <span className="auth-logo-glow" aria-hidden="true" />
            <Image
              src="/vertex-logo.png"
              alt="Vertex AI"
              width={64}
              height={64}
              className="rounded-2xl shadow-xl ring-1 ring-white/15"
            />
          </Link>
          <div className="text-center">
            <span className="text-2xl font-bold tracking-tight">
              Vertex <span className="text-shine">AI</span>
            </span>
            <p className="mt-1 text-xs text-muted-foreground">
              AI-powered trading, made effortless.
            </p>
          </div>
        </div>
        {children}
      </div>
    </main>
  )
}
