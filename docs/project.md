
# RepoPilot — Complete Frontend Design & Implementation Specification

**Document type:** Product UI/UX specification + frontend implementation blueprint
**Product:** RepoPilot — Autonomous AI Repository Debugging Agent
**Primary stack:** Next.js 16 App Router, TypeScript, Tailwind CSS v4, shadcn/ui
**AI backend:** FastAPI + NVIDIA Nemotron via Nebius Token Factory
**Reference:** User-provided Repoverse dashboard screenshot
**Design direction:** Minimal, data-dense, premium engineering workspace
**Priority:** Frontend quality, consistent interactions, accessibility, responsive behavior, and integration readiness

---

# 1. Product Vision

## 1.1 What is RepoPilot?

RepoPilot is an AI engineering workspace that helps developers investigate software defects, understand unfamiliar repositories, generate code patches, and verify changes by executing tests.

The frontend must make this workflow visible and understandable. It must not resemble a generic chatbot, an AI marketing landing page, or a generic admin dashboard.

The product should communicate three things immediately:

1. **Engineering context:** Which repository, branch, issue, and execution are being inspected?
2. **Agent progress:** What has the agent inspected, diagnosed, changed, and tested?
3. **Verification evidence:** What actually passed, what failed, and what remains uncertain?

## 1.2 Core design principle

Design RepoPilot as a professional developer tool with the clarity of a modern Git platform, the density of an engineering analytics dashboard, and the usability of a polished SaaS application.

Use the supplied Repoverse screenshot as the primary reference for:

- Persistent left navigation.
- Compact horizontal header.
- Workspace and repository breadcrumbs.
- Small, restrained controls.
- Main content occupying most of the viewport.
- Contextual activity on the right.
- Thin dividers instead of excessive card shadows.
- Green accents for positive activity and successful states.
- Data-rich tables and contribution-style heatmaps.

Do not copy Repoverse branding, text, metrics, or unrelated business concepts.

## 1.3 Design principles

### Principle A — Information density without clutter

Prefer compact tables, clear labels, aligned metrics, and meaningful whitespace. Avoid oversized cards and unnecessary decorative elements.

### Principle B — Evidence before AI claims

Every diagnosis, patch, and verification result must have a distinct visual representation. Never show an AI-generated success message as proof that tests passed.

### Principle C — Consistent application shell

All authenticated pages use the same sidebar, top header, content width, typography, navigation states, and responsive behavior.

### Principle D — Functional interfaces

Every visible button, filter, menu, tab, search field, and link must have a defined behavior. Do not ship decorative controls that look interactive but do nothing.

### Principle E — Progressive disclosure

Show the most important information first. Put detailed model traces, raw logs, advanced filters, and technical metadata behind tabs, expandable sections, or secondary panels.

---

# 2. Global Visual Design System

## 2.1 Color palette

Use a light theme as the primary experience, matching the supplied reference.

| Token          | Value       | Usage                                   |
| -------------- | ----------- | --------------------------------------- |
| Background     | `#F7F8F7` | Overall application background          |
| Surface        | `#FFFFFF` | Main panels and cards                   |
| Surface subtle | `#F9FAF9` | Table headers and secondary areas       |
| Border         | `#E7EAE7` | Card outlines and dividers              |
| Border strong  | `#D7DDD8` | Inputs and active structural boundaries |
| Text primary   | `#202522` | Headings and primary content            |
| Text secondary | `#68716B` | Descriptions and supporting labels      |
| Text muted     | `#909891` | Timestamps and tertiary information     |
| Primary green  | `#16A34A` | Main actions and success accents        |
| Green hover    | `#15803D` | Hovered primary actions                 |
| Green subtle   | `#EAF7ED` | Selected states and success surfaces    |
| Green border   | `#C7E8CE` | Success outlines                        |
| Info blue      | `#2563EB` | Informational status                    |
| Warning amber  | `#B7791F` | Warnings and pending states             |
| Error red      | `#DC2626` | Failed runs and destructive warnings    |
| Error subtle   | `#FEF2F2` | Failure backgrounds                     |

Define these as CSS variables in the global design system. Avoid scattering hexadecimal colors across components.

Use green sparingly. It should identify meaningful actions and successful states, not decorate every element.

## 2.2 Typography

Use Inter or Geist Sans for application UI.

