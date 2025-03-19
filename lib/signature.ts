import { createHash } from "crypto"

export async function generateSignature(
  userId: string,
  answers: Record<string, string>
): Promise<string> {
  // Create a string representation of the agreement
  const agreementString = JSON.stringify({
    userId,
    answers,
    timestamp: new Date().toISOString(),
    version: "1.0"
  })

  // Generate a SHA-256 hash of the agreement string
  const hash = createHash("sha256")
  hash.update(agreementString)
  return hash.digest("hex")
} 