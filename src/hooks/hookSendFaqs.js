import AxiosInstance from '@/config/Axios';
import { Notification } from '@/config/Notification';
import { SendFaqsSchema } from '@/schema/SendFaqsSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const hookSendFaqs = ({id}) => {
  const { register , trigger , handleSubmit,formState: { errors }, clearErrors, setError, getValues, setValue , watch, reset } = useForm({ resolver: yupResolver(SendFaqsSchema) });
  const t = useTranslations()


  const [loading , setLoading] = useState(false)
  const submit = handleSubmit(async data => {
    setLoading(true)

    try{
      if (!id) throw new Error(t("missingVenueId-error"));

      await AxiosInstance.post(`venue-faq/question`, {
        venue_id: +id,
        question: { ar: data?.msg }
      });

      Notification(t("addFaq-success"), "success");
      setValue("msg", ""); // إعادة تعيين النموذج بعد الإرسال الناجح
    } 
    catch (err) {
      Notification(t("addFaq-error"), "error");
    } 
    finally{
      setLoading(false)
    }

  });

  return { loading , register, errors , trigger , clearErrors, setError, getValues, setValue, submit , watch, reset };
};
