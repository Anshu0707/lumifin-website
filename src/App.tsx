/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';
import CookieConsent from './components/CookieConsent';

// Eager-load the landing page (critical path)
import LandingPage from './pages/LandingPage';

// Lazy-load all other pages for code splitting
const FAQPage = lazy(() => import('./pages/FAQPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const WhyWeBuiltLumiPage = lazy(() => import('./pages/WhyWeBuiltLumiPage'));
const CashIsKingPage = lazy(() => import('./pages/CashIsKingPage'));
const QrisDecodedPage = lazy(() => import('./pages/QrisDecodedPage'));
const VietqrDecodedPage = lazy(() => import('./pages/VietqrDecodedPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const SecurityPage = lazy(() => import('./pages/SecurityPage'));
const TravelMoneyThailandPage = lazy(() => import('./pages/TravelMoneyThailandPage'));
const TravelMoneyVietnamPage = lazy(() => import('./pages/TravelMoneyVietnamPage'));
const TravelMoneyIndonesiaPage = lazy(() => import('./pages/TravelMoneyIndonesiaPage'));
const TravelMoneyPage = lazy(() => import('./pages/TravelMoneyPage'));
const ComparePage = lazy(() => import('./pages/ComparePage'));
const MentionsLegalesPage = lazy(() => import('./pages/MentionsLegalesPage'));
const CguPage = lazy(() => import('./pages/CguPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <ScrollProgress />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/why-we-built-lumi" element={<WhyWeBuiltLumiPage />} />
          <Route path="/blog/cash-is-king" element={<CashIsKingPage />} />
          <Route path="/blog/qris-decoded" element={<QrisDecodedPage />} />
          <Route path="/blog/vietqr-decoded" element={<VietqrDecodedPage />} />
          <Route path="/careers" element={<CareersPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/travel-money/thailand" element={<TravelMoneyThailandPage />} />
        <Route path="/travel-money/vietnam" element={<TravelMoneyVietnamPage />} />
        <Route path="/travel-money/indonesia" element={<TravelMoneyIndonesiaPage />} />
        <Route path="/travel-money" element={<TravelMoneyPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
        <Route path="/cgu" element={<CguPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <CookieConsent />
    </Router>
  );
}
