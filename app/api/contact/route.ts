import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Insert contact submission into database
    const { data: submission, error: insertError } = await supabase
      .from("contact_submissions")
      .insert({
        name,
        email,
        phone: phone || null,
        message,
      })
      .select()
      .single()

    if (insertError) {
      console.error("Error inserting contact submission:", insertError)
      return NextResponse.json(
        { error: "Failed to save your message. Please try again." },
        { status: 500 }
      )
    }

    // Get notification email from settings
    const { data: settings } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "contact_details")
      .single()

    const notificationEmail = settings?.value?.notification_email

    // Send email notification if notification email is configured
    if (notificationEmail) {
      try {
        await sendEmailNotification({
          to: notificationEmail,
          subject: `New Contact Form Submission from ${name}`,
          name,
          email,
          phone,
          message,
        })
      } catch (emailError) {
        // Log error but don't fail the request - the submission is already saved
        console.error("Error sending email notification:", emailError)
      }
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully!",
    })
  } catch (error) {
    console.error("Contact API error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    )
  }
}

interface EmailParams {
  to: string
  subject: string
  name: string
  email: string
  phone?: string | null
  message: string
}

async function sendEmailNotification(params: EmailParams) {
  const { to, subject, name, email, phone, message } = params

  // Check if Resend API key is configured
  const resendApiKey = process.env.RESEND_API_KEY

  if (!resendApiKey) {
    console.log("RESEND_API_KEY not configured. Skipping email notification.")
    console.log("Email would have been sent to:", to)
    console.log("Subject:", subject)
    return
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendApiKey}`,
    },
    body: JSON.stringify({
      from: "donate@vasanthamtrust.com",
      to: [to],
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p>You have received a new message through the website contact form.</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; background: #fff; padding: 15px; border-radius: 4px;">${message}</p>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            This email was sent automatically from the Vasantham Charitable Trust website.
          </p>
        </div>
      `,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Failed to send email: ${JSON.stringify(error)}`)
  }

  return response.json()
}
