
import React, { createContext, useContext, useState, useEffect } from 'react';
import { safeParse } from '../lib/logic';

interface QuantumContextType {
    profile: any;
    setProfile: (p: any) => void;
    favorites: string[];
    toggleFavorite: (id: string) => void;
    toast: { message: string; type: string } | null;
    showToast: (message: string, type?: string) => void;
}

const QuantumContext = createContext<QuantumContextType | undefined>(undefined);

export const QuantumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [profile, setProfileState] = useState(safeParse("spidy_profile"));
    const [favorites, setFavorites] = useState<string[]>(safeParse("spidy_favs") || []);
    const [toast, setToast] = useState<{ message: string; type: string } | null>(null);

    const setProfile = (p: any) => {
        setProfileState(p);
        localStorage.setItem("spidy_profile", JSON.stringify(p));
    };

    const toggleFavorite = (id: string) => {
        const newFavs = favorites.includes(id) 
            ? favorites.filter(f => f !== id) 
            : [...favorites, id];
        setFavorites(newFavs);
        localStorage.setItem("spidy_favs", JSON.stringify(newFavs));
        showToast(favorites.includes(id) ? "Removed from favorites" : "Added to favorites", "success");
    };

    const showToast = (message: string, type: string = "info") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <QuantumContext.Provider value={{ profile, setProfile, favorites, toggleFavorite, toast, showToast }}>
            {children}
        </QuantumContext.Provider>
    );
};

export const useQuantum = () => {
    const context = useContext(QuantumContext);
    if (!context) throw new Error("useQuantum must be used within QuantumProvider");
    return context;
};
