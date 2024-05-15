import axios from 'axios';

export const AxiosBase = axios.create({
    baseURL:'http://arete-backend-gateway:3000/'
})