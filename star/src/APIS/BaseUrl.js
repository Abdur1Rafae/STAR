import axios from 'axios';

export const AxiosBase = axios.create({
    baseURL:'http://localhost:3000/'
})