import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Globe from 'react-globe.gl';

const ARCS = [
  { startLat: 13.7563, startLng: 100.5018, endLat: 1.3521,   endLng: 103.8198, label: 'Bangkok → Singapore' },
  { startLat: 1.3521,  startLng: 103.8198, endLat: 3.1390,   endLng: 101.6869, label: 'Singapore → Kuala Lumpur' },
  { startLat: 3.1390,  startLng: 101.6869, endLat: -6.2088,  endLng: 106.8456, label: 'Kuala Lumpur → Jakarta' },
  { startLat: -6.2088, startLng: 106.8456, endLat: -8.4095,  endLng: 115.1889, label: 'Jakarta → Bali' },
  { startLat: 13.7563, startLng: 100.5018, endLat: 11.5624,  endLng: 104.9160, label: 'Bangkok → Phnom Penh' },
  { startLat: 11.5624, startLng: 104.9160, endLat: 10.8231,  endLng: 106.6297, label: 'Phnom Penh → Ho Chi Minh' },
  { startLat: 10.8231, startLng: 106.6297, endLat: 1.3521,   endLng: 103.8198, label: 'Ho Chi Minh → Singapore' },
  { startLat: 1.3521,  startLng: 103.8198, endLat: 14.5995,  endLng: 120.9842, label: 'Singapore → Manila' },
];

const CITIES = [
  { lat: 13.7563,  lng: 100.5018, name: 'Bangkok',      network: 'PromptPay' },
  { lat: -8.4095,  lng: 115.1889, name: 'Bali',         network: 'QRIS' },
  { lat: -6.2088,  lng: 106.8456, name: 'Jakarta',      network: 'QRIS' },
  { lat: 10.8231,  lng: 106.6297, name: 'Ho Chi Minh',  network: 'VietQR' },
  { lat: 3.1390,   lng: 101.6869, name: 'Kuala Lumpur', network: 'DuitNow' },
  { lat: 14.5995,  lng: 120.9842, name: 'Manila',       network: 'InstaPay' },
  { lat: 11.5624,  lng: 104.9160, name: 'Phnom Penh',   network: 'KHQR' },
  { lat: 1.3521,   lng: 103.8198, name: 'Singapore',    network: 'PayNow' },
];

const SEA = new Set([
  'Thailand', 'Singapore', 'Malaysia', 'Indonesia',
  'Vietnam', 'Viet Nam', 'Philippines', 'Cambodia',
  'Myanmar', 'Laos', 'Lao PDR', 'Brunei',
]);

export default function GlobeHero() {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 600, h: 600 });
  const [countries, setCountries] = useState<any>({ features: [] });
  const [activeIdx, setActiveIdx] = useState(0);

  // Load country polygons for hex overlay
  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson'
    )
      .then(r => r.json())
      .then(setCountries)
      .catch(() => {});
  }, []);

  // Responsive sizing
  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setSize({
          w: containerRef.current.offsetWidth,
          h: containerRef.current.offsetHeight,
        });
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Controls + camera (same reliable pattern as before)
  useEffect(() => {
    if (!globeRef.current) return;
    globeRef.current.controls().autoRotate = true;
    globeRef.current.controls().autoRotateSpeed = 0.15;
    globeRef.current.controls().enableZoom = false;
    globeRef.current.pointOfView({ lat: 5, lng: 112, altitude: 0.4 }, 0);
  }, []);

  // Cycle active city badge
  useEffect(() => {
    const timer = setInterval(() => setActiveIdx(p => (p + 1) % CITIES.length), 2200);
    return () => clearInterval(timer);
  }, []);

  const hexColor = useCallback((feat: any) => {
    const name: string = feat?.properties?.NAME ?? feat?.properties?.NAME_EN ?? '';
    return SEA.has(name)
      ? 'rgba(139,92,246,0.55)'  // SEA — bright purple hex overlay
      : 'rgba(50,15,90,0.08)';   // rest — barely visible
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <Globe
        ref={globeRef}
        width={size.w}
        height={size.h}
        backgroundColor="rgba(0,0,0,0)"

        // Dark satellite texture — proven reliable
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"

        // Atmosphere color matches page bg purple — edge bleeds into background
        showAtmosphere
        atmosphereColor="#1a0838"
        atmosphereAltitude={0.1}

        // Hex polygon country overlay (tech / holographic feel)
        hexPolygonsData={countries.features}
        hexPolygonResolution={3}
        hexPolygonMargin={0.65}
        hexPolygonColor={hexColor}

        // Payment flow arcs
        arcsData={ARCS}
        arcStartLat={(d: any) => d.startLat}
        arcStartLng={(d: any) => d.startLng}
        arcEndLat={(d: any) => d.endLat}
        arcEndLng={(d: any) => d.endLng}
        arcColor={() => ['rgba(139,92,246,0)', 'rgba(232,210,255,0.95)', 'rgba(139,92,246,0)']}
        arcAltitude={0.12}
        arcStroke={1.1}
        arcDashLength={0.35}
        arcDashGap={0.05}
        arcDashAnimateTime={1600}

        // City dots
        pointsData={CITIES}
        pointLat={(d: any) => d.lat}
        pointLng={(d: any) => d.lng}
        pointColor={() => '#e9d5ff'}
        pointAltitude={0.02}
        pointRadius={0.65}
        pointsMerge={false}

        // Radar-pulse rings
        ringsData={CITIES}
        ringLat={(d: any) => d.lat}
        ringLng={(d: any) => d.lng}
        ringColor={() => (t: number) => `rgba(167,139,250,${Math.max(0, 0.75 * (1 - t * 1.2))})`}
        ringMaxRadius={4.5}
        ringPropagationSpeed={2.8}
        ringRepeatPeriod={1200}
      />

      {/* Network status badge */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-violet-500/20 rounded-2xl px-4 py-2.5 whitespace-nowrap"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
          <span className="text-xs font-bold text-violet-300 uppercase tracking-widest">
            {CITIES[activeIdx].network}
          </span>
          <span className="w-px h-3 bg-white/15" />
          <span className="text-sm font-semibold text-white">{CITIES[activeIdx].name}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
