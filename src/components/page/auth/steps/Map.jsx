"use client"
import Button from '@/components/atoms/button/Button';
import Radio from '@/components/atoms/radio/Radio';
import { onEnter } from '@/helper/onEnter';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
const MAP = dynamic(() => import('@/components/molecules/Map'), { ssr: false });



export default function MapComponent({getValues , setname , KEY , setstep , data , step , setValue , btnSubmitName , btnReturnName }) {
	const t = useTranslations()

	const handleSubmit = (e)=>{
		setValue( KEY , e.value)
	}

	const handleReturn = (e)=>{
		setValue( KEY , "")
		setstep(step - 1)
	}


	const [error , seterror ] = useState()

	const handleGoToNextStep = ()=>{
		const getVal = getValues(KEY)
		if(!getVal){ seterror(`errors.${KEY}`) }
		else{
			seterror(null)
			setstep(step + 1)  
			localStorage.setItem("stepProvider" , step)
		}
	}

	onEnter(handleGoToNextStep)


    return (
        <div  >
			<div className="h2 mt-[20px] mb-[30px] text-center "> {t("mapTitle")} </div>

            <MAP  click={false}  setValue={setValue} />
            {error && <div className='error'> {t(error)} </div>}
            
			
			<Button width="max-w-[300px] w-full mx-auto " dataAos='fade-up' onClick={handleGoToNextStep} classname='mt-[50px] ' name={t("containue")} />
            {step > 1 && <Button width="max-w-[300px] w-full mx-auto " dataAos='fade-up' onClick={handleReturn} classname='mt-[10px] ' outline={true} name={t("return")} />}
        </div>
    );
}
