const fs = require("fs")
const path = require("path")

console.log("Running pre-build checks...")

// Check if package.json exists
const packageJsonPath = path.join(process.cwd(), "package.json")
if (!fs.existsSync(packageJsonPath)) {
  console.error("Error: package.json not found")
  process.exit(1)
}

// Read package.json
let packageJson
try {
  packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"))
} catch (error) {
  console.error("Error reading package.json:", error.message)
  process.exit(1)
}

// Check React version
const reactVersion = packageJson.dependencies.react
if (!reactVersion) {
  console.error("Error: React dependency not found in package.json")
  process.exit(1)
}

if (reactVersion.includes("19")) {
  console.error("Error: React 19 is not compatible with all dependencies. Please use React 18.")
  process.exit(1)
}

// Check for vaul dependency
if (packageJson.dependencies.vaul) {
  console.error("Error: vaul dependency found in package.json. This is not compatible with React 18.")
  console.log("Please remove vaul and use the custom drawer component instead.")
  process.exit(1)
}

console.log("Pre-build checks passed. Proceeding with build...")

