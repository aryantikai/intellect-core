# Core Parse — technical demo

A standalone **product-landing-page demo** living under `technical/demo/`, separate from the
main Intellect Core marketing site at the repo root.

## Wat is dit?

Een moderne SaaS-stijl productpagina voor **Core Parse** — een Intellect Core-product­concept
voor **AI document data-extractie**: ruwe documenten erin, schone gestructureerde data eruit.

Het combineert:

- **Het product** — document parsing & data-extractie, gepresenteerd als een echte SaaS:
  hero, live-demo, how-it-works, built-for-production features, integraties, web-app vs. API,
  ROI-calculator, security en FAQ.
- **Intellect Core's eigen werk** — de use cases en copy zijn gebaseerd op echte IC-projecten
  uit `../../Solutions/`: bank-/factuurautomatisering, Contract Metadata Extractor, Smart
  Document Library en AI e-mailautomatisering.
- **Intellect Core's huisstijl** — hergebruikt het volledige design-system van de hoofdsite
  (blauw/cyaan, Sora + Inter, het neural-core logo, donker/licht-thema).

> Alle teksten, cijfers en het voorbeelddocument zijn origineel/illustratief voor deze demo.

## Bestanden

| Bestand | Wat |
|---|---|
| `index.html` | De volledige one-page site (HTML + CSS + JS in één bestand, geen build-stap). |

## Lokaal bekijken

De repo heeft al een statische server-config in `.claude/launch.json` (poort 8123):

```bash
# vanuit de repo-root
python -m http.server 8123
```

Open daarna **http://localhost:8123/technical/demo/**

## Interactieve onderdelen (allemaal client-side, geen backend)

- **Live extraction demo** — knop "Run extraction" scant het voorbeelddocument en vult de
  JSON-velden één voor één met confidence-scores. Niets wordt geüpload.
- **ROI-calculator** — sliders + presets (Small team / Growing ops / Enterprise) berekenen
  bespaarde uren en kosten.
- **FAQ-accordion**, donker/licht-thema (deelt de `ic-theme`-voorkeur met de hoofdsite),
  mobiel menu, scroll-reveals en tellers.

## Let op

Dit is een **demo/concept**: het API-voorbeeld (`api.intellectcore.com`), cijfers en het
voorbeelddocument zijn illustratief. De pagina staat op `noindex` zodat hij niet door
zoekmachines wordt opgepikt. "Book a demo" linkt door naar het contactformulier van de
hoofdsite.
