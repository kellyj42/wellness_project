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
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "linear-gradient(135deg, #2E2A26 0%, #5B544D 100%)",
        color: "#F5F3EE",
        padding: "56px",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
          fontSize: 28,
          color: "#A3AD5F",
          fontWeight: 600,
        }}
      >
        <img
          src={logoUrl}
          alt="Green Bean logo"
          width="88"
          height="88"
          style={{
            borderRadius: "9999px",
            objectFit: "cover",
            backgroundColor: "#F5F3EE",
          }}
        />
        GREEN BEAN
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <div style={{ fontSize: 68, lineHeight: 1.05, fontWeight: 700 }}>
          Healthy Meal Plans
          <br />& Nutrition Coaching
        </div>
        <div style={{ fontSize: 32, color: "#CFCBC4" }}>Kampala, Uganda</div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 24,
          color: "#CFCBC4",
        }}
      >
        <div>Meal Plans | Programs | Coaching</div>
        <div style={{ color: "#FFC244", fontWeight: 700 }}>green-beanug.com</div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
