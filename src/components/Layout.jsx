import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingCTA from './FloatingCTA';

export default function Layout() {
    const location = useLocation();
    const { i18n } = useTranslation();

    return (
        <>
            <Navbar />
            <main key={`${location.pathname}-${i18n.language}`}>
                <Outlet />
            </main>
            <Footer />
            <FloatingCTA />
        </>
    );
}
