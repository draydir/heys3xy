const NOTIFY_URL =
  process.env.PERSONAL_TELEGRAM_NOTIFY_URL?.trim() ??
  "https://personal-telegram.vercel.app/api/notify";
const NOTIFY_SECRET = process.env.NOTIFY_API_SECRET?.trim() ?? "";

export type PersonalNotifyResult =
  | { status: "sent" }
  | { status: "not_configured" }
  | { status: "failed"; detail?: string };

export const isPersonalTelegramNotifyConfigured = (): boolean =>
  Boolean(NOTIFY_SECRET);

export const sendPersonalTelegramNotify = async (
  text: string,
  source = "heys3xy",
): Promise<PersonalNotifyResult> => {
  if (!NOTIFY_SECRET) {
    return { status: "not_configured" };
  }

  try {
    const res = await fetch(NOTIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${NOTIFY_SECRET}`,
      },
      body: JSON.stringify({ text, source }),
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { status: "failed", detail: body.slice(0, 200) || `HTTP ${res.status}` };
    }

    return { status: "sent" };
  } catch (err) {
    return {
      status: "failed",
      detail: err instanceof Error ? err.message : "network error",
    };
  }
};
