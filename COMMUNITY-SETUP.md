# CFMI Community Setup (one-time)

The website is a static GitHub Pages site. Account sign-up, private email authentication, and shared prayer/testimony posts require a hosted database/auth service. This package uses Supabase; the community page is ready to connect, but it will remain disabled until CFMI configures its own project.

## 1. Create the free Supabase project
1. Create a project at https://supabase.com/.
2. In Project Settings → API, copy the Project URL and the public `anon` key (not the `service_role` key).
3. Edit `supabase-config.js` and replace `YOUR-PROJECT` and `YOUR_SUPABASE_ANON_KEY` with those values. These are public browser settings; **never** paste a service-role/secret key into this website.

## 2. Create the tables securely
1. Open Supabase → SQL Editor.
2. Paste and run the contents of `supabase-community-schema.sql`.
3. If you want to retain the older testimonies-only page, also keep its existing `supabase-testimonies-schema.sql` as-is; the new Community page uses the `community_profiles` and `community_posts` tables.

## 3. Configure authentication
In Supabase → Authentication → URL Configuration, add your GitHub Pages site URL to Site URL and Redirect URLs. Enable email confirmation if desired. Use a strong password policy and enable CAPTCHA/rate-limiting options if available in your project.

## 4. Moderation
Every new prayer request and testimony starts as `pending`. The public can only read posts whose status is `published`. A church moderator reviews posts in Supabase Table Editor and changes `status` to `published` or `rejected`. Do not publish sensitive personal information or private requests without permission. The database intentionally does not expose account email addresses in community post queries.

## 5. Live stream behaviour and limits
The homepage's YouTube live-stream embed is tied to CFMI's channel ID and can display the channel's current live stream automatically when YouTube makes it available. The new controls only navigate between platforms, refresh the embedded player, and open the player full-screen; they do not start or stop a broadcast.

Facebook does not provide a dependable universal page URL that always resolves to the current live video for an unauthenticated static website. To automatically embed each Facebook broadcast, the church must provide the public live-video URL for that session or implement a Facebook Graph API integration through a secure server with the appropriate Meta app permissions/access token. Do not place a private Meta token in GitHub Pages. The page includes a Facebook destination/link as a reliable fallback.

## 6. Publish
Upload the extracted ZIP contents into the repository root, keeping `index.html`, `community.html`, `supabase-config.js`, SQL setup files and the `assets` folder at their expected relative paths. The community functions cannot be tested end-to-end until the Supabase setup is completed.
