- SETUP Neon postgres with drizzle orm make sure api fetching best practices

- make components folder and in which component based coding there no features or any other folder keep src/ states - zustand , providers(ai-provider , github functioanlityes), schemas segrigated don't make schemas in on file , clean code repo.png take design refrence keep ui minimal 

- don't get breaking codes 

- use shadcn ui libarary and ui.acertinity for frontend 

- make layout consistent and 

# RepoPilot — Production-Quality Architecture & UI Refactoring

Act as a senior full-stack engineer and software architect. Refactor and improve the existing RepoPilot codebase without breaking existing functionality. Follow the project's documentation, preserve working implementations, and use `@docs/repo.png` as the primary UI design reference.

The objective is to build a clean, maintainable, production-ready application with a consistent frontend, a reliable PostgreSQL data layer, and well-structured API fetching.

## 1. Inspect the Existing Codebase First

Before making changes:

- Inspect the project structure, `package.json`, installed dependencies, routes, layouts, components, API handlers, environment variables, and existing integrations.
- Read the relevant documentation in `@docs`.
- Analyze `@docs/repo.png` for layout, navigation, spacing, typography, borders, colors, and information density.
- Identify existing functionality that must be preserved.
- Check for existing database schemas, migrations, authentication, GitHub integration, AI provider configuration, and state management.
- Create a concise implementation plan before modifying files.

**Critical rule:** Do not rewrite the project from scratch. Do not delete, rename, or replace working modules without understanding their dependencies and migration requirements.

## 2. Technology Stack

Use the existing compatible versions and conventions wherever possible.

- Next.js App Router
- TypeScript with strict type checking
- Tailwind CSS v4
- shadcn/ui
- Aceternity UI for selected, purposeful visual effects
- Lucide React
- Neon Serverless PostgreSQL
- Drizzle ORM and Drizzle Kit
- Zustand for shared client state
- TanStack Query for client-side server-state fetching when appropriate
- Zod for runtime validation
- React Hook Form for complex forms
- Framer Motion for subtle transitions
- FastAPI backend, if already established for the AI agent

Do not add redundant libraries or replace existing dependencies unnecessarily. Verify compatibility before installing or upgrading packages.

## 3. Required Project Structure

Keep the application structure straightforward. Use `src/components` for component-based frontend development. Do not introduce `features/`, `modules/`, or another feature-based directory hierarchy.

Adapt the structure below to the existing repository rather than blindly moving files.

```text
src/
├── app/
│   ├── (auth)/
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── overview/
│   │   ├── repositories/
│   │   ├── runs/
│   │   ├── benchmarks/
│   │   ├── models/
│   │   └── settings/
│   ├── api/
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── ui/                  # shadcn/ui primitives
│   ├── layout/              # Sidebar, header, breadcrumbs
│   ├── dashboard/           # Metrics, activity, tables
│   ├── repositories/        # Repository UI
│   ├── agent/               # Runs, diffs, findings, logs
│   ├── benchmarks/          # Evaluation UI
│   ├── models/              # Provider and usage UI
│   ├── settings/            # Settings forms
│   ├── providers/           # React context providers
│   └── shared/              # Reusable application components
│
├── lib/
│   ├── db/
│   │   ├── index.ts
│   │   ├── schema/
│   │   │   ├── users.ts
│   │   │   ├── repositories.ts
│   │   │   ├── agent-runs.ts
│   │   │   ├── agent-events.ts
│   │   │   └── index.ts
│   │   └── queries/
│   ├── api/
│   │   ├── client.ts
│   │   ├── errors.ts
│   │   └── query-keys.ts
│   ├── ai/
│   │   ├── ai-provider.ts
│   │   ├── types.ts
│   │   └── ...
│   ├── github/
│   │   ├── github-provider.ts
│   │   ├── types.ts
│   │   └── ...
│   ├── schemas/
│   │   ├── repository.schema.ts
│   │   ├── agent-run.schema.ts
│   │   ├── benchmark.schema.ts
│   │   ├── settings.schema.ts
│   │   └── ...
│   ├── stores/
│   │   ├── app-store.ts
│   │   ├── sidebar-store.ts
│   │   └── ...
│   ├── hooks/
│   ├── constants/
│   ├── utils/
│   └── env.ts
│
├── types/
│   ├── api.ts
│   ├── repository.ts
│   └── agent.ts
│
└── middleware.ts             # Only if needed by the existing setup

drizzle/
├── migrations/
└── ...

drizzle.config.ts
.env.example
```

