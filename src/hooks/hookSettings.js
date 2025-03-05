import { useState, useEffect } from 'react';
import AxiosInstance from '@/config/Axios';

export const hookSetting = () => {
    const [settings, setSettings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setErrorState] = useState(null);

    const fetchSettings = async () => {
        try {
            const response = await AxiosInstance.get('/settings');
            setSettings(response.data);

        } catch (error) {
            console.error('Error fetching venues:', error);
            setErrorState(error.message || 'Failed to load venues');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);



    return {loading, error, data:settings };
};
