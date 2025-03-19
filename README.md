# 🔐 get-mcp-keys

**Stop accidentally committing API keys to your repos!**

## The Problem

When using Cursor AI (and other AI coding assistants) with MCP servers, you need API keys in your `./cursor/mcp.json` file:

```json
{
  "mcpServers": {
    "firecrawl": {
      "command": "npx",
      "args": [
        "-y",
        "firecrawl-mcp"
      ],
      "env": {
        "FIRECRAWL_API_KEY": "sk_live_ohno-this-should-NOT-be-in-git" // 💀
      }
    }
  }
}
```

**This is a security nightmare waiting to happen.** One accidental commit and your keys are exposed in your Git history.

## 💯 The Solution

`get-mcp-keys` loads your API keys from a secure file in your home directory, keeping them out of your repositories entirely.

## ⚡ Quick Start

### 1. Create a `.mcprc` file in your home directory

```bash
touch ~/.mcprc
chmod 600 ~/.mcprc  # Make it readable only by you
```

### 3. Add your API keys to the file

```bash
# ~/.mcprc
FIRECRAWL_API_KEY="your_actual_api_key_here"
BRAVE_API_KEY="another_secret_key_here"
# Add any other MCP server keys you use
```

### 4. Update your MCP configuration to use get-mcp-keys

```json
{
  "mcpServers": {
    "firecrawl": {
      "command": "npx",
      "args": [
        "@masonator/get-mcp-keys", // 🔐
        "npx",
        "-y",
        "firecrawl-mcp"
      ]
    }
  }
}
```

**That's it!** The `get-mcp-keys` utility will:

- Load your API keys from `~/.mcprc`
- Inject them as environment variables
- Run your MCP server command with the keys available

## 🛡️ Security

- Your API keys stay in your home directory
- Keys are never committed to repositories
- Keys are loaded only when needed
- Debug output shows only first/last few characters of keys

## 🧰 Supported MCP Servers

Works with any MCP server that needs environment variables, including:

- FireCrawl
- Brave Search
- Supabase
- And any other MCP servers you configure!

## 🔍 How It Works

`get-mcp-keys` reads your `.mcprc` file, adds those environment variables to the current environment, and then executes whatever command you specify after it in the args list. It's simple yet effective!

## 📋 License

MIT

---

⭐ If this saved you from committing your keys, star the repo!
