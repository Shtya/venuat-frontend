'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import CardPlaceholder from '../placeholder/CardPlaceholder';
import InnerCard from './atoms/InnerCard';
import { useEffect } from 'react';

export default function CardPackage({ loading , data , Package , btnName }) {


    const config = {
        modules: [Navigation, Pagination],
        navigation: {
            prevEl: '.custom-prev',
            nextEl: '.custom-next',
        },
        pagination: { clickable: true },
        spaceBetween: 20,
        breakpoints: {
            0: { slidesPerView: 1 },    // تأكد من وجود قيمة للهواتف الصغيرة
            640: { slidesPerView: 1 },  
            800: { slidesPerView: 2 },  // التغيير عند 768 بدلاً من 900 
            1100: { slidesPerView: 3 },
        }
    };

    // Filter out expired packages
    const validPackages = Package?.filter(e => !e?.end_date || new Date(e.end_date) > new Date());

    // Hide arrows if no valid packages are present
    useEffect(() => {
        const arrow = document.querySelector('.arrow-package');
        arrow.style.display = validPackages?.length === 0 ? 'none' : 'flex';
        
    }, [validPackages , loading]);

    return (
        <Swiper  {...config} className='mySwiper w-full !bg-white mb-[80px] '>
            {
            loading
              ? Array(3).fill(0).map((_, i) => <SwiperSlide key={i} > <CardPlaceholder index={i}  key={i} /> </SwiperSlide> )
              : validPackages?.map((e, i) => ( 
                <SwiperSlide className='!bg-white shadow-none' key={e.id}  >
                <InnerCard btnName={btnName} e={e} i={i} data={data} /> 
                </SwiperSlide>
              ))}
        </Swiper>
    );
}
