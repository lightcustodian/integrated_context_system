# External Integrations for Context Engineering

This directory contains configuration and setup for external integrations used by the Context Engineering system.

## MCP Servers

The Context Engineering system uses Model Context Protocol (MCP) servers to enhance AI capabilities with external services.

### Essential MCP Servers

These servers are required for basic functionality:

- **filesystem**: File system access for the AI agent
- **git**: Git operations for version control
- **memory**: Session memory persistence

### Optional MCP Servers

These servers provide additional capabilities:

- **web-search**: Web search for documentation and research
- **github**: GitHub integration for repository operations

## Setup Instructions

1. Run the setup script to install essential MCP servers:

```bash
# Make the script executable
chmod +x scripts/setup-mcp.sh

# Run the setup script
./scripts/setup-mcp.sh
```

2. Copy the environment template and configure API keys:

```bash
cp .env.example .env
```

3. Edit the `.env` file to add your API keys for optional servers.

4. Enable optional servers in `mcp_index.json` by setting `"enabled": true` for the servers you want to use.

## Configuration

The `mcp_index.json` file contains the configuration for all MCP servers. You can:

- Enable/disable servers
- Configure server commands
- Set environment variable requirements

## Usage

The Context Engineering system will automatically use available MCP servers during:

- Research phase of ULTRATHINK Planning
- Web search for documentation
- Repository operations

If an MCP server is not available, the system will fall back to local knowledge.