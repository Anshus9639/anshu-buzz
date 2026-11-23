import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const ogSize = {
  width: 1200,
  height: 630,
};

type OgCardOptions = {
  /** Small mono label, top right. */
  eyebrow: string;
  title: string;
  /** Small mono line under the title. */
  subtitle?: string;
};

function titleSize(title: string) {
  if (title.length > 60) return 54;
  if (title.length > 36) return 68;
  return 84;
}

/** Shared dark/minimal card that matches the home page OG image. */
export function renderOgCard({ eyebrow, title, subtitle }: OgCardOptions) {
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
            right: -170,
            top: 130,
            width: 460,
            height: 460,
            borderRadius: "50%",
            backgroundImage:
              "linear-gradient(145deg, #f4f4f4 0%, #8a8a8a 14%, #151515 50%, #080808 63%, #6a6a6a 84%, #ededed 100%)",
            boxShadow: "inset -40px -50px 90px rgba(0,0,0,0.85)",
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
            <div style={{ display: "flex" }}>{eyebrow}</div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 900,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: titleSize(title),
                lineHeight: 1.02,
                letterSpacing: -3,
                fontWeight: 500,
              }}
            >
              {title}
            </div>
            {subtitle ? (
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
                {subtitle}
              </div>
            ) : null}
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
            <div style={{ display: "flex" }}>{profile.name}</div>
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
