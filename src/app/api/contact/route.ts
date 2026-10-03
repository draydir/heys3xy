import { createHash } from "node:crypto";

import { NextResponse } from "next/server";

import { CONTACT_METHOD_CONFIG, contactLinkFor, isEmail } from "@/lib/contact-methods";
import { contactSchema } from "@/lib/contact-schema";
import { isPostmarkConfigured, sendContactEmail } from "@/lib/postmark";
import {
  isPersonalTelegramNotifyConfigured,
  sendPersonalTelegramNotify,
} from "@/lib/personal-telegram-notify";
import { hitRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16_384;
const MIN_FILL_MS = 2_500;
const MAX_LINKS = 3;

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const LIMITS = [
  { scope: "ip-burst", limit: 3, windowMs: 10 * MINUTE },
  { scope: "ip-day", limit: 10, windowMs: DAY },
] as const;
const GLOBAL_LIMIT = { limit: 60, windowMs: HOUR };

const jsonError = (error: string, status: number, headers?: HeadersInit) =>
  NextResponse.json({ error }, { status, headers });

// Bots get a success response so they don't learn which check tripped.
const silentlyDrop = () => NextResponse.json({ ok: true });

const clientIp = (request: Request): string =>
  request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
  request.headers.get("x-real-ip")?.trim() ||
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  "unknown";

const isCrossOrigin = (request: Request): boolean => {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host !== request.headers.get("host");
  } catch {
    return true;
  }
};

const fingerprint = (value: string): string =>
  createHash("sha256").update(value.toLowerCase().replace(/\s+/g, " ")).digest("hex");

export const POST = async (request: Request) => {
  if (isCrossOrigin(request)) return jsonError("Forbidden", 403);

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return jsonError("Unsupported content type", 415);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) return jsonError("Payload too large", 413);

  const ip = clientIp(request);
  for (const { scope, limit, windowMs } of LIMITS) {
    const result = hitRateLimit(`${scope}:${ip}`, limit, windowMs);
    if (!result.ok) {
      return jsonError("Too many messages. Try again later.", 429, {
        "Retry-After": String(result.retryAfterSec),
      });
    }
  }
  const global = hitRateLimit("global", GLOBAL_LIMIT.limit, GLOBAL_LIMIT.windowMs);
  if (!global.ok) {
    return jsonError("Busy. Try again later.", 429, { "Retry-After": String(global.retryAfterSec) });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return jsonError("Payload too large", 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return jsonError("Invalid JSON", 400);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return NextResponse.json(
      { error: issue?.message ?? "Invalid input", field: issue?.path[0] ?? null },
      { status: 400 },
    );
  }

  const { name, method, handle, message, company, startedAt } = parsed.data;

  if (company) return silentlyDrop();
  if (!startedAt || Date.now() - startedAt < MIN_FILL_MS) return silentlyDrop();

  const linkCount = message.match(/https?:\/\/|www\./gi)?.length ?? 0;
  if (linkCount > MAX_LINKS) return jsonError("Too many links", 400);

  const duplicate = hitRateLimit(`dup:${fingerprint(message)}`, 1, DAY);
  if (!duplicate.ok) return silentlyDrop();

  if (!isPostmarkConfigured() && !isPersonalTelegramNotifyConfigured()) {
    return jsonError("Messaging is not configured yet.", 503);
  }

  const methodLabel = CONTACT_METHOD_CONFIG[method].label;
  const replyTo = isEmail(handle) ? handle : undefined;
  const link = contactLinkFor(method, handle);

  const telegramText = [
    "📬 #7399 contact",
    "",
    `From: ${name}`,
    `Reach via ${methodLabel}: ${link.display}`,
    ...(link.url ? [`Open: ${link.url}`] : []),
    "",
    message,
  ].join("\n");

  const [emailOk, telegram] = await Promise.all([
    isPostmarkConfigured()
      ? sendContactEmail({
          fromName: name,
          methodLabel,
          handle: link.display,
          url: link.url,
          replyTo,
          message,
        })
      : Promise.resolve(true),
    isPersonalTelegramNotifyConfigured()
      ? sendPersonalTelegramNotify(telegramText, "heys3xy")
      : Promise.resolve({ status: "not_configured" as const }),
  ]);

  const telegramOk = telegram.status === "sent" || telegram.status === "not_configured";

  if (!emailOk && !telegramOk) return jsonError("Could not deliver message", 502);

  return NextResponse.json({ ok: true });
};
