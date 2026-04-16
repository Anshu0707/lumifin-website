import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
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

export default function GlobeHero() {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 600, h: 600 });
  const [activeArc, setActiveArc] = useState(0);

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

  useEffect(() => {
    if (!globeRef.current) return;
    globeRef.current.controls().autoRotate = true;
    globeRef.current.controls().autoRotateSpeed = 0.15; // cinematic slow drift
    globeRef.current.controls().enableZoom = false;
    globeRef.current.pointOfView({ lat: 5, lng: 112, altitude: 0.4 }, 0);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setActiveArc(p => (p + 1) % ARCS.length), 2400);
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
        atmosphereColor="#2e1065"
        atmosphereAltitude={0.1}

        // Payment flow arcs
        arcsData={ARCS}
        arcStartLat={(d: any) => d.startLat}
        arcStartLng={(d: any) => d.startLng}
        arcEndLat={(d: any) => d.endLat}
        arcEndLng={(d: any) => d.endLng}
        arcColor={() => ['rgba(103,15,197,0)', 'rgba(216,180,254,0.85)', 'rgba(103,15,197,0)']}
        arcAltitude={0.12}
        arcStroke={0.65}
        arcDashLength={0.55}
        arcDashGap={0.1}
        arcDashAnimateTime={2000}

        // Bright city dots
        pointsData={CITIES}
        pointLat={(d: any) => d.lat}
        pointLng={(d: any) => d.lng}
        pointColor={() => '#e9d5ff'}
        pointAltitude={0.015}
        pointRadius={0.55}
        pointsMerge={false}

        // Radar-pulse rings — only the supported city areas pulse
        ringsData={CITIES}
        ringLat={(d: any) => d.lat}
        ringLng={(d: any) => d.lng}
        ringColor={() => (t: number) => `rgba(168,85,247,${Math.max(0, 1 - t * 1.4)})`}
        ringMaxRadius={3.5}
        ringPropagationSpeed={2.5}
        ringRepeatPeriod={1300}

        // City name labels
        labelsData={CITIES}
        labelLat={(d: any) => d.lat}
        labelLng={(d: any) => d.lng}
        labelText={(d: any) => d.name}
        labelSize={0.55}
        labelColor={() => 'rgba(255,255,255,0.88)'}
        labelDotRadius={0.3}
        labelAltitude={0.018}
      />

      {/* Active route pill */}
      <motion.div
        key={activeArc}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-xl border border-white/15 rounded-2xl px-5 py-3 text-center whitespace-nowrap"
      >
        <p className="text-[9px] text-white/40 font-black uppercase tracking-[0.2em] mb-0.5">
          Live Transfer
        </p>
        <p className="text-sm font-black text-white/90">{arc.label}</p>
        <p className="text-[10px] text-purple-400 font-semibold mt-0.5 tracking-wide">
          Zero markup · Instant
        </p>
      </motion.div>
    </div>
  );
}
