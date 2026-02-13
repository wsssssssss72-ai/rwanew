import React, { useState } from 'react';
import { apiCall, decrypt, RENDER_PLAYER } from '../lib/logic';
import { useQuantum } from '../context/QuantumContext';

interface VideoModalProps {
    videoId: string;
    courseId: string;
    title: string;
    onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoId, courseId, title, onClose }) => {
    const [step, setStep] = useState<'quality' | 'player'>('quality');
    const [videoUrl, setVideoUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const { showToast } = useQuantum();

    const fetchDetails = async (quality: string) => {
        setLoading(true);
        showToast("Decrypting Stream...", "info");
        
        try {
            const res = await apiCall(`/get/fetchVideoDetailsById?course_id=${courseId}&video_id=${videoId}&ytflag=0&folder_wise_course=0`);
            
            if (res.data) {
                if (res.data.video_id && !res.data.download_link) {
                    // YouTube stream
                    let vid = res.data.video_id;
                    if (vid.length > 20) vid = decrypt(vid);
                    setVideoUrl(`https://www.youtube.com/embed/${vid}?autoplay=1`);
                    setStep('player');
                } else if (res.data.download_link) {
                    // Encrypted MP4 stream
                    let url = decrypt(res.data.download_link);
                    if (quality !== '0') {
                        // Verbatim quality replace logic
                        ['720p', '480p', '360p', '240p'].forEach(q => {
                            if (url.includes(`/${q}/`)) url = url.replace(`/${q}/`, `/${quality}/`);
                        });
                    }
                    setVideoUrl(`${RENDER_PLAYER}${encodeURIComponent(url)}`);
                    setStep('player');
                } else {
                    showToast("Stream link invalid", "error");
                    onClose();
                }
            } else {
                showToast("Video not found", "error");
                onClose();
            }
        } catch (err) {
            showToast("Network error", "error");
            onClose();
        } finally {
            setLoading(false);
        }
    };

    if (step === 'quality') {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
                <div className="max-w-md w-full winners-card bg-[#1c1c1e] p-10 rounded-3xl border-[#7B2FF7]/20">
                    <div className="flex justify-between items-center mb-10">
                        <div className="text-left">
                            <h3 className="text-2xl font-bold uppercase tracking-tight">Select Quality</h3>
                            <p className="text-zinc-500 text-sm mt-1">Optimize your bandwidth</p>
                        </div>
                        <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        {[
                            { l: '720p HD', v: '720p', i: 'fa-tv' },
                            { l: '480p SD', v: '480p', i: 'fa-mobile-alt' },
                            { l: '360p ECO', v: '360p', i: 'fa-leaf' },
                            { l: '240p LOW', v: '240p', i: 'fa-battery-quarter' }
                        ].map((q) => (
                            <button 
                                key={q.v}
                                onClick={() => fetchDetails(q.v)}
                                disabled={loading}
                                className="bg-white/5 hover:bg-[#7B2FF7]/10 border border-white/5 hover:border-[#7B2FF7]/30 p-5 rounded-2xl flex flex-col items-center gap-3 transition-all disabled:opacity-50 group"
                            >
                                <i className={`fas ${q.i} text-xl group-hover:scale-110 transition-transform text-[#7B2FF7]`}></i>
                                <span className="font-bold text-sm">{q.l}</span>
                            </button>
                        ))}
                    </div>

                    <button 
                        onClick={() => fetchDetails('0')}
                        disabled={loading}
                        className="purple-btn w-full py-4 rounded-2xl transition-all shadow-lg shadow-[#7B2FF7]/10 disabled:opacity-50 uppercase tracking-widest text-sm"
                    >
                        {loading ? 'INITIALIZING...' : 'AUTO RECOMMENDATION'}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
            <div className="bg-[#1c1c1e] px-6 py-4 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-4">
                    <button onClick={onClose} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                        <i className="fas fa-arrow-left"></i>
                    </button>
                    <div>
                        <h4 className="font-bold truncate max-w-xs md:max-w-xl text-white uppercase tracking-tight">{title}</h4>
                        <p className="text-[10px] text-[#7B2FF7] font-bold uppercase tracking-widest">VIPSTUDY PLAYER v2.0</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="hidden md:block text-[10px] text-zinc-500 font-mono tracking-widest">SECURE STREAM</span>
                    <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-500/20 text-red-500 transition-colors">
                        <i className="fas fa-power-off"></i>
                    </button>
                </div>
            </div>
            
            <div className="flex-1 flex items-center justify-center p-2 md:p-8 bg-[#030305]">
                <div className="w-full max-w-6xl aspect-video rounded-3xl overflow-hidden border-4 border-white/5 shadow-2xl relative">
                    <iframe 
                        src={videoUrl} 
                        className="w-full h-full" 
                        allow="autoplay; fullscreen"
                        frameBorder="0"
                    ></iframe>
                </div>
            </div>
            
            <div className="bg-[#1c1c1e] px-8 py-6 hidden md:block border-t border-white/5">
                <div className="flex items-center justify-between text-zinc-500 text-xs font-bold uppercase tracking-widest">
                    <div className="flex gap-6">
                        <span className="flex items-center gap-2"><i className="fas fa-check-circle text-[#00C853]"></i> Buffer Optimized</span>
                        <span className="flex items-center gap-2"><i className="fas fa-lock text-[#7B2FF7]"></i> Secure Access</span>
                    </div>
                    <span>© VIPSTUDY TERMINAL</span>
                </div>
            </div>
        </div>
    );
};

export default VideoModal;