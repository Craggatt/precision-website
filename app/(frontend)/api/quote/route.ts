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
    const { firstName, lastName, email, phone, venue, products, additionalInfo, turnstileToken } = body;

    // Validate required fields
    if (!firstName || !lastName || !email) {
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

    // Store quote request in Payload CMS
    const quoteRequest = await payload.create({
      collection: "quote-requests",
      data: {
        firstName,
        lastName,
        email,
        phone: phone || "",
        products: products?.map((slug: string) => ({ productSlug: slug })) || [],
        additionalInfo: additionalInfo || "",
        status: "new",
      },
    });

    // Format products list for email
    const productsList = products && products.length > 0
      ? `
        <p><strong>Products of Interest:</strong></p>
        <ul>
          ${products.map((slug: string) => `<li>${slug}</li>`).join("")}
        </ul>
      `
      : "<p><em>No specific products selected</em></p>";

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Precision Signs Website <noreply@portal.precisionsigns.com.au>",
      to: ["leads@proposals.precisionsigns.com.au"],
      replyTo: email,
      subject: `Quote Request from ${firstName} ${lastName}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>From:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        ${venue ? `<p><strong>Venue Name:</strong> ${venue}</p>` : ""}
        <hr />
        ${productsList}
        ${additionalInfo ? `
          <hr />
          <p><strong>Additional Information:</strong></p>
          <p>${additionalInfo.replace(/\n/g, "<br />")}</p>
        ` : ""}
        <hr />
        <p style="font-size: 12px; color: #666;">Quote Request ID: ${quoteRequest.id}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      // Even if email fails, we still have the quote request in the database
      return NextResponse.json(
        {
          success: true,
          quoteRequestId: quoteRequest.id,
          warning: "Quote request saved but email notification failed"
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      success: true,
      quoteRequestId: quoteRequest.id,
      emailId: data?.id
    }, { status: 200 });
  } catch (error) {
    console.error("Quote request error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
