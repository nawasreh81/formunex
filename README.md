# FormuNex app (phone + computer, shared through Supabase)

FormuNex is an installable web app (PWA). One copy runs on Android, iPhone/iPad, Windows, Mac and Linux. Installed, it opens in its own window and keeps working offline. With Supabase connected, everyone in a company signs in with their own account and sees the same data live.

## Files
- `index.html`: the app
- `config.js`: Supabase Project URL and publishable key (already filled in). Empty values = device-only mode.
- `cloud.js`: accounts, company workspace, sync
- `supabase/schema.sql`: database tables and access rules
- `sw.js`, `manifest.webmanifest`, `icons/`, `vendor/`: offline support, app icon, Supabase client library

## One-time Supabase setup
1. **Database**: Supabase dashboard → SQL Editor → New query → paste all of `supabase/schema.sql` → Run.
2. **Auth URLs**: Authentication → URL Configuration → set **Site URL** to the address where the app is hosted, and add the same address to **Redirect URLs**. Confirmation and password-reset emails link there.
3. **Email confirmation** (Authentication → Sign In / Providers → Email): either leave "Confirm email" on, so new users click a link before their first sign-in, or turn it off for faster onboarding. Supabase's built-in mailer sends only a few emails per hour, so for a real team set up your own SMTP under Authentication → Emails.

## Put it online
Installing requires HTTPS. Any static host works:
- **Netlify Drop**: open app.netlify.com/drop and drag the `formunex-app` folder onto the page.
- **GitHub Pages** or **Cloudflare Pages**.

## First use
1. Open the link and choose **New company? Create a workspace**. You become the administrator, and the workspace starts with the sample data.
2. Under **Users**, add your team (name, email, role, temporary password). Roles: Administrator; R&D (edits everything except users); Production (views projects, production sheet and labels).

## Install on devices
- **Android (Chrome)**: tap "Install app" in FormuNex, or browser menu → Install.
- **iPhone/iPad (Safari)**: Share → Add to Home Screen.
- **Windows/Mac (Chrome or Edge)**: click "Install app" or the install icon in the address bar.

## How syncing works
- Every formula, material, test, machine, etc. is saved as its own record, so two people editing different items never overwrite each other. If two people edit the same item at the same moment, the later save wins.
- Changes are saved on the device first, then sent to Supabase. Offline, the app keeps working and sends changes when the connection returns.
- The database itself enforces access: a user only ever sees their own company's data, and Production accounts can't change data.

## Limits
- The Claude assistant and reading PDF/Word text with Claude only work when FormuNex runs on claude.ai. In the app the assistant uses its basic local mode.
- After changing any file, bump `VERSION` in `sw.js` so installed copies update.
