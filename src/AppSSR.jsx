import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import Layout from './components/Layout';
import BoutiqueLoader from './components/BoutiqueLoader';
import ScrollToTop from './components/ScrollToTop';
import SummerPopup from './components/SummerPopup';

import GatewayHome from './pages/GatewayHome';
import LandingIB from './pages/LandingIB';
import LandingIELTS from './pages/LandingIELTS';
import LandingUniversity from './pages/LandingUniversity';
import LandingKids from './pages/LandingKids';
import LandingFoundation from './pages/LandingFoundation';
import LandingEnglish from './pages/LandingEnglish';
import LandingEiken from './pages/LandingEiken';
import LandingEikenPre2 from './pages/LandingEikenPre2';
import LandingEikenInterview from './pages/LandingEikenInterview';
import LandingIELTSWriting from './pages/LandingIELTSWriting';
import LandingIBExtended from './pages/LandingIBExtended';
import LandingIntlSchool from './pages/LandingIntlSchool';
import LandingReturnee from './pages/LandingReturnee';
import LandingKidsPrimary from './pages/LandingKidsPrimary';
import SetagayaEnglish from './pages/SetagayaEnglish';
import ShibuyaEnglish from './pages/ShibuyaEnglish';
import SuginaryEnglish from './pages/SuginaryEnglish';
import BusinessLanding from './pages/BusinessLanding';
import Home from './pages/Home';
import Tutors from './pages/Tutors';
import Team from './pages/Team';
import Pricing from './pages/Pricing';
import Inquiry from './pages/Inquiry';
import About from './pages/About';
import NoAdmissionFee from './pages/NoAdmissionFee';
import ThankYou from './pages/ThankYou';
import Hiring from './pages/Hiring';
import FAQPage from './pages/FAQPage';
import Keystone from './pages/Keystone';
import ThePetraEcosystem from './pages/ThePetraEcosystem';
import TutorDivisions from './pages/TutorDivisions';
import TutorProgression from './pages/TutorProgression';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Summer from './pages/Summer';
import NotFound from './pages/NotFound';

export default function AppSSR() {
    return (
        <>
            <BoutiqueLoader />
            <ScrollToTop />
            <SummerPopup />
            <Suspense fallback={<div style={{ minHeight: '100dvh', backgroundColor: 'var(--c-sand)' }} />}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<GatewayHome />} />
                        <Route path="ib" element={<LandingIB />} />
                        <Route path="ielts" element={<LandingIELTS />} />
                        <Route path="foundation" element={<LandingFoundation />} />
                        <Route path="university" element={<LandingUniversity />} />
                        <Route path="kids" element={<LandingKids />} />
                        <Route path="english" element={<LandingEnglish />} />
                        <Route path="eiken" element={<LandingEiken />} />
                        <Route path="eiken-pre2" element={<LandingEikenPre2 />} />
                        <Route path="eiken-interview" element={<LandingEikenInterview />} />
                        <Route path="ielts-writing" element={<LandingIELTSWriting />} />
                        <Route path="ib-ia-ee-tok" element={<LandingIBExtended />} />
                        <Route path="international-school-tutor" element={<LandingIntlSchool />} />
                        <Route path="returnee-english" element={<LandingReturnee />} />
                        <Route path="kids-english-primary" element={<LandingKidsPrimary />} />
                        <Route path="setagaya-english" element={<SetagayaEnglish />} />
                        <Route path="shibuya-english" element={<ShibuyaEnglish />} />
                        <Route path="suginami-english" element={<SuginaryEnglish />} />
                        <Route path="business" element={<BusinessLanding />} />
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
