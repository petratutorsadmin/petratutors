import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/Layout';
import BoutiqueLoader from './components/BoutiqueLoader';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Dynamically import pages for code splitting
const GatewayHome = lazy(() => import('./pages/GatewayHome'));
const LandingIB = lazy(() => import('./pages/LandingIB'));
const LandingIELTS = lazy(() => import('./pages/LandingIELTS'));
const LandingUniversity = lazy(() => import('./pages/LandingUniversity'));
const LandingKids = lazy(() => import('./pages/LandingKids'));
const LandingFoundation = lazy(() => import('./pages/LandingFoundation'));
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
const Keystone = lazy(() => import('./pages/Keystone'));
const ThePetraEcosystem = lazy(() => import('./pages/ThePetraEcosystem'));
const TutorDivisions = lazy(() => import('./pages/TutorDivisions'));
const TutorProgression = lazy(() => import('./pages/TutorProgression'));

import ScrollToTop from './components/ScrollToTop';
import ExitIntentPopup from './components/ExitIntentPopup';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

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
            <Route path="system" element={<ThePetraEcosystem />} />
            <Route path="tutors" element={<Tutors />} />
            <Route path="team" element={<Team />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="inquiry" element={<Inquiry />} />
            <Route path="thank-you" element={<ThankYou />} />
            <Route path="about" element={<About />} />
            <Route path="no-admission-fee" element={<NoAdmissionFee />} />
            <Route path="hiring" element={<Hiring />} />
            <Route path="keystone" element={<Keystone />} />
            <Route path="ecosystem" element={<ThePetraEcosystem />} />
            <Route path="apply/divisions" element={<TutorDivisions />} />
            <Route path="apply/progression" element={<TutorProgression />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
