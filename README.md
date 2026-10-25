# CFMI Public Website — GitHub Pages

This is a static, responsive public website for Consuming Fire Ministries International.

## Important: original logo preserved
`assets/cfmi-logo.webp` is copied byte-for-byte from the uploaded original logo. The HTML uses the image as-is: no recolouring, redrawing, cropping, filtering, or editing. The anniversary artwork is also copied as supplied.

## Publish with GitHub Pages
1. Create or open your GitHub repository.
2. Upload `index.html`, `README.md`, and the entire `assets` folder to the repository root.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then save.
6. Wait for GitHub Pages to publish and open the URL shown there.

## Preview
Open `index.html` in a browser. Keep the `assets` folder beside `index.html`; the logo and anniversary artwork use relative paths.

## Notes
- This is the public static website only. A static GitHub Pages site cannot run the private database/API for member registers, finances, service management, or live projection.
- Official social media links are included. Automatic display of every new Facebook/YouTube post requires API integration in a separately hosted backend.
- Confirm public church details and event dates before publishing.


## Projector and calendar additions
- `projector.html`: browser-based service studio with preview, Bible verse slides, local image/video/audio/PDF preview where supported, service order and export.
- `events.json`: editable public calendar event list (edit this file and the calendar script in `index.html` when adding events).
- `calendar.ics`: sample calendar subscription/download file; update it when event dates change.

### Important capability notes
- This is a static GitHub Pages package. It has no shared server database or user authentication.
- Local browser storage is device-specific. Export service plans for backup.
- PowerPoint (`.ppt`/`.pptx`) files are detected and listed but not rendered slide-by-slide in the browser. For reliable projection, open them in Microsoft PowerPoint or export to PDF/images.
- Full-screen projection is browser full-screen, not a native Windows projector/PowerPoint controller. Test on the church computer before a live service.
- Calendar dates should be verified with church leadership before publishing.


## Bible and Songs
- The Service Studio includes searchable sample Bible verses and a searchable starter hymn list.
- Add custom Bible references and verse text, and add song titles and lyrics to the service order.
- The included Bible data is only a small starter set, not a complete Bible. Full Bible search requires importing a translation that the church is authorised to use.
- Song lyrics should be supplied by the church or used under the relevant copyright/licensing permissions. The starter hymn examples are traditional/public-domain hymn text excerpts.
- This static starter does not sync a shared library between devices; entries added interactively are held for the current browser session.


## Full offline Bible versions
The projector now includes an offline Bible version selector for KJV, Amplified (AMP), and Easy-to-Read Version (ERV), plus a local import manager. Import a complete Bible file in JSON, TXT (`Reference | verse text` per line), or CSV (`reference,text`) format. Imported verses are stored in the browser's IndexedDB and remain available offline on that device.

The ZIP does not bundle complete Amplified or ERV texts because those translations are copyrighted and redistribution requires permission. The initial KJV search list is a sample until a complete public-domain KJV file is imported. Use a complete KJV JSON corpus from a source whose terms permit your intended use, and obtain authorised AMP/ERV files from the rights holders or a licensed provider. Data imported on one device does not automatically sync to other devices.


## Projector Studio: included presentation decks
The Projector page now includes a Ready-to-project church slides library with these supplied presentations converted to PDF: Do Something New in My Life; Jesus at the Centre; Musandipfuure Jesu; My God Is Awesome; Ngatimukudze Mwari; Praise and Worship; Sunday Message – August 9; Withholding Nothing; You Are All That Matters; and You Are Yahweh. Select **Add to service**, then **Preview** or **Open full-screen projection**. PDF navigation is handled by the browser's PDF viewer.

## Bible text availability
The projector includes Bible search/import tools and links to KJV, AMP, and ERV online reference pages. Complete KJV text can be imported from a public-domain source file. Complete AMP and ERV text is not bundled because those translations are copyrighted; import them only if CFMI has permission or a licence for the intended use. Online links require internet access; locally imported text is stored in that browser on that device. This GitHub Pages site has no shared server database, so imports do not automatically sync to other devices.

## Projector Studio features
- Song library search and custom song entry, plus a service-order playlist.
- Bible verse entry/search and import of a Bible dataset; complete texts must be imported/downloaded separately and only from authorised/public-domain sources.
- Announcement slides, 30 built-in offline gradient backgrounds, and a custom background image.
- Local media upload for images, PDFs, video and audio; PowerPoint files should be converted to PDF for reliable browser projection.
- Ten supplied CFMI PowerPoint presentations are also included as PDF decks in `assets/slides/`.
- Separate live-output page (`output.html`) can be opened from Projector Studio. Keep the control panel on the laptop and move the live-output window to the projector using the operating system's extended-display mode.
- Countdown timer, black-screen control, keyboard navigation, service plan import/export, and local browser saving.

The site is static and does not provide cloud sync or multi-device control. Browser storage is local to the browser/origin. Uploaded local media should be reselected after a reload unless you keep it in the same session. Test the entire service on the actual projector before the congregation arrives.


## Link repair and validation (21 October 2026)

- Restored `assets/cfmi-logo-short.png` from the supplied CFMI logo file without altering the image.
- Restored `assets/cfmi-12th-anniversary.webp` from the supplied anniversary artwork.
- Added `events.json` and `calendar.ics`, both referenced by the public site.
- Checked local `href`/`src` references in `index.html`, `projector.html`, and `output.html`; no unresolved local references were found.
- Checked inline JavaScript syntax for those three pages with Node.js.

This is a static GitHub Pages application. Browser syntax and local-link checks do not substitute for testing the deployed website, projector hardware, browser media codecs, or a live Teams meeting. Uploaded media and service data have browser/device-specific limitations.


## Branches
- Old Highfield Assembly — Pastor & Mrs V. Mutana (photo in `assets/old-highfield-pastors-mutana.webp`).
- Harare City Assembly — marked Coming Soon.


## New website features (October 2026)
- Homepage scrolling announcement ticker and teaching category filters.
- Teaching library category filters for Salvation, Deliverance, Faith, Bible Studies, Gospel, Theology, Discipleship, Spiritual Growth, Marriage and Family, Leadership, Worship, Prayer, Love, Giving, Revival, Youths, Victory, Breakthroughs and Testimonies.
- Testimonies page (`testimonies.html`) includes Supabase email/password sign-in, submission, and published testimony display. It is intentionally disabled until a church administrator configures the Supabase project URL/public anon key in `supabase-config.js` and runs `supabase-testimonies-schema.sql`. Submissions default to pending for moderation. Never place a Supabase service-role key in this public site.
- Projector background selection is now in the preview workspace. It supports built-in offline motion gradients, custom image backgrounds, and custom MP4/WebM/OGG motion-video backgrounds. Built-in motion effects are original CSS designs; the project does not redistribute third-party videos.
