import AxiosInstance from '@/config/Axios';
import { Notification } from '@/config/Notification';
import { useGlobalContext } from '@/context/GlobalContext';
import { ContactUsSchema } from '@/schema/ContactUsSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const hookContactUs = () => {
  const { register , trigger , handleSubmit,formState: { errors }, clearErrors, setError, getValues, setValue , watch, reset } = useForm({ resolver: yupResolver(ContactUsSchema) });
  const t  = useTranslations()

  const {checkEndpoint} = useGlobalContext()

  const [loading , setLoading] = useState(false)
  console.log(errors)
  const submit = handleSubmit(async data => {
    const handleData = {
      email : data?.email ,
      name : data?.fullName ,
      message : data?.message ,
      phone : data?.phone ,
    };


    setLoading(true);
    await AxiosInstance.post(`/contact-us`, handleData)
        .then(res => {
          setValue("email" , null)
          setValue("fullName" , null)
          setValue("message" , null)
          checkEndpoint()
        })
        .catch(err => console.log(err))
        .finally(()=>{
            Notification(t('contact_us_success'), 'success');
            setLoading(false);
        });
});
  return { register , loading , errors , trigger , clearErrors, setError, getValues, setValue, submit , watch, reset };
};
