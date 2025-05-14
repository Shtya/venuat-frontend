import AxiosInstance from '@/config/Axios';
import { Notification } from '@/config/Notification';
import { SubscribeSchema } from '@/schema/SubscribeSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export const hookSubscribe = () => {
  const t = useTranslations()
  const { register , trigger , handleSubmit,formState: { errors }, clearErrors, setError, getValues, setValue , watch, reset } = useForm({ resolver: yupResolver(SubscribeSchema) });
  const [loading, setLoading] = useState(false);
  const [user , setUser] = useState()

  useEffect(()=> {
    setUser(JSON.parse(localStorage.getItem('user')))
  } ,[])

  const submit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      
      if (!user?.id) Notification(t("errorSubscribed" , "error"))
      if(user?.email == data?.subscribe) {
        setLoading(false)
        return Notification(t("userAlreadyIsSubscribed" , "error"))}
      
      await AxiosInstance.patch(`/users/${user?.id}`, { isSubscribed : true });
      Notification(t("subscriptionSuccess", { name: user?.full_name }), "success");
      user.isSubscribed = true;
      localStorage.setItem('user', JSON.stringify(user));

    } 
    catch (error) {
    }
    setLoading(false);
  })

  useEffect(()=> {
    if(user){
      if(user?.isSubscribed == true){
        const ele = document.getElementById("subscribe")
        if(ele) {
          ele?.classList?.add("bg-[#0000001A]")
        }
        setValue("subscribe" , user?.email)
      }
    }
  },[user])


  return { register, loading , errors , trigger , clearErrors, setError, getValues, setValue, submit , watch, reset };
};