| Element             | Target styling                     |
| ------------------- | ---------------------------------- |
| Page title          | 24–28px, semibold                 |
| Section title       | 15–18px, semibold                 |
| Card metric         | 26–32px, semibold                 |
| Body text           | 13–14px                           |
| Table text          | 12–13px                           |
| Form labels         | 12–13px, medium                   |
| Supporting metadata | 11–12px                           |
| Code                | Geist Mono or equivalent monospace |

Keep heading sizes restrained. The reference is an engineering dashboard, not an editorial website.

Use tabular numerals for metrics, durations, timestamps, and percentages where appropriate.

## 2.3 Spacing and sizing

Use a consistent 4px spacing scale.

- Main content padding: 24px on desktop.
- Section gaps: 24–32px.
- Card padding: 16–20px.
- Compact table rows: 44–52px.
- Form control height: 38–42px.
- Sidebar width: approximately 250px expanded.
- Sidebar collapsed width: approximately 68px.
- Header height: approximately 64px.
- Right contextual panel: approximately 270–310px.
- Standard card radius: 8–12px.
- Standard border: 1px solid the border token.

Avoid excessive pill-shaped controls. Reserve full pills for status indicators or compact filters when appropriate.

## 2.4 Iconography

Use Lucide React consistently.

- Default icon size: 16px.
- Sidebar icon size: 18px.
- Large empty-state icon: 28–36px.
- Use one consistent stroke weight.
- Every icon-only control needs an accessible label and tooltip.
- Do not mix unrelated icon libraries.

## 2.5 Elevation

Prefer flat surfaces and subtle borders.

- Default card: border, no prominent shadow.
- Dropdown: subtle shadow and border.
- Dialog: restrained shadow and clear overlay.
- Sticky header: optional subtle shadow after scrolling.
- Hovered table row: subtle neutral surface.

Do not apply shadows to every card.

## 2.6 Motion

Use Framer Motion for purposeful, subtle interactions.

- Dropdown: 120–160ms.
- Tooltip: short delay, no dramatic entrance.
- Dialog: 160–220ms.
- Page content: subtle opacity transition.
- Run timeline: animate newly received steps only.
- Sidebar collapse: approximately 180ms.

Respect `prefers-reduced-motion`. Do not animate large charts, entire pages, or every table row unnecessarily.

---

# 3. Application Information Architecture

## 3.1 Route map

Implement the following routes using the Next.js App Router.

### Public routes

- `/` — Product landing page.
- `/login` — Sign-in page.
- `/signup` — Registration page, if authentication is implemented.
- `/privacy` — Privacy information.
- `/terms` — Terms of use, if required.

### Authenticated workspace routes

- `/overview` — Main dashboard.
- `/repositories` — Repository directory.
- `/repositories/[repoId]` — Repository details.
- `/repositories/[repoId]/settings` — Repository-specific configuration.
- `/runs` — All agent executions.
- `/runs/new` — New debugging session.
- `/runs/[runId]` — Agent execution detail.
- `/benchmarks` — Evaluation results.
- `/benchmarks/[benchmarkId]` — Benchmark detail.
- `/models` — Model configuration and usage.
- `/settings/general` — Workspace preferences.
- `/settings/agent` — Agent configuration.
- `/settings/security` — Execution and security configuration.
- `/settings/integrations` — Connected services.
- `/settings/team` — Team management, if implemented.

Do not create empty pages merely to fill out the navigation. Every implemented route needs a meaningful interface, a working state, and a clear purpose.

## 3.2 Main navigation

Use grouped sidebar navigation.

**Workspace**

- Overview
- Repositories
- Agent Runs
- Benchmarks

**Configuration**

- Models & Usage
- Settings

**Workspace footer**

- Current workspace identity
- User profile menu
- Help or documentation link

The current navigation item must be visually distinct using a light green background, green icon, and stronger text weight.

Nested repository pages should show an appropriate active parent state.

---

# 4. Shared Application Shell

## 4.1 Sidebar

Create `AppSidebar`.

### Structure

1. RepoPilot logo and wordmark.
2. Workspace switcher or current workspace label.
3. Navigation groups.
4. Optional repository shortcuts.
5. Help link.
6. User profile and account menu.

### Behavior

- Expanded by default on desktop.
- Collapsible with a dedicated control.
- Collapsed state shows icons and tooltips.
- On smaller screens, use a drawer rather than a permanently visible sidebar.
- Persist the sidebar preference if the application already has an appropriate preference store.
- Highlight the current route.
- Support keyboard navigation and visible focus indicators.

