import { renderS3xyIcon } from "@/lib/s3xy-icon";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return renderS3xyIcon(size.width);
}
