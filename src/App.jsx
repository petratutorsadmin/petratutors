import { Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/Layout';
import BoutiqueLoader from './components/BoutiqueLoader';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Lenis from 'lenis';
// Static import — index route, must be in the main bundle so prerendered HTML hydrates immediately
import GatewayHome from './pages/GatewayHome';

// Exploratory/marketing pages get slow dragging scroll.
// Task-oriented pages (forms, pricing, FAQ) stay native speed.
const SLOW_SCROLL_PATHS = new Set([
  '/', '/home', '/about', '/team',
  '/ecosystem', '/system', '/keystone',
  '/ib', '/ielts', '/university', '/kids', '/foundation', '/business', '/english',
]);

// Dynamically import pages for code splitting
const LandingIB = lazy(() => import('./pages/LandingIB'));
const LandingIELTS = lazy(() => import('./pages/LandingIELTS'));
const LandingUniversity = lazy(() => import('./pages/LandingUniversity'));
const LandingKids = lazy(() => import('./pages/LandingKids'));
const LandingFoundation = lazy(() => import('./pages/LandingFoundation'));
const LandingEnglish = lazy(() => import('./pages/LandingEnglish'));
const BusinessLanding = lazy(() => import('./pages/BusinessLanding'));

const Home = lazy(() => import('./pages/Home'));
const Tutors = lazy(() => import('./pages/Tutors'));
const Team = lazy(() => import('./pages/Team'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Inquiry = lazy(() => import('./pages/Inquiry'));
const About = lazy(() => import('./pages/About'));
const NoAdmissionFee = lazy(() => import('./pages/NoAdmissionFee'));
const ThankYou = lazy(() => import('./pages/ThankYou'));
const Hiring = lazy(() => import('./pages/Hiring'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const Keystone = lazy(() => import('./pages/Keystone'));
const ThePetraEcosystem = lazy(() => import('./pages/ThePetraEcosystem'));
const TutorDivisions = lazy(() => import('./pages/TutorDivisions'));
const TutorProgression = lazy(() => import('./pages/TutorProgression'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Summer = lazy(() => import('./pages/Summer'));
const NotFound = lazy(() => import('./pages/NotFound'));

import ScrollToTop from './components/ScrollToTop';
import SummerPopup from './components/SummerPopup';

function App() {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    if (!SLOW_SCROLL_PATHS.has(location.pathname)) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [location.pathname]);

  return (
    <>
      <BoutiqueLoader />
      <ScrollToTop />
      <SummerPopup />
      <Suspense fallback={<div style={{ minHeight: '100vh', backgroundColor: 'var(--c-sand)' }} />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* ── New gateway & funnel pages ── */}
            <Route index element={<GatewayHome />} />
            <Route path="ib" element={<LandingIB />} />
            <Route path="ielts" element={<LandingIELTS />} />
            <Route path="foundation" element={<LandingFoundation />} />
            <Route path="university" element={<LandingUniversity />} />
            <Route path="kids" element={<LandingKids />} />
            <Route path="english" element={<LandingEnglish />} />
            <Route path="business" element={<BusinessLanding />} />

            {/* ── Existing pages (retained) ── */}
            <Route path="home" element={<Home />} />
            <Route path="system" element={<ThePetraEcosystem />} />
            <Route path="tutors" element={<Tutors />} />
            <Route path="team" element={<Team />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="inquiry" element={<Inquiry />} />
            <Route path="thank-you" element={<ThankYou />} />
            <Route path="about" element={<About />} />
            <Route path="no-admission-fee" element={<NoAdmissionFee />} />
            <Route path="hiring" element={<Hiring />} />
            <Route path="faq" element={<FAQPage />} />
            <Route path="keystone" element={<Keystone />} />
            <Route path="ecosystem" element={<ThePetraEcosystem />} />
            <Route path="apply/divisions" element={<TutorDivisions />} />
            <Route path="apply/progression" element={<TutorProgression />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="summer" element={<Summer />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
