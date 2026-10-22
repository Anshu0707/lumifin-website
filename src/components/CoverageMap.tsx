import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { MAP_CONTEXT, MAP_COUNTRIES } from '../constants/coverageMap';
import { localizedPath } from '../utils/localizedPath';

/** Markets already open. Everything else on the map is still on the way. */
const LIVE = new Set(['vietnam']);

/** Markets with a travel-money page of their own. */
const PAGES: Record<string, string> = {
  vietnam: '/travel-money/vietnam',
  thailand: '/travel-money/thailand',
  indonesia: '/travel-money/indonesia',
};

/** The local QR network, where one is confirmed. */
const NETWORKS: Record<string, string> = {
  vietnam: 'VietQR',
  thailand: 'PromptPay',
  indonesia: 'QRIS',
  malaysia: 'DuitNow',
  cambodia: 'KHQR',
  philippines: 'InstaPay',
  laos: 'Lao QR',
};

/**
 * Hand offsets for the map labels. An area centroid lands outside the country
 * for an elongated one like Vietnam, and outside the frame for one near the
 * edge like South Korea, so each label is nudged and the two that end up far
 * from their shape get a leader line.
 */
const LABELS: Record<
  string,
  { dx: number; dy: number; anchor: 'start' | 'middle' | 'end'; leader?: boolean }
> = {
  mongolia: { dx: 0, dy: 0, anchor: 'middle' },
  southKorea: { dx: -46, dy: 6, anchor: 'end' },
  taiwan: { dx: 42, dy: 8, anchor: 'start' },
  laos: { dx: -6, dy: -26, anchor: 'middle' },
  vietnam: { dx: 150, dy: 86, anchor: 'start', leader: true },
  thailand: { dx: -46, dy: 40, anchor: 'middle' },
  cambodia: { dx: -30, dy: 112, anchor: 'end' },
  philippines: { dx: 54, dy: -26, anchor: 'start' },
  malaysia: { dx: 78, dy: 30, anchor: 'start' },
  indonesia: { dx: -40, dy: 76, anchor: 'middle' },
};

// Wider than the generated geometry, to leave room for the edge labels.
const VIEWBOX = '-40 -30 1240 1790';

export default function CoverageMap() {
  const { t } = useTranslation();
  const location = useLocation();

  const name = (key: string) => t(`coverage.countries.${key}`);
  const ordered = MAP_COUNTRIES;

  // One sentence standing in for the map itself, for anyone not seeing it.
  const liveNames = ordered.filter((c) => LIVE.has(c.key)).map((c) => name(c.key));
  const soonNames = ordered.filter((c) => !LIVE.has(c.key)).map((c) => name(c.key));
  const mapLabel = `${liveNames.join(', ')} — ${t('coverage.liveBadge')}. ${soonNames.join(
    ', '
  )} — ${t('coverage.comingSoonBadge')}.`;

  return (
    <div className="grid lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-7">
        <svg
          viewBox={VIEWBOX}
          role="img"
          aria-label={mapLabel}
          className="w-full h-auto max-h-[42rem] mx-auto"
        >
          {/* The region is a crop of a larger landmass, so round the edge and
              tint the sea — otherwise China and Russia end at a hard grey slab. */}
          <defs>
            <clipPath id="coverage-map-clip">
              <rect x={-40} y={-30} width={1240} height={1790} rx={48} />
            </clipPath>
          </defs>
          <g clipPath="url(#coverage-map-clip)">
            <rect x={-40} y={-30} width={1240} height={1790} fill="#f8fafc" />

          {/* Neighbouring countries, so the markets read as part of a region. */}
          <g aria-hidden="true">
            {MAP_CONTEXT.map((d, i) => (
              <path key={i} d={d} fill="#e2e8f0" stroke="#cbd5e1" strokeWidth={1.5} />
            ))}
          </g>

          <g aria-hidden="true">
            {ordered.map((c) => {
              const live = LIVE.has(c.key);
              return (
                <path
                  key={c.key}
                  d={c.d}
                  fill={live ? '#15803d' : '#bbf7d0'}
                  stroke={live ? '#14532d' : '#4ade80'}
                  strokeWidth={2.5}
                />
              );
            })}
          </g>

          {/* The map scales with its container, so on a phone these would render
              at about 9px. Below sm the country list underneath carries the
              names instead. */}
          <g aria-hidden="true" className="hidden sm:block">
            {ordered.map((c) => {
              const L = LABELS[c.key] ?? { dx: 0, dy: 0, anchor: 'middle' as const };
              const x = c.lx + L.dx;
              const y = c.ly + L.dy;
              return (
                <g key={c.key}>
                  {L.leader && (
                    <line
                      x1={c.lx + 14}
                      y1={c.ly + 30}
                      x2={x - 10}
                      y2={y - 9}
                      stroke="#15803d"
                      strokeWidth={3}
                    />
                  )}
                  <text
                    x={x}
                    y={y}
                    textAnchor={L.anchor}
                    fontSize={34}
                    fontWeight={800}
                    fill="#0f172a"
                    stroke="#f8fafc"
                    strokeWidth={7}
                    paintOrder="stroke"
                  >
                    {name(c.key)}
                  </text>
                </g>
              );
            })}
          </g>
          </g>
        </svg>
      </div>

      {/* The country list is the real content: it carries the links, and it is
          what a screen reader or a crawler reads instead of the drawing. */}
      <div className="lg:col-span-5 space-y-8">
        <ul className="flex flex-wrap gap-2.5">
          {ordered.map((c) => {
            const live = LIVE.has(c.key);
            const network = NETWORKS[c.key];
            const inner = (
              <>
                <span
                  className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                    live ? 'bg-[#15803d]' : 'bg-[#bbf7d0] ring-1 ring-[#4ade80]'
                  }`}
                  aria-hidden="true"
                />
                <span className="font-bold text-slate-800">{name(c.key)}</span>
                {network && (
                  <span className="text-slate-400 font-medium text-xs">{network}</span>
                )}
              </>
            );
            const cls =
              'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ' +
              (live
                ? 'border-[#15803d]/30 bg-[#15803d]/5'
                : 'border-slate-200 bg-white hover:border-slate-300');
            return (
              <li key={c.key}>
                {PAGES[c.key] ? (
                  <Link to={localizedPath(PAGES[c.key], location.pathname)} className={cls}>
                    {inner}
                  </Link>
                ) : (
                  <span className={cls}>{inner}</span>
                )}
              </li>
            );
          })}
        </ul>

        <dl className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
          <div className="flex items-center gap-2.5">
            <span className="w-4 h-4 rounded bg-[#15803d]" aria-hidden="true" />
            <dt className="font-bold text-slate-700">{t('coverage.liveBadge')}</dt>
          </div>
          <div className="flex items-center gap-2.5">
            <span
              className="w-4 h-4 rounded bg-[#bbf7d0] ring-1 ring-[#4ade80]"
              aria-hidden="true"
            />
            <dt className="font-bold text-slate-700">{t('coverage.comingSoonBadge')}</dt>
          </div>
        </dl>
      </div>
    </div>
  );
}
