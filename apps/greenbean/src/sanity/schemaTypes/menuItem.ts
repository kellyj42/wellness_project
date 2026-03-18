import { defineField, defineType } from "sanity";

export const menuItem = defineType({
  name: "menuItem",
  title: "Menu Item",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Breakfast", value: "Breakfast" },
          { title: "Breakfast Bowls", value: "Breakfast Bowls" },
          { title: "Toast", value: "Toast" },
          { title: "Crepes", value: "Crepes" },
          { title: "Wraps", value: "Wraps" },
          { title: "Sandwiches", value: "Sandwiches" },
          { title: "Pastas", value: "Pastas" },
          { title: "Salad Bowls", value: "Salad Bowls" },
          { title: "Mexican Corner", value: "Mexican Corner" },
          { title: "Burgers", value: "Burgers" },
          { title: "Fries", value: "Fries" },
          { title: "Desserts", value: "Desserts" },
          { title: "Smoothies", value: "Smoothies" },
          { title: "Protein Shakes", value: "Protein Shakes" },
          { title: "Juices", value: "Juices" },
          { title: "Coffee", value: "Coffee" },
          { title: "Tea", value: "Tea" },
          { title: "Milk Shakes", value: "Milk Shakes" },
          { title: "Soft Drinks", value: "Soft Drinks" },
          { title: "Specials", value: "Specials" },
          { title: "Extras", value: "Extras" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "price",
      title: "Price (UGX)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),

    defineField({
      name: "allowExtraGrilledChicken",
      title: "Allow Extra Grilled Chicken",
      type: "boolean",
      description:
        "Enable this if customers can add grilled chicken to this item for an extra UGX 5,000.",
      initialValue: false,
    }),

    defineField({
      name: "enableCustomBowlBuilder",
      title: "Enable Custom Bowl Builder",
      type: "boolean",
      description:
        "Use this only on the standalone Salad Bowls dish named Make Your Own Bowl so customers can build their own salad. Do not enable it on the regular salad dishes.",
      initialValue: false,
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.category === "Extras") {
            return true;
          }

          if (!value || value.trim().length === 0) {
            return "Description is required";
          }

          if (value.length > 250) {
            return "Description must be 250 characters or fewer";
          }

          return true;
        }),
    }),

    defineField({
      name: "tag",
      title: "Tag (Short Label)",
      type: "string",
      description: "Example: Best Seller or Chef Pick",
    }),

    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "featured",
      title: "Featured Item",
      type: "boolean",
      description: "Highlight this item on homepage or specials section",
      initialValue: false,
    }),

    defineField({
      name: "available",
      title: "Available",
      type: "boolean",
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "image",
    },
  },
});