"use client"
import { useRouter } from '@/navigation'
import Image from 'next/image'
import React from 'react'

export default function Button({ width , name , dataAos , rotate=true , disabled , onClick , icon , outline , showIcon , classname , href}) {

	const router = useRouter()

	const handleClciks = ()=>{
		onClick && onClick()
		href && router.push(href)
	}
  return (
	<div className={`${width}`} data-aos={dataAos} >
		<div   onClick={handleClciks} className={` ${classname} ${width} ${disabled == true && "pointer-events-none text-secondry3 bg-primary3 border-primary3 "} text-[14px] gap-[10px] ${outline && "bg-transparent  !text-primary1 hover:!text-white "} border-[2px] border-primary1 cursor-pointer hover:bg-primary2 duration-300 bg-primary1 min-h-[50px] max-sm:min-h-[40px]  text-white rounded-[40px] flex items-center justify-center text-center px-[20px]`} > 
			<span > {name}   </span>
			{showIcon && <Image className={`${rotate && "ltr:rotate-[180deg]"}`} src={icon || "/assets/arrow-right.svg"} alt='' width={20} height={20} />}
		</div>

	</div>
  )
}
