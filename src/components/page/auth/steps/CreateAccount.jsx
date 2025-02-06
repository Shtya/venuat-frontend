import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { ImgEmail, ImgPassword, ImgPhone, ImgUser  , ImgApple ,ImgFacebook ,ImgGoogle } from '@/constants/imgs';
import Button from '@/components/atoms/button/Button';
import Input from '@/components/atoms/input/Input';
import Image from 'next/image'
import VerifyIdentity from './VerifyIdentity';
import SuccessVerifyIdentity from './SuccessVerifyIdentity';

export default function CreateAccount({ errors, register , submit }) {
    const t = useTranslations();
    const [step , setstep] = useState(1)

    return (
        <div className='max-w-[500px] w-full mx-auto '>
            {
                step == 1 && <>
                 <div>
                    <Input dataAos='fade-up' error={errors?.name} register={register('name')} KEY={'name'} cnInput='!border-[#E1E6EF] !border-[1px] ' classname='mt-[20px] ' icon={ImgUser} type={'text'} label={t('fullName')} place={t('fullNamePlaceholder')} />
                    <Input dataAos='fade-up' error={errors?.phone} register={register('phone')} KEY={'phone'} cnInput='!border-[#E1E6EF] !border-[1px] ' classname='mt-[20px] ' icon={ImgPhone} type={'text'} label={t('phoneNumber')} place={t('phoneNumberPlaceholder')} />
                    <Input dataAos='fade-up' error={errors?.email} register={register('email')} KEY={'email'} cnInput='!border-[#E1E6EF] !border-[1px] ' classname='mt-[20px] ' icon={ImgEmail} type={'email'} label={t('email')} place={t('emailPlaceholder')} />
                    <Input dataAos='fade-up' error={errors?.password} register={register('password')} KEY={'password'} cnInput='!border-[#E1E6EF] !border-[1px] ' classname='mt-[20px] ' icon={ImgPassword} type={'password'} label={t('password')} place={t('passwordPlaceholder')} />
                    <Button dataAos='fade-up' onClick={()=> setstep(2) } name={t('createAccountButton')} classname='mt-[40px]' />
                </div>

                

                <div data-aos='fade-up' className=' h3 text-center my-[20px] '> {t('passWithSocial')} </div>
                <div className='flex items-center gap-[10px] justify-center '>
                    <div data-aos='fade-up' className='w-[40px] h-[40px] bg-gray-50 flex items-center justify-center shadow-md rounded-[50%] cursor-pointer '> <Image src={ImgApple} alt='' width={25} height={25} /> </div>
                    <div data-aos='fade-up' data-aos-delay={80} className='w-[40px] h-[40px] bg-gray-50 flex items-center justify-center shadow-md rounded-[50%] cursor-pointer '> <Image src={ImgFacebook} alt='' width={25} height={25} /> </div>
                    <div data-aos='fade-up' data-aos-delay={160} className='w-[40px] h-[40px] bg-gray-50 flex items-center justify-center shadow-md rounded-[50%] cursor-pointer '> <Image src={ImgGoogle} alt='' width={25} height={25} /> </div>
                </div>
                </>
            }
           

            {step == 2 && <VerifyIdentity step={step} setstep={setstep} /> }
            {step == 3 && <SuccessVerifyIdentity step={step} setstep={setstep} /> }

        </div>
    );
}
