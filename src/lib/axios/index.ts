import axios from 'axios';
import type { AxiosInstance } from 'axios';

// 1. Axios 인스턴스 생성
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001', // 서버 주소
  timeout: 5000, // 5초 안에 응답 없으면 타임아웃
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    // 로컬 스토리지 등에서 토큰을 가져와 헤더에 삽입 (로그인 기능 구현 시)
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// // 3. 응답(Response) 인터셉터
// authApi.interceptors.response.use(
//   (response) => {
//     // 응답 데이터만 바로 리턴하도록 가공
//     return response.data;
//   },
//   (error: AxiosError) => {
//     // 공통 에러 처리 (401: 토큰 만료, 500: 서버 에러 등)
//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           console.error('인증되지 않은 사용자입니다. 로그인이 필요합니다.');
//           break;
//         case 404:
//           console.error('요청하신 페이지를 찾을 수 없습니다.');
//           break;
//         case 500:
//           console.error('서버 내부 에러가 발생했습니다.');
//           break;
//         default:
//           console.error('에러가 발생했습니다:', error.message);
//       }
//     }
//     return Promise.reject(error);
//   },
// );

export default api;
