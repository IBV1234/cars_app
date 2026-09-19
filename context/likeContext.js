import React, { createContext, useContext, useState } from 'react';

export const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
    const [likeIds, setLikeIds] = useState(new Set());

    return (
        <LikeContext.Provider value={{ likeIds, setLikeIds }}>
            {children}
        </LikeContext.Provider>
    );
};

export const useLike = () => {
    const context = useContext(LikeContext);
    if (!context) {
        throw new Error('useLike must be used within a LikeProvider');
    }
    return context;
};
