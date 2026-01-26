import { getData } from '../context/userContext.jsx';
import API from '../src/api/axios.js';
import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthSuccess = () => {
    const { setUser } = getData()
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await API.get("/api/auth/me", {
                    withCredentials: true
                });

                if (res.data.success) {
                    const fetchedUser = res.data.user;
                    setUser(fetchedUser);

                    if (fetchedUser.role === 'admin') {
                        navigate('/admin');
                    } else if (fetchedUser.role === 'counselor') {
                        navigate('/counselor');
                    } else {
                        navigate('/');
                    }
                }
            } catch (error) {
                console.error("Error fetching user", error);
            }

        };

        fetchUser();
    }, [navigate, setUser]);

    return (
        <h2>
            Logging in...
        </h2>
    )
}

export default AuthSuccess;