import React from 'react';
import Navbar from "../components/Navbar";
import { Outlet, useNavigation } from 'react-router';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';

const MainLayout = () => {
    const { loading: authLoading } = useAuth();
    const navigation = useNavigation();

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar at top */}
            <nav>
                <Navbar />
            </nav>

            {/* Main content fills available space */}
            <main className="flex-grow mt-18">
                {authLoading || navigation.state === 'loading' ? (
                    <Loading />
                ) : (
                    <Outlet />
                )}
            </main>

            {/* Footer sticks to bottom if page is short */}
            <Footer />
        </div>
    );
};

export default MainLayout;
