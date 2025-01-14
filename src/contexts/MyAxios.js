import axios from 'axios';

export const myAxios = axios.create({
  baseURL: 'http://fakestoreapi.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});