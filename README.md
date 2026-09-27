# OnlyMath

OnlyMath is an independent guide to math learning resources. The site helps learners choose a topic, compare resources, and find a useful next step. The design and English content are aimed primarily at US learners.

## Run locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. The default site is English. Simplified Chinese is available under `/zh-CN`. Previous locale URLs redirect to English, while `/zh-TW` redirects to `/zh-CN`; those languages need complete editorial translations before they are offered again.

## Pages

- `/`: topic-led home page
- `/branches`: math topic guides and starting sequences
- `/resources`: searchable resource directory with topic and format filters
- `/guides`: original learning paths with relevant resource recommendations
- `/tools`: working on-site and clearly labeled external tools
- `/calculator`: keyboard-accessible basic arithmetic calculator
- `/examples`: formulas with usage notes and worked examples

The Chinese pages use the same paths under `/zh-CN`. Default-locale `/en` links redirect to the canonical English paths.

## Content maintenance

Edit `src/lib/catalog.ts` and `src/lib/resource-additions.ts` to change topics and resource listings. Every resource includes a short description, the learner it suits, a limitation, format, cost category, and topic tags. Verify the destination and access terms before changing a listing. The [resource sourcing record](docs/resource-sourcing.md) lists the provider pages used for the expanded directory. Avoid unsupported ratings and claims about site features.

Interface copy is in `src/lib/site-copy.ts`. Page titles, descriptions, canonical URLs, and language alternates are in `src/lib/metadata.ts`. To add another locale, provide complete editorial copy and verify all pages before adding it to `src/config/i18n.ts` and `next-sitemap.config.js`.

## Quality checks

```bash
npm run lint
npm run build
```

After deployment, click through the home page, topic guides, filtered directory, calculator, and language switcher on the production domain. Check desktop and mobile layouts, external links, canonical tags, and the generated sitemap.

## Configuration

`NEXT_PUBLIC_SITE_URL` sets the canonical domain. `GA_ID` or `NEXT_PUBLIC_GA_ID` enables Google Analytics. `NEXT_PUBLIC_ADSENSE_CLIENT_ID` loads the AdSense script when ad placements are deliberately added; the redesigned content pages do not reserve ad blocks.

The review and design rationale are in [`docs/overseas-ui-ux-redesign-plan.md`](docs/overseas-ui-ux-redesign-plan.md).
