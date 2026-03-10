"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Instagram,
  Facebook,
  X,
  Link,
} from "lucide-react";
import { LinkedinIcon } from "@sanity/icons";
import { contactSchema, type ContactFormValues } from "@/app/contact/contactSchema";

interface ContactFormProps {
  contactInfo?: {
    phone?: string;
    email?: string;
    address?: string;
    hoursText?: string;
    socialLinks?: Array<{
      platform: string;
      url: string;
    }>;
    mapEmbed?: string;
  };
}

type ContactField = keyof Omit<ContactFormValues, "source">;
type ContactFieldErrors = Partial<Record<ContactField, string>>;

const initialFormData: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactForm({ contactInfo }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormValues>(initialFormData);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  const validateForm = (values: ContactFormValues) => {
    const result = contactSchema.safeParse(values);

    if (result.success) {
      return { success: true as const, data: result.data, errors: {} };
    }

    const flattened = result.error.flatten().fieldErrors;
    const nextErrors: ContactFieldErrors = {};

    for (const [key, messages] of Object.entries(flattened)) {
      const firstMessage = messages?.[0];
      if (firstMessage && key !== "source") {
        nextErrors[key as ContactField] = firstMessage;
      }
    }

    return { success: false as const, errors: nextErrors };
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name !== "source") {
      setFieldErrors((prev) => {
        if (!prev[name as ContactField]) {
          return prev;
        }

        const nextErrors = { ...prev };
        delete nextErrors[name as ContactField];
        return nextErrors;
      });
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name } = e.target;
    if (name === "source") {
      return;
    }

    const validation = validateForm(formData);
    setFieldErrors((prev) => ({
      ...prev,
      [name]: validation.errors[name as ContactField],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(false);
    setErrorMessage(null);
    setWarningMessage(null);

    const validation = validateForm(formData);
    if (!validation.success) {
      setFieldErrors(validation.errors);
      setErrorMessage("Please fix the highlighted fields and try again.");
      setLoading(false);
      return;
    }

    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...validation.data,
          source: "contact-page",
        }),
      });

      const responseData = await response.json().catch(() => null);

      if (!response.ok) {
        if (responseData?.issues?.fieldErrors) {
          const serverErrors: ContactFieldErrors = {};
          for (const [key, messages] of Object.entries(
            responseData.issues.fieldErrors,
          )) {
            const firstMessage = Array.isArray(messages) ? messages[0] : undefined;
            if (firstMessage && key !== "source") {
              serverErrors[key as ContactField] = firstMessage;
            }
          }
          setFieldErrors(serverErrors);
        }

        const message =
          responseData?.error || "Unable to send your message right now.";
        throw new Error(message);
      }

      if (responseData?.skipped) {
        setWarningMessage(
          "Message received, but delivery is temporarily unavailable.",
        );
      }

      setSubmitted(true);
      setFormData(initialFormData);

      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Error submitting form. Please try again.";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return <Instagram />;
      case "facebook":
        return <Facebook />;
      case "twitter":
        return <X />;
      case "linkedin":
        return <LinkedinIcon />;
      default:
        return <Link />;
    }
  };

  const getInputClasses = (field: ContactField) =>
    `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
      fieldErrors[field]
        ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
        : "border-slate-300 focus:border-brand-pink focus:ring-brand-pink/20"
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br  from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-brand-charcoal mb-4">
            Get In Touch
          </h1>
          <p className="text-lg text-slate-600">
            We'd love to hear from you. Reach out to us today!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-brand-charcoal mb-8">
                Contact Information.
              </h2>

              <div className="flex gap-4 mb-6">
                <div className="flex-shrink-0">
                  <Mail className="w-6 h-6 text-brand-pink" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Email</p>
                  <a
                    href={`mailto:${contactInfo?.email}`}
                    className="text-lg text-brand-charcoal font-semibold hover:text-brand-pink transition"
                  >
                    {contactInfo?.email || "contact@heypilates.com"}
                  </a>
                </div>
              </div>

              <div className="flex gap-4 mb-6">
                <div className="flex-shrink-0">
                  <Phone className="w-6 h-6 text-brand-pink" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Phone</p>
                  <a
                    href={`tel:${contactInfo?.phone}`}
                    className="text-lg text-brand-charcoal font-semibold hover:text-brand-pink transition"
                  >
                    {contactInfo?.phone || "(555) 123-4567"}
                  </a>
                </div>
              </div>

              <div className="flex gap-4 mb-6">
                <div className="flex-shrink-0">
                  <MapPin className="w-6 h-6 text-brand-pink" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Address</p>
                  <p className="text-lg text-brand-charcoal font-semibold">
                    {contactInfo?.address ||
                      "123 Pilates Lane, Fitness City, ST 12345"}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Clock className="w-6 h-6 text-brand-pink" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Hours</p>
                  <p className="text-base text-brand-charcoal whitespace-pre-line">
                    {contactInfo?.hoursText ||
                      "Mon - Fri: 6:00 AM - 8:00 PM\nSat - Sun: 8:00 AM - 6:00 PM"}
                  </p>
                </div>
              </div>
            </div>

            {contactInfo?.socialLinks && contactInfo.socialLinks.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-brand-charcoal mb-4">
                  Follow Us
                </h3>
                <div className="flex gap-4">
                  {contactInfo.socialLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-pink hover:bg-brand-pink hover:text-white transition shadow-md"
                    >
                      <span className="font-bold text-lg">
                        {getSocialIcon(link.platform)}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {contactInfo?.mapEmbed && (
              <div className="mt-8">
                <h3 className="text-lg font-bold text-brand-charcoal mb-4">
                  Location
                </h3>
                <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src={contactInfo.mapEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h2 className="text-2xl font-bold text-brand-charcoal mb-6">
                Send Us a Message
              </h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 font-semibold">
                    Thank you! We've received your message and will get back to
                    you soon.
                  </p>
                </div>
              )}

              {warningMessage && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 font-semibold">
                    {warningMessage}
                  </p>
                </div>
              )}

              {errorMessage && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 font-semibold">{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-brand-charcoal mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClasses("name")}
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={fieldErrors.name ? "name-error" : undefined}
                    required
                  />
                  {fieldErrors.name && (
                    <p id="name-error" className="mt-2 text-sm text-red-600">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-brand-charcoal mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClasses("email")}
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? "email-error" : undefined}
                    autoComplete="email"
                    required
                  />
                  {fieldErrors.email && (
                    <p id="email-error" className="mt-2 text-sm text-red-600">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-brand-charcoal mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClasses("phone")}
                    aria-invalid={Boolean(fieldErrors.phone)}
                    aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                    autoComplete="tel"
                  />
                  {fieldErrors.phone && (
                    <p id="phone-error" className="mt-2 text-sm text-red-600">
                      {fieldErrors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-brand-charcoal mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tell us what's on your mind..."
                    rows={5}
                    className={`${getInputClasses("message")} resize-none`}
                    aria-invalid={Boolean(fieldErrors.message)}
                    aria-describedby={fieldErrors.message ? "message-error" : undefined}
                    required
                  ></textarea>
                  {fieldErrors.message && (
                    <p id="message-error" className="mt-2 text-sm text-red-600">
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-pink border hover:text-white hover:bg-brand-sageDark text-slate-400 font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
