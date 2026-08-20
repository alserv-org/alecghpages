import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import './OreToOrbitTeaser.css';

/**
 * Stands in for a screenshot gallery on a product that has no store listing
 * yet. Everything here is drawn from the same vocabulary the game is drawn
 * from — point, line, triangle, square, coloured by what the part does — so
 * the teaser is the pitch rather than a placeholder.
 *
 * The scene reads left-to-right as the game's one arc: peach horizon and dark
 * ink on the surface, near-black and glowing primitives in vacuum.
 */

/** [x, y, r, opacity] — hand-placed so the field thickens toward vacuum. */
const STARS: [number, number, number, number][] = [
  [210, 72, 0.9, 0.16], [300, 30, 1.2, 0.24], [372, 96, 0.8, 0.2],
  [430, 124, 0.7, 0.18], [455, 44, 1.1, 0.34], [520, 110, 0.9, 0.28],
  [588, 26, 1.3, 0.5], [640, 84, 1, 0.44], [700, 140, 0.9, 0.42],
  [742, 40, 1.4, 0.68], [800, 104, 1.1, 0.66], [848, 60, 0.9, 0.6],
  [880, 152, 1.2, 0.75], [916, 32, 1.5, 0.85], [660, 190, 0.8, 0.45],
  [790, 182, 1, 0.58], [905, 224, 1, 0.66], [560, 62, 0.8, 0.36],
];

/** [x, y, r, material] — ore sits under the surface line and is never inked. */
const ORE: [number, number, number, string][] = [
  [240, 286, 3, '#ff6b5e'], [266, 301, 2.4, '#ff6b5e'], [356, 274, 3, '#63b3ff'],
  [378, 289, 2.2, '#63b3ff'], [452, 292, 2.4, '#ff6b5e'], [620, 274, 3, '#ff6b5e'],
  [706, 298, 2.6, '#63b3ff'],
];

/** The four glyphs under the scene, in the order the locale lists them. */
const GLYPHS = [
  <circle cx="9" cy="9" r="3.6" fill="#e8edf7" />,
  <line x1="2.5" y1="15" x2="15.5" y2="3" stroke="#e8edf7" strokeWidth="3" strokeLinecap="round" />,
  <polygon points="9,2.5 16,15.5 2,15.5" fill="#ff6b5e" />,
  <rect x="3" y="3" width="12" height="12" rx="1.5" fill="#63b3ff" />,
];

interface Vocab {
  shape: string;
  role: string;
}

const OreToOrbitTeaser = () => {
  const { t } = useTranslation();
  const vocabulary: Vocab[] = t('oretoorbit.teaser.vocabulary');

  return (
    <div className="oto-teaser">
      <svg
        className="oto-scene"
        viewBox="0 0 960 320"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label={t('oretoorbit.teaser.alt')}
      >
        <defs>
          {/* One number — how much air is left above you — drives the whole
              frame in the game. Here it's the diagonal of this gradient. */}
          <linearGradient id="oto-sky" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffcf9e" />
            <stop offset="22%" stopColor="#a5dcf2" />
            <stop offset="48%" stopColor="#3f7fb5" />
            <stop offset="74%" stopColor="#16294a" />
            <stop offset="100%" stopColor="#04060c" />
          </linearGradient>

          <linearGradient id="oto-ground" gradientUnits="userSpaceOnUse" x1="0" y1="236" x2="0" y2="330">
            <stop offset="0%" stopColor="#57424b" />
            <stop offset="100%" stopColor="#191320" />
          </linearGradient>

          <linearGradient id="oto-flame" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffd166" />
            <stop offset="55%" stopColor="#ff7a3d" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ff4d3d" stopOpacity="0" />
          </linearGradient>

          <filter id="oto-glow" x="-70%" y="-70%" width="240%" height="240%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="oto-ore-glow" x="-140%" y="-140%" width="380%" height="380%">
            <feGaussianBlur stdDeviation="2.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="960" height="320" fill="url(#oto-sky)" />

        <g fill="#ffffff">
          {STARS.map(([x, y, r, o], i) => (
            <circle key={i} cx={x} cy={y} r={r} opacity={o} />
          ))}
        </g>

        {/* The world is a disc: the horizon curving away at both edges is the
            planet radius, not a flourish. */}
        <circle cx="430" cy="2400" r="2160" fill="url(#oto-ground)" />
        <path
          d="M0,283.3 A2160,2160 0 0 1 960,306"
          fill="none"
          stroke="#f0d9bd"
          strokeOpacity="0.45"
          strokeWidth="2"
        />

        {/* A shaft the player dug, and the ore it was dug toward. */}
        <path d="M278,245 h16 v58 h-16 z" fill="#0c0810" opacity="0.55" />
        <g filter="url(#oto-ore-glow)">
          {ORE.map(([x, y, r, fill], i) => (
            <circle key={i} cx={x} cy={y} r={r} fill={fill} />
          ))}
        </g>

        {/* Dark ink on a bright sky — that is what the surface looks like. */}
        <g stroke="#241c2e" strokeWidth="2.2" strokeLinecap="round" fill="none">
          <circle cx="318" cy="227" r="4.2" fill="#241c2e" stroke="none" />
          <path d="M318,232 v9 M318,235 l-6,3 M318,235 l6,3 M318,241 l-4,4 M318,241 l4,4" />
        </g>

        <path
          d="M324,236 C 400,198 470,184 566,152"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.32"
          strokeWidth="2"
          strokeDasharray="2 9"
          strokeLinecap="round"
        />

        {/* The craft: nothing here is an asset. Square hull, red tank, red
            nozzle, blue battery, triangle fins. */}
        <g transform="translate(624,128) rotate(34)" filter="url(#oto-glow)">
          <polygon points="-7,32 7,32 0,68" fill="url(#oto-flame)" />
          <polygon points="-3.5,32 3.5,32 0,52" fill="#fff3c4" opacity="0.9" />
          <g stroke="#0d1018" strokeWidth="1.6" strokeLinejoin="round">
            <polygon points="-10,-4 -10,12 -25,15" fill="#dfe6f2" />
            <polygon points="10,-4 10,12 25,15" fill="#dfe6f2" />
            <polygon points="-10,12 10,12 0,33" fill="#e0362c" />
            <rect x="-10" y="-8" width="20" height="20" fill="#f04438" />
            <rect x="-10" y="-28" width="20" height="20" fill="#eef2fa" />
            <polygon points="-10,-28 10,-28 0,-47" fill="#eef2fa" />
            <rect x="-5" y="-24" width="10" height="10" fill="#4f9df5" />
          </g>
        </g>
      </svg>

      <div className="oto-caption">
        <p className="oto-rule">{t('oretoorbit.teaser.rule')}</p>
        <ul className="oto-vocab">
          {Array.isArray(vocabulary) &&
            vocabulary.map((entry, i) => (
              <li key={entry.shape}>
                <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true">
                  {GLYPHS[i]}
                </svg>
                <b>{entry.shape}</b>
                <span>{entry.role}</span>
              </li>
            ))}
        </ul>
        <p className="oto-note">{t('oretoorbit.teaser.note')}</p>
      </div>
    </div>
  );
};

export default OreToOrbitTeaser;
