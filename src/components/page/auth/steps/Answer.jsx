import Button from '@/components/atoms/button/Button'
import Input from '@/components/atoms/input/Input'
import Select from '@/components/atoms/select/Select'
import { Cities, eventTypes } from '@/Dummy/dummy'
import { onEnter } from '@/helper/onEnter'
import { useTranslations } from 'next-intl'
import React, { useEffect } from 'react'


export default function Answer({errors , clearErrors , submit , getValues , register , setValue , watch , trigger  , step , setstep }) {
	const t = useTranslations()

	const handleGoToNextStep = ()=>{

		if(!getValues("hallName") || !getValues("eventType") || !getValues("responsiblePersonName") || !getValues("nearestMainAddress") || !getValues("email") || !getValues("phoneNumber") ) {
			submit()
		}else {
			setstep(step + 1)
			clearErrors()
		}
	}

	onEnter(handleGoToNextStep)

	const handleReturn = (e)=>{
		setstep(step - 1)
	}


	useEffect(()=> { 
        const ele = document.getElementById("layoutAuth");
        if (ele) { ele.style.maxWidth = "1000px"}
    } ,[])

  return (
	<div className='w-full' >
		<div data-aos="fade-up" className="h2 text-center mb-[50px] max-sm:mb-[20px] "> {t("pleaseAnswerQuestions")}  </div>
		
		<div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-x-[10px] gap-y-[30px] max-md:gap-y-[25px] ">
			<Input register={register("hallName")} error={errors?.hallName} label={t("hallName")}               KEY={"hallName"}                 type={"text"}   place={t("enterName")}   dataAos="fade-up" cnInput="!border-secondry3 !border-[1px] " />
			<Select  dataAos="fade-up" cnSelect="px-[10px] rounded-[8px] !h-[45px] !border-secondry3 !border-[1px] "  KEY="eventType"  label={t("eventType")}    error={errors?.eventType} setValue={setValue}   watch={watch} trigger={trigger}  data={eventTypes} place={t("enterType")}  />
			<Input register={register("responsiblePersonName")} error={errors?.responsiblePersonName} label={t("responsiblePersonName")}  KEY={"responsiblePersonName"}    type={"text"}   place={t("enterHallName")}   dataAos="fade-up" cnInput="!border-secondry3 !border-[1px] " />
			<Input register={register("nearestMainAddress")} error={errors?.nearestMainAddress} label={t("nearestMainAddress")}     KEY={"nearestMainAddress"}       type={"text"}   place={t("enterAddress")}   dataAos="fade-up" cnInput="!border-secondry3 !border-[1px] " />
			<Input register={register("email")} error={errors?.email} label={t("email")}                  KEY={"email"}                    type={"email"}  place={t("enterEmail")}   dataAos="fade-up" cnInput="!border-secondry3 !border-[1px] " />
			<Input register={register("phoneNumber")} error={errors?.phoneNumber} label={t("phoneNumber")}            KEY={"phoneNumber"}              type={"text"}   place={t("enterNumber")}   dataAos="fade-up" cnInput="!border-secondry3 !border-[1px] " />
		</div>

			<Button width="max-w-[300px] w-full mx-auto " dataAos='fade-up' onClick={handleGoToNextStep} classname='mt-[50px] ' name={t("containue")} />
            <Button width="max-w-[300px] w-full mx-auto " dataAos='fade-up' onClick={handleReturn} classname='mt-[10px] ' outline={true} name={t("return")} />

	</div>
  )
}
