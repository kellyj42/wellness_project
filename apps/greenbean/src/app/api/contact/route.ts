import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/client";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let { name, email, phone, message } = body;

    // Trim whitespace
    name = name?.trim();
    email = email?.trim().toLowerCase();
    phone = phone?.trim();
    message = message?.trim();

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate name
    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: "Name must be between 2 and 100 characters" },
        { status: 400 }
      );
    }

    if (!/^[a-zA-Z\s'-]+$/.test(name)) {
      return NextResponse.json(
        { error: "Name can only contain letters, spaces, hyphens and apostrophes" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Validate phone number (Uganda format)
    const cleanPhone = phone.replace(/[\s\-()]/g, "");
    if (!/^(\+256|0)[0-9]{9}$/.test(cleanPhone)) {
      return NextResponse.json(
        { error: "Invalid phone number. Please use Ugandan format (e.g., +256 700 000 000)" },
        { status: 400 }
      );
    }

    // Validate message length
    if (message.length < 10 || message.length > 1000) {
      return NextResponse.json(
        { error: "Message must be between 10 and 1000 characters" },
        { status: 400 }
      );
    }

    // Create the contact submission in Sanity
    const submission = await writeClient.create({
      _type: "contactSubmission",
      name,
      email,
      phone,
      message,
      submittedAt: new Date().toISOString(),
      status: "new",
    });

    // Send email notification to business
    try {
      const emailResponse = await resend.emails.send({
        from: "Green Bean Contact Form <onboarding@resend.dev>",
        to: "kellyjnambale@gmail.com",
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #A3AD5F;">New Contact Form Submission</h2>
            <p>You have received a new message from your website contact form.</p>
            
            <div style="background-color: #F5F3EE; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            
            <p style="color: #666; font-size: 12px;">
              Submitted at: ${new Date().toLocaleString('en-UG', { timeZone: 'Africa/Kampala' })}
            </p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />
            <p style="color: #999; font-size: 11px;">
              This email was sent from your Green Bean website contact form.
              View all submissions in your <a href="https://sdlg0ugb.sanity.studio/structure/contactSubmissions">Sanity Studio</a>.
            </p>
          </div>
        `,
      });
      console.log("Email sent successfully:", emailResponse);
    } catch (emailError) {
      // Log email error details for debugging
      console.error("Failed to send email notification:", {
        error: emailError,
        apiKey: process.env.RESEND_API_KEY ? "Present" : "MISSING",
      });
      // Still return success since the submission was saved to Sanity
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your message has been received.",
        submissionId: submission._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating contact submission:", error);
    return NextResponse.json(
      { error: "Failed to submit your message. Please try again." },
      { status: 500 }
    );
  }
}
