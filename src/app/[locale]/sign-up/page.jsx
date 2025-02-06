'use client';

import LayoutAuth from '@/components/molecules/layout/LayoutAuth';
import ChooseType from '@/components/page/auth/steps/ChooseType';
import CreateAccount from '@/components/page/auth/steps/CreateAccount';
import StepsProvider from '@/components/page/auth/steps/StepsProvider';
import { SignIn } from '@/constants/links';
import { hookSignUp } from '@/hooks/hookSignUp';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React, { useState } from 'react';

export default function page() {
    const t = useTranslations();
    const { register, errors, trigger, clearErrors, setError, getValues, setValue, submit, watch, reset } = hookSignUp();
    
    const [step, setstep] = useState(1);
    const [isClient, setisClient] = useState('');

    return (
        <LayoutAuth>
            <div className=' max-w-[800px] mx-auto w-full  ' id='layoutAuth'>
                {isClient != 'provider' && (
                    <div >
                        <div data-aos='fade-up' id='create-account' className='h1 font-semibold text-center '>
                            {t('createAccount')} {isClient && <span className='h4 text-secondry3 '> {`(${t(isClient)})`} </span>}
                        </div>

                        <div id='have-account' className='flex items-center justify-center  max-md:justify-center gap-[5px] my-[10px] '>
                            <span data-aos='fade-up' className='h3 text-secondry3 '> {t('alreadyHaveAccount')}  </span>
                            <Link data-aos='fade-up' href={SignIn} className='h4 text-primary1 underline cursor-pointer  '> {t('login')}  </Link>
                        </div>
                    </div>
                )}

                {step == 1 && <ChooseType getValues={getValues} setstep={setstep} setisClient={setisClient} setValue={setValue} />}
                {step == 2 && isClient == 'client' && <CreateAccount register={register} errors={errors} submit={submit} />}
                {step == 2 && isClient == 'provider' && <StepsProvider />}
            </div>
        </LayoutAuth>
    );
}
