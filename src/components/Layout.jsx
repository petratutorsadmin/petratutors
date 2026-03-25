import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WelcomePopup from './WelcomePopup';
import LineButton from './LineButton';

export default function Layout() {
    return (
        <>
            <WelcomePopup />
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
            <LineButton />
        </>
    );
}
