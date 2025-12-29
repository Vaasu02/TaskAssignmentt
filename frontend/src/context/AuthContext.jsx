import { createContext, useState, useEffect } from 'react';
import API from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    const register = async (userData) => {
        try {
            const res = await API.post('/auth/register', userData);
            if (res.data) {
                localStorage.setItem('user', JSON.stringify(res.data));
                setUser(res.data);
                toast.success('Registered successfully!');
                return true;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
            return false;
        }
    };

    const login = async (userData) => {
        try {
            const res = await API.post('/auth/login', userData);
            if (res.data) {
                localStorage.setItem('user', JSON.stringify(res.data));
                setUser(res.data);
                toast.success('Logged in!');
                return true;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        toast.success('Logged out');
    };

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
