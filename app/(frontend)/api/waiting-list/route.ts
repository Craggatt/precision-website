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
    const { name, email, phone, company, position, turnstileToken } = body;

    // Validate required fields
    if (!name || !email) {
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

    // Store waiting list signup in Payload CMS
    const waitingListEntry = await payload.create({
      collection: "waiting-list",
      data: {
        name,
        email,
        phone: phone || "",
        company: company || "",
        position: position || "",
        status: "new",
      },
    });

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Precision Signs Website <noreply@portal.precisionsigns.com.au>",
      to: ["sales@precisionsigns.com.au"],
      replyTo: email,
      subject: `Waiting List Signup from ${name}`,
      html: `
        <h2>New Waiting List Signup</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
        ${position ? `<p><strong>Position:</strong> ${position}</p>` : ""}
        <hr />
        <p style="font-size: 12px; color: #666;">Waiting List Entry ID: ${waitingListEntry.id}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      // Even if email fails, we still have the entry in the database
      return NextResponse.json(
        {
          success: true,
          waitingListEntryId: waitingListEntry.id,
          warning: "Signup saved but email notification failed"
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      success: true,
      waitingListEntryId: waitingListEntry.id,
      emailId: data?.id
    }, { status: 200 });
  } catch (error) {
    console.error("Waiting list signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
