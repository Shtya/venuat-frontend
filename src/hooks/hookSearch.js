import AxiosInstance from '@/config/Axios';
import { usePathname, useRouter } from '@/navigation';
import { searchSchema } from '@/schema/SearchSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

export const hookSearch = () => {
  const {
    register,
    trigger,
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
    setError,
    getValues,
    setValue,
    watch,
    reset
  } = useForm({ resolver: yupResolver(searchSchema) });
  const router = useRouter();
  const pathname = usePathname();

  const [filteredVenues, setFilteredVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVenues = async ({ page, query }) => {
    setLoading(true);
    try {
      const response = await AxiosInstance.get(`/venues/find-all?page=${page || 1}&limit=9${query && `&${query}`}`);
      const venuesData = response.data;
      setFilteredVenues(venuesData);
    } catch (error) {
      console.log(error.message || 'Failed to load venues');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues({ page: 1, query: '' });
  }, []);

  const params = new URLSearchParams();
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const submit = handleSubmit(async data => {
    setLoadingSubmit(true);
    const { visitor, city, typeEvent, date } = data;

    if (pathname == '/') {
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

  const clearData = async () => {
    setValue('city', null);
    setValue('visitor', null);
    setValue('typeEvent', null);
    setValue('date', null);
    setLoadingSubmit(true);
    await fetchVenues({ page: 1, query: '' });
    setLoadingSubmit(false);
  };

  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams) {
      setValue('visitor', searchParams.get('visitor') || '');
      setValue('city', searchParams.get('city') || '');
      setValue('typeEvent', searchParams.get('occasion') || ''); // "occasion" maps to typeEvent
      setValue('date', searchParams.get('date') || '');
      if (searchParams.size > 1) submit();
    }
  }, [searchParams, setValue, pathname]);

  const watchCategory = watch('category');
  useEffect(() => {
    if (!watchCategory) return;

    if (watchCategory == 3000) {
      params.append('mostVisited', true);
    } else if (watchCategory == 3001) {
      params.append('newest', true);
    } else {
      params.append('occasion', watchCategory);
    }

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


const handlePagination = async (page) => {
  const querys = {}; 
  // Add category (occasion) to query if present
  if (watchCategory) {
    if (watchCategory == 3000) {
      querys['mostVisited'] = true;
    } else if (watchCategory == 3001) {
      querys['newest'] = true;
    } else {
      querys['occasion'] = watchCategory;
    }
  }

  // Add price filters if present
  const watchprice = watch('price');
  if (watchprice) {
    Object.entries(watchprice).forEach(([key, value]) => {
      if (value) {
        querys[key] = value;
      }
    });
  }
    const queryString = new URLSearchParams(querys).toString();

 

  // Now fetch venues with the updated query
  await fetchVenues({ page, query: queryString });
};


  return { venue: filteredVenues, control, clearData, loadingSubmit, loading, handlePagination, register, errors, trigger, clearErrors, setError, getValues, setValue, submit, watch, reset };
};
