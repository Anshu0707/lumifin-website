import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import Logo from "./Logo";
import LanguageToggle from "./LanguageToggle";

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useTranslation();

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    if (isHome) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = `/#${id}`;
    }
  };

  const navItems = (
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
        {t("header.userJourney")}
      </button>
      <button
        onClick={() => scrollToSection("fees")}
        className="hover:text-primary transition-colors cursor-pointer"
      >
        {t("header.feeTransparency")}
      </button>
      <button
        onClick={() => scrollToSection("services")}
        className="hover:text-primary transition-colors cursor-pointer"
      >
        {t("header.services")}
      </button>
      <Link
        to="/team"
        onClick={() => setMobileOpen(false)}
        className="hover:text-primary transition-colors normal-case"
      >
        {t("header.aboutUs")}
      </Link>
      <Link
        to="/faq"
        onClick={() => setMobileOpen(false)}
        className="hover:text-primary transition-colors"
      >
        {t("header.faq")}
      </Link>
      <Link to="/blog" onClick={() => setMobileOpen(false)} className="hover:text-primary transition-colors normal-case">
        Blogs
      </Link>
      <Link to="/careers" onClick={() => setMobileOpen(false)} className="hover:text-primary transition-colors normal-case">
        Work With Us
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
          {navItems}
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
          {navItems}
        </div>
      )}
    </header>
  );
}
