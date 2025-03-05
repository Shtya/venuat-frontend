'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

const PriceRangeSlider = ({setValue , min, max, loading }) => {
  const [values, setValues] = useState([min, max]);
  const t = useTranslations();
  useEffect(()=> {
    setValues([min,max])
  } , [loading])
  
    return (
        <div className='w-full flex flex-col items-center p-4 bg-white rounded-lg shadow-md'>
            <div className='h2 w-full mb-[20px] font-[700] mt-[30px] '> {t('price2')} </div>
            {loading ? (
                <div className='w-full h-[10px] bg-gray-300 animate-pulse rounded-[4px]'></div>
            ) : (
                <>
                    <RangeSlider
                        min={min}
                        max={max}
                        step={50}
                        value={values}
                        onInput={values => {
                            setValues(values);
                            setValue("price.minPrice" , values[0])
                            setValue("price.maxPrice" , values[1])
                        }}
                        className='w-full'
                    />

                    <div className=' ltr:flex-row-reverse flex justify-between w-full mt-3 text-sm font-semibold text-primary1 '>
                        <span>{ t("price" , {count : values[1]}) } </span>
                        <span>{ t("price" , {count : values[0]}) } </span>
                    </div>
                </>
            )}
        </div>
    );
};

export default PriceRangeSlider;