### Visual treatment

Use a white background, a subtle right border, compact navigation spacing, and restrained active states.

Avoid oversized logos, colorful gradient backgrounds, and unnecessary decorative illustrations.

## 4.2 Top header

Create `AppHeader`.

### Left side

- Sidebar toggle.
- Breadcrumbs.
- Current page or repository context.

### Right side

- Global search.
- Optional command menu.
- Notifications or activity access, only if functional.
- Primary action: `New Debug Session`.
- User avatar menu.

The primary action must remain easy to find without overpowering the interface.

### Breadcrumb examples

`Workspace / Overview`

`Repositories / utils-api`

`Agent Runs / run_8f31`

Use actual repository and run names from the API. Do not hardcode sample values into production views.

## 4.3 Main content container

Create a shared content layout.

- Use a consistent maximum width appropriate for the data-heavy application.
- Allow wide tables and code diff views to use additional horizontal space.
- Keep page headings, descriptions, and actions aligned.
- Apply consistent page padding.
- Ensure the layout works with and without the right contextual panel.

## 4.4 Right contextual panel

Use a reusable `ActivityPanel` on pages where it adds value.

Its content varies by route:

- Overview: latest agent activity.
- Repository detail: latest runs for that repository.
- Agent run detail: current execution events.
- Benchmarks: latest evaluation jobs.

The panel should not be forced onto every page. On smaller screens, move it below the primary content or open it through a drawer.

---

# 5. Page Specification: Overview Dashboard

**Route:** `/overview`

This is the primary entry point and should closely follow the layout hierarchy of the supplied reference.

## 5.1 Page header

Display:

- Page title: `Overview`
- Short description: `Monitor repository debugging and agent execution activity.`
- Current workspace or project selector.
- Date range selector, if the backend supports date-based reporting.
- Primary button: `New Debug Session`.

## 5.2 KPI cards

Create four compact metric cards.

### Card 1 — Verified Fixes

- Total verified fixes in the selected period.
- Optional comparison with the previous period.
- Small success icon.
- Tooltip explaining the metric.
- Click navigates to filtered runs with verified status.

### Card 2 — Test Pass Rate

- Percentage of eligible executions whose relevant verification tests passed.
- Show the numerator and denominator where possible.
- Click opens relevant benchmark or run details.

### Card 3 — Average Repair Time

- Average duration for completed repair workflows.
- Clearly define whether duration includes queue time.
- Click opens execution history.

### Card 4 — Repositories

- Number of configured repositories.
- Click opens the repository directory.

### Data integrity

Do not use static numbers in the real dashboard.

During development, mock data may be used, but it must be labeled clearly. If there are no executions, display a zero state instead of fabricated success percentages.

## 5.3 Activity heatmap

Create `ActivityHeatmap`.

Display daily agent activity across a configurable period, using a contribution-calendar visual.

Possible measures:

- Number of agent runs.
- Number of verified fixes.
- Number of tests executed.

Use one clearly named measure per heatmap. Do not mix unrelated metrics in one visualization.

Interactions:

- Hover or keyboard focus shows the date and exact count.
- Clicking a day filters the run list.
- Include a legend from lower to higher activity.
- Distinguish days with no data from missing data.
- Provide an accessible text alternative.

Do not generate pseudo-random activity values in production.

## 5.4 Recent agent runs

Create a compact table with:

- Status indicator.
- Run title or issue summary.
- Repository.
- Branch, if available.
- Verification status.
- Duration.
- Timestamp.
- Row action menu.

Clicking a row opens `/runs/[runId]`.

Support:

- Sorting.
- Status filtering.
- Pagination or incremental loading.
- Search.
- Empty and error states.

## 5.5 Latest activity

Display a chronological activity feed.

Examples of event types:

- Repository indexed.
- Diagnosis completed.
- Patch generated.
- Tests started.
- Tests passed.
- Tests failed.
- Repair attempt exhausted.

Each event should include a concise description and relative timestamp. Link to the associated repository or execution.

## 5.6 Dashboard states

### First-time state

Explain that the user has not connected a repository and offer two actions:

- `Connect Repository`
- `Try Sample Repository`

### Loading state

Use skeletons matching the size and placement of the final components.

### Error state

Explain what failed and offer a retry action where appropriate.

### Partial data state

