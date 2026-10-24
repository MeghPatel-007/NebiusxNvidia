
# Build RepoPilot — Engineering Dashboard

Act as a senior product designer and staff-level Next.js engineer. Implement a polished engineering dashboard for **RepoPilot**, an AI repository debugging agent powered by NVIDIA Nemotron through Nebius Token Factory.

## Design reference

Use the supplied Repoverse dashboard screenshot as inspiration for layout and information hierarchy, not as a pixel-for-pixel copy.

Preserve these design characteristics:

- Persistent, narrow left sidebar with grouped navigation.
- Compact top header with current project, repository context, and primary actions.
- Clean white or warm-neutral surfaces, subtle gray borders, restrained green accents, and high information density.
- A spacious central content area with metric cards, an activity heatmap, and data tables.
- A contextual activity panel on the right on sufficiently wide screens.
- Small, consistent typography and restrained shadows. Avoid oversized headings, excessive rounded cards, neon gradients, and generic AI landing-page styling.

## Technology requirements

- Next.js 16 App Router and TypeScript.
- Tailwind CSS v4 and shadcn/ui.
- Lucide React icons.
- Framer Motion for subtle transitions.
- TanStack Query for API state and caching.
- React Hook Form and Zod for forms.
- A lightweight charting solution only where it adds value.
- Python FastAPI remains the independent agent backend.

## Main dashboard

Implement:

1. A responsive sidebar containing Overview, Repositories, Agent Runs, Benchmarks, Models & Usage, and Settings.
2. A compact header with workspace name, selected repository, notifications or activity access, and a New Debug Session action.
3. Four KPI cards: Verified Fixes, Test Pass Rate, Average Repair Time, and Connected Repositories.
4. An agent activity heatmap representing daily run volume or verified fixes.
5. A recent runs table with repository, issue summary, status, duration, and timestamp.
6. A latest activity panel displaying real investigation events.
7. Loading, empty, error, running, passed, failed, and unverified states.
8. Responsive behavior: collapse the sidebar on mobile and move the activity panel below the main content.

## Agent run detail page

Implement a separate route with:

- Bug report and repository metadata.
- A chronological investigation timeline.
- Evidence-linked findings with source file and line references.
- A readable code diff with added and removed lines.
- Test command, exit status, stdout/stderr, and duration.
- An explicit verification state based on actual test execution.
- A retry or rerun action only when supported by the backend.

## Engineering constraints

- Inspect the existing repository before editing.
- Reuse existing components, tokens, and conventions where possible.
- Do not rewrite unrelated pages or replace the project's established design system.
- Keep components small, typed, accessible, and reusable.
- Create realistic mock data only for the initial UI scaffold. Label mock metrics clearly and replace them with API-backed data when the backend is available.
- Never claim that a patch passed tests based on LLM output alone.
- Do not expose Token Factory API keys to the browser.
- Do not execute untrusted repository code in the Next.js application process.
- Do not invent backend endpoints. Define typed interfaces and coordinate contracts with the FastAPI implementation.
- Add sensible skeletons, empty states, error handling, keyboard navigation, and mobile layouts.

## Deliverables

Implement the dashboard, navigation shell, run-history table, activity heatmap, metric cards, and agent run detail page. Keep the scope focused on a functional engineering workspace rather than a marketing website.

After implementation, run lint, type checks, and the available tests. Report which files changed, which checks passed, and any remaining integration work.
