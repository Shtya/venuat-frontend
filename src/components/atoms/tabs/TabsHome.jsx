// 'use client';
// import React, { useEffect, useState } from 'react';
// import Button from '../button/Button';
// import { useLocale, useTranslations } from 'next-intl';
// import TabsPlaceholder from '@/components/molecules/placeholder/TabsPlaceholder';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';

// export default function TabsHome({ isLoading , setindextab, data, classname }) {
//     const t = useTranslations();
// 	const locale = useLocale()

//     const [currentValue, setcurrentValue] = useState();

//     const handleValue = value => {
//         setcurrentValue(value);
//         setindextab?.(value);
//     };

// 	useEffect(()=> {
// 		data && handleValue(data?.[0]?.id);
// 	} ,[data])

//     const config = {
//         modules: [Navigation, Pagination],
//         navigation: {
//             prevEl: '.custom-prev',
//             nextEl: '.custom-next',
//         },
//         pagination: { clickable: true },
//         spaceBetween: 20,
//         breakpoints: {
//             640: { slidesPerView: 1 },
//             900: { slidesPerView: 2 },
//             1024: { slidesPerView: 3 },
//         },
//     };

//     return (
//         <div className={`flex max-sm:grid max-sm:grid-cols-3  items-center justify-center max-w-[800px] w-full mx-auto flex-wrap gap-[10px] my-[20px] ${classname} `}>
//             {isLoading
//                 ? Array(5).fill(0).map((_, i) => ( <TabsPlaceholder key={i} /> ))
//                 : data?.map((e, i) => (
//                 <div key={i} data-aos='zoom-out' data-aos-delay={`${i}00`} >
//                     <Button classname='max-sm:px-[10px]  max-md:!text-[10px]'
// 						key={i}
// 						onClick={() => handleValue(e.id)}
// 						outline={currentValue !== e.id ? true : false}
// 						name={e.name[locale]} />
//                 </div>
//             ))}
//         </div>
//     );
// }

'use client';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useLocale } from 'next-intl';
import TabsPlaceholder from '@/components/molecules/placeholder/TabsPlaceholder';

export default function TabsHome({ isLoading, setindextab, data }) {
    const locale = useLocale();
    const [currentValue, setcurrentValue] = useState();

    const handleValue = value => {
        setcurrentValue(value);
        setindextab?.(value);
    };

    useEffect(() => {
        data && handleValue(data?.[0]?.id);
    }, [data]);

    return (
        <div data-aos="fade-up" className=' px-[45px] tabs relative max-w-[1100px] w-full mx-auto mb-[30px] '>
            <Swiper
                modules={[Navigation]}
                navigation={{
                    prevEl: '.custom-prev2',
                    nextEl: '.custom-next2',
                }}
                spaceBetween={10}
                slidesPerView='auto'
                className='flex w-full'>
                {isLoading
                    ? Array(10).fill(0).map((_, i) => ( <SwiperSlide key={i} className='w-full mx-auto'> <TabsPlaceholder  />  </SwiperSlide>
                          ))
                    : data?.map((e, i) => (
                          <SwiperSlide key={i} className=' '>
                              <button className={`px-4 py-2 !w-fit rounded-full duration-300  text-white font-semibold ${currentValue === e.id ? 'bg-primary1 text-white' : 'bg-white hover:bg-primary1 hover:!text-white !text-black border border-primary1 '}`} onClick={() => handleValue(e.id)}>
                                  {e.name?.[locale]}
                              </button>
                          </SwiperSlide>
                      ))}
            </Swiper>
            {/* <div className="shadow-gradient absolute top-0 h-full w-[100px] bg-gradient-to-l from-primary1 to-transparent pointer-events-none  right-0 ltr:rounded-[0_50%_50%_0] z-[10] "></div> */}
            
            
            <button className=' absolute ltr:left-0 ltr:rotate-[-180deg] rtl:right-0 top-[50%] translate-y-[-50%]  custom-prev2 w-[40px] h-[40px] bg-primary1 stroke-white hover:bg-primary2 hover:stroke-white duration-100 ' >  <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.83333 1.33268L8.5 7.99935L1.83333 14.666" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>  </button>
            <button className=' absolute ltr:right-0 ltr:rotate-[-180deg] rtl:left-0 top-[50%] translate-y-[-50%]   custom-next2 w-[40px] h-[40px] bg-primary1 stroke-white hover:bg-primary2 hover:stroke-white duration-100 '>   <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.16667 1.33268L1.5 7.99935L8.16667 14.666" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>

           
        </div>
    );
}
