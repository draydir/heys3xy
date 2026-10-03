# heys3xy · #7399

Minimal Next.js page: giant `#7399`, S3XY grid logo, [tweakcn Vercel theme](https://tweakcn.com/editor/theme?theme=vercel), contact form.

## Contact env (Vercel)

Set on project **heys3xy**:

| Variable | Purpose |
|----------|---------|
| `POSTMARK_TOKEN` | Postmark server token |
| `FROM_EMAIL` | `form@heys3xy.com` (verified Postmark sender) |
| `CONTACT_TO_EMAIL` | `info@heys3xy.com` (inbox for form submissions) |
| `NOTIFY_API_SECRET` | Bearer secret for [personal-telegram](https://github.com/draydir/personal-telegram) `/api/notify` (@velocity_thinking_bot) |
| `PERSONAL_TELEGRAM_NOTIFY_URL` | Optional; defaults to `https://personal-telegram.vercel.app/api/notify` |
| `NEXT_PUBLIC_SITE_URL` | Optional; default `https://heys3xy.com` |

Postmark REST on submit; Telegram via personal-telegram hub (`NOTIFY_API_SECRET`), not a bot token on this project.

## Develop

```bash
pnpm install
pnpm dev
```