Render available sections normally. Do not block the entire dashboard because one metric endpoint failed.

---

# 6. Page Specification: Repositories

**Route:** `/repositories`

## 6.1 Purpose

Provide a clear directory of repositories available to the debugging agent.

## 6.2 Header

Display:

- Title: `Repositories`
- Description: `Manage repositories available for investigation and testing.`
- Search input.
- Language filter, if supported.
- Status filter.
- Primary action: `Connect Repository`.

## 6.3 Repository list

Use a compact table or list with:

- Repository name.
- Provider or source.
- Primary language.
- Default branch.
- Last indexed time.
- Last agent run.
- Latest verification status.
- Actions.

Use a table on desktop and compact repository cards on mobile.

## 6.4 Repository connection dialog

Fields:

- Repository URL.
- Optional branch.
- Repository access mode.
- Confirmation of supported language.

Validation:

- Validate URL format.
- Reject unsupported providers with a useful message.
- Explain permissions and private-repository limitations.
- Show progress during connection.
- Provide a retry action after failure.

Never imply that private GitHub repository access works unless the required integration is implemented.

For the first MVP, allow a curated public sample repository if direct repository integration is not ready.

## 6.5 Repository detail

**Route:** `/repositories/[repoId]`

Header:

- Repository name.
- Source URL.
- Default branch.
- Indexing status.
- `New Debug Session` action.
- More-actions menu.

Tabs:

1. Overview
2. Agent Runs
3. Source Files, if implemented
4. Settings

### Overview tab

Show:

- Repository metadata.
- Last indexing result.
- Recent runs.
- Language and file counts, if measured.
- Verification statistics from real execution history.

### Agent Runs tab

Show runs associated with this repository, with filters and links to individual run details.

### Source Files tab

If implemented, display a simple file browser with search and source excerpts. Do not create an entire IDE unless time permits.

### Settings tab

Show repository-specific defaults, allowed test commands, and indexing options where supported.

---

# 7. Page Specification: Agent Runs

**Route:** `/runs`

## 7.1 Purpose

Provide a searchable history of all debugging and verification executions.

## 7.2 Header

- Title: `Agent Runs`
- Description: `Inspect debugging sessions, patches, and verification results.`
- Search field.
- Filters.
- `New Debug Session` action.

## 7.3 Filters

Support:

- Repository.
- Execution status.
- Verification outcome.
- Date range.
- Initiating user, if team support exists.

Provide a visible clear-filters action.

Represent active filters as removable chips where appropriate.

## 7.4 Runs table

Columns:

- Run identifier or issue title.
- Repository.
- Status.
- Verification result.
- Repair attempts.
- Duration.
- Created time.
- Actions.

Use status badges consistently:

- Queued
- Running
- Completed
- Failed
- Cancelled

Keep verification status separate from execution status. A completed run can still be unverified.

## 7.5 Row interactions

- Click row: open run details.
- Menu: view details, rerun, copy run ID, where supported.
- Never offer deletion or rerun actions without actual backend support.

---

# 8. Page Specification: New Debug Session

**Route:** `/runs/new`

This page starts the primary product workflow.

## 8.1 Layout

Use a focused form, not a conversational landing page.

Place the form in the main column and a compact explanatory panel beside it on desktop.

## 8.2 Required fields

### Repository

- Select a connected repository.
- Display its default branch and language.

### Branch or revision

- Optional branch or commit identifier.
- Validate against available repository metadata when supported.

### Bug report

- Multiline textarea.
- Placeholder should ask for expected behavior, observed behavior, and reproduction steps.
- Clearly mark this field as required.

### Test selection

- Automatic detection as the default.
- Optional targeted test path or command only when supported.
- Explain that commands execute in an isolated environment.

### Advanced options

Initially keep these limited:

- Maximum repair attempts.
- Test timeout.
- Model selection, if the backend genuinely supports it.

Use sensible defaults and do not expose unsafe unrestricted shell options.

## 8.3 Submission behavior

On submit:

1. Validate inputs.
2. Disable duplicate submissions.
3. Show a clear pending state.
4. Create the execution through the backend.
5. Navigate to `/runs/[runId]` after receiving a valid run identifier.
6. Display a helpful error if the request fails.

The primary button should say `Start Debug Session`.

## 8.4 Sample repository mode

If the application supports a curated sample, provide a secondary action such as `Try Demo Repository`.

Clearly label it as a sample and explain that it uses a known reproducible bug.

