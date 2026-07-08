# Intellect Core — "Fable" website

A conversion-first, single-file marketing site for Intellect Core. Fully static —
no build step, no dependencies. Open `index.html` in a browser or host the folder
on any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages).

## What's in here

| File | Purpose |
|---|---|
| `index.html` | The entire site: markup, styles and scripts in one file |
| `favicon.svg` | Brand mark (browser tab) |
| `logo.svg` | Full logo (mark + wordmark) |
| `technical/demo/` | Core Parse product demo (the "technical" site), linked from the nav, demo section and footer |

## The sales logic of the page (top to bottom)

1. **Hero** — brand promise + animated neural-network canvas + live stats (hours saved, accuracy, days to live).
2. **Services marquee** — one continuous scrolling line of all six services, right under the hero.
3. **Before / after** — the pain, made concrete.
4. **Live demo simulator** — Core Parse "runs" on a bank statement, invoice or inbox. Proof, not promises. Links out to the full Core Parse demo in `technical/demo/`.
5. **Services** — six offerings, one line each (each card has an anchor, targeted from the nav's Services mega-dropdown).
6. **ROI calculator** — the visitor prices their own pain; automation savings shown live.
7. **Tool stack** — the technology behind the solutions (AI models, automation, data, cloud, dev, security). We sell solutions, not client names — no customer brands appear anywhere on the site.
8. **About** — mission & vision.
9. **Process** — free quickscan → build in weeks → own it. Risk removed.
10. **AI gap chart** — the cost of standing still (McKinsey/PwC-sourced stats).
11. **Pricing** — wedge offer ($350 bank automation) + Starter / Growth / Enterprise.
12. **FAQ** — the six objections from the sales kit, answered.
13. **CTA band** — "Your business, supercharged by AI" → straight into the contact form.
14. **Contact** — one CTA everywhere: *the free quickscan*.

The header has a **Services mega-dropdown** (hover on desktop, always expanded in the
mobile menu) whose footer link opens the full Core Parse demo (`technical/demo/index.html`).

## Language toggle (EN / NL)

The site is bilingual. English is the default; the **NL/EN button in the header**
switches every string on the page (including the typewriter words, demo status
lines, form placeholders and the CSS "Most popular" badge). The choice is stored
under the `ic-lang` localStorage key. Translations live in one `NL` dictionary at
the top of the script block, keyed by the `data-i18n` attributes in the markup —
to change copy, edit the English text in the HTML *and* the matching key there.

## Before going live — 3 TODOs (search for "TODO" in index.html)

1. **Web3Forms key** — replace `REPLACE_WITH_YOUR_WEB3FORMS_ACCESS_KEY` in the
   contact form (free key at web3forms.com) or the form won't deliver.
2. **WhatsApp number** — replace `597000000` in the `wa.me` link with the real
   number (country code, no `+`).
3. **Domain** — replace `https://intellectcore.com` in the canonical/OG/JSON-LD
   tags with the real domain.

## Notes

- Dark/light theme toggle stores its choice under the `ic-theme` key, shared
  with the main site so the preference carries across.
- All animations respect `prefers-reduced-motion`.
- The palette, fonts (Sora + Inter) and logo match the existing brand exactly.
