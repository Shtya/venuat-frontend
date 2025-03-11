'use client';
import { useLocale, useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react'; // Import useState and useEffect
import Search from '../../molecules/search/Search';
import { hookSearch } from '@/hooks/hookSearch';

export default function Hero({ loading, data }) {
    const locale = useLocale();

    const t = useTranslations();
    const { loadingSubmit, register, errors, trigger, setValue, submit, watch, clearData } = hookSearch();

    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    console.log(data)

    return (
        <section className='relative min-h-screen flex items-center flex-col justify-center'>

             {/* ✅ Placeholder أثناء تحميل الفيديو */}
             {loading && (
                <div className='absolute inset-0 w-full h-full bg-gray-800 animate-pulse'></div>
            )}

            {/* ✅ عرض الفيديو عند انتهاء التحميل */}
            {!loading && hasMounted && data?.urlVideo && (
                <video
                    className='absolute inset-0 w-full h-full object-cover'
                    src={data.urlVideo || '/assets/hero.mp4'}
                    autoPlay
                    loop
                    muted
                    playsInline
                ></video>
            )}

            <div className='absolute inset-0 bg-black opacity-50'></div>

            <div className='container max-md:pt-[100px] md:pb-[150px] z-[10] min-h-[100vh] flex items-center flex-col justify-end gap-[10px]'>
                {loading ? (
                    <div data-aos="zoom-in" className='max-w-[500px] w-full h-[40px] border-gray-300 bg-gray-200 animate-pulse rounded-md'></div>
                ) : (
                    <div data-aos='fade-up' className='max-w-[900px] h0 text-center mb-[10px] max-md:mb-0 text-white'>
                        {data?.titleHome?.[locale] || t('luxury_wedding_halls_and_events')}
                    </div>
                )}

                {loading ? (
                    <div data-aos="zoom-in" className='max-w-[400px] w-full h-[25px] border-gray-300 bg-gray-200 animate-pulse rounded-md'></div>
                ) : (
                    <div data-aos='fade-up' className='h2 text-center text-white'>
                        {data?.secondTitleHome?.[locale] || t('unforgettable_wedding_experience')}
                    </div>
                )}

                
                <Search clearData={clearData} loading={loadingSubmit} register={register} errors={errors} trigger={trigger} setValue={setValue} submit={submit} watch={watch} dataAos='zoom-in' />
            </div>
        </section>
    );
}
