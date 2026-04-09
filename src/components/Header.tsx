import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);

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
        Destinations
      </button>
      <button
        onClick={() => scrollToSection("journey")}
        className="hover:text-primary transition-colors cursor-pointer"
      >
        User Journey
      </button>
      <button
        onClick={() => scrollToSection("fees")}
        className="hover:text-primary transition-colors cursor-pointer"
      >
        Fee Transparency
      </button>
      <button
        onClick={() => scrollToSection("services")}
        className="hover:text-primary transition-colors cursor-pointer"
      >
        Services
      </button>
      <Link to="/team" onClick={() => setMobileOpen(false)} className="hover:text-primary transition-colors normal-case">
        About Us
      </Link>
      <Link to="/faq" onClick={() => setMobileOpen(false)} className="hover:text-primary transition-colors">
        FAQ
      </Link>
    </>
  );

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 transition-all duration-300">
      <nav className="flex justify-between items-center px-8 h-20 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center">
          <Logo className="w-40 max-h-16" />
        </Link>
        <div className="hidden md:flex items-center gap-10 text-[12px] font-bold tracking-widest uppercase text-slate-500">
          {navItems}
        </div>
        <div className="flex items-center gap-4 md:hidden">
        <button
          className="text-slate-700"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        </div>
      </nav>
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 px-8 py-6 flex flex-col items-center gap-5 text-[12px] font-bold tracking-widest uppercase text-slate-500">
          {navItems}
        </div>
      )}
    </header>
  );
}
