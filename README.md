# Nhlanhla Mtambo Portfolio

Static personal portfolio built with HTML5, CSS3, vanilla JavaScript, and Bootstrap 5.3.3. Open `index.html` in a browser, or deploy this folder to GitHub Pages, Netlify, or any static hosting service. No build step or package installation is required.

## GitHub Pages deployment

Repository: https://github.com/nhlanhlamtambo2000/nhlanhlamtamboportflio.github.io

Expected website URL: https://nhlanhlamtambo2000.github.io/nhlanhlamtamboportflio.github.io/

After uploading the site, open the repository's **Settings > Pages**. Under **Build and deployment**, select **Deploy from a branch**, choose **main** and **/ (root)**, and save. GitHub will publish the URL after its Pages deployment finishes.

The repository name makes this a project site, not the account-root site. Relative asset URLs work at this project path. `.nojekyll` disables unnecessary Jekyll processing, and `.gitignore` excludes local editor settings. The repository and deployed assets are public, including the portrait and downloadable CV.

## Factual source

Portfolio content was originally based on `Nhlanhla_Mtambo_Modern_CV.docx`. The current CV is available for download as a PDF under `assets/Nhlanhla_Mtambo_CV.pdf`. Only the city and province are displayed; the phone number is deliberately omitted from the webpage.

The interests in playing rugby and gaming were supplied directly by Nhlanhla and are represented with Bootstrap Icons.

The three work cards are explicitly labeled experience-based highlights, not invented projects. No metrics, named projects, awards, or certifications have been inferred. Career interests in data engineering, analytics, AI, and AI agents are not presented as established expertise.

## Appearance

Space-inspired dark mode is the default, with a locally stored light-mode option. Brief summaries keep the page scannable; full employment responsibilities remain available under each role's expandable details.

The first section displays the user-provided portrait at `assets/PersonalPhoto.png`, with responsive framing and no color filters.

The decorative Earth photograph is stored in `assets/space-earth.jpg`. It is NASA's public-domain Apollo 17 Blue Marble photograph, sourced from https://commons.wikimedia.org/wiki/File:The_Earth_seen_from_Apollo_17.jpg. It is a visual backdrop, not a personal photo or project screenshot.

Previously used interest photographs are retained as unused assets; the website now displays icons instead:

- `assets/rugby.jpg`: Caroline Lena Becker, [2014 Women's Six Nations Championship - France Italy (51)](https://commons.wikimedia.org/wiki/File:2014_Women%27s_Six_Nations_Championship_-_France_Italy_(51).jpg), [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/). Resized/compressed from the original.
- `assets/gaming.jpg`: Evan-Amos, [SNES-Controller-in-Hand](https://commons.wikimedia.org/wiki/File:SNES-Controller-in-Hand.jpg), public domain.

## Complete before publishing

- Replace `[Add details]` placeholders with verified information or remove incomplete items.
- LinkedIn is connected to the profile provided by Nhlanhla. Replace the remaining GitHub placeholder buttons in the hero, contact section, and footer with your GitHub URL.
- Add approved project screenshots, names, dates, outcomes, and repository/demo links. Respect employer confidentiality.
- Update `projectDetails` in `script.js` and corresponding project cards in `index.html` together.
- Add certifications and achievements only when verified.
- Review the downloadable CV for information you want made public.
- Add your deployed canonical URL and Open Graph image when available.

## Contact behavior

The contact form validates required fields, email format, and message length. It opens an encoded `mailto:` draft in the visitor's configured email application. It does not submit, store, or claim to deliver messages. Real server-side delivery requires a separately configured form service or backend, including abuse protection and a privacy review. No credentials belong in client-side code.

## Dependencies and accessibility

Bootstrap CSS/JavaScript and Bootstrap Icons are loaded from jsDelivr; fonts are loaded from Google Fonts. Internet access is required for these resources. Self-host those dependencies if offline use or a stricter content-security policy is needed.

Includes semantic landmarks, a skip link, visible focus styles, labeled form errors, live status announcements, accessible Bootstrap dialogs and navigation, reduced-motion support, responsive layouts, and a locally persisted light/dark preference. Content remains visible if JavaScript is unavailable.
