import Button from '@/components/atoms/button/Button';
import Radio from '@/components/atoms/radio/Radio';
import { SignUpTypeOfClient } from '@/Dummy/dummy'
import { onEnter } from '@/helper/onEnter';
import { useTranslations } from 'next-intl';

import React, { useEffect, useState } from 'react';

export default function Services({clearErrors , watch , KEY , trigger , setstep , errors , getValues , submit , data , step , setValue  }) {
	const t = useTranslations()
	const [vals , setvals ] = useState()

	const handleReturn = (e)=>{
		setstep(step - 1)
	}


	const handleGoToNextStep = ()=>{
		if(!getValues("freeBreakfast") || !getValues("parkingSpace") || !getValues("freeLunch") || !getValues("kidsArea") ) {
			submit()
		}else {
			setstep(step + 1)
			clearErrors()
		}
	}

	onEnter(handleGoToNextStep)



	const handleSelect = (key , val)=>{
		setvals(prev => {
			setValue(KEY , ({...prev , [key] : val}) )
			return ({...prev , [key] : val})
		})
		setValue(key , val)
		trigger(key)
	}

	const watchKey = watch(KEY)
	useEffect(()=> {
		if(watchKey) setvals(watchKey)
	} ,[])



    return (
        <div className='flex flex-col gap-[20px]' >
			<div className="h2 mt-[20px] mb-[30px] text-center "> {t("hall_services")} </div>
			{
				data?.map((e,i)=> 
				<div key={i} className={`  flex items-center justify-between gap-[10px]`} > 
					<div className="h3"> {t(e.name)} </div>
					<div className='flex items-center gap-[10px]  ' >
						<span onClick={()=> handleSelect(e.value , "true") }  className={` ${errors?.[e?.value] && "border-red1 text-red1 " } ${vals?.[e.value] == "true" && "text-white bg-primary2 "} p-[10px] border-[#BFC0C1] flex-none text-center rounded-[8px] w-fit px-[15px] cursor-pointer duration-100 hover:bg-primary1 hover:text-white border-[1px] max`} > {t("yes")} </span>
						<span onClick={()=> handleSelect(e.value , "false") } className={` ${errors?.[e?.value] && "border-red1 text-red1 " } ${vals?.[e.value] == "false" && "text-white bg-primary2 "} p-[10px] border-[#BFC0C1] flex-none text-center rounded-[8px] w-fit px-[15px] cursor-pointer duration-100 hover:bg-primary1 hover:text-white border-[1px] max`} > {t("no")} </span>
					</div>
				</div> )
			}
            
			
			<Button width="max-w-[300px] w-full mx-auto " dataAos='fade-up' onClick={handleGoToNextStep} classname='mt-[50px] ' name={t("containue")} />
            {step > 1 && <Button width="max-w-[300px] w-full mx-auto " dataAos='fade-up' onClick={handleReturn}  outline={true} name={t("return")} />}
        </div>
    );
}
