import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Green Bean - Healthy Meal Plans & Nutrition Coaching";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://green-beanug.com";
const logoUrl = `${siteUrl}/18.png`;

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at top left, #6E7A3C 0%, #4A5522 28%, #2E2A26 72%, #221F1C 100%)",
          padding: "56px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: "40px",
            background: "#F6F2E9",
            boxShadow: "0 32px 80px rgba(0,0,0,0.22)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(180deg, #FBF9F3 0%, #F3EEDF 100%)",
            }}
          >
            <img
              src={logoUrl}
              alt="Green Bean logo"
              width="300"
              height="300"
              style={{
                objectFit: "contain",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              background: "#1F2326",
              color: "#F5F3EE",
              padding: "34px 40px",
            }}
          >
            <div
              style={{
                fontSize: 42,
                lineHeight: 1.18,
                fontWeight: 700,
              }}
            >
              Green Bean | Healthy Meal Plans & Nutrition Coaching in Kampala
            </div>
            <div
              style={{
                fontSize: 24,
                lineHeight: 1.4,
                color: "#CFC8BC",
              }}
            >
              Healthy meals, nutrition support, and wellness programs tailored for
              your goals.
            </div>
            <div
              style={{
                fontSize: 24,
                color: "#A3AD5F",
                fontWeight: 600,
              }}
            >
              green-beanug.com
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
