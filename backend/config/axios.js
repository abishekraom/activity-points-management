import axios from 'axios';

export const axiosConfig = () => {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = 'http://localhost:5000';
};
