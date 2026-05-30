---
name: sync
description: Fetches Palette context pages and syncs them into a local PALETTE.md file
---

# Palette Sync Skill

## What Palette provides

Palette is the organizational context layer. It exposes **context pages** —
living, per-scope documents about the organization, each team the user can see,
and the user themselves — plus other resource types over time (agent primitives
and more). Context pages can be read live over MCP, or synced into a local
PALETTE.md for ambient, folder-scoped context.

## When to use this skill

- When the user says "sync palette", "update palette context", "refresh team
  context", or runs /palette:sync
- When the user asks about org/team structure, priorities, or direction and no
  PALETTE.md exists — offer to sync, or read the pages live
- When PALETTE.md exists, compare its "Last synced" timestamp against the latest
  `updatedAt` from `palette_list_context_pages`. If newer pages exist, inform the
  user and offer to re-sync.

## The Palette MCP surface

Context pages are reached through three tools:

- `palette_search` — cross-entity discovery. No args → a per-scope summary
  (counts by type). `scope`/`scopeId` → narrow the namespace. `query` → search
  across every resource type. Use it for orientation when you're unsure what
  exists.
- `palette_list_context_pages({scope?, scopeId?})` — list context pages,
  metadata only. Each entry carries a `uri`, `title`, optional `summary`,
  `scope`, and an `updatedAt` ISO timestamp.
- `palette_read_context_page({uri})` — read one page's markdown by its
  `palette://` uri.

`scope` is one of `org` | `team` | `person`. Each list entry's uri has the form
`palette://{scope}/{scopeId}/context-page/{id}`.

Equivalent MCP resources (`palette://…`) exist for clients that prefer the
protocol-level resource API. The tools above are the portable path and work on
every client — prefer them. If a list/search returns `truncated: true`, the
result was capped; narrow with `scope`/`scopeId`.

## Syncing to PALETTE.md

### Default (full) sync

/palette:sync → list all context pages → read each → write them all to PALETTE.md

### Granular sync

/palette:sync org  → only org-scope pages
/palette:sync team → only team-scope pages
/palette:sync me   → only the user's person-scope page (`me` maps to scope `person`)

### How to sync

1. Resolve the scope filter from the argument:
   - no argument → list all scopes
   - `org` → `scope: "org"`
   - `team` → `scope: "team"`
   - `me` or `person` → `scope: "person"`
2. Call `palette_list_context_pages` (with the scope filter, if any) to get the
   page refs. If the tool is unavailable but MCP resources are, list `palette://`
   resources instead and keep the `context-page` ones.
3. For each ref, call `palette_read_context_page({ uri })` to get its markdown.
4. Compose the pages under a single managed block in PALETTE.md — one `##`
   section per page, titled by the ref's `title`.
5. Write or update PALETTE.md in the current directory:
   - If a `<!-- palette:context:start -->` / `<!-- palette:context:end -->`
     block exists, replace everything between the markers and update "Last synced".
   - Migration: if a legacy `<!-- palette:orgtology:start -->` /
     `<!-- palette:orgtology:end -->` block exists, replace the whole legacy
     block with the new `palette:context` block.
   - If PALETTE.md exists without markers, append the block at the end.
   - If PALETTE.md doesn't exist, create it.
6. Ensure exactly one project instruction file references PALETTE.md:
   - Scan candidates in order: CLAUDE.md, AGENTS.md, CURSORRULES, .cursorrules
   - If any already references PALETTE.md, do nothing
   - Otherwise append to the first existing candidate:
     "Organizational context is in PALETTE.md — read it for team context."
   - If none exist, create CLAUDE.md with that reference line
7. Summarize what changed (new pages, updated priorities, new team members, etc).

### File format

```md
<!-- palette:context:start -->
# Palette context (synced)
Last synced: {YYYY-MM-DDTHH:mm:ssZ}
Scope: {full | org | team | person}

## {page title}
{page markdown}

## {page title}
{page markdown}

<!-- palette:context:end -->
```

## Staleness check

When this skill loads and PALETTE.md exists with a "Last synced" timestamp, call
`palette_list_context_pages` and compare the most recent `updatedAt` across the
returned pages to the synced timestamp. If a page is newer, inform the user and
offer to re-sync. If everything is current, tell the user — don't re-sync
unnecessarily.

## Important

- Never overwrite content outside the `<!-- palette:context:start/end -->` markers
- Always preserve any manually added content in PALETTE.md
- Write to the current directory, not the global ~/.claude/CLAUDE.md
- Add the reference line in CLAUDE.md / AGENTS.md / CURSORRULES / .cursorrules
  once, not duplicated
- For a quick one-off lookup, read pages live (list + read) rather than syncing —
  syncing is for persistent, ambient context