---

# 9. Page Specification: Agent Run Details

**Route:** `/runs/[runId]`

This is the most important page in RepoPilot.

The design should make the debugging workflow feel transparent, technical, and trustworthy.

## 9.1 Header

Display:

- Run title.
- Repository and branch.
- Run identifier.
- Execution status.
- Verification status.
- Start time and duration.
- Actions: rerun, copy ID, or cancel only when supported.

Do not combine execution and verification status into one ambiguous badge.

## 9.2 Summary panel

Display:

- Bug report summary.
- Root-cause explanation.
- Files inspected.
- Patch status.
- Number of tests passed and failed.
- Repair attempt count.

The root-cause summary must link to its supporting source evidence.

## 9.3 Investigation timeline

Create a vertical timeline showing:

1. Repository loaded.
2. Source inspection completed.
3. Diagnosis generated.
4. Evidence references validated.
5. Patch generated.
6. Patch applied.
7. Tests executed.
8. Repair attempt, if needed.
9. Final report produced.

Each step contains:

- Status icon.
- Step title.
- Short explanation.
- Timestamp or duration, when available.
- Expandable technical details.

During execution, show the current step and poll the backend or subscribe to a supported event stream.

Do not fake progress by incrementing a timer while the backend is idle.

## 9.4 Code diff panel

Create `CodeDiffViewer`.

Requirements:

- File selector or changed-file list.
- Added and removed line highlighting.
- Line numbers.
- Monospace typography.
- Horizontal scrolling where necessary.
- Copy diff action.
- Expand/collapse unchanged sections.
- Responsive layout.

Use Monaco only if its bundle size and integration cost are justified. A lightweight diff renderer is sufficient for the MVP.

## 9.5 Findings panel

Each finding should display:

- Severity, where meaningful.
- Short title.
- Root-cause explanation.
- Source path.
- Start and end line.
- Evidence excerpt.
- Confidence, only if the model produces a meaningful calibrated or clearly qualified value.

Validate source references against the actual repository. Clicking a finding should open the corresponding source excerpt or diff location.

## 9.6 Test results panel

Display:

- Actual test command.
- Execution exit code.
- Total tests.
- Passed tests.
- Failed tests.
- Skipped tests, if applicable.
- Duration.
- Standard output and standard error.
- Individual failure details.

The interface must distinguish:

- Tests passed.
- Tests failed.
- Tests were not run.
- Test execution timed out.
- Test execution infrastructure failed.

These are different outcomes and must never be represented by the same success badge.

## 9.7 Verification banner

Use three clear primary states.

### Verified

The relevant verification tests ran successfully after the patch.

Show the actual test evidence.

### Unverified

The patch exists, but verification did not succeed or did not complete.

Explain the reason.

### No patch

The agent could not produce or apply a valid patch.

Show the diagnostic result and next steps.

Do not mark a fix as verified merely because the model asserts correctness.

---

# 10. Page Specification: Benchmarks

**Route:** `/benchmarks`

## 10.1 Purpose

Demonstrate the technical quality of the agent using reproducible evaluation.

## 10.2 Header

- Title: `Benchmarks`
- Description: `Measure debugging and verification performance across known issues.`
- Run Benchmark action.
- Benchmark dataset selector.

## 10.3 Summary metrics

Possible metrics:

- Issues attempted.
- Patches applied successfully.
- Verified fixes.
- Relevant test pass rate.
- Invalid source-reference rate.
- Average execution duration.

Define every metric clearly. Do not label test pass rate as overall fix success unless the denominator and methodology support that claim.

## 10.4 Results table

Columns:

- Bug identifier.
- Repository.
- Model.
- Patch applied.
- Verification result.
- Repair attempts.
- Duration.
- Error category.

Clicking a row opens the detailed evaluation record.

## 10.5 Model comparison

If multiple models have actually been tested, provide a comparison table.

Compare:

- Fix success rate.
- Verification success.
- Invalid reference rate.
- Latency.
- Token usage or cost, if available.

Do not render fabricated model comparisons.

## 10.6 Empty state

If no benchmarks exist, explain how to load the sample evaluation set and start the first benchmark.

---

# 11. Page Specification: Models & Usage

**Route:** `/models`

## 11.1 Purpose

Make the model provider and inference configuration transparent.

## 11.2 Provider panel

Display:

