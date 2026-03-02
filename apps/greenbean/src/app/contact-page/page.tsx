"use client";

import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useState, FormEvent } from "react";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2)
          return "Name must be at least 2 characters";
        if (value.trim().length > 100)
          return "Name must be less than 100 characters";
        if (!/^[a-zA-Z\s'-]+$/.test(value))
          return "Name can only contain letters, spaces, hyphens and apostrophes";
        return undefined;

      case "email":
        if (!value.trim()) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value))
          return "Please enter a valid email address";
        return undefined;

      case "phone":
        if (!value.trim()) return "Phone number is required";
        // Remove spaces, dashes, and parentheses for validation
        const cleanPhone = value.replace(/[\s\-()]/g, "");
        // Uganda phone format: +256 followed by 9 digits, or starts with 0 followed by 9 digits
        if (!/^(\+256|0)[0-9]{9}$/.test(cleanPhone)) {
          return "Please enter a valid Ugandan phone number (e.g., +256 700 000 000 or 0700 000 000)";
        }
        return undefined;

      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 10)
          return "Message must be at least 10 characters";
        if (value.trim().length > 1000)
          return "Message must be less than 1000 characters";
        return undefined;

      default:
        return undefined;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitStatus({ type: null, message: "" });

    // Validate form before submitting
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Trim and clean data before sending
      const cleanData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: data.message || "Thank you! Your message has been received.",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
        setErrors({});
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to submit. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    if (error) {
      setErrors({
        ...errors,
        [name]: error,
      });
    }
  };

  return (
    <section className="bg-[#F6F4EF] min-h-screen py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-sm tracking-[0.3em] text-[#6B7D6D] font-medium">
            GREEN BEAN
          </span>

          <h1 className="text-6xl font-serif text-[#2F3E34] mt-6 mb-6">
            Contact Us
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Have a question about our meals, meal plans, or programs? We'd love
            to hear from you. Reach out and our team will respond shortly.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left Side - Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-[#6B7D6D]" />
              <div>
                <h3 className="text-xl font-semibold text-[#2F3E34]">
                  Location
                </h3>
                <p className="text-gray-600">
                  CrossFit Kampala
                  <br />
                  Kampala, Uganda
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-[#6B7D6D]" />
              <div>
                <h3 className="text-xl font-semibold text-[#2F3E34]">Phone</h3>
                <p className="text-gray-600">+256 700 000 000</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-[#6B7D6D]" />
              <div>
                <h3 className="text-xl font-semibold text-[#2F3E34]">Email</h3>
                <p className="text-gray-600">info@greenbean.ug</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-[#6B7D6D]" />
              <div>
                <h3 className="text-xl font-semibold text-[#2F3E34]">
                  Opening Hours
                </h3>
                <p className="text-gray-600">
                  Monday – Friday: 7:00 AM – 9:00 PM
                  <br />
                  Saturday – Sunday: 8:00 AM – 10:00 PM
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 space-y-6"
          >
            {/* Success/Error Messages */}
            {submitStatus.type && (
              <div
                className={`p-4 rounded-lg ${
                  submitStatus.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <div>
              <label className="block text-sm text-[#2F3E34] mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition-colors ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[#6B7D6D]"
                }`}
                placeholder="Your name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-[#2F3E34] mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition-colors ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[#6B7D6D]"
                }`}
                placeholder="you@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-[#2F3E34] mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition-colors ${
                  errors.phone
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[#6B7D6D]"
                }`}
                placeholder="+256 700 000 000"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-[#2F3E34] mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={5}
                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition-colors resize-none ${
                  errors.message
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[#6B7D6D]"
                }`}
                placeholder="Write your message..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message}</p>
              )}
              <p className="mt-1 text-xs text-gray-500 text-right">
                {formData.message.length}/1000 characters
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-[#2F3E34] text-white py-4 rounded-full font-medium transition ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#1f2a24]"
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        </div>

        {/* Map */}
        <div className="mt-16">
          <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-white">
            <div className="aspect-[16/9] w-full">
              <iframe
                title="Green Bean Location"
                src="https://www.google.com/maps?q=CrossFit+Kampala&output=embed"
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
