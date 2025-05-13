'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import Image from 'next/image';
import Button from '../../atoms/button/Button';
import { useLocale, useTranslations } from 'next-intl';
import Address_vesitor from '@/components/atoms/card/Address_vesitor';
import Rate_price from '@/components/atoms/card/Rate_price';
import CardPlaceholder from '../placeholder/CardPlaceholder';
import NotFound from '@/components/atoms/NotFound';
import { useEffect, useRef } from 'react';

export default function CardSlider({ isLoading , data }) {

    const t = useTranslations();
    const locale = useLocale()

    const config = {
        loop: true,
        speed: 500,
        slideToClickedSlide: true,
        modules: [Navigation,Autoplay, Pagination],
        navigation: {
            prevEl: '.custom-prev',
            nextEl: '.custom-next',
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: { clickable: true },
        spaceBetween: 20,
        breakpoints: {
            640: { slidesPerView: 1 },
            900: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        },
    };




    const swiperRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            if (swiperRef.current && swiperRef.current.swiper) {
                swiperRef.current.swiper.params.navigation.prevEl = '.custom-prev';
                swiperRef.current.swiper.params.navigation.nextEl = '.custom-next';
                swiperRef.current.swiper.navigation.init();
                swiperRef.current.swiper.navigation.update();
            }
        }, 1000);
    }, []);

    return (
        <Swiper ref={swiperRef}  {...config} className='mySwiper'>
            { 
            isLoading
              ? Array(3).fill(0).map((_, i) => <SwiperSlide key={i} > <CardPlaceholder index={i}  key={i} /> </SwiperSlide> )
              : data?.length > 0 ? 
                data?.map((e, i) => (
                <SwiperSlide key={e.id}  >
                    <div data-aos='zoom-in' data-aos-delay={`${i}00`} className='h-full pb-[80px] max-sm:pb-[50px] relative rounded-[30px] overflow-hidden w-full shadow-custom border-gray1 border-[1px]'>
                        <img className='w-full bg-primary1 max-sm:h-[220px] h-[250px] object-cover ' src={e?.venueGalleries?.[0]?.imgs[0] || '/assets/test-img/notfound.png'} alt='' />
                        <div className='p-[20px]'>
                            <Address_vesitor titleAddress={e?.name?.[locale]} location={`${e.property?.city.name} , ${e.property?.city?.country.name}`} titleVistor={t('visitors_count')} e={e} />
                            <Rate_price empty={3} fill={2} rateTitle={t('rating')} ratings={e?.ratings} priceTitle={t('price2')} priceValue={e?.price} />

                            {e?.list && (
                                <ul className='list flex flex-col gap-[10px]'>
                                    <div className='h2 font-[600]'>{t(e.list.head)}</div>
                                    {e.list.lis.map((listItem, index) => (
                                        <li className='flex items-center gap-[5px]' key={index}>
                                            <Image className='w-[25px] h-[25px]' src={listItem.value} alt={t(listItem.name)} width={25} height={25} />
                                            <div className='h4 text-secondry3'>{t(listItem.name)}</div>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <Button href={`/details-halls/${e.id}`} outline={true} classname='absolute bottom-[15px] left-[50%] translate-x-[-50%] w-[95%]' name={t("book_now")} />
                        </div>
                    </div>
                </SwiperSlide>
            )) :  <NotFound /> }

 {/* <button className="custom-prev2">Prev</button>
    <button className="custom-next2">Next</button> */}

        </Swiper>
    );
}
