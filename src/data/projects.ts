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
  /** Play listing — null until there's a real, resolvable URL (a live store
   *  page or a closed-testing opt-in), so we never render a badge that 404s. */
  playUrl: string | null;
  /** Served from this same site out of public/. */
  privacyUrl: string;
  /** Real app icon, shown instead of the Lucide glyph when set. */
  logoSrc?: string;
  /** In-app screenshots, shown as a gallery on the project page. */
  screenshots?: string[];
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
    status: 'soon',
    accentVar: '--accent-whataretheodds',
    platform: 'Android',
    engine: 'LibGDX',
    playUrl: 'https://play.google.com/apps/testing/org.alserv.whataretheodds',
    privacyUrl: '/privacy-policy-whataretheodds-en.html',
    logoSrc: '/logos/what-are-the-odds.png',
    screenshots: [
      '/screenshots/what-are-the-odds/1-menu.png',
      '/screenshots/what-are-the-odds/2-gameplay.png',
      '/screenshots/what-are-the-odds/3-result.png',
    ],
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
  },
];

export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
