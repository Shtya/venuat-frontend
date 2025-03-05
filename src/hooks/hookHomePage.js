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
    const [occasionNames, setOccasionNames] = useState([]); // تخزين المناسبات الفريدة

    const fetchVenues = async () => {
        try {
            const response = await AxiosInstance.get('/venues/find-all?limit=100');
            const venuesData = response.data.data;

            setVenues(venuesData);
            setFilteredVenues(venuesData);

            const occasions = venuesData.map(venue => venue.occasion).filter(Boolean);
            const uniqueOccasions = Array.from(new Map(occasions.map(occasion => [occasion.id, occasion])).values());
            setOccasionNames(uniqueOccasions);

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

    return {occasionId, setoccasionId , venues: filteredVenues, loading, error, filterQuery, handleFilterChange, occasionNames };
};
