"use client"
import { useState, useEffect } from 'react';
import AxiosInstance from '@/config/Axios';

export const useDetailsHalls = ({id}) => {

    const [venue, setVenue] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setErrorState] = useState(null);

    const fetchVenues = async () => {
        try {
            const response = await AxiosInstance.get(`/venues/${id}/detials-venue`);
            setVenue(response.data);

        } catch (error) {
            setErrorState(error.message || 'Failed to load venues');
        } finally {
            setLoading(false);
        }
    };


    const [policy, setpolicy] = useState();
    const [loadingPolicy, setLoadingPolicy] = useState(true);

    const fetchpolicies = async () => {
        try {
            const response = await AxiosInstance.get(`/venues/${id}/policies`);
            setpolicy(response.data);

        } catch (error) {
            setErrorState(error.message || 'Failed to load policys');
        } finally {
            setLoadingPolicy(false);
        }
    };


    const [faqs, setfaqs] = useState();
    const [loadingfaqs, setLoadingfaqs] = useState(true);

    const fetchfaqs = async () => {
        try {
            const response = await AxiosInstance.get(`venue-faq?field:venue=${id}`);
            setfaqs(response.data.data);

        } catch (error) {
            setErrorState(error.message || 'Failed to load faqss');
        } finally {
            setLoadingfaqs(false);
        }
    };


    
    const [Package, setPackage] = useState();
    const [loadingPackage, setLoadingPackage] = useState(true);

    const fetchPackage = async () => {
        try {
            const response = await AxiosInstance.get(`venue-packages/${id}/venue?status=current`);
            setPackage(response.data);

        } catch (error) {
            setErrorState(error.message || 'Failed to load Packages');
        } finally {
            setLoadingPackage(false);
        }
    };

    useEffect(() => {
        if(id){
            fetchVenues();
            fetchpolicies()
            fetchfaqs()
            fetchPackage()
        }
    }, [id]);

    return { venue, loading, policy , loadingPolicy , faqs ,loadingfaqs , Package , loadingPackage };
};
