import React from 'react';
import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-50 bg-[#0f0f10] px-6 py-5 flex items-center justify-between border-b border-white/5 lg:border-none lg:bg-transparent lg:px-12 lg:pt-8">
            <button className="text-white text-2xl">
                <i className="fas fa-bars-staggered"></i>
            </button>
            
            <h1 className="text-xl lg:text-3xl font-bold text-white tracking-tight">
                VIPSTUDY
            </h1>
            
            <div className="w-8"></div> {/* Placeholder for symmetry */}
        </header>
    );
};

export default Header;