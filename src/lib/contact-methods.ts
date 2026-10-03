export const CONTACT_METHODS = [
  "email",
  "whatsapp",
  "telegram",
  "signal",
  "imessage",
  "sms",
  "phone",
  "viber",
  "instagram",
  "messenger",
  "x",
  "discord",
  "line",
  "wechat",
] as const;

export type ContactMethod = (typeof CONTACT_METHODS)[number];

export type HandleKind = "email" | "phone" | "username" | "phoneOrUsername" | "phoneOrEmail";

interface ContactMethodConfig {
  label: string;
  kind: HandleKind;
  fieldLabel: string;
  placeholder: string;
  hint?: string;
  username?: RegExp;
}

export const CONTACT_METHOD_CONFIG: Record<ContactMethod, ContactMethodConfig> = {
  email: { label: "Email", kind: "email", fieldLabel: "Email", placeholder: "you@domain.com" },
  whatsapp: {
    label: "WhatsApp",
    kind: "phone",
    fieldLabel: "WhatsApp number",
    placeholder: "+1 555 123 4567",
    hint: "With country code",
  },
  telegram: {
    label: "Telegram",
    kind: "username",
    fieldLabel: "Telegram username",
    placeholder: "@username",
    username: /^@?[A-Za-z0-9_]{5,32}$/,
  },
  signal: {
    label: "Signal",
    kind: "phoneOrUsername",
    fieldLabel: "Signal number or username",
    placeholder: "+1 555 123 4567 or name.01",
    username: /^@?[A-Za-z0-9_.]{3,40}$/,
  },
  imessage: {
    label: "iMessage",
    kind: "phoneOrEmail",
    fieldLabel: "iMessage number or Apple ID",
    placeholder: "+1 555 123 4567",
  },
  sms: {
    label: "SMS",
    kind: "phone",
    fieldLabel: "Mobile number",
    placeholder: "+1 555 123 4567",
    hint: "With country code",
  },
  phone: {
    label: "Call",
    kind: "phone",
    fieldLabel: "Telephone",
    placeholder: "+1 555 123 4567",
    hint: "With country code",
  },
  viber: {
    label: "Viber",
    kind: "phone",
    fieldLabel: "Viber number",
    placeholder: "+1 555 123 4567",
    hint: "With country code",
  },
  instagram: {
    label: "Instagram",
    kind: "username",
    fieldLabel: "Instagram handle",
    placeholder: "@handle",
    username: /^@?[A-Za-z0-9._]{1,30}$/,
  },
  messenger: {
    label: "Messenger",
    kind: "username",
    fieldLabel: "Messenger username or profile link",
    placeholder: "m.me/username",
    username: /^[A-Za-z0-9._\-/:@]{2,120}$/,
  },
  x: {
    label: "X",
    kind: "username",
    fieldLabel: "X handle",
    placeholder: "@handle",
    username: /^@?[A-Za-z0-9_]{1,15}$/,
  },
  discord: {
    label: "Discord",
    kind: "username",
    fieldLabel: "Discord username",
    placeholder: "username",
    username: /^[A-Za-z0-9._]{2,32}$/,
  },
  line: {
    label: "LINE",
    kind: "username",
    fieldLabel: "LINE ID",
    placeholder: "line-id",
    username: /^@?[A-Za-z0-9._-]{4,20}$/,
  },
  wechat: {
    label: "WeChat",
    kind: "username",
    fieldLabel: "WeChat ID",
    placeholder: "wechat_id",
    username: /^[A-Za-z][A-Za-z0-9_-]{5,19}$/,
  },
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[0-9\s().-]{7,24}$/;

export const isEmail = (value: string): boolean => value.length <= 254 && EMAIL_PATTERN.test(value);

const isPhone = (value: string): boolean => {
  if (!PHONE_PATTERN.test(value)) return false;
  const digits = value.replace(/\D/g, "").length;
  return digits >= 7 && digits <= 15;
};

export const getHandleError = (method: ContactMethod, raw: string): string | null => {
  const value = raw.trim();
  const config = CONTACT_METHOD_CONFIG[method];
  if (!value) return `${config.fieldLabel} is required`;

  switch (config.kind) {
    case "email":
      return isEmail(value) ? null : "Valid email required";
    case "phone":
      return isPhone(value) ? null : "Valid phone number required";
    case "username":
      return config.username?.test(value) ? null : `Check your ${config.fieldLabel.toLowerCase()}`;
    case "phoneOrUsername":
      return isPhone(value) || config.username?.test(value)
        ? null
        : "Enter a phone number or username";
    case "phoneOrEmail":
      return isPhone(value) || isEmail(value) ? null : "Enter a phone number or Apple ID email";
    default: {
      const exhaustive: never = config.kind;
      return exhaustive;
    }
  }
};

export const inputPropsForKind = (
  kind: HandleKind,
): { type: string; inputMode: "email" | "tel" | "text"; autoComplete: string } => {
  switch (kind) {
    case "email":
      return { type: "email", inputMode: "email", autoComplete: "email" };
    case "phone":
      return { type: "tel", inputMode: "tel", autoComplete: "tel" };
    case "username":
    case "phoneOrUsername":
    case "phoneOrEmail":
      return { type: "text", inputMode: "text", autoComplete: "off" };
    default: {
      const exhaustive: never = kind;
      return exhaustive;
    }
  }
};
