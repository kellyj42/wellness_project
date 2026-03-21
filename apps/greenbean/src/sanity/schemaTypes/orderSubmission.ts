import { defineArrayMember, defineField, defineType } from "sanity";

export const orderSubmission = defineType({
  name: "orderSubmission",
  title: "Order Submissions",
  type: "document",

  fields: [
    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
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
      name: "total",
      title: "Total (UGX)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      initialValue: "UGX",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Confirmed", value: "confirmed" },
          { title: "Completed", value: "completed" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      initialValue: "new",
    }),
    defineField({
      name: "whatsAppMessage",
      title: "WhatsApp Message",
      type: "text",
      rows: 10,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      title: "Ordered Items",
      type: "array",
      validation: (Rule) => Rule.required().min(1),
      of: [
        defineArrayMember({
          name: "orderItem",
          title: "Order Item",
          type: "object",
          fields: [
            defineField({
              name: "mealName",
              title: "Meal Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "category",
              title: "Category",
              type: "string",
            }),
            defineField({
              name: "quantity",
              title: "Quantity",
              type: "number",
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: "unitPrice",
              title: "Unit Price (UGX)",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: "lineTotal",
              title: "Line Total (UGX)",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: "notes",
              title: "Notes",
              type: "text",
              rows: 4,
            }),
          ],
          preview: {
            select: {
              title: "mealName",
              quantity: "quantity",
              lineTotal: "lineTotal",
            },
            prepare(selection) {
              const { title, quantity, lineTotal } = selection;

              return {
                title,
                subtitle: `${quantity || 1} item(s) | UGX ${(lineTotal || 0).toLocaleString()}`,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      initialValue: "website_menu",
    }),
  ],

  preview: {
    select: {
      title: "customerName",
      phone: "phone",
      total: "total",
      submittedAt: "submittedAt",
      status: "status",
    },
    prepare(selection) {
      const { title, phone, total, submittedAt, status } = selection;
      const date = submittedAt
        ? new Date(submittedAt).toLocaleString("en-UG", {
            dateStyle: "medium",
            timeStyle: "short",
          })
        : "Unknown time";

      return {
        title,
        subtitle: `${phone} | UGX ${(total || 0).toLocaleString()} | ${date} | ${status || "new"}`,
      };
    },
  },
});
