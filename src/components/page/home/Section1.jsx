"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Button from '../../atoms/button/Button'

export default function Section1() {
	const t = useTranslations()

	const bar = [
		{name : "summary" , value: "summary" } ,
		{name : "similar_halls" , value: "similar_halls" } ,
		{name : "accessibility" , value: "accessibility" } ,
		{name : "policies" , value: "policies" } ,
	]

	const [value , setvalue ] = useState({index:0 , value : ""})

	const handleTabs = (e , i , id)=>{
		setvalue({index:i , value:e.name})
		const ele =  document.getElementById(id)
		const offsetTop = ele.offsetTop;
		return ele && window.scrollTo({ top: offsetTop - 150, behavior: 'smooth' });
		// return ele && ele.scrollIntoView({ behavior: 'smooth' , block : "center"  })
	}
  return (
	<div className='h-fit' >

	<div className='grid grid-cols-[1fr,1fr] max-sm:grid-cols-1 gap-[20px]' >
	  <Image data-aos="fade-up" className='rounded-[30px] ' src={"/assets/test-img/5.png"} alt='' width={750} height={650} />
	  <div className='grid grid-cols-2 max-[400px]:grid-cols-1 gap-[20px] '>
		{
		  Array.from({length:4}).map((e,i)=> (<Image data-aos="fade-up" className='rounded-[30px] max-md:h-[200px] h-full w-full object-cover ' key={i} src={`/assets/test-img/${i+1}.png`} alt='' width={350} height={280} />))
		}
	  </div>
	</div>


	<div className="bar md:shadow-custom mt-[20px] flex flex-wrap gap-[20px] justify-between items-center border-b-[1px] border-b-primary3   ">
		<ul data-aos="fade-up"  className='flex flex-wrap items-center gap-[20px] max-md:gap-x-[10px] max-md:gap-y-[0px] h-full ' >
			{bar.map((e,i)=> <li onClick={ele => handleTabs(e , i , e.value) } className={` ${value.index == i ? "text-primary1 font-[700] border-b-primary1 " : "border-b-transparent"} border-b-[2px]   hover:text-primary1 duration-100 min-h-[80px] max-sm:min-h-[50px] max-sm:leading-[50px] leading-[80px] text-secondry1 cursor-pointer  `} key={i} > {t(e.name)} </li> )}	
		</ul>

		<Button dataAos={"fade-up"} href="/confirm-reservation" classname="min-w-[200px] mb-[10px] "  name={t("book_the_hall")} />
	</div>
	

</div>
  )
}
