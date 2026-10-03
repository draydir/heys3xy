const POSTMARK_TOKEN = process.env.POSTMARK_TOKEN ?? "";
const FROM_EMAIL = process.env.FROM_EMAIL ?? "";
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "";

export const isPostmarkConfigured = (): boolean =>
  Boolean(POSTMARK_TOKEN && FROM_EMAIL && CONTACT_TO_EMAIL);

export const sendContactEmail = async (input: {
  fromName: string;
  methodLabel: string;
  handle: string;
  replyTo?: string;
  message: string;
}): Promise<boolean> => {
  if (!isPostmarkConfigured()) {
    console.error("Postmark not configured (POSTMARK_TOKEN, FROM_EMAIL, CONTACT_TO_EMAIL)");
    return false;
  }

  const subject = `#7399 · ${input.fromName.replace(/[\r\n]+/g, " ")} via ${input.methodLabel}`;
  const htmlBody = `
<p><strong>${escapeHtml(input.fromName)}</strong></p>
<p>Reach via <strong>${escapeHtml(input.methodLabel)}</strong>: ${escapeHtml(input.handle)}</p>
<p style="white-space:pre-wrap">${escapeHtml(input.message)}</p>
<p style="color:#666;font-size:12px">via heys3xy.com contact</p>`;

  try {
    const res = await fetch("https://api.postmarkapp.com/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Postmark-Server-Token": POSTMARK_TOKEN,
      },
      body: JSON.stringify({
        From: FROM_EMAIL,
        To: CONTACT_TO_EMAIL,
        ...(input.replyTo ? { ReplyTo: input.replyTo } : {}),
        Subject: subject,
        HtmlBody: htmlBody,
        MessageStream: "outbound",
      }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`Postmark error (${res.status}): ${body}`);
    }
    return res.ok;
  } catch (err) {
    console.error("Failed to send contact email:", err);
    return false;
  }
};

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
