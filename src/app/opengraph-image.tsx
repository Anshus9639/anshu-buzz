import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt =
  "Anshu Saini — Entry-Level Applied AI and Generative AI Engineer. Engineering what’s next.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          padding: "56px 64px",
          backgroundColor: "#080808",
          color: "#f4f4f4",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -130,
            top: 80,
            width: 500,
            height: 500,
            borderRadius: "50%",
            backgroundImage:
              "linear-gradient(145deg, #f4f4f4 0%, #8a8a8a 14%, #151515 50%, #080808 63%, #6a6a6a 84%, #ededed 100%)",
            boxShadow: "inset -40px -50px 90px rgba(0,0,0,0.85)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 30,
            top: 42,
            width: 545,
            height: 545,
            borderRadius: "50%",
            border: "1px solid #252525",
            display: "flex",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "monospace",
              fontSize: 16,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#858585",
            }}
          >
            <div style={{ display: "flex" }}>{profile.brand}</div>
            <div style={{ display: "flex" }}>Portfolio / 2026</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 92,
                lineHeight: 0.92,
                letterSpacing: -5,
                fontWeight: 500,
              }}
            >
              ENGINEERING
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 92,
                lineHeight: 0.92,
                letterSpacing: -5,
                fontWeight: 500,
              }}
            >
              WHAT’S NEXT.
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 30,
                fontFamily: "monospace",
                fontSize: 16,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#858585",
              }}
            >
              {profile.role}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid #252525",
              paddingTop: 22,
              fontFamily: "monospace",
              fontSize: 15,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#858585",
            }}
          >
            <div style={{ display: "flex" }}>{profile.domain}</div>
            <div style={{ display: "flex" }}>{profile.availability.label}</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
