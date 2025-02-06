import Button from '@/components/atoms/button/Button';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

export default function SuccessVerifyIdentity({ step , setstep }) {
    const t = useTranslations();

    useEffect(() => {
        if (step == 3) {
            const createAccout = document.getElementById('create-account');
			const haveAccount = document.getElementById("have-account")
            if (createAccout) {
                createAccout.innerHTML = t('verify_identity');
            }
            if (haveAccount) {
                haveAccount.style.display = "none"
            }
        }
    }, [step]);
    

 
    return (
        <div>
            <div data-aos="fade-up" className=' text-center h3 my-[20px] '> {t('identity_verified_message')}  </div>
            <Image data-aos="fade-up" className=' mx-auto my-[50px] '  src={"/assets/verified.png"} alt='' width={300} height={280}  />
            <Button href="/sign-in" width="max-w-[400px] w-full mx-auto " dataAos={"fade-up"} onClick={()=> setstep(step + 1)} name={t("complete_data")} />
        </div>
    );
}
