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
  },
];

export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
