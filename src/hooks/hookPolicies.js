"use client"
import { useState, useEffect } from 'react';
import AxiosInstance from '@/config/Axios';

export const hookPolicies = () => {

    const [policies, setpolicies] = useState();
    const [loading, setLoading] = useState(true);

    const fetchpolicies = async () => {
        try {
            const response = await AxiosInstance.get(`/policies?limit=1000`);
            setpolicies(response.data?.data);

        } catch (error) {
            setErrorState(error.message || 'Failed to load policys');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
            fetchpolicies()
    }, []);

    return {policies , loading };
};
