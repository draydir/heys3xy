# heys3xy · #7399

Minimal Next.js page: giant `#7399`, S3XY grid logo, [tweakcn Vercel theme](https://tweakcn.com/editor/theme?theme=vercel), contact form.

## Contact env (Vercel)

Set on project **heys3xy**:

| Variable | Purpose |
|----------|---------|
| `POSTMARK_TOKEN` | Postmark server token |
| `FROM_EMAIL` | Verified Postmark sender |
| `CONTACT_TO_EMAIL` | Inbox for form submissions |
| `TELEGRAM_BOT_TOKEN` | Bot for new-message alerts |
| `TELEGRAM_CHAT_ID` | Chat to notify |
| `NEXT_PUBLIC_SITE_URL` | Optional; default `https://heys3xy.com` |

Pattern matches provision-admin (`src/lib/postmark.ts`, `src/lib/telegram.ts`): Postmark REST + Telegram `sendMessage`, parallel on submit.

## Develop

```bash
pnpm install
pnpm dev
```
