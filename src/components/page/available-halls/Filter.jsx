"use client";

import React from 'react'
import { useLocale, useTranslations } from 'next-intl';
import Checkbox from "@/components/atoms/checkbox/Checkbox"
import {Cities, eventTypes} from "@/Dummy/dummy"
import TimeSlider from "@/components/atoms/timeSlider/TimeSlider"

export default function Filter() {
  const t = useTranslations()
  const locale = useLocale()


  return (
    <div className=' border-[1px] border-[#1E328B80] shadow-blur p-[20px] mt-[20px] rounded-[20px] ' >
      <div className="h2"> {t("filter")} </div>
      <Checkbox KEY="most_requested_places" label={t("most_requested_places")}  />
      <Checkbox KEY="highest_rated_places" label={t("highest_rated_places")}  />
      <Checkbox KEY="most_visited_places" label={t("most_visited_places")}  />
      <Checkbox KEY="new_places" label={t("new_places")}  />
      <Checkbox KEY="discounts_and_offers" label={t("discounts_and_offers")}  />

      <div className="h2 mt-[30px] "> {t("category")} </div>
      { eventTypes?.map((e,i)=> <Checkbox key={i} KEY={e?.value} label={e?.[`name_${locale}`]}  /> ) }
      
      {/* <TimeSlider /> */}
      
    </div>
  )
}
