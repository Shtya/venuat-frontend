import React, { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Divider from '@/components/atoms/Divider';
import AmountSkeleton from '@/components/atoms/Skelton/AmountSkeleton';
import AmountServices from './AmountServices';
import AmountEquipments from './AmountEquipments';
import { useGlobalContext } from '@/context/GlobalContext';

export default function DetailsVenue({cn, venue , Package , loading }) {
    const t = useTranslations();
    const {Services , setServices ,  Equipments , setEquipments} = useGlobalContext()
    const [disabled , setdisabled] = useState(false)
 
    useEffect(()=> {
        if(venue){
            if(Package){
                setServices(Package?.services?.filter(ele => ele?.price > 0))
                setEquipments(Package?.equipments?.filter(ele => ele?.price > 0))
                setdisabled(true)
            }
            else{
                setServices(venue?.venueServices)
                setEquipments(venue?.venueEquipments)
                setdisabled(false)
            }
        }
    } ,[loading])


    useEffect(()=> {
        if(Services?.length == 0 && Equipments?.length == 0) {
            const arrowShowDetails = document.querySelector(".arrow-show-details")
            if (arrowShowDetails) arrowShowDetails.style.display = 'none';
        }
    } ,[Services , Equipments , loading])


    const style = {
        head: 'grid grid-cols-3  gap-[10px] my-[20px]',
        body: 'grid grid-cols-3 justify-center gap-[10px] my-[20px]',
    };

	if (loading) {
        return (
            <div className={cn}>
                {/* Skeleton for Additional Services */}
                <div className={style.head}>
                    <div className="ltr:mr-auto rtl:ml-auto h-4 w-[150px] bg-gray-300 rounded animate-pulse"></div>
                    <div className="mx-auto h-4 w-[150px] bg-gray-300 rounded animate-pulse"></div>
                    <div className="ltr:ml-auto rtl:mr-auto h-4 w-[150px] bg-gray-300 rounded animate-pulse"></div>
                </div>
                {[...Array(3)].map((_, i) => (
                    <AmountSkeleton key={i} style={style.body} />
                ))}
                <Divider />
    
                {/* Skeleton for Additional Equipment */}
                <div className={style.head}>
                    <div className="ltr:mr-auto rtl:ml-auto h-4 w-[150px] bg-gray-300 rounded animate-pulse"></div>
                    <div className="mx-auto h-4 w-[150px] bg-gray-300 rounded animate-pulse"></div>
                    <div className="ltr:ml-auto rtl:mr-auto h-4 w-[150px] bg-gray-300 rounded animate-pulse"></div>
                </div>
                {[...Array(3)].map((_, i) => (
                    <AmountSkeleton key={i} style={style.body} />
                ))}
                <Divider />
            </div>
        );
    }


    return (
        <div className={`${cn}`}>
            {Services?.length > 0 && (
                <div className={`${style.head}   `}>
                    <span className=' font-medium text-secondry3 '> {t('additionalServices')} </span>
                    <span  className='text-center font-medium text-secondry3 '> {t('quantity')} </span>
                    <span  className='max-w-[70px] w-full ltr:ml-auto rtl:mr-auto font-medium text-secondry3 '> {t('price2')} </span>
                </div>
            )}

            
            <AmountServices setServices={setServices}  data={Services} disabled={disabled}  style={style.body} />
			{Services?.length > 0 && <Divider classname={"mt-[50px]"} />}


            {Equipments?.length > 0 && (
                <div className={style.head+ " mt-[60px] "}>
                    <span  className=' font-medium text-secondry3 '> {t('additionalEquipment')} </span>
                    <span  className='text-center font-medium text-secondry3 '> {t('quantity')} </span>
                    <span  className='max-w-[70px] w-full ltr:ml-auto rtl:mr-auto font-medium text-secondry3 '> {t('price2')} </span>
                </div>
            )}

            <AmountEquipments setEquipments={setEquipments} data={Equipments} disabled={disabled}  style={style.body} />
            {Equipments?.length > 0 && <Divider classname={"my-[50px]"} />}


        </div>
    );
}
