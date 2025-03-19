---
description: 
globs: 
alwaysApply: true
---

## Supabase (Postgres MCP - Development Only)

- Always use the project-specific **Supabase MCP server** for database operations.
- Use structured relational SQL storage provided by Supabase. Avoid using raw JSON file storage for structured data unless explicitly required by schema design.
- Database operations are **strictly for the development environment only**.
- **Never delete or alter critical data without explicit confirmation.** Operations should be carefully controlled.