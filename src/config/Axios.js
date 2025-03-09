import axios from 'axios';
import toast from 'react-hot-toast';
import { Notification } from './Notification';

const baseUrl = 'http://localhost:8081/api/v1';
// const baseUrl = 'https://api.venuat.com/api/v1';
const getToken = () => localStorage.getItem('accessToken');
const getRefreshToken = () => localStorage.getItem('refreshToken');

const AxiosInstance = axios.create({ baseURL: baseUrl });

AxiosInstance.interceptors.request.use(
    async config => {
        let locale = 'en'; // Default language

        if (typeof window !== 'undefined') locale = window.location.pathname.split('/')[1] || 'en'; // Extract locale from URL

        const token = getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        config.headers['x-lang'] = locale; // ✅ Set language dynamically

        return config;
    },
    error => {
        toast.error('خطأ أثناء إعداد الطلب!');
        return Promise.reject(error);
    },
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
                toast.success('تم تحديث الجلسة بنجاح! 🔄');
                return AxiosInstance(originalRequest);
            } catch (err) {
                toast.error('انتهت الجلسة، يُرجى تسجيل الدخول مجددًا!');
                // Optionally, you can redirect to the login page here
                // window.location.href = '/login';
            }
        }
        if (error?.response?.data?.errors) {
            const errorMessage = Array.isArray(error.response.data.errors) 
                ? error.response.data.errors[0] 
                : error.response.data.message || 'حدث خطأ غير متوقع!'; 
            Notification(errorMessage, "error");
        } else {
            Notification(error.response?.data?.message || 'حدث خطأ غير متوقع!', "error");
        }
        
        return Promise.reject(error);
    },
);

export default AxiosInstance;
