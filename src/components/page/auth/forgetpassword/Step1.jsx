import Button from '@/components/atoms/button/Button';
import Input from '@/components/atoms/input/Input';
import { ImgApple, ImgEmail, ImgFacebook, ImgGoogle } from '@/constants/imgs';
import { forgetSchema } from '@/schema/forgetSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

export default function Step1({resendGmailMsg ,loading }) {
    const t = useTranslations();
    const { register , trigger , control , handleSubmit,formState: { errors }, clearErrors, setError, getValues, setValue , watch, reset } = useForm({  resolver: yupResolver(forgetSchema) });


  const submit = handleSubmit(async data => {
    resendGmailMsg({emailValue : data?.email})
  }); 

    return (
        <div>
            <div data-aos='fade-up' className='h1 font-semibold  text-center '> {t('resetPassword')} </div>
            <div data-aos='fade-up' className='h3 text-secondry3 text-center '> {t('noWorries')} </div>
            <Image data-aos='fade-up' className='w-full h-[150px] object-contain my-[20px] ' src={'/assets/imgs/lock.png'} width={300} height={140} alt='' />
            <Input dataAos='fade-up' KEY={'email'} register={register('email')} error={errors?.email} cnInput='!border-[#E1E6EF] !border-[1px] ' classname='mt-[60px] max-md:mt-[20px] ' icon={ImgEmail} type={'email'} label={t('email')} place={t('emailPlaceholder')} />

            <Button isLoading={loading} dataAos='fade-up' onClick={submit} name={t('sendCode')} classname='mt-[40px]' />


            <div data-aos='fade-up' className=' h3 text-center my-[20px] '> {t('loginVia')}  </div>
            <div className='flex items-center gap-[10px] justify-center '>
                <div data-aos='fade-up' className='w-[40px] h-[40px] bg-gray-50 flex items-center justify-center shadow-md rounded-[50%] cursor-pointer '> <Image src={ImgApple} alt='' width={25} height={25} /> </div>
                <div data-aos='fade-up' data-aos-delay={80} className='w-[40px] h-[40px] bg-gray-50 flex items-center justify-center shadow-md rounded-[50%] cursor-pointer '> <Image src={ImgFacebook} alt='' width={25} height={25} /> </div>
                <div data-aos='fade-up' data-aos-delay={160} className='w-[40px] h-[40px] bg-gray-50 flex items-center justify-center shadow-md rounded-[50%] cursor-pointer '> <Image src={ImgGoogle} alt='' width={25} height={25} /> </div>
            </div>
        </div>
    );
}
