import Button from '@/components/atoms/button/Button';
import Input from '@/components/atoms/input/Input';
import Radio from '@/components/atoms/radio/Radio';
import Select from '@/components/atoms/select/Select';
import { ImgPlus } from '@/constants/imgs';
import { Cities, SignUpTypeOfClient } from '@/Dummy/dummy';
import { onEnter } from '@/helper/onEnter';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import React, { useEffect, useState } from 'react';

export default function AddEqupment({ fields , append , clearErrors , remove , register ,trigger, setstep, errors, getValues, submit, data, step, setValue }) {
    const t = useTranslations();

    const handleReturn = e => {
        setstep(step - 1);
    };

    const handleGoToNextStep = () => {

        if (!getValues(`equipment.${0}.price`) || !getValues(`equipment.${0}.count`) || !getValues(`equipment.${0}.value`)) {
            submit();
        } else {
            setstep(step + 1);
            clearErrors()
        }
    };

    useEffect(()=> { 
        const ele = document.getElementById("layoutAuth");
        if (ele) { ele.style.maxWidth = "1000px"}
    } ,[])

    onEnter(handleGoToNextStep);
    
    return (
        <div className='flex flex-col gap-[20px]'>
            <div className='h2 mt-[20px] mb-[30px] text-center '> {t('add_equipment_to_hall')} </div>
			<div className='flex flex-col gap-[30px] ' >
				{
					fields?.map((e,i)=> 
					<div key={i} data-aos="fade-up" className='grid max-md:grid-cols-1 grid-cols-[100px,1fr,1fr,1fr]  items-center gap-x-[10px] gap-y-[20px]  ' > 
						<div onClick={()=> remove(i)} className=' mt-[20px] cursor-pointer hover:bg-opacity-40 duration-200 w-[40px] h-[40px] rounded-[50%] bg-red1 bg-opacity-20 flex items-center justify-center ' > <Image src={"/assets/remove.svg"} alt='' width={20} height={20} /> </div>
						<Input register={register(`equipment.${i}.value`)} error={errors?.equipment?.[i]?.value} label={t("equipment_name")}       KEY={"equipment_name"}         type={"text"}   place={t("enter_equipment_name")}    cnInput="!border-secondry3 !border-[1px] " />
						<Input register={register(`equipment.${i}.count`)} error={errors?.equipment?.[i]?.count} label={t("equipment_quantity")}   KEY={"equipment_quantity"}     type={"number"}   place={t("enter_equipment_quantity")}   cnInput="!border-secondry3 !border-[1px] " />
						<Input register={register(`equipment.${i}.price`)} error={errors?.equipment?.[i]?.price} label={t("price2")}               KEY={"price2"}                 type={"number"}   place={t("enter_price")} unite={t("sar")}  cnInput="!border-secondry3 !border-[1px] " />
					</div>)
				}
			</div>
			<button data-aos="fade-up" className='h4 w-fit mx-auto flex gap-[10px] items-center ' onClick={()=> append("services")} > 
				<div className=' w-[20px] h-[20px] rounded-[50%] bg-primary1 flex justify-center items-center ' > <Image src={"/assets/plus-white.svg"} alt='' width={15} height={15} /> </div>
				{t("add_new_equipment")} 
			</button>

            <Button width="max-w-[300px] w-full mx-auto "  dataAos='fade-up' onClick={handleGoToNextStep} classname='mt-[50px] ' name={t('containue')} />
            {step > 1 && <Button width="max-w-[300px] w-full mx-auto " dataAos='fade-up' onClick={handleReturn}  outline={true} name={t('return')} />}
        </div>
    );
}
