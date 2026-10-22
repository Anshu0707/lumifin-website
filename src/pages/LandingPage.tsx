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
  ArrowRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FAQSection from "../components/FAQSection";
import Waitlist from "../components/Waitlist";
import SEO, { organizationSchema, websiteSchema, softwareApplicationSchema } from "../components/SEO";
import { localizedPath } from "../utils/localizedPath";
import CoverageMap from "../components/CoverageMap";

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
  const location = useLocation();
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
        <img
          src="/assets/screens/scan-qr-v2.webp"
          alt={t("journey.steps.2.alt")}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      ),
    },
    {
      step: 3,
      title: t("journey.steps.3.title"),
      desc: t("journey.steps.3.desc"),
      icon: <CheckCircle2 className="text-primary w-12 h-12" />,
      mockup: (
        <img
          src="/assets/screens/enter-amount-v2.webp"
          alt={t("journey.steps.3.alt")}
          loading="lazy"
          className="w-full h-full object-cover"
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
          src="/assets/screens/payment-success-v2.webp"
          alt={t("journey.steps.4.alt")}
          loading="lazy"
          className="w-full h-full object-cover"
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
        ogImage="/assets/preview/og-image.jpg"
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
          <div className="mt-8 flex flex-col items-center justify-center gap-3">
            <div className="flex items-center justify-center gap-2 text-white/70">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/15 text-white font-black text-sm">€</span>
              <span className="text-sm font-medium">{t("hero.sepaBadge")}</span>
            </div>
            <Link
              to={localizedPath("/eligibility", location.pathname)}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-white/80 hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-all"
            >
              {t("hero.checkEligibility")}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
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
        {/* The ten markets as a map rather than a moving row of photos: it shows
            where they are relative to each other, which a carousel cannot. */}
        <CoverageMap />
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
                width={512}
                height={512}
                className="w-full h-full object-cover"
                src="/assets/regions/night-market.webp"
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
            {([
              {
                title: t("services.items.esim.title"),
                desc: t("services.items.esim.desc"),
                img: "/assets/services/esim.webp",
                // Not linked for now: the eSIM page is turned off until pricing is final.
                live: true,
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
            ] as { title: string; desc: string; img: string; href?: string; live?: boolean }[]).map((service, i) => {
              const inner = (
                <>
                  <img
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    src={service.img}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent"></div>
                  {service.live && (
                    <div className="absolute top-8 left-8">
                      <span className="inline-flex items-center gap-2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        {t("services.availableBadge")}
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 p-12 w-full space-y-5">
                    <h3 className="text-3xl font-black tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed text-sm font-medium">
                      {service.desc}
                    </p>
                    {service.href && (
                      <span className="inline-flex items-center gap-2 text-white font-black text-sm">
                        {t("services.learnMore")}
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </span>
                    )}
                  </div>
                </>
              );
              const cls =
                "group relative rounded-[4rem] overflow-hidden aspect-[4/5] shadow-2xl block";
              return service.href ? (
                <Link
                  key={i}
                  to={localizedPath(service.href, location.pathname)}
                  className={cls}
                  aria-label={service.title}
                >
                  {inner}
                </Link>
              ) : (
                <div key={i} className={cls}>
                  {inner}
                </div>
              );
            })}
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
                src="https://www.youtube.com/embed/pg-m5k3cbeY?autoplay=1&rel=0"
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
