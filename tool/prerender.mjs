/*
 * GitHub Pages serves static files only — it has no SPA rewrite, so a direct
 * hit on /listkeeper would 404 even though React Router knows the route.
 *
 * Rather than the usual 404.html-bounce hack (which makes crawlers see a real
 * 404 and flickers the URL through /?/listkeeper), emit a genuine index.html
 * at every route. Each one is the built shell with its own title/description,
 * so every URL is a true 200 and React Router takes over on hydration.
 *
 * Routes are declared here, not imported from src/data/projects.ts, because
 * that module is TSX-importing ESM that Node cannot load directly. Adding a
 * product means adding a line here too — the check at the bottom fails the
 * build if the two ever drift.
 */
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'docs');
const SITE = 'https://www.alserv.org';

const routes = [
  {
    path: 'listkeeper',
    title: 'ListKeeper — simple lists, done right',
    description:
      'A fast, clean Android list app with nothing bolted on. Make a list, check things off, get on with your day.',
  },
  {
    path: 'what-are-the-odds',
    title: 'What Are The Odds — beat the odds, climb the ladder',
    description:
      'Start at 1 in 10 and climb to 1 in 10,000 and beyond. Global leaderboards via Play Games. Most attempts fail — that is the game.',
  },
  {
    path: 'pixel-wrangler',
    title: 'Pixel Wrangler — tap fast, climb the mountain',
    description:
      'An arcade roguelite: tap wild pixels out of a broken feed across a 50-wave mountain, drafting upgrade cards as you climb. Out now on Google Play.',
  },
  {
    path: 'ore-to-orbit',
    title: 'Ore to Orbit — mine a flat world, build a rocket out of shapes',
    description:
      'A 2D physics sandbox for Android, in development. Everything is a point, line, triangle or square, and colour decides what a shape does.',
  },
  // Pre-rename URL. The app redirects it to /pixel-wrangler client-side; this
  // file just stops it 404ing before the redirect can run.
  {
    path: 'pixelfarm',
    title: 'Pixel Wrangler — tap fast, climb the mountain',
    description: 'This project is now called Pixel Wrangler.',
  },
];

const shell = await readFile(join(outDir, 'index.html'), 'utf8');

/** Swaps the per-page metadata in a copy of the built shell. */
const render = ({ path, title, description }) =>
  shell
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*(")/,
      `$1${description}$2`,
    )
    .replace(
      /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
      `$1${title}$2`,
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
      `$1${description}$2`,
    )
    .replace(
      /(<link\s+rel="canonical"\s+href=")[^"]*(")/,
      // Trailing slash: Pages 301s /listkeeper to /listkeeper/, so the
      // canonical has to name the URL that actually answers 200.
      `$1${SITE}/${path}/$2`,
    )
    .replace(
      /(<meta\s+property="og:url"\s+content=")[^"]*(")/,
      // Trailing slash: Pages 301s /listkeeper to /listkeeper/, so the
      // canonical has to name the URL that actually answers 200.
      `$1${SITE}/${path}/$2`,
    );

for (const route of routes) {
  const dir = join(outDir, route.path);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), render(route));
  console.log(`prerendered /${route.path}`);
}

/*
 * Unknown URLs still land on 404.html. Serve the app shell there so React
 * Router renders the styled NotFound page at the URL the visitor typed —
 * and GitHub still returns a correct 404 status for it.
 */
await writeFile(join(outDir, '404.html'), shell);
console.log('prerendered 404.html');

/*
 * Every product with a Play listing needs a policy that resolves — Play
 * rejects a URL that 404s. Unreleased products have no listing and so are
 * listed here with `null` rather than being left out, which is what keeps
 * this from silently passing when a shipped product loses its policy.
 */
const policies = {
  listkeeper: 'privacy-policy-listkeeper-en.html',
  'what-are-the-odds': 'privacy-policy-whataretheodds-en.html',
  'pixel-wrangler': 'privacy-policy-pixelwrangler-en.html',
  'ore-to-orbit': null,
};

const onDisk = new Set(
  (await readdir(join(root, 'public'))).filter((f) =>
    f.startsWith('privacy-policy-'),
  ),
);
const expected = Object.values(policies).filter(Boolean);

const missing = expected.filter((f) => !onDisk.has(f));
const stray = [...onDisk].filter((f) => !expected.includes(f));
if (missing.length || stray.length) {
  if (missing.length) {
    console.error(`Missing privacy policies in public/: ${missing.join(', ')}`);
  }
  if (stray.length) {
    console.error(
      `Privacy policies in public/ that no product claims: ${stray.join(', ')}`,
    );
  }
  process.exit(1);
}

// Guard against a route being added to the app but not to this file.
const declared = routes.map((r) => r.path).filter((p) => p !== 'pixelfarm');
const undeclared = Object.keys(policies).filter((p) => !declared.includes(p));
if (undeclared.length) {
  console.error(
    `Products with no prerendered route: ${undeclared.join(', ')}. ` +
      'Add one above, or GitHub Pages 404s the URL React Router knows.',
  );
  process.exit(1);
}
