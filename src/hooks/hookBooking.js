import { useState, useEffect } from 'react';
import AxiosInstance from '@/config/Axios'; // Import your Axios instance

const STORAGE_KEY = 'user';

export const hookBooking = () => {
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch user data from localStorage and then from the server
    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const storedUser = localStorage.getItem(STORAGE_KEY);
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    setBooking(parsedUser);

                    if (parsedUser?.id) {
                        const response = await AxiosInstance.get(`/reservations/${parsedUser.id}/user`);
                        setBooking(response.data); 
                    }
                }
            } catch (err) {
                console.error('Error fetching user data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBooking();
    }, []);

    return {  booking, loading , setBooking  };
};
