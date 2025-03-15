import { type NextRequest, NextResponse } from "next/server"
import { withApiConfig } from "@/lib/api-config"

// Use underscore prefix to indicate intentionally unused parameter
async function POST(_request: NextRequest) {
  return NextResponse.json({ success: true })
}

// Use underscore prefix here too for consistency
async function GET(_request: NextRequest) {
  return NextResponse.json({ status: "API is running" })
}

export { POST, GET }

// Apply standard configuration
export const { runtime, dynamic, revalidate } = withApiConfig({})

