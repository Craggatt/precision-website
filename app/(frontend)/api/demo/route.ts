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
    const { firstName, lastName, venueName, position, email, mobile, turnstileToken } = body;

    // Validate required fields
    if (!firstName || !lastName || !venueName || !position || !email) {
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

    // Store demo booking in Payload CMS
    const demoBooking = await payload.create({
      collection: "demo-bookings",
      data: {
        firstName,
        lastName,
        venueName,
        position,
        email,
        mobile: mobile || "",
        status: "new",
      },
    });

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Precision Signs Website <noreply@portal.precisionsigns.com.au>",
      to: ["sales@precisionsigns.com.au"],
      replyTo: email,
      subject: `AGE 2026 Demo Booking from ${firstName} ${lastName} — ${venueName}`,
      html: `
        <h2>New AGE 2026 Demo Booking</h2>
        <p><strong>From:</strong> ${firstName} ${lastName}</p>
        <p><strong>Venue:</strong> ${venueName}</p>
        <p><strong>Position:</strong> ${position}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${mobile ? `<p><strong>Mobile:</strong> ${mobile}</p>` : ""}
        <hr />
        <p style="font-size: 12px; color: #666;">Demo Booking ID: ${demoBooking.id}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      // Even if email fails, we still have the booking in the database
      return NextResponse.json(
        {
          success: true,
          demoBookingId: demoBooking.id,
          warning: "Demo booking saved but email notification failed"
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      success: true,
      demoBookingId: demoBooking.id,
      emailId: data?.id
    }, { status: 200 });
  } catch (error) {
    console.error("Demo booking error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
