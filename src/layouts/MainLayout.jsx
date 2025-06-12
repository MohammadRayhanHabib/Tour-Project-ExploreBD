import React from 'react';
import Navbar from "../components/Navbar"
import { Outlet, useNavigation } from 'react-router';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
const MainLayout = () => {
    const { loading: authLoading } = useAuth();
    const navigation = useNavigation();



    return (
        <div>
            <nav className='lg:max-w-[1440px] mx-auto'>

                <Navbar></Navbar>
            </nav>
            {/* <Outlet></Outlet> */}
            <div>

                {authLoading || navigation.state === 'loading' ? (
                    <Loading />
                ) : (
                    <Outlet />
                )}

            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;