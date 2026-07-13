import { ImageResponse } from "next/og";

// Dedicated 1200x630 OG card — the old fallback was the 100x100 logo, which
// rendered as a blurry thumbnail on LinkedIn/WhatsApp/X shares.
export const runtime = "edge";
export const alt = "Adspire Digital — web agencija Niš: sajtovi, aplikacije i AI automatizacija";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
          backgroundColor: "#05060a",
          backgroundImage:
            "radial-gradient(900px 500px at 82% 0%, rgba(47,107,255,0.28), transparent 65%), radial-gradient(700px 420px at 0% 100%, rgba(47,107,255,0.14), transparent 60%)",
          color: "#f2f1ec",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 9999,
              backgroundColor: "#2f6bff",
            }}
          />
          <div style={{ fontSize: 30, letterSpacing: 6, color: "#8a8fa0" }}>
            WEB AGENCIJA · NIŠ, SRBIJA
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 118, fontWeight: 800, letterSpacing: -3 }}>
            ADSPIRE<span style={{ color: "#2f6bff" }}>.</span>
          </div>
          <div style={{ display: "flex", fontSize: 40, color: "#c9cbd4", maxWidth: 900, lineHeight: 1.3 }}>
            Sajtovi koji dovode klijente, aplikacije koje štede vreme i AI automatizacija.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(242,241,236,0.16)",
            paddingTop: 32,
            fontSize: 30,
          }}
        >
          <div style={{ display: "flex", color: "#f2f1ec" }}>adspire.rs</div>
          <div style={{ display: "flex", color: "#2f6bff" }}>Web · Aplikacije · E-commerce · AI</div>
        </div>
      </div>
    ),
    size,
  );
}
