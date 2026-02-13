import React from 'react';
import { Link } from 'react-router-dom';

interface SubjectCardProps {
    subject: any;
    batchId: string;
    batchName: string;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject, batchId, batchName }) => {
    // Logic to determine badge text and color theme based on subject name
    const getBadgeInfo = (name: string) => {
        const n = name.toLowerCase();
        if (n.includes('hindi')) return { text: 'HINDI', color: '#FF3B30', borderColor: 'border-[#FF3B30]' };
        if (n.includes('maths')) return { text: 'MATHS', color: '#007AFF', borderColor: 'border-[#007AFF]' };
        if (n.includes('science')) return { text: 'SCIENCE', color: '#34C759', borderColor: 'border-[#34C759]' };
        if (n.includes('social science')) return { text: 'SOCIAL SCIENCE', color: '#5856D6', borderColor: 'border-[#5856D6]' };
        if (n.includes('pedagogy')) return { text: 'COMMON PEDAGOGY', color: '#FFCC00', borderColor: 'border-[#FFCC00]' };
        if (n.includes('cdp')) return { text: 'CDP', color: '#AF52DE', borderColor: 'border-[#AF52DE]' };
        if (n.includes('smp')) return { text: 'SMP', color: '#FF9500', borderColor: 'border-[#FF9500]' };
        if (n.includes('sanskrit') || n.includes('संस्कृत')) return { text: 'संस्कृत', color: '#5AC8FA', borderColor: 'border-[#5AC8FA]' };
        
        // Default
        return { text: name.split(' ')[0].toUpperCase(), color: '#7B2FF7', borderColor: 'border-[#7B2FF7]' };
    };

    const badge = getBadgeInfo(subject.subject_name);

    return (
        <Link 
            to={`/batch/${batchId}/subject/${subject.subjectid}`}
            state={{ subjectName: subject.subject_name, batchName }}
            className="group flex items-center gap-4 p-2 bg-[#121214] border border-zinc-700/50 rounded-full hover:border-[#7B2FF7] transition-all active:scale-[0.98]"
        >
            {/* Subject Badge - Replicating screenshot style */}
            <div className={`shrink-0 w-16 h-16 rounded-full border-2 ${badge.borderColor} flex flex-col items-center justify-center bg-black overflow-hidden relative shadow-lg`}>
                <div className="flex flex-col items-center justify-center p-1 text-center">
                    <span 
                        className="text-[10px] font-black leading-tight tracking-tighter text-white"
                        style={{ fontSize: badge.text.length > 8 ? '7px' : '9px' }}
                    >
                        {badge.text}
                    </span>
                    <div className="w-10 h-[1px] bg-white/20 my-0.5"></div>
                    <span className="text-[6px] font-bold text-white/60 tracking-widest uppercase">Video Lecture</span>
                </div>
                {/* Subtle Glow inside the circle */}
                <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>
            </div>

            {/* Subject Name */}
            <div className="flex-1 px-2">
                <h4 className="font-bold text-[15px] md:text-[17px] text-white group-hover:text-[#7B2FF7] transition-colors line-clamp-1">
                    {subject.subject_name}
                </h4>
            </div>

            {/* Empty right area to match screenshot (no arrow) */}
            <div className="w-4"></div>
        </Link>
    );
};

export default SubjectCard;