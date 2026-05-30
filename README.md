# Palette Agent Plugins

Plugins for integrating [Palette](https://www.palette.team) with AI tools.

## palette

Connects to Palette — the organizational context layer for your company, teams,
and people. Syncs your team's **context pages** (living documents about your
organization, teams, priorities, and direction) into a local `PALETTE.md` file
and links it from project instructions when possible for ambient context in
conversations. Palette also surfaces agent primitives and more over time.

### Install (Claude Code / Cowork)

Add the Palette marketplace:
```bash
/plugin marketplace add usepalette/agent-plugins
```

Install the plugin:
```bash
/plugin install palette@agent-plugins
```

Your browser will open to authenticate with your Palette account.

### Usage

Run the slash command to sync:
```bash
/palette:sync
```

Or say "sync palette" or "update team context" in any conversation. The plugin
will also suggest syncing if it detects your context has changed since the last sync.

### What it does

- Connects to the Palette MCP server (authenticated via your Palette account)
- Fetches your team's context pages (org info, team structure, priorities, direction)
- Writes them into a clearly marked block in `PALETTE.md`
- Adds a one-line reference from `CLAUDE.md`, `AGENTS.md`, `CURSORRULES`, or `.cursorrules` when available; if none exist, creates `CLAUDE.md` with the reference
- Checks for freshness and suggests updates when a context page has changed

### Requirements

- Claude Code or Cowork with plugin support
- A Palette account with an active team
