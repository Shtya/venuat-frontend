import Button from '@/components/atoms/button/Button';
import Input from '@/components/atoms/input/Input';
import Select from '@/components/atoms/select/Select';
import Popup from '@/components/molecules/Popup';
import AddNewServicePopup from '@/components/popupComponent/AddNewServicePopup';
import { onEnter } from '@/helper/onEnter';
import { hookServices } from '@/hooks/hookServices';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';


import React, { useEffect, useState } from 'react';
import CurrentServicesOnVenue from './service/CurrentServicesOnVenue';
import AxiosInstance from '@/config/Axios';
import { IconSAR } from '@/components/atoms/SAR';



export default function SelectServices({ previousStep , loading, fields , append , watch , remove , register ,trigger, errors,  submit,  setValue }) {
    const t = useTranslations();
    const { service } =hookServices()
    onEnter(submit);

    useEffect(()=> { 
            const ele = document.getElementById("layoutAuth");
            if (ele) { ele.style.maxWidth = "900px"}
        } ,[])

    const [isOpenPopup , setisOpenPopup] = useState(false)
    

    const [newAdded , setnewAdded] = useState([])
	const [venueId, setvenueId] = useState(null);
	useEffect(() => { 
        setvenueId(JSON.parse(localStorage.getItem('venueId'))); 
    }, []);


	const getServices = async()=>{
        AxiosInstance.get(`/services/global-and-user`)
				.then(res => {
                    res.data.forEach((service, index) => {
                        remove(index)
                        append("services")
                        setValue(`services.${index}.service`, service.id);
                        setValue(`services.${index}.count`, null);
                        setValue(`services.${index}.price`, null);
                    });

				})
				.catch(err=> {})
	}

	useEffect(()=> {
		if(venueId){
			getServices()
		}
	},[venueId ])
    

        useEffect(()=> {
        if(setnewAdded){
            remove(fields?.length)
            append("services")
            setValue(`services.${fields?.length}.service`, newAdded?.service);
            setValue(`services.${fields?.length}.count`, newAdded?.count);
            setValue(`services.${fields?.length}.price`, newAdded?.price);
        }
    } ,[newAdded])



    return (
        <div data-aos="fade-up" className='flex flex-col gap-[20px]'>
            <div className='h2 mt-[20px] mb-[30px] text-center flex items-center justify-between '> 
                {t('hall_services')} 
                <div onClick={()=> setisOpenPopup(true)} className=' cursor-pointer hover:scale-[.99] duration-300 bg-primary1 text-white px-[20px] py-[10px] rounded-full text-[16px] flex justify-center items-center ' > {t("addNewServices")} </div>
            </div>

            {/* <CurrentServicesOnVenue remove={remove} append={append} fields={fields} setValue={setValue} /> */}

			<div className='flex flex-col gap-x-[30px] gap-y-[15px] ' >
				{
					fields?.map((e,i)=> 
					<div key={i} style={{zIndex : 30 - i}}  className={` relative grid max-sm:grid-cols-1 grid-cols-[60px,1fr,1fr,1fr]  items-center gap-x-[20px] gap-y-[20px]`} > 
						<div onClick={()=> remove(i)} className=' mt-[10px] cursor-pointer hover:bg-opacity-40 duration-200 w-[40px] h-[40px] rounded-[50%] bg-red1 bg-opacity-20 flex items-center justify-center ' > <Image src={"/assets/remove.svg"} alt='' width={20} height={20} /> </div>
                        <Select  sendId={true} KEY={`services.${i}.service`} error={errors?.services?.[i]?.service} setValue={setValue} watch={watch} trigger={trigger} data={service} place={t('chooseService')} label={ i == 0 && t('nameServices')} cnSelect=' !h-[45px] px-[10px] rounded-[8px] !border-[#646369] !border-[1px] ' />

						<Input register={register(`services.${i}.count`)}                  error={errors?.services?.[i]?.count} label={i == 0 && t("countService")} KEY={"nameServices"}   type={"number"}  place={t("EntercountService")}   cnInput="!border-secondry3 !border-[1px] " />
						<Input unite={IconSAR} IconUnit={true} register={register(`services.${i}.price`)} error={errors?.services?.[i]?.price} label={i == 0 && t("price2")}     KEY={"price"}                 type={"number"}   place={t("enterPrice")}   cnInput="!border-secondry3 !border-[1px] " />
					
                    </div>)
				}
			</div>

			<button className='h4 w-fit mx-auto flex gap-[10px] items-center ' onClick={()=> append("services")} >  <div className=' w-[20px] h-[20px]  rounded-[50%] bg-primary1 flex justify-center items-center ' > <Image src={"/assets/plus-white.svg"} alt='' width={15} height={15} /> </div> {t("addServices")}  </button>
            
            <Button isLoading={loading} width="max-w-[300px] w-full mx-auto " dataAos='fade-up' onClick={submit} classname='mt-[50px] ' name={t('containue')} />
            <Button width="max-w-[300px] w-full mx-auto " dataAos='fade-up' onClick={previousStep} outline={true} name={t('return')} />
        
            <Popup title={t('addNewServices')} isOpen={isOpenPopup} onClose={() => setisOpenPopup(false)} content={ <AddNewServicePopup setnewAdded={setnewAdded} onClose={() => setisOpenPopup(false)} /> } />

        
        </div>
    );
}
