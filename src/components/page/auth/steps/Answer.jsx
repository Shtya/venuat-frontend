import Button from '@/components/atoms/button/Button'
import Input from '@/components/atoms/input/Input'
import InputPhone from '@/components/atoms/input/InputPhone'
import Select from '@/components/atoms/select/Select'
import { Cities, eventTypes } from '@/Dummy/dummy'
import { onEnter } from '@/helper/onEnter'
import { hookOccasion } from '@/hooks/hookOccasion'
import { hookUser } from '@/hooks/hookUser'
import { useTranslations } from 'next-intl'
import React, { useEffect } from 'react'


export default function Answer({previousStep ,errors , loading ,  submit  , register , setValue , getValues , watch , trigger }) {
	const t = useTranslations()
	const { occasion } = hookOccasion();
	const { user } = hookUser()
	onEnter(submit)

	useEffect(() => {
        const fields = ["email", "phone"];

        fields.forEach((field) => {
            const value = getValues(field, ""); 
			console.log(value)
            if (!value) {
                setValue(field, user?.[field] || ""); 
                const input = document.querySelector(`[name="${field}"]`);
                if (input) {
                    input.focus(); 
					input.parentElement.classList.add("lightgray-border")
					input.parentElement.classList.remove("!border-secondry3")
                    input.style.backgroundColor = "rgba(211, 211, 211, 0.3)"; // Highlight it
                }
            }
        });
    }, [user, setValue, getValues]);


	useEffect(()=> { 
        const ele = document.getElementById("layoutAuth");
        if (ele) { ele.style.maxWidth = "1000px"}
    } ,[])

  return (
	<div className='w-full' data-aos="fade-up" >
		<div  className="h2 text-center mb-[50px] max-sm:mb-[20px] "> {t("pleaseAnswerQuestions")}  </div>
		
		<div   className=" !z-10 grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-x-[10px] gap-y-[30px] max-md:gap-y-[25px] ">
			<Input register={register("name")} error={errors?.name} label={t("hallName")}               KEY={"name"}                 type={"text"}   place={t("enterHallName")}  cnInput="!border-secondry3 !border-[1px] " />
			<Select  cnSelect="px-[10px] rounded-[8px] !h-[45px] !border-secondry3 !border-[1px] "  KEY="occasion"  label={t("eventType")}    error={errors?.occasion} setValue={setValue}   watch={watch} trigger={trigger}  data={occasion} place={t("enterType")}  />
			<Input register={register("responsiblePersonName")} error={errors?.responsiblePersonName} label={t("responsiblePersonName")}  KEY={"responsiblePersonName"}    type={"text"}   place={t("enterName")}  cnInput="!border-secondry3 !border-[1px] " />
			<Input register={register("nearestMainAddress")} error={errors?.nearestMainAddress} label={t("nearestMainAddress")}     KEY={"nearestMainAddress"}       type={"text"}   place={t("enterAddress")}  cnInput="!border-secondry3 !border-[1px] " />
			<Input register={register("email")} error={errors?.email} label={t("email")}                  KEY={"email"}                    type={"email"}  place={t("enterEmail")}  cnInput="!border-secondry3 !border-[1px] " />
			<InputPhone register={register}  error={errors?.phone}  label={t("phoneNumber")}            KEY={"phone"}      setValue={setValue}        type={"text"}   place={t("enterNumber")}  cnInput="!border-secondry3 !border-[1px] " />
		</div>

			<Button width=" !z-[2] max-w-[300px] w-full mx-auto " dataAos='fade-up' isLoading={loading} onClick={submit} classname='mt-[50px] ' name={t("containue")} />
            <Button width=" !z-[2] max-w-[300px] w-full mx-auto " dataAos='fade-up' onClick={previousStep} classname='mt-[10px] ' outline={true} name={t("return")} />

	</div>
  )
}
