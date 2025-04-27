import axios from 'axios';

const api = axios.create({
  baseURL: 'https://wt-assignment-2-lmrp.onrender.com'
});

export default api;
