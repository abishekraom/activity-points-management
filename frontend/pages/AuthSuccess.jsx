import { getData } from '../context/userContext.jsx';
import API from '../api/axios.js';
import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthSuccess = () => {
    const { setUser } = getData();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const params = new URLSearchParams(window.location.search);
            const token = params.get('token');

            if (token) {
                localStorage.setItem('token', token);
            }

            try {
                const res = await API.get("/api/auth/me");

                if (res.data.success) {
                    setUser(res.data.user);
                    const role = res.data.user.role;
                    if (role === 'admin') navigate('/admin');
                    else if (role === 'counselor') navigate('/counselor');
                    else navigate('/');
                }
            } catch (error) {
                console.error("Auth failed, redirecting to login", error);
                navigate('/login');
            }
        };

        fetchUser();
    }, [navigate, setUser]);

    return <h2>Logging in and syncing session...</h2>;
};

export default AuthSuccess;