- Provider: Nebius Token Factory.
- Configured model identifier.
- Connection status.
- Last successful inference time.
- Connection test action.

Do not display API secrets.

## 11.3 Model configuration

Allow model changes only when the backend supports them.

Show:

- Model identifier.
- Intended role.
- Request status.
- Configured token limits.
- Error or timeout information.

Keep the model identifier configurable through environment variables rather than embedding a model name across the codebase.

## 11.4 Usage metrics

If usage data is available, display:

- Total requests.
- Input and output tokens.
- Latency.
- Failed requests.
- Estimated cost, only when pricing information is reliable.

If the provider does not expose a metric, omit it or label it as unavailable.

## 11.5 Connection test

On clicking `Test Connection`:

1. Send a real server-side request.
2. Show a pending state.
3. Display success or a useful failure reason.
4. Record a timestamp if supported.

Never claim the connection is healthy based only on the presence of an API key.

---

# 12. Settings Pages

## 12.1 General settings

**Route:** `/settings/general`

Fields:

- Workspace name.
- Display preferences.
- Timezone.
- Theme preference.
- Default repository, if supported.

Provide explicit save and cancellation behavior.

## 12.2 Agent settings

**Route:** `/settings/agent`

Possible fields:

- Default model.
- Maximum repair attempts.
- Default test timeout.
- Maximum patch size.
- Default test strategy.
- Structured-output configuration.

Apply validation and explain the implications of each option.

## 12.3 Security settings

**Route:** `/settings/security`

Display the execution security model:

- Isolation mode.
- Network policy.
- Execution timeout.
- Resource limits.
- Allowed test commands.
- Secret-handling policy.

Read-only security settings are acceptable if they are enforced by deployment configuration rather than user-configurable.

Do not expose a UI switch that promises isolation when no corresponding backend control exists.

## 12.4 Integrations

**Route:** `/settings/integrations`

Potential integrations:

- GitHub.
- Nebius Token Factory.

Display connection state and supported actions. Implement only integrations that are actually connected.

## 12.5 Team settings

**Route:** `/settings/team`

Optional for the hackathon MVP.

If implemented, include members, invitations, roles, and access control only when supported by real authentication and authorization.

Do not build a simulated permissions system that gives the impression of real security.

---

# 13. Optional Public Landing Page

**Route:** `/`

The hackathon demo primarily needs a working application. A concise landing page is optional.

If implemented, use the same neutral visual system.

Sections:

1. Hero: “Don't just generate code. Prove the fix.”
2. Product screenshot or real application preview.
3. Three-step workflow: Diagnose, Patch, Verify.
4. Evidence-backed debugging features.
5. Short technical architecture overview.
6. CTA: `Try Sample Repository`.
7. Footer with GitHub, documentation, and project information.

Avoid excessive gradient backgrounds, oversized decorative 3D graphics, invented customer logos, or unsubstantiated performance claims.

---

# 14. Shared Component Inventory

Create reusable components for repeated patterns.

## Layout

- `AppSidebar`
- `AppHeader`
- `AppBreadcrumbs`
- `PageContainer`
- `PageHeader`
- `ActivityPanel`
- `MobileNavigation`

## Dashboard

- `MetricCard`
- `ActivityHeatmap`
- `RecentRunsTable`
- `ActivityFeed`
- `EmptyDashboard`

## Repository

- `RepositoryTable`
- `RepositoryCard`
- `RepositorySelector`
- `ConnectRepositoryDialog`
- `RepositoryStatus`

## Agent

- `RunStatusBadge`
- `VerificationBadge`
- `RunTimeline`
- `FindingCard`
- `SourceReference`
- `CodeDiffViewer`
- `TestResultsPanel`
- `ExecutionLog`
- `RepairAttemptCard`

## Benchmarks

- `BenchmarkSummary`
- `BenchmarkTable`
- `ModelComparisonTable`
- `BenchmarkEmptyState`

## Forms and feedback

- `FormField`
- `SearchInput`
- `FilterBar`
- `ConfirmDialog`
- `ToastFeedback`
- `LoadingSkeleton`
- `ErrorState`
- `EmptyState`

Each component must have one clear responsibility. Avoid creating dozens of tiny components that add indirection without improving reuse.

---

# 15. Frontend Architecture

Recommended structure:

