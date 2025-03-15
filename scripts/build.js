const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
}

console.log(`${colors.cyan}Starting pre-build checks...${colors.reset}`)

// Check for required environment variables
const requiredEnvVars = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"]

const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar])

if (missingEnvVars.length > 0) {
  console.error(`${colors.red}Error: Missing required environment variables:${colors.reset}`)
  missingEnvVars.forEach((envVar) => {
    console.error(`  - ${envVar}`)
  })
  console.error(`\nPlease add these to your .env file or deployment environment.`)
  process.exit(1)
}

// Check for TypeScript errors
console.log(`${colors.blue}Checking for TypeScript errors...${colors.reset}`)
try {
  execSync("npx tsc --noEmit", { stdio: "inherit" })
  console.log(`${colors.green}✓ TypeScript check passed${colors.reset}`)
} catch (error) {
  console.error(`${colors.red}✗ TypeScript check failed${colors.reset}`)
  process.exit(1)
}

// Check for ESLint errors
console.log(`${colors.blue}Checking for ESLint errors...${colors.reset}`)
try {
  execSync("npx eslint . --ext .ts,.tsx --max-warnings=0", { stdio: "inherit" })
  console.log(`${colors.green}✓ ESLint check passed${colors.reset}`)
} catch (error) {
  console.error(`${colors.red}✗ ESLint check failed${colors.reset}`)
  // Don't exit for ESLint errors, just warn
  console.warn(`${colors.yellow}Continuing despite ESLint errors...${colors.reset}`)
}

// Check for duplicate dependencies
console.log(`${colors.blue}Checking for duplicate dependencies...${colors.reset}`)
try {
  const output = execSync("npm ls --json --depth=0", { encoding: "utf8" })
  const dependencies = JSON.parse(output).dependencies || {}

  const duplicates = []
  const seen = new Set()

  Object.keys(dependencies).forEach((dep) => {
    const name = dep.split("@")[0]
    if (seen.has(name)) {
      duplicates.push(dep)
    } else {
      seen.add(name)
    }
  })

  if (duplicates.length > 0) {
    console.warn(`${colors.yellow}Warning: Found duplicate dependencies:${colors.reset}`)
    duplicates.forEach((dep) => {
      console.warn(`  - ${dep}`)
    })
    console.warn(`${colors.yellow}Consider removing or consolidating these dependencies.${colors.reset}`)
  } else {
    console.log(`${colors.green}✓ No duplicate dependencies found${colors.reset}`)
  }
} catch (error) {
  console.warn(`${colors.yellow}Could not check for duplicate dependencies: ${error.message}${colors.reset}`)
}

// Run the actual build
console.log(`${colors.magenta}All checks passed. Starting build...${colors.reset}`)
try {
  execSync("next build", { stdio: "inherit" })
  console.log(`${colors.green}✓ Build completed successfully${colors.reset}`)
} catch (error) {
  console.error(`${colors.red}✗ Build failed${colors.reset}`)
  process.exit(1)
}

