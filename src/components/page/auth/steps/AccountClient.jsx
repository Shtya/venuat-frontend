import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation'; // Import from next/navigation
import { ImgEmail, ImgPassword, ImgPhone, ImgUser, ImgApple, ImgFacebook, ImgGoogle } from '@/constants/imgs';
import Button from '@/components/atoms/button/Button';
import Input from '@/components/atoms/input/Input';
import Image from 'next/image';
import VerifyIdentity from './VerifyIdentity';
import SuccessVerifyIdentity from './SuccessVerifyIdentity';
import { hookSignUp } from '@/hooks/hookSignUp';
import InputPhone from '@/components/atoms/input/InputPhone';
import SocialAuth from '../SocialAuth/SocialAuth';

export default function AccountClient() {
    const { step, register, loading, setValue , errors, submit, handleStepChange , loadingCheckOTP , CheckCodeOTP, resendGmailMsg } = hookSignUp();
    const t = useTranslations();

    return (
        <div className='max-w-[500px] w-full mx-auto '>
            {step == 1 && (
                <>
                    <div>
                        <Input dataAos='fade-up' error={errors?.name} register={register('name')} KEY={'name'} cnInput='!border-[#E1E6EF] !border-[1px] ' classname='mt-[20px] ' icon={ImgUser} type={'text'} label={t('fullName')} place={t('fullNamePlaceholder')} />
                        <InputPhone dataAos='fade-up' icon={ImgPhone} error={errors?.phone} register={register('phone')} KEY={'phone'} cnInput='!border-[#E1E6EF] !border-[1px] ' classname='mt-[20px] ' setValue={setValue} type={'text'} label={t('phoneNumber')} place={t('phoneNumberPlaceholder')} />
                        <Input dataAos='fade-up'  error={errors?.email} register={register('email')} KEY={'email'} cnInput='!border-[#E1E6EF] !border-[1px] ' classname='mt-[20px] ' icon={ImgEmail} type={'email'} label={t('email')} place={t('emailPlaceholder')} />
                        <Input dataAos='fade-up' error={errors?.password} register={register('password')} KEY={'password'} cnInput='!border-[#E1E6EF] !border-[1px] ' classname='mt-[20px] ' icon={ImgPassword} type={'password'} label={t('password')} place={t('passwordPlaceholder')} />
                        <Button isLoading={loading} dataAos='fade-up' onClick={submit} name={t('createAccountButton')} classname='mt-[40px]' />
                    </div>

                    <SocialAuth />
                </>
            )}

            {step == 2 && <VerifyIdentity step={step} setstep={handleStepChange} loading={loadingCheckOTP} CheckCodeOTP={CheckCodeOTP} resendGmailMsg={resendGmailMsg} />}
            {step == 3 && <SuccessVerifyIdentity step={step} setstep={handleStepChange}  />}
        </div>
    );
}
