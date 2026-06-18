# AI Modernization Platform

An end-to-end framework powered by **Model Context Protocol (MCP)** and generative AI to migrate legacy desktop applications to modern, cloud-native web architectures.

## Repository Layout

- `antigravity-agent/`: Orchestration layer using Gemini and MCP tools.
- `mcp-filesystem/`: Stdio MCP server for reading, writing, and listing files.
- `mcp-github/`: Stdio MCP server to create branches, commit code, and open PRs.
- `mcp-jira/`: Stdio MCP server to create Epics, Stories, and Tasks.
- `mcp-docker/`: Stdio MCP server to build images, run, stop, and log containers.
- `mcp-vercel/`: Stdio MCP server for project deployments.
- `mcp-web/`: Stdio MCP server for web search and documentation lookups.
- `legacy-app/`: The original application codebase (VB6 forms & database modules).
- `generated-docs/`: Automated analysis, system architecture, API spec, and migration plans.
- `modern-app/`: The generated modern stack (React/Vite frontend + Express.js backend).

## Getting Started

1. Set up API keys in the `.env` file at the root.
2. Install dependencies in the agent and MCP folders:
   ```bash
   cd antigravity-agent && npm install
   ```
3. Run the modernization pipeline:
   ```bash
   npm start
   ```

## Architecture

The `antigravity-agent` runs workflows (Analyze, Migrate, Deploy) in sequence. It starts each MCP server as a subprocess, communicate over JSON-RPC (standard input/output), and calls tools dynamically during the LLM loop.
