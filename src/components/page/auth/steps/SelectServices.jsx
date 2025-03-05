import Button from '@/components/atoms/button/Button';
import Input from '@/components/atoms/input/Input';
import Select from '@/components/atoms/select/Select';
import Popup from '@/components/molecules/Popup';
import AddNewServicePopup from '@/components/popupComponent/AddNewServicePopup';
import { onEnter } from '@/helper/onEnter';
import { hookServices } from '@/hooks/hookServices';
import { useTranslations } from 'next-intl';
import Image from 'next/image';


import React, { useEffect, useState } from 'react';
import CurrentServicesOnVenue from './service/CurrentServicesOnVenue';

export default function SelectServices({ previousStep , loading, fields , append , watch , remove , register ,trigger, errors,  submit,  setValue }) {
    const t = useTranslations();
    const { service } =hookServices()
    onEnter(submit);

    useEffect(()=> { 
            const ele = document.getElementById("layoutAuth");
            if (ele) { ele.style.maxWidth = "900px"}
        } ,[])

    const [isOpenPopup , setisOpenPopup] = useState(false)
    



    return (
        <div data-aos="fade-up" className='flex flex-col gap-[20px]'>
            <div className='h2 mt-[20px] mb-[30px] text-center flex items-center justify-between '> 
                {t('hall_services')} 
                <div onClick={()=> setisOpenPopup(true)} className=' cursor-pointer hover:scale-[.99] duration-300 bg-primary1 text-white px-[20px] py-[10px] rounded-full text-[16px] flex justify-center items-center ' > {t("addNewServices")} </div>
            </div>

            <CurrentServicesOnVenue isOpenPopup={isOpenPopup} />

			<div className='flex flex-col gap-[30px] ' >
				{
					fields?.map((e,i)=> 
					<div key={i} style={{zIndex : 10 - i}}  className={` relative grid max-sm:grid-cols-1 grid-cols-[60px,1fr,1fr,1fr]  items-center gap-x-[10px] gap-y-[20px]`} > 
						<div onClick={()=> remove(i)} className=' mt-[20px] cursor-pointer hover:bg-opacity-40 duration-200 w-[40px] h-[40px] rounded-[50%] bg-red1 bg-opacity-20 flex items-center justify-center ' > <Image src={"/assets/remove.svg"} alt='' width={20} height={20} /> </div>
                        <Select  sendId={true} KEY={`services.${i}.service`} error={errors?.services?.[i]?.service} setValue={setValue} watch={watch} trigger={trigger} data={service} place={t('chooseService')} label={t('nameServices')} cnSelect=' px-[10px] rounded-[8px] !border-[#646369] !border-[1px] ' />

						<Input register={register(`services.${i}.count`)}                  error={errors?.services?.[i]?.count} label={t("countService")} KEY={"nameServices"}   type={"number"}  place={t("EntercountService")}   cnInput="!border-secondry3 !border-[1px] " />
						<Input unite={t("sar")} register={register(`services.${i}.price`)} error={errors?.services?.[i]?.price} label={t("price2")}     KEY={"price"}                 type={"number"}   place={t("enterPrice")}   cnInput="!border-secondry3 !border-[1px] " />
					
                    </div>)
				}
			</div>

			<button className='h4 w-fit mx-auto flex gap-[10px] items-center ' onClick={()=> append("services")} >  <div className=' w-[20px] h-[20px]  rounded-[50%] bg-primary1 flex justify-center items-center ' > <Image src={"/assets/plus-white.svg"} alt='' width={15} height={15} /> </div> {t("addServices")}  </button>
            
            <Button isLoading={loading} width="max-w-[300px] w-full mx-auto " dataAos='fade-up' onClick={submit} classname='mt-[50px] ' name={t('containue')} />
            <Button width="max-w-[300px] w-full mx-auto " dataAos='fade-up' onClick={previousStep} outline={true} name={t('return')} />
        
            <Popup title={t('addNewServices')} isOpen={isOpenPopup} onClose={() => setisOpenPopup(false)} content={ <AddNewServicePopup onClose={() => setisOpenPopup(false)} /> } />

        
        </div>
    );
}
