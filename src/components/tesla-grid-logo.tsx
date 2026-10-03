import { cn } from "@/lib/utils";

interface TeslaGridLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses: Record<NonNullable<TeslaGridLogoProps["size"]>, string> = {
  sm: "text-lg gap-x-3 gap-y-0.5",
  md: "text-2xl gap-x-4 gap-y-1",
  lg: "text-4xl gap-x-6 gap-y-1.5 sm:text-5xl",
};

export const TeslaGridLogo = ({ className, size = "md" }: TeslaGridLogoProps) => {
  return (
    <div
      className={cn(
        "font-tesla grid grid-cols-2 font-semibold leading-none tracking-[0.2em] text-foreground",
        sizeClasses[size],
        className,
      )}
      aria-label="S 3 on first row, X Y on second row — Tesla model line cipher"
    >
      <span className="text-center">S</span>
      <span className="text-center">3</span>
      <span className="text-center">X</span>
      <span className="text-center">Y</span>
    </div>
  );
};
