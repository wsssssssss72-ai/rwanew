import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuantum } from '../context/QuantumContext';

interface BatchCardProps {
    batch: any;
}

const BatchCard: React.FC<BatchCardProps> = ({ batch }) => {
    const navigate = useNavigate();
    const { favorites, toggleFavorite } = useQuantum();
    const isSaved = favorites.includes(batch.id.toString());

    // Robust thumbnail logic to handle various API response formats
    const imageUrl = 
        batch.course_thumbnail || 
        batch.course_image || 
        batch.thumbnail || 
        batch.course_spay_thumbnail || 
        batch.image || 
        `https://picsum.photos/seed/${batch.id}/400/225`;

    return (
        <div className="winners-card p-4 flex flex-col h-full bg-[#1c1c1e]/30 backdrop-blur-sm lg:p-6 group">
            {/* Header: Title and Fav Icon (Matches Screenshot) */}
            <div className="flex justify-between items-start mb-4 gap-3">
                <h3 className="text-[13px] lg:text-[16px] font-bold text-white line-clamp-1 flex-1 leading-tight uppercase">
                    {batch.course_name}
                </h3>
                <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(batch.id.toString()); }}
                    className="text-white hover:text-red-500 transition-colors p-1"
                >
                    <i className={`${isSaved ? 'fas text-white' : 'far text-white'} fa-heart text-xl`}></i>
                </button>
            </div>

            {/* Thumbnail Area with Winners Overlays */}
            <div className="relative aspect-video rounded-xl overflow-hidden mb-5 bg-zinc-900 border border-white/5">
                <img 
                    src={imageUrl} 
                    alt={batch.course_name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => { 
                        const target = e.target as HTMLImageElement;
                        if (!target.src.includes('placeholder')) {
                            target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop';
                        }
                    }}
                />
                
                {/* Validity Badge - Green Style from Screenshot */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 w-[100px]">
                    <div className="bg-[#00C853] px-3 py-1 rounded-sm text-center shadow-lg border border-white/10">
                        <div className="text-[7px] font-black text-white/90 leading-none mb-0.5 tracking-tighter">VALIDITY</div>
                        <div className="text-[10px] font-black text-white leading-tight whitespace-nowrap">12+6 MONTH</div>
                    </div>
                </div>

                {/* Subtitle Overlay */}
                <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex flex-col items-center justify-center text-center pointer-events-none opacity-80">
                     <span className="text-[8px] lg:text-[10px] font-bold text-white uppercase tracking-widest bg-black/40 px-3 py-1 backdrop-blur-sm rounded-full border border-white/5">
                        Complete Live+VOD Course
                    </span>
                </div>
            </div>

            {/* Primary Action Button (Purple from Screenshot) */}
            <button 
                onClick={() => navigate(`/batch/${batch.id}`, { state: { batchName: batch.course_name } })}
                className="purple-btn w-full py-3.5 rounded-xl text-[14px] font-bold uppercase tracking-[0.1em] active:scale-95 shadow-xl shadow-[#7B2FF7]/20 border border-white/5 mt-auto"
            >
                LET'S STUDY
            </button>
        </div>
    );
};

export default BatchCard;