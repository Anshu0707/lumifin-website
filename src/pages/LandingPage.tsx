import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown,
  Wallet,
  ShieldCheck,
  Globe,
  Calendar,
  HeartHandshake,
  BadgeCheck,
  CheckCircle2,
  Menu,
  PiggyBank,
  Star,
  QrCode,
  Check,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FAQSection from "../components/FAQSection";
import Waitlist from "../components/Waitlist";
import SEO, { organizationSchema, websiteSchema, softwareApplicationSchema } from "../components/SEO";

/**
 * A muted, looping demo video that auto-plays only while it is on screen and
 * pauses when scrolled away — keeps the page light with several videos.
 * Browsers only allow autoplay when muted; a tap unmutes for sound.
 */
function AutoplayVideo({ src, poster, caption }: { src: string; poster: string; caption: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {
            /* autoplay may be blocked; the controls still allow manual play */
          });
        } else {
          el.pause();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="w-full h-full object-cover aspect-[3/4]"
      controls
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
    >
      <source src={src} type="video/mp4" />
      {caption}
    </video>
  );
}

export default function LandingPage() {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const journeyRef = useRef<HTMLDivElement>(null);
  const scrollZonesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const revealOnScroll = () => {
      reveals.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 50) {
          el.classList.add("active");
        }
      });
    };

    // Scroll-driven step detection based on scroll position within the journey container
    const handleScroll = () => {
      revealOnScroll();

      if (!journeyRef.current) return;
      const rect = journeyRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const scrollableHeight = rect.height - window.innerHeight;
      const scrollIntoSection = window.scrollY - sectionTop;

      if (scrollIntoSection < 0 || scrollIntoSection > scrollableHeight) return;

      const progress = scrollIntoSection / scrollableHeight;
      const stepCount = scrollZonesRef.current.length || 4;
      const newStep = Math.min(stepCount - 1, Math.floor(progress * stepCount));
      setActiveStep(newStep);
    };

    // Handle hash on mount
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    revealOnScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const steps = [
    {
      step: 1,
      title: t("journey.steps.1.title"),
      desc: t("journey.steps.1.desc"),
      icon: <Wallet className="text-primary w-12 h-12" />,
      mockup: (
        <img
          src="/assets/screens/Add Funds Cropped.webp"
          alt={t("journey.steps.1.alt")}
          loading="lazy"
          className="w-full h-full object-cover scale-[0.90]"
        />
      ),
    },
    {
      step: 2,
      title: t("journey.steps.2.title"),
      desc: t("journey.steps.2.desc"),
      icon: <QrCode className="text-primary w-12 h-12" />,
      mockup: (
        <div className="w-full h-full bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col">
          {/* Status bar */}
          <div className="flex justify-between items-center px-6 pt-4 pb-2 text-white/70 text-[10px] font-medium">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-3.5 h-2 border border-white/70 rounded-sm relative">
                <div className="absolute inset-[1px] right-[2px] bg-white/70 rounded-[1px]"></div>
              </div>
            </div>
          </div>
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
            <span className="text-white font-bold text-base">Scan QR Code</span>
          </div>
          {/* Scanner area */}
          <div className="flex-1 flex flex-col items-center justify-center px-8 relative">
            <div className="w-48 h-48 relative">
              {/* Corner brackets */}
              <div
                className="absolute top-0 left-0 w-8 h-8 border-t-[3px] border-l-[3px] rounded-tl-lg"
                style={{ borderColor: "#670FC5" }}
              ></div>
              <div
                className="absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px] rounded-tr-lg"
                style={{ borderColor: "#670FC5" }}
              ></div>
              <div
                className="absolute bottom-0 left-0 w-8 h-8 border-b-[3px] border-l-[3px] rounded-bl-lg"
                style={{ borderColor: "#670FC5" }}
              ></div>
              <div
                className="absolute bottom-0 right-0 w-8 h-8 border-b-[3px] border-r-[3px] rounded-br-lg"
                style={{ borderColor: "#670FC5" }}
              ></div>
              {/* Scanning line animation */}
              <div
                className="absolute left-2 right-2 h-[2px] top-1/2 animate-pulse"
                style={{
                  background:
                    "linear-gradient(to right, transparent, #670FC5, transparent)",
                }}
              ></div>
              {/* Thai Coffee Shop PromptPay QR */}
              <div className="absolute inset-2 flex flex-col items-center justify-center">
                <div className="bg-white rounded-xl w-full h-full flex flex-col shadow-lg overflow-hidden">
                  {/* Shop header - warm brown coffee theme */}
                  <div className="bg-[#3E2723] py-2 px-3 flex items-center justify-center gap-2">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 text-[#D7CCC8]"
                      fill="currentColor"
                    >
                      <path d="M2,21H20V19H2M20,8H18V5H20M20,3H4V13A4,4 0 0,0 8,17H14A4,4 0 0,0 18,13V10H20A2,2 0 0,0 22,8V5A2,2 0 0,0 20,3Z" />
                    </svg>
                    <span className="text-[8px] font-black text-[#D7CCC8] tracking-wide">
                      BORCELLE COFFEE
                    </span>
                  </div>
                  {/* PromptPay badge */}
                  <div className="flex items-center justify-center gap-1 py-1.5 bg-[#f0f4ff]">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-3 h-3 text-[#1e3a8a]"
                      fill="currentColor"
                    >
                      <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,7H13V13H11V7M11,15H13V17H11V15Z" />
                    </svg>
                    <span className="text-[6px] font-bold text-[#1e3a8a]">
                      PromptPay
                    </span>
                  </div>
                  {/* QR code area */}
                  <div className="flex-1 p-2 flex items-center justify-center relative">
                    <svg
                      viewBox="0 0 41 41"
                      className="w-full h-full"
                      shapeRendering="crispEdges"
                    >
                      {/* Top-left finder */}
                      <rect x="0" y="0" width="7" height="7" fill="#1e3a8a" />
                      <rect x="1" y="1" width="5" height="5" fill="white" />
                      <rect x="2" y="2" width="3" height="3" fill="#1e3a8a" />
                      {/* Top-right finder */}
                      <rect x="34" y="0" width="7" height="7" fill="#1e3a8a" />
                      <rect x="35" y="1" width="5" height="5" fill="white" />
                      <rect x="36" y="2" width="3" height="3" fill="#1e3a8a" />
                      {/* Bottom-left finder */}
                      <rect x="0" y="34" width="7" height="7" fill="#1e3a8a" />
                      <rect x="1" y="35" width="5" height="5" fill="white" />
                      <rect x="2" y="36" width="3" height="3" fill="#1e3a8a" />
                      {/* Alignment */}
                      <rect x="32" y="32" width="5" height="5" fill="#1e3a8a" />
                      <rect x="33" y="33" width="3" height="3" fill="white" />
                      <rect x="34" y="34" width="1" height="1" fill="#1e3a8a" />
                      {/* Timing H */}
                      {[8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32]
                        .filter((_, i) => i % 2 === 0)
                        .map((x) => (
                          <rect
                            key={`h${x}`}
                            x={x}
                            y="6"
                            width="1"
                            height="1"
                            fill="#1e3a8a"
                          />
                        ))}
                      {/* Timing V */}
                      {[8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32]
                        .filter((_, i) => i % 2 === 0)
                        .map((y) => (
                          <rect
                            key={`v${y}`}
                            x="6"
                            y={y}
                            width="1"
                            height="1"
                            fill="#1e3a8a"
                          />
                        ))}
                      {/* Data - dense realistic pattern */}
                      {[
                        [8, 0],
                        [9, 0],
                        [10, 1],
                        [11, 0],
                        [8, 1],
                        [8, 2],
                        [9, 2],
                        [11, 2],
                        [8, 3],
                        [10, 3],
                        [11, 3],
                        [9, 4],
                        [10, 4],
                        [8, 5],
                        [11, 5],
                        [9, 5],
                        [13, 0],
                        [14, 0],
                        [15, 1],
                        [16, 0],
                        [17, 1],
                        [18, 0],
                        [19, 0],
                        [20, 1],
                        [21, 0],
                        [22, 1],
                        [23, 0],
                        [24, 0],
                        [25, 1],
                        [26, 0],
                        [27, 1],
                        [28, 0],
                        [29, 0],
                        [30, 1],
                        [31, 0],
                        [32, 0],
                        [13, 1],
                        [15, 1],
                        [17, 1],
                        [19, 1],
                        [21, 1],
                        [23, 1],
                        [25, 1],
                        [27, 1],
                        [29, 1],
                        [31, 1],
                        [13, 2],
                        [14, 2],
                        [16, 2],
                        [18, 3],
                        [20, 2],
                        [22, 3],
                        [24, 2],
                        [26, 2],
                        [28, 3],
                        [30, 2],
                        [32, 2],
                        [13, 3],
                        [15, 4],
                        [17, 3],
                        [19, 4],
                        [21, 3],
                        [23, 4],
                        [25, 3],
                        [27, 4],
                        [29, 3],
                        [31, 4],
                        [13, 5],
                        [14, 5],
                        [16, 4],
                        [18, 5],
                        [20, 4],
                        [22, 5],
                        [24, 4],
                        [26, 5],
                        [28, 4],
                        [30, 5],
                        [32, 5],
                        [0, 8],
                        [1, 8],
                        [2, 8],
                        [3, 9],
                        [4, 8],
                        [5, 8],
                        [0, 9],
                        [2, 9],
                        [4, 9],
                        [0, 10],
                        [1, 10],
                        [3, 10],
                        [5, 10],
                        [0, 11],
                        [2, 11],
                        [4, 11],
                        [5, 11],
                        [0, 12],
                        [1, 13],
                        [3, 12],
                        [5, 13],
                        [0, 13],
                        [2, 13],
                        [4, 13],
                        [0, 14],
                        [2, 14],
                        [4, 14],
                        [5, 14],
                        [1, 15],
                        [3, 15],
                        [5, 15],
                        [8, 8],
                        [9, 9],
                        [10, 8],
                        [11, 9],
                        [12, 8],
                        [13, 9],
                        [14, 8],
                        [15, 8],
                        [16, 9],
                        [17, 8],
                        [18, 9],
                        [19, 8],
                        [20, 8],
                        [21, 9],
                        [22, 8],
                        [23, 9],
                        [24, 8],
                        [25, 8],
                        [26, 9],
                        [27, 8],
                        [28, 9],
                        [29, 8],
                        [30, 8],
                        [31, 9],
                        [32, 8],
                        [8, 9],
                        [10, 9],
                        [12, 9],
                        [14, 9],
                        [16, 9],
                        [18, 10],
                        [20, 9],
                        [22, 9],
                        [24, 9],
                        [26, 10],
                        [28, 10],
                        [30, 9],
                        [32, 9],
                        [8, 10],
                        [9, 10],
                        [11, 10],
                        [13, 10],
                        [15, 11],
                        [17, 10],
                        [19, 11],
                        [21, 10],
                        [23, 10],
                        [25, 11],
                        [27, 10],
                        [29, 10],
                        [31, 10],
                        [8, 11],
                        [10, 11],
                        [12, 11],
                        [14, 12],
                        [16, 11],
                        [18, 12],
                        [20, 11],
                        [22, 11],
                        [24, 12],
                        [26, 11],
                        [28, 11],
                        [30, 12],
                        [32, 11],
                        [8, 12],
                        [9, 12],
                        [11, 12],
                        [13, 13],
                        [15, 12],
                        [17, 13],
                        [19, 12],
                        [21, 13],
                        [23, 12],
                        [25, 12],
                        [27, 13],
                        [29, 12],
                        [31, 12],
                        [8, 13],
                        [10, 13],
                        [12, 13],
                        [14, 13],
                        [16, 14],
                        [18, 13],
                        [20, 14],
                        [22, 13],
                        [24, 13],
                        [26, 14],
                        [28, 13],
                        [30, 13],
                        [32, 14],
                        [34, 8],
                        [35, 8],
                        [36, 9],
                        [37, 8],
                        [38, 8],
                        [39, 9],
                        [40, 8],
                        [34, 9],
                        [36, 10],
                        [38, 9],
                        [40, 10],
                        [34, 10],
                        [35, 11],
                        [37, 10],
                        [39, 10],
                        [34, 11],
                        [36, 11],
                        [38, 12],
                        [40, 11],
                        [34, 12],
                        [35, 12],
                        [37, 13],
                        [39, 12],
                        [34, 13],
                        [36, 14],
                        [38, 13],
                        [40, 14],
                        [34, 14],
                        [35, 15],
                        [37, 14],
                        [39, 15],
                        [0, 16],
                        [1, 16],
                        [2, 17],
                        [3, 16],
                        [4, 17],
                        [5, 16],
                        [6, 16],
                        [8, 16],
                        [10, 16],
                        [12, 17],
                        [14, 16],
                        [16, 17],
                        [18, 16],
                        [20, 17],
                        [22, 16],
                        [24, 16],
                        [26, 17],
                        [28, 16],
                        [30, 17],
                        [32, 16],
                        [34, 16],
                        [36, 17],
                        [38, 16],
                        [40, 16],
                        [0, 18],
                        [2, 18],
                        [4, 19],
                        [8, 18],
                        [10, 19],
                        [12, 18],
                        [14, 18],
                        [16, 19],
                        [18, 18],
                        [20, 18],
                        [22, 19],
                        [24, 18],
                        [26, 18],
                        [28, 19],
                        [30, 18],
                        [32, 19],
                        [34, 18],
                        [36, 18],
                        [38, 19],
                        [40, 18],
                        [1, 20],
                        [3, 20],
                        [5, 20],
                        [8, 20],
                        [9, 20],
                        [11, 21],
                        [13, 20],
                        [15, 21],
                        [17, 20],
                        [19, 20],
                        [21, 21],
                        [23, 20],
                        [25, 21],
                        [27, 20],
                        [29, 20],
                        [31, 21],
                        [33, 20],
                        [35, 20],
                        [37, 21],
                        [39, 20],
                        [0, 22],
                        [2, 22],
                        [4, 22],
                        [8, 22],
                        [10, 22],
                        [12, 23],
                        [14, 22],
                        [16, 22],
                        [18, 23],
                        [20, 22],
                        [22, 22],
                        [24, 23],
                        [26, 22],
                        [28, 23],
                        [30, 22],
                        [32, 22],
                        [34, 22],
                        [36, 23],
                        [38, 22],
                        [40, 22],
                        [1, 24],
                        [3, 24],
                        [5, 24],
                        [8, 24],
                        [9, 25],
                        [11, 24],
                        [13, 24],
                        [15, 25],
                        [17, 24],
                        [19, 25],
                        [21, 24],
                        [23, 25],
                        [25, 24],
                        [27, 24],
                        [29, 25],
                        [31, 24],
                        [33, 25],
                        [35, 24],
                        [37, 24],
                        [39, 25],
                        [0, 26],
                        [2, 26],
                        [4, 27],
                        [8, 26],
                        [10, 26],
                        [12, 27],
                        [14, 26],
                        [16, 27],
                        [18, 26],
                        [20, 27],
                        [22, 26],
                        [24, 26],
                        [26, 27],
                        [28, 26],
                        [30, 27],
                        [32, 26],
                        [34, 26],
                        [36, 26],
                        [38, 27],
                        [40, 26],
                        [1, 28],
                        [3, 28],
                        [5, 28],
                        [8, 28],
                        [10, 29],
                        [12, 28],
                        [14, 29],
                        [16, 28],
                        [18, 28],
                        [20, 29],
                        [22, 28],
                        [24, 29],
                        [26, 28],
                        [28, 28],
                        [0, 30],
                        [2, 30],
                        [4, 30],
                        [8, 30],
                        [10, 30],
                        [12, 31],
                        [14, 30],
                        [16, 31],
                        [18, 30],
                        [20, 30],
                        [22, 31],
                        [24, 30],
                        [26, 30],
                        [1, 32],
                        [3, 32],
                        [5, 32],
                        [8, 32],
                        [9, 32],
                        [11, 33],
                        [13, 32],
                        [15, 32],
                        [17, 33],
                        [19, 32],
                        [21, 33],
                        [23, 32],
                        [25, 32],
                        [27, 33],
                        [8, 34],
                        [10, 34],
                        [12, 34],
                        [14, 35],
                        [16, 34],
                        [18, 35],
                        [20, 34],
                        [22, 34],
                        [24, 35],
                        [26, 34],
                        [28, 34],
                        [30, 34],
                        [32, 35],
                        [34, 34],
                        [36, 35],
                        [38, 34],
                        [40, 34],
                        [8, 36],
                        [9, 36],
                        [11, 36],
                        [13, 36],
                        [15, 37],
                        [17, 36],
                        [19, 37],
                        [21, 36],
                        [23, 36],
                        [25, 37],
                        [27, 36],
                        [29, 36],
                        [31, 37],
                        [33, 36],
                        [35, 36],
                        [37, 37],
                        [39, 36],
                        [8, 38],
                        [10, 38],
                        [12, 38],
                        [14, 39],
                        [16, 38],
                        [18, 38],
                        [20, 39],
                        [22, 38],
                        [24, 38],
                        [26, 39],
                        [28, 38],
                        [30, 39],
                        [32, 38],
                        [34, 38],
                        [36, 38],
                        [38, 39],
                        [40, 38],
                        [8, 40],
                        [9, 40],
                        [11, 40],
                        [13, 40],
                        [15, 40],
                        [17, 40],
                        [19, 40],
                        [21, 40],
                        [23, 40],
                        [25, 40],
                        [27, 40],
                        [29, 40],
                        [31, 40],
                        [33, 40],
                        [35, 40],
                        [37, 40],
                        [39, 40],
                      ].map(([x, y], i) => (
                        <rect
                          key={i}
                          x={x}
                          y={y}
                          width="1"
                          height="1"
                          fill="#1e3a8a"
                        />
                      ))}
                    </svg>
                    {/* Coffee cup center logo */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center border-2 border-[#3E2723] shadow-sm">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-4 h-4 text-[#3E2723]"
                          fill="currentColor"
                        >
                          <path d="M2,21H20V19H2M20,8H18V5H20M20,3H4V13A4,4 0 0,0 8,17H14A4,4 0 0,0 18,13V10H20A2,2 0 0,0 22,8V5A2,2 0 0,0 20,3Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  {/* Shop footer */}
                  <div className="text-center pb-1.5 pt-0.5 bg-[#EFEBE9]">
                    <span className="text-[6px] font-bold text-[#5D4037]">
                      Borcelle Coffee Shop
                    </span>
                    <span className="text-[5px] text-[#8D6E63] block">
                      Scan to pay · Bangkok
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-white/60 text-xs font-medium mt-6 text-center">
              Point your camera at a QR code
            </p>
            <p className="text-white/40 text-[10px] mt-1">
              Supports PromptPay, QRIS, VietQR & more
            </p>
          </div>
          {/* Bottom controls */}
          <div className="flex justify-center items-center gap-8 pb-10 pt-4">
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white/70"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
                  />
                </svg>
              </div>
              <span className="text-white/50 text-[9px] font-medium">
                Gallery
              </span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <div
                className="w-14 h-14 rounded-full border-2 flex items-center justify-center shadow-lg"
                style={{
                  backgroundColor: "rgba(103,15,197,0.2)",
                  borderColor: "#670FC5",
                  boxShadow: "0 10px 15px -3px rgba(103,15,197,0.2)",
                }}
              >
                <QrCode className="w-6 h-6" style={{ color: "#670FC5" }} />
              </div>
              <span className="text-white/50 text-[9px] font-medium">Scan</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white/70"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <span className="text-white/50 text-[9px] font-medium">
                Torch
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      step: 3,
      title: t("journey.steps.3.title"),
      desc: t("journey.steps.3.desc"),
      icon: <CheckCircle2 className="text-primary w-12 h-12" />,
      mockup: (
        <img
          src="/assets/screens/QR Scan 1.2.webp"
          alt={t("journey.steps.3.alt")}
          loading="lazy"
          className="w-full h-full object-cover scale-[0.92]"
        />
      ),
    },
    {
      step: 4,
      title: t("journey.steps.4.title"),
      desc: t("journey.steps.4.desc"),
      icon: <Check className="text-primary w-12 h-12" />,
      mockup: (
        <img
          src="/assets/screens/QR Scan 1.5 1.webp"
          alt={t("journey.steps.4.alt")}
          loading="lazy"
          className="w-full h-full object-contain scale-[1.14]"
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t('landing.seo.title')}
        description={t('landing.seo.description')}
        canonical="/"
        structuredData={[organizationSchema, websiteSchema, softwareApplicationSchema]}
        preloadImage="/assets/hero/landing-hero.webp"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt={t("hero.imgAlt")}
            className="w-full h-full object-cover"
            src="/assets/hero/landing-hero.webp"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <span className="inline-flex items-center bg-white/20 backdrop-blur-md text-white border border-white/30 px-5 py-2 rounded-full text-[12px] font-bold tracking-widest uppercase mb-8">
            {t("hero.badge")}
          </span>
          <h1 className="text-7xl md:text-[110px] font-black text-white text-editorial leading-[0.85] mb-10 tracking-tighter">
            <span className="sr-only">{t("hero.h1Keyword")}</span>
            <span aria-hidden="true">
              {t("hero.titleLine1")} <br />
              <span className="text-primary-fixed italic">{t("hero.titleLine2")}</span>.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => setShowVideo(true)}
              className="hero-gradient text-white px-12 py-6 rounded-2xl font-black text-xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all"
            >
              {t("hero.viewDemo")}
            </button>
            <button
              onClick={() => {
                const element = document.getElementById("waitlist");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="relative bg-yellow-400 text-slate-900 px-12 py-6 rounded-2xl font-black text-xl shadow-2xl shadow-yellow-400/40 hover:bg-yellow-300 hover:shadow-yellow-300/60 hover:-translate-y-1 transition-all"
            >
              <span className="absolute -top-3 -right-3 bg-slate-900 text-yellow-400 text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg animate-pulse">
                {t("hero.earnBadge")}
              </span>
              {t("hero.joinWaitlist")}
            </button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-white/70">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/15 text-white font-black text-sm">€</span>
            <span className="text-sm font-medium">{t("hero.sepaBadge")}</span>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-white w-8 h-8" />
        </div>
      </section>

      {/* Coverage Section */}
      <section
        id="destinations"
        className="py-32 px-8 max-w-7xl mx-auto reveal dot-grid"
      >
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-6">
            <span className="text-primary font-bold text-xs tracking-widest uppercase">
              {t("coverage.eyebrow")}
            </span>
            <h2 className="text-6xl font-black tracking-tighter text-slate-900">
              {t("coverage.title")}
            </h2>
            <p className="text-slate-500 max-w-xl text-lg font-medium">
              {t("coverage.descPrefix")}{" "}
              <span className="text-primary font-bold">{t("coverage.comingSoon")}</span>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            {
              name: t("coverage.countries.vietnam"),
              network: "VietQR",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBp0TIju-96DY_xjqr3kNDc5nGwTSRs9Mk8SclesK06t4vH_Lu079tXN9wiD1CbHNWlsNeoyk5L9MGlkDrLN-dWuvEowE1nKzjiC0ML44Y1J51xQkXHb0XV7iS7WdrdJZdBSTH3V2xcHTNcYsqJlIPdrwaKp3qGYPLSelTdNh7NujqzLVcgHkFzeWJ1EwPzoTu1oh7FqtTavzuZhuFlv1kgJrby7zvU6l_d6UuHgJOt2nvDtFn0xoClUXwdpAwV_yj05egAaQoqeuvZ",
              href: "/travel-money/vietnam",
              live: true,
            },
            {
              name: t("coverage.countries.thailand"),
              network: "PromptPay",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCADyKo_l8AkIwVsjIh0QFbFynTbtTTQGXE_82jvwwmf7HI1rUAxvo2gjS0XLGEIakqz70jBMljXEYZZjTXZlt84HPQ6D9AjeF5h_jUQy52xRGIGB9AkSF8ckqeuv-NfY-9ts9W3lkU7joA2dpRs8hvPBOkPBnYtEOjDDyx-6AUbFaR_veWBqMbqzbeudVq76Del8xfFq3l1i3tJ2T6-jP35gq3rNgKepTuY6pcLZduGmJRHe8GlyZfbuSW5Kj-5NIBGjeSKpwgnT0_",
              offset: true,
              href: "/travel-money/thailand",
            },
            {
              name: t("coverage.countries.indonesia"),
              network: "QRIS",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8ThdfhEs4iFj6rS3rzGySJ2URSwRMt3kO_tDRErE7zSdoyBDatO8rg2yOzvEiEP_gjJbcZRRlk2QG6ln1GeqpkflS7k_81SrSEZo-du91aBcAdGAkCVNfwIZB5bZxYZHH0yxPNjDIPwOSqJjp9nsAu0tJGFWBoKsz6Uw5dzWaaG9kTjTSxp1u9PlM9UFL01VfcdgQfivJxl5YOVKy9Tx_VSO7xkhFEoyqr9BU1VdGEtqCxkwTPvP5LVKgolUIjEcuP1r3ketchI2o",
              href: "/travel-money/indonesia",
            },
            {
              name: t("coverage.countries.malaysia"),
              network: "DuitNow",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC76seS9t7V8_AffElBUw7eS5o31U4F_9k_lzMjW-9F6z5mOy7Tl0sRKVCaO5RuRbGhENvxlrYjm41fjzGg0DHal8XTb3juGGNS4VDa2Yn5ehwN4AL8TXy2orc5H-d5yl1TlSk22Yf9Y-OxFr6kbG66cT_LjvSKmI_npSzN-ZpLuoeDUlS7qisoGy54sonVpkb83k7f7M5YOIzF8czWSXsZOmy3Isb1LTtnE3oGsj2PzIfUX1RkDz-RpzXz9hLiVsivExIGeJYY09c4",
              offset: true,
            },
            {
              name: t("coverage.countries.cambodia"),
              network: "KHQR",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_uKLa5un5fdEDTmXrAVPEI4NQHt510tdOM43-EF_ECZpvGA3EjHxhP1YPciKIgYl40D07XHoNvyY2iaa-SRTl4AFUFSnxl7pFdljro6P7p7NGS5KZ0Js4XCzAvj6IPC843k7vMjp76zXsolf0HroYN3VQyRYLVRERa7wGrJf0c_fIdLOGQ2nvlQUDljC-M-MTV_adHX7qlgA9OH9DDrFmwXZnhkzZJTohejfqDJsC_Cxm1SHGNPrZ6U4NzdUJL956A0l8i-ArwdY",
            },
            {
              name: t("coverage.countries.philippines"),
              network: "InstaPay",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_z_9AB6QwWo7um_GLFpnHmMo_ULSMKz6wB3M84GannKibvEEhFU-1ekomBHwAlhlVHhOU4iMvjYEpySS9gPfMU3q4CdDFabgtMyYB2984o0MbX_IVoxw9Nv_PFN9v1a03-eqhbvdgWCI9hR2ZN8CotqemumhqZhDglCM8tqYBBziwFfuBiOHj4hcwtv7xRDMjsBFeNz4sY4y_CLThPYeCHJzOncBWA-aMZSzDnCUwOT-BcHN1aSi50QpkUEQw0a-BuJ5xlvN6278",
              offset: true,
            },
          ].map((country, i) => {
            const isLive = country.live === true;
            const cardInner = (
              <>
                <img
                  alt={country.name}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${
                    isLive ? "" : "grayscale group-hover:grayscale-0"
                  }`}
                  src={country.img}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                {/* Status badge: Live (beta) for Vietnam, Coming soon for the rest */}
                <div className="absolute top-5 left-5">
                  {isLive ? (
                    <span className="inline-flex items-center gap-1.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                      {t("coverage.liveBadge")}
                    </span>
                  ) : (
                    <span className="inline-flex items-center bg-white/85 text-slate-600 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                      {t("coverage.comingSoonBadge")}
                    </span>
                  )}
                </div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">
                    {country.network}
                  </p>
                  <h3 className="text-2xl font-black">{country.name}</h3>
                </div>
              </>
            );
            const cardClass = `group relative overflow-hidden rounded-[2.5rem] h-[400px] shadow-xl hover:shadow-2xl transition-all cursor-pointer block ${
              country.offset ? "lg:mt-12" : ""
            } ${isLive ? "ring-4 ring-primary ring-offset-4 ring-offset-white" : "opacity-80 hover:opacity-100"}`;
            return country.href ? (
              <Link key={i} to={country.href} className={cardClass} aria-label={country.name}>
                {cardInner}
              </Link>
            ) : (
              <div key={i} className={cardClass}>
                {cardInner}
              </div>
            );
          })}
        </div>
      </section>

      {/* Logo Marquee Section */}
      <section className="py-20 border-y border-slate-100 overflow-hidden bg-white">
        <div className="flex whitespace-nowrap animate-scroll">
          {[0, 1, 2].map((copy) => (
            <div key={copy} className="flex items-center gap-24 px-12 shrink-0">
              {["InstaPay", "KHQR", "PromptPay", "QRIS", "VietQR", "DuitNow"].map(
                (logo, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-default"
                  >
                    <span className="text-2xl font-black tracking-tighter text-slate-900 italic">
                      {logo}
                    </span>
                  </div>
                ),
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="bg-slate-50 py-32 reveal">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-24 items-center">
          <div className="relative group">
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-primary/10 rounded-full blur-[80px] group-hover:bg-primary/20 transition-all"></div>
            <div className="aspect-square rounded-[4rem] overflow-hidden shadow-2xl relative z-10">
              <img
                alt={t("mission.imgAlt")}
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaEq9eYXoQVkKhvfkYgm6Ohg9imOHFSt8qf64AZgeD92i45IkJCAaJSEsez0E1Zv2rOonRYwYGEIwVuaV3jfN4eh5wkTUmFtl3DXHiogmhaZ1hqCiRkAGfBG5Ev4mcd2FxUAXsTYWLHn8CwpSvhpQXAe-nXWZJiNppcoJ7F5CBr4vckEb_5rpq9_7WBXymDXJm5WKsL06GvUJGIAF5P2jJ0yh8LQqdMKeezFZjnlm9SF5w2-GZWPqVZyMKXhT5GKn3sqvbGTs-AzM"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] group-hover:bg-secondary/20 transition-all"></div>
          </div>
          <div className="space-y-10">
            <span className="text-primary font-bold text-xs tracking-widest uppercase">
              {t("mission.eyebrow")}
            </span>
            <h2 className="text-6xl font-black tracking-tighter text-slate-900 leading-[0.9]">
              {t("mission.title")}
            </h2>
            <p className="text-xl text-slate-500 font-medium leading-relaxed">
              {t("mission.body")}
            </p>
            <div className="space-y-8 mt-10">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                  <Wallet className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {t("mission.features.phoneWallet.title")}
                  </h3>
                  <p className="text-slate-500 font-medium">
                    {t("mission.features.phoneWallet.desc")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-primary shrink-0">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {t("mission.features.instantTransparent.title")}
                  </h3>
                  <p className="text-slate-500 font-medium">
                    {t("mission.features.instantTransparent.desc")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                  <Globe className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {t("mission.features.payEverywhere.title")}
                  </h3>
                  <p className="text-slate-500 font-medium">
                    {t("mission.features.payEverywhere.desc")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-primary shrink-0">
                  <Calendar className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {t("mission.features.travelNowPayLater.title")}
                  </h3>
                  <p className="text-slate-500 font-medium">
                    {t("mission.features.travelNowPayLater.desc")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Lumi? Section */}
      <section
        id="team"
        className="py-32 bg-indigo-50/50 reveal overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid lg:grid-cols-5 gap-16 items-center">
            <div className="lg:col-span-3 space-y-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase mb-4">
                <HeartHandshake className="w-5 h-5" /> {t("whyLumi.badge")}
              </div>
              <h2 className="text-6xl font-black tracking-tighter text-slate-900 leading-[0.9]">
                {t("whyLumi.title")}
              </h2>
              <p className="text-2xl text-slate-800 font-semibold leading-relaxed">
                {t("whyLumi.body")}
              </p>
            </div>
            <div className="lg:col-span-2">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-[4rem] rotate-6 scale-95 blur-2xl"></div>
                <div className="relative bg-white/60 p-12 rounded-[4rem] shadow-2xl border border-white/40 backdrop-blur-xl">
                  <div className="space-y-6">
                    <div className="w-16 h-16 rounded-2xl hero-gradient flex items-center justify-center text-white shadow-xl shadow-primary/30 mb-8">
                      <BadgeCheck className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-6">
                      {t("whyLumi.cardTitle")}
                    </h3>
                    <ul className="space-y-6">
                      <li className="flex items-center gap-3">
                        <CheckCircle2 className="text-emerald-500 w-6 h-6" />
                        <span className="font-bold text-slate-700 text-lg">
                          {t("whyLumi.cardItem1")}
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle2 className="text-emerald-500 w-6 h-6" />
                        <span className="font-bold text-slate-700 text-lg">
                          {t("whyLumi.cardItem2")}
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle2 className="text-emerald-500 w-6 h-6" />
                        <span className="font-bold text-slate-700 text-lg">
                          {t("whyLumi.cardItem3")}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Journey Section */}
      <section id="journey" ref={journeyRef} className="py-32 bg-white reveal dot-grid">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-24 space-y-4">
            <span className="text-primary font-bold text-xs tracking-widest uppercase">
              {t("journey.eyebrow")}
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900">
              {t("journey.title")}
            </h2>
            <p className="text-slate-500 text-lg md:text-xl font-medium">
              {t("journey.subtitle")}
            </p>
          </div>

          {/* Scroll-driven journey: tall container creates scroll room, sticky overlay reacts to position */}
          <div className="relative" style={{ height: `${steps.length * 150}vh` }} ref={(el) => { if (el) journeyRef.current = el; }}>
            {/* Sticky phone + step card - stays visible while user scrolls through the tall container */}
            <div className="sticky top-24 z-10">
              {/* Step indicator dots */}
              <div className="flex gap-2 mb-4 md:mb-6 justify-center">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveStep(i);
                      // Scroll to corresponding position in the journey container
                      if (journeyRef.current) {
                        const sectionTop = journeyRef.current.getBoundingClientRect().top + window.scrollY;
                        const scrollableHeight = journeyRef.current.offsetHeight - window.innerHeight;
                        const targetScroll = sectionTop + (i / steps.length) * scrollableHeight;
                        window.scrollTo({ top: targetScroll, behavior: "smooth" });
                      }
                    }}
                    className={`rounded-full transition-all duration-500 ${activeStep === i ? "w-8 h-2 md:w-10 md:h-2.5 bg-primary" : "w-2 h-2 md:w-2.5 md:h-2.5 bg-slate-300 hover:bg-slate-400"}`}
                  />
                ))}
              </div>

              {/* Desktop: phone left, card on right */}
              <div className="hidden lg:flex items-center justify-center gap-12">
                {/* Phone mockup - desktop */}
                <div className="relative w-[300px] h-[580px] bg-slate-900 rounded-[3.5rem] p-1.5 shadow-[0_60px_120px_-20px_rgba(103,15,197,0.3)] border-[3px] border-slate-900 overflow-hidden shrink-0">
                  <div className="bg-white h-full w-full rounded-[3rem] flex flex-col relative overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                        className="flex-1 flex flex-col h-full"
                      >
                        {steps[activeStep].mockup}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Right card - always on right */}
                <div className="w-[480px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={{ duration: 0.4 }}
                      className="flex gap-6 p-8 rounded-[2.5rem] bg-white border-2 border-primary/20 shadow-lg"
                    >
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 font-black text-xl bg-primary text-white shadow-xl shadow-primary/20">
                        {steps[activeStep].step}
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-primary mb-2">
                          {steps[activeStep].title}
                        </h3>
                        <p className="text-slate-500 font-medium text-base leading-relaxed">
                          {steps[activeStep].desc}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Mobile: phone centered with card below */}
              <div className="lg:hidden flex flex-col items-center">
                <div className="relative w-[200px] h-[380px] bg-slate-900 rounded-[2.5rem] p-1 shadow-[0_40px_80px_-20px_rgba(103,15,197,0.3)] border-[2px] border-slate-900 overflow-hidden">
                  <div className="bg-white h-full w-full rounded-[2rem] flex flex-col relative overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                        className="flex-1 flex flex-col h-full"
                      >
                        {steps[activeStep].mockup}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Mobile step card below phone */}
                <div className="w-full max-w-md mt-6 px-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="flex gap-4 p-5 rounded-2xl bg-white border-2 border-primary/20 shadow-lg"
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-black text-base bg-primary text-white shadow-xl shadow-primary/20">
                        {steps[activeStep].step}
                      </div>
                      <div>
                        <h3 className="text-base font-black text-primary mb-1">
                          {steps[activeStep].title}
                        </h3>
                        <p className="text-slate-500 font-medium text-xs leading-relaxed">
                          {steps[activeStep].desc}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Gallery Section — real photos & videos of beta testers paying */}
      <section id="demo" className="py-32 bg-slate-50 reveal">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="text-primary font-bold text-xs tracking-widest uppercase">
              {t("demoGallery.eyebrow")}
            </span>
            <h2 className="text-6xl font-black tracking-tighter text-slate-900">
              {t("demoGallery.title")}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
              {t("demoGallery.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Hero: real VietQR payment on the boat */}
            <figure className="relative overflow-hidden rounded-[2rem] shadow-xl md:row-span-2 group">
              <img
                src="/assets/demo/demo-qr-payment-boat.webp"
                alt={t("demoGallery.items.boat")}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent text-white text-sm font-medium p-6 pt-16">
                {t("demoGallery.items.boat")}
              </figcaption>
            </figure>

            {/* Payment videos — muted, looping, auto-play when scrolled into view */}
            {[
              { src: "/assets/demo/demo-payment-1.mp4", poster: "/assets/demo/demo-poster-1.webp", key: "video1" },
              { src: "/assets/demo/demo-payment-2.mp4", poster: "/assets/demo/demo-poster-2.webp", key: "video2" },
              { src: "/assets/demo/demo-payment-3.mp4", poster: "/assets/demo/demo-poster-3.webp", key: "video3" },
              { src: "/assets/demo/demo-payment-4.mp4", poster: "/assets/demo/demo-poster-4.webp", key: "video4" },
              { src: "/assets/demo/demo-payment-5.mp4", poster: "/assets/demo/demo-poster-5.webp", key: "video5" },
            ].map((v) => (
              <figure key={v.key} className="relative overflow-hidden rounded-[2rem] shadow-xl bg-slate-900">
                <AutoplayVideo
                  src={v.src}
                  poster={v.poster}
                  caption={t("demoGallery.videoUnsupported")}
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent text-white text-sm font-medium p-6 pt-16 pointer-events-none">
                  {t(`demoGallery.items.${v.key}`)}
                </figcaption>
              </figure>
            ))}

            {/* Community photos */}
            <figure className="relative overflow-hidden rounded-[2rem] shadow-xl group">
              <img
                src="/assets/demo/demo-beta-testers-cafe-1.webp"
                alt={t("demoGallery.items.cafe1")}
                loading="lazy"
                className="w-full h-full object-cover aspect-[4/3] transition-transform duration-700 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent text-white text-sm font-medium p-6 pt-16">
                {t("demoGallery.items.cafe1")}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Fee Comparison Section */}
      <section id="fees" className="py-32 max-w-5xl mx-auto px-8 reveal">
        <div className="text-center mb-20 space-y-4">
          <span className="text-primary font-bold text-xs tracking-widest uppercase">
            {t("fees.eyebrow")}
          </span>
          <h2 className="text-6xl font-black tracking-tighter text-slate-900">
            {t("fees.title")}
          </h2>
          <p className="text-slate-500 text-xl font-medium">
            {t("fees.subtitle")}
          </p>
        </div>
        <div className="mb-12 flex justify-center">
          <div className="relative group inline-flex items-center gap-4 bg-primary/5 border-2 border-primary/20 px-8 py-4 rounded-2xl shadow-[0_0_40px_-10px_rgba(99,102,241,0.2)] hover:shadow-primary/30 transition-all duration-500">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
              <PiggyBank className="w-6 h-6" />
            </div>
            <p className="text-2xl md:text-3xl font-black tracking-tighter text-slate-900">
              {t("fees.savingsPrefix")} <span className="text-primary">{t("fees.savingsAmount")}</span> {t("fees.savingsMiddle")}{" "}
              <span className="text-primary">{t("fees.savingsPer")}</span>
            </p>
            <div className="absolute -inset-1 bg-primary/20 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          </div>
        </div>
        <div className="overflow-x-auto rounded-[3rem] border border-slate-100 shadow-sm bg-white p-2">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-400 text-[11px] uppercase tracking-[0.2em]">
                <th className="p-10 font-black">{t("fees.table.provider")}</th>
                <th className="p-10 font-black whitespace-nowrap">{t("fees.table.feeStructure")}</th>
                <th className="p-10 font-black text-right">
                  {t("fees.table.totalCost")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="bg-white shadow-[inset_4px_0_0_0_#670FC5,0_10px_40px_-15px_rgba(103,15,197,0.4)] relative z-10">
                <td className="p-10 font-black text-primary flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>{" "}
                  {t("fees.table.lumi")}
                </td>
                <td className="p-10 text-primary font-black text-lg">
                  {t("fees.table.lumiFee")}
                </td>
                <td className="p-10 text-primary font-black text-3xl text-right">
                  {t("fees.table.lumiTotal")}
                </td>
              </tr>
              {[
                {
                  name: t("fees.table.rows.airport.name"),
                  fee: t("fees.table.rows.airport.fee"),
                  surcharge: "0%",
                  total: t("fees.table.rows.airport.total"),
                },
                {
                  name: t("fees.table.rows.atm.name"),
                  fee: t("fees.table.rows.atm.fee"),
                  surcharge: "0%",
                  total: t("fees.table.rows.atm.total"),
                },
                {
                  name: t("fees.table.rows.card.name"),
                  fee: t("fees.table.rows.card.fee"),
                  surcharge: "0%",
                  total: t("fees.table.rows.card.total"),
                },
                {
                  name: t("fees.table.rows.cardFx.name"),
                  fee: t("fees.table.rows.cardFx.fee"),
                  surcharge: "0%",
                  total: t("fees.table.rows.cardFx.total"),
                },
              ].map((row, i) => (
                <tr
                  key={i}
                  className="group hover:bg-slate-50 transition-colors"
                >
                  <td className="p-10 font-bold text-slate-900 flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-slate-300"></div>{" "}
                    {row.name}
                  </td>
                  <td className="p-10 text-slate-500 font-medium">{row.fee}</td>
                  <td className="p-10 font-black text-slate-900 text-right">
                    {row.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pricing FAQ */}
        <div className="mt-16 space-y-6">
          <h3 className="text-2xl font-black text-slate-900 text-center">{t("fees.faqTitle")}</h3>
          <div className="space-y-4 max-w-3xl mx-auto">
            {(['q1', 'q2', 'q3'] as const).map((key) => (
              <details key={key} className="group border border-slate-200 rounded-2xl overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-slate-900 hover:text-primary transition-colors">
                  {t(`fees.faqs.${key}.question`)}
                  <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="px-6 pb-6 text-slate-500 font-medium leading-relaxed">
                  {t(`fees.faqs.${key}.answer`)}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-32 bg-slate-900 text-white px-8 reveal"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="space-y-6">
              <span className="text-primary font-bold uppercase tracking-widest text-xs">
                {t("services.eyebrow")}
              </span>
              <h2 className="text-6xl font-black tracking-tighter">
                {t("services.title")}
              </h2>
              <p className="text-slate-400 max-w-xl text-lg font-medium">
                {t("services.subtitle")}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: t("services.items.esim.title"),
                desc: t("services.items.esim.desc"),
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwzVHvzHYttICyFrNdszimbmzYe9sz8oUTdBs1ivHWlBmFgFLUfc8mXN_E6zjshSRZM5dA4Stb7-1y66wjDtPmysz6odGUfQZApggzTBeRD8TDR9y3YaaJR7HLmEvQQbUjynapyQF-geu7K6btTr7D0XLcsRUve4eBnUnRiAOfCxP3UDh-LBHiB-7ayQlMcz5IngOo1dZqo0-ydKJ3p40S3g_xIF7LOc8RVc_ebukJ8oESet-7sI30_hoSYDMFovUvE8W_0bcUloU",
              },
              {
                title: t("services.items.tours.title"),
                desc: t("services.items.tours.desc"),
                img: "/assets/places/Daily Tours.webp",
              },
              {
                title: t("services.items.restaurants.title"),
                desc: t("services.items.restaurants.desc"),
                img: "/assets/places/Restaurant.webp",
              },
            ].map((service, i) => (
              <div
                key={i}
                className="group relative rounded-[4rem] overflow-hidden aspect-[4/5] shadow-2xl"
              >
                <img
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  src={service.img}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-12 w-full space-y-5">
                  <h3 className="text-3xl font-black tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm font-medium">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nomad Stories Section */}
      <section className="py-32 bg-slate-50 reveal">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20 space-y-6">
            <span className="text-primary font-bold text-xs tracking-widest uppercase">
              {t("stories.eyebrow")}
            </span>
            <h2 className="text-6xl font-black tracking-tighter text-slate-900">
              {t("stories.title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {[
              {
                name: t("stories.items.maryem.name"),
                role: t("stories.items.maryem.role"),
                text: t("stories.items.maryem.text"),
                photo: "/assets/testimonial-maryem.webp",
              },
              {
                name: t("stories.items.brice.name"),
                role: t("stories.items.brice.role"),
                text: t("stories.items.brice.text"),
                photo: null,
              },
            ].map((story, i) => (
              <div
                key={i}
                className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100 space-y-10 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xl text-slate-600 font-medium leading-relaxed italic">
                    "{story.text}"
                  </p>
                </div>
                <div className="flex items-center gap-5">
                  {story.photo ? (
                    <img
                      src={story.photo}
                      alt={story.name}
                      loading="lazy"
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xl">
                      {story.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-black text-slate-900">{story.name}</p>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                      {story.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Waitlist Section */}
      <Waitlist />

      <Footer />

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-900/90 backdrop-blur-sm"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/20 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
              <iframe
                src="https://www.youtube.com/embed/05qmIJWLN1Q?autoplay=1&rel=0"
                title={t("hero.videoTitle")}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
