import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { apiCall } from '../lib/logic';
import SubjectCard from '../components/SubjectCard';

const BatchDetailsPage: React.FC = () => {
    const { batchId } = useParams();
    const location = useLocation();
    const [subjects, setSubjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const batchName = location.state?.batchName || "Authorized Batch";

    useEffect(() => {
        const fetchSubjects = async () => {
            setLoading(true);
            const res = await apiCall(`/get/allsubjectfrmlivecourseclass?courseid=${batchId}&start=-1`);
            if (res.data) setSubjects(res.data);
            setLoading(false);
        };
        fetchSubjects();
    }, [batchId]);

    return (
        <div className="space-y-6 lg:space-y-10 max-w-4xl mx-auto">
            <div className="flex flex-col gap-4 mt-2">
                <Link to="/batches" className="text-zinc-500 text-xs font-bold flex items-center gap-2 hover:text-white transition-all uppercase tracking-widest">
                    <i className="fas fa-chevron-left"></i> BACK TO DASHBOARD
                </Link>
                <div className="bg-[#1c1c1e] p-6 rounded-3xl border border-white/5 shadow-2xl">
                    <h2 className="text-xl md:text-2xl font-black text-center text-white tracking-tight">
                        {batchName}
                    </h2>
                </div>
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-20 rounded-full border border-zinc-800 animate-pulse bg-white/5"></div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-4 pb-12">
                    {subjects.map(subject => (
                        <SubjectCard 
                            key={subject.subjectid} 
                            subject={subject} 
                            batchId={batchId!} 
                            batchName={batchName} 
                        />
                    ))}
                    {subjects.length === 0 && (
                        <div className="py-24 text-center border border-dashed border-zinc-800 rounded-[3rem]">
                            <i className="fas fa-satellite-dish text-4xl text-zinc-700 mb-6"></i>
                            <h4 className="text-xl font-bold text-zinc-500">No subject signals detected</h4>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default BatchDetailsPage;