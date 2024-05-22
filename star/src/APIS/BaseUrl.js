import axios from 'axios';

export const baseUrl = 'https://risewitharete.online/backend/'

export const AxiosBase = axios.create({
    baseURL: baseUrl
})