import { getData } from '../context/userContext.jsx';
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthSuccess = () => {
    const { setUser } = getData()
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/auth/me", {
                    withCredentials: true
                });

                if (res.data.success) {
                    setUser(res.data.user);
                    navigate('/');
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