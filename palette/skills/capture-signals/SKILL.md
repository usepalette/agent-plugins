---
name: capture-signals
description: Captures work signals to Palette when the user explicitly asks
---

# Palette Capture Signals Skill

## When to use this skill

Only call the capture-signals tool when the user explicitly asks. Examples:
- "capture this"
- "log this signal"
- "save this update to Palette"
- Running /palette:capture

**Never call capture-signals proactively.** The user must initiate every capture.

## How to capture

1. Take the user's message verbatim — do not summarize, extract, or rewrite it.
2. Call the capture-signals tool from the Palette MCP server:
   - Input: `{ message: "<user's message verbatim>" }`
   - Returns: `{ success: boolean }`
3. If successful, confirm to the user that the signal was captured.
4. If it fails, let the user know and suggest they try again.

## Important

- Pass the message exactly as the user wrote it — the server handles all parsing
- Do not batch or queue signals — capture immediately when asked
- Do not modify, summarize, or enrich the message before sending