### Architecture rules

- `app/` owns routing, layouts, and route handlers.
- `components/` owns reusable UI and presentation components.
- `lib/db/` owns database access, Drizzle schema definitions, and database queries.
- `lib/api/` owns typed API clients and shared API utilities.
- `lib/ai/` owns server-side AI provider integration.
- `lib/github/` owns server-side GitHub integration.
- `lib/schemas/` contains small, domain-specific validation schemas.
- `lib/stores/` contains Zustand stores for shared client-side state.
- `lib/hooks/` contains reusable hooks.
- `lib/utils/` contains focused utilities.

Do not place everything in one large file. Keep schemas, types, database definitions, provider implementations, and UI components separated by responsibility.

Do not create unnecessary abstractions or duplicate the same types across multiple files.

## 4. Neon PostgreSQL + Drizzle ORM

Configure Neon PostgreSQL as the primary persistent data store.

### Setup requirements

1. Inspect whether a database connection or ORM already exists.
2. Install compatible Neon and Drizzle dependencies only if missing.
3. Configure `drizzle.config.ts`.
4. Create a server-only database connection in `src/lib/db/index.ts`.
5. Store database connection strings in environment variables.
6. Define typed Drizzle schemas in separate files.
7. Export schemas through a schema index.
8. Generate and apply migrations safely.
9. Add development seed data only where appropriate.
10. Document local development and deployment setup.

### Database tables

Design only the tables required by the actual product.

Potential tables:

- `users` — only if not already provided by the authentication system.
- `repositories` — connected repository metadata.
- `agent_runs` — execution status, configuration, timestamps, and results.
- `agent_events` — chronological execution events.
- `benchmarks` — evaluation metadata and results, if implemented.
- `workspace_settings` — persistent workspace configuration, if needed.

Use appropriate primary keys, foreign keys, unique constraints, indexes, timestamps, and deletion behavior.

Represent statuses with constrained values where practical. Avoid duplicating data that can be derived reliably from existing records.

Do not store secrets, complete API keys, or unnecessary source-code contents in database records.

### Connection strategy

Use the supported Neon serverless driver and Drizzle adapter appropriate for the existing Next.js runtime and deployment target.

- Reuse the shared database client.
- Do not create a new connection on every component render.
- Keep database access server-side.
- Do not import the database connection into Client Components.
- Avoid connection pools or Node-specific drivers incompatible with the deployment runtime.

### Migration safety

- Never reset or drop an existing database as part of routine setup.
- Inspect existing migrations and database state first.
- Generate explicit, reviewable migrations.
- Preserve existing data and schemas.
- Document any required manual migration steps.
- Verify migrations against a development database before applying them to production.

## 5. API Fetching Best Practices

Create a consistent, typed data-fetching architecture.

### Server-side data fetching

Prefer Server Components for initial page data when practical.

- Fetch directly from the underlying server-side query or service layer.
- Avoid calling your own HTTP API route from a Server Component when a direct server-side function is available.
- Keep database queries and secrets server-only.
- Use pagination and filtering for large datasets.
- Add appropriate authorization checks before returning private data.
- Use explicit caching and revalidation policies based on the freshness requirements of each resource.

Do not cache private user-specific data publicly.

### Client-side data fetching

Use TanStack Query when client-side caching, polling, mutation state, or background refetching provides a real benefit.

- Define stable, centralized query keys.
- Use typed query functions.
- Handle loading, empty, error, and success states.
- Invalidate relevant queries after mutations.
- Prevent duplicate submissions.
- Configure retries selectively; do not repeatedly retry permanent validation or authorization failures.
- Use polling only for active agent executions.
- Stop polling when the execution reaches a terminal state.

Do not add TanStack Query solely to fetch data that is better handled by a Server Component.

