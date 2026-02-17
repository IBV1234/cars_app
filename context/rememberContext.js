import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

export const RememberMeContext = createContext();

export const RememberMeProvider = ({ children }) => {
    const [isSelected, setSelection] = useState(false);
    return (
        <RememberMeContext.Provider value={{ isSelected, setSelection }}>
            {children}
        </RememberMeContext.Provider>
    );
}


export const useRememberMe = () =>{
    const context = useContext(RememberMeContext);
    if (!context) {
        throw new Error("useRememberMe must be used within a RememberMeProvider");
    }
    return context;

}