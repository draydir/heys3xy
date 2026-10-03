import { Mail, MessageSquareText, Phone } from "lucide-react";

import { BRAND_ICONS } from "@/lib/brand-icons";
import type { ContactMethod } from "@/lib/contact-methods";
import { cn } from "@/lib/utils";

interface ContactMethodIconProps {
  method: ContactMethod;
  className?: string;
}

export const ContactMethodIcon = ({ method, className }: ContactMethodIconProps) => {
  const iconClass = cn("size-5 shrink-0", className);

  switch (method) {
    case "email":
      return <Mail className={iconClass} aria-hidden />;
    case "sms":
      return <MessageSquareText className={iconClass} aria-hidden />;
    case "phone":
      return <Phone className={iconClass} aria-hidden />;
    case "whatsapp":
    case "telegram":
    case "signal":
    case "imessage":
    case "viber":
    case "instagram":
    case "messenger":
    case "x":
    case "discord":
    case "line":
    case "wechat":
      return (
        <svg viewBox="0 0 24 24" className={cn(iconClass, "fill-current")} aria-hidden>
          <path d={BRAND_ICONS[method].path} />
        </svg>
      );
    default: {
      const exhaustive: never = method;
      return exhaustive;
    }
  }
};

/** Brand tint for the selected tile; monochrome marks (X, generic icons) follow the text color. */
export const methodAccent = (method: ContactMethod): string | undefined => {
  switch (method) {
    case "email":
    case "sms":
    case "phone":
    case "x":
      return undefined;
    case "whatsapp":
    case "telegram":
    case "signal":
    case "imessage":
    case "viber":
    case "instagram":
    case "messenger":
    case "discord":
    case "line":
    case "wechat":
      return BRAND_ICONS[method].hex;
    default: {
      const exhaustive: never = method;
      return exhaustive;
    }
  }
};
