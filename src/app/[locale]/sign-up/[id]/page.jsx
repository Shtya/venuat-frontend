'use client';

import LayoutAuth from '@/components/molecules/layout/LayoutAuth';
import ChooseType from '@/components/page/auth/steps/ChooseType';
import AccountClient from '@/components/page/auth/steps/AccountClient';
import AccountProvider from '@/components/page/auth/steps/AccountProvider';
import { SignIn } from '@/constants/links';
import { hookSignUp } from '@/hooks/hookSignUp';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { hookChooseType } from '@/hooks/hookChooseType';

export default function page({params: {id}}) {
    const t = useTranslations();
    const { register , errors,  getValues, setValue, submit} = hookChooseType();
    
    const [step, setstep] = useState(id);
    const [isClient, setisClient] = useState('');

    useEffect(()=> {
        if(id == "provider") setisClient("provider")
        else if(id == "client") setisClient("client")
        else setisClient(null)
    } ,[id])

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

                {step == "choose-type" && <ChooseType getValues={getValues} setstep={setstep}  setValue={setValue} />}
                {step == "client"   && <AccountClient />}
                {step == "provider" && <AccountProvider />}
            </div>
        </LayoutAuth>
    );
}
