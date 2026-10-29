# Demo Scope Notes (Nebius × NVIDIA Global AI Hackathon)

Intentional deviations from `docs/project.md`, recorded for judges and reviewers.

## 1. Single settings page (spec §12)
Spec calls for `/settings/general|agent|security|integrations`. Shipped as one
consolidated `/settings` page; sidebar links use section anchors
(`/settings#profile`, `/settings#preferences`). Consolidation keeps the WAL
surface small for the hackathon deadline and does not reduce functionality.

## 2. Forced dark theme (spec §2.1)
Spec names a light theme as primary. The product uses the NVIDIA-branded dark
palette (`#080B08` surfaces, `#76B900` accents) by design, with every color
tokenized so both themes are supported. Dashboard/auth layouts pin `dark`
permanently, so the theme preference control in settings does not switch
those routes.

## 3. Seeded demo data (spec §5.2, §20)
Benchmark results (`/benchmarks`, `/benchmarks/[benchmarkId]`) and model
telemetry (`/models`) are clearly labeled seed data for the demo and are not
live backend output. Overview, repositories, and runs read from the database.

## 4. Repository structure (spec §15)
`src/features/` layering was not adopted; feature logic lives under
`src/lib/` with route-level data access, an equivalent structure that keeps
these concerns separated.
