"use client"
import Button from '@/components/atoms/button/Button';
import Radio from '@/components/atoms/radio/Radio';
import { onEnter } from '@/helper/onEnter';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useState } from 'react';
const MAP = dynamic(() => import('@/components/molecules/Map'), { ssr: false });



export default function Finish ({getValues , setname , KEY , setstep , data , step , setValue , btnSubmitName , btnReturnName }) {
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
		// const getVal = getValues(KEY)
		// if(!getVal){ seterror(`errors.${KEY}`) }
		// else{
		// 	seterror(null)
		// 	setstep(step + 1)  
		// 	localStorage.setItem("stepProvider" , step)
		// }
	}

	onEnter(handleGoToNextStep)


    return (
        <div  >
			<div data-aos="zoom-out"  className="h2 mt-[20px] mb-[30px] text-center "> {t("congratulations_message")} </div>
			<Image data-aos="zoom-out" className=' w-full max-w-[340px] h-[300px] mx-auto object-contain ' alt='' src={"/assets/finish.png"} width={200} height={200} />
			
			<Button  href={"/"}  width="max-w-[300px] w-full mx-auto " dataAos='zoom-out' onClick={handleGoToNextStep} classname='mt-[50px] ' name={t("home_page")} />
        </div>
    );
}
