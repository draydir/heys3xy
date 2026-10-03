import { NextResponse } from "next/server";

import { contactSchema } from "@/lib/contact-schema";
import { isPostmarkConfigured, sendContactEmail } from "@/lib/postmark";
import { isTelegramConfigured, sendTelegramMessage } from "@/lib/telegram";

export const runtime = "nodejs";

export const POST = async (request: Request) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, message } = parsed.data;

  if (!isPostmarkConfigured() && !isTelegramConfigured()) {
    return NextResponse.json(
      {
        error: "Messaging is not configured yet. Add Postmark and/or Telegram env vars on Vercel.",
      },
      { status: 503 },
    );
  }

  const telegramText = [
    "📬 #7399 contact",
    "",
    `From: ${name} <${email}>`,
    "",
    message,
  ].join("\n");

  const [emailOk, telegram] = await Promise.all([
    isPostmarkConfigured() ? sendContactEmail({ fromName: name, fromEmail: email, message }) : Promise.resolve(true),
    isTelegramConfigured() ? sendTelegramMessage(telegramText) : Promise.resolve({ status: "not_configured" as const }),
  ]);

  const telegramOk =
    telegram.status === "sent" || telegram.status === "not_configured";

  if (!emailOk && !telegramOk) {
    return NextResponse.json({ error: "Could not deliver message" }, { status: 502 });
  }

  if (!emailOk && telegram.status === "sent") {
    return NextResponse.json({
      ok: true,
      warning: "Delivered via Telegram only (Postmark failed).",
    });
  }

  return NextResponse.json({ ok: true });
};
