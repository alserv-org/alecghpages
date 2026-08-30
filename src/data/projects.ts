import React from 'react';
import { ListChecks, Boxes, Dices, Rocket, Waves, type LucideIcon } from 'lucide-react';
import OreToOrbitTeaser from '../components/OreToOrbitTeaser';

/** Drives the release badge, and whether a Play link is rendered at all.
 *  'live' specifically means "on Google Play" (see StatusPill's copy);
 *  'available' is for a shipped, usable project with no Play listing. */
export type Status = 'live' | 'available' | 'soon' | 'dev';

export interface Project {
  id: string;
  /** Route segment, also the i18n namespace under locales. */
  slug: string;
  title: string;
  icon: LucideIcon;
  status: Status;
  /** CSS custom property scoping the page/card accent. */
  accentVar: string;
  platform: string;
  engine: string;
  /** Play listing — null until there's a real, resolvable URL (a live store
   *  page or a closed-testing opt-in), so we never render a badge that 404s. */
  playUrl: string | null;
  /** Open-source / self-hosted projects link out to their repo instead of a
   *  store listing — shown as a GitHub CTA on the project page when set. */
  githubUrl?: string | null;
  /** Served from this same site out of public/. Null while a product is still
   *  unreleased and has no policy to serve. */
  privacyUrl: string | null;
  /** Real app icon, shown instead of the Lucide glyph when set. */
  logoSrc?: string;
  /** In-app screenshots, shown as a gallery on the project page. */
  screenshots?: string[];
  /** Stands in for the gallery on a product with nothing shippable to
   *  screenshot yet — see components/OreToOrbitTeaser. */
  teaser?: React.ComponentType;
}

export const projects: Project[] = [
  {
    id: 'listkeeper',
    slug: 'listkeeper',
    title: 'ListKeeper',
    icon: ListChecks,
    status: 'live',
    accentVar: '--accent-listkeeper',
    platform: 'Android',
    engine: 'Flutter',
    playUrl: 'https://play.google.com/store/apps/details?id=org.alserv.listkeeper',
    privacyUrl: '/privacy-policy-listkeeper-en.html',
    logoSrc: '/logos/listkeeper.png',
  },
  {
    id: 'whataretheodds',
    slug: 'what-are-the-odds',
    title: 'What Are The Odds',
    icon: Dices,
    status: 'live',
    accentVar: '--accent-whataretheodds',
    platform: 'Android',
    engine: 'LibGDX',
    playUrl: 'https://play.google.com/store/apps/details?id=org.alserv.whataretheodds',
    privacyUrl: '/privacy-policy-whataretheodds-en.html',
    logoSrc: '/logos/what-are-the-odds.png',
    // Same order as the Play listing, which is the pitch: the reveal landing on a
    // win first (it is what the game feels like), the keypad second (it is what you
    // actually do), then the dive, the two outcomes, and the meta screens last.
    screenshots: [
      '/screenshots/what-are-the-odds/01-the-reveal.webp',
      '/screenshots/what-are-the-odds/02-your-guess.webp',
      '/screenshots/what-are-the-odds/03-the-dive.webp',
      '/screenshots/what-are-the-odds/04-you-won.webp',
      '/screenshots/what-are-the-odds/05-so-close.webp',
      '/screenshots/what-are-the-odds/06-the-ladder.webp',
      '/screenshots/what-are-the-odds/07-leaderboard.webp',
      '/screenshots/what-are-the-odds/08-your-stats.webp',
    ],
  },
  {
    id: 'pixelwrangler',
    slug: 'pixel-wrangler',
    title: 'Pixel Wrangler',
    icon: Boxes,
    status: 'live',
    accentVar: '--accent-pixelwrangler',
    platform: 'Android',
    engine: 'LibGDX',
    playUrl: 'https://play.google.com/store/apps/details?id=org.alserv.pixelwrangler',
    privacyUrl: '/privacy-policy-pixelwrangler-en.html',
    logoSrc: '/logos/pixel-wrangler.png',
    // Order is the pitch, and it matches the Play listing: the boss fight leads
    // because it is the highest-contrast frame and answers "what is this" in one
    // glance; the card draft is second because drafting is what makes this a
    // roguelike rather than a tapper. The menu goes last — menus don't sell.
    screenshots: [
      '/screenshots/pixel-wrangler/01-boss-fight.webp',
      '/screenshots/pixel-wrangler/02-the-draft.webp',
      '/screenshots/pixel-wrangler/03-the-storm.webp',
      '/screenshots/pixel-wrangler/04-corrupted.webp',
      '/screenshots/pixel-wrangler/05-run-over.webp',
      '/screenshots/pixel-wrangler/06-main-menu.webp',
    ],
  },
  {
    id: 'oretoorbit',
    slug: 'ore-to-orbit',
    title: 'Ore to Orbit',
    icon: Rocket,
    status: 'soon',
    accentVar: '--accent-oretoorbit',
    platform: 'Android',
    engine: 'LibGDX + Box2D',
    playUrl: null,
    privacyUrl: null,
    teaser: OreToOrbitTeaser,
  },
  {
    id: 'homepool',
    slug: 'homepool',
    title: 'homepool',
    icon: Waves,
    status: 'available',
    accentVar: '--accent-homepool',
    platform: 'Self-hosted (Docker)',
    engine: 'FastAPI + React',
    playUrl: null,
    githubUrl: 'https://github.com/alecc08/homepool',
    privacyUrl: null,
    logoSrc: '/logos/homepool.png',
    screenshots: [
      '/screenshots/homepool/1-dashboard.png',
      '/screenshots/homepool/2-maintenance.png',
      '/screenshots/homepool/3-mobile.png',
    ],
  },
];

export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
