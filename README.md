# Harpreet Singh — Portfolio

A premium, accessible portfolio for a **Full-Stack Software Engineer specializing in Applied AI**. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and Framer Motion.

Positioning: *Full-Stack Software Engineer · Applied AI · RAG & Computer Vision.*

## Features

- **Signature hero** — The positioning statement beside an interactive network of
  connected components (Applications, Backend, Data, AI). It responds to hover, tap,
  and arrow keys, and reveals a short explanation for each node.
- **Interactive project experiences** — Wizdom AI's retrieval pipeline and Vision AI's
  computer-vision pipeline are explorable: hover any stage for a description, or press
  Play to move a document or frame through the system. Clearly labelled as illustrative.
- **Career journey** — A scroll-linked, three-milestone narrative from engineering
  fundamentals to full-stack delivery to applied AI.
- **Capabilities** — A compact, interactive view of four disciplines; selecting one
  shows where it appears in the work.
- **GitHub Activity** — Live repository cards from the public GitHub API with graceful fallback
- **Contact** — Direct links plus a working contact form (validated, with loading,
  success, and error states) that sends through the Web3Forms free tier
- **Case Studies** — Dedicated pages at `/projects/[slug]` with an interactive architecture view
- **RAG Playground** — An in-browser retrieval simulation at `/playground` (explicitly labeled as simulated)
- **Engineering Notes** — Short learning-journal articles at `/notes`
- **Craft details** — A command palette (`⌘K` / `Ctrl-K`), magnetic primary buttons,
  a subtle route transition, and a hidden spare node for the curious to find.

Everything honours `prefers-reduced-motion`, works with a keyboard, and avoids
horizontal overflow on mobile.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion (respects reduced-motion preferences)
- **Icons:** Lucide React
- **Fonts:** Geist Sans & Geist Mono for UI, Newsreader for editorial display headings, via `next/font`

No paid services or databases are required. The contact form uses the free
Web3Forms tier with a public form key included by default (see
[Contact form](#9-contact-form--web3forms) below).

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

The verified skill inventory, marked `"professional"` or `"learning"`. The homepage
surfaces this breadth through the interactive **Capabilities** section rather than a
skill grid, so professional experience is never overstated.

### 6. Experience — `lib/data/experience.ts`

The verified career summary. The homepage tells this story through the scroll-linked
**Journey**; keep this data in sync if you later add confirmed roles. Never invent
employers or dates.

### 7. Notes — `lib/data/articles.ts`

Add a slug, title, date, tags, reading time, excerpt, and optional markdown body.

### 8. Resume — `public/resume/`

The resume PDF lives at `public/resume/Harpreet_Singh_AI_Engineer_Resume.pdf`.
Update `profile.resumePath` if you rename it.

### 9. Contact form — Web3Forms

The contact form sends through [Web3Forms](https://web3forms.com)' free tier. A
public form key is included by default, so it works with no setup. The key is a
**public form identifier** (not a secret) — that is why Web3Forms documents it
for client-side use and why it can live in the app. You can restrict it to your
domain from the Web3Forms dashboard.

To rotate or override the key, set it in `.env.local` (see `.env.example`):

```bash
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-web3forms-access-key
```

If the key is ever missing the form shows a clear error and points visitors to
your email address instead — it never reports a false success. Prefer a
server-side proxy instead? Web3Forms requires a paid plan plus server IP
whitelisting for server-side submissions, so the free-tier setup above runs in
the browser.

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout, metadata, nav & footer
│   ├── page.tsx            # Home (Hero → Featured Projects → Journey → Capabilities → GitHub → Contact)
│   ├── template.tsx        # Subtle route-change fade
│   ├── globals.css         # Theme tokens, atmosphere, focus states, reduced motion
│   ├── projects/[slug]/    # Project case studies
│   ├── notes/              # Engineering notes
│   ├── playground/         # RAG playground
│   ├── api/github/         # GitHub proxy route
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/             # Navbar, Footer, MotionProvider, SiteBackground, CommandPalette
│   ├── home/               # Hero, NodeNetwork, FeaturedProjects, Journey, Capabilities, GitHub, Contact
│   ├── projects/           # PipelinePlayer + Wizdom/Vision experiences, PipelineDetail
│   ├── playground/         # RAG simulation UI
│   └── ui/                 # Button, Card, Badge, Section, Magnetic primitives
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
3. (Optional) add environment variables:
   - `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` — override the included public contact key.
   - `NEXT_PUBLIC_SITE_URL` — recommended; your production URL.
4. Deploy — the contact form works out of the box with the included key.

Any Node.js host works too; the app has no external runtime dependencies.

## Notes

- **Accuracy first** — no fabricated employers, metrics, or qualifications.
- **Accessibility** — semantic landmarks, keyboard support, visible focus states,
  ARIA labels, and reduced-motion handling.
- **GitHub API** — unauthenticated (60 requests/hour). An optional `GITHUB_TOKEN`
  env var could raise this if ever needed.

## License

MIT
