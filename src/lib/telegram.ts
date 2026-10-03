const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? "";
const CHAT_ID = process.env.TELEGRAM_CHAT_ID ?? "";

export type TelegramDelivery =
  | { status: "sent" }
  | { status: "not_configured" }
  | { status: "failed"; detail?: string };

export const isTelegramConfigured = (): boolean =>
  Boolean(BOT_TOKEN && CHAT_ID);

export const sendTelegramMessage = async (
  text: string,
): Promise<TelegramDelivery> => {
  if (!isTelegramConfigured()) {
    console.warn("Telegram not configured: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID missing");
    return { status: "not_configured" };
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("Telegram send failed:", res.status, detail.slice(0, 300));
      return { status: "failed", detail: detail.slice(0, 200) || `HTTP ${res.status}` };
    }
    return { status: "sent" };
  } catch (err) {
    return {
      status: "failed",
      detail: err instanceof Error ? err.message : "network error",
    };
  }
};
