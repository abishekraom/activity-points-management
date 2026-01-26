import axios from 'axios';

export const axiosConfig = () => {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = process.env.BACKEND_URL || 'http://localhost:5000';
};
