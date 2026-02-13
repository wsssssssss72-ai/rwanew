import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import Toast from './Toast';
import WhatsAppModal from './WhatsAppModal';
import SetupScreen from './SetupScreen';
import { useQuantum } from '../context/QuantumContext';

const Layout: React.FC = () => {
    const { profile, toast } = useQuantum();
    const [showWA, setShowWA] = useState(false);
    
    useEffect(() => {
        if (profile) {
            const hasJoined = localStorage.getItem("winners_wa_joined");
            if (!hasJoined) {
                // Delay popup slightly for better UX
                const timer = setTimeout(() => setShowWA(true), 1500);
                return () => clearTimeout(timer);
            }
        }
    }, [profile]);

    const handleCloseWA = () => {
        setShowWA(false);
        localStorage.setItem("winners_wa_joined", "true");
    };

    if (!profile) {
        return <SetupScreen />;
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-[#0f0f10]">
            {/* Desktop Sidebar */}
            <Sidebar className="hidden lg:flex" />

            {/* Main Workspace */}
            <div className="flex-1 flex flex-col min-h-screen lg:h-screen overflow-hidden">
                <Header />
                
                <main className="flex-1 overflow-y-auto pb-24 lg:pb-12 px-6 lg:px-16 pt-2 lg:pt-8 scroll-smooth">
                    <div className="pc-container w-full mx-auto">
                        <Outlet />
                    </div>
                </main>

                {/* Mobile Navigation */}
                <MobileNav className="lg:hidden" />
            </div>

            <WhatsAppModal isOpen={showWA} onClose={handleCloseWA} />

            {toast && <Toast message={toast.message} type={toast.type} />}
        </div>
    );
};

export default Layout;