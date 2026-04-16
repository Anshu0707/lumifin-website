import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import Globe from 'react-globe.gl';

// Only the 6 supported SEA countries — intra-network payment arcs
const ARCS = [
  { startLat: 13.7563, startLng: 100.5018, endLat: 1.3521,   endLng: 103.8198, label: 'Bangkok → Singapore',      flag: '🇹🇭→🇸🇬' },
  { startLat: 1.3521,  startLng: 103.8198, endLat: 3.1390,   endLng: 101.6869, label: 'Singapore → Kuala Lumpur', flag: '🇸🇬→🇲🇾' },
  { startLat: 3.1390,  startLng: 101.6869, endLat: -6.2088,  endLng: 106.8456, label: 'Kuala Lumpur → Jakarta',   flag: '🇲🇾→🇮🇩' },
  { startLat: -6.2088, startLng: 106.8456, endLat: -8.4095,  endLng: 115.1889, label: 'Jakarta → Bali',           flag: '🇮🇩→🇮🇩' },
  { startLat: 13.7563, startLng: 100.5018, endLat: 11.5624,  endLng: 104.9160, label: 'Bangkok → Phnom Penh',     flag: '🇹🇭→🇰🇭' },
  { startLat: 11.5624, startLng: 104.9160, endLat: 10.8231,  endLng: 106.6297, label: 'Phnom Penh → Ho Chi Minh', flag: '🇰🇭→🇻🇳' },
  { startLat: 10.8231, startLng: 106.6297, endLat: 1.3521,   endLng: 103.8198, label: 'Ho Chi Minh → Singapore',  flag: '🇻🇳→🇸🇬' },
  { startLat: 1.3521,  startLng: 103.8198, endLat: 14.5995,  endLng: 120.9842, label: 'Singapore → Manila',       flag: '🇸🇬→🇵🇭' },
];

// Supported SEA city dots only
const CITIES = [
  { lat: 13.7563,  lng: 100.5018, name: 'Bangkok',       network: 'PromptPay', color: '#c084fc' },
  { lat: -8.4095,  lng: 115.1889, name: 'Bali',          network: 'QRIS',      color: '#a855f7' },
  { lat: -6.2088,  lng: 106.8456, name: 'Jakarta',       network: 'QRIS',      color: '#a855f7' },
  { lat: 10.8231,  lng: 106.6297, name: 'Ho Chi Minh',   network: 'VietQR',    color: '#c084fc' },
  { lat: 3.1390,   lng: 101.6869, name: 'Kuala Lumpur',  network: 'DuitNow',   color: '#a855f7' },
  { lat: 14.5995,  lng: 120.9842, name: 'Manila',        network: 'InstaPay',  color: '#c084fc' },
  { lat: 11.5624,  lng: 104.9160, name: 'Phnom Penh',    network: 'KHQR',      color: '#9333ea' },
  { lat: 1.3521,   lng: 103.8198, name: 'Singapore',     network: 'PayNow',    color: '#e879f9' },
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

  // Auto-rotate + zoom in tightly on SEA
  useEffect(() => {
    if (!globeRef.current) return;
    globeRef.current.controls().autoRotate = true;
    globeRef.current.controls().autoRotateSpeed = 0.5;
    globeRef.current.controls().enableZoom = false;
    // Centered on SEA, altitude 1.05 = tight zoom so cities are clearly visible
    globeRef.current.pointOfView({ lat: 5, lng: 112, altitude: 1.05 }, 0);
  }, []);

  // Cycle active arc label
  useEffect(() => {
    const timer = setInterval(() => setActiveArc(p => (p + 1) % ARCS.length), 2200);
    return () => clearInterval(timer);
  }, []);

  const arc = ARCS[activeArc];

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <Globe
        ref={globeRef}
        width={size.w}
        height={size.h}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        atmosphereColor="#8b5cf6"
        atmosphereAltitude={0.15}
        // Payment flow arcs
        arcsData={ARCS}
        arcStartLat={(d: any) => d.startLat}
        arcStartLng={(d: any) => d.startLng}
        arcEndLat={(d: any) => d.endLat}
        arcEndLng={(d: any) => d.endLng}
        arcColor={() => ['rgba(103,15,197,0)', 'rgba(192,132,252,1)', 'rgba(103,15,197,0)']}
        arcAltitude={0.2}
        arcStroke={1.0}
        arcDashLength={0.5}
        arcDashGap={0.15}
        arcDashAnimateTime={1800}
        // City dots — larger radius so they're clearly visible when zoomed in
        pointsData={CITIES}
        pointLat={(d: any) => d.lat}
        pointLng={(d: any) => d.lng}
        pointColor={(d: any) => d.color}
        pointAltitude={0.02}
        pointRadius={0.7}
        pointsMerge={false}
        // City labels
        labelsData={CITIES}
        labelLat={(d: any) => d.lat}
        labelLng={(d: any) => d.lng}
        labelText={(d: any) => d.name}
        labelSize={0.7}
        labelColor={() => 'rgba(255,255,255,0.9)'}
        labelDotRadius={0.4}
        labelAltitude={0.025}
      />

      {/* Active route label */}
      <motion.div
        key={activeArc}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-3 text-center whitespace-nowrap"
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
