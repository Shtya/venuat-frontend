'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import Button from '../../atoms/button/Button';
import Starts from '../../atoms/start/Starts';
import Address_vesitor from '@/components/atoms/card/Address_vesitor';
import Rate_price from '@/components/atoms/card/Rate_price';
import CardPlaceholder from '../placeholder/CardPlaceholder';
import NotFound from '@/components/atoms/NotFound';

export default function Card({ grid , slice = 3 , showNoResultData , animation = true, data, isLoading, sckelton = 3, indextab, id }) {
    const t = useTranslations();
    const locale = useLocale();

    return (
        <>
            <div id={id} className={`grid max-[800px]:grid-cols-1  max-[1100px]:grid-cols-2 ${grid}  grid-cols-3 gap-[20px]`}>
                {isLoading ? (
                    Array(sckelton)
                        .fill(0)
                        .map((_, i) => <CardPlaceholder index={i} key={i} />)
                ) : data?.length > 0 ? (
                    data.slice(0, slice).map((e, i) => (
                        <div key={e.id} data-aos={animation && 'zoom-in'} data-aos-delay={`${i}00`} className='h-full pb-[50px] max-sm:pb-[50px] relative rounded-[30px] overflow-hidden w-full shadow-custom border-gray1 border-[1px]'>
                            <img className='w-full bg-primary1 h-[220px]  object-cover' src={e?.venueGalleries?.[0]?.imgs[0] || ""} alt='' />
                            <div className='p-[20px]'>
                                <Address_vesitor titleAddress={e?.name?.[locale]} location={`${e.property?.city.name} , ${e.property?.city?.country.name}`} titleVistor={t('visitors_count')} e={e} />
                                <Rate_price empty={3} fill={2} rateTitle={t('rating')} ratings={e?.ratings} priceTitle={t('price2')} priceValue={e?.price} />
                                <Button outline={true} href={`/details-halls/${e.id}`} classname={'absolute bottom-[5px] left-[50%] translate-x-[-50%] w-[calc(100%-10px)]'} name={t('book_now')} />
                            </div>
                        </div>
                    ))
                ) : (
                    showNoResultData 
                    ? <Image className=' col-span-4 '  src={"/assets/not-result.gif"} alt='' width={900} height={600} />
                    :<NotFound  />
                )}
            </div>

        </>
    );
}
