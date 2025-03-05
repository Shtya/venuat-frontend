import { useState, useEffect } from 'react';
import AxiosInstance from '@/config/Axios'; // Import your Axios instance

const STORAGE_KEY = 'user';

export const hookUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user data from localStorage and then from the server
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const storedUser = localStorage.getItem(STORAGE_KEY);
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);

                    if (parsedUser?.id) {
                        const response = await AxiosInstance.get(`/users/${parsedUser.id}`);
                        setUser(response.data); 
                        localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data)); 
                    }
                } else {
                    setError('No user data found in localStorage');
                }
            } catch (err) {
                setError('Failed to load user data');
                console.error('Error fetching user data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading, error, setUser };
};
