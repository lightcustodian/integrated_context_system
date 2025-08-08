#!/bin/bash
# setup-mcp.sh - Install individual MCP server
# Usage: ./setup-mcp.sh @modelcontextprotocol/server-filesystem

if [ $# -eq 0 ]; then
    echo "Usage: $0 <mcp-server-package>"
    echo "Example: $0 @modelcontextprotocol/server-filesystem"
    exit 1
fi

SERVER_PACKAGE="$1"

echo "Installing MCP server: $SERVER_PACKAGE"

# Determine installation method based on package name
if [[ $SERVER_PACKAGE == *"python"* ]] || [[ $SERVER_PACKAGE == "mcp-server-pytest"* ]] || [[ $SERVER_PACKAGE == "fastmcp" ]]; then
    # Python package
    echo "Installing Python package..."
    pip install "$SERVER_PACKAGE"
else
    # Node.js package
    echo "Installing Node.js package..."
    npm install -g "$SERVER_PACKAGE"
fi

# Validate installation
echo "Validating installation..."
if [[ $SERVER_PACKAGE == *"python"* ]] || [[ $SERVER_PACKAGE == "fastmcp" ]]; then
    python -m "${SERVER_PACKAGE//-/_}" --help > /dev/null 2>&1
else
    npx "$SERVER_PACKAGE" --help > /dev/null 2>&1
fi

if [ $? -eq 0 ]; then
    echo "✅ Successfully installed: $SERVER_PACKAGE"
else
    echo "❌ Installation may have failed: $SERVER_PACKAGE"
    exit 1
fi