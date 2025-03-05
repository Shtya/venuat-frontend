'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import CardPlaceholder from '../placeholder/CardPlaceholder';
import InnerCard from './atoms/InnerCard';
import InnerCardCheckout from './atoms/InnerCardCheckout';
import { useEffect, useRef } from 'react';

export default function CardPackageCheckout({  packageId, setPackageId ,loading , data , Package }) {
    const swiperRef = useRef(null);


    const config = {
        modules: [Navigation, Pagination],
        navigation: {
            prevEl: '.custom-prev',
            nextEl: '.custom-next',
        },
        pagination: { clickable: true },
        spaceBetween: 20,
        onSwiper : (swiper) => (swiperRef.current = swiper) ,
        breakpoints: {
            0: { slidesPerView: 1 },    // تأكد من وجود قيمة للهواتف الصغيرة
            640: { slidesPerView: 1 },  
            800: { slidesPerView: 2 },  // التغيير عند 768 بدلاً من 900 
            1100: { slidesPerView: 3 },
        }
    };

    useEffect(() => {
        if (swiperRef.current && packageId) {
          const selectedIndex = Package?.findIndex((e) => e.id === packageId);
          if (selectedIndex !== -1) {
            swiperRef.current.slideTo(selectedIndex);
          }
        }
      }, [packageId]);

    return (
        <Swiper  {...config} className='mySwiper w-full !bg-white '>
            {
            loading
              ? Array(3).fill(0).map((_, i) => <SwiperSlide key={i} > <CardPlaceholder index={i}  key={i} /> </SwiperSlide> )
              : Package?.map((e, i) => ( 
                <SwiperSlide className='!bg-white shadow-none' key={e.id}  >
                    <InnerCardCheckout selected={e?.id == packageId }  btnName={"btnName"} e={e} i={i} data={data} /> 
                </SwiperSlide>
              ))}
        </Swiper>
    );
}
