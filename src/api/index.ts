import axios from 'axios';

if (!process.env.REACT_APP_API_BASE_URL) {
  throw new Error('Missing REACT_APP_API_BASE_URL environment variable');
}

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export default api;
