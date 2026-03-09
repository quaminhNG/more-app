import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('more_app_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        const registeredUsers = JSON.parse(localStorage.getItem('more_app_users') || '[]');
        const existingUser = registeredUsers.find(u => u.email === userData.email && u.password === userData.password);

        if (existingUser || (userData.email === 'demo@tasksystem.com')) {
            const loggedInUser = existingUser || userData;
            setUser(loggedInUser);
            localStorage.setItem('more_app_user', JSON.stringify(loggedInUser));
            return true;
        }
        return false;
    };

    const register = (userData) => {
        const registeredUsers = JSON.parse(localStorage.getItem('more_app_users') || '[]');
        const userExists = registeredUsers.some(u => u.email === userData.email);
        if (userExists) {
            return false;
        }
        registeredUsers.push(userData);
        localStorage.setItem('more_app_users', JSON.stringify(registeredUsers));

        setUser(userData);
        localStorage.setItem('more_app_user', JSON.stringify(userData));
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('more_app_user');
    };

    if (loading) return null;

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