### Route handlers

Use Next.js Route Handlers as a backend-for-frontend layer where needed.

Each handler must:

1. Validate parameters and request bodies with Zod.
2. Authenticate and authorize the caller.
3. Invoke the appropriate service or query function.
4. Return a consistent JSON response.
5. Handle expected errors explicitly.
6. Avoid leaking stack traces, credentials, or internal implementation details.

Use appropriate HTTP methods and status codes.

Do not expose database queries or provider credentials to the browser.

### Data mutations

For create, update, retry, and delete operations where supported:

- Validate input.
- Enforce ownership and authorization.
- Use database transactions when multiple writes must succeed together.
- Return a typed response.
- Update or invalidate relevant cached data.
- Display useful error feedback.
- Prevent duplicate or conflicting operations.

Keep API contracts consistent across the application.

## 6. Zustand State Management

Use Zustand only for shared client-side UI or interaction state.

Good candidates:

- Sidebar collapsed state.
- Workspace selection, if genuinely shared.
- Active repository selection, where needed across client components.
- Client-side filters or view preferences.
- Multi-step UI state.

Do not use Zustand as the default store for all server data.

Avoid duplicating repository lists, run histories, or model usage responses in Zustand when TanStack Query or Server Components already own that data.

Keep stores small and focused. Use selectors to limit unnecessary re-renders.

Persist preferences only when persistence is useful and safe. Do not persist secrets or sensitive server responses in browser storage.

For Next.js, avoid shared mutable global state on the server that could leak between requests.

## 7. AI Provider Architecture

Implement or refactor the AI provider layer in `src/lib/ai/`.

Requirements:

- Keep provider calls server-side.
- Centralize the Nebius Token Factory configuration.
- Read the API key and model identifier from validated environment variables.
- Use a consistent typed request/response interface.
- Support timeouts, error normalization, and bounded retries.
- Validate structured model output before using it.
- Keep model prompts and output schemas separate from UI components.
- Record relevant usage and execution metadata when available.
- Do not assume a model response is correct without verification.

Maintain compatibility with the existing FastAPI agent backend if it already owns inference. Do not duplicate AI provider calls in Next.js unnecessarily.

If Nebius Token Factory is accessed through FastAPI, Next.js should call the existing backend rather than creating a second inference pipeline.

## 8. GitHub Integration

Implement GitHub functionality in `src/lib/github/`.

First inspect the existing implementation and determine whether it uses OAuth, GitHub Apps, personal access tokens, or public repository access.

Separate:

- GitHub API client.
- Repository metadata and types.
- Authentication and token handling.
- Repository validation.
- Error normalization.
- Server-side repository operations.

Requirements:

- Keep private credentials server-side.
- Request the minimum permissions required.
- Handle rate limits and API errors.
- Validate repository URLs and identifiers.
- Respect repository access permissions.
- Do not assume a repository is connected merely because its URL is stored.
- Do not implement fake OAuth or simulated private repository access.

Preserve existing GitHub functionality and integrate it with the repository UI and database layer.

## 9. Schemas and Validation

Do not create one giant schema file.

Create separate schemas for independent domains, such as:

- Repository creation and updates.
- Agent run creation.
- Agent findings and patch metadata.
- Benchmark configuration.
- Model configuration.
- Workspace settings.

Keep request schemas, response types, and database models conceptually distinct where their requirements differ.

Reuse schemas when appropriate, but do not force unrelated operations into one overly broad schema.

Validate external input at trust boundaries. Avoid redundant validation layers that add no protection.

## 10. UI Design — `@docs/repo.png`

Use the reference image as the primary design source.

### Overall layout

- Persistent left sidebar.
- Compact top header.
- Breadcrumbs and repository context.
- Central content area.
- Contextual right-side activity panel when useful.
- Thin borders and subtle separators.
- Minimal green accents.
- Compact metrics, heatmaps, and readable tables.

### Component libraries

Use shadcn/ui for foundational components:

- Button.
- Input.
- Select.
- Dropdown Menu.
- Dialog.
- Sheet.
- Tabs.
- Tooltip.
- Table.
- Badge.
- Skeleton.
- Form controls.

