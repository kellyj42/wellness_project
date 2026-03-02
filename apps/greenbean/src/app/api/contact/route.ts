import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
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

    // Create the contact submission in Sanity
    const submission = await client.create({
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
