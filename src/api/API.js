import axios from 'axios';

let userId = null;

export const API = () => {
  const token = localStorage.getItem('token');

  const instance = axios.create({
    baseURL: 'http://13.209.53.13:8000'
  });

  // 토큰이 있는 경우에만 헤더에 추가
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // 토큰에서 사용자 ID 추출
    userId = getUserIdFromToken(token);
  }
  return instance;
};

// Base64URL 디코딩 함수
function base64UrlDecode(str) {
  try {
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = atob(base64);
    return decodeURIComponent(decoded.split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  } catch (e) {
    console.error('Invalid base64 URL string:', e);
    return null;
  }
}

// JWT 디코딩 함수
function decodeJwt(token) {
  try {
    const payload = token.split('.')[1];
    const decodedPayload = base64UrlDecode(payload);
    return JSON.parse(decodedPayload);
  } catch (e) {
    console.error('Failed to decode JWT:', e);
    return null;
  }
}

// 사용자 ID 추출 함수
function getUserIdFromToken(token) {
  const decodedJwt = decodeJwt(token);
  return decodedJwt ? decodedJwt.userid : null;
}

// 사용자 ID 반환 함수
export const getUserId = () => {
  return userId;
}
