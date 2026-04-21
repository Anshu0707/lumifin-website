import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MoreHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";
import Logo from "./Logo";
import LanguageToggle from "./LanguageToggle";

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    setMoreOpen(false);
    if (isHome) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = `/#${id}`;
    }
  };

  // Close "more" dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const primaryNav = (
    <>
      <button
        onClick={() => scrollToSection("destinations")}
        className="hover:text-primary transition-colors cursor-pointer"
      >
        {t("header.destinations")}
      </button>
      <button
        onClick={() => scrollToSection("journey")}
        className="hover:text-primary transition-colors cursor-pointer"
      >
        {t("header.howItWorks")}
      </button>
      <button
        onClick={() => scrollToSection("fees")}
        className="hover:text-primary transition-colors cursor-pointer"
      >
        {t("header.pricing")}
      </button>
      <Link
        to="/team"
        onClick={() => setMobileOpen(false)}
        className="hover:text-primary transition-colors normal-case"
      >
        {t("header.about")}
      </Link>
    </>
  );

  const secondaryNav = (
    <>
      <Link
        to="/faq"
        onClick={() => { setMobileOpen(false); setMoreOpen(false); }}
        className="hover:text-primary transition-colors"
      >
        {t("header.faq")}
      </Link>
      <Link
        to="/blog"
        onClick={() => { setMobileOpen(false); setMoreOpen(false); }}
        className="hover:text-primary transition-colors normal-case"
      >
        {t("header.blogs")}
      </Link>
      <Link
        to="/careers"
        onClick={() => { setMobileOpen(false); setMoreOpen(false); }}
        className="hover:text-primary transition-colors normal-case"
      >
        {t("header.workWithUs")}
      </Link>
    </>
  );

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 transition-all duration-300">
      <nav className="flex justify-between items-center px-8 h-20 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center">
          <Logo className="w-40 max-h-16" />
        </Link>
        <div className="hidden lg:flex items-center gap-10 text-[12px] font-bold tracking-widest uppercase text-slate-500">
          {primaryNav}

          {/* More dropdown for secondary nav */}
          <div ref={moreRef} className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="hover:text-primary transition-colors cursor-pointer flex items-center gap-1"
              aria-label="More"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-full mt-3 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-xl py-4 px-6 flex flex-col gap-4 min-w-[180px] text-[12px] font-bold tracking-widest uppercase text-slate-500">
                {secondaryNav}
              </div>
            )}
          </div>

          <LanguageToggle />
        </div>
        <div className="flex items-center gap-4 lg:hidden">
          <LanguageToggle className="text-[12px] font-bold tracking-widest uppercase" />
          <button
            className="text-slate-700"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? t("header.closeMenu") : t("header.openMenu")}
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>
      {mobileOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 px-8 py-6 flex flex-col items-center gap-5 text-[12px] font-bold tracking-widest uppercase text-slate-500">
          {primaryNav}
          {secondaryNav}
        </div>
      )}
    </header>
  );
}
