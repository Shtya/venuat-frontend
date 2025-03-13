import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useGlobalContext } from '@/context/GlobalContext';

export default function InputPhone({ unite, place, dataAos, rounded = true, error, cnInput, classname, label, type, icon, KEY, setValue, cnLabel }) {
    const t = useTranslations();
    const {changeListen} = useGlobalContext()
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const handlePhoneChange = (e) => {
        const value = e.target.value;

        // Validation: Check if the phone number starts with '05' and is 10 digits long
        if (value && (!value.startsWith('05'))) {
            setPhoneError(t("phoen1"));
            setPhoneNumber(value);
            setValue(KEY, null);
            return;
        }
		
        if (value.length !== 10 ) {
            setPhoneError(t("phoen2"));
            setPhoneNumber(value);
            setValue(KEY, null);
            return;
        }


        setPhoneError('');
        setPhoneNumber(value);

        // Remove the leading zero when sending the value
        const formattedNumber = value.startsWith('0') ? value.slice(1) : value;

        // Set the value with the +966 prefix
        if (formattedNumber) {
            setValue(KEY, `+966${formattedNumber}`);
        } else {
            setValue(KEY, null);
        }
    };

    useEffect(()=> {
        setPhoneNumber("") 
    } ,[changeListen])

    
    return (
        <div data-aos={dataAos} className={`${classname} flex flex-col gap-[5px] relative`}>
            {label && (
                <label htmlFor={KEY} className={`h5 ${cnLabel}`}>
                    {label}
                </label>
            )}
            <div className={`border-b-[#BCBBBF] w-full ${rounded ? '!rounded-[8px]' : '!rounded-[0px]'} overflow-hidden border-b-[1px] relative h-[45px] overflow-hidden ${cnInput}`}>
                <div className='flex items-center h-full !border-none'>
                    {type === 'text' && (
                        <span className={` ${icon ? " text-primary1 rtl:mr-[35px] ltr:ml-[35px]  " : "bg-primary1 text-white"}  font-[600] z-[1000] relative h-full flex items-center justify-center px-2 pointer-events-none select-none`}>
                            +966
                        </span>
                    )}
                    <input 
                        className={` ${icon && 'rtl:mr-[-40px] ltr:ml-[-40px]'} focus:border-primary1 ${rounded ? '!focus:border-[1px]' : '!focus:border-b-[1px]'} placeholder:text-secondry3 h5 w-full ${icon ? 'rtl:pr-[40px] ltr:pl-[40px]' : 'px-[10px]'} h-full outline-none text-secondry2`}
                        id={KEY}
                        placeholder={icon ? "050 000 0000" : place}
                        type={type}
                        pattern='^[0-9]*$'
                        inputMode='numeric'
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                    />
                    {icon && (
                        <Image
                            className='absolute rtl:right-[10px] ltr:left-[10px] top-[50%] translate-y-[-50%]'
                            src={icon}
                            alt=''
                            width={20}
                            height={20}
                        />
                    )} 
                </div>
            </div>
            {(phoneError || (phoneNumber === '' && error)) && (
                <div className='error absolute'>
                    {phoneError ? phoneError : t("phoen3")}
                </div>
            )}
        </div>
    );
}

