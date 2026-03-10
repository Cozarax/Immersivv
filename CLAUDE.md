# Immersivv — Project-specific Instructions

This file extends the user-level CLAUDE.md with project-specific context.
General principles (code quality, React conventions, TypeScript rules, naming) are defined there and apply here.

---

# Stack

- Astro 4.16 (static site generator)
- React + TypeScript — only for interactive components (.tsx)
- Tailwind CSS
- Content Collections (Astro built-in)

---

# Commands

```
npm run dev      # dev server
npm run build    # static build
npm run lint     # ESLint
npm run format   # Prettier
```

---

# Deployment

Hosted on Vercel. Static output (Astro default).
No environment variables required.

---

# Linting & Formatting

ESLint 9 (flat config) + Prettier 3.

- `eslint.config.js` — covers .astro, .ts, .tsx files
- `.prettierrc` — includes prettier-plugin-astro and prettier-plugin-tailwindcss

Run `npm run lint` before committing. Run `npm run format` to auto-format.

---

# Architecture Override

This is a static site, not a feature-driven React app.
The `src/features`, `src/hooks`, `src/utils` structure from the user-level CLAUDE.md does not apply here.

Actual structure:

```
src/
  layouts/          # MainLayout.astro — wraps all pages (Header, Footer, SEO, scroll reveal)
  components/
    layout/         # Header.astro, Footer.astro, Seo.astro
    ui/             # Reusable primitives: Button.tsx, Container.astro, SectionLabel.astro, etc.
    home/           # Sections used only on the homepage
    services/       # ServiceCard.astro, AudienceBlock.astro
    projects/       # ProjectCard.astro, ProjectHero.astro, ProjectContent.astro
    contact/        # ContactForm.tsx (React), ContactIntro.astro, Faq.astro
  pages/            # Astro file-based routing
  content/
    projects/       # .md files for each project (Astro Content Collections)
    config.ts       # Zod schema for the projects collection
  styles/
    global.css      # Design tokens, utility classes, scroll reveal, prose
```

---

# Pages

```
/             → src/pages/index.astro
/services     → src/pages/services.astro
/projets      → src/pages/projets/index.astro
/projets/[slug] → src/pages/projets/[slug].astro
/a-propos     → src/pages/a-propos.astro
/contact      → src/pages/contact.astro
```

---

# File Type Conventions

- `.astro` — default for layout, pages, and presentational components
- `.tsx` — only when client-side interactivity or React state is needed (e.g. ContactForm, Button)
- New components should be `.astro` unless interactivity requires React

---

# Design System

**Fonts** (defined in tailwind.config.mjs):
- `font-display` → Outfit (headings, display)
- `font-sans` → DM Sans (body)
- `font-mono` → JetBrains Mono

**Colors** (CSS custom properties in global.css, mapped to Tailwind utilities):

Backgrounds:
- `bg-bg` → #08080A (main background)
- `bg-bg-2` → #0E0E11
- `bg-bg-3` → #16161A

Text:
- `text-ink` → #EEEBE6 (primary text)
- `text-ink-2` → #878380 (secondary text)
- `text-ink-3` → #46433F (muted text)

Borders:
- `border-border` → #1D1D22
- `border-border-2` → #28282F

Accent (lime green):
- `text-accent` / `bg-accent` → #9ecd04
- `text-accent-light` → #b8e020
- `text-accent-dim` → #6a8a02

**Utility classes** (defined in global.css):
- `.section-label` — mono, uppercase, tracking-widest, with trailing line
- `.reveal` — scroll-reveal animation (opacity + translateY), triggered by IntersectionObserver in MainLayout
- `.fade-in` — CSS keyframe animation for entry
- `.prose-dark` — styled prose for project detail pages

---

# UI Patterns

Sections are numbered: "01 —", "02 —" etc., using the `<SectionLabel>` component.

Grid separator pattern: parent has `bg-border`, direct children have `bg-bg` — creates visual dividing lines between cells.

Scroll reveal: add class `.reveal` to any element. MainLayout's IntersectionObserver handles the `.visible` toggle.

---

# Content Collections

Projects are defined as `.md` files in `src/content/projects/`.

Required frontmatter fields (defined in `src/content/config.ts`):
- `title`, `description`, `type`, `stack` (array), `year`, `featured` (boolean)
- `context`, `objective`, `problem`, `solution`, `result`

Optional: `coverImage`, `liveUrl`, `repoUrl`

When adding or modifying projects, always respect this schema.
