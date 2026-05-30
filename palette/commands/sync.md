---
description: Sync Palette context pages into a PALETTE.md file
---

Sync the team's Palette context into PALETTE.md in the current directory.
Follow the instructions in the Palette Sync skill: list context pages with
`palette_list_context_pages` (filter by scope if the user passed one —
`org`, `team`, or `me`/`person`), read each with `palette_read_context_page`,
write them into the `<!-- palette:context:start/end -->` block in PALETTE.md,
ensure one project instruction file references PALETTE.md (`CLAUDE.md`,
`AGENTS.md`, `CURSORRULES`, or `.cursorrules`), creating `CLAUDE.md` with the
reference if none exists, and summarize what changed.
