import Button from '@/components/atoms/button/Button';
import Address_vesitor from '@/components/atoms/card/Address_vesitor';
import Rate_price from '@/components/atoms/card/Rate_price';
import SAR from '@/components/atoms/SAR';
import { Plus } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import React, { useState, useEffect } from 'react';

function formatTime(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return <span className='flex rtl:flex-row-reverse items-center gap-[5px] ' > 
        <span> {String(days).padStart(2, '0')} </span>
        :
        <span> {String(hours).padStart(2, '0')} </span>
        :
        <span> {String(minutes).padStart(2, '0')} </span>
        :
        <span> {String(seconds).padStart(2, '0')} </span>
    </span>
}

export default function InnerCard({ activeAos=true , e, i, data, btnName }) {
    const t = useTranslations();
    const locale = useLocale();
    //  const [timeLeft, setTimeLeft] = useState(0);

    // useEffect(() => {
    //     const endDate = new Date(e.end_date).getTime();

    //     const timer = setInterval(() => {
    //         const now = new Date().getTime();
    //         const distance = endDate - now;
    //         if (distance <= 0) {
    //             clearInterval(timer);
    //             setTimeLeft(0);
    //         } else {
    //             setTimeLeft(distance);
    //         }
    //     }, 1000);
    //     return () => clearInterval(timer);

    // }, [e.end_date]);

    
    return (
        <div {...(activeAos ? { 'data-aos': 'zoom-in', 'data-aos-delay': `${i}00` } : {})}  className='h-full pb-[80px] max-sm:pb-[50px] relative rounded-[20px] overflow-hidden w-full shadow-custom border-gray1 border-[1px]'>
            <div className='w-full relative bg-primary1 max-sm:max-h-[220px] max-h-[250px] overflow-hidden ' >
                <img className='w-full h-full object-cover' src={data?.venueGalleries?.[0]?.imgs[0] || '/assets/test-img/notfound.png'} alt='' />
                {/* <div className=' font-[700] tracking-[1px] text-white bg-primary1 bg-opacity-60 backdrop-blur-[4px] absolute ltr:right-[10px] rtl:left-[10px] bottom-0  rounded-[20px] px-[15px] py-[8px] mb-2 text-center'> {formatTime(timeLeft)} </div> */}
            </div>
            <div className='p-[20px]'>


                <Address_vesitor titleAddress={e?.package_name?.[locale]} />
                <Rate_price cn={'!my-[15px]'} priceTitle={t('price2')} priceValue={e?.package_price} />
                <Button href={`/reservation/${data?.id}?package=${e?.id}`} outline={true} classname='absolute bottom-[15px] left-[50%] translate-x-[-50%] w-[95%]' name={btnName || t('book_now')} />
            </div>
        </div>
    );
}
