# Get MCP Keys

Cursor (perhaps other ai tools too?) allow you to create project specific MCP servers in the `./cursor/mcp.json` file.

However, that means it's in the repo, so likely will end up commiting your env variables...

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
                "FIRECRAWL_API_KEY": "oops-this-shouldnt-be-in-the-repo"
            }
        }
    }
}
```

In an effort to stop this, what I want to do here is have an rc file in the users home directory that contains the MCP Server envs you use. 

> The MCP Server envs your using are likely user specific, so it makes sense to have them in your home directory. Will need to look at this again for when different projects are using different environment variables

so something like:

create the .mcprc file in the users home directory:

```bash
touch ~/.mcprc
```

add the following to the .mcprc file:

```bash
FIRECRAWL_API_KEY="oops-this-shouldnt-be-in-the-repo"
```

Then run this command before you run the mcp server, it would look something like this:

```json
{
  "mcpServers": {
    "firecrawl": {
      "command": "npx",
      "args": [
        "@masonator/get-mcp-keys",
        "npx",
        "-y",
        "firecrawl-mcp"
      ]
    }
  }
}
```

This would run the `get-mcp-keys` command first, grab the envs from the .mcprc file, and then run the `npx firecrawl-mcp` command with the envs it's grabbed.