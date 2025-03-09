import { useState, useEffect } from 'react';
import AxiosInstance from '@/config/Axios';
import { useLocale } from 'next-intl';

export const hookHomePage = () => {
    const locale = useLocale();
    const [occasionId, setoccasionId] = useState(1);

    const [venues, setVenues] = useState([]);
    const [filteredVenues, setFilteredVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setErrorState] = useState(null);
    const [filterQuery, setFilterQuery] = useState('');

    const fetchVenues = async () => {
        try {
            const response = await AxiosInstance.get('/venues/find-all?limit=300');
            const venuesData = response.data.data;

            setVenues(venuesData);
            setFilteredVenues(venuesData);

        } catch (error) {
            console.error('Error fetching venues:', error);
            setErrorState(error.message || 'Failed to load venues');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVenues();
    }, []);

    useEffect(()=> {
      if(occasionId){
        const filtered = venues.filter(venue => venue.occasion?.id === occasionId);
        setFilteredVenues(filtered);
      }
    } ,[occasionId])

    const handleFilterChange = query => {
        setFilterQuery(query);
    };

    return {occasionId, setoccasionId , venues: filteredVenues, loading, error, filterQuery, handleFilterChange };
};
