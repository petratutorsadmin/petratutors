import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/Layout';
import BoutiqueLoader from './components/BoutiqueLoader';

// Dynamically import pages for code splitting
const GatewayHome = lazy(() => import('./pages/GatewayHome'));
const LandingIB = lazy(() => import('./pages/LandingIB'));
const LandingIELTS = lazy(() => import('./pages/LandingIELTS'));
const LandingUniversity = lazy(() => import('./pages/LandingUniversity'));
const LandingKids = lazy(() => import('./pages/LandingKids'));
const LandingFoundation = lazy(() => import('./pages/LandingFoundation'));
const BusinessLanding = lazy(() => import('./pages/BusinessLanding'));

const Home = lazy(() => import('./pages/Home'));
const Programs = lazy(() => import('./pages/Programs'));
const Tutors = lazy(() => import('./pages/Tutors'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Inquiry = lazy(() => import('./pages/Inquiry'));
const About = lazy(() => import('./pages/About'));
const NoAdmissionFee = lazy(() => import('./pages/NoAdmissionFee'));
const ThankYou = lazy(() => import('./pages/ThankYou'));

import ScrollToTop from './components/ScrollToTop';
import ExitIntentPopup from './components/ExitIntentPopup';

function App() {
  return (
    <>
      <BoutiqueLoader />
      <ScrollToTop />
      <ExitIntentPopup />
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
            <Route path="business" element={<BusinessLanding />} />

            {/* ── Existing pages (retained) ── */}
            <Route path="home" element={<Home />} />
            <Route path="programs" element={<Programs />} />
            <Route path="tutors" element={<Tutors />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="inquiry" element={<Inquiry />} />
            <Route path="thank-you" element={<ThankYou />} />
            <Route path="about" element={<About />} />
            <Route path="no-admission-fee" element={<NoAdmissionFee />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
