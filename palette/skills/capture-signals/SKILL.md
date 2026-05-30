---
name: capture-signals
description: Shares a work update with Palette when the user explicitly asks
---

# Palette Capture Signals Skill

## When to use this skill

Only call the `palette_share_update` tool when the user explicitly asks. Examples:
- "capture this"
- "log this update"
- "share this with Palette"
- Running /palette:capture

**Never call `palette_share_update` proactively.** The user must initiate every
share.

## How to share an update

1. Take the user's message verbatim — do not summarize, extract, or rewrite it.
2. Call the `palette_share_update` tool from the Palette MCP server:
   - Input: `{ message: "<user's message verbatim>" }`
   - Returns: `{ accepted: boolean }`
3. If `accepted` is `true`, confirm to the user that the update was submitted to
   Palette. Note that submission does **not** guarantee a signal is created —
   Palette's processing decides what becomes a signal.
4. If `accepted` is `false` (or the call fails), let the user know the update
   wasn't submitted and suggest they try again.

## Important

- Pass the message exactly as the user wrote it — Palette handles all parsing
- Do not batch or queue updates — submit immediately when asked
- Do not modify, summarize, or enrich the message before sending
- Submitting is not the same as a signal being created; don't promise a signal
