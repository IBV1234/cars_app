import { useContext, useState, createContext } from "react";
export const UserContex = createContext();


export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ name: '', email: '', password: '', picture: '' });
    return (
        <UserContex.Provider value={{ user, setUser }}>
            {children}
        </UserContex.Provider>
    );
}


export const useUser =()=>{
    const context = useContext(UserContex);
    if (!context) {
        throw new Error("useUuser must be used within a UserProvider");
    }
    return context;
}