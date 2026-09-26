# Grimoire feedback

Standalone GitHub Pages site. Both `/` and `/feedback/` render the feedback page, including under a repository subpath. No dependencies or server-side code.

Run `npm run build`, then `npm run preview`. Publish only `dist/`. The included GitHub Actions workflow deploys pushes to `main`; select **GitHub Actions** in the repository's Settings → Pages.

## Connect Fillout

1. Create a blank form called **Grimoire feedback**.
2. Add required fields: **Feedback type** (Something broke / Something is confusing / An idea / General feedback), **A short summary**, and **Tell us a little more** (long answer).
3. Add optional **Email** with help text: “Only if you’d like a reply.”
4. Add this introduction: “Help shape Grimoire. Please use made-up examples instead of private dream entries. Never share recovery codes. Fillout processes your submission, and the Grimoire team reviews it.”
5. Publish and copy the public share link. Set `filloutURL` in `config.json`, or set the repository Actions variable `FILLOUT_URL`, then run the deployment workflow again.
6. If wanted, connect Trello inside Fillout under Integrate → Trello. Select the Grimoire beta board and Inbox list; map the summary into the card title and type, message, and optional email into its description. Verify board visibility in Trello. [Fillout's Trello integration](https://www.fillout.com/integrations/trello).
7. Verify a real submission reaches the intended destination. No submission is sent by the build or page checks.

Until configured, the page offers a native email preparation form with review and copy actions. It never claims delivery. The email recipient matches the existing Grimoire beta inbox; the subject and report identify Grimoire. With Fillout configured, the embed and direct link replace the email form; the email address stays available as fallback, including without JavaScript.

## App handoff

Use the deployed `/feedback/` URL for both apps. Optional context parameters: `source=ios` or `source=android`, `app_version`, `ios_version`, `android_version`. Only numeric dotted versions are forwarded to Fillout; arbitrary incoming parameters are dropped. Language is `en`. Register these URL parameters in Fillout if you want them captured. They are unverified user-editable context. Never put journal text, recovery codes, email addresses, or account identifiers in URLs.

Both native apps link to the hosted feedback page. Settings also links to `/privacy/`, which renders without JavaScript or a Fillout embed. The form is English only. Drafts are not persisted. The site bundles the app's Cormorant Garamond font and its OFL license. GitHub Pages hosts the page; there is no site analytics SDK.

Deployment follows [GitHub's Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Privacy policy

`privacy/index.html` describes local storage, optional provider sync, backups and exports, feedback services, website hosting, beta diagnostics, retention and deletion choices. Keep it aligned with app and service changes; its public URL is https://yarynamashta.github.io/grimoire-site/privacy/.
