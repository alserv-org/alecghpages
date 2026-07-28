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
      'An arcade roguelite: wrangle cube-creatures out of a destabilised feed across a 50-wave mountain, drafting upgrade cards as you climb.',
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
      `$1${SITE}/${path}$2`,
    )
    .replace(
      /(<meta\s+property="og:url"\s+content=")[^"]*(")/,
      `$1${SITE}/${path}$2`,
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

// Guard against a route being added to the app but not to this file.
const privacyPolicies = (await readdir(join(root, 'public'))).filter((f) =>
  f.startsWith('privacy-policy-'),
);
if (privacyPolicies.length !== 3) {
  console.error(
    `Expected 3 privacy policies in public/, found ${privacyPolicies.length}. ` +
      'Every product needs one — Play rejects a policy URL that 404s.',
  );
  process.exit(1);
}
