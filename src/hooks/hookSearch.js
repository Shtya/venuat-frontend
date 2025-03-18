import AxiosInstance from '@/config/Axios';
import { usePathname, useRouter } from '@/navigation';
import { searchSchema } from '@/schema/SearchSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

export const hookSearch = () => {
    const { register, trigger, handleSubmit, formState: { errors }, clearErrors, setError, getValues, setValue, watch, reset, } = useForm({ resolver: yupResolver(searchSchema) });
    const router = useRouter()
    const pathname = usePathname()
    
    // const [venues, setVenues] = useState([]);
    const [filteredVenues, setFilteredVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setErrorState] = useState(null);


    const fetchVenues = async ({ page, query }) => {
        setLoading(true);
        try {
            const response = await AxiosInstance.get(`/venues/find-all?page=${page || 1}&limit=9${query && `&${query}`}`);
            const venuesData = response.data;
            setFilteredVenues(venuesData);

        } catch (error) {
            setErrorState(error.message || 'Failed to load venues');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // fetchAllVenues()
        fetchVenues({ page: 1, query: '' });
    }, []);

    const handlePagination = async page => {
        fetchVenues({ page: page, query: '' });
    };

    const params = new URLSearchParams();
    const [loadingSubmit, setLoadingSubmit] = useState(false);


    const submit = handleSubmit(async data => {
        setLoadingSubmit(true);
        const { visitor, city , typeEvent , date } = data;

        if(pathname == "/") {
            const queryString = new URLSearchParams(
                Object.fromEntries(
                  Object.entries({
                    visitor: visitor,
                    city: city,
                    date: date,
                    occasion: typeEvent
                  }).filter(([_, value]) => value) // Remove undefined values
                )
              ).toString(); 
              
              router.push(`/available-halls${queryString && `?${queryString}`}`);
        }

        if (visitor) params.append('visitor', visitor);
        if (city) params.append('city', city);
        if (typeEvent) params.append('occasion', typeEvent);
        if (date) params.append('startOccasion', date);
        await fetchVenues({ page: 1, query: params.toString() });
        setLoadingSubmit(false);
    });


    

    const clearData = async() => {
        setValue("city" , null)
        setValue("visitor" , null)
        setValue("typeEvent" , null)
        setValue("date" , null)
        setLoadingSubmit(true)
        await fetchVenues({ page: 1, query: "" });
        setLoadingSubmit(false);
    }


    //! put the data from the params for the search 
    const searchParams = useSearchParams();
    useEffect(() => {
      if (searchParams) {
          setValue("visitor", searchParams.get("visitor") || "");
          setValue("city", searchParams.get("city") || "");
          setValue("typeEvent", searchParams.get("occasion") || ""); // "occasion" maps to typeEvent
          setValue("date", searchParams.get("date") || "");
        if(searchParams.size)  submit()
      }
    }, [searchParams, setValue]);



    const watchCategory = watch('category');
    const locale = useLocale()
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
        

        // const newUrl = `/${locale}${window.location.pathname}?${params.toString()}` ;
        // router.replace(newUrl, undefined, { shallow: true });

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

    return { venue: filteredVenues, clearData , loadingSubmit, loading, handlePagination, register, errors, trigger, clearErrors, setError, getValues, setValue, submit, watch, reset };
};
