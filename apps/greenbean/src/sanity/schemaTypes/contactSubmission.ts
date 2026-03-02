import { defineField, defineType } from "sanity";

export const contactSubmission = defineType({
  name: "contactSubmission",
  title: "Contact Submissions",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),

    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "message",
      title: "Message",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),

    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "In Progress", value: "in_progress" },
          { title: "Responded", value: "responded" },
          { title: "Closed", value: "closed" },
        ],
      },
      initialValue: "new",
    }),

    defineField({
      name: "notes",
      title: "Internal Notes",
      type: "text",
      description: "Internal notes about this submission",
    }),
  ],

  preview: {
    select: {
      name: "name",
      email: "email",
      phone: "phone",
      submittedAt: "submittedAt",
      status: "status",
    },
    prepare(selection) {
      const { name, email, phone, submittedAt, status } = selection;
      const date = submittedAt
        ? new Date(submittedAt).toLocaleDateString()
        : "Unknown date";
      return {
        title: name,
        subtitle: `${phone} • ${email} • ${date} • ${status || "new"}`,
      };
    },
  },
});
