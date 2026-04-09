import { useEffect, useRef } from "react";

// Smooth trailing cursor: a chain of dots where each follows the previous
// with a spring-like lerp, producing an elegant snake-trail effect.
const TRAIL_LENGTH = 22;
const PRIMARY = "139, 92, 246"; // purple-500 rgb, matches theme

export default function PaintCursor() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const isTouch =
      window.matchMedia("(hover: none)").matches || "ontouchstart" in window;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const container = containerRef.current;
    if (!container) return;
    if (isTouch || prefersReduced) {
      container.style.display = "none";
      return;
    }

    // Soft background spotlight that lags behind the pointer.
    const glow = document.createElement("div");
    glow.style.cssText = `position:fixed;left:0;top:0;width:460px;height:460px;border-radius:9999px;pointer-events:none;will-change:transform;background:radial-gradient(circle, rgba(${PRIMARY},0.14) 0%, rgba(${PRIMARY},0.05) 35%, rgba(${PRIMARY},0) 70%);`;
    container.appendChild(glow);
    let gx = window.innerWidth / 2;
    let gy = window.innerHeight / 2;

    const dots: HTMLDivElement[] = [];
    const xs = new Array(TRAIL_LENGTH).fill(window.innerWidth / 2);
    const ys = new Array(TRAIL_LENGTH).fill(window.innerHeight / 2);

    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const d = document.createElement("div");
      const progress = i / TRAIL_LENGTH;
      const size = 10 - progress * 8; // 10px -> 2px, slim
      const opacity = (1 - progress * 0.9) * 0.35;
      const glow = 14 - progress * 12;
      d.style.cssText = `position:fixed;left:0;top:0;width:${size}px;height:${size}px;border-radius:2px;pointer-events:none;will-change:transform;background:rgba(${PRIMARY},${opacity});box-shadow:0 0 ${glow}px ${glow / 3}px rgba(${PRIMARY},${opacity * 0.6});`;
      container.appendChild(d);
      dots.push(d);
    }

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let rafId = 0;
    const tick = () => {
      gx += (mx - gx) * 0.08;
      gy += (my - gy) * 0.08;
      glow.style.transform = `translate3d(${gx - 230}px, ${gy - 230}px, 0)`;
      xs[0] += (mx - xs[0]) * 0.35;
      ys[0] += (my - ys[0]) * 0.35;
      for (let i = 1; i < TRAIL_LENGTH; i++) {
        xs[i] += (xs[i - 1] - xs[i]) * 0.35;
        ys[i] += (ys[i - 1] - ys[i]) * 0.35;
      }
      for (let i = 0; i < TRAIL_LENGTH; i++) {
        const dot = dots[i];
        const half = dot.offsetWidth / 2;
        dot.style.transform = `translate3d(${xs[i] - half}px, ${ys[i] - half}px, 0) rotate(45deg)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      dots.forEach((d) => d.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999]"
    />
  );
}
