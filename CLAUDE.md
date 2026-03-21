# Senhorio

> The all-in-one rental management platform built for Portuguese landlords — track rents, issue receipts, calculate taxes, stay compliant.

## Identity
- **Slug**: senhorio
- **Target audience**: Portuguese landlords managing rental properties
- **Status**: mvp
- **Hive company ID**: 5e6e3d50-8f4d-47a3-b6b3-a0fc5f6bf62e

## Tech Stack
- Next.js 15 (App Router)
- Tailwind CSS 4
- Neon serverless Postgres
- Stripe Checkout + Customer Portal
- Resend for transactional email
- Deployed on Vercel

## Current Priorities
<!-- Updated by CEO agent each nightly cycle -->
1. (awaiting first cycle)

## Coding Standards
- TypeScript strict mode
- No ORMs — raw SQL with @neondatabase/serverless
- All API routes return `{ ok: boolean, data?: any, error?: string }`
- Use parameterized queries, never string interpolation for SQL
- Tailwind for all styling, no CSS modules
- Components in src/components/, pages in src/app/
- Keep bundle small — no heavy dependencies without justification

## Playbook Insights
<!-- Injected from Hive's shared playbook, filtered by relevance -->
(awaiting playbook injection)

## Constraints
- Budget: minimal — free tier infrastructure until revenue justifies upgrades
- No external dependencies unless absolutely necessary
- Mobile-responsive from day one
- Core user flow must work in under 3 clicks
- SEO: every page needs proper meta tags, OG images, structured data

## Infrastructure
- **Vercel project**: senhorio
- **Neon project**: (to be created)
- **GitHub repo**: carloshmiranda/senhorio
- **Stripe account**: (to be configured)
- **URL**: https://senhorio.vercel.app

## Do NOT
- Install packages without justification
- Store secrets in code — use Vercel env vars
- Make breaking API changes without updating the frontend
- Deploy without running `npm run build` successfully
- Ignore TypeScript errors