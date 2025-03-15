import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const { emails, message, inviteLink } = await request.json()

    // Create Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    // Send emails
    await Promise.all(
      emails.map(async (email: string) => {
        await transporter.sendMail({
          from: process.env.SMTP_FROM,
          to: email,
          subject: "Join Supercivilization",
          html: `
            <h1>You've been invited to join Supercivilization!</h1>
            <p>${message || "Join me on Supercivilization!"}</p>
            <p>Click the link below to join:</p>
            <a href="${inviteLink}">${inviteLink}</a>
          `,
        })
      })
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending invites:", error)
    return NextResponse.json(
      { error: "Failed to send invites" },
      { status: 500 }
    )
  }
} 