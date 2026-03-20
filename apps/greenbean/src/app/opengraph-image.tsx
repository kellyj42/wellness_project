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

export default function OpenGraphImage() {
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
            "radial-gradient(circle at top left, #8C9651 0%, #6E7A3C 22%, #3B4322 58%, #25211D 100%)",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 42%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "28px",
          }}
        >
          <div
            style={{
              width: "270px",
              height: "270px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "9999px",
              background: "#F7F3EA",
              boxShadow: "0 32px 60px rgba(0,0,0,0.24)",
            }}
          >
            <img
              src={logoUrl}
              alt="Green Bean logo"
              width="190"
              height="190"
              style={{
                objectFit: "contain",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              color: "#F7F3EA",
            }}
          >
            <div
              style={{
                fontSize: 56,
                fontWeight: 700,
                letterSpacing: "-0.03em",
              }}
            >
              Green Bean
            </div>
            <div
              style={{
                fontSize: 28,
                color: "#D8D2C6",
              }}
            >
              Healthy meals, coaching, and wellness in Kampala
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
