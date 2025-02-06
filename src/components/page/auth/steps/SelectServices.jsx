import Button from '@/components/atoms/button/Button';
import Input from '@/components/atoms/input/Input';
import Radio from '@/components/atoms/radio/Radio';
import DefaultSelect from '@/components/atoms/select/DefaultSelect';
import Select from '@/components/atoms/select/Select';
import { ImgPlus } from '@/constants/imgs';
import { Cities, eventTypes, SignUpTypeOfClient } from '@/Dummy/dummy';
import { onEnter } from '@/helper/onEnter';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import React, { useState } from 'react';

export default function SelectServices({clearErrors, fields , append , watch , remove , register ,trigger, setstep, errors, getValues, submit, data, step, setValue }) {
    const t = useTranslations();

    const handleReturn = e => {
        setstep(step - 1);
    };

    const handleGoToNextStep = () => {

        if (!getValues(`services.${0}.price`) || !getValues(`services.${0}.value`)) {
            submit();
        } else {
            setstep(step + 1);
            clearErrors()
        }
    };

    onEnter(handleGoToNextStep);

    
    return (
        <div className='flex flex-col gap-[20px]'>
            <div data-aos="fade-up" className='h2 mt-[20px] mb-[30px] text-center '> {t('hall_services')} </div>
			<div className='flex flex-col gap-[30px] ' >
				{
					fields?.map((e,i)=> 
					<div key={i} data-aos="fade-up"  className=' z-[10] relative grid max-sm:grid-cols-1 grid-cols-[60px,1fr,1fr]  items-center gap-x-[10px] gap-y-[20px]  ' > 
						<div onClick={()=> remove(i)} className=' mt-[20px] cursor-pointer hover:bg-opacity-40 duration-200 w-[40px] h-[40px] rounded-[50%] bg-red1 bg-opacity-20 flex items-center justify-center ' > <Image src={"/assets/remove.svg"} alt='' width={20} height={20} /> </div>
						{/* <DefaultSelect   cnSelect=" px-[10px] rounded-[8px] !h-[45px] !border-secondry3 !border-[1px] "  KEY={`services.${i}.value`}  label={t("eventType")}    error={errors?.services?.[i]?.value} setValue={setValue}   watch={watch} trigger={trigger}  data={eventTypes} place={t("enterType")}  /> */}
						<Input register={register(`services.${i}.value`)} error={errors?.services?.[i]?.value} label={t("nameServices")} KEY={"nameServices"}       type={"text"}     place={t("enterName")}   cnInput="!border-secondry3 !border-[1px] " />
						<Input unite={t("sar")} register={register(`services.${i}.price`)} error={errors?.services?.[i]?.price} label={t("price2")}     KEY={"price"}                 type={"number"}   place={t("enterPrice")}   cnInput="!border-secondry3 !border-[1px] " />
					</div>)
				}
			</div>
			<button data-aos="fade-up" className='h4 w-fit mx-auto flex gap-[10px] items-center ' onClick={()=> append("services")} > 
				<div className=' w-[20px] h-[20px]  rounded-[50%] bg-primary1 flex justify-center items-center ' > <Image src={"/assets/plus-white.svg"} alt='' width={15} height={15} /> </div>
				{t("addServices")} 
			</button>

            <Button width="max-w-[300px] w-full mx-auto " dataAos='fade-up' onClick={handleGoToNextStep} classname='mt-[50px] ' name={t('containue')} />
            {step > 1 && <Button width="max-w-[300px] w-full mx-auto " dataAos='fade-up' onClick={handleReturn} outline={true} name={t('return')} />}
        </div>
    );
}
