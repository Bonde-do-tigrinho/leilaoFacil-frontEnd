import axios from 'axios';
import { parseCookies } from 'nookies';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});


api.interceptors.request.use(
  (config) =>{
    const cookies = parseCookies();
    const token = cookies['auth.token'];
    
    if(token){
      config.headers.Authorization = `Bearer ${token}`;
    }

      return config;
    }, 

    (error) => {
      return Promise.reject(error);
    }
)
export default api;