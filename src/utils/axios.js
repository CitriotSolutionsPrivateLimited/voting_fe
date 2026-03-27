import axios from 'axios';
import { backend_url } from '../constants/config';

const apiInstance = axios.create({
    baseURL: backend_url,
    timeout: 20000, // timeout after 5 seconds
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default apiInstance;