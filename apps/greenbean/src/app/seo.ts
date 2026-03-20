export const siteConfig = {
  name: "Green Bean",
  shortName: "Green Bean",
  title: "Green Bean | Healthy Meal Plans & Nutrition Coaching Kampala",
  description:
    "Green Bean helps you eat well with healthy meal plans, nutrition coaching, and wellness programs in Kampala.",
  domain: process.env.NEXT_PUBLIC_SITE_URL || "https://green-beanug.com",
  keywords: [
    "Green Bean",
    "meal plans Kampala",
    "healthy meals Uganda",
    "nutrition coaching Kampala",
    "weight loss meal plan",
    "wellness programs",
    "healthy food delivery Kampala",
  ] as string[],
} as const;

export const defaultOgImage = `${siteConfig.domain}/opengraph-image`;
