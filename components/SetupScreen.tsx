import React, { useState } from 'react';
import { useQuantum } from '../context/QuantumContext';

const SetupScreen: React.FC = () => {
    const { setProfile, showToast } = useQuantum();
    const [name, setName] = useState('');

    const handleStart = () => {
        if (!name.trim()) {
            showToast("Please enter your name", "error");
            return;
        }
        setProfile({ name, bio: "Student", joinDate: new Date().toISOString() });
    };

    return (
        <div className="fixed inset-0 z-[100] bg-[#030305] flex items-center justify-center p-6">
            <div className="max-w-md w-full winners-card p-12 bg-[#1c1c1e] text-center border-[#333] shadow-2xl">
                <div className="w-24 h-24 bg-[#7B2FF7] rounded-[2.5rem] mx-auto flex items-center justify-center mb-10 rotate-3 shadow-xl shadow-[#7B2FF7]/20">
                    <i className="fas fa-crown text-white text-4xl -rotate-3"></i>
                </div>
                
                <h2 className="text-3xl font-black mb-3 text-white uppercase tracking-tighter">VIPSTUDY</h2>
                <p className="text-zinc-500 text-sm mb-12 font-medium">Initialize your authorized student profile to access learning resources.</p>
                
                <div className="space-y-6">
                    <div className="search-pill flex items-center px-5 py-2 border-[#333]">
                        <i className="fas fa-id-card text-zinc-600 mr-4 text-lg"></i>
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Full Name" 
                            className="w-full bg-transparent py-4 text-white outline-none font-bold placeholder:text-zinc-700"
                            onKeyPress={(e) => e.key === 'Enter' && handleStart()}
                        />
                    </div>
                    
                    <button 
                        onClick={handleStart}
                        className="purple-btn w-full py-5 rounded-2xl shadow-xl shadow-[#7B2FF7]/20 text-sm font-black tracking-[0.2em] active:scale-95"
                    >
                        START STUDYING
                    </button>
                </div>
                
                <div className="mt-12 flex items-center justify-center gap-4 opacity-20">
                    <div className="h-[1px] flex-1 bg-white"></div>
                    <span className="text-[9px] font-black uppercase tracking-[0.3em]">SECURED TERMINAL</span>
                    <div className="h-[1px] flex-1 bg-white"></div>
                </div>
            </div>
        </div>
    );
};

export default SetupScreen;