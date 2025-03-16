import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readFileSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, '..', '.env') })

async function createProcedure() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing environment variables:")
    console.error("NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl ? "✓" : "✗")
    console.error("SUPABASE_SERVICE_ROLE_KEY:", supabaseKey ? "✓" : "✗")
    throw new Error("Missing required environment variables")
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    db: {
      schema: 'public'
    }
  })

  try {
    const sql = readFileSync(join(__dirname, 'create-procedure.sql'), 'utf8')
    const { error } = await supabase.rpc('exec_sql', { sql })

    if (error) {
      console.error("Error creating procedure:", error)
      throw error
    }

    console.log("Successfully created stored procedure")
  } catch (error) {
    console.error("Error:", error.message || error)
    process.exit(1)
  }
}

createProcedure() 