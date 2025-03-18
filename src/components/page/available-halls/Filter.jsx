"use client";

import React, { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl';
import Checkbox from "@/components/atoms/checkbox/Checkbox"
import PriceRangeSlider from '@/components/atoms/timeSlider/TimeSlider';
import { hookOccasion } from '@/hooks/hookOccasion';


export default function Filter({venue , setValue , watch}) {
  const t = useTranslations()
  const locale = useLocale()
  const { occasion , loadingOccasion} = hookOccasion()


  return (
    <div className=' border-[1px] border-[#1E328B80] shadow-blur p-[20px] mt-[20px] rounded-[20px] ' >
      <div className="h2 font-[700]"> {t("filter")} </div>
      {/* <Checkbox loading={loadingOccasion} setValue={setValue} watch={watch}  KEY="category.highestRated" label={t("highest_rated_places")}  /> */}
      <Checkbox loading={loadingOccasion} setValue={setValue} watch={watch}  KEY="category.mostVisited" label={t("most_visited_places")}  />
      <Checkbox loading={loadingOccasion} setValue={setValue} watch={watch}  KEY="category.newest" label={t("new_places")}  />

      <div className="h2 mt-[30px] font-[700] "> {t("category")} </div>
      {
        loadingOccasion 
        ? Array(10).fill(0).map((_,i)=>  <div key={i} className='flex items-center gap-[10px] my-[20px] ' > 
          <div className='w-5 h-5 bg-gray-300 animate-pulse rounded-[4px]'></div>
          <div className='w-[100px] h-[10px] bg-gray-300 animate-pulse rounded-[4px]'></div> 
        </div> )
        : occasion?.map((e,i) => <Checkbox key={i} loading={loadingOccasion} setValue={setValue} watch={watch} KEY={`category.${e?.id}`} label={e?.name?.[locale]}  /> )
      }
      
      <PriceRangeSlider setValue={setValue} loading={loadingOccasion} min={venue?.minPriceval} max={venue?.maxPriceval}  />
      
    </div>
  )
}
