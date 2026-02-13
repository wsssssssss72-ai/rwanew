import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
    className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path || (path !== '/batches' && location.pathname.startsWith(path));

    const navItems = [
        { name: 'Home', path: '/batches', icon: 'fa-house' },
        { name: 'Favorites', path: '/favorites', icon: 'fa-heart' },
        { name: 'Identity', path: '/profile', icon: 'fa-user' }
    ];

    return (
        <aside className={`w-[320px] h-screen bg-[#101012] border-r border-white/5 flex flex-col ${className}`}>
            <div className="p-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#7B2FF7] flex items-center justify-center shadow-lg shadow-[#7B2FF7]/20">
                        <i className="fas fa-crown text-white text-xl"></i>
                    </div>
                    <div>
                        <h1 className="text-xl font-black tracking-tighter text-white uppercase">VIPSTUDY</h1>
                        <span className="text-[10px] font-bold text-zinc-600 tracking-[0.3em] uppercase">Terminal</span>
                    </div>
                </div>
            </div>

            <nav className="flex-1 px-6 space-y-3 mt-4">
                {navItems.map((item) => (
                    <Link 
                        key={item.path}
                        to={item.path} 
                        className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${
                            isActive(item.path) 
                            ? 'bg-[#7B2FF7] text-white shadow-xl shadow-[#7B2FF7]/20' 
                            : 'text-zinc-500 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        <i className={`fas ${item.icon} text-lg w-6 text-center`}></i>
                        <span className="font-bold text-sm tracking-widest uppercase">{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-8 mt-auto">
                <div className="bg-[#1c1c1e] rounded-3xl p-6 border border-white/5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#00C853] animate-pulse shadow-[0_0_10px_#00C853]"></div>
                        <span className="text-[10px] font-black uppercase text-[#00C853] tracking-widest">Active Member</span>
                    </div>
                    <p className="text-[12px] text-zinc-500 leading-relaxed font-medium">Accessing authorized terminal v2.4.0</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;