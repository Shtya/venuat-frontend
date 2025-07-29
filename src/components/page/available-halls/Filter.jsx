'use client';

import React, { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Checkbox from '@/components/atoms/checkbox/Checkbox';
import PriceRangeSlider from '@/components/atoms/timeSlider/TimeSlider';
import { hookOccasion } from '@/hooks/hookOccasion';
import RadioButton from '@/components/atoms/radio/RadioButton';
import Radio from '@/components/atoms/radio/Radio';
import RadioLabel from '@/components/atoms/radio/RadioLabel';
import { Controller } from 'react-hook-form';

export default function Filter({ control, venue, setValue, watch }) {
  const t = useTranslations();
  const locale = useLocale();
  const { occasion, loadingOccasion } = hookOccasion();
  const selectedValue = watch('category');

  return (
    <div className=" border-[1px] border-[#1E328B80] shadow-blur p-[20px] mt-[20px] rounded-[20px] ">
      <div className="h2 font-[700]"> {t('filter')} </div>
      <Controller control={control} name={`category`} render={() => <RadioButton cn="my-2" name="category" value={3000} label={t('most_visited_places')} checked={selectedValue === 3000} onChange={() => setValue(`category`, 3000)} />} />
      <Controller control={control} name={`category`} render={() => <RadioButton cn="my-2" name="category" value={3001} label={t('new_places')} checked={selectedValue === 3001} onChange={() => setValue(`category`, 3001)} />} />

      {/* <Checkbox cn={"!my-2"} loading={loadingOccasion} setValue={setValue} watch={watch} KEY="category.mostVisited" label={t('most_visited_places')} />
      <Checkbox cn={"!my-2"} loading={loadingOccasion} setValue={setValue} watch={watch} KEY="category.newest" label={t('new_places')} /> */}

      <div className="h2 mt-3 font-[700] mb-3 "> {t('category')} </div>

      {loadingOccasion ? (
        Array(10)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex items-center gap-[10px] my-[20px] ">
              <div className="w-5 h-5 bg-gray-300 animate-pulse rounded-[4px]"></div>
              <div className="w-[100px] h-[10px] bg-gray-300 animate-pulse rounded-[4px]"></div>
            </div>
          ))
      ) : (
        // : occasion?.map((e, i) => <Checkbox key={i} loading={loadingOccasion} setValue={setValue} watch={watch} KEY={`category.${e?.id}`} label={e?.name?.[locale]} />)}
        <div className='flex flex-col gap-2 ' >
          {occasion?.map((e, i) => (
            <Controller key={i} control={control} name={`category`} render={({ field }) => <RadioButton name="category" value={e?.id} label={e?.name?.[locale]} checked={selectedValue === e?.id} onChange={() => setValue(`category`, e?.id)} />} />
          ))}{' '}
        </div>
      )}

      <PriceRangeSlider setValue={setValue} loading={loadingOccasion} min={venue?.minPriceval} max={venue?.maxPriceval} />
    </div>
  );
}
