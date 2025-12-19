# RealstateX — Real Estate Hub

Modern real estate landing and admin portal built with React, Vite, TypeScript, Tailwind CSS, shadcn/ui (Radix), and Supabase. It includes a marketing site with forms and sections, plus protected admin views for clients, projects, subscribers, and inbox management.

## Features

- Landing pages: Hero, Projects, Testimonials, Newsletter, Consultation form
- UI kit: shadcn/ui components powered by Radix primitives
- Auth-ready: Supabase client with persisted sessions
- Admin area: Dashboard, Clients, Projects, Subscribers, Inbox
- Data fetching: TanStack Query
- Routing: React Router
- Styling: Tailwind CSS + utility helpers

## Tech Stack

- React 18, Vite 5, TypeScript 5
- Tailwind CSS 3, shadcn/ui, Radix UI
- Supabase JS 2
- TanStack Query, React Router
- Recharts, Embla Carousel, date-fns

## Getting Started

### Prerequisites

- Node.js 18 or newer
- Package manager: npm, pnpm, or bun (optional — `bun.lockb` present)

### 1) Clone the repository

```bash
git clone https://github.com/devsarthak2005/realstatex.git
cd realstatex
```

### 2) Install dependencies

```bash
# using npm
npm install

# or using pnpm
pnpm install

# or using bun
bun install
```

### 3) Configure environment

Create a `.env` file in the project root with your Supabase credentials:

```bash
VITE_SUPABASE_URL= https://pjtipqmwiyjryfckhewa.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY= eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqdGlwcW13aXlqcnlmY2toZXdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxMjI0NTgsImV4cCI6MjA4MTY5ODQ1OH0.CSsof5LeajnKFncAOg5c8o6-IPgiCgf3Wgt7foQzfns
```

These are read in [`src/integrations/supabase/client.ts`](src/integrations/supabase/client.ts).

### 4) Run the dev server

```bash
npm run dev
```

App runs at http://localhost:5173 by default (Vite).

### Build and Preview

```bash
npm run build      # production build
npm run preview    # serve built app
```

### Lint

```bash
npm run lint
```

## Project Structure

Key directories:

- `src/components/landing/` — Marketing sections (Hero, Projects, Testimonials, Footer, etc.)
- `src/components/admin/` — Admin layout and UI
- `src/pages/admin/` — Admin pages (Dashboard, Clients, Projects, Subscribers, Inbox)
- `src/integrations/supabase/` — Supabase client and types
- `supabase/` — Local migrations and config

## Supabase

The Supabase client is initialized in [`src/integrations/supabase/client.ts`](src/integrations/supabase/client.ts) and expects `$VITE_SUPABASE_URL` and `$VITE_SUPABASE_PUBLISHABLE_KEY`. Migrations and configuration are available under [`supabase/`](supabase).

## Deployment

Deploy any static host that supports SPA (e.g., Netlify, Vercel, GitHub Pages) or an HTTP server. Ensure environment variables are provided at build/runtime according to your platform.

## Contributing

PRs are welcome. Please run `npm run lint` and ensure builds pass before submitting.


