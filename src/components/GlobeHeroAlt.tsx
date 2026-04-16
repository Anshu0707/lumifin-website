import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import Globe from 'react-globe.gl';

// Same SEA-only corridors as the main GlobeHero
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
  { lat: 13.7563,  lng: 100.5018, name: 'Bangkok' },
  { lat: -8.4095,  lng: 115.1889, name: 'Bali' },
  { lat: 1.3521,   lng: 103.8198, name: 'Singapore' },
  { lat: 10.8231,  lng: 106.6297, name: 'Ho Chi Minh' },
  { lat: 3.1390,   lng: 101.6869, name: 'Kuala Lumpur' },
  { lat: 14.5995,  lng: 120.9842, name: 'Manila' },
  { lat: -6.2088,  lng: 106.8456, name: 'Jakarta' },
  { lat: 11.5624,  lng: 104.9160, name: 'Phnom Penh' },
];

// SEA country names in the ne_110m dataset — highlighted brighter
const SEA = new Set([
  'Thailand', 'Singapore', 'Malaysia', 'Indonesia',
  'Vietnam', 'Viet Nam', 'Philippines', 'Cambodia',
  'Myanmar', 'Laos', 'Lao PDR', 'Brunei',
]);

export default function GlobeHeroAlt() {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 600, h: 600 });
  const [countries, setCountries] = useState<any>({ features: [] });
  const [activeArc, setActiveArc] = useState(0);

  // Load world countries for hex-polygon holographic overlay
  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson'
    )
      .then(r => r.json())
      .then(setCountries)
      .catch(() => {});
  }, []);

  // Resize
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

  // Vertical (bottom-to-top) rotation + dark sphere material
  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    controls.autoRotate = false;
    controls.enableZoom = false;
    globeRef.current.pointOfView({ lat: 10, lng: 95, altitude: 1.22 }, 0);

    let frame: number;
    let globeGroup: any = null;
    let materialSet = false;

    const tick = () => {
      if (!globeGroup && globeRef.current) {
        const scene = globeRef.current.scene();
        globeGroup = scene?.children.find((c: any) => c.isGroup);
      }
      // Set sphere color to blend with dark background — runs once
      if (!materialSet && globeRef.current?.globeMaterial) {
        const mat = globeRef.current.globeMaterial();
        if (mat) {
          mat.color.setHex(0x04000e);
          mat.emissive.setHex(0x0d0025);
          mat.emissiveIntensity = 0.35;
          materialSet = true;
        }
      }
      if (globeGroup) globeGroup.rotation.x -= 0.0005;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveArc(p => (p + 1) % ARCS.length), 2200);
    return () => clearInterval(t);
  }, []);

  const hexColor = useCallback((feat: any) => {
    const name: string = feat?.properties?.NAME ?? feat?.properties?.NAME_EN ?? '';
    return SEA.has(name)
      ? 'rgba(168,85,247,0.75)'   // SEA — glowing purple
      : 'rgba(103,15,197,0.18)';  // rest of world — faint
  }, []);

  const arc = ARCS[activeArc];

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-visible">
      <div style={{ transform: 'translateY(8%)' }}>
        <Globe
          ref={globeRef}
          width={size.w}
          height={size.h}
          backgroundColor="rgba(0,0,0,0)"

          // No satellite texture — the sphere is a flat dark color
          globeImageUrl={null as any}

          // Purple atmosphere blends into page background
          showAtmosphere
          atmosphereColor="#670FC5"
          atmosphereAltitude={0.2}

          // Holographic hex-polygon countries
          hexPolygonsData={countries.features}
          hexPolygonResolution={3}
          hexPolygonMargin={0.45}
          hexPolygonColor={hexColor}

          // Payment flow arcs (brighter on dark sphere)
          arcsData={ARCS}
          arcStartLat={(d: any) => d.startLat}
          arcStartLng={(d: any) => d.startLng}
          arcEndLat={(d: any) => d.endLat}
          arcEndLng={(d: any) => d.endLng}
          arcColor={() => ['rgba(168,85,247,0)', 'rgba(236,216,255,1)', 'rgba(168,85,247,0)']}
          arcAltitude={0.22}
          arcStroke={0.9}
          arcDashLength={0.4}
          arcDashGap={0.15}
          arcDashAnimateTime={1800}

          // City dots
          pointsData={CITIES}
          pointLat={(d: any) => d.lat}
          pointLng={(d: any) => d.lng}
          pointColor={() => '#f3e8ff'}
          pointAltitude={0.02}
          pointRadius={0.55}
          pointsMerge={false}

          // Radar-pulse rings on every supported city
          ringsData={CITIES}
          ringLat={(d: any) => d.lat}
          ringLng={(d: any) => d.lng}
          ringColor={() => (t: number) => `rgba(192,132,252,${Math.max(0, 0.75 * (1 - t * 1.2))})`}
          ringMaxRadius={4.2}
          ringPropagationSpeed={2.6}
          ringRepeatPeriod={1300}

          // Minimal city labels
          labelsData={CITIES}
          labelLat={(d: any) => d.lat}
          labelLng={(d: any) => d.lng}
          labelText={(d: any) => d.name}
          labelSize={0.5}
          labelColor={() => 'rgba(255,255,255,0.75)'}
          labelDotRadius={0.25}
          labelAltitude={0.018}
        />
      </div>

      {/* Active route pill */}
      <motion.div
        key={activeArc}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-3 text-center"
      >
        <p className="text-[10px] text-white/50 font-black uppercase tracking-widest mb-0.5">
          Live Transfer
        </p>
        <p className="text-sm font-black text-white">{arc.label}</p>
        <p className="text-xs text-primary font-bold mt-0.5">Zero markup · Instant</p>
      </motion.div>
    </div>
  );
}
