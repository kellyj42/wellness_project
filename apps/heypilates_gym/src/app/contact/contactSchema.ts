import { z } from "zod";

const phonePattern = /^[0-9+()\-\s]{7,20}$/;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter at least 2 characters for your name.")
    .max(80, "Name must be 80 characters or fewer."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(254, "Email address is too long."),
  phone: z
    .string()
    .trim()
    .max(20, "Phone number must be 20 characters or fewer.")
    .refine(
      (value) => value.length === 0 || phonePattern.test(value),
      "Please enter a valid phone number.",
    )
    .transform((value) => value || undefined)
    .optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please enter at least 10 characters in your message.")
    .max(1500, "Message must be 1500 characters or fewer."),
  source: z.string().trim().optional(),
});

export type ContactFormValues = z.input<typeof contactSchema>;
export type ContactPayload = z.infer<typeof contactSchema>;
