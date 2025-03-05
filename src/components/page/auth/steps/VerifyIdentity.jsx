import Button from '@/components/atoms/button/Button';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

export default function VerifyIdentity({ step , setstep , loading , CheckCodeOTP, resendGmailMsg }) {
    const t = useTranslations();

    useEffect(() => {
        if (step == 2) {
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

    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);

    const handleChange = (value, index) => {
        if (isNaN(value)) return; // 
        const newCode = [...code];
        newCode[index] = value.slice(-1); 
        setCode(newCode);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

 
    return (
        <div >
            <div data-aos="fade-up" className=' text-center h4 mt-[30px] flex items-center justify-center gap-[10px] '>
                {t('code_sent_message')}
            </div>
            <Image data-aos="fade-up" className='w-[110px]  object-contain my-[20px] mx-auto ' src={'/assets/verifyIndentity.png'} alt='' width={180} height={180} />

            <div  className='flex flex-col items-center justify-center space-y-4 mt-8'>

                <div data-aos="fade-up" dir='ltr' className='flex gap-[10px] '>
                    {code.map((digit, index) => (
                        <input key={index}   type='text' value={digit} maxLength={1} onChange={e => handleChange(e.target.value, index)} onKeyDown={e => handleKeyDown(e, index)} ref={el => (inputRefs.current[index] = el)} className={` ${digit && "bg-primary3  border-[#576FDB] "} w-[50px] h-[50px] max-sm:w-[35px] max-sm:h-[35px] text-center text-lg border-[1px] border-gray-300 rounded-md focus:outline-none focus:border-primary1 transition`} />
                    ))}
                </div>
                <p data-aos="fade-up" className='text-secondry3 text-sm'> {t("verification_code_wait")} </p>

                {/* Resend Code */}
                <p onClick={resendGmailMsg} data-aos="fade-up" className='text-primary1 font-semibold underline  text-sm cursor-pointer hover:underline'> {t("did_not_receive_code")} </p>

                <Button width="max-w-[400px] w-full mx-auto " dataAos={"fade-up"} isLoading={loading} onClick={()=> CheckCodeOTP(code)} name={t("verify")} />
            </div>
        </div>
    );
}
