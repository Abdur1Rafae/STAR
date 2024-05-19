import axios from 'axios';

export const baseUrl = 'http://localhost:3000/'

export const AxiosBase = axios.create({
    baseURL: baseUrl
})