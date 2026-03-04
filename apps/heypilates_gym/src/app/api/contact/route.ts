import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { Resend } from "resend";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(1),
  source: z.string().optional(),
});

export async function POST(req: Request) {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  const resendApiKey = process.env.RESEND_API_KEY;
  const businessEmail = process.env.BUSINESS_EMAIL || "hello@heypilates.com";
  const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";

  if (!token) {
    return NextResponse.json(
      { error: "Missing SANITY_API_WRITE_TOKEN" },
      { status: 500 }
    );
  }

  const payload = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid form data", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { name, email, phone, message, source } = parsed.data;

  const sanityClient = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });

  // Save to Sanity
  const created = await sanityClient.create({
    _type: "contactMessage",
    name,
    email,
    phone: phone || undefined,
    message,
    source: source || "contact-page",
    submittedAt: new Date().toISOString(),
    status: "new",
  });

  // Send email notification
  let emailSent = false;
  let emailError = null;
  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);
      
      console.log("Sending email from:", fromEmail, "to:", businessEmail);
      
      const response = await resend.emails.send({
        from: fromEmail,
        to: businessEmail,
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
          <p><strong>Source:</strong> ${source || "contact-page"}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
          <hr>
          <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
        `,
      });
      
      console.log("Email response:", response);
      emailSent = !response.error;
      if (response.error) {
        emailError = response.error;
      }
    } catch (err) {
      console.error("Failed to send email:", err);
      emailError = err instanceof Error ? err.message : String(err);
    }
  }

  return NextResponse.json({ 
    ok: true, 
    id: created?._id,
    emailSent,
    emailError: emailError || undefined
  });
}
