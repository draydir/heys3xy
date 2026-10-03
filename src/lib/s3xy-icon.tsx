import { ImageResponse } from "next/og";

import {
  S3XY_LOGO_PATHS,
  S3XY_LOGO_TRANSFORM,
  S3XY_LOGO_VIEWBOX,
} from "@/lib/s3xy-logo-paths";

export const renderS3xyIcon = (px: number) => {
  const logoSize = Math.round(px * 0.72);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ff0000",
        }}
      >
        <svg viewBox={S3XY_LOGO_VIEWBOX} width={logoSize} height={logoSize} fill="#ffffff">
          <g transform={S3XY_LOGO_TRANSFORM}>
            {S3XY_LOGO_PATHS.map((d) => (
              <path key={d.slice(0, 24)} d={d} />
            ))}
          </g>
        </svg>
      </div>
    ),
    { width: px, height: px },
  );
};
