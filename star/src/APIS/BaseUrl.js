import axios from 'axios';

export const baseUrl = 'http://57.151.12.166:3000/'

export const AxiosBase = axios.create({
    baseURL: baseUrl
})