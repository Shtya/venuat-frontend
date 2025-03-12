'use client';
import React, { useEffect } from 'react';
import Input from '@/components/atoms/input/Input';
import { ImgEmail, ImgPassword, ImgPhone, ImgUser } from '@/constants/imgs';
import { useTranslations } from 'next-intl';
import Button from '@/components/atoms/button/Button';
import InputPhone from '@/components/atoms/input/InputPhone';

export default function StepSignUp({ loading , setValue , errors, register, submit }) {
    const t = useTranslations();

    useEffect(() => {
        const ele = document.getElementById('layoutAuth');
        if (ele) {
            ele.style.maxWidth = '500px';
        }
    }, []);

    return (
        <div>
            <div data-aos='fade-up' id='create-account' className='h1 font-semibold text-center '>
                {t('createAccount')} <span className='h4 text-secondry3 '> {`(${t("provider")})`} </span>
            </div>

            <Input dataAos='fade-up' error={errors?.name} register={register('name')} KEY={'name'} cnInput='!border-[#E1E6EF] !border-[1px] ' classname='mt-[20px] ' icon={ImgUser} type={'text'} label={t('fullName')} place={t('fullNamePlaceholder')} />
            <InputPhone setValue={setValue} dataAos='fade-up' error={errors?.phone} register={register('phone')} KEY={'phone'} cnInput='!border-[#E1E6EF] !border-[1px] ' classname='mt-[20px] ' icon={ImgPhone} type={'text'} label={t('phoneNumber')} place={t('phoneNumberPlaceholder')} />
            <Input dataAos='fade-up' error={errors?.email} register={register('email')} KEY={'email'} cnInput='!border-[#E1E6EF] !border-[1px] ' classname='mt-[20px] ' icon={ImgEmail} type={'email'} label={t('email')} place={t('emailPlaceholder')} />
            <Input dataAos='fade-up' error={errors?.password} register={register('password')} KEY={'password'} cnInput='!border-[#E1E6EF] !border-[1px] ' classname='mt-[20px] ' icon={ImgPassword} type={'password'} label={t('password')} place={t('passwordPlaceholder')} />
            <Button dataAos='fade-up' isLoading={loading} onClick={submit} name={t('createAccountButton')} classname='mt-[40px]' />
        </div>
    );
}
