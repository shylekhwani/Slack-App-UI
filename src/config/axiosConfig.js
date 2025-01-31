import axios from 'axios';

// whenever we make api call from axios, call goes through from this stuff.
export default axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL || "http://localhost:3000/api/v1" // calling .env file from vite
});