import { defineField, defineType } from "sanity";

export const menuItem = defineType({
  name: "menuItem",
  title: "Menu Item",
  type: "document",

  fields: [
    // ===============================
    // BASIC INFORMATION
    // ===============================
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
          { title: "Wraps", value: "Wraps" },
          { title: "Sandwiches", value: "Sandwiches" },
          { title: "Pasta & Quinotto", value: "Pasta & Quinotto" },
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
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(250),
    }),

    // ===============================
    // OPTIONAL DISPLAY FIELDS
    // ===============================
    defineField({
      name: "tag",
      title: "Tag (Short Label)",
      type: "string",
      description: "Example: High Protein, Vegan, Gluten Free",
    }),

    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "icon",
      title: "Icon (Lucide Mapping)",
      type: "string",
      options: {
        list: [
          { title: "Coffee", value: "Coffee" },
          { title: "Beef", value: "Beef" },
          { title: "Apple", value: "Apple" },
          { title: "Sun", value: "Sun" },
          { title: "Leaf", value: "Leaf" },
        ],
      },
      description: "Used to map to Lucide icons in the frontend.",
    }),

    // ===============================
    // DIETARY FLAGS
    // ===============================
    defineField({
      name: "dietary",
      title: "Dietary Labels",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Vegetarian", value: "Vegetarian" },
          { title: "Vegan", value: "Vegan" },
          { title: "Gluten Free", value: "Gluten Free" },
          { title: "Contains Nuts", value: "Contains Nuts" },
          { title: "High Protein", value: "High Protein" },
        ],
      },
    }),

    // ===============================
    // FEATURED / SPECIAL DISPLAY
    // ===============================
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
