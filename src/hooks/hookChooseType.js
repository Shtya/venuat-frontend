import AxiosInstance from '@/config/Axios';
import { Notification } from '@/config/Notification';
import { useRouter } from '@/navigation';
import { SignUpSchema } from '@/schema/SignUpSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const hookChooseType = () => {
  const t = useTranslations();
  const { register, trigger, handleSubmit, formState: { errors }, clearErrors, setError, getValues, setValue, watch, reset } = useForm({ resolver: yupResolver(SignUpSchema) });
 
  const submit = handleSubmit(async (data) => {
   
  });

  return { register, errors, trigger, clearErrors, setError, getValues, setValue, submit, watch, reset };
};
