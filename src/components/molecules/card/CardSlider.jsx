'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
// import 'swiper/css/pagination';
import Image from 'next/image';
import Button from '../../atoms/button/Button';
import Starts from '../../atoms/start/Starts';
import { useTranslations } from 'next-intl';
import { ChevronLeftCircle } from 'lucide-react';
import Address_vesitor from '@/components/atoms/card/Address_vesitor';
import Rate_price from '@/components/atoms/card/Rate_price';

export default function CardSlider({ data }) {
  const t = useTranslations();

  return (
      
      <Swiper
      data-aos="fade-up" 
        modules={[Navigation, Pagination]}
        navigation={{
			prevEl: '.custom-prev',
			nextEl: '.custom-next',
		}}
        pagination={{ clickable: true }}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 1 },
          900: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className='mySwiper'>
        {data?.map((e, i) => (
          <SwiperSlide key={i} >
            <div className='h-full pb-[80px] max-sm:pb-[50px] relative rounded-[30px] overflow-hidden w-full shadow-custom border-gray1 border-[1px]'>
              <Image className='w-full bg-primary1 max-sm:max-h-[220px] max-h-[250px] object-cover' src={e.img} alt='' width={250} height={250} />
              <div className='p-[20px]'>

                    <Address_vesitor
                      titleAddress={t(e.head)}
                      location={t(e.address)}
                      titleVistor={t(e.countTitle)}
                      countOfVistor={t(e.countNumber.name , {count : e.countNumber.value})}
                      />

                    <Rate_price
                        empty={3}
                        fill={2}
                        rateTitle={t(e.rate.name)}
                        countOfRate={e.rate.value}
                        priceTitle={t(e.price)}
                        priceValue={t(e.priceValue.name , {count:e.priceValue.value})}
                    />
               

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

                <Button outline={e.btnOutline} classname='absolute bottom-[15px] left-[50%] translate-x-[-50%] w-[95%]' name={t(e.btn)} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
  );
}
