# Santosh Kumar Verma — Portfolio

Multi-page portfolio · "Mint Future" pastel design · live at https://santoshverma.online

## Stack
TanStack Start (React 19, file-based routing, SSR) · Tailwind CSS v4 · Framer Motion · Lovable Cloud (contact email via Resend).

## Pages
| URL | File | What it shows |
|---|---|---|
| `/` | `src/pages/HomePage.tsx` | Hero, marquee, stats, selected work, services, rocket stack |
| `/about` | `src/pages/AboutPage.tsx` | Story (scroll-lit text), services, education |
| `/projects` | `src/pages/ProjectsPage.tsx` | Full project list |
| `/skills` | `src/pages/SkillsPage.tsx` | Rocket lift-off with logos as stars + grouped tools |
| `/experience` | `src/pages/ExperiencePage.tsx` | Timeline with scroll-drawn line |
| `/contact` | `src/pages/ContactPage.tsx` | Contact cards + message form |
| `/hire` | `src/pages/HirePage.tsx` | Project brief form |
| `/freelance`, `/education`, `/certifications`, `/awards`, `/resume` | `src/pages/*` | Secondary pages |
| anything else | `src/pages/NotFound.tsx` | Animated 404 |

Each URL's SEO title/description is in `src/routes/<name>.tsx`.

## Editing content (no coding needed)
Almost all text lives in **`src/content/site.ts`**: name, intro, nav, stats, services, projects, tech stack, experience, education, contact. Email/phone/social links are in `src/lib/links.ts`.

- **Add a project:** copy one object in `PROJECTS`, change the fields. `tone` = card colour (`mint`, `sky`, `peach`, `lilac`).
- **Add a tech logo:** add to `STACK` with a `slug` from https://simpleicons.org, or a 2-letter `mono` if no logo exists.
- **Images:** see `src/assets/README.md`.

## Design system
Colours are defined once in `src/styles.css` (`:root`). Change a value there and the whole site updates.

| Token | Hex | Use |
|---|---|---|
| background | #F4FBF8 | Page |
| mint | #BFEBD9 | Primary accent, active nav |
| sky | #D7E3FF | Secondary cards |
| peach | #FFE8C7 | Highlights |
| ink | #16241F | Text, buttons, dark panels |

Fonts: Syne (headings), Manrope (body), JetBrains Mono (labels) — loaded in `src/routes/__root.tsx`.

## Animations
- `components/site/Loader.tsx` — intro counter, once per browser session
- `components/site/Reveal.tsx` — `Reveal` (fade-up on scroll), `SplitHeading` (word mask), `PageHeader`
- `components/site/RocketStack.tsx` — tech-stack launch
- Page transitions in `src/routes/__root.tsx`
- All motion respects the visitor's "reduce motion" setting.

## Run locally
```bash
bun install
bun run dev      # http://localhost:8080
bun run build
```

## Troubleshooting
| Problem | Fix |
|---|---|
| Contact form says "couldn't send" | The `RESEND_API_KEY` secret is missing or invalid in Cloud settings |
| A tech logo shows letters instead | The simpleicons slug is wrong or was removed — check simpleicons.org |
| Image not showing | File name in `src/assets` doesn't match the import in `site.ts` |
| Intro loader won't replay | It shows once per session — open a new tab |
| Page 404 after adding a file | Route files must live in `src/routes/` and match the URL |
