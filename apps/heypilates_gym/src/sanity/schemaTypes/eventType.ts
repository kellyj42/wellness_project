export default {
  name: "event",
  title: "Events",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Event Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "summary",
      title: "Short Summary",
      type: "text",
      rows: 3,
      validation: (Rule: any) => Rule.max(220),
    },
    {
      name: "description",
      title: "Full Description",
      type: "text",
      rows: 8,
    },
    {
      name: "image",
      title: "Event Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "startDate",
      title: "Start Date & Time",
      type: "datetime",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "endDate",
      title: "End Date & Time",
      type: "datetime",
    },
    {
      name: "location",
      title: "Location",
      type: "string",
    },
    {
      name: "instructor",
      title: "Instructor / Host",
      type: "string",
    },
    {
      name: "price",
      title: "Price",
      type: "string",
    },
    {
      name: "capacity",
      title: "Capacity",
      type: "number",
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name: "bookingUrl",
      title: "Booking URL",
      type: "url",
      initialValue:
        "https://studiobookingonline.com/heypilatesstudiokla/classes.html",
    },
    {
      name: "featured",
      title: "Featured Event",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "isPublished",
      title: "Published",
      type: "boolean",
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "startDate",
      media: "image",
    },
    prepare({
      title,
      subtitle,
      media,
    }: {
      title?: string;
      subtitle?: string;
      media?: unknown;
    }) {
      return {
        title,
        subtitle: subtitle
          ? new Date(subtitle).toLocaleString("en-UG", {
              dateStyle: "medium",
              timeStyle: "short",
            })
          : "No start date set",
        media,
      };
    },
  },
};
