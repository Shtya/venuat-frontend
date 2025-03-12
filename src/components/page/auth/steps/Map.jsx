"use client"
import Button from '@/components/atoms/button/Button';
import Radio from '@/components/atoms/radio/Radio';
import { onEnter } from '@/helper/onEnter';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
const MAP = dynamic(() => import('@/components/molecules/Map'), { ssr: false });



export default function MapComponent({ previousStep , errors , clearErrors , submit , loading , watch , setValue  }) {
	const t = useTranslations()

	const watchKey = watch?.("lat")
	useEffect(()=> {
		if(watchKey){
            clearErrors("lat")
        }
	} ,[watchKey])

useEffect(()=> { 
		const ele = document.getElementById("layoutAuth");
		if (ele) { ele.style.maxWidth = "700px"}
	} ,[])

    return (
        <div  >
			<div className="h2 mt-[20px] mb-[30px] text-center "> {t("mapTitle")} </div>

            <MAP Fetch={true} zoom={20} click={false}  setValue={setValue} />
            {errors?.lat && <div className='error w-full text-center text-[16px] mt-[10px]  '> {t(errors?.lat?.message)} </div>}
            
			
			<Button width="max-w-[300px] w-full mx-auto " dataAos='fade-up' isLoading={loading} onClick={submit} classname='mt-[50px] ' name={t("containue")} />
            <Button width="max-w-[300px] w-full mx-auto " dataAos='fade-up' onClick={previousStep} classname='mt-[10px] ' outline={true} name={t("return")} />
        </div>
    );
}
