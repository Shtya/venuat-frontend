import AxiosInstance from '@/config/Axios';
import { Notification } from '@/config/Notification';
import { useRouter } from '@/navigation';
import { SignInSchema } from '@/schema/SignInSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const hookSignIn = () => {
  const t = useTranslations()
  const { register , trigger , handleSubmit,formState: { errors }, clearErrors, setError, getValues, setValue , watch, reset } = useForm({ resolver: yupResolver(SignInSchema) });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const submit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      localStorage.setItem("email" , data?.email )
      const response = await AxiosInstance.post(`/auth/signin`, { email: data?.email, password: data?.password });

      const { accessToken, refreshToken, ...user } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));
      
      Notification(t("welcome" , {name : user?.full_name} ), "success");
      setTimeout(() => {
        router.push('/')
      }, 1000);
    } catch (error) {
      if(error.response.data.statusCode === 403) {
        setTimeout(() => {
          router.push("/sign-up/client?step=2")
        }, 1000);
      }
    }
    setLoading(false);
  })


  return { register, loading , errors , trigger , clearErrors, setError, getValues, setValue, submit , watch, reset };
};
