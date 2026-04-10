/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import FAQPage from './pages/FAQPage';
import TeamPage from './pages/TeamPage';
import PrivacyPage from './pages/PrivacyPage';
import BlogPage from './pages/BlogPage';
import WhyWeBuiltLumiPage from './pages/WhyWeBuiltLumiPage';
import CashIsKingPage from './pages/CashIsKingPage';
import QrisDecodedPage from './pages/QrisDecodedPage';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <ScrollProgress />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/why-we-built-lumi" element={<WhyWeBuiltLumiPage />} />
        <Route path="/blog/cash-is-king" element={<CashIsKingPage />} />
        <Route path="/blog/qris-decoded" element={<QrisDecodedPage />} />
        {/* Fallback for other routes mentioned in footer */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}
