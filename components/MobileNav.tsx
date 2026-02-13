import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileNav: React.FC<{ className?: string }> = ({ className }) => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    const navItems = [
        { name: 'Home', path: '/batches', icon: 'fa-home' },
        { name: 'Favrait', path: '/favorites', icon: 'fa-heart' }
    ];

    return (
        <div className={`fixed bottom-0 left-0 right-0 z-50 bg-[#1c1c1e] px-8 py-3 flex justify-around items-center border-t border-white/5 ${className}`}>
            {navItems.map((item) => (
                <Link 
                    key={item.path}
                    to={item.path} 
                    className={`flex flex-col items-center gap-1 transition-all ${
                        isActive(item.path) ? 'text-white' : 'text-zinc-500'
                    }`}
                >
                    <div className={`px-5 py-1.5 rounded-full transition-all ${isActive(item.path) ? 'bg-[#333335]' : ''}`}>
                        <i className={`${isActive(item.path) ? 'fas' : 'far'} ${item.icon} text-xl`}></i>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-tight">{item.name}</span>
                </Link>
            ))}
        </div>
    );
};

export default MobileNav;