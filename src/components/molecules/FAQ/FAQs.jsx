'use client';

import NotFound from '@/components/atoms/NotFound';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useState } from 'react';

export default function FAQs({ unite, title, data, loading, cnTitle, cn }) {
    const t = useTranslations();
    const locale = useLocale();
    const [selected, setSelected] = useState(null);

    const toggleSection = index => {
        const currentlyOpenIndex = selected;
        setSelected(selected === index ? null : index);

        if (currentlyOpenIndex !== null) {
            const prevElement = document.getElementById(`content-${currentlyOpenIndex}`);
            if (prevElement) {
                prevElement.style.maxHeight = '0px';
            }
        }

        const newElement = document.getElementById(`content-${index}`);
        if (newElement) {
            newElement.style.maxHeight = selected !== index ? `${newElement.scrollHeight}px` : '0px';
        }
    };

    return (
        <div className={`py-14 min-h-[100px] bg-[#fdfdfd] ${cn} max-w-[900px] w-full`}>
            <div className='min-h-[100px] flex flex-col justify-center'>
                {title && (
                    <h1 data-aos='fade-up' className={`font-bold mb-[20px] ${cnTitle ? cnTitle : 'h1'} `}>
                        {' '}
                        {t(title)}{' '}
                    </h1>
                )}

                <div data-aos='fade-up' className='flex flex-col gap-[20px]'>
                    {loading ? (
                        Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className='animate-pulse flex items-center justify-between bg-gray-200 rounded-md max-sm:rounded-[10px] max-sm:px-[10px] px-[30px] py-6 shadow-blur'>
                                <div className='h-6 bg-gray-300 w-3/4 rounded'></div>
                                <div className='h-6 w-6 bg-gray-300 rounded-md'></div>
                            </div>
                        ))
                    ) : data?.length > 0 ? (

                        data.map((faq, index) => (
                            <div key={index} className={`rounded-[30px] max-sm:rounded-[10px] max-sm:px-[10px] px-[30px] shadow-blur border duration-300 ${selected === index ? 'border-gray-300' : 'border-transparent'}`}>
                                <button onClick={() => toggleSection(index)} className='w-full py-4 flex justify-between gap-[5px] items-center'>
                                    <div className='h3 rtl:text-right ltr:text-left font-semibold flex items-center gap-[15px]'>{faq.question?.[locale]}</div>
                                    <Image className={`${selected === index ? 'rotate-[90deg]' : 'rotate-[-90deg]'} max-sm:w-[20px] max-sm:h-[20px] duration-300`} src='/assets/prev.svg' alt='' width={30} height={30} />
                                </button>
                                <div id={`content-${index}`} className='overflow-hidden transition-all duration-300 ease-in-out' style={{ maxHeight: selected === index ? '500px' : '0px' }}>
                                    <div className='py-4 px-3 text-gray-600 dark:text-white '>{faq.answer?.[locale]}</div>
                                </div>
                            </div>
                        ))
                    ) : ( <NotFound title={t("notfoundquestion")} /> )}
                </div>
            </div>
        </div>
    );
}
