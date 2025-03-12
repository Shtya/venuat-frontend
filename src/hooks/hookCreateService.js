import AxiosInstance from '@/config/Axios';
import { Notification } from '@/config/Notification';
import { translated } from '@/config/translateText';
import { useGlobalContext } from '@/context/GlobalContext';
import { addServiceSchema } from '@/schema/addServiceSchema';
import { ContactUsSchema } from '@/schema/ContactUsSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export const hookCreateService = (onClose , setnewAdded) => {
  const t = useTranslations()
  const { register , trigger , handleSubmit,formState: { errors }, clearErrors, setError, getValues, setValue , watch, reset } = useForm({ resolver: yupResolver(addServiceSchema) });
  const {checkEndpoint} = useGlobalContext()
  
  const [venueId , setvenueId] = useState(null)
  useEffect(() => {
    setvenueId(JSON.parse(localStorage.getItem('venueId')));
}, []);



  const [icons, setIcons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setErrorState] = useState(null);

  
  const fetchIcons = async () => {
      setLoading(true);
      try {
          const response = await AxiosInstance.get('/media?limit=10000');
          setIcons(response?.data?.data)
      } catch (error) {
          setErrorState(error.message || 'Failed to load venues');
      } finally { }
      setLoading(false);
  };

  useEffect(() => {
      fetchIcons();
  }, []);


  const [loadingService , setLoadingService] = useState(false)

  const submit = handleSubmit(async data => {

    setLoadingService(true)
    const DATA = {
      name : await translated(data?.name) ,
      icon_media_id : +data?.icon
    }

    await AxiosInstance.post('/services' , DATA ).then((res )=> {
      const dataAddServiceToVenue = {
        service : res?.data?.id ,
        count : +data?.count ,
        price : +data?.price ,
      }
      AxiosInstance.post(`venues/${venueId}/add-service` , dataAddServiceToVenue ).then((res )=> {
        Notification( t("Created_Successfully") , "success" )
        onClose()
      })
      .catch((err)=>{})
      .finally(()=>{
        checkEndpoint()
        setLoadingService(false)
        setnewAdded(dataAddServiceToVenue)
        
      })
    })


  });

  return { register, icons , loading , loadingService , errors , trigger , clearErrors, setError, getValues, setValue, submit , watch, reset };
};
