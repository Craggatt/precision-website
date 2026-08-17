import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getPayload } from "payload";
import config from "@/payload.config";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
  try {
    // Validate API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const { firstName, lastName, email, phone, subject, message, turnstileToken } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify Turnstile token
    if (!turnstileToken) {
      return NextResponse.json(
        { error: "Captcha verification required" },
        { status: 400 }
      );
    }

    const isValidToken = await verifyTurnstileToken(turnstileToken);
    if (!isValidToken) {
      return NextResponse.json(
        { error: "Captcha verification failed" },
        { status: 403 }
      );
    }

    // Get Payload instance
    const payload = await getPayload({ config });

    // Store submission in Payload CMS
    const submission = await payload.create({
      collection: "contact-submissions",
      data: {
        firstName,
        lastName,
        email,
        phone: phone || "",
        subject,
        message,
        status: "new",
      },
    });

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Precision Signs Website <noreply@portal.precisionsigns.com.au>",
      to: ["sales@precisionsigns.com.au"],
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
        <hr />
        <p style="font-size: 12px; color: #666;">Submission ID: ${submission.id}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      // Even if email fails, we still have the submission in the database
      return NextResponse.json(
        {
          success: true,
          submissionId: submission.id,
          warning: "Submission saved but email notification failed"
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      success: true,
      submissionId: submission.id,
      emailId: data?.id
    }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
