import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Starts from '@/components/atoms/start/Starts';
import { LocateIcon, LocateOffIcon, MapPin } from 'lucide-react';
import Link from 'next/link';
import CountainerStarts from '@/components/atoms/start/CountainerStarts';
import NotFound from '@/components/atoms/NotFound';

export default function CardGrid2_1({ isLoading, data }) {
    const t = useTranslations();
    const locale = useLocale();

    return (
        <div className='grid grid-cols-2 gap-[20px] max-lg:grid-cols-1'>
            {isLoading
                ? Array.from({ length: 3 }).map((_, i) => <div key={i} className={`${i === 0 ? 'lg:row-span-2 h-full' : ''} flex max-sm:items-end w-full relative min-h-[330px] rounded-[25px] overflow-hidden bg-gray-300 animate-pulse`} />)
            : data?.length > 0 ? 
                data?.slice(0, 3)?.map((e, i) => (
                      <Link  data-aos='zoom-in'  href={`/details-halls/${e.id}`}  key={e.id} className={`${i === 0 ? 'lg:row-span-2 h-full' : ''} group flex max-sm:items-end w-full relative min-h-[330px] rounded-[25px] overflow-hidden`}>
                          <img className='cursor-pointer group-hover:opacity-90 group-hover:scale-[1.05] group-hover:rotate-[.5deg] ease-in-out duration-500 absolute object-cover inset-0 w-full h-full' src={e?.venueGalleries?.[0]?.imgs[0] || '/assets/test-img/notfound.png'} alt='' />

                          <div className='absolute inset-0 bg-black opacity-10'></div>
                          <div className='h3 absolute top-[5px] right-[5px] text-primary1 bg-primary3 px-[30px] rounded-[23px] p-[10px]'>{e?.occasion?.name?.[locale]}</div>

                          <div className='h-full max-sm:h-fit w-full p-[30px] grid grid-cols-[1fr,1fr] max-sm:grid-cols-1 items-end gap-[10px] text-white relative'>
                              <div className='row sm:h-full max-sm:items-center flex flex-col justify-end'>
                                  <div className='h2 max-lg:text-[18px] text-white font-medium mb-[10px]'>{e?.name?.[locale]}</div>

                                  <div className='flex items-center gap-[5px]'>
                                      <MapPin />
                                      <div className='h4'>{`${e.property?.city.name} , ${e.property?.city?.country.name}`}</div>
                                  </div>
                              </div>

                              <div className='flex flex-col max-sm:items-center justify-end items-end sm:h-full'>
                                  <CountainerStarts ratings={e.ratings} />

                                  <div className='flex items-center gap-[10px] mt-[10px]'>
                                      <div className='h2'>{t('price2')}</div>
                                      <div className='h2 mt-[5px] text-white'>{t('price', { count: e.price })}</div>
                                  </div>
                              </div>
                          </div>
                      </Link>
                  )  ): <NotFound />}
        </div>
    );
}
