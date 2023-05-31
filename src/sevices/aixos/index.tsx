import Axios from 'axios';

const axios = Axios.create({
   baseURL: 'http://localhost:3000',
   timeout: 120000,
 });

 const API = {
   get: (endpoint: string, params = {}, config?: any) =>
     axios.get(endpoint, { data: params, ...config }),
   post: (endpoint: string, data: any = {}, config?: any) =>
     axios.post(endpoint, data, { ...config }),
   put: (endpoint: string, data: any = {}, config?: any) => axios.put(endpoint, data, { ...config }),
   del: (endpoint: string, params = {}, config?: any) =>
     axios.delete(endpoint, { data: params, ...config }),
 };

 export default API;