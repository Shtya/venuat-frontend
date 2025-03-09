import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

export default function Address_vesitor({titleAddress , location , titleVistor , countOfVistor , cn }) {
    const t = useTranslations()
    
	return (
        <div  className={` ${titleVistor ? "max-sm:grid-cols-1 max-sm:gap-[10px] grid grid-cols-[1fr,100px]" : "grid-cols-1" } ${cn} items-start gap-[10px]`}>
            
            <div className='row max-sm:flex gap-[10px] items-center'>
                <div className=' text-[17px] max-md:text-[15px]  font-[600]'> {titleAddress} </div>
                {location && <div className='flex items-center gap-[5px]'>
                    <Image className='max-sm:hidden w-[18px]   ' src={'/assets/location.svg'} alt='' width={25} height={25} />
                    <div className='text-[12px] leading-[22px] '> {location} </div>
                </div>}
            </div>

            {titleVistor && <div className='row max-sm:flex gap-[10px] items-center '>
                <div className='text-[17px] max-md:text-[15px]  font-[600] text-primary1 '> {t('visitors_title')} </div>
                <div className=' flex items-center gap-[5px] '>
                    <Image className='max-sm:hidden w-[18px] ' src={'/assets/users.svg'} alt='' width={25} height={25} />
                	<div className='text-[12px] leading-[22px] '> {countOfVistor} </div>
                </div>
            </div>}
        </div>
    );
}
