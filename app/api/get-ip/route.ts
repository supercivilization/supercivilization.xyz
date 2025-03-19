import { NextResponse } from "next/server"
import { headers } from "next/headers"

export async function GET() {
  const headersList = headers()
  const forwardedFor = headersList.get("x-forwarded-for")
  const realIp = headersList.get("x-real-ip")
  
  // Get IP from forwarded header or real IP header
  const ip = forwardedFor?.split(",")[0] || realIp || "unknown"
  
  return NextResponse.json({ ip })
} 