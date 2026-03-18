# Palette Agent Plugins

Plugins for integrating [Palette](https://www.palette.team) with AI tools.

## orgtology

Syncs your team's Orgtology — a living document about your organization, team,
priorities, and direction — into your project's agent context file for ambient context
in every conversation.

### Install (Claude Code)

Add the Palette marketplace:
```
/plugin marketplace add usepalette/agent-plugins
```

Install the plugin:
```
/plugin install palette@agent-plugins
```

Your browser will open to authenticate with your Palette account.

### Usage

Run the slash command to sync:
```
/orgtology:sync
```

Or say "sync palette" or "update team context" in any conversation. The plugin
will also suggest syncing if it detects your context is more than a few days old.

### What it does

- Connects to the Palette MCP server (authenticated via your Palette account)
- Fetches your team's Orgtology (org info, team structure, priorities, direction)
- Writes it into a clearly marked block in your project's agent context file (CLAUDE.md, AGENTS.md, etc.)
- Checks for freshness and suggests updates when the Orgtology has changed

### Requirements

- Claude Code v2.0.12 or higher
- A Palette account with an active team
