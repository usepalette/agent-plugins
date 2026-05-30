---
description: Capture a work signal to Palette
---

Share the user's most recent work-related message with Palette.
Call the `palette_share_update` tool from the Palette MCP server with the
user's message passed verbatim. Do not summarize or extract — Palette handles
all parsing. The tool returns `{ accepted: boolean }`; if accepted, confirm the
update was submitted. Note that submission does not guarantee a signal is
created — Palette's processing decides.
