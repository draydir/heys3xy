import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#fafafa",
          fontFamily: "system-ui, sans-serif",
          fontWeight: 700,
          fontSize: 42,
          letterSpacing: "0.12em",
          lineHeight: 1.05,
        }}
      >
        <div style={{ display: "flex", gap: 28 }}>
          <span>S</span>
          <span>3</span>
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          <span>X</span>
          <span>Y</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
