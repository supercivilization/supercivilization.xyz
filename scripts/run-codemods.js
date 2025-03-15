// This script runs the Next.js 15 codemods to automatically fix common issues
// Run with: node scripts/run-codemods.js

const { execSync } = require("child_process")

console.log("Running Next.js 15 codemods...")

try {
  // Run the async request API codemod
  console.log("\nRunning async request API codemod...")
  execSync("npx @next/codemod@canary next-async-request-api .", { stdio: "inherit" })

  // Run the experimental edge to edge runtime codemod
  console.log("\nRunning experimental edge to edge runtime codemod...")
  execSync("npx @next/codemod@canary experimental-edge-to-edge .", { stdio: "inherit" })

  console.log("\nCodemods completed successfully!")
  console.log("\nNext steps:")
  console.log("1. Run `next build --debug` to check for any remaining TypeScript errors")
  console.log("2. Test your application locally with `next dev`")
  console.log("3. Deploy your application")
} catch (error) {
  console.error("Error running codemods:", error)
  process.exit(1)
}