src/
  app/
    (public)/
      page.tsx
      login/page.tsx
    (workspace)/
      layout.tsx
      overview/page.tsx
      repositories/page.tsx
      repositories/[repoId]/page.tsx
      repositories/[repoId]/settings/page.tsx
      runs/page.tsx
      runs/new/page.tsx
      runs/[runId]/page.tsx
      benchmarks/page.tsx
      benchmarks/[benchmarkId]/page.tsx
      models/page.tsx
      settings/general/page.tsx
      settings/agent/page.tsx
      settings/security/page.tsx
      settings/integrations/page.tsx
  components/
    layout/
    dashboard/
    repositories/
    agent/
    benchmarks/
    settings/
    ui/
  features/
    repositories/
    runs/
    benchmarks/
    models/
  hooks/
  lib/
    api-client.ts
    query-client.ts
    formatters.ts
    utils.ts
    validators/
  types/

Use Server Components by default. Add Client Components only where interactivity, local state, browser APIs, or client-side subscriptions are needed.

Use TanStack Query for remote-state fetching, caching, invalidation, and polling where appropriate. Do not duplicate the same API state across multiple global stores.

Use React Hook Form and Zod for complex forms. Use URL query parameters for shareable filters, sorting, and pagination when practical.

Use TypeScript strict mode.

---

# 16. API Integration Contracts

The frontend should not invent backend endpoints. Coordinate these contracts with the FastAPI service.

Suggested API operations:

- `GET /api/repositories`
- `POST /api/repositories`
- `GET /api/repositories/{repoId}`
- `GET /api/runs`
- `POST /api/runs`
- `GET /api/runs/{runId}`
- `POST /api/runs/{runId}/retry`
- `POST /api/runs/{runId}/cancel`
- `GET /api/runs/{runId}/events`
- `GET /api/benchmarks`
- `POST /api/benchmarks`
- `GET /api/models`
- `POST /api/models/test`

Implement only the operations supported by the backend.

Define shared TypeScript types for:

- Repository.
- AgentRun.
- AgentEvent.
- Finding.
- CodePatch.
- TestResult.
- BenchmarkResult.
- ModelConfiguration.
- PaginatedResponse.
- APIError.

The run state should explicitly distinguish execution status from verification status.

Use a centralized typed API client. Handle non-2xx responses, timeouts, cancellation, empty responses, and network errors.

Keep Nebius credentials exclusively in the backend environment.

---

# 17. Responsive Design

## Desktop: 1440px and above

- Expanded sidebar.
- Main dashboard and contextual activity panel.
- Four KPI cards in one row.
- Dense tables with full metadata.
- Run detail page may use a two-column layout.

## Laptop: approximately 1024–1439px

- Sidebar may remain expanded or collapse according to available space.
- Reduce dashboard metric columns to two if needed.
- Allow the activity panel to collapse.
- Preserve readable code and table layouts.

## Tablet: approximately 768–1023px

- Collapsible sidebar.
- Two-column KPI cards.
- Move the activity panel below main content.
- Keep tables scrollable or switch to compact rows.
- Use dialogs that fit within the viewport.

## Mobile: below 768px

- Sidebar becomes a drawer.
- Header actions become compact.
- KPI cards use one or two columns depending on width.
- Filters use a dedicated filter panel.
- Tables switch to useful compact cards where appropriate.
- Code diffs use horizontal scrolling or a clear unified-diff presentation.
- Avoid fixed-width elements that cause page overflow.

All layouts must be tested with long repository names, long bug descriptions, large diffs, empty tables, and error messages.

---

# 18. Accessibility Requirements

- Use semantic headings in logical order.
- Label every form input.
- Provide keyboard access to navigation, menus, dialogs, tabs, and tables.
- Show visible keyboard focus.
- Do not rely on color alone to convey status.
- Provide accessible names for icon-only buttons.
- Ensure contrast meets WCAG AA for normal text.
- Use appropriate ARIA live regions for important asynchronous status changes.
- Respect reduced-motion preferences.
- Keep dialog focus management correct.
- Ensure status badges include readable text.

---

# 19. Loading, Empty, Error, and Success States

Every data-backed page must support these states.

## Loading

Use layout-matched skeletons, not a full-screen spinner for every request.

## Empty

Explain what the user can do next and provide a relevant primary action.

## Error

Provide a short explanation, preserve user input where possible, and offer a retry action.

## Success

Show a concise confirmation and update affected data.

## Partial failure

Render successfully loaded sections even if another endpoint fails.

## Long-running agent execution

