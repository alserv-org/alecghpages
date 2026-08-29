import { ListChecks, Boxes, Dices, type LucideIcon } from 'lucide-react';

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
  /** Play listing — null until the app is actually published, so we never
   *  render a badge that 404s. */
  playUrl: string | null;
  /** Served from this same site out of public/. */
  privacyUrl: string;
  /**
   * App mark, served from public/. Replaces the generic Lucide glyph on the
   * project page when a real icon exists.
   */
  iconUrl?: string;
  /**
   * Ordered screenshots for the gallery. The order is the pitch — action
   * first, then the mechanic that makes the game different — so it matches
   * the order the Play listing uses, not the order the files were captured.
   * Omit the key entirely for a product with nothing worth showing yet.
   */
  screenshots?: { src: string; captionKey: string }[];
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
  },
  {
    id: 'whataretheodds',
    slug: 'what-are-the-odds',
    title: 'What Are The Odds',
    icon: Dices,
    status: 'soon',
    accentVar: '--accent-whataretheodds',
    platform: 'Android',
    engine: 'LibGDX',
    playUrl: null,
    privacyUrl: '/privacy-policy-whataretheodds-en.html',
  },
  {
    id: 'pixelwrangler',
    slug: 'pixel-wrangler',
    title: 'Pixel Wrangler',
    icon: Boxes,
    status: 'dev',
    accentVar: '--accent-pixelwrangler',
    platform: 'Android',
    engine: 'LibGDX',
    playUrl: null,
    privacyUrl: '/privacy-policy-pixelwrangler-en.html',
    iconUrl: '/pixel-wrangler/icon.webp',
    screenshots: [
      { src: '/pixel-wrangler/01-boss-fight.webp', captionKey: 'shots.boss' },
      { src: '/pixel-wrangler/02-the-draft.webp', captionKey: 'shots.draft' },
      { src: '/pixel-wrangler/03-the-storm.webp', captionKey: 'shots.storm' },
      { src: '/pixel-wrangler/04-corrupted.webp', captionKey: 'shots.corrupted' },
      { src: '/pixel-wrangler/05-run-over.webp', captionKey: 'shots.runover' },
      { src: '/pixel-wrangler/07-main-menu.webp', captionKey: 'shots.menu' },
    ],
  },
];

export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
