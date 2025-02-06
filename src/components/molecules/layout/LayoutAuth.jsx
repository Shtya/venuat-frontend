"use client"
import DropLang from '@/components/atoms/DropdownLang';
import { ImgBackground, ImgLogoBlue  } from '@/constants/imgs';
import { useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

export default function LayoutAuth({ children }) {
    const t = useTranslations();
    const router = useRouter()

    return (
        <div className=' auth relative overflow-hidden '>
            <div className=' top-[20px] left-[20px] absolute  flex items-center gap-[10px] ' > 
                <Image alt='' src={"/assets/locale.svg"} width={20} height={20} />
                <DropLang noDir={"left-0"} color={"text-secondry3 font-[300] "} /> 
            </div>
            
            <div className=' container min-h-[100vh] flex items-center justify-center '>
                <div className=' mb-[10px] py-[20px]  w-full z-[10] max-md:flex flex-col  justify-center items-center  '>
                    <Image onClick={()=> router.push("/")} data-aos="zoom-in" className=' cursor-pointer w-[150px] mx-auto  h-[80px] ' src={ImgLogoBlue} alt='' width={100} height={50} />
                    {children}
                </div>
            </div>

			<div data-aos="fade-down" className='absolute top-0 left-0 object-cover w-full h-[50%] '>  <Image className='object-cover '   alt='' src={ImgBackground} fill /> </div>
			<div data-aos="fade-up" className='absolute bottom-0 left-0 object-cover w-full h-[50%] '>  <Image className='object-cover '   alt='' src={ImgBackground} fill /> </div>
			<div data-aos="zoom-in" className='inner-shadow rounded-bl-[600px] bg-white bg-opacity-50 absolute lg:w-[300px] lg:h-[300px] w-[200px] h-[200px] top-0 right-0' > </div>
			<div data-aos="zoom-in" className='inner-shadow rounded-tr-[600px] bg-white bg-opacity-50 absolute lg:w-[300px] lg:h-[300px] w-[200px] h-[200px] bottom-0 left-0' > </div>
        </div>
    );
}
