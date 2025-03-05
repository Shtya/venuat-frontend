'use client';
import React, { useEffect, useState } from 'react';
import Button from '../button/Button';
import { useLocale, useTranslations } from 'next-intl';
import TabsPlaceholder from '@/components/molecules/placeholder/TabsPlaceholder';

export default function TabsHome({ isLoading , setindextab, data, classname }) {
    const t = useTranslations();
	const locale = useLocale()

    const [currentValue, setcurrentValue] = useState();

    const handleValue = value => {
        setcurrentValue(value);
        setindextab?.(value);
    };

	useEffect(()=> {
		data && handleValue(data?.[0]?.id);
	} ,[data])

    return (
        <div className={`flex max-sm:grid max-sm:grid-cols-3  items-center justify-center max-w-[800px] w-full mx-auto flex-wrap gap-[10px] my-[20px] ${classname} `}>
            {isLoading
                ? Array(5).fill(0).map((_, i) => ( <TabsPlaceholder key={i} /> ))
                : data?.map((e, i) => (
                <div key={i} data-aos='zoom-out' data-aos-delay={`${i}00`} >
                    <Button classname='max-sm:px-[10px]  max-md:!text-[10px]' 
						key={i} 
						onClick={() => handleValue(e.id)} 
						outline={currentValue !== e.id ? true : false} 
						name={e.name[locale]} />
                </div>
            ))}
        </div>
    );
}
