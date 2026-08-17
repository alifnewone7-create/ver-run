'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  BrainCircuit,
  ScanEye,
  Waypoints,
  CircuitBoard,
  RadioTower,
  Crosshair,
  Menu,
  X,
  UserPlus,
  Wallet,
  ShieldCheck,
  KeyRound,
  Headset,
  Check,
  AlertTriangle,
  PlugZap,
  ScanSearch,
  Rocket,
  ArrowRight,
} from 'lucide-react'

const LIME = '#CCFF00'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Support', href: 'https://t.me/Ayan_sx', external: true },
]

const FEATURES = [
  {
    icon: BrainCircuit,
    title: 'Neural Signal Engine',
    desc: 'A deep-learning core trained on millions of candles generates each signal with institutional-grade context.',
  },
  {
    icon: ScanEye,
    title: 'Chart Vision AI',
    desc: 'Upload any chart screenshot — the vision model reads structure, momentum and volume in seconds.',
  },
  {
    icon: Waypoints,
    title: 'Smart Entry Routing',
    desc: 'Every signal ships with a precise entry window, expiry and direction so you never guess timing.',
  },
  {
    icon: CircuitBoard,
    title: 'Robotic Execution Logic',
    desc: 'Emotion-free machine logic filters weak setups and only surfaces the highest-probability trades.',
  },
  {
    icon: RadioTower,
    title: 'Live Market Telemetry',
    desc: 'Real-time streams across forex, crypto and OTC markets — scanned around the clock without pause.',
  },
  {
    icon: Crosshair,
    title: 'Precision Risk Guard',
    desc: 'Built-in money management keeps position sizing disciplined and protects your capital first.',
  },
]

const STEPS = [
  {
    icon: PlugZap,
    step: '01',
    title: 'Connect your account',
    desc: 'Register in under a minute and link up through our partner broker — or activate a direct license.',
  },
  {
    icon: ScanSearch,
    step: '02',
    title: 'AI scans the markets',
    desc: 'The Vertex core sweeps 40+ pairs in real time, scoring every setup against its neural playbook.',
  },
  {
    icon: Rocket,
    step: '03',
    title: 'Trade the signals',
    desc: 'Receive crystal-clear BUY / SELL calls with entry, expiry and confidence — then execute.',
  },
]

const FREE_STEPS = [
  { icon: UserPlus, title: 'Create Account', desc: 'Use our exclusive partner link to register your trading account.' },
  { icon: Wallet, title: 'Deposit Capital', desc: 'Minimum $50 for your trading balance to get started.' },
  { icon: ShieldCheck, title: 'Verify UID', desc: 'Send your UID to our support team for instant verification.' },
]

const LICENSE_PERKS = [
  'Skip broker registration entirely',
  'Direct, unrestricted access',
  '1-month full license, instant activation',
  'Priority support included',
]

const GLASS =
  'rounded-2xl border border-white/[0.08] bg-white/[0.02] shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-colors duration-300 hover:border-[#CCFF00]/40'
const BTN_PRIMARY =
  'btn-clay font-display inline-flex h-12 items-center justify-center gap-2 px-8 text-sm sm:text-base'
const BTN_SECONDARY =
  'btn-clay-dark font-display inline-flex h-12 items-center justify-center gap-2 px-8 text-sm sm:text-base'

/* ── section label ── */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-display text-xs uppercase tracking-[0.24em] text-zinc-500">{children}</span>
  )
}

/* ── candles ── */
const CANDLES: [number, number, number, number][] = [
  [38, 48, 54, 33], [46, 42, 51, 38], [43, 51, 57, 40], [50, 39, 53, 34],
  [40, 45, 50, 36], [45, 62, 68, 43], [61, 57, 66, 52], [56, 47, 60, 44],
  [48, 55, 61, 45], [54, 44, 58, 40], [45, 39, 49, 34], [40, 47, 52, 37],
  [46, 41, 50, 37], [42, 52, 58, 39], [51, 46, 55, 42], [47, 56, 62, 44],
  [55, 61, 67, 51], [60, 72, 78, 57], [71, 66, 76, 62], [67, 74, 80, 64],
]

