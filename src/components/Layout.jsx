import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingCTA from './FloatingCTA';
import AnnouncementBar from './AnnouncementBar';

const NO_BAR_PATHS = new Set(['/summer', '/thank-you', '/privacy']);

export default function Layout() {
    const location = useLocation();
    const { i18n } = useTranslation();
    const showBar = !NO_BAR_PATHS.has(location.pathname);

    return (
        <>
            <AnnouncementBar />
            <Navbar top={showBar ? '52px' : '12px'} />
            <main key={`${location.pathname}-${i18n.language}`} className="page-fade-in" style={{ paddingTop: showBar ? '136px' : '96px' }}>
                <Outlet />
            </main>
            <Footer />
            <FloatingCTA />
        </>
    );
}
