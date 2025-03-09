'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import CountainerStarts from '@/components/atoms/start/CountainerStarts';

const Map = dynamic(() => import('@/components/molecules/Map'), { ssr: false });

export default function Section2({ venue, loading }) {
    const t = useTranslations();
    const locale = useLocale();

    const [locationName , setlocationName] = useState()

    const data = [
        { value: 'premium_experience', name: 'premiumExperience' },
        { value: 'variety_of_activities', name: 'varietyOfActivities' },
        { value: 'easy_access_to_location', name: 'easyAccessToLocation' },
    ];

    return (
        <div id='summary' className='grid grid-cols-[1fr,600px] items-center max-lg:grid-cols-2 max-md:grid-cols-1 gap-[50px] max-md:gap-[10px] my-[100px]'>
            <div  data-aos='fade-up'  className='flex flex-col'>

                <div  className='row grid grid-cols-2 max-xl:grid-cols-1'>
                    {/* Left Side - Venue Name & Reviews */}
                    <div className='box'>
                        {loading ? <div className='h-10 w-48 bg-gray-300 animate-pulse rounded-lg' /> : <div className='h1 font-[700]'>{venue?.name?.[locale]}</div>}

                        <div className='flex items-center gap-[15px] mt-[10px]'>
                            <span className='h2 font-[500]'>{t('reviews_count')}</span>
                            {loading ? <div className='h-6 w-24 bg-gray-300 animate-pulse rounded-lg' /> : <CountainerStarts ratings={venue?.ratings} />}
                        </div>
                    </div>

                    {/* Right Side - Pricing */}
                    <div className='box max-xl:mt-[10px]'>
                        <div className='h1'>{t('hall_price')}</div>
                        <div className='flex items-center gap-[5px] xl:mt-[10px]'>{loading ? <div className='h-6 w-20 bg-gray-300 animate-pulse rounded-lg' /> : <span className='h2 text-primary1 font-[700]'>{t('price', { count: venue?.price })}</span>}</div>
                    </div>
                </div>

                {/* Features List */}
                <ul className='row grid grid-cols-[100px,100px,100px] gap-[10px] items-center mt-[30px]'>
                    {data.map((e, i) => (
                        <li className='flex flex-col items-center justify-start h-full duration-100 text-primary1 cursor-pointer' key={i}>
                            {loading ? <div className='w-[75px] h-[75px] bg-gray-300 animate-pulse rounded-lg' /> : <Image src={`/assets/${e.value}.svg`} alt='' width={75} height={75} />}
                            <div className='h4 text-center'>{loading ? '...' : t(e.name)}</div>
                        </li>
                    ))}
                </ul>

                <div className='flex items-center gap-[5px] mt-[20px] '>
                    <Image className='max-sm:hidden ' src={'/assets/location.svg'} alt='' width={25} height={25} />
                    <div className='h4 text-balance max-w-[600px] '> {locationName}</div>
                </div>


                {/* Brief Details */}
                <div  className='row mt-[30px]'>
                    <div className='h1'>{t('brief_details')}</div>
                    {loading ? <div className='h-16 w-full bg-gray-300 animate-pulse rounded-lg mt-2' /> : <div className='h3 text-secondry3'>{venue?.description?.[locale]}</div>}
                </div>

            </div>

            {/* Map Section */}
            <div data-aos='fade-up'>
                <div className='h1 font-[700] mb-[20px]'>{t('where_in_jeddah')}</div>
                {loading ? 
                    <div className='h-[365px] w-full bg-gray-300 animate-pulse rounded-lg' /> 
                    : venue && <Map showName={false} setlocationName={setlocationName} center={[venue?.lat || 21.2854  , venue?.lng || 39.2376]} zoom={100} />}
            </div>
        </div>
    );
}
