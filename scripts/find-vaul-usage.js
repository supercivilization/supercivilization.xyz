const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

// Run grep to find files containing 'vaul'
try {
  const result = execSync(
    'grep -r "vaul" --include="*.tsx" --include="*.ts" --include="*.jsx" --include="*.js" .',
  ).toString()
  console.log("Files containing vaul references:")
  console.log(result)
} catch (error) {
  if (error.status === 1) {
    console.log("No files containing vaul references found.")
  } else {
    console.error("Error searching for vaul references:", error.message)
  }
}

console.log("\nChecking for vaul imports...")
const directoryPath = "."

function searchForVaulImports(dir) {
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory() && !filePath.includes("node_modules") && !filePath.includes(".git")) {
      searchForVaulImports(filePath)
    } else if (
      stat.isFile() &&
      (filePath.endsWith(".tsx") || filePath.endsWith(".ts") || filePath.endsWith(".jsx") || filePath.endsWith(".js"))
    ) {
      const content = fs.readFileSync(filePath, "utf8")
      if (content.includes("vaul")) {
        console.log(`Found vaul reference in: ${filePath}`)

        // Check for specific import patterns
        const importMatch = content.match(/import [^;]+ from ['"]vaul['"]/g)
        if (importMatch) {
          console.log(`  Import statement: ${importMatch[0]}`)
        }

        // Check for component usage
        const componentMatches = content.match(/<(Drawer|DrawerContent|DrawerTrigger)[^>]*>/g)
        if (componentMatches) {
          console.log(`  Component usage:`)
          componentMatches.forEach((match) => {
            console.log(`    ${match}`)
          })
        }
      }
    }
  }
}

searchForVaulImports(directoryPath)

