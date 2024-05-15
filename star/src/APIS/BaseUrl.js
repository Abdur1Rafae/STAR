import axios from 'axios';

export const AxiosBase = axios.create({
    baseURL:'http://57.151.12.166:3000/'
})