import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WelcomePopup from './WelcomePopup';
import FloatingCTA from './FloatingCTA';

export default function Layout() {
    return (
        <>
            <WelcomePopup />
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
            <FloatingCTA />
        </>
    );
}
