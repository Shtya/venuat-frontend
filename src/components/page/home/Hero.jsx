"use client"
import { useTranslations } from 'next-intl';
import React from 'react';
import Search from '../../molecules/search/Search';

export default function Hero() {
  const t = useTranslations();

  return (
    <div className=' relative min-h-screen  flex items-center flex-col justify-center  '>
		<video className='absolute inset-0 w-full h-full object-cover' src='/assets/hero.mp4' autoPlay loop muted playsInline></video>
		<div className="absolute inset-0 bg-black opacity-50"></div>

		<div className="container max-md:pt-[100px] md:pb-[150px] z-[10]  min-h-[100vh] flex items-center flex-col justify-end gap-[10px]  ">
			<div  data-aos="fade-up" className=' max-w-[900px] h0 text-center  mb-[10px] max-md:mb-0 text-white '> {t('luxury_wedding_halls_and_events')} </div>
			<div  data-aos="fade-up" className='h2 text-center text-white  '> {t('unforgettable_wedding_experience')} </div>
			<Search dataAos="fade-up"   />
		</div>
    </div>
  );
}
