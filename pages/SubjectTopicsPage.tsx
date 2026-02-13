
import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { apiCall } from '../lib/logic';
import TopicCard from '../components/TopicCard';

const SubjectTopicsPage: React.FC = () => {
    const { batchId, subjectId } = useParams();
    const location = useLocation();
    const [topics, setTopics] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const subjectName = location.state?.subjectName || "Subject Topics";
    const batchName = location.state?.batchName || "Batch";

    useEffect(() => {
        const fetchTopics = async () => {
            setLoading(true);
            const res = await apiCall(`/get/alltopicfrmlivecourseclass?courseid=${batchId}&subjectid=${subjectId}&start=-1`);
            if (res.data) setTopics(res.data);
            setLoading(false);
        };
        fetchTopics();
    }, [batchId, subjectId]);

    return (
        <div className="space-y-6 lg:space-y-10 max-w-4xl mx-auto">
            {/* Header: Centered Subject Title (Matches Screenshot) */}
            <div className="flex flex-col gap-4 mt-2">
                <Link to={`/batch/${batchId}`} state={{ batchName }} className="text-zinc-500 text-xs font-bold flex items-center gap-2 hover:text-white transition-all uppercase tracking-widest">
                    <i className="fas fa-chevron-left"></i> BACK TO SUBJECTS
                </Link>
                <div className="bg-[#1c1c1e] p-6 rounded-3xl border border-white/5 shadow-2xl">
                    <h2 className="text-xl md:text-2xl font-black text-center text-white tracking-tight uppercase">
                        {subjectName}
                    </h2>
                </div>
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-16 rounded-full border border-zinc-800 animate-pulse bg-white/5"></div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-4 pb-12">
                    {topics.map(topic => (
                        <TopicCard 
                            key={topic.topicid} 
                            topic={topic} 
                            batchId={batchId!} 
                            subjectId={subjectId!} 
                            subjectName={subjectName} 
                            batchName={batchName} 
                        />
                    ))}
                    {topics.length === 0 && (
                        <div className="py-24 text-center border border-dashed border-zinc-800 rounded-[3rem]">
                            <i className="fas fa-folder-open text-4xl text-zinc-700 mb-6"></i>
                            <h4 className="text-xl font-bold text-zinc-500 uppercase tracking-widest">No Topics Found</h4>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SubjectTopicsPage;
