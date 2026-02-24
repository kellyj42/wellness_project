import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

const contactMessageType = defineType({
  name: "contactMessage",
  title: "Contact Message",
  type: "document",
  icon: UserIcon,

  fieldsets: [
    {
      name: "personalInfo",
      title: "👤 Personal Information",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "messageDetails",
      title: "💬 Message Details",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "meta",
      title: "📌 System Information",
      options: { collapsible: true, collapsed: true },
    },
  ],

  fields: [
    // PERSONAL INFO
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (rule) => rule.required(),
      fieldset: "personalInfo",
      readOnly: true,
    }),

    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (rule) => rule.email().required(),
      fieldset: "personalInfo",
      readOnly: true,
    }),

    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      fieldset: "personalInfo",
      readOnly: true,
    }),

    // MESSAGE
    defineField({
      name: "message",
      title: "Client Message",
      type: "text",
      rows: 8,
      validation: (rule) => rule.required(),
      fieldset: "messageDetails",
      readOnly: true,
    }),

    defineField({
      name: "status",
      title: "Message Status",
      type: "string",
      options: {
        list: [
          { title: "🆕 New", value: "new" },
          { title: "👀 Read", value: "read" },
          { title: "✅ Replied", value: "replied" },
        ],
        layout: "radio",
      },
      initialValue: "new",
      fieldset: "messageDetails",
    }),

    // SYSTEM META
    defineField({
      name: "source",
      title: "Form Source",
      type: "string",
      readOnly: true,
      fieldset: "meta",
    }),

    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      readOnly: true,
      fieldset: "meta",
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "email",
      status: "status",
    },
    prepare(selection) {
      const { title, subtitle, status } = selection;
      return {
        title: title,
        subtitle: `${subtitle} • ${status?.toUpperCase()}`,
      };
    },
  },
});

export default contactMessageType;