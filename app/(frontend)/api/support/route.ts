import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getPayload } from "payload";
import config from "@/payload.config";
import { verifyTurnstileToken } from "@/lib/turnstile";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      venueName,
      contactName,
      email,
      phone,
      signDescription,
      serialNumber,
      faultDescription,
      turnstileToken
    } = body;

    // Validate required fields
    if (!venueName || !contactName || !email || !phone || !signDescription || !faultDescription) {
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

    // Store support request in Payload CMS
    const supportRequest = await payload.create({
      collection: "support-requests",
      data: {
        venueName,
        contactName,
        email,
        phone,
        signDescription,
        serialNumber: serialNumber || "",
        faultDescription,
        status: "new",
        priority: "normal",
      },
    });

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Precision Signs Website <noreply@portal.precisionsigns.com.au>",
      to: ["support@precisionsigns.com.au"],
      replyTo: email,
      subject: `Support Request: ${venueName} - ${signDescription}`,
      html: `
        <h2>New Support Request</h2>
        <p><strong>Venue:</strong> ${venueName}</p>
        <p><strong>Contact:</strong> ${contactName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <hr />
        <p><strong>Sign Description:</strong> ${signDescription}</p>
        ${serialNumber ? `<p><strong>Serial Number:</strong> ${serialNumber}</p>` : ""}
        <hr />
        <p><strong>Fault Description:</strong></p>
        <p>${faultDescription.replace(/\n/g, "<br />")}</p>
        <hr />
        <p style="font-size: 12px; color: #666;">Support Request ID: ${supportRequest.id}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      // Even if email fails, we still have the support request in the database
      return NextResponse.json(
        {
          success: true,
          supportRequestId: supportRequest.id,
          warning: "Support request saved but email notification failed"
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      success: true,
      supportRequestId: supportRequest.id,
      emailId: data?.id
    }, { status: 200 });
  } catch (error) {
    console.error("Support request error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
