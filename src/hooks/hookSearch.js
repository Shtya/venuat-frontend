import AxiosInstance from '@/config/Axios';
import { useRouter } from '@/navigation';
import { searchSchema } from '@/schema/SearchSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

export const hookSearch = () => {
    const {
        register,
        trigger,
        handleSubmit,
        formState: { errors },
        clearErrors,
        setError,
        getValues,
        setValue,
        watch,
        reset,
    } = useForm({ resolver: yupResolver(searchSchema) });
    const router = useRouter()
    
    const [venues, setVenues] = useState([]);
    const [cities, setCities] = useState([]);
    const [filteredVenues, setFilteredVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setErrorState] = useState(null);
    const [occasionNames, setOccasionNames] = useState([]); // تخزين المناسبات الفريدة

    
    const fetchAllVenues = async () => {
        try {
            const response = await AxiosInstance.get(`/venues/find-all?limit=100`);
            setVenues(response.data);
        } catch (error) {
            setErrorState(error.message || 'Failed to load venues');
        } finally {
            setLoading(false);
        }
    };


    const fetchVenues = async ({ page, query }) => {
        setLoading(true);
        try {
            const response = await AxiosInstance.get(`/venues/find-all?page=${page || 1}&limit=9${query && `&${query}`}`);
            const venuesData = response.data;
            setFilteredVenues(venuesData);

            const occasions = venuesData.data.map(venue => venue.occasion).filter(Boolean);
            const uniqueOccasions = Array.from(new Map(occasions.map(occasion => [occasion.id, occasion])).values());
            setOccasionNames(uniqueOccasions);
        } catch (error) {
            setErrorState(error.message || 'Failed to load venues');
        } finally {
            setLoading(false);
        }
    };
    const fetchCities = async () => {
        try {
            const response = await AxiosInstance.get('/cities?limit=10000');
            const venuesData = response.data.data;

            setCities(venuesData);
        } catch (error) {
            setErrorState(error.message || 'Failed to load venues');
        } finally {
        }
    };

    useEffect(() => {
        fetchAllVenues()
        fetchVenues({ page: 1, query: '' });
        fetchCities();
    }, []);

    const handlePagination = async page => {
        fetchVenues({ page: page, query: '' });
    };

    const params = new URLSearchParams();
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const submit = handleSubmit(async data => {
        sessionStorage.setItem('formData', JSON.stringify(data));
        router.push("/available-halls")

        setLoadingSubmit(true);
        const { visitor, city, cityGET, typeEvent, typeEventGET, date } = data;


        if (visitor) params.append('visitor', visitor);
        if (cityGET?.id) params.append('city', cityGET.id);
        if (typeEventGET?.id) params.append('occasion', typeEventGET.id);
        if (date) params.append('startOccasion', date);

        await fetchVenues({ page: 1, query: params.toString() });
        setLoadingSubmit(false);
    });


    //! put the data from the session storage is exist 
    useEffect(() => {
        const savedFormData = sessionStorage.getItem('formData');
        if (savedFormData) {
          const formData = JSON.parse(savedFormData);
    
          setValue('visitor', formData.visitor);
          setValue('city', formData.city);
          setValue('typeEvent', formData.typeEvent);
          setValue('date', formData.date);
        }
      }, [setValue]);



    const watchCategory = watch('category');
    useEffect(() => {
        if (!watchCategory) return;
        Object.entries(watchCategory).forEach(([key, value]) => {
            if (value) {
                if (!isNaN(key)) {
                    params.append('occasion', key);
                } else {
                    params.append(key, value);
                }
            }
        });

        if (params) {
            fetchVenues({ query: params.toString() });
        }
    }, [JSON.stringify(watchCategory)]);




    const watchprice = watch('price');
    useEffect(() => {
        if (!watchprice) return;

        const handler = setTimeout(() => {
            Object.entries(watchprice).forEach(([key, value]) => {
                if (value) {
                    params.append(key, value);
                }
            });

            if (params) {
                fetchVenues({ query: params.toString() });
            }
        }, 500);

        return () => clearTimeout(handler);
    }, [JSON.stringify(watchprice)]);

    return { venue: filteredVenues, loadingSubmit, loading, handlePagination, cities, occasionNames, register, errors, trigger, clearErrors, setError, getValues, setValue, submit, watch, reset };
};
