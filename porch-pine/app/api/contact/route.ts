import nodemailer from 'nodemailer'
import { NextRequest, NextResponse } from 'next/server'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send email to broker
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: 'broker@propertybyprime.com',
      subject: `Porch & Pine Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email,
    })

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: 'We received your message - Porch & Pine Properties',
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for contacting Porch & Pine Properties. We've received your message and will get back to you shortly.</p>
        <p>Best regards,<br>Porch & Pine Properties Team</p>
      `,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
