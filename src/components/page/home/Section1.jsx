'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Button from '../../atoms/button/Button';
import ImageWithSkeleton from '@/components/atoms/ImageWithSkeleton';

export default function Section1({ venue, loading }) {
  const t = useTranslations();

  const bar = [
    { name: 'summary', value: 'summary' },
    { name: 'similar_halls', value: 'similar_halls' },
    { name: 'policies', value: 'accessibility' },
    { name: 'FAQs', value: 'policies' },
  ];

  const [value, setvalue] = useState({ index: 0, value: '' });

  const handleTabs = (e, i, id) => {
    setvalue({ index: i, value: e.name });
    const ele = document.getElementById(id);
    const offsetTop = ele?.offsetTop;
    return ele && window?.scrollTo({ top: offsetTop - 150, behavior: 'smooth' });
    // return ele && ele.scrollIntoView({ behavior: 'smooth' , block : "center"  })
  };

  const [imgs, setImgs] = useState();
  useEffect(() => {
    if (venue?.venueGalleries?.length > 0) {
      const allImgs = venue?.venueGalleries.flatMap(gallery => gallery.imgs);
      setImgs(allImgs);
    }
  }, [venue]);

  return (
    <div className='h-fit'>
      <div className='w-full grid grid-cols-2 max-md:grid-cols-1 gap-5'>
        {/* الصورة الرئيسية */}
        <ImageWithSkeleton enablePreview loading={loading} className='h-[500px] max-md:h-[300px] w-full object-cover rounded-xl shadow-sm' src={imgs?.[0]} alt='' width={750} height={500} />

        {/* الشبكة الفرعية */}
        <div className='grid grid-cols-2 max-[450px]:grid-cols-1 gap-5'>
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <ImageWithSkeleton enablePreview loading={loading} className='h-[240px] max-md:h-[180px] w-full object-cover rounded-xl shadow-sm' key={i} src={imgs?.[i + 1]} alt='' width={350} height={240} />
            ))}
        </div>
      </div>

      <div className='bar md:shadow-custom mt-[20px] flex flex-wrap gap-[20px] justify-between items-center border-b-[1px] border-b-primary3   '>
        <ul data-aos='fade-up' className='flex flex-wrap items-center gap-[20px] max-md:gap-x-[10px] max-md:gap-y-[0px] h-full '>
          {bar.map((e, i) => (
            <li onClick={ele => handleTabs(e, i, e.value)} className={` ${value.index == i ? 'text-primary1 font-[700] border-b-primary1 ' : 'border-b-transparent'} border-b-[2px]   hover:text-primary1 duration-100 min-h-[80px] max-sm:min-h-[50px] max-sm:leading-[50px] leading-[80px] text-secondry1 cursor-pointer  `} key={i}>
              {e.name == 'FAQs' ? 'FAQs' : t(e.name)}
            </li>
          ))}
        </ul>

        <Button dataAos={'fade-up'} href={`/reservation/${venue?.id}`} classname='min-w-[200px] mb-[10px] ' name={t('book_the_hall')} />
      </div>
    </div>
  );
}
