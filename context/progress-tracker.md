# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Feature 06: Project APIs — complete.

## Current Goal

- Ready for feature 07.

## Completed

- 06-project-apis: REST API routes for projects. GET /api/projects lists owner's projects. POST /api/projects creates (defaults name to "Untitled Project"). PATCH /api/projects/[projectId] renames. DELETE /api/projects/[projectId] deletes. Auth via Clerk `auth()` from `@clerk/nextjs/server`. Unauthenticated → 401, non-owner mutations → 403. Params awaited as Promise per Next.js 16 convention.
- 05-prisma: Project and ProjectCollaborator models in prisma/schema.prisma. lib/prisma.ts singleton branches on DATABASE_URL prefix (Accelerate vs direct pg adapter), cached on globalThis in dev. Migration 20260513160158_init applied. Prisma client generated to app/generated/prisma.
- 01-design-system: shadcn/ui configured (style: base-nova, Tailwind v4, cssVariables), all 7 UI primitives added (Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea), lucide-react installed, lib/utils.ts cn() helper created, globals.css rewritten with dark-only theme (no light mode, no .dark class toggle).
- 02-editor-chrome: EditorNavbar (fixed top bar, sidebar toggle with PanelLeftOpen/PanelLeftClose, left/center/right sections), ProjectSidebar (fixed overlay, slides in from left, Projects header + close button, My Projects/Shared tabs with empty states, New Project button). Dialog pattern available via existing components/ui/dialog.tsx exports.
- 03-auth: ClerkProvider wrapping root layout with dark theme + CSS variable overrides (@clerk/ui/themes). proxy.ts at project root (Next.js 16 middleware convention) using clerkMiddleware + createRouteMatcher. Sign-in/sign-up pages at /sign-in and /sign-up with two-panel layout (left panel hidden on mobile). Root / redirects authenticated → /editor, unauthenticated → /sign-in. UserButton in EditorNavbar right section. app/editor/page.tsx created as protected editor shell.
- 04-project-dialogs: Editor home screen (heading + New Project button). Create/Rename/Delete dialogs with mock-only CRUD state (useProjectDialogs hook). Sidebar project items with rename/delete actions (owned only), mobile backdrop scrim. Slug safeguard: names that produce an empty slug (e.g. "!!!") are blocked with inline error. Dialog title/label/description colors use globals.css tokens (text-copy-primary, text-ai-text). Input base fixed: text-base removed (conflicted with --color-base token), text-copy-primary added as explicit default.

## In Progress

- None.

## Next Up

- 07-wire-editor-home: Wire project API into the editor home UI.

## Open Questions

- None yet.

## Architecture Decisions

- Dark-only theme: all CSS vars defined at `:root`, no `.dark` class toggle.
- shadcn/ui on Tailwind v4 — CSS-based config (`components.json` uses `"config": ""`), no tailwind.config.js.
- Project palette tokens (`--bg-base`, `--text-primary`, etc.) live in `:root` alongside shadcn vars; both are exposed as Tailwind utilities via `@theme inline`.
- shadcn vars mapped to project colors: `--primary` → `#00c8d4` (cyan), `--background` → `#080809`, `--foreground` → `#f0f0f4`.

## Session Notes

- `components/ui/*` files must not be modified after generation (shadcn rule).
- To add new shadcn components: `npx shadcn@latest add <name> --yes`.
- Project utility class naming: `bg-base`, `bg-surface`, `text-copy-primary`, `text-copy-muted`, `border-surface-border`, `text-brand`, `bg-accent-dim`.
