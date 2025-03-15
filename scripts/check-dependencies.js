const { execSync } = require("child_process")
const semver = require("semver")
const pkg = require("../package.json")

// Check Node.js version
const nodeVersion = process.version
console.log(`Node.js version: ${nodeVersion}`)
if (!semver.satisfies(nodeVersion, pkg.engines.node)) {
  console.error(`Required Node.js version ${pkg.engines.node} not satisfied with current version ${nodeVersion}`)
  process.exit(1)
}

// Check for peer dependency conflicts
try {
  console.log("Checking for peer dependency conflicts...")
  const output = execSync("npm ls 2>&1", { encoding: "utf8" })

  if (output.includes("peer dep missing")) {
    console.warn("Warning: Some peer dependencies are missing. This may cause issues.")
    console.warn(
      output
        .split("\n")
        .filter((line) => line.includes("peer dep missing"))
        .join("\n"),
    )
  }

  console.log("Dependency check completed.")
} catch (error) {
  // npm ls returns non-zero exit code if there are peer dependency issues
  console.warn("Warning: Dependency conflicts detected. This may cause issues.")
  console.warn(
    error.stdout
      .split("\n")
      .filter((line) => line.includes("peer dep missing") || line.includes("peer dep conflict"))
      .join("\n"),
  )
}

// Check for specific problematic packages
const problematicPackages = [
  { name: "vaul", message: "vaul is not compatible with React 18, use @radix-ui/react-dialog instead" },
]

try {
  const installedPackages = JSON.parse(execSync("npm list --json --depth=0", { encoding: "utf8" }))

  const dependencies = {
    ...installedPackages.dependencies,
    ...installedPackages.devDependencies,
  }

  problematicPackages.forEach((pkg) => {
    if (dependencies[pkg.name]) {
      console.error(`Error: Problematic package detected: ${pkg.name}`)
      console.error(pkg.message)
      process.exit(1)
    }
  })
} catch (error) {
  console.warn("Warning: Could not check for problematic packages.")
}

console.log("All dependency checks passed.")

