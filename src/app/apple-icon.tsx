import { renderS3xyIcon } from "@/lib/s3xy-icon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return renderS3xyIcon(size.width);
}
