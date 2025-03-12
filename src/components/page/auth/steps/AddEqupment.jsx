import Button from '@/components/atoms/button/Button';
import Input from '@/components/atoms/input/Input';
import Select from '@/components/atoms/select/Select';
import Popup from '@/components/molecules/Popup';
import AddNewEquipmentPopup from '@/components/popupComponent/AddNewEquipmentPopup';
import { onEnter } from '@/helper/onEnter';
import { hookGetEquipments } from '@/hooks/equipment/hookGetEquipments';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import React, { useEffect, useState } from 'react';
import CurrentEquipmentsOnVenue from './equipment/CurrentEquipmentsOnVenue';
import AxiosInstance from '@/config/Axios';

export default function SelectEqupment({previousStep , loading, fields , append , watch , remove , register ,trigger, errors,  submit, setValue }) {
    const t = useTranslations();
    const { equipments } =hookGetEquipments()
    const [isOpenPopup , setisOpenPopup] = useState(false)
    onEnter(submit);
    
    useEffect(()=> { 
        const ele = document.getElementById("layoutAuth");
        if (ele) { ele.style.maxWidth = "900px"}
    } ,[])


    
    const [newAdded , setnewAdded] = useState([])
	const [venueId, setvenueId] = useState(null);
	useEffect(() => { 
        setvenueId(JSON.parse(localStorage.getItem('venueId'))); 
    }, []);


	const getEquipments = async()=>{
        AxiosInstance.get(`/equipment/global-and-user`)
				.then(res => {
                    res.data.forEach((equipment, index) => {
                        remove(index)
                        append("equipment")
                        setValue(`equipment.${index}.equipment_id`, equipment.id);
                        setValue(`equipment.${index}.count`, null);
                        setValue(`equipment.${index}.price`, null);
                    });

				})
				.catch(err=> {})
	}

	useEffect(()=> {
		if(venueId){
			getEquipments()
		}
	},[venueId ])
    

        useEffect(()=> {
        if(setnewAdded){
            remove(fields?.length)
            append("equipment")
            setValue(`equipment.${fields?.length}.equipment_id`, newAdded?.equipment_id);
            setValue(`equipment.${fields?.length}.count`, newAdded?.count);
            setValue(`equipment.${fields?.length}.price`, newAdded?.price);
        }
    } ,[newAdded])



    
    return (
        <div data-aos="fade-up" className='flex flex-col gap-[20px]'>
            <div className='h2 mt-[20px] mb-[30px] text-center flex items-center justify-between '> 
                {t('add_equipment_to_hall')} 
                <div onClick={()=> setisOpenPopup(true)} className=' cursor-pointer hover:scale-[.99] duration-300 bg-primary1 text-white px-[20px] py-[10px] rounded-full text-[16px] flex justify-center items-center ' > {t("addNewEquipment")} </div>
            </div>

            {/* <CurrentEquipmentsOnVenue isOpenPopup={isOpenPopup} /> */}

			<div className='flex flex-col gap-x-[30px] gap-y-[15px]' >
				{
					fields?.map((e,i)=> 
					<div key={i}  className='grid max-md:grid-cols-1 grid-cols-[60px,1fr,1fr,1fr]  items-center gap-x-[10px] gap-y-[20px]  ' > 
						<div onClick={()=> remove(i)} className=' mt-[20px] cursor-pointer hover:bg-opacity-40 duration-200 w-[40px] h-[40px] rounded-[50%] bg-red1 bg-opacity-20 flex items-center justify-center ' > <Image src={"/assets/remove.svg"} alt='' width={20} height={20} /> </div>
                        <Select  sendId={true} KEY={`equipment.${i}.equipment_id`} error={errors?.equipment?.[i]?.equipment_id} setValue={setValue} watch={watch} trigger={trigger} data={equipments} label={i == 0 &&t('equipment_name')} place={t('enter_equipment_name')} cnSelect=' px-[10px] rounded-[8px] !border-[#646369] !border-[1px] ' />
                        <Input register={register(`equipment.${i}.count`)}                  error={errors?.equipment?.[i]?.count} label={i == 0 && t("equipment_quantity")} KEY={"equipment_quantity"}   type={"number"}  place={t("enter_equipment_quantity")}   cnInput="!border-secondry3 !border-[1px] " />
                        <Input unite={t("sar")} IconUnit={true} register={register(`equipment.${i}.price`)} error={errors?.equipment?.[i]?.price} label={i == 0 && t("price2")}     KEY={"price"}                 type={"number"}   place={t("enter_price")}   cnInput="!border-secondry3 !border-[1px] " />

                    </div>)
				}
			</div>
			<button  className='h4 w-fit mx-auto flex gap-[10px] items-center ' onClick={()=> append("services")} >  <div className=' w-[20px] h-[20px] rounded-[50%] bg-primary1 flex justify-center items-center ' > <Image src={"/assets/plus-white.svg"} alt='' width={15} height={15} /> </div> {t("add_new_equipment")}  </button>

            <Button isLoading={loading} width="max-w-[300px] w-full mx-auto "  onClick={submit} classname='mt-[50px] ' name={t('containue')} />
            <Button width="max-w-[300px] w-full mx-auto " onClick={previousStep}  outline={true} name={t('return')} />
        
            <Popup title={t('addNewEquipment')} isOpen={isOpenPopup} onClose={() => setisOpenPopup(false)} content={ <AddNewEquipmentPopup setnewAdded={setnewAdded} onClose={() => setisOpenPopup(false)} /> } />

        </div>
    );
}
