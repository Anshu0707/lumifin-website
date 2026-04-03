import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-20 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-16">
        <div className="space-y-6">
          <div className="flex items-center">
            <Logo className="w-40 h-auto" />
          </div>
          <p className="text-slate-400 font-medium leading-relaxed">
            Redefining South East Asia travel with seamless, instant QR payments.
          </p>
        </div>
        
        <div>
          <h4 className="text-lg font-black mb-8">Company</h4>
          <ul className="space-y-4 text-slate-400 font-medium">
            <li><Link to="/team" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/team#careers" className="hover:text-primary transition-colors">Careers</Link></li>
            <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-black mb-8">Support</h4>
          <ul className="space-y-4 text-slate-400 font-medium">
            <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-black mb-8">Contact</h4>
          <ul className="space-y-6 text-slate-400 font-medium text-sm">
            <li>
              <p className="text-white font-bold uppercase text-[10px] tracking-widest mb-1">E-mail</p>
              <a href="mailto:info@lumifin.io" className="hover:text-primary transition-colors">info@lumifin.io</a>
            </li>
            <li className="space-y-1">
              <p className="text-white font-bold uppercase text-[10px] tracking-widest mb-1">France office</p>
              <p className="leading-relaxed">50 rue Anatole France<br />92290 Chatenay-Malabry<br />France</p>
            </li>
            <li className="space-y-1">
              <p className="text-white font-bold uppercase text-[10px] tracking-widest mb-1">India office</p>
              <p className="leading-relaxed">A 812, Anthurium, Sector 73<br />Noida, UP (India)</p>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-black mb-8">Connect</h4>
          <ul className="space-y-4 text-slate-400 font-medium">
            <li><a href="https://www.instagram.com/lumifin.io/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a></li>
            <li><a href="https://www.linkedin.com/company/lumifin1/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm font-medium">
        <p>© 2026 LumiFin SAS. All rights reserved.</p>
        <p>Lumi is a brand of Lumifin SAS, a technology provider.</p>
      </div>
    </footer>
  );
}
