import axios from 'axios';

export const API = () => {
  const token = localStorage.getItem('token');

  const instance = axios.create({
    baseURL:  'http://13.209.53.13:8000'
  });

  // 토큰이 있는 경우에만 헤더에 추가
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;;
  }
  return instance;
};