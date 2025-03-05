import AxiosInstance from '@/config/Axios';
import { ContactUsSchema } from '@/schema/ContactUsSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { ReservationSchema } from '@/schema/ReservationSchema';
import { hookUser } from './hookUser';
import { Notification } from '@/config/Notification';
import { useTranslations } from 'next-intl';

export const hookConfirmReservation = ({id}) => {
  const t = useTranslations()
  const { register , trigger , handleSubmit,formState: { errors }, clearErrors, setError, getValues, setValue , watch, reset } = useForm({ resolver: yupResolver(ReservationSchema) });
  const {user}  = hookUser()


  const [venue, setVenue] = useState();
  const [loading, setLoading] = useState(true);
  const [loadingPricing , setloadingPricing ] = useState(true)
  const [error, setErrorState] = useState(null);


  const fetchVenues = async ({query}) => {
    setloadingPricing(true)
      try {
          const response = await AxiosInstance.get(`/venues/${id}${query}`);
          setVenue(response.data);

      } catch (error) {
          setErrorState(error.message || 'Failed to load venues');
      } finally {
          setLoading(false);
          setloadingPricing(false)
      }
  };

    
  const [Package, setPackage] = useState();
  const [loadingPackage, setLoadingPackage] = useState(true);

  const fetchPackage = async () => {
      try {
          const response = await AxiosInstance.get(`venue-packages/${id}/venue`);
          setPackage(response.data);

      } catch (error) {
          setErrorState(error.message || 'Failed to load Packages');
      } finally {
          setLoadingPackage(false);
      }
  };


  useEffect(() => {
      if(id){
          fetchVenues({query : ""});
          fetchPackage()
      }
  }, [id]);


  //! get query  package id
  const searchParams = useSearchParams();
  const [packageId, setPackageId] = useState(searchParams.get('package')); // Initial value
  useEffect(() => {
      setPackageId(searchParams.get('package')); 
    }, [searchParams]);
    

  //! get current package
  useEffect(()=>  {
    if(packageId ){
      fetchVenues({query : `?packageId=${packageId}`})
    }
  },[packageId , loading ])



  const [loadingReservation, setLoadingReservation] = useState(false);
  const submit = handleSubmit(async data => {
    const handleData = {
      user : user?.id,
      venue : +id ,
      package : packageId,
      status : "pending",
      "check_in":  data?.check_in,
      "check_out":  data?.check_out,
      "from_time":  data?.from_time,
      "to_time":  data?.to_time,
      total_price : Number(venue?.venue?.totalPriceWithVAT) ,
    }

    setLoadingReservation(true);
    await AxiosInstance.post(`/reservations`, handleData)
        .then(res => {
            Notification( t("successReservation") , 'success');
        })
        .catch(err => console.log(err));
    setLoadingReservation(false);
  });

  return { loadingReservation , loadingPricing , packageId, setPackageId , Package , loadingPackage ,venue : venue?.venue , loading , register, errors , trigger , setValue, submit , watch };
};
