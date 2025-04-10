"use client"

import AxiosInstance from '@/config/Axios';
import { ContactUsSchema } from '@/schema/ContactUsSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { ReservationSchema } from '@/schema/ReservationSchema';
import { hookUser } from './hookUser';
import { Notification } from '@/config/Notification';
import { useTranslations } from 'next-intl';

export const hookConfirmReservation = ({ id }) => {
    const t = useTranslations();
    const [ startDate , setstartDate] = useState()
    const [ endDate , setendDate] = useState()

    const schema = useMemo(() => ReservationSchema({ endDate }), [ endDate]);

    const {  register,  trigger,  handleSubmit,  formState: { errors },  clearErrors,  setError,  getValues,  setValue,  watch,  reset, } = 
        useForm({ resolver: yupResolver(schema) });

    const { user } = hookUser();

    const [venue, setVenue] = useState();
    const [loading, setLoading] = useState(true);
    const [loadingPricing, setloadingPricing] = useState(true);
    const [error, setErrorState] = useState(null);

    const fetchVenues = async ({ query }) => {
        setloadingPricing(true);
        try {
            const response = await AxiosInstance.get(`/venues/${id}/reservation-venue${query}`);
            setVenue(response.data);

            setstartDate(response?.data?.package?.start_date)
            setendDate(response?.data?.package?.end_date)


        } catch (error) {
            setErrorState(error.message || 'Failed to load venues');
        } finally {
            setLoading(false);
            setloadingPricing(false);
        }
    };

    const searchParams = useSearchParams();
    const [PackageId , setPackageId] = useState()

    useEffect(() => {
        const PackageId = searchParams.get('package');
        setPackageId(PackageId)
        if (PackageId) {
            fetchVenues({ query: `?packageId=${PackageId}` });
        } else {
            fetchVenues({ query: '' });
        }

        
    }, [id, searchParams.get('package')]);



    //! whene change the count of quentity 
    const countChange = watch('quantity');
    useEffect(() => {
        if (countChange) {
          fetchVenues({ query: `?packageId=${PackageId}` });
        }
    }, [countChange]);


    const [loadingReservation, setLoadingReservation] = useState(false);
    const [isSubmit , setIsSubmit] = useState(false);
    useEffect(()=> {
        const firstErrorElement = document.querySelectorAll('.error')[0];
        if (firstErrorElement) {
            firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    } ,[isSubmit , errors])

    const [isOpenPopup , setisOpenPopup] = useState(false)

    const submit = handleSubmit(async data => {
        setIsSubmit(true)

       
        const filteredPeriods = Object.fromEntries(
            Object.entries(data?.periods || {}).filter(([dateStr]) => {
                const [day, month, year] = dateStr.split('/');
                const parsedDate = new Date(`${year}-${month}-${day}`);
                parsedDate.setHours(0, 0, 0, 0); // تصفير الوقت

                const checkInDate = new Date(data?.check_in);
                const checkOutDate = new Date(data?.check_out);
                checkInDate.setHours(0, 0, 0, 0);
                checkOutDate.setHours(0, 0, 0, 0);  
                return parsedDate >= checkInDate && parsedDate <= checkOutDate;
            })
        );

        const handleData = {
            user: user?.id,
            venue: +id,
            status: 'pending',
            check_in: data?.check_in,
            check_out: data?.check_out,
            periods: filteredPeriods,
            total_price: (data?.totalPriceAll * .15) + data?.totalPriceAll 
        };




        if(PackageId) handleData.package = +PackageId
    

        setLoadingReservation(true);
        await AxiosInstance.post(`/reservations`, handleData)
            .then(res => {
                Notification(t('successReservation'), 'success');
                setisOpenPopup(true)
                setValue("periods" , {})
            })
            .catch(err => console.log(err));
        setLoadingReservation(false);
    });

    return { isOpenPopup , setisOpenPopup , loadingReservation, loadingPricing, venue: venue?.venue, Package: venue?.package, loading, errors, trigger, setValue, submit, watch };
};
