import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { isAdmin } from '../../backend/middleware/isAdmin';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    

    useEffect (() => {
        const verifyUser = async () => {

            try {
                const res = await axios.get("http://localhost:5000/api/auth/me", { 
                    withCredentials: true 
                });

                if (res.data.success) {
                    setUser(res.data.user);
                }
            } catch (error) {
                console.log("No active session found");
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        verifyUser();
    }, []);
    const isAdmin = user?.role === 'admin';
    return (
        <UserContext.Provider value={{user, setUser, loading, isAdmin }}>
            {children}
        </UserContext.Provider>
    )
}

export const getData = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("getData must be used within a UserProvider");
    }
    return context;
};