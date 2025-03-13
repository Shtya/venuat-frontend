import React, { useEffect, useState } from 'react';
import Amount from './Amount';
import { useLocale, useTranslations } from 'next-intl';
import Checkbox from '@/components/atoms/checkbox/Checkbox';
import Divider from '@/components/atoms/Divider';
import { ensureYourHalls, services } from '@/Dummy/dummy';
import AmountSkeleton from '@/components/atoms/Skelton/AmountSkeleton';
import SAR from '@/components/atoms/SAR';
import AmountServices from './AmountServices';
import AmountEquipments from './AmountEquipments';

export default function DetailsVenue({setValue , cn, venue , Package , loading }) {
    const t = useTranslations();
    const locale = useLocale();
    const [Services , setServices] = useState(null)
    const [Equipments , setEquipments] = useState(null)
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
        console.log(Services , Equipments)
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
    
                {/* Skeleton for Additional Features */}
                {/* <div className="mt-[40px] mb-[20px]">
                    <div className="h-4 w-[200px] bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="grid max-sm:grid-cols-1 grid-cols-2 gap-x-[100px] gap-y-[20px] mb-[40px] ">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center  gap-[10px]">
                            <div className="h-[25px] w-[25px] bg-gray-300 rounded animate-pulse"></div>
                            <div className="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
                        </div>
                    ))}
                </div> */}
            </div>
        );
    }


    return (
        <div className={`${cn}`}>
            {Services?.length > 0 && (
                <div className={style.head}>
                    <span className=' font-medium text-secondry3 '> {t('additionalServices')} </span>
                    <span  className='text-center font-medium text-secondry3 '> {t('quantity')} </span>
                    <span  className='max-w-[70px] w-full ltr:ml-auto rtl:mr-auto font-medium text-secondry3 '> {t('price2')} </span>
                </div>
            )}

            
            <AmountServices setValue={setValue} venue={venue} data={Services} disabled={disabled}  style={style.body} />
			{Services?.length > 0 && <Divider classname={"mt-[50px]"} />}


            {Equipments?.length > 0 && (
                <div className={style.head+ " mt-[60px] "}>
                    <span  className=' font-medium text-secondry3 '> {t('additionalEquipment')} </span>
                    <span  className='text-center font-medium text-secondry3 '> {t('quantity')} </span>
                    <span  className='max-w-[70px] w-full ltr:ml-auto rtl:mr-auto font-medium text-secondry3 '> {t('price2')} </span>
                </div>
            )}

            <AmountEquipments setValue={setValue} venue={venue} data={Equipments} disabled={disabled}  style={style.body} />
            {Equipments?.length > 0 && <Divider classname={"my-[50px]"} />}


            {/* <div  className=' mt-[40px] mb-[20px] font-medium text-secondry3 '> {t('additionalFeature')}  </div>
            <div className='grid max-sm:grid-cols-1 grid-cols-2  gap-x-[100px] gap-y-[20px]  '>
                {venue?.venueFeatures?.map((e, i) => (
                    <div  key={i} className='  flex items-center justify-between gap-[10px]'>
                        <div> <Checkbox disabled={true} checked={true} cn='!mt-0' KEY={`Feature-${e.id}`} label={e?.feature?.feature_name?.[locale]} /> </div>
                        <div className='h3 text-primary1 '> <SAR price={e.price || 0} />  </div>
                    </div>
                ))}
            </div>

            <Divider classname='my-[30px]' /> */}
        </div>
    );
}
