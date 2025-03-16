import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

dotenv.config()

async function generateInviteCode() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Generate a random code (8 characters, alphanumeric)
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let code = ""
  for (let i = 0; i < 8; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  // Calculate expiry time (24 hours from now)
  const expiryDate = new Date()
  expiryDate.setHours(expiryDate.getHours() + 24)

  try {
    const { error } = await supabase
      .from("invites")
      .insert({
        code,
        is_used: false,
        created_at: new Date().toISOString(),
        expires_at: expiryDate.toISOString(),
      })
      .select()
      .single()

    if (error) throw error

    console.log("Successfully generated invite code:")
    console.log("Code:", code)
    console.log("Expires at:", expiryDate.toLocaleString())
    console.log("\nUse this URL to sign up:")
    console.log(`http://localhost:3000/join?code=${code}`)
  } catch (error) {
    console.error("Error generating invite code:", error)
  }
}

generateInviteCode() 