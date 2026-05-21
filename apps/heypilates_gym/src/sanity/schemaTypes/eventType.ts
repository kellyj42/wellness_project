import { defineField, defineType } from "sanity";
import type { ReactNode } from "react";

export default defineType({
  name: "event",
  title: "Events",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Event Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Short Summary",
      type: "text",
      rows: 3,
      validation: (Rule: any) => Rule.max(220),
    }),
    defineField({
      name: "description",
      title: "Full Description",
      type: "text",
      rows: 8,
    }),
    defineField({
      name: "image",
      title: "Event Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "startDate",
      title: "Start Date & Time",
      type: "datetime",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date & Time",
      type: "datetime",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "instructor",
      title: "Instructor / Host",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
    }),
    defineField({
      name: "capacity",
      title: "Capacity",
      type: "number",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "bookingUrl",
      title: "Booking URL",
      type: "url",
      initialValue:
        "https://studiobookingonline.com/heypilatesstudiokla/classes.html",
    }),
    defineField({
      name: "featured",
      title: "Featured Event",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isPublished",
      title: "Published",
      type: "boolean",
      initialValue: true,
    }),
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
      media?: ReactNode;
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
});
