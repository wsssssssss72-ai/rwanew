import React from 'react';
import { WA_LINK } from '../lib/logic';

interface WhatsAppModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const WhatsAppModal: React.FC<WhatsAppModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleJoin = () => {
        window.open(WA_LINK, "_blank");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-fade-in">
            <div className="max-w-md w-full winners-card p-10 bg-[#1c1c1e] text-center border-[#7B2FF7]/30 shadow-2xl shadow-[#7B2FF7]/10 relative">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                >
                    <i className="fas fa-times text-xl"></i>
                </button>

                <div className="w-24 h-24 bg-[#7B2FF7] rounded-[2rem] mx-auto flex items-center justify-center mb-8 shadow-xl shadow-[#7B2FF7]/20 rotate-3">
                    <i className="fab fa-whatsapp text-white text-5xl -rotate-3"></i>
                </div>
                
                <h3 className="text-2xl font-black mb-4 text-white uppercase tracking-tight">Official Community</h3>
                <p className="text-zinc-400 text-sm mb-10 leading-relaxed font-medium">
                    Join our official VIPSTUDY WhatsApp channel for real-time updates, free notes, and exclusive batch announcements.
                </p>
                
                <div className="space-y-4">
                    <button 
                        onClick={handleJoin}
                        className="purple-btn w-full py-4 rounded-2xl text-sm font-black tracking-widest flex items-center justify-center gap-3 active:scale-95"
                    >
                        JOIN CHANNEL NOW
                        <i className="fas fa-external-link-alt text-xs"></i>
                    </button>
                    
                    <button 
                        onClick={onClose}
                        className="w-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white font-bold py-3 rounded-2xl transition-all text-xs tracking-widest uppercase"
                    >
                        I'LL JOIN LATER
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WhatsAppModal;