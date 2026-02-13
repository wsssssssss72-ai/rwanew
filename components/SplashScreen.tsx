import React from 'react';

const SplashScreen: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[100] bg-[#030305] flex flex-col items-center justify-center p-8">
            <div className="relative mb-12 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-4 border-[#7B2FF7]/10 animate-pulse"></div>
                <div className="absolute inset-0 w-32 h-32 rounded-full border-t-4 border-[#7B2FF7] animate-spin"></div>
                <div className="absolute flex items-center justify-center">
                    <i className="fas fa-crown text-4xl text-[#7B2FF7] animate-bounce"></i>
                </div>
            </div>
            
            <div className="text-center">
                <h1 className="text-3xl md:text-5xl font-black mb-2 tracking-tighter text-white uppercase">
                    VIP<span className="text-[#7B2FF7]">STUDY</span>
                </h1>
                <p className="text-zinc-600 font-bold text-xs tracking-[0.4em] uppercase mb-8">
                    TERMINAL v2.4.0
                </p>
                
                <div className="flex gap-2 justify-center">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="w-1.5 h-6 bg-[#7B2FF7] rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}></div>
                    ))}
                </div>
            </div>
            
            <div className="absolute bottom-12 text-zinc-700 font-bold text-[10px] flex items-center gap-4 tracking-widest uppercase">
                <span>SECURE ENCRYPTION READY</span>
                <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
                <span>AUTHENTICATED</span>
            </div>
        </div>
    );
};

export default SplashScreen;