function CandleChart() {
  const W = 900
  const H = 300
  const padX = 34
  const step = (W - padX * 2) / (CANDLES.length - 1)
  const y = (v: number) => H - 34 - ((v - 28) / 56) * (H - 104)
  const x = (i: number) => padX + i * step
  const path = CANDLES.map((c, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y((c[0] + c[1]) / 2).toFixed(1)}`).join(' ')
  const signalIdx = 5

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full"
      role="img"
      aria-label="AI detected candlestick pattern with a buy signal"
    >
      <defs>
        <linearGradient id="vx-up" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DBFF4D" />
          <stop offset="100%" stopColor="#9ACC00" />
        </linearGradient>
        <linearGradient id="vx-dn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5A6B63" />
          <stop offset="100%" stopColor="#39433D" />
        </linearGradient>
      </defs>

      <path
        d={path}
        fill="none"
        stroke="rgba(204,255,0,0.4)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="6 8"
        className="spine-flow"
        vectorEffect="non-scaling-stroke"
      />

      {CANDLES.map((c, i) => {
        const [o, cl, h, l] = c
        const up = cl >= o
        const bodyTop = y(Math.max(o, cl))
        const bodyH = Math.max(6, y(Math.min(o, cl)) - bodyTop)
        return (
          <g key={i} className="candle-in" style={{ animationDelay: `${i * 45}ms` }}>
            <line
              x1={x(i)}
              x2={x(i)}
              y1={y(h)}
              y2={y(l)}
              stroke={up ? '#B8E600' : '#4C5952'}
              strokeWidth="1.4"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            <rect x={x(i) - 6} y={bodyTop} width="12" height={bodyH} rx="2" fill={up ? 'url(#vx-up)' : 'url(#vx-dn)'} />
          </g>
        )
      })}

      <g transform={`translate(${x(signalIdx)}, ${y(CANDLES[signalIdx][2]) - 26})`}>
        <g className="buy-pop">
          <rect
            x="-32"
            y="-13"
            width="64"
            height="26"
            rx="13"
            fill="rgba(4,6,4,0.9)"
            stroke="rgba(204,255,0,0.55)"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx="-20" cy="0" r="3.4" fill={LIME} />
          <text x="-12" y="4.5" fill="#F4FFDA" fontSize="11" fontWeight="700" letterSpacing="0.8">
            BUY
          </text>
        </g>
      </g>
    </svg>
  )
}

/* ── navbar ── */
function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="clay-card mx-auto flex h-16 max-w-6xl items-center justify-between rounded-[20px] px-4 sm:px-5">
        <a href="#top" className="flex items-center gap-3" data-testid="nav-logo-link">
          <span className="relative h-9 w-9 overflow-hidden rounded-xl ring-1 ring-white/10">
            <Image src="/vertex-logo.png" alt="Vertex AI logo" fill className="object-cover" sizes="36px" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-white">
            Vertex <span className="text-[#CCFF00]">AI</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              className="font-display rounded-xl px-3.5 py-2 text-sm text-zinc-400 transition-colors duration-200 hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <div className="hidden md:block">
            <Link
              href="/login"
              data-testid="nav-get-started-button"
              className={`${BTN_PRIMARY} !h-11 !px-6 !text-sm`}
            >
              Get Vertex AI
            </Link>
          </div>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            data-testid="nav-mobile-toggle"
            className="btn-clay-dark inline-flex h-10 w-10 items-center justify-center rounded-xl text-white md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className="clay-card mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-[20px] p-3 md:hidden"
          data-testid="nav-mobile-menu"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              onClick={() => setOpen(false)}
              className="font-display rounded-xl px-4 py-3 text-sm text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            data-testid="nav-mobile-cta"
            className={`${BTN_PRIMARY} mt-2 w-full`}
          >
            Get Vertex AI
          </Link>
        </div>
      )}
    </header>
  )
}

/* ── hero ── */
function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-20 sm:px-6 lg:pb-24 lg:pt-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[36rem] w-[72rem] -translate-x-1/2 rounded-full opacity-70 blur-[120px]"
        style={{ background: 'radial-gradient(ellipse at center, rgba(204,255,0,0.16), transparent 65%)' }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <h1
          className="font-display reveal-up text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-7xl"
          data-testid="hero-heading"
        >
          Trade with Intelligence.{' '}
          <span className="text-[#CCFF00]">Win with Vertex AI.</span>
        </h1>

        <p
          className="font-display reveal-up mx-auto mt-7 max-w-2xl text-pretty text-base font-light leading-relaxed text-zinc-400 sm:text-lg"
          style={{ animationDelay: '120ms' }}
        >
          An advanced trading intelligence platform that uncovers high-probability opportunities
          in real time — empowering faster, smarter, more confident trades.
        </p>

        <div
          className="reveal-up mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          style={{ animationDelay: '220ms' }}
        >
          <Link href="/login" data-testid="hero-cta-button" className={`${BTN_PRIMARY} w-full sm:w-auto`}>
            Get Vertex AI
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a href="#pricing" data-testid="hero-pricing-button" className={`${BTN_SECONDARY} w-full sm:w-auto`}>
            <KeyRound className="h-4 w-4 text-[#CCFF00]" />
            View Pricing
          </a>
        </div>
      </div>

      <div
        className="reveal-up relative mx-auto mt-16 max-w-5xl lg:mt-20"
        style={{ animationDelay: '320ms' }}
        data-testid="hero-neural-core-card"
      >
        <div className={`${GLASS} overflow-hidden p-3 sm:p-5`}>
          <div
            className="rounded-xl border border-white/[0.06] p-2 sm:p-4"
            style={{ background: 'linear-gradient(180deg, rgba(204,255,0,0.03), rgba(2,3,2,0.6))' }}
            data-testid="hero-candle-chart"
          >
            <div className="aspect-[900/300] w-full">
              <CandleChart />
            </div>
          </div>
          <p className="font-display mt-4 flex items-center justify-center gap-2 pb-1 text-xs text-zinc-500 sm:text-sm">
            <CircuitBoard className="h-3.5 w-3.5 text-[#CCFF00]" />
            Powered by Vertex AI real-time algorithm
          </p>
        </div>
      </div>
    </section>
  )
}

/* ── features ── */
function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 lg:py-28">
      <div className="max-w-2xl">
        <Label>Built for serious traders</Label>
        <h2 className="font-display mt-4 text-balance text-3xl font-medium tracking-tight text-white md:text-4xl">
          Everything you need to trade with{' '}
          <span className="text-[#CCFF00]">machine precision</span>
        </h2>
        <p className="font-display mt-4 text-pretty text-base font-light text-zinc-400">
          A complete algorithmic toolkit engineered for accuracy, speed and consistency.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            data-testid={`feature-card-${f.title.toLowerCase().replace(/\s+/g, '-')}`}
            className={`${GLASS} group p-7 sm:p-8`}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#CCFF00]/25 bg-[#CCFF00]/10 transition-transform duration-300 group-hover:-translate-y-0.5">
              <f.icon className="h-5 w-5 text-[#CCFF00]" />
            </div>
            <h3 className="font-display mt-6 text-xl tracking-tight text-zinc-100">{f.title}</h3>
            <p className="font-display mt-3 text-sm font-light leading-relaxed text-zinc-400">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── how it works ── */
function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-16 sm:px-6 lg:pb-28">
      <div className="max-w-2xl">
        <Label>How it works</Label>
        <h2 className="font-display mt-4 text-balance text-3xl font-medium tracking-tight text-white md:text-4xl">
          From zero to first signal in <span className="text-[#CCFF00]">minutes</span>
        </h2>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3 lg:gap-6">
        {STEPS.map((s) => (
          <div
            key={s.step}
            data-testid={`step-card-${s.step}`}
            className={`${GLASS} relative overflow-hidden p-7 sm:p-8`}
          >
            <span className="font-display pointer-events-none absolute -top-4 right-3 select-none text-7xl font-semibold text-white/[0.04] sm:text-8xl">
              {s.step}
            </span>
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
              <s.icon className="h-5 w-5 text-[#CCFF00]" />
            </div>
            <h3 className="font-display relative mt-6 text-xl tracking-tight text-zinc-100">{s.title}</h3>
            <p className="font-display relative mt-3 text-sm font-light leading-relaxed text-zinc-400">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── pricing ── */
function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-16 sm:px-6 lg:pb-28">
      <div className="mx-auto max-w-2xl text-center">
        <Label>Choose your access</Label>
        <h2 className="font-display mt-4 text-balance text-3xl font-medium tracking-tight text-white md:text-4xl">
          Two ways to start with <span className="text-[#CCFF00]">Vertex AI</span>
        </h2>
        <p className="font-display mt-4 text-pretty text-base font-light text-zinc-400">
          Get free access through our partner broker, or buy a direct license and skip the setup.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:gap-8">
        {/* free */}
        <div className={`${GLASS} flex flex-col p-7 sm:p-8`} data-testid="pricing-free-card">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-xl tracking-tight text-white sm:text-2xl">Free Access</h3>
            <span className="font-display rounded-full border border-white/10 px-3.5 py-1.5 text-xs text-zinc-300">
              $0 / partner
            </span>
          </div>
          <p className="font-display mt-3 text-sm font-light text-zinc-400">
            Follow these 3 simple steps to unlock Vertex AI for free.
          </p>

          <ol className="mt-7 flex flex-1 flex-col gap-4">
            {FREE_STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="font-display mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-xs font-semibold text-[#CCFF00]">
                  {i + 1}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <step.icon className="h-4 w-4 text-[#CCFF00]" />
                    <p className="font-display text-sm font-medium text-zinc-100">{step.title}</p>
                  </div>
                  <p className="font-display mt-1 text-sm font-light text-zinc-500">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href="https://market-qx.pro/sign-up/?lid=619650"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="pricing-quotex-button"
              className={`${BTN_SECONDARY} w-full`}
            >
              <UserPlus className="h-4 w-4" />
              Create Quotex Account
            </a>
            <a
              href="https://t.me/Ayan_sx"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="pricing-contact-admin-button"
              className={`${BTN_SECONDARY} w-full`}
            >
              <Headset className="h-4 w-4 text-[#CCFF00]" />
              Contact Admin
            </a>
          </div>
        </div>

        {/* license */}
        <div
          className="relative flex flex-col overflow-hidden rounded-2xl border border-[#CCFF00]/50 bg-white/[0.03] p-7 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-8"
          data-testid="pricing-license-card"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 right-0 h-56 w-56 rounded-full blur-[70px]"
            style={{ background: 'radial-gradient(circle, rgba(204,255,0,0.18), transparent 70%)' }}
          />
          <div className="relative flex items-center justify-between gap-3">
            <h3 className="font-display text-xl tracking-tight text-white sm:text-2xl">Buy License</h3>
            <span className="font-display rounded-full bg-[#CCFF00] px-3.5 py-1.5 text-xs font-semibold text-black">
              Direct access
            </span>
          </div>
          <p className="font-display relative mt-3 text-sm font-light text-zinc-400">
            Skip broker registration. Purchase a direct, unrestricted 1-month license immediately.
          </p>

          <div className="relative mt-7 flex items-end gap-2">
            <span className="font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl">$99</span>
            <span className="font-display mb-2 text-sm text-zinc-500">/ month</span>
          </div>

          <ul className="relative mt-7 flex flex-1 flex-col gap-3.5">
            {LICENSE_PERKS.map((perk) => (
              <li key={perk} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#CCFF00]">
                  <Check className="h-3 w-3 text-black" />
                </span>
                <span className="font-display text-sm font-light text-zinc-300">{perk}</span>
              </li>
            ))}
          </ul>

          <a
            href="https://t.me/Ayan_sx"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="pricing-purchase-button"
            className={`${BTN_PRIMARY} relative mt-8 w-full`}
          >
            <KeyRound className="h-4 w-4" />
            Purchase License
          </a>
        </div>
      </div>
    </section>
  )
}

/* ── cta ── */
function CtaBand() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:pb-28">
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#050705] px-6 py-16 text-center sm:px-12 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 blur-[90px]"
          style={{ background: 'radial-gradient(ellipse at center, rgba(204,255,0,0.2), transparent 70%)' }}
        />
        <h2 className="font-display relative text-balance text-3xl font-medium tracking-tight text-white md:text-4xl lg:text-5xl">
          Start your trading career with Vertex AI
        </h2>
        <p className="font-display relative mx-auto mt-5 max-w-xl text-pretty text-base font-light text-zinc-400">
          Join thousands of traders using automated, data-driven signals to trade with confidence —
          every single day.
        </p>
        <Link
          href="/registration"
          data-testid="cta-create-account-button"
          className={`${BTN_PRIMARY} relative mt-10 w-full sm:w-auto`}
        >
          <Rocket className="h-4 w-4" />
          Create free account
        </Link>
      </div>
    </section>
  )
}

/* ── footer ── */
function Footer() {
  return (
    <footer id="support" className="scroll-mt-24 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <a href="#top" className="flex items-center gap-3" data-testid="footer-logo-link">
            <span className="relative h-9 w-9 overflow-hidden rounded-xl ring-1 ring-white/10">
              <Image src="/vertex-logo.png" alt="Vertex AI logo" fill className="object-cover" sizes="36px" />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-white">
              Vertex <span className="text-[#CCFF00]">AI</span>
            </span>
          </a>
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            <Link
              href="/privacy"
              data-testid="footer-privacy-link"
              className="font-display text-sm text-zinc-500 transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <a
              href="https://t.me/Ayan_sx"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-support-link"
              className="font-display text-sm text-zinc-500 transition-colors hover:text-white"
            >
              Support
            </a>
          </nav>
        </div>

        <div className="mt-10 flex gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
          <AlertTriangle className="h-5 w-5 shrink-0 text-[#CCFF00]/70" />
          <p className="font-display text-xs font-light leading-relaxed text-zinc-500">
            <span className="font-medium text-zinc-300">Trading Risk Disclaimer:</span> Trading
            financial instruments carries a high level of risk and may not be suitable for all
            investors. The high degree of leverage can work against you as well as for you. Past
            performance of Vertex AI is not indicative of future results. You should never trade with
            money you cannot afford to lose. Vertex AI provides tools and signals for informational
            purposes only and does not constitute financial advice.
          </p>
        </div>

        <p className="font-display mt-8 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} Vertex AI. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export function VertexLanding() {
  return (
    <div
      id="top"
      className="relative min-h-dvh bg-[#020302]"
      style={{
        backgroundImage:
          'radial-gradient(ellipse 90% 55% at 50% -10%, #132600 0%, rgba(6,10,4,0.85) 45%, #020302 100%)',
        backgroundAttachment: 'fixed',
      }}
    >
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <CtaBand />
      </main>
      <Footer />
    </div>
  )
}
