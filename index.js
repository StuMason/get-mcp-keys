#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

// Path to .mcprc in user's home directory
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
    console.error(`Error reading .mcprc: ${e.message}`);
    return {};
  }
}

// Get environment variables from .mcprc
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
  
  // Log the keys we've loaded (only showing masked versions)
  const apiKeys = Object.keys(envVars).filter(key => 
    key.includes('API_KEY') || 
    key.includes('TOKEN') || 
    key.includes('SECRET')
  );
  
  if (apiKeys.length > 0) {
    console.error('Loaded API keys:');
    apiKeys.forEach(key => {
      const value = envVars[key];
      if (value && value.length > 8) {
        const masked = value.substring(0, 3) + '...' + 
                     value.substring(value.length - 3);
        console.error(`  ${key}: ${masked}`);
      } else if (value) {
        console.error(`  ${key}: ***`);
      }
    });
  } else {
    console.error('No API keys found in .mcprc');
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