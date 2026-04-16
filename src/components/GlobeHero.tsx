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
    globeRef.current.pointOfView({ lat: 10, lng: 95, altitude: 1.22 }, 0);

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
      : 'rgba(80,30,150,0.06)';
  }, []);

  const active = COUNTRIES_INFO[activeIdx];

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-visible">
      <div style={{ transform: 'translateY(8%)' }}>
        <Globe
          ref={globeRef}
          width={size.w}
          height={size.h}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          atmosphereColor="#670FC5"
          atmosphereAltitude={0.18}

          // Supported-country hex overlay (glowing purple)
          hexPolygonsData={countries.features}
          hexPolygonResolution={3}
          hexPolygonMargin={0.5}
          hexPolygonColor={hexColor}

          // Continuous radar-pulse rings — immersive, replaces flying arcs
          ringsData={CITIES}
          ringLat={(d: any) => d.lat}
          ringLng={(d: any) => d.lng}
          ringColor={() => (t: number) => `rgba(192,132,252,${Math.max(0, 0.9 * (1 - t * 1.1))})`}
          ringMaxRadius={5.5}
          ringPropagationSpeed={3.5}
          ringRepeatPeriod={1100}

          // Bright city dots
          pointsData={CITIES}
          pointLat={(d: any) => d.lat}
          pointLng={(d: any) => d.lng}
          pointColor={() => '#f3e8ff'}
          pointAltitude={0.02}
          pointRadius={0.55}
          pointsMerge={false}

          // City labels
          labelsData={CITIES}
          labelLat={(d: any) => d.lat}
          labelLng={(d: any) => d.lng}
          labelText={(d: any) => d.name}
          labelSize={0.5}
          labelColor={() => 'rgba(255,255,255,0.72)'}
          labelDotRadius={0.25}
          labelAltitude={0.018}
        />
      </div>

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
