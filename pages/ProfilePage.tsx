
import React, { useState } from 'react';
import { useQuantum } from '../context/QuantumContext';

const ProfilePage: React.FC = () => {
    const { profile, setProfile, showToast } = useQuantum();
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ name: profile?.name || '', bio: profile?.bio || '' });

    const handleSave = () => {
        setProfile({ ...profile, ...editData });
        setIsEditing(false);
        showToast("Identity updated successfully", "success");
    };

    const handleReset = () => {
        if (confirm("Initiate system purge? All local data will be permanently erased.")) {
            localStorage.clear();
            window.location.reload();
        }
    };

    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(profile?.name || 'User')}&backgroundColor=0a0a0f`;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="glass-card p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8">
                    <div className="px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">
                        Verified Operator
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
                    <div className="relative">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-emerald-500/20 p-2">
                            <img src={avatarUrl} alt="Profile" className="w-full h-full rounded-full bg-slate-900 border-4 border-slate-900" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-black shadow-lg">
                            <i className="fas fa-shield-alt text-sm"></i>
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-6">
                        <div>
                            <h2 className="text-4xl font-black tracking-tighter mb-2">{profile?.name}</h2>
                            <p className="text-slate-400 font-medium">{profile?.bio}</p>
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <button 
                                onClick={() => setIsEditing(true)}
                                className="bg-white/5 hover:bg-white/10 border border-white/5 px-6 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-2"
                            >
                                <i className="fas fa-edit"></i> MODIFY IDENTITY
                            </button>
                            <button 
                                onClick={handleReset}
                                className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 px-6 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-2"
                            >
                                <i className="fas fa-power-off"></i> SYSTEM PURGE
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-card p-8 rounded-[2.5rem] space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-3">
                        <i className="fas fa-chart-line text-emerald-500"></i> SYSTEM STATS
                    </h3>
                    <div className="space-y-6">
                        {[
                            { label: 'Network Latency', value: '14ms', color: 'bg-emerald-500' },
                            { label: 'Uptime Reliability', value: '99.9%', color: 'bg-emerald-400' },
                            { label: 'Encryption Level', value: 'AES-256', color: 'bg-cyan-500' }
                        ].map((stat) => (
                            <div key={stat.label}>
                                <div className="flex justify-between text-xs font-bold mb-3 uppercase tracking-widest text-slate-500">
                                    <span>{stat.label}</span>
                                    <span className="text-white">{stat.value}</span>
                                </div>
                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <div className={`h-full ${stat.color} rounded-full w-[85%]`}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card p-8 rounded-[2.5rem] space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-3">
                        <i className="fas fa-microchip text-cyan-500"></i> ARCHITECTURE
                    </h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-white/5 rounded-2xl flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-500">QUANTUM OS</span>
                            <span className="text-xs font-mono text-emerald-400">v23.4.0 PRO</span>
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-500">BUILD ID</span>
                            <span className="text-xs font-mono text-emerald-400">77X-F622-QR1</span>
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-500">API GATEWAY</span>
                            <span className="text-xs font-mono text-emerald-400 uppercase">Synced</span>
                        </div>
                    </div>
                </div>
            </div>

            {isEditing && (
                <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex items-center justify-center p-6">
                    <div className="max-w-md w-full glass-card p-10 rounded-[2.5rem]">
                        <h3 className="text-2xl font-bold mb-8">Modify Identity</h3>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Operator Name</label>
                                <input 
                                    type="text" 
                                    value={editData.name}
                                    onChange={(e) => setEditData({...editData, name: e.target.value})}
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-emerald-500/30 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">System Bio</label>
                                <input 
                                    type="text" 
                                    value={editData.bio}
                                    onChange={(e) => setEditData({...editData, bio: e.target.value})}
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-emerald-500/30 transition-all"
                                />
                            </div>
                        </div>
                        <div className="flex gap-4 mt-10">
                            <button onClick={handleSave} className="flex-1 bg-emerald-400 text-black font-bold py-4 rounded-2xl hover:bg-emerald-300 transition-all">SAVE MODS</button>
                            <button onClick={() => setIsEditing(false)} className="flex-1 bg-white/5 font-bold py-4 rounded-2xl hover:bg-white/10 transition-all">ABORT</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
