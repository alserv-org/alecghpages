import React from 'react';
import { ListChecks, Boxes, Dices, Rocket, type LucideIcon } from 'lucide-react';
import OreToOrbitTeaser from '../components/OreToOrbitTeaser';

/** Drives the release badge, and whether a Play link is rendered at all. */
export type Status = 'live' | 'soon' | 'dev';

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
    screenshots: [
      '/screenshots/what-are-the-odds/1-menu.png',
      '/screenshots/what-are-the-odds/2-gameplay.png',
      '/screenshots/what-are-the-odds/3-result.png',
      '/screenshots/what-are-the-odds/4-leaderboard.png',
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
    screenshots: [
      '/screenshots/pixel-wrangler/01-main-menu.webp',
      '/screenshots/pixel-wrangler/02-the-storm.webp',
      '/screenshots/pixel-wrangler/03-draft.webp',
      '/screenshots/pixel-wrangler/04-run-over.webp',
      '/screenshots/pixel-wrangler/05-upgrades.webp',
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
];

export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