Show the actual current state, elapsed time where available, and a cancel action only when cancellation is supported.

Do not simulate agent progress or test output.

---

# 20. Data and Content Rules

- Never hardcode production KPI values.
- Never fabricate benchmark results.
- Never show fictional repositories as connected accounts.
- Clearly label seeded sample data.
- Display dates in a consistent timezone.
- Show absolute timestamps on hover or in details where useful.
- Distinguish missing data from zero.
- Distinguish a failed test from an infrastructure failure.
- Distinguish a completed run from a verified fix.
- Validate source paths and line references before rendering them as evidence.
- Escape repository content before displaying it.
- Never render untrusted repository Markdown or HTML without appropriate sanitization.

---

# 21. Implementation Phases

## Phase 1 — Foundation

- Inspect the existing codebase.
- Establish design tokens and typography.
- Implement the application shell.
- Implement sidebar, header, breadcrumbs, and shared page layout.
- Create a coherent set of reusable primitives.

**Acceptance:** Navigation and layout work on desktop, tablet, and mobile.

## Phase 2 — Dashboard

- Build metric cards.
- Build activity heatmap.
- Build recent runs table.
- Build latest activity panel.
- Implement loading, empty, and error states.

**Acceptance:** The dashboard uses real API data or explicitly labeled development fixtures.

## Phase 3 — Repository workflow

- Build repository directory.
- Build connect repository dialog.
- Build repository detail.
- Integrate the new-debug-session form.

**Acceptance:** Users can select a supported repository and create a debugging session.

## Phase 4 — Agent execution

- Build run detail page.
- Integrate run status updates.
- Build findings and source references.
- Build diff viewer.
- Build test output and verification states.

**Acceptance:** A real execution can be followed from initialization through the final report.

## Phase 5 — Evaluation and settings

- Build benchmark pages.
- Build model configuration and connection test.
- Implement only supported settings and integration controls.

**Acceptance:** Metrics and model information correspond to real backend behavior.

## Phase 6 — Polish

- Test all interaction states.
- Verify responsive layouts.
- Fix console errors and hydration issues.
- Run lint, type checks, and tests.
- Verify accessibility and loading behavior.
- Capture final screenshots and demo footage.

**Acceptance:** No primary workflow contains dead controls, fabricated results, or unresolved critical visual defects.

---

# 22. Visual Quality Acceptance Checklist

Before considering the frontend complete, verify every item.

### Visual consistency

- [ ] All pages use the same design tokens.
- [ ] Typography and spacing are consistent.
- [ ] Sidebar and header dimensions remain consistent.
- [ ] Borders, radii, and icons follow the same system.
- [ ] Green is reserved for purposeful accents.
- [ ] No generic AI gradient-heavy styling has been introduced.
- [ ] Tables and code panels remain readable at high information density.

### Functionality

- [ ] All navigation links work.
- [ ] All buttons have actual actions.
- [ ] Filters and search work.
- [ ] Forms validate correctly.
- [ ] Dialogs support keyboard interaction.
- [ ] Run states update from actual backend responses.
- [ ] Diff and test results display real execution evidence.
- [ ] Retry and cancel actions are shown only when supported.

### Responsive behavior

- [ ] Desktop layout matches the reference hierarchy.
- [ ] Tablet layout does not become cramped.
- [ ] Mobile sidebar works as a drawer.
- [ ] No unintended horizontal page overflow.
- [ ] Large tables and diffs remain usable.
- [ ] Long names and errors wrap appropriately.

### Engineering quality

- [ ] TypeScript checks pass.
- [ ] Lint passes.
- [ ] No exposed secrets.
- [ ] No fabricated production metrics.
- [ ] API errors are handled.
- [ ] Loading and empty states exist.
- [ ] Accessible focus and keyboard behavior are implemented.
- [ ] No critical console or hydration errors.

---

# 23. Final Product Definition

RepoPilot should feel like a serious developer engineering platform, not a collection of unrelated dashboards.

The overview provides the system-wide picture. Repository pages provide codebase context. Agent Runs provide execution history. Run Details expose the engineering workflow. Benchmarks provide evidence of quality. Models & Usage explain the inference configuration. Settings control only the behavior the backend actually supports.

Use the supplied Repoverse screenshot as the consistent visual north star throughout implementation.

**The highest priority is not the number of pages. It is making every implemented page feel complete, consistent, responsive, and connected to the same real product workflow.**
