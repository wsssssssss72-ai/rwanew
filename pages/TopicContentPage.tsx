
import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { apiCall, decrypt, RENDER_PDF } from '../lib/logic';
import VideoModal from '../components/VideoModal';

const TopicContentPage: React.FC = () => {
    const { batchId, subjectId, topicId } = useParams();
    const location = useLocation();
    const [content, setContent] = useState<any[]>([]);
    const [filter, setFilter] = useState<'video' | 'pdf'>('video');
    const [loading, setLoading] = useState(true);
    const [activeVideo, setActiveVideo] = useState<{ id: string, title: string } | null>(null);

    const topicName = location.state?.topicName || "Topic Contents";
    const subjectName = location.state?.subjectName || "Subject";
    const batchName = location.state?.batchName || "Batch";

    const VIDEO_THUMBNAIL = "https://cdn.phototourl.com/uploads/2026-02-13-ac0fedb3-dc43-4aa4-9620-d9e329fcf2c5.png";

    useEffect(() => {
        const fetchContent = async () => {
            setLoading(true);
            const res = await apiCall(`/get/livecourseclassbycoursesubtopconceptapiv3?courseid=${batchId}&subjectid=${subjectId}&topicid=${topicId}&conceptid=&start=-1`);
            if (res.data) setContent(res.data);
            setLoading(false);
        };
        fetchContent();
    }, [batchId, subjectId, topicId]);

    const items = content.filter(item => {
        if (filter === 'video') return item.id;
        return item.pdf_link || item.pdf_link2;
    });

    const openPdf = (link: string) => {
        let finalLink = link;
        if (!link.startsWith("http")) finalLink = decrypt(link);
        window.open(`${RENDER_PDF}${encodeURIComponent(finalLink)}`, "_blank");
    };

    return (
        <div className="space-y-6 lg:space-y-10 max-w-4xl mx-auto pb-20">
            {/* Header: Centered Topic Title (Matches Screenshot) */}
            <div className="flex flex-col gap-4 mt-2">
                <Link 
                    to={`/batch/${batchId}/subject/${subjectId}`} 
                    state={{ subjectName, batchName }}
                    className="text-zinc-500 text-xs font-bold flex items-center gap-2 hover:text-white transition-all uppercase tracking-widest"
                >
                    <i className="fas fa-chevron-left"></i> BACK TO TOPICS
                </Link>
                <div className="bg-[#1c1c1e] p-6 rounded-3xl border border-white/5 shadow-2xl">
                    <h2 className="text-xl md:text-2xl font-black text-center text-white tracking-tight">
                        {topicName}
                    </h2>
                </div>
            </div>

            {/* Content Selector Tabs */}
            <div className="flex justify-center">
                <div className="flex p-1 bg-white/5 rounded-2xl border border-white/5">
                    <button 
                        onClick={() => setFilter('video')}
                        className={`px-8 py-3 rounded-xl text-[11px] font-black transition-all flex items-center gap-2 tracking-widest ${
                            filter === 'video' ? 'bg-[#7B2FF7] text-white shadow-lg' : 'text-zinc-500 hover:text-white'
                        }`}
                    >
                        <i className="fas fa-play"></i> VIDEOS
                    </button>
                    <button 
                        onClick={() => setFilter('pdf')}
                        className={`px-8 py-3 rounded-xl text-[11px] font-black transition-all flex items-center gap-2 tracking-widest ${
                            filter === 'pdf' ? 'bg-[#7B2FF7] text-white shadow-lg' : 'text-zinc-500 hover:text-white'
                        }`}
                    >
                        <i className="fas fa-file-pdf"></i> ASSETS
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-32 rounded-3xl border border-zinc-800 animate-pulse bg-white/5"></div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-5">
                    {items.map((item, index) => (
                        <div 
                            key={item.id || Math.random()} 
                            onClick={() => filter === 'video' 
                                ? setActiveVideo({ id: item.id, title: item.Title }) 
                                : openPdf(item.pdf_link || item.pdf_link2)
                            }
                            className="group flex flex-row items-center gap-4 p-3 bg-[#121214] border border-zinc-700/50 rounded-[2rem] hover:border-[#7B2FF7] transition-all active:scale-[0.98] cursor-pointer"
                        >
                            {/* Left Side: Thumbnail Area (Matches Screenshot) */}
                            <div className="shrink-0 w-28 h-28 md:w-36 md:h-28 rounded-2xl overflow-hidden bg-black border border-white/5 relative">
                                {filter === 'video' ? (
                                    <img 
                                        src={VIDEO_THUMBNAIL} 
                                        alt="Thumbnail" 
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-rose-500/5 text-rose-500">
                                        <i className="fas fa-file-pdf text-4xl"></i>
                                    </div>
                                )}
                                {/* Status Indicator Overlay */}
                                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
                            </div>

                            {/* Right Side: Content Information (Matches Screenshot) */}
                            <div className="flex-1 flex flex-col justify-center pr-2">
                                <h4 className="font-bold text-[14px] md:text-[16px] text-white group-hover:text-[#7B2FF7] transition-colors line-clamp-2 leading-tight mb-2">
                                    {filter === 'video' ? `Class-${index + 1} ${item.Title}` : item.Title}
                                </h4>
                                
                                {/* Horizontal Divider (Matches Screenshot) */}
                                <div className="w-full h-[1px] bg-white/10 mb-2"></div>
                                
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center border border-white/5">
                                        <i className="far fa-calendar-alt text-[#7B2FF7] text-[10px]"></i>
                                    </div>
                                    <span className="text-[11px] font-bold text-zinc-500 tracking-tight">
                                        {item.lesson_date || "Synced recently"} at {item.lesson_time || "05:05 pm"}
                                    </span>
                                </div>
                            </div>

                            {/* Optional: Lock icon for secure content look */}
                            <div className="hidden md:flex pr-4">
                                <i className="fas fa-shield-alt text-zinc-800 group-hover:text-[#7B2FF7]/30 transition-colors"></i>
                            </div>
                        </div>
                    ))}
                    
                    {items.length === 0 && (
                        <div className="py-24 text-center border border-dashed border-zinc-800 rounded-[3rem]">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <i className="fas fa-box-open text-2xl text-zinc-700"></i>
                            </div>
                            <h4 className="text-lg font-bold text-zinc-500 uppercase tracking-widest">No modules available</h4>
                        </div>
                    )}
                </div>
            )}

            {activeVideo && (
                <VideoModal 
                    videoId={activeVideo.id} 
                    courseId={batchId!} 
                    title={activeVideo.title} 
                    onClose={() => setActiveVideo(null)} 
                />
            )}
        </div>
    );
};

export default TopicContentPage;
