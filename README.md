# Harpreet Singh — Portfolio

A premium, accessible portfolio for a **Full-Stack Software Engineer specializing in Applied AI**. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and Framer Motion.

Positioning: *Full-Stack Software Engineer · Applied AI · RAG & Computer Vision.*

## Features

- **Hero** — Confident positioning statement with an animated retrieval-pipeline visual
- **Featured Projects** — Two professional case studies plus a configurable personal-project slot
- **Experience & Capabilities** — Career summary, focus areas, and headline stats
- **Technical Toolkit** — Compact, filterable skill matrix
- **GitHub Activity** — Live repository cards from the public GitHub API with graceful fallback
- **Contact** — Direct links plus a mailto contact form
- **Case Studies** — Dedicated pages at `/projects/[slug]` with an interactive architecture view
- **RAG Playground** — An in-browser retrieval simulation at `/playground` (explicitly labeled as simulated)
- **Engineering Notes** — Short learning-journal articles at `/notes`

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion (respects reduced-motion preferences)
- **Icons:** Lucide React
- **Fonts:** Geist Sans & Geist Mono via `next/font`

No paid services, API keys, or databases are required.

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm start          # run the production build
npm run lint       # eslint
```

## Configuration

Almost everything is data-driven. Edit these files — no component changes required.

### 1. Profile — `lib/config/profile.ts`

Name, initials, title, tagline, location line, years of experience, email, resume path, social links, and navigation links.

### 2. Site URL — `lib/config/site.ts`

Used for canonical URLs, `sitemap.xml`, and `robots.txt`. Set `NEXT_PUBLIC_SITE_URL` in Vercel (e.g. `https://your-domain.com`) or edit the fallback.

### 3. Projects — `lib/data/projects.ts`

Each entry powers a card on the homepage and a page at `/projects/[slug]`.
`featured: true` renders it as a primary card; the non-featured entry fills the
configurable "latest personal project" slot.

> Professional projects intentionally have **no public repository links** — the
> work is internal and confidential. Update `githubUrl` / `demoUrl` only for
> genuinely public projects.

### 4. GitHub — `lib/data/github.ts`

`username` drives the live API integration. Public repos are fetched server-side
in `app/api/github/route.ts` (no client token, cached for one hour) and filtered
to exclude forks and archived repositories. If the API is rate-limited or
unreachable, the UI falls back to `fallbackRepos` and links to the profile.

Optional curation:

```ts
pinned: ["my-rag-app", "cv-demo"], // show only these, in this order
exclude: ["old-class-project"],     // hide these
maxRepos: 6,                        // cap the number shown
```

### 5. Skills — `lib/data/skills.ts`

Each skill is marked `"professional"` or `"learning"`. Learning items render with
a subtle marker so professional experience is never overstated.

### 6. Experience — `lib/data/experience.ts`

Only verified information is included. Add real roles as they are confirmed —
never invent employers or dates.

### 7. Notes — `lib/data/articles.ts`

Add a slug, title, date, tags, reading time, excerpt, and optional markdown body.

### 8. Resume — `public/resume/`

The resume PDF lives at `public/resume/Harpreet_Singh_AI_Engineer_Resume.pdf`.
Update `profile.resumePath` if you rename it.

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout, metadata, nav & footer
│   ├── page.tsx            # Home page (Hero → Projects → Experience → Skills → GitHub → Contact)
│   ├── globals.css         # Theme tokens, focus states, reduced motion
│   ├── projects/[slug]/    # Project case studies
│   ├── notes/              # Engineering notes
│   ├── playground/         # RAG playground
│   ├── api/github/         # GitHub proxy route
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/             # Navbar, Footer, MotionProvider
│   ├── home/               # Home sections
│   ├── projects/           # Interactive pipeline detail
│   ├── playground/         # RAG simulation UI
│   └── ui/                 # Button, Card, Badge, Section primitives
├── lib/
│   ├── config/             # profile.ts, site.ts
│   ├── data/               # projects, skills, experience, articles, github
│   ├── types/              # Shared TypeScript types
│   └── utils/              # cn, date, rag simulation
└── public/resume/          # Resume PDF
```

## Deployment (Vercel)

1. Push the repository to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. (Optional but recommended) add an environment variable
   `NEXT_PUBLIC_SITE_URL` set to your production URL.
4. Deploy — no other configuration or secrets required.

Any Node.js host works too; the app has no external runtime dependencies.

## Notes

- **Accuracy first** — no fabricated employers, metrics, or qualifications.
- **Accessibility** — semantic landmarks, keyboard support, visible focus states,
  ARIA labels, and reduced-motion handling.
- **GitHub API** — unauthenticated (60 requests/hour). An optional `GITHUB_TOKEN`
  env var could raise this if ever needed.

## License

MIT
