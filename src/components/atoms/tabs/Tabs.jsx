"use client"
import React, { useState } from 'react'
import Button from '../button/Button'
import { useTranslations } from 'next-intl'

export default function Tabs({ setindextab , data , classname , WithoutT}) {
	const t = useTranslations()

	const [currentValue , setcurrentValue] = useState(data?.[0]?.value)

	const handleValue = (value)=> {
		setcurrentValue(value)
		setindextab?.(value)
	}

  return (
	<div className={`flex max-sm:grid max-sm:grid-cols-3  items-center justify-center flex-wrap gap-[10px] my-[20px] ${classname} `} >
		{data?.map((e,i)=> <div key={i}  data-aos="fade-up" > <Button classname="max-sm:px-[10px]  max-md:!text-[10px]" key={i} onClick={()=>handleValue(e.value)} outline={currentValue !== e.value ? true : false }  name={WithoutT ? e.name : t(e.name)} /> </div>  )}
	</div>
  )
}
