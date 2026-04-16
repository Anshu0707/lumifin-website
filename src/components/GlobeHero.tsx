import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import Globe from 'react-globe.gl';

// Payment flow arcs — Southeast Asian supported corridors only
const ARCS = [
  { startLat: 13.7563, startLng: 100.5018, endLat: 1.3521,   endLng: 103.8198, label: 'Bangkok → Singapore',        currency: 'S$' },
  { startLat: 1.3521,  startLng: 103.8198, endLat: 3.1390,   endLng: 101.6869, label: 'Singapore → Kuala Lumpur',   currency: 'RM' },
  { startLat: 3.1390,  startLng: 101.6869, endLat: -6.2088,  endLng: 106.8456, label: 'Kuala Lumpur → Jakarta',     currency: 'Rp' },
  { startLat: -6.2088, startLng: 106.8456, endLat: -8.4095,  endLng: 115.1889, label: 'Jakarta → Bali',             currency: 'Rp' },
  { startLat: 13.7563, startLng: 100.5018, endLat: 11.5624,  endLng: 104.9160, label: 'Bangkok → Phnom Penh',       currency: '៛' },
  { startLat: 11.5624, startLng: 104.9160, endLat: 10.8231,  endLng: 106.6297, label: 'Phnom Penh → Ho Chi Minh',   currency: '₫' },
  { startLat: 10.8231, startLng: 106.6297, endLat: 1.3521,   endLng: 103.8198, label: 'Ho Chi Minh → Singapore',    currency: 'S$' },
  { startLat: 1.3521,  startLng: 103.8198, endLat: 14.5995,  endLng: 120.9842, label: 'Singapore → Manila',         currency: '₱' },
];

// City dots — only countries we support
const CITIES = [
  { lat: 13.7563,  lng: 100.5018, name: 'Bangkok',      color: '#a855f7' },
  { lat: -8.4095,  lng: 115.1889, name: 'Bali',         color: '#670FC5' },
  { lat: 1.3521,   lng: 103.8198, name: 'Singapore',    color: '#a855f7' },
  { lat: 10.8231,  lng: 106.6297, name: 'Ho Chi Minh',  color: '#670FC5' },
  { lat: 3.1390,   lng: 101.6869, name: 'Kuala Lumpur', color: '#a855f7' },
  { lat: 14.5995,  lng: 120.9842, name: 'Manila',       color: '#670FC5' },
  { lat: -6.2088,  lng: 106.8456, name: 'Jakarta',      color: '#a855f7' },
  { lat: 11.5624,  lng: 104.9160, name: 'Phnom Penh',   color: '#9333ea' },
];

export default function GlobeHero() {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 600, h: 600 });
  const [activeArc, setActiveArc] = useState(0);

  // Resize observer
  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        const h = containerRef.current.offsetHeight;
        setSize({ w, h });
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Vertical (bottom-to-top) rotation via direct globe group X-axis spin
  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    controls.autoRotate = false;
    controls.enableZoom = false;
    globeRef.current.pointOfView({ lat: 10, lng: 95, altitude: 1.44 }, 0);

    let frame: number;
    let globeGroup: any = null;

    const tick = () => {
      // Resolve the group lazily — scene may not be populated on first render
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

  // Cycle active arc for the label display
  useEffect(() => {
    const t = setInterval(() => setActiveArc(p => (p + 1) % ARCS.length), 2200);
    return () => clearInterval(t);
  }, []);

  const arc = ARCS[activeArc];

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-visible">
      {/* Shift globe down ~8% of container height so the top doesn't crop */}
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
        // Arcs (payment flows)
        arcsData={ARCS}
        arcStartLat={(d: any) => d.startLat}
        arcStartLng={(d: any) => d.startLng}
        arcEndLat={(d: any) => d.endLat}
        arcEndLng={(d: any) => d.endLng}
        arcColor={() => ['rgba(103,15,197,0)', 'rgba(168,85,247,0.9)', 'rgba(103,15,197,0)']}
        arcAltitude={0.25}
        arcStroke={0.6}
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}
        // City dots
        pointsData={CITIES}
        pointLat={(d: any) => d.lat}
        pointLng={(d: any) => d.lng}
        pointColor={(d: any) => d.color}
        pointAltitude={0.01}
        pointRadius={0.4}
        pointsMerge={false}
        // City labels
        labelsData={CITIES}
        labelLat={(d: any) => d.lat}
        labelLng={(d: any) => d.lng}
        labelText={(d: any) => d.name}
        labelSize={0.55}
        labelColor={() => 'rgba(255,255,255,0.7)'}
        labelDotRadius={0.3}
        labelAltitude={0.015}
      />
      </div>

      {/* Active payment label */}
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
