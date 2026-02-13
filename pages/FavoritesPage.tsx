
import React, { useEffect, useState } from 'react';
import { useQuantum } from '../context/QuantumContext';
import { apiCall } from '../lib/logic';
import BatchCard from '../components/BatchCard';

const FavoritesPage: React.FC = () => {
    const { favorites } = useQuantum();
    const [batches, setBatches] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBatches = async () => {
            const res = await apiCall("/get/mycoursev2?");
            if (res.data) setBatches(res.data);
            setLoading(false);
        };
        fetchBatches();
    }, []);

    const favBatches = batches.filter(b => favorites.includes(b.id.toString()));

    if (loading) {
        return <div className="grid grid-cols-1 md:grid-cols-3 gap-8"><div className="glass-card h-80 shimmer rounded-2xl col-span-full"></div></div>;
    }

    return (
        <div className="space-y-12">
            <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black tracking-tighter mb-4">
                        SAVED<span className="gradient-text">_VAULT</span>
                    </h2>
                    <p className="text-slate-500 max-w-lg leading-relaxed font-medium">
                        Your personalized library of quantum modules. Access your pinned subjects and rapid-response assets here.
                    </p>
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {favBatches.map(batch => (
                    <BatchCard key={batch.id} batch={batch} />
                ))}
                {favBatches.length === 0 && (
                    <div className="col-span-full py-32 text-center glass rounded-[3rem]">
                        <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="fas fa-star text-3xl text-yellow-500/50"></i>
                        </div>
                        <h4 className="text-2xl font-black text-slate-500">Vault Empty</h4>
                        <p className="text-slate-600 mt-2 font-medium">Pin your favorite modules for rapid deployment.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;
