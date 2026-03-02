import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/client";

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