Use Aceternity UI selectively for effects that improve the experience. Keep the dashboard itself restrained and data-focused. Do not add animated backgrounds, glowing cards, or visual effects that conflict with `@docs/repo.png`.

Do not install or copy every component from either library. Add only the components needed for the actual interface.

### Consistency requirements

- Centralize colors, spacing, radii, and typography.
- Reuse shared page headers, metric cards, tables, status badges, and empty states.
- Use consistent dimensions for controls.
- Keep icons aligned.
- Use the same visual language across every page.
- Ensure mobile layouts are intentional rather than simply compressed desktop layouts.

The final result should feel like one cohesive engineering product.

## 11. Code Quality and Refactoring Rules

Follow these rules throughout implementation:

- Keep components small and focused.
- Avoid unnecessary nested conditionals.
- Avoid giant page components and giant utility files.
- Avoid `any` unless there is a documented, unavoidable reason.
- Prefer explicit types and clear names.
- Remove duplicate logic only after identifying its actual behavior.
- Preserve existing imports, contracts, routes, and side effects unless a change is required.
- Do not add redundant providers or nested context wrappers.
- Keep Client Components as small as practical.
- Avoid unnecessary `useEffect` calls for derived state.
- Do not suppress TypeScript or lint errors to make the build pass.
- Do not silently change API response shapes.
- Do not perform unrelated formatting or dependency upgrades across the repository.

Prefer simple, readable code over clever abstractions.

## 12. Non-Breaking Implementation Strategy

This is a critical requirement.

Before each major refactor:

1. Identify the files and dependencies involved.
2. Determine which existing functionality depends on them.
3. Make focused changes.
4. Run the relevant checks.
5. Fix regressions before proceeding.

Do not remove working functionality simply because the new architecture looks cleaner.

If a migration requires breaking an existing interface, provide a compatibility path or update all dependent callers in the same change.

Preserve existing environment variable names when possible. If a rename is necessary, update the example file and document the migration.

Do not delete existing migrations, overwrite user data, or reset production resources.

## 13. Environment Configuration

Create or update `.env.example` with placeholder values only.

Potential variables include:

- `DATABASE_URL`
- `NEBIUS_API_KEY`
- `NEBIUS_MODEL`
- Existing GitHub OAuth or GitHub App configuration, if applicable.
- Existing backend API URL, if applicable.

Use only variables required by the actual implementation.

Validate required environment variables on the server at startup or at the relevant service boundary. Never expose secrets through `NEXT_PUBLIC_` variables.

Do not overwrite the user's existing `.env` file.

## 14. Testing and Verification

After implementation:

- Run the available lint command.
- Run TypeScript checks.
- Run relevant unit and integration tests.
- Verify Drizzle schema generation and migration commands.
- Verify database connection using a development database.
- Test API validation and error handling.
- Test GitHub integration without exposing credentials.
- Test AI provider failures and timeouts.
- Test the primary UI workflows.
- Check browser console errors and hydration issues.
- Verify the layout at desktop, tablet, and mobile sizes.

Do not claim a check passed unless it was actually executed successfully.

If a check cannot run because an environment variable or external service is unavailable, explain the limitation.

## 15. Required Delivery Report

At the end, provide:

1. Summary of architectural changes.
2. Final project structure.
3. Neon PostgreSQL and Drizzle setup.
4. Migration and seed instructions.
5. API fetching and caching approach.
6. Zustand stores and their responsibilities.
7. AI and GitHub integration changes.
8. UI pages and components refactored.
9. Commands executed and actual results.
10. Remaining issues, risks, or manual setup requirements.

## Final instruction

First understand the existing codebase. Then refactor incrementally, preserving working behavior.

Use `@docs` as the functional specification and `@docs/repo.png` as the visual reference. Keep the architecture simple, use `src/components` for component-based UI, maintain separate schemas and providers, use Neon PostgreSQL with Drizzle ORM, follow sound API fetching practices, and deliver a minimal, consistent, responsive frontend without introducing breaking changes.

Do not stop after writing a plan. Implement the changes, validate them, and report what was actually completed.