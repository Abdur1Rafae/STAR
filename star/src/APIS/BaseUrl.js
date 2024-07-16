import axios from 'axios';

export const baseUrl = 'http://localhost:3000/backend'

export const AxiosBase = axios.create({
    baseURL: baseUrl
})