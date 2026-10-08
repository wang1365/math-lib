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
- `/guides`: learning-path index, preserving the original article anchors
- `/guides/algebra-foundations`: complete algebra unit with diagnostics, examples, practice, answers, and readiness checks
- `/guides/calculus-roadmap`: complete first-calculus unit from function readiness to accumulation
- `/tools`: working on-site and clearly labeled external tools
- `/calculator`: keyboard-accessible basic arithmetic calculator
- `/examples`: formulas with usage notes and worked examples

The Chinese pages use the same paths under `/zh-CN`. Default-locale `/en` links redirect to the canonical English paths.

## Content maintenance

Edit `src/lib/catalog.ts` and `src/lib/resource-additions.ts` to change topics and resource listings. The concrete comparison in `src/lib/resourceComparison.ts` contrasts four specific offerings on the same dimensions. Review dates describe actual source checks, not course completion or measured outcomes. Preserve older dates unless you verify those entries again.

Every resource includes a short description, the learner it suits, a limitation, format, cost category, and topic tags. Verify the destination and access terms before changing a listing. The [resource sourcing record](docs/resource-sourcing.md) lists the provider pages used for the expanded directory. Avoid unsupported ratings and claims about site features.

Original bilingual lesson data lives in `src/lib/guideLessons-algebra.ts` and `src/lib/guideLessons-calculus.ts`; `guideLessons.ts` explicitly lists the completed detail routes. Do not add a detail route for an unfinished guide. Formula mini-guides and their nine practice questions live in `src/lib/formulaExamples.ts`. Keep both languages, answer explanations, domain restrictions, chapter links, and source dates in sync.

Interface copy is in `src/lib/site-copy.ts`. Page titles, descriptions, canonical URLs, and language alternates are in `src/lib/metadata.ts`. To add another locale, provide complete editorial copy and verify all pages before adding it to `src/config/i18n.ts` and `next-sitemap.config.js`.

## Quality checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:routes
# Or run all of the above:
npm run check
```

Tests use Node’s test runner, tsx, and jsdom. `npm test` covers the calculator reducer and actual React component, resource filters, content integrity, KaTeX, and bilingual metadata. `npm run test:routes` starts the production build itself on local port 3107 and checks HTTP status, redirects, canonical URLs, language alternates, server-rendered content, and sitemap URLs. Run a build first. Node 20.9+ is required by Next.js; the recorded implementation checks used Node 24.19.0. DOM and HTTP tests do not replace visual browser testing.

After deployment, click through the home page, topic guides, filtered directory, calculator, and language switcher on the production domain. Check desktop and mobile layouts, external links, canonical tags, and the generated sitemap.

## Configuration

`NEXT_PUBLIC_SITE_URL` sets the canonical domain. `GA_ID` or `NEXT_PUBLIC_GA_ID` enables Google Analytics. `NEXT_PUBLIC_ADSENSE_CLIENT_ID` loads the AdSense script when ad placements are deliberately added; the redesigned content pages do not reserve ad blocks.

The review and design rationale are in [`docs/overseas-ui-ux-redesign-plan.md`](docs/overseas-ui-ux-redesign-plan.md).
