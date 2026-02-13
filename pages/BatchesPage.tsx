import React, { useEffect, useState } from 'react';
import { apiCall } from '../lib/logic';
import BatchCard from '../components/BatchCard';

const BatchesPage: React.FC = () => {
    const [batches, setBatches] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchBatches = async () => {
            const res = await apiCall("/get/mycoursev2?");
            if (res.data) setBatches(res.data);
            setLoading(false);
        };
        fetchBatches();
    }, []);

    const filtered = batches.filter(b => 
        b.course_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 lg:space-y-10 animate-fade-in pb-20 max-w-7xl mx-auto">
            {/* Search Bar Row (Matches Screenshot) */}
            <div className="flex items-center gap-2 mt-4">
                <div className="flex-1 flex items-center search-pill px-4 py-1.5 border-[#333]">
                    <i className="fas fa-search text-white/60 mr-3 text-lg"></i>
                    <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search Hare....." 
                        className="bg-transparent text-white text-[16px] w-full outline-none py-2 placeholder:text-zinc-600 font-medium"
                    />
                </div>
                <button className="purple-btn px-8 py-4 rounded-xl text-sm font-bold shadow-lg shadow-[#7B2FF7]/30 min-w-[100px]">
                    Search
                </button>
            </div>

            {/* Content Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="winners-card h-[400px] animate-pulse bg-white/5"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {filtered.map(batch => (
                        <div key={batch.id} className="animate-fade-in">
                            <BatchCard batch={batch} />
                        </div>
                    ))}
                </div>
            )}

            {!loading && filtered.length === 0 && (
                <div className="py-32 text-center opacity-40">
                    <i className="fas fa-search-minus text-5xl mb-6 text-[#7B2FF7]"></i>
                    <h4 className="text-xl font-bold">No results found for "{searchTerm}"</h4>
                    <p className="text-sm mt-2">Try adjusting your search query.</p>
                </div>
            )}
        </div>
    );
};

export default BatchesPage;