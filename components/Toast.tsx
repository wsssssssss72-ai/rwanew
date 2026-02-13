
import React from 'react';

interface ToastProps {
    message: string;
    type: string;
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
    const colors = type === 'success' ? 'border-emerald-500/50 text-emerald-400' : 
                   type === 'error' ? 'border-red-500/50 text-red-400' : 
                   'border-emerald-400/50 text-white';

    return (
        <div className="fixed top-6 right-4 left-4 md:left-auto md:w-80 z-[100] glass border rounded-2xl p-4 shadow-2xl shadow-black/50 animate-bounce-in flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center ${colors}`}>
                <i className={`fas ${type === 'success' ? 'fa-check' : type === 'error' ? 'fa-exclamation-triangle' : 'fa-info-circle'}`}></i>
            </div>
            <p className="text-sm font-semibold tracking-tight">{message}</p>
        </div>
    );
};

export default Toast;
