import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Globe from 'react-globe.gl';

// Supported countries + their local instant-payment networks
const COUNTRIES_INFO = [
  { name: 'Thailand',    network: 'PromptPay' },
  { name: 'Indonesia',   network: 'QRIS' },
  { name: 'Vietnam',     network: 'VietQR' },
  { name: 'Malaysia',    network: 'DuitNow' },
  { name: 'Cambodia',    network: 'KHQR' },
  { name: 'Philippines', network: 'InstaPay' },
];

// City dots — only cities inside supported countries
const CITIES = [
  { lat: 13.7563,  lng: 100.5018, name: 'Bangkok',      country: 'Thailand' },
  { lat: -8.4095,  lng: 115.1889, name: 'Bali',         country: 'Indonesia' },
  { lat: -6.2088,  lng: 106.8456, name: 'Jakarta',      country: 'Indonesia' },
  { lat: 10.8231,  lng: 106.6297, name: 'Ho Chi Minh',  country: 'Vietnam' },
  { lat: 3.1390,   lng: 101.6869, name: 'Kuala Lumpur', country: 'Malaysia' },
  { lat: 11.5624,  lng: 104.9160, name: 'Phnom Penh',   country: 'Cambodia' },
  { lat: 14.5995,  lng: 120.9842, name: 'Manila',       country: 'Philippines' },
];

// Base payment-flow corridors — only between supported-country cities
const ARCS_BASE = [
  { startLat: 13.7563, startLng: 100.5018, endLat: 3.1390,   endLng: 101.6869 },  // Bangkok → KL
  { startLat: 3.1390,  startLng: 101.6869, endLat: -6.2088,  endLng: 106.8456 },  // KL → Jakarta
  { startLat: -6.2088, startLng: 106.8456, endLat: -8.4095,  endLng: 115.1889 },  // Jakarta → Bali
  { startLat: 13.7563, startLng: 100.5018, endLat: 11.5624,  endLng: 104.9160 },  // Bangkok → Phnom Penh
  { startLat: 11.5624, startLng: 104.9160, endLat: 10.8231,  endLng: 106.6297 },  // Phnom Penh → HCM
  { startLat: 10.8231, startLng: 106.6297, endLat: 14.5995,  endLng: 120.9842 },  // HCM → Manila
  { startLat: 13.7563, startLng: 100.5018, endLat: 14.5995,  endLng: 120.9842 },  // Bangkok → Manila
  { startLat: -6.2088, startLng: 106.8456, endLat: 14.5995,  endLng: 120.9842 },  // Jakarta → Manila
];

// Double-layer arcs: wide soft purple glow + thin bright core (fibre-optic look)
const ARCS = [
  ...ARCS_BASE.map((a, i) => ({ ...a, _layer: 'glow', _i: i })),
  ...ARCS_BASE.map((a, i) => ({ ...a, _layer: 'core', _i: i })),
];

// Country names as they appear in the ne_110m GeoJSON dataset
const SUPPORTED = new Set([
  'Thailand', 'Indonesia', 'Vietnam', 'Viet Nam',
  'Malaysia', 'Cambodia', 'Philippines',
]);

