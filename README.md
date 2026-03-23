# Palette Agent Plugins

Plugins for integrating [Palette](https://www.palette.team) with AI tools.

## palette

Syncs your team's Orgtology — a living document about your organization, team,
priorities, and direction — into a local `PALETTE.md` file and links it from
project instructions when possible for ambient context in conversations.

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
/palette:sync-orgtology
```

Or say "sync palette" or "update team context" in any conversation. The plugin
will also suggest syncing if it detects your context is more than a few days old.

### What it does

- Connects to the Palette MCP server (authenticated via your Palette account)
- Fetches your team's Orgtology (org info, team structure, priorities, direction)
- Writes it into a clearly marked block in `PALETTE.md`
- Adds a one-line reference from `CLAUDE.md`, `AGENTS.md`, `CURSORRULES`, or `.cursorrules` when available
- Checks for freshness and suggests updates when the Orgtology has changed

### Requirements

- Claude Code or Cowork with plugin support
- A Palette account with an active team
