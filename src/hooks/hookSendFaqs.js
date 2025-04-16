"use client"
import AxiosInstance from '@/config/Axios';
import { Notification } from '@/config/Notification';
import { SendFaqsSchema } from '@/schema/SendFaqsSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { hookUser } from './hookUser';

export const hookSendFaqs = ({id}) => {
  const { register , trigger , handleSubmit,formState: { errors }, clearErrors, setError, getValues, setValue , watch, reset } = useForm({ resolver: yupResolver(SendFaqsSchema) });
  const t = useTranslations()

  const { user } = hookUser()
  const [loading , setLoading] = useState(false)
  const submit = handleSubmit(async data => {
    setLoading(true)

    
    try{
      if (!id) throw new Error(t("missingVenueId-error"));

      await AxiosInstance.post(`communications`, {
        "fromId": user?.id,
        "venueId": +id,
        "msg": data?.msg,
        "type": "non_reservation"
      });

      Notification(t("communication-success"), "success");
      setValue("msg", "");
    } 
    catch (err) {
      Notification(t("communication-Fail"), "error");
    } 
    finally{
      setLoading(false)
    }

  });

  return { loading , register, errors , trigger , clearErrors, setError, getValues, setValue, submit , watch, reset };
};
