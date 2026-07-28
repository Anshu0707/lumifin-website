/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';
import CookieConsent from './components/CookieConsent';
import LanguageFromUrl from './components/LanguageFromUrl';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';

// Eager-load the landing page (critical path)
import LandingPage from './pages/LandingPage';

// Lazy-load all other pages for code splitting
const FAQPage = lazy(() => import('./pages/FAQPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const DeleteAccountPage = lazy(() => import('./pages/DeleteAccountPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const WhyWeBuiltLumiPage = lazy(() => import('./pages/WhyWeBuiltLumiPage'));
const CashIsKingPage = lazy(() => import('./pages/CashIsKingPage'));
const QrisDecodedPage = lazy(() => import('./pages/QrisDecodedPage'));
const VietqrDecodedPage = lazy(() => import('./pages/VietqrDecodedPage'));
const BestTravelCardsVietnamPage = lazy(() => import('./pages/BestTravelCardsVietnamPage'));
const DigitalNomadVisasPage = lazy(() => import('./pages/DigitalNomadVisasPage'));
const HanoiFounderNotePage = lazy(() => import('./pages/HanoiFounderNotePage'));
const DaNangPressReleasePage = lazy(() => import('./pages/DaNangPressReleasePage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const SecurityPage = lazy(() => import('./pages/SecurityPage'));
const TravelMoneyThailandPage = lazy(() => import('./pages/TravelMoneyThailandPage'));
const TravelMoneyVietnamPage = lazy(() => import('./pages/TravelMoneyVietnamPage'));
const TravelMoneyIndonesiaPage = lazy(() => import('./pages/TravelMoneyIndonesiaPage'));
const TravelMoneyPage = lazy(() => import('./pages/TravelMoneyPage'));
const ComparePage = lazy(() => import('./pages/ComparePage'));
const MentionsLegalesPage = lazy(() => import('./pages/MentionsLegalesPage'));
const CguPage = lazy(() => import('./pages/CguPage'));
const BetaApplicationPage = lazy(() => import('./pages/BetaApplicationPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <ScrollProgress />
      <LanguageFromUrl />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/account-deletion" element={<DeleteAccountPage />} />
          <Route path="/delete-account" element={<DeleteAccountPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/why-we-built-lumi" element={<WhyWeBuiltLumiPage />} />
          <Route path="/blog/cash-is-king" element={<CashIsKingPage />} />
          <Route path="/blog/qris-decoded" element={<QrisDecodedPage />} />
          <Route path="/blog/vietqr-decoded" element={<VietqrDecodedPage />} />
          <Route path="/blog/best-travel-cards-europeans-vietnam-2026" element={<BestTravelCardsVietnamPage />} />
          <Route path="/blog/digital-nomad-visas-thailand-vietnam-bali-2026" element={<DigitalNomadVisasPage />} />
          <Route path="/blog/founder-note-testing-lumifin-in-hanoi" element={<HanoiFounderNotePage />} />
          <Route path="/blog/why-we-chose-da-nang" element={<DaNangPressReleasePage />} />
          <Route path="/careers" element={<CareersPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/travel-money/thailand" element={<TravelMoneyThailandPage />} />
        <Route path="/travel-money/vietnam" element={<TravelMoneyVietnamPage />} />
        <Route path="/travel-money/indonesia" element={<TravelMoneyIndonesiaPage />} />
        <Route path="/travel-money" element={<TravelMoneyPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
        <Route path="/cgu" element={<CguPage />} />
        <Route path="/beta" element={<BetaApplicationPage />} />

          {/* English URLs — same components, rendered in English because the
              /en/ path segment drives language selection (see src/i18n/config.ts).
              French stays at the root paths above, unchanged. */}
          <Route path="/en" element={<LandingPage />} />
          <Route path="/en/faq" element={<FAQPage />} />
          <Route path="/en/team" element={<TeamPage />} />
          <Route path="/en/privacy" element={<PrivacyPage />} />
          <Route path="/en/account-deletion" element={<DeleteAccountPage />} />
          <Route path="/en/delete-account" element={<DeleteAccountPage />} />
          <Route path="/en/blog" element={<BlogPage />} />
          <Route path="/en/blog/why-we-built-lumi" element={<WhyWeBuiltLumiPage />} />
          <Route path="/en/blog/cash-is-king" element={<CashIsKingPage />} />
          <Route path="/en/blog/qris-decoded" element={<QrisDecodedPage />} />
          <Route path="/en/blog/vietqr-decoded" element={<VietqrDecodedPage />} />
          <Route path="/en/blog/best-travel-cards-europeans-vietnam-2026" element={<BestTravelCardsVietnamPage />} />
          <Route path="/en/blog/digital-nomad-visas-thailand-vietnam-bali-2026" element={<DigitalNomadVisasPage />} />
          <Route path="/en/blog/founder-note-testing-lumifin-in-hanoi" element={<HanoiFounderNotePage />} />
          <Route path="/en/blog/why-we-chose-da-nang" element={<DaNangPressReleasePage />} />
          <Route path="/en/careers" element={<CareersPage />} />
          <Route path="/en/security" element={<SecurityPage />} />
          <Route path="/en/travel-money/thailand" element={<TravelMoneyThailandPage />} />
          <Route path="/en/travel-money/vietnam" element={<TravelMoneyVietnamPage />} />
          <Route path="/en/travel-money/indonesia" element={<TravelMoneyIndonesiaPage />} />
          <Route path="/en/travel-money" element={<TravelMoneyPage />} />
          <Route path="/en/compare" element={<ComparePage />} />
          <Route path="/en/mentions-legales" element={<MentionsLegalesPage />} />
          <Route path="/en/cgu" element={<CguPage />} />
          <Route path="/en/beta" element={<BetaApplicationPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <WhatsAppFloatingButton />
      <CookieConsent />
    </Router>
  );
}
