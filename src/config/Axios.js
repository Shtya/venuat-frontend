import axios from 'axios';
import toast from 'react-hot-toast';
import { Notification } from './Notification';

export const base = "http://localhost:8081/"
// const base = "https://api.venuat.com/"

const baseUrl = base + 'api/v1';
const getToken = () => localStorage.getItem('accessToken');
const getRefreshToken = () => localStorage.getItem('refreshToken');

const AxiosInstance = axios.create({ baseURL: baseUrl });

AxiosInstance.interceptors.request.use(
  async config => {
    let locale = 'en';

    if (typeof window !== 'undefined') locale = window.location.pathname.split('/')[1] || 'en';

    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.headers['x-lang'] = locale;

    return config;
  },
  error => {
    toast.error('خطأ أثناء إعداد الطلب!');
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token available');
        const response = await axios.post(`${baseUrl}/auth/refresh-token`, { refreshToken });
        const newAccessToken = response.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return AxiosInstance(originalRequest);
      } catch (err) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        location.href = '/sign-in';

      }
    }

    if (error?.response?.data?.errors) {
      let errorMessage;

      if (Array.isArray(error.response.data.errors)) {
        if (typeof error.response.data.errors[0] === 'object') {
          errorMessage = error.response.data.errors[0].messages || 'حدث خطأ غير متوقع!';
        } else {
          errorMessage = error.response.data.errors[0] || 'حدث خطأ غير متوقع!';
        }
      } else {
        errorMessage = error.response.data.message || 'حدث خطأ غير متوقع!';
      }

      Notification(errorMessage, 'error');
    } else {
      if (['/users/me'].includes(error?.config?.url)) return;
      Notification(error.response?.data?.message || 'حدث خطأ غير متوقع!', 'error');
    }

    return Promise.reject(error);
  }
);

export default AxiosInstance;
