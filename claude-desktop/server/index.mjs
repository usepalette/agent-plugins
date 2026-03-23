#!/usr/bin/env node

/**
 * Palette Claude Desktop Extension
 *
 * Thin stdio ↔ HTTP bridge that connects Claude Desktop to the remote
 * Palette MCP server. Authentication is handled automatically via OAuth
 * (opens browser on first use, caches tokens for subsequent sessions).
 *
 * Uses `mcp-remote` under the hood for the transport and OAuth PKCE flow.
 */

import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const PALETTE_MCP_URL = 'https://api.palette.team/mcp';

// mcp-remote reads the server URL from process.argv[2].
// Set it up before importing the proxy module.
const proxyPath = resolve(__dirname, '..', 'node_modules', 'mcp-remote', 'dist', 'proxy.js');
process.argv = [process.argv[0], proxyPath, PALETTE_MCP_URL];

await import(proxyPath);