export default function GlobeHero() {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 600, h: 600 });
  const [countries, setCountries] = useState<any>({ features: [] });
  const [activeIdx, setActiveIdx] = useState(0);

  // Load world countries GeoJSON for hex polygon overlay
  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson'
    )
      .then(r => r.json())
      .then(setCountries)
      .catch(() => {});
  }, []);

  // Resize observer
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

  // Vertical (bottom-to-top) rotation
  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    controls.autoRotate = false;
    controls.enableZoom = false;
    // Zoomed out enough to show the whole sphere without cropping
    globeRef.current.pointOfView({ lat: 10, lng: 95, altitude: 1.9 }, 0);

    let frame: number;
    let globeGroup: any = null;
    const tick = () => {
      if (!globeGroup && globeRef.current) {
        const scene = globeRef.current.scene();
        globeGroup = scene?.children.find((c: any) => c.isGroup);
      }
      if (globeGroup) globeGroup.rotation.x -= 0.0005;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Cycle active country for the bottom pill
  useEffect(() => {
    const t = setInterval(() => setActiveIdx(p => (p + 1) % COUNTRIES_INFO.length), 2200);
    return () => clearInterval(t);
  }, []);

  // Supported countries glow purple; rest are barely visible
  const hexColor = useCallback((feat: any) => {
    const name: string = feat?.properties?.NAME ?? feat?.properties?.NAME_EN ?? '';
    const nameLong: string = feat?.properties?.NAME_LONG ?? '';
    return (SUPPORTED.has(name) || SUPPORTED.has(nameLong))
      ? 'rgba(168,85,247,0.55)'
      : 'rgba(80,30,150,0.05)';
  }, []);

  // HTML label factory — renders a sharp, typography-quality city pill into 3D space
  const cityLabel = useCallback((d: any) => {
    const el = document.createElement('div');
    el.style.pointerEvents = 'none';
    el.style.transform = 'translate(-50%, -140%)';
    el.innerHTML = `
      <div style="
        display:flex;align-items:center;gap:6px;
        padding:4px 10px;border-radius:999px;
        background:rgba(10,2,20,0.72);
        border:1px solid rgba(192,132,252,0.35);
        backdrop-filter:blur(6px);
        box-shadow:0 4px 14px rgba(103,15,197,0.35), 0 0 0 1px rgba(255,255,255,0.04) inset;
        font-family:ui-sans-serif,system-ui,-apple-system,sans-serif;
        font-size:11px;font-weight:700;letter-spacing:0.02em;
        color:#f5f3ff;white-space:nowrap;
      ">
        <span style="
          width:6px;height:6px;border-radius:999px;
          background:#c084fc;
          box-shadow:0 0 8px rgba(192,132,252,0.9);
        "></span>
        ${d.name}
      </div>
    `;
    return el;
  }, []);

  const arcColor = useCallback((d: any) =>
    d._layer === 'glow'
      ? ['rgba(168,85,247,0)', 'rgba(192,132,252,0.45)', 'rgba(168,85,247,0)']
      : ['rgba(255,255,255,0)', 'rgba(255,255,255,1)',  'rgba(255,255,255,0)']
  , []);

  const arcStroke = useCallback((d: any) =>
    d._layer === 'glow' ? 2.6 : 0.45
  , []);

  const arcDashAnimateTime = useCallback((d: any) =>
    // slight offset between layers so the bright core leads the glow
    d._layer === 'glow' ? 2400 : 2000
  , []);

  const arcAltitude = useCallback((d: any) =>
    d._layer === 'glow' ? 0.26 : 0.25
  , []);

  const active = COUNTRIES_INFO[activeIdx];

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <Globe
        ref={globeRef}
        width={size.w}
        height={size.h}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"

        // Atmosphere matches the page background purple so the sphere
        // edge bleeds into the hero gradient instead of creating a hard circle
        showAtmosphere
        atmosphereColor="#1a0838"
        atmosphereAltitude={0.22}

        // Supported-country hex overlay (glowing purple)
        hexPolygonsData={countries.features}
        hexPolygonResolution={3}
        hexPolygonMargin={0.5}
        hexPolygonColor={hexColor}

        // Flying payment-flow arcs — layered glow + bright core
        arcsData={ARCS}
        arcStartLat={(d: any) => d.startLat}
        arcStartLng={(d: any) => d.startLng}
        arcEndLat={(d: any) => d.endLat}
        arcEndLng={(d: any) => d.endLng}
        arcColor={arcColor}
        arcStroke={arcStroke}
        arcAltitude={arcAltitude}
        arcDashLength={0.38}
        arcDashGap={0.2}
        arcDashInitialGap={(d: any) => (d._i * 0.12) % 1}
        arcDashAnimateTime={arcDashAnimateTime}
        arcsTransitionDuration={0}

        // Continuous radar-pulse rings at each supported city
        ringsData={CITIES}
        ringLat={(d: any) => d.lat}
        ringLng={(d: any) => d.lng}
        ringColor={() => (t: number) => `rgba(192,132,252,${Math.max(0, 0.8 * (1 - t * 1.2))})`}
        ringMaxRadius={4}
        ringPropagationSpeed={3}
        ringRepeatPeriod={1300}

        // Bright city dots
        pointsData={CITIES}
        pointLat={(d: any) => d.lat}
        pointLng={(d: any) => d.lng}
        pointColor={() => '#f3e8ff'}
        pointAltitude={0.02}
        pointRadius={0.55}
        pointsMerge={false}

        // Crisp HTML city labels (proper typography, zoom-independent legibility)
        htmlElementsData={CITIES}
        htmlLat={(d: any) => d.lat}
        htmlLng={(d: any) => d.lng}
        htmlAltitude={0.03}
        htmlElement={cityLabel}
      />

      {/* Active country + network pill */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-3 whitespace-nowrap"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
          <div className="text-left">
            <p className="text-[10px] text-white/50 font-black uppercase tracking-widest leading-none">Live in</p>
            <p className="text-sm font-black text-white leading-tight mt-1">{active.name}</p>
          </div>
          <span className="w-px h-8 bg-white/20" />
          <div className="text-left">
            <p className="text-[10px] text-primary font-black uppercase tracking-widest leading-none">Network</p>
            <p className="text-sm font-black text-white leading-tight mt-1">{active.network}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
