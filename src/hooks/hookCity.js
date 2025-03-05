import AxiosInstance from '@/config/Axios';
import { useRouter } from '@/navigation';
import { searchSchema } from '@/schema/SearchSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

export const hookCity = () => {
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
    
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setErrorState] = useState(null);

    
    const fetchCities = async () => {
        setLoading(true);
        try {
            const response = await AxiosInstance.get('/cities?limit=10000');
            setCities(response?.data?.data)
        } catch (error) {
            setErrorState(error.message || 'Failed to load venues');
        } finally { }
        setLoading(false);
    };

    useEffect(() => {
        fetchCities();
    }, []);

    return { loading, cities, register, errors, trigger, clearErrors, setError, getValues, setValue, watch, reset };
};
