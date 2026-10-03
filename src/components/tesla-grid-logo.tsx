import { cn } from "@/lib/utils";
import {
  S3XY_LOGO_PATHS,
  S3XY_LOGO_TRANSFORM,
  S3XY_LOGO_VIEWBOX,
} from "@/lib/s3xy-logo-paths";

interface TeslaGridLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses: Record<NonNullable<TeslaGridLogoProps["size"]>, string> = {
  sm: "h-5",
  md: "h-8",
  lg: "h-28",
};

export const TeslaGridLogo = ({ className, size = "md" }: TeslaGridLogoProps) => {
  return (
    <svg
      viewBox={S3XY_LOGO_VIEWBOX}
      className={cn("block w-auto fill-current", sizeClasses[size], className)}
      role="img"
      aria-label="S3XY"
    >
      <g transform={S3XY_LOGO_TRANSFORM}>
        {S3XY_LOGO_PATHS.map((d) => (
          <path key={d.slice(0, 24)} d={d} />
        ))}
      </g>
    </svg>
  );
};
