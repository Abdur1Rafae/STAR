import axios from 'axios';

export const AxiosBase = axios.create({
    baseURL:'http://192.168.10.3:3000/'
})