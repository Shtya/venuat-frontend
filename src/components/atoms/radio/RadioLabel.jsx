import Button from '@/components/atoms/button/Button';
import Radio from '@/components/atoms/radio/Radio';
import { onEnter } from '@/helper/onEnter';
import { useTranslations } from 'next-intl';

import React, { useEffect, useState } from 'react';

export default function RadioLabel({watch , previousStep , loading , submit , getValues , title , KEY ,  data , step , setValue }) {
	const t = useTranslations()

	const handleSubmit = (e)=>{
		setValue( KEY , e.value)
	}

	const [error , seterror ] = useState()
	const handleGoToNextStep = ()=>{
		const getVal = getValues(KEY)
		if(!getVal){ seterror(`errors.${KEY}`) }
		else{
			seterror(null)
			submit()
		}
	}
	onEnter(handleGoToNextStep)

	useEffect(()=> { 
        const ele = document.getElementById("layoutAuth");
        if (ele) { ele.style.maxWidth = "600px"}
    } ,[])



    return (
        <div  >
			<div data-aos="fade-up" className="h2 mt-[20px] mb-[30px] text-center "> {t(title)} </div>
            <Radio watch={watch}  getValues={getValues} setError={seterror} onClick={handleSubmit} data={data} setValue={setValue} KEY={KEY} />
            {error && <div className='error mt-[10px] '> {t(error)} </div>}
            
			<Button isLoading={loading} width="max-w-[300px] w-full mx-auto " dataAos='fade-up' onClick={handleGoToNextStep} classname='mt-[50px] ' name={t("containue")} />
            {step >= 1 && <Button width="max-w-[300px] w-full mx-auto " dataAos='fade-up' onClick={previousStep} classname='mt-[10px] ' outline={true} name={t("return")} />}
		</div>
    );
}
