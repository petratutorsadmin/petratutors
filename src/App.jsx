import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// New gateway & landing pages
import GatewayHome from './pages/GatewayHome';
import LandingIB from './pages/LandingIB';
import LandingIELTS from './pages/LandingIELTS';
import LandingUniversity from './pages/LandingUniversity';
import LandingKids from './pages/LandingKids';
import LandingFoundation from './pages/LandingFoundation';

// Existing pages
import Home from './pages/Home';
import Programs from './pages/Programs';
import Tutors from './pages/Tutors';
import Pricing from './pages/Pricing';
import Inquiry from './pages/Inquiry';
import About from './pages/About';
import NoAdmissionFee from './pages/NoAdmissionFee';
import ThankYou from './pages/ThankYou';
import BusinessLanding from './pages/BusinessLanding';

import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <>
      <ScrollToTop />
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
    </>
  );
}

export default App;
