'use client'

import Image from 'next/image'
import {
  Gift,
  Rocket,
  Star,
  Crown,
  ShieldCheck,
  LayoutGrid,
  type LucideIcon,
} from 'lucide-react'
import { TopNav } from '@/components/top-nav'
import { TradingChart } from '@/components/trading-chart'
import { ToolCards } from '@/components/tool-cards'
import { type UserProfile } from '@/components/auth-provider'
import { normalizeTier, type Tier } from '@/lib/tiers'

const TIER_ICON: Record<Tier, LucideIcon> = {
  free: Gift,
  basic: Rocket,
  standard: Star,
  premium: Crown,
  admin: ShieldCheck,
}

export function DashboardContent({ profile }: { profile: UserProfile }) {
  const firstName = profile.name.split(' ')[0] || 'Trader'
  const tier = normalizeTier(profile.plan)
  const TierIcon = TIER_ICON[tier]

  return (
    <main className="home-bg relative min-h-dvh">
      <TopNav />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-5 px-4 py-8 sm:gap-6 sm:px-6 sm:py-10 lg:py-12">
        {/* Profile card */}
        <section className="welcome-luxe border-luxe surface-luxe relative overflow-hidden rounded-[1.75rem] p-6 shadow-2xl shadow-primary/10 sm:p-8">
          {/* animated conic luxury border trace */}
          <span aria-hidden className="welcome-luxe-border" />
          {/* corner glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[color-mix(in_oklab,var(--primary)_7%,transparent)] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-[color-mix(in_oklab,oklch(0.93_0.2_124)_6%,transparent)] blur-3xl" />
          {/* purple inner glow — breathing radial bloom from center */}
          <span aria-hidden className="welcome-luxe-purple pointer-events-none absolute inset-0 rounded-[1.75rem]" />
          {/* inner glow — soft light bleeding from the top edge */}
          <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] shadow-[inset_0_1px_0_oklch(1_0_0/0.08)]" />

          <div className="relative z-10 flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:gap-7 sm:text-left">
            {/* Profile picture — floating with animated glow ring */}
            <span className="avatar-float relative h-28 w-28 shrink-0 rounded-[1.5rem] sm:h-32 sm:w-32">
              {/* rotating conic glow ring */}
              <span aria-hidden className="avatar-glow-ring" />
              {/* breathing halo */}
              <span
                aria-hidden
                className="avatar-halo pointer-events-none absolute -inset-2 rounded-[1.6rem] bg-primary/12 blur-xl"
              />
              <span className="relative z-10 block h-full w-full overflow-hidden rounded-[1.4rem] ring-1 ring-primary/40">
                <Image
                  src="/vertex-profile.png"
                  alt={`${firstName} profile`}
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                  priority
                />
                {/* subtle sheen on top of the photo */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-primary/12"
                />
              </span>
            </span>

            {/* Name, plan tag, description */}
            <div className="min-w-0 flex-1">
              <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Welcome back
              </p>
              <div className="flex flex-col items-center gap-2.5 sm:flex-row sm:items-center">
                <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                  {profile.name}
                </h1>
                <span className="btn-luxe flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary-foreground">
                  <TierIcon className="h-3 w-3" />
                  {profile.plan}
                </span>
              </div>
              <p className="mx-auto mt-3 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground sm:mx-0">
                Your intelligent trading companion — analyzing OTC and real market
                charts to deliver fast, precise, AI-powered signals.
              </p>
            </div>
          </div>
        </section>

        {/* Live daily usage / limits */}
        <section>
          <TradingChart />
        </section>

        {/* Trading tools */}
        <section className="border-luxe surface-luxe relative overflow-hidden rounded-[1.75rem] p-5 sm:p-7">
          {/* ambient corner glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full bg-[color-mix(in_oklab,var(--gold)_14%,transparent)] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -left-24 h-56 w-56 rounded-full bg-[color-mix(in_oklab,var(--primary)_7%,transparent)] blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[color-mix(in_oklab,var(--gold)_14%,transparent)] via-[color-mix(in_oklab,var(--gold)_14%,transparent)] to-[color-mix(in_oklab,var(--primary)_7%,transparent)] text-[var(--gold)] ring-1 ring-[color-mix(in_oklab,var(--gold)_14%,transparent)]">
                <span className="pointer-events-none absolute -right-3 -top-3 h-8 w-8 rounded-full bg-[color-mix(in_oklab,var(--gold)_14%,transparent)] blur-md" />
                <LayoutGrid className="relative h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  Trading Tools
                </h2>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  AI-powered chart analysis, ready to use.
                </p>
              </div>
            </div>

            <div className="my-5 h-px w-full bg-gradient-to-r from-[color-mix(in_oklab,var(--gold)_14%,transparent)] via-border to-transparent" />

            <ToolCards />
          </div>
        </section>
      </div>
    </main>
  )
}
