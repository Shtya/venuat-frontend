import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import SAR from '../SAR';
import { useTranslations } from 'next-intl';

const RadioDate = ({ name, options , changeListen , selected, onChange , checkIn , checkOut , setDisabled }) => {
    const t = useTranslations()

    const isAvailable = (bookedDates, currentDate) => {
        return  bookedDates && !bookedDates.includes(currentDate);
    };

    useEffect(() => {
        const nextAvailableOption = options.find(option => isAvailable(option?.booked_dates && option?.booked_dates, option.date));
        setDisabled(nextAvailableOption == undefined ? true : false)

        if (!selected && nextAvailableOption) {
            onChange(nextAvailableOption.value);
        }
    }, [options, selected , changeListen , onChange , checkIn , checkOut ]);

    const allBooked = options.every(option => option?.booked_dates && option?.booked_dates.includes(option.date));
    if (allBooked) {
        return <span className='  absolute top-[-10px] rtl:left-0 ltr:right-0  px-4 py-1 text-xs font-normal text-gray-800 bg-gray-200 rounded-full border border-gray-300'> {t("not-availabel")} </span>
    }

    

    return (
        <div className='w-full'>
            <div className={`  grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[20px]`}>
                {options.map(option => (
                    <label key={option.value} className={clsx('flex w-full items-center gap-[10px] justify-between p-3 rounded-[6px] border cursor-pointer transition', selected === option.value ? 'border-primary bg-primary1' : 'border-[#646369] hover:bg-gray-50', isAvailable(option.booked_dates, option.date) ? '' : 'cursor-not-allowed pointer-events-none opacity-30')}>
                        <span className={clsx('text-sm font-medium flex items-center gap-1', selected === option.value ? 'text-white' : 'text-gray-800')}>
                            {option.label}
                            <span className='rtl:mr-[10px] ltr:ml-[10px] flex items-center gap-1'>
                                <SAR price={option.price} cnIcon={`w-[16px] h-[16px]`} cn={`${selected === option.value ? ' text-white fill-white' : ''}`} cnAll={'text-sm'} />
                            </span>
                        </span>
                        <span className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${selected === option.value ? ' border-white' : 'border-[#646369]'}`}>{selected === option.value && <span className='w-3 h-3 rounded-full bg-white' />}</span>
                        <input type='radio' name={name} value={option.value} checked={selected === option.value} onChange={() => onChange(option.value)} className='hidden' disabled={!isAvailable(option.booked_dates, option.value)} />
                    </label>
                ))}
            </div>
            
        </div>
    );
};

export default RadioDate;
