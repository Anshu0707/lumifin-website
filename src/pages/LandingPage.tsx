import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  User, 
  PiggyBank, 
  Star,
  QrCode,
  Check,
  X
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FAQSection from '../components/FAQSection';
import Waitlist from '../components/Waitlist';

export default function LandingPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const journeyRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef(0);

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
      reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 50) {
          el.classList.add('active');
        }
      });
    };

    const handleScroll = () => {
      revealOnScroll();
      
      if (!journeyRef.current) return;
      
      const now = Date.now();
      if (now - lastScrollTime.current < 1000) return; // Slow down scroll switching

      const rect = journeyRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const scrollPos = window.scrollY + window.innerHeight / 2;
      const sectionTop = rect.top + window.scrollY;
      
      if (scrollPos > sectionTop && scrollPos < sectionTop + sectionHeight) {
        // We are in the journey section
        // This is a simple heuristic, we can improve it
      }
    };

    // Handle hash on mount
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }

    window.addEventListener('scroll', handleScroll);
    revealOnScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const steps = [
    { 
      step: 1, 
      title: "Fund Your Wallet", 
      desc: "Add money to your Lumi wallet in your home currency. Quick, secure, and ready to use anywhere.",
      icon: <Wallet className="text-primary w-12 h-12" />,
      mockup: (
        <img src="/Add Funds 1.3.png" alt="Fund Wallet" className="w-full h-full object-cover" />
      )
    },
    {
      step: 2,
      title: "Scan QR Code",
      desc: "Lumi supports all major local QR payment standards across South East Asia. Just point and scan at any street stall or mall.",
      icon: <QrCode className="text-primary w-12 h-12" />,
      mockup: (
        <div className="w-full h-full bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col">
          {/* Status bar */}
          <div className="flex justify-between items-center px-6 pt-4 pb-2 text-white/70 text-[10px] font-medium">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-3.5 h-2 border border-white/70 rounded-sm relative"><div className="absolute inset-[1px] right-[2px] bg-white/70 rounded-[1px]"></div></div>
            </div>
          </div>
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </div>
            <span className="text-white font-bold text-base">Scan QR Code</span>
          </div>
          {/* Scanner area */}
          <div className="flex-1 flex flex-col items-center justify-center px-8 relative">
            <div className="w-48 h-48 relative">
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-[3px] border-l-[3px] rounded-tl-lg" style={{ borderColor: '#670FC5' }}></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px] rounded-tr-lg" style={{ borderColor: '#670FC5' }}></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[3px] border-l-[3px] rounded-bl-lg" style={{ borderColor: '#670FC5' }}></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[3px] border-r-[3px] rounded-br-lg" style={{ borderColor: '#670FC5' }}></div>
              {/* Scanning line animation */}
              <div className="absolute left-2 right-2 h-[2px] top-1/2 animate-pulse" style={{ background: 'linear-gradient(to right, transparent, #670FC5, transparent)' }}></div>
              {/* Thai Coffee Shop PromptPay QR */}
              <div className="absolute inset-2 flex flex-col items-center justify-center">
                <div className="bg-white rounded-xl w-full h-full flex flex-col shadow-lg overflow-hidden">
                  {/* Shop header - warm brown coffee theme */}
                  <div className="bg-[#3E2723] py-2 px-3 flex items-center justify-center gap-2">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#D7CCC8]" fill="currentColor">
                      <path d="M2,21H20V19H2M20,8H18V5H20M20,3H4V13A4,4 0 0,0 8,17H14A4,4 0 0,0 18,13V10H20A2,2 0 0,0 22,8V5A2,2 0 0,0 20,3Z"/>
                    </svg>
                    <span className="text-[8px] font-black text-[#D7CCC8] tracking-wide">BORCELLE COFFEE</span>
                  </div>
                  {/* PromptPay badge */}
                  <div className="flex items-center justify-center gap-1 py-1.5 bg-[#f0f4ff]">
                    <svg viewBox="0 0 24 24" className="w-3 h-3 text-[#1e3a8a]" fill="currentColor">
                      <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,7H13V13H11V7M11,15H13V17H11V15Z"/>
                    </svg>
                    <span className="text-[6px] font-bold text-[#1e3a8a]">PromptPay</span>
                  </div>
                  {/* QR code area */}
                  <div className="flex-1 p-2 flex items-center justify-center relative">
                    <svg viewBox="0 0 41 41" className="w-full h-full" shapeRendering="crispEdges">
                      {/* Top-left finder */}
                      <rect x="0" y="0" width="7" height="7" fill="#1e3a8a"/><rect x="1" y="1" width="5" height="5" fill="white"/><rect x="2" y="2" width="3" height="3" fill="#1e3a8a"/>
                      {/* Top-right finder */}
                      <rect x="34" y="0" width="7" height="7" fill="#1e3a8a"/><rect x="35" y="1" width="5" height="5" fill="white"/><rect x="36" y="2" width="3" height="3" fill="#1e3a8a"/>
                      {/* Bottom-left finder */}
                      <rect x="0" y="34" width="7" height="7" fill="#1e3a8a"/><rect x="1" y="35" width="5" height="5" fill="white"/><rect x="2" y="36" width="3" height="3" fill="#1e3a8a"/>
                      {/* Alignment */}
                      <rect x="32" y="32" width="5" height="5" fill="#1e3a8a"/><rect x="33" y="33" width="3" height="3" fill="white"/><rect x="34" y="34" width="1" height="1" fill="#1e3a8a"/>
                      {/* Timing H */}
                      {[8,10,12,14,16,18,20,22,24,26,28,30,32].filter((_,i)=>i%2===0).map(x=><rect key={`h${x}`} x={x} y="6" width="1" height="1" fill="#1e3a8a"/>)}
                      {/* Timing V */}
                      {[8,10,12,14,16,18,20,22,24,26,28,30,32].filter((_,i)=>i%2===0).map(y=><rect key={`v${y}`} x="6" y={y} width="1" height="1" fill="#1e3a8a"/>)}
                      {/* Data - dense realistic pattern */}
                      {[
                        [8,0],[9,0],[10,1],[11,0],[8,1],[8,2],[9,2],[11,2],[8,3],[10,3],[11,3],[9,4],[10,4],[8,5],[11,5],[9,5],
                        [13,0],[14,0],[15,1],[16,0],[17,1],[18,0],[19,0],[20,1],[21,0],[22,1],[23,0],[24,0],[25,1],[26,0],[27,1],[28,0],[29,0],[30,1],[31,0],[32,0],
                        [13,1],[15,1],[17,1],[19,1],[21,1],[23,1],[25,1],[27,1],[29,1],[31,1],
                        [13,2],[14,2],[16,2],[18,3],[20,2],[22,3],[24,2],[26,2],[28,3],[30,2],[32,2],
                        [13,3],[15,4],[17,3],[19,4],[21,3],[23,4],[25,3],[27,4],[29,3],[31,4],
                        [13,5],[14,5],[16,4],[18,5],[20,4],[22,5],[24,4],[26,5],[28,4],[30,5],[32,5],
                        [0,8],[1,8],[2,8],[3,9],[4,8],[5,8],[0,9],[2,9],[4,9],
                        [0,10],[1,10],[3,10],[5,10],[0,11],[2,11],[4,11],[5,11],
                        [0,12],[1,13],[3,12],[5,13],[0,13],[2,13],[4,13],
                        [0,14],[2,14],[4,14],[5,14],[1,15],[3,15],[5,15],
                        [8,8],[9,9],[10,8],[11,9],[12,8],[13,9],[14,8],[15,8],[16,9],[17,8],[18,9],[19,8],[20,8],
                        [21,9],[22,8],[23,9],[24,8],[25,8],[26,9],[27,8],[28,9],[29,8],[30,8],[31,9],[32,8],
                        [8,9],[10,9],[12,9],[14,9],[16,9],[18,10],[20,9],[22,9],[24,9],[26,10],[28,10],[30,9],[32,9],
                        [8,10],[9,10],[11,10],[13,10],[15,11],[17,10],[19,11],[21,10],[23,10],[25,11],[27,10],[29,10],[31,10],
                        [8,11],[10,11],[12,11],[14,12],[16,11],[18,12],[20,11],[22,11],[24,12],[26,11],[28,11],[30,12],[32,11],
                        [8,12],[9,12],[11,12],[13,13],[15,12],[17,13],[19,12],[21,13],[23,12],[25,12],[27,13],[29,12],[31,12],
                        [8,13],[10,13],[12,13],[14,13],[16,14],[18,13],[20,14],[22,13],[24,13],[26,14],[28,13],[30,13],[32,14],
                        [34,8],[35,8],[36,9],[37,8],[38,8],[39,9],[40,8],
                        [34,9],[36,10],[38,9],[40,10],[34,10],[35,11],[37,10],[39,10],
                        [34,11],[36,11],[38,12],[40,11],[34,12],[35,12],[37,13],[39,12],
                        [34,13],[36,14],[38,13],[40,14],[34,14],[35,15],[37,14],[39,15],
                        [0,16],[1,16],[2,17],[3,16],[4,17],[5,16],[6,16],
                        [8,16],[10,16],[12,17],[14,16],[16,17],[18,16],[20,17],[22,16],[24,16],[26,17],[28,16],[30,17],[32,16],[34,16],[36,17],[38,16],[40,16],
                        [0,18],[2,18],[4,19],[8,18],[10,19],[12,18],[14,18],[16,19],[18,18],[20,18],[22,19],[24,18],[26,18],[28,19],[30,18],[32,19],[34,18],[36,18],[38,19],[40,18],
                        [1,20],[3,20],[5,20],[8,20],[9,20],[11,21],[13,20],[15,21],[17,20],[19,20],[21,21],[23,20],[25,21],[27,20],[29,20],[31,21],[33,20],[35,20],[37,21],[39,20],
                        [0,22],[2,22],[4,22],[8,22],[10,22],[12,23],[14,22],[16,22],[18,23],[20,22],[22,22],[24,23],[26,22],[28,23],[30,22],[32,22],[34,22],[36,23],[38,22],[40,22],
                        [1,24],[3,24],[5,24],[8,24],[9,25],[11,24],[13,24],[15,25],[17,24],[19,25],[21,24],[23,25],[25,24],[27,24],[29,25],[31,24],[33,25],[35,24],[37,24],[39,25],
                        [0,26],[2,26],[4,27],[8,26],[10,26],[12,27],[14,26],[16,27],[18,26],[20,27],[22,26],[24,26],[26,27],[28,26],[30,27],[32,26],[34,26],[36,26],[38,27],[40,26],
                        [1,28],[3,28],[5,28],[8,28],[10,29],[12,28],[14,29],[16,28],[18,28],[20,29],[22,28],[24,29],[26,28],[28,28],
                        [0,30],[2,30],[4,30],[8,30],[10,30],[12,31],[14,30],[16,31],[18,30],[20,30],[22,31],[24,30],[26,30],
                        [1,32],[3,32],[5,32],[8,32],[9,32],[11,33],[13,32],[15,32],[17,33],[19,32],[21,33],[23,32],[25,32],[27,33],
                        [8,34],[10,34],[12,34],[14,35],[16,34],[18,35],[20,34],[22,34],[24,35],[26,34],[28,34],[30,34],[32,35],[34,34],[36,35],[38,34],[40,34],
                        [8,36],[9,36],[11,36],[13,36],[15,37],[17,36],[19,37],[21,36],[23,36],[25,37],[27,36],[29,36],[31,37],[33,36],[35,36],[37,37],[39,36],
                        [8,38],[10,38],[12,38],[14,39],[16,38],[18,38],[20,39],[22,38],[24,38],[26,39],[28,38],[30,39],[32,38],[34,38],[36,38],[38,39],[40,38],
                        [8,40],[9,40],[11,40],[13,40],[15,40],[17,40],[19,40],[21,40],[23,40],[25,40],[27,40],[29,40],[31,40],[33,40],[35,40],[37,40],[39,40],
                      ].map(([x, y], i) => (
                        <rect key={i} x={x} y={y} width="1" height="1" fill="#1e3a8a"/>
                      ))}
                    </svg>
                    {/* Coffee cup center logo */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center border-2 border-[#3E2723] shadow-sm">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#3E2723]" fill="currentColor">
                          <path d="M2,21H20V19H2M20,8H18V5H20M20,3H4V13A4,4 0 0,0 8,17H14A4,4 0 0,0 18,13V10H20A2,2 0 0,0 22,8V5A2,2 0 0,0 20,3Z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  {/* Shop footer */}
                  <div className="text-center pb-1.5 pt-0.5 bg-[#EFEBE9]">
                    <span className="text-[6px] font-bold text-[#5D4037]">Borcelle Coffee Shop</span>
                    <span className="text-[5px] text-[#8D6E63] block">Scan to pay  ·  Bangkok</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-white/60 text-xs font-medium mt-6 text-center">Point your camera at a QR code</p>
            <p className="text-white/40 text-[10px] mt-1">Supports PromptPay, QRIS, VietQR & more</p>
          </div>
          {/* Bottom controls */}
          <div className="flex justify-center items-center gap-8 pb-10 pt-4">
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" /></svg>
              </div>
              <span className="text-white/50 text-[9px] font-medium">Gallery</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-14 h-14 rounded-full border-2 flex items-center justify-center shadow-lg" style={{ backgroundColor: 'rgba(103,15,197,0.2)', borderColor: '#670FC5', boxShadow: '0 10px 15px -3px rgba(103,15,197,0.2)' }}>
                <QrCode className="w-6 h-6" style={{ color: '#670FC5' }} />
              </div>
              <span className="text-white/50 text-[9px] font-medium">Scan</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              </div>
              <span className="text-white/50 text-[9px] font-medium">Torch</span>
            </div>
          </div>
        </div>
      )
    },
    {
      step: 3,
      title: "Verify Amount",
      desc: "See the exact amount both in local currency and in your home currency instantly. No guesswork or hidden margins.",
      icon: <CheckCircle2 className="text-primary w-12 h-12" />,
      mockup: (
        <img src="/QR Scan 1.2.png" alt="Verify Amount" className="w-full h-full object-cover" />
      )
    },
    {
      step: 4,
      title: "Success!",
      desc: "Instant confirmation sent to the merchant. Walk away with a digital receipt and zero stress.",
      icon: <Check className="text-primary w-12 h-12" />,
      mockup: (
        <img src="/QR Scan 1.5.png" alt="Success" className="w-full h-full object-cover" />
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Cinematic aerial view" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCHioVLgm-I7vY0esq7II6hPpcDBRhm3BgftQY8ZDTH0bNMOmPksNlMOW1VIG-Elwtq3JPQ2erK2e8EeeBlAMo3EJeich0bUPqbuwTETMGThcbIHXxHTvNyovfPgEjX6ACRcQ1cWtHdX5ubIkiC3tkCDckJXtHkl497BZndFKqaiy9nP5Jpn8smXuDu7PdAbDekl4_CILESdMdpI_ofUhYE4eJpP5GhHDcUFIEHktIcfCnqrf8uKEEaOiDIuTruLraa4Rl_KuLb7jF" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <span className="inline-flex items-center bg-white/20 backdrop-blur-md text-white border border-white/30 px-5 py-2 rounded-full text-[12px] font-bold tracking-widest uppercase mb-8">
            Redefining SOUTH EAST Asia Travel
          </span>
          <h1 className="text-7xl md:text-[110px] font-black text-white text-editorial leading-[0.85] mb-10 tracking-tighter">
            Pay Like a <br /><span className="text-primary-fixed italic">Local</span>.
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Seamlessly navigate South East Asia, and beyond with instant QR payments.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => setShowVideo(true)}
              className="hero-gradient text-white px-12 py-6 rounded-2xl font-black text-xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all"
            >
              View Demo
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('waitlist');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-12 py-6 rounded-2xl font-black text-xl hover:bg-white/20 transition-all"
            >
              Join the Waitlist
            </button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-white w-8 h-8" />
        </div>
      </section>

      {/* Coverage Section */}
      <section id="destinations" className="py-32 px-8 max-w-7xl mx-auto reveal">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-6">
            <span className="text-primary font-bold text-xs tracking-widest uppercase">Regional Network</span>
            <h2 className="text-6xl font-black tracking-tighter text-slate-900">6 Countries. One App.</h2>
            <p className="text-slate-500 max-w-xl text-lg font-medium">
              From the street food of Bangkok to the boutiques of Vietnam, LumiFin ensures your payments never fail. <span className="text-primary font-bold">COMING SOON IN</span>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { name: "Thailand", network: "PromptPay", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCADyKo_l8AkIwVsjIh0QFbFynTbtTTQGXE_82jvwwmf7HI1rUAxvo2gjS0XLGEIakqz70jBMljXEYZZjTXZlt84HPQ6D9AjeF5h_jUQy52xRGIGB9AkSF8ckqeuv-NfY-9ts9W3lkU7joA2dpRs8hvPBOkPBnYtEOjDDyx-6AUbFaR_veWBqMbqzbeudVq76Del8xfFq3l1i3tJ2T6-jP35gq3rNgKepTuY6pcLZduGmJRHe8GlyZfbuSW5Kj-5NIBGjeSKpwgnT0_" },
            { name: "Indonesia", network: "QRIS", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8ThdfhEs4iFj6rS3rzGySJ2URSwRMt3kO_tDRErE7zSdoyBDatO8rg2yOzvEiEP_gjJbcZRRlk2QG6ln1GeqpkflS7k_81SrSEZo-du91aBcAdGAkCVNfwIZB5bZxYZHH0yxPNjDIPwOSqJjp9nsAu0tJGFWBoKsz6Uw5dzWaaG9kTjTSxp1u9PlM9UFL01VfcdgQfivJxl5YOVKy9Tx_VSO7xkhFEoyqr9BU1VdGEtqCxkwTPvP5LVKgolUIjEcuP1r3ketchI2o", offset: true },
            { name: "Vietnam", network: "VietQR", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBp0TIju-96DY_xjqr3kNDc5nGwTSRs9Mk8SclesK06t4vH_Lu079tXN9wiD1CbHNWlsNeoyk5L9MGlkDrLN-dWuvEowE1nKzjiC0ML44Y1J51xQkXHb0XV7iS7WdrdJZdBSTH3V2xcHTNcYsqJlIPdrwaKp3qGYPLSelTdNh7NujqzLVcgHkFzeWJ1EwPzoTu1oh7FqtTavzuZhuFlv1kgJrby7zvU6l_d6UuHgJOt2nvDtFn0xoClUXwdpAwV_yj05egAaQoqeuvZ" },
            { name: "Malaysia", network: "DuitNow", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC76seS9t7V8_AffElBUw7eS5o31U4F_9k_lzMjW-9F6z5mOy7Tl0sRKVCaO5RuRbGhENvxlrYjm41fjzGg0DHal8XTb3juGGNS4VDa2Yn5ehwN4AL8TXy2orc5H-d5yl1TlSk22Yf9Y-OxFr6kbG66cT_LjvSKmI_npSzN-ZpLuoeDUlS7qisoGy54sonVpkb83k7f7M5YOIzF8czWSXsZOmy3Isb1LTtnE3oGsj2PzIfUX1RkDz-RpzXz9hLiVsivExIGeJYY09c4", offset: true },
            { name: "Cambodia", network: "KHQR", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_uKLa5un5fdEDTmXrAVPEI4NQHt510tdOM43-EF_ECZpvGA3EjHxhP1YPciKIgYl40D07XHoNvyY2iaa-SRTl4AFUFSnxl7pFdljro6P7p7NGS5KZ0Js4XCzAvj6IPC843k7vMjp76zXsolf0HroYN3VQyRYLVRERa7wGrJf0c_fIdLOGQ2nvlQUDljC-M-MTV_adHX7qlgA9OH9DDrFmwXZnhkzZJTohejfqDJsC_Cxm1SHGNPrZ6U4NzdUJL956A0l8i-ArwdY" },
            { name: "Philippines", network: "InstaPay", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_z_9AB6QwWo7um_GLFpnHmMo_ULSMKz6wB3M84GannKibvEEhFU-1ekomBHwAlhlVHhOU4iMvjYEpySS9gPfMU3q4CdDFabgtMyYB2984o0MbX_IVoxw9Nv_PFN9v1a03-eqhbvdgWCI9hR2ZN8CotqemumhqZhDglCM8tqYBBziwFfuBiOHj4hcwtv7xRDMjsBFeNz4sY4y_CLThPYeCHJzOncBWA-aMZSzDnCUwOT-BcHN1aSi50QpkUEQw0a-BuJ5xlvN6278", offset: true }
          ].map((country, i) => (
            <div key={i} className={`group relative overflow-hidden rounded-[2.5rem] h-[400px] shadow-xl hover:shadow-2xl transition-all cursor-pointer ${country.offset ? 'lg:mt-12' : ''}`}>
              <img 
                alt={country.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                src={country.img} 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">{country.network}</p>
                <h4 className="text-2xl font-black">{country.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Logo Marquee Section */}
      <section className="py-20 border-y border-slate-100 overflow-hidden bg-white">
        <div className="flex whitespace-nowrap animate-scroll">
          <div className="flex items-center gap-24 px-12">
            {["InstaPay", "KHQR", "PromptPay", "QRIS", "VietQR", "DuitNow"].map((logo, i) => (
              <div key={i} className="flex items-center gap-3 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                <span className="text-2xl font-black tracking-tighter text-slate-900 italic">{logo}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-24 px-12">
            {["InstaPay", "KHQR", "PromptPay", "QRIS", "VietQR", "DuitNow"].map((logo, i) => (
              <div key={i} className="flex items-center gap-3 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                <span className="text-2xl font-black tracking-tighter text-slate-900 italic">{logo}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="bg-slate-50 py-32 reveal">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-24 items-center">
          <div className="relative group">
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-primary/10 rounded-full blur-[80px] group-hover:bg-primary/20 transition-all"></div>
            <div className="aspect-square rounded-[4rem] overflow-hidden shadow-2xl relative z-10">
              <img 
                alt="Lively SE Asian night market" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaEq9eYXoQVkKhvfkYgm6Ohg9imOHFSt8qf64AZgeD92i45IkJCAaJSEsez0E1Zv2rOonRYwYGEIwVuaV3jfN4eh5wkTUmFtl3DXHiogmhaZ1hqCiRkAGfBG5Ev4mcd2FxUAXsTYWLHn8CwpSvhpQXAe-nXWZJiNppcoJ7F5CBr4vckEb_5rpq9_7WBXymDXJm5WKsL06GvUJGIAF5P2jJ0yh8LQqdMKeezFZjnlm9SF5w2-GZWPqVZyMKXhT5GKn3sqvbGTs-AzM" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] group-hover:bg-secondary/20 transition-all"></div>
          </div>
          <div className="space-y-10">
            <span className="text-primary font-bold text-xs tracking-widest uppercase">Our Mission</span>
            <h2 className="text-6xl font-black tracking-tighter text-slate-900 leading-[0.9]">Borders Shouldn't Define Your Freedom.</h2>
            <p className="text-xl text-slate-500 font-medium leading-relaxed">
              Lumi was born from a simple observation: modern travelers are forced to choose between inflated exchange rates, cash, or traditional cards, and none of these options are truly satisfactory. Travelers lack access to the most efficient payment method in the region: mobile QR payments.
            </p>
            <div className="space-y-8 mt-10">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                  <Wallet className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900">Your Phone Is Your Wallet</h4>
                  <p className="text-slate-500 font-medium">No Cash. No Cards. Just Your Mobile. Make payments instantly using only your mobile; simple and seamless.</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-primary shrink-0">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900">Instant and Transparent</h4>
                  <p className="text-slate-500 font-medium">Zero hidden fees, instant visibility on FX rate. You know exactly what you pay.</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                  <Globe className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900">Pay Everywhere</h4>
                  <p className="text-slate-500 font-medium">Access to 25M+ local merchants, empowering roadside merchants to citywide networks, bringing truly inclusive payments to every corner.</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-primary shrink-0">
                  <Calendar className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900">Travel Now Pay Later</h4>
                  <p className="text-slate-500 font-medium">Enjoy your holiday without the stress. Upload your wallet and pay back in 6 easy installments.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Lumi? Section */}
      <section id="team" className="py-32 bg-indigo-50/50 reveal overflow-hidden relative">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid lg:grid-cols-5 gap-16 items-center">
            <div className="lg:col-span-3 space-y-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase mb-4">
                <HeartHandshake className="w-5 h-5" /> TRUST, BUILT IN :)
              </div>
              <h2 className="text-6xl font-black tracking-tighter text-slate-900 leading-[0.9]">Why Lumi?</h2>
              <p className="text-2xl text-slate-800 font-semibold leading-relaxed">
                Lumi is designed to give you complete confidence in every transaction. Founded by experienced bankers and backed by European investors, we bring deep financial expertise and long-term trust to everything we do. As a European company working with regulated partners across Europe and Asia, we meet high standards of security and compliance to protect your funds and money movements. Combined with instant payments, transparent pricing, and a large acceptance network, Lumi delivers a payment experience you can rely on anywhere.
              </p>
            </div>
            <div className="lg:col-span-2">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-[4rem] rotate-6 scale-95 blur-2xl"></div>
                <div className="relative bg-white p-12 rounded-[4rem] shadow-2xl border border-white/50 backdrop-blur-sm">
                  <div className="space-y-6">
                    <div className="w-16 h-16 rounded-2xl hero-gradient flex items-center justify-center text-white shadow-xl shadow-primary/30 mb-8">
                      <BadgeCheck className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-6">Your money is in safe hands</h3>
                    <ul className="space-y-6">
                      <li className="flex items-center gap-3">
                        <CheckCircle2 className="text-emerald-500 w-6 h-6" />
                        <span className="font-bold text-slate-700 text-lg">EU Regulated Set-up</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle2 className="text-emerald-500 w-6 h-6" />
                        <span className="font-bold text-slate-700 text-lg">SEPA Bank Transfer</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle2 className="text-emerald-500 w-6 h-6" />
                        <span className="font-bold text-slate-700 text-lg">KYC and AML Check</span>
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
      <section id="journey" ref={journeyRef} className="py-32 bg-white reveal">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-24 space-y-4">
            <span className="text-primary font-bold text-xs tracking-widest uppercase">The User Journey</span>
            <h2 className="text-6xl font-black tracking-tighter text-slate-900">From your bank in Europe to any QR in Asia</h2>
            <p className="text-slate-500 text-xl font-medium">Four simple steps to financial freedom.</p>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative w-[340px] h-[680px] bg-slate-900 rounded-[4rem] p-4 shadow-[0_60px_120px_-20px_rgba(99,102,241,0.3)] border-[10px] border-slate-900 overflow-hidden animate-float">
                <div className="bg-white h-full w-full rounded-[3rem] flex flex-col relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                      className="flex-1 flex flex-col h-full"
                    >
                      {steps[activeStep].mockup}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              {steps.map((item, i) => (
                <div 
                  key={i} 
                  className={`flex gap-8 p-8 rounded-[2.5rem] transition-all duration-500 cursor-pointer border-2 ${activeStep === i ? 'bg-indigo-50/50 border-primary/20 shadow-sm' : 'bg-transparent border-transparent hover:bg-slate-50'}`}
                  onClick={() => {
                    setActiveStep(i);
                    lastScrollTime.current = Date.now();
                  }}
                  onMouseEnter={() => {
                    setActiveStep(i);
                    lastScrollTime.current = Date.now();
                  }}
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 font-black text-2xl shadow-xl transition-all duration-500 ${activeStep === i ? 'bg-primary text-white shadow-primary/20 scale-110' : 'bg-slate-100 text-slate-900 shadow-sm'}`}>
                    {item.step}
                  </div>
                  <div>
                    <h3 className={`text-2xl font-black mb-3 transition-colors duration-500 ${activeStep === i ? 'text-primary' : 'text-slate-900'}`}>{item.title}</h3>
                    <p className="text-slate-500 font-medium text-lg leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fee Comparison Section */}
      <section id="fees" className="py-32 max-w-5xl mx-auto px-8 reveal">
        <div className="text-center mb-20 space-y-4">
          <span className="text-primary font-bold text-xs tracking-widest uppercase">Fee Transparency</span>
          <h2 className="text-6xl font-black tracking-tighter text-slate-900">No Secrets, Just Savings.</h2>
          <p className="text-slate-500 text-xl font-medium">A typical €1000 overall spend comparison.</p>
        </div>
        <div className="mb-12 flex justify-center">
          <div className="relative group inline-flex items-center gap-4 bg-primary/5 border-2 border-primary/20 px-8 py-4 rounded-2xl shadow-[0_0_40px_-10px_rgba(99,102,241,0.2)] hover:shadow-primary/30 transition-all duration-500">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
              <PiggyBank className="w-6 h-6" />
            </div>
            <p className="text-2xl md:text-3xl font-black tracking-tighter text-slate-900">Avoid losing up to <span className="text-primary">€100</span> per <span className="text-primary">€1,000</span></p>
            <div className="absolute -inset-1 bg-primary/20 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          </div>
        </div>
        <div className="overflow-x-auto rounded-[3rem] border border-slate-100 shadow-sm bg-white p-2">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-400 text-[11px] uppercase tracking-[0.2em]">
                <th className="p-10 font-black">Provider</th>
                <th className="p-10 font-black">Fee Structure</th>
                <th className="p-10 font-black">MERCHANT SURCHARGING</th>
                <th className="p-10 font-black text-right">Total Cost to Customer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="bg-indigo-100/50 border-2 border-primary/20 shadow-inner relative z-10">
                <td className="p-10 font-black text-primary flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div> Lumi
                </td>
                <td className="p-10 text-primary font-black text-lg">2% FX Fee</td>
                <td className="p-10 text-primary font-black text-lg">0%</td>
                <td className="p-10 text-primary font-black text-3xl text-right">€1,020</td>
              </tr>
              {[
                { name: "Airport Exchange (Cash)", fee: "12% FX Spread", surcharge: "0%", total: "€1,120" },
                { name: "ATM Cash Withdrawal", fee: "3% FX + €7.5 Fee", surcharge: "0%", total: "€1,037.5" },
                { name: "Traditional Bank Card", fee: "2.5% FX Markup", surcharge: "2.00%", total: "€1,045" }
              ].map((row, i) => (
                <tr key={i} className="group hover:bg-slate-50 transition-colors">
                  <td className="p-10 font-bold text-slate-900 flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-slate-300"></div> {row.name}
                  </td>
                  <td className="p-10 text-slate-500 font-medium">{row.fee}</td>
                  <td className="p-10 text-slate-500 font-medium">{row.surcharge}</td>
                  <td className="p-10 font-black text-slate-900 text-right">{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-slate-900 text-white px-8 reveal">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="space-y-6">
              <span className="text-primary font-bold uppercase tracking-widest text-xs">CURATED FOR EVERY TRAVELER</span>
              <h2 className="text-6xl font-black tracking-tighter">Beyond Payments.</h2>
              <p className="text-slate-400 max-w-xl text-lg font-medium">Go beyond payments with travel essentials like eSIM, curated experiences, and access to the best local offers.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "eSIM", desc: "Activate local 5G data plans instantly. Stay connected the moment you land with zero physical cards.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwzVHvzHYttICyFrNdszimbmzYe9sz8oUTdBs1ivHWlBmFgFLUfc8mXN_E6zjshSRZM5dA4Stb7-1y66wjDtPmysz6odGUfQZApggzTBeRD8TDR9y3YaaJR7HLmEvQQbUjynapyQF-geu7K6btTr7D0XLcsRUve4eBnUnRiAOfCxP3UDh-LBHiB-7ayQlMcz5IngOo1dZqo0-ydKJ3p40S3g_xIF7LOc8RVc_ebukJ8oESet-7sI30_hoSYDMFovUvE8W_0bcUloU" },
              { title: "Daily Tours", desc: "Book curated island hopping or city walks with verified local guides, all paid seamlessly via QR.", img: "https://lh3.googleusercontent.com/aida/ADBb0uhQo80tJxbFG1G3IgpeIBnemTEqmJ9T8OoggoeHRAp38bfMO_ANSnPvlY9_oYlA4dJ9zGNg7FJUfqywwhZ7HAyXgX51z_hu1L2xBMUGFrpSX1hN9OF_ytJCCm9UndLT560lcBrGPqvzQY9f5bkff09Pcyv-LQYa7WwpN1Qr1qb7dOYXEclChFY5BnjscK1-wPdu85SVqfsDh_L3hhzT76JxhfeVOL69KN1Ba2o43wNVmyMLcb00C5lgfUwHdXSFWEtkOSIzMdwBeQ" },
              { title: "Restaurants", desc: "Discover hand-picked local dining gems. Use Lumi to unlock exclusive member-only offers and authentic flavors.", img: "https://lh3.googleusercontent.com/aida/ADBb0ugypqcWFwJPhglO8aaMF6b0cDEsuEmW1yrqvj0C3GjlB76u2IPwhnqoP7dFc_5pk3qwmMYAhd3Ce__2knPE1xQXVl7IbUIesZRaLNuCcC6NTMlqIFJSxMIEt0oUqywFo4B1MrSlxytFbb1RgogRNqXBrBf8YdtJXOtQfnBQLjvJdWK_oWKIZ-cE4RByiHkdxtwoY9BONG2JhHkSy0i01eRXe7LF2Wwx7lrdlUXDXA7DEF_TfFJZTpMkya9Kw0HLmAC2g7kt9Tey" }
            ].map((service, i) => (
              <div key={i} className="group relative rounded-[4rem] overflow-hidden aspect-[4/5] shadow-2xl">
                <img 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  src={service.img} 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-12 w-full space-y-5">
                  <h4 className="text-3xl font-black tracking-tight">{service.title}</h4>
                  <p className="text-slate-400 leading-relaxed text-sm font-medium">{service.desc}</p>
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
            <span className="text-primary font-bold text-xs tracking-widest uppercase">Verified Experiences</span>
            <h2 className="text-6xl font-black tracking-tighter text-slate-900">Nomad Stories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { name: "Sarah Jenkins", role: "Digital Strategist", text: "At my last stay in Vietnam, I got stuck in a taxi with no cash and no payment option. If only I could have Lumi to pay via QR.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxxaYlCue15ExINB1Eu0MXZsSUMemjww82ZQRMcbbxkngWgFcCG_nMsoHzBFlvoqIxbxsJsEyErd3AFHl5MqaUxoWns9s5Gscarxf47XDxQSHe-dPOdEdeOBggLYK3STphuxxkxC2YktHwZ7ut660cYODBKU0VP691xlFrhUUizY7AC_i7Eva0tgqC_iCSPGwImTNfCt6Z0mGpreB7V6XjTw3auBU6DK9O8eIYSUCQ9oXnbmiZUPLhzFQ7aO_ksiG6XJSEzgTIKNpn" },
              { name: "Marcus Thorne", role: "PAYMENT EXPERT", text: "Lumi could seriously disrupt traditional credit cards. The fees are lower and the experience is smoother. This is the future of travel payments", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeuPPxhFWp5XX-gqCubs4K5TRKnl9ntjJyJu4QyzMMrReGFKa7abX2kN_KpavsAcVKa9HpfjGs4o_1LiOnVMXLBAPDrapUJ6AMOfgMtGFEJfzbUCA0G1o29TXm695v42gzfORer1OYKxjVrryYotwFvF85r4TxaAMH3dX7xFZAxjPCU7mgqBlkpOskZnf0x0yAcHeAWtKRkDcNUEUgQppYjfE1PfhBylIjFlsnaxn_bNyUeGX76hE1srteug0BdP4ZeC4nFDPL4ly2" },
              { name: "Elena Rossi", role: "Solo Traveler", text: "I am staying each year a few weeks in Thailand but without a bank account, I cannot pay via Promptpay. Lumi is solving this problem.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvUSkns_xTlr6Hm7dyXWn8_3uli-mLdhleXfrE1WK-g7pHBjEU-JWaW9JNAPqVN3e-9aw5j1PrrOESZTeX7Olgmi1Fl-3xM67bhgbPRkwO3OZZKRZ_ITmk-ZGtCmmNKitzuoLx0k7PUePzSpxtm-ES19RIJURuEDvyR5SeI3AIjm5-M1QmPR0yuCtW4UumKxdrkOlWQeyOisBRNF22IY0HaWHi4zE_K3nRz24HvGur7pMBhzm1U7EzT-Op6RUsIy7KoYr0dWWGlnkL" }
            ].map((story, i) => (
              <div key={i} className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100 space-y-10 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="text-xl text-slate-600 font-medium leading-relaxed italic">"{story.text}"</p>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-full bg-slate-200 overflow-hidden">
                    <img alt={story.name} src={story.img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <p className="font-black text-slate-900">{story.name}</p>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{story.role}</p>
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
                src="https://www.youtube.com/embed/gHqVe2BwsWM?autoplay=1"
                title="Lumi Demo Video"
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
