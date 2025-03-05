'use client';

import React, { useEffect, useState } from 'react';
import Button from '@/components/atoms/button/Button';
import Input from '@/components/atoms/input/Input';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function AddPolicies({ previousStep , loading, fields , append , watch , remove , register ,trigger, errors,  submit,  setValue }) {
    const t = useTranslations()

    useEffect(() => {
            const ele = document.getElementById('layoutAuth');
            if (ele) {
                ele.style.maxWidth = '900px';
            }
        }, []);
    return (
        <div data-aos="fade-up" className="w-full p-4">
            <h2 className="text-center text-xl font-bold mb-4"> {t("policy")} </h2>
            
            <div className='flex flex-col gap-[30px] ' >
				{
					fields?.map((e,i)=> 
					<div key={i} style={{zIndex : 10 - i}}  className={` relative grid max-sm:grid-cols-1 grid-cols-[60px,1fr,1fr]  items-center gap-x-[10px] gap-y-[20px]`} > 
						<div onClick={()=> remove(i)} className=' mt-[20px] cursor-pointer hover:bg-opacity-40 duration-200 w-[40px] h-[40px] rounded-[50%] bg-red1 bg-opacity-20 flex items-center justify-center ' > <Image src={"/assets/remove.svg"} alt='' width={20} height={20} /> </div>
						<Input register={register(`policies.${i}.name`)}                  error={errors?.policies?.[i]?.name} label={t("addPolicyName")} KEY={"name"}   type={"string"}  place={t("enterPolicyName")}   cnInput="!border-secondry3 !border-[1px] " />
						<Input register={register(`policies.${i}.description`)}   error={errors?.policies?.[i]?.description}   label={t("addPolicyDesc")}   KEY={"description"}     type={"string"}  place={t("enterPolicyDesc")}     cnInput="!border-secondry3 !border-[1px] " />
					
                    </div>)
				}
			</div>

            <button className='h4 mt-[40px] w-fit mx-auto flex gap-[10px] items-center ' onClick={()=> append("policies")} >  <div className=' w-[20px] h-[20px]  rounded-[50%] bg-primary1 flex justify-center items-center ' > <Image src={"/assets/plus-white.svg"} alt='' width={15} height={15} /> </div> {t("addPolicy")}  </button>
                        
            <Button isLoading={loading} width="max-w-[300px] w-full mx-auto mb-[10px] "  onClick={submit} classname='mt-[50px] ' name={t('containue')} />
            <Button width="max-w-[300px] w-full mx-auto "  onClick={previousStep} outline={true} name={t('return')} />
                    
        </div>
    );
}
