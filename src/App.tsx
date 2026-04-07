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
        {/* Fallback for other routes mentioned in footer */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}
