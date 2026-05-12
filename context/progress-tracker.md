# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Feature 02: Editor Chrome — complete.

## Current Goal

- Ready for next feature spec.

## Completed

- 01-design-system: shadcn/ui configured (style: base-nova, Tailwind v4, cssVariables), all 7 UI primitives added (Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea), lucide-react installed, lib/utils.ts cn() helper created, globals.css rewritten with dark-only theme (no light mode, no .dark class toggle).
- 02-editor-chrome: EditorNavbar (fixed top bar, sidebar toggle with PanelLeftOpen/PanelLeftClose, left/center/right sections), ProjectSidebar (fixed overlay, slides in from left, Projects header + close button, My Projects/Shared tabs with empty states, New Project button). Dialog pattern available via existing components/ui/dialog.tsx exports.

## In Progress

- None.

## Next Up

- 03: Next feature spec (TBD).

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
