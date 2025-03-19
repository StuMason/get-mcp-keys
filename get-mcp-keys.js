#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

// Path to .env.cursor in user's home directory
const envPath = path.join(os.homedir(), '.mcprc');

// Function to parse .env file
function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`Warning: Environment file not found at ${filePath}`);
    return {};
  }
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const env = {};
    
    content.split('\n').forEach(line => {
      // Skip comments and empty lines
      if (!line || line.startsWith('#')) return;
      
      // Parse KEY=VALUE format
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        
        // Remove quotes if present
        if (value.length > 0 && value.charAt(0) === '"' && value.charAt(value.length - 1) === '"') {
          value = value.replace(/^"|"$/g, '');
        }
        
        env[key] = value;
      }
    });
    
    return env;
  } catch (e) {
    console.error(`Error reading .env.cursor: ${e.message}`);
    return {};
  }
}

// Get environment variables from .env.cursor
const envVars = parseEnvFile(envPath);

// Get the command and arguments
const [command, ...args] = process.argv.slice(2);

// Check if a command was provided
if (!command) {
  console.error('Error: No command specified');
  process.exit(1);
}

// Run the command with the environment variables
try {
  // Create a combined environment with both system env vars and our loaded vars
  const combinedEnv = { ...process.env, ...envVars };
  
  // Debug - log the key environment variables (redacted for security)
  if (combinedEnv.FIRECRAWL_API_KEY) {
    const masked = combinedEnv.FIRECRAWL_API_KEY.substring(0, 5) + '...' + 
                 combinedEnv.FIRECRAWL_API_KEY.substring(combinedEnv.FIRECRAWL_API_KEY.length - 4);
    console.error(`FIRECRAWL_API_KEY loaded: ${masked}`);
  } else {
    console.error('WARNING: FIRECRAWL_API_KEY not found in environment');
  }
  
  if (combinedEnv.BRAVE_API_KEY) {
    const masked = combinedEnv.BRAVE_API_KEY.substring(0, 5) + '...' + 
                 combinedEnv.BRAVE_API_KEY.substring(combinedEnv.BRAVE_API_KEY.length - 4);
    console.error(`BRAVE_API_KEY loaded: ${masked}`);
  }
  
  // Spawn the process with the combined environment
  const child = spawn(command, args, {
    env: combinedEnv,
    stdio: 'inherit'
  });

  child.on('error', (err) => {
    console.error(`Failed to start command: ${err.message}`);
    process.exit(1);
  });

  child.on('exit', (code) => {
    process.exit(code || 0);
  });
} catch (error) {
  console.error(`Error executing command: ${error.message}`);
  process.exit(1);
}