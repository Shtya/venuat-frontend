import React from 'react'
import Image from "next/image"
import { useTranslations } from 'next-intl'


export default function Input({ unite , place , dataAos , rounded=true , error , cnInput , classname , label , type , icon , KEY , register , cnLabel}) {
  const t = useTranslations()


	return (
	<div data-aos={dataAos} className={`${classname} flex flex-col  gap-[5px]  relative `} >
		{label && <label htmlFor={KEY} className={`h5 ${cnLabel}`} > {label} </label> }
		<div className={`border-b-[#BCBBBF]  w-full ${rounded ? "!rounded-[8px]" : "!rounded-[0px]"} overflow-hidden  border-b-[1px] relative  h-[45px]  ${cnInput} `} >
			<input className={`${unite && "rtl:pl-[85px] ltr::pr-[85px] "} focus:border-primary1 ${rounded ? "!focus:border-[1px]" : "!focus:border-b-[1px]"} placeholder:text-secondry3 h5 w-full ${icon ? "rtl:pr-[40px] ltr:pl-[40px]" : "px-[10px]" }  h-full outline-none  text-secondry2 `} {...register} id={KEY} placeholder={place} type={type} />
			{icon && <Image className='absolute rtl:right-[10px] ltr:left-[10px] top-[50%] translate-y-[-50%] '  src={icon} alt="" width={20} height={20} /> }
			{unite && <span className='absolute text-[12px] max-sm:text-[10px]  font-semibold ltr:right-[10px] rtl:left-[10px] top-[50%] translate-y-[-50%] ' > {unite} </span> }

		</div>
		{error && <div className='error absolute  ' > {t(error?.message)} </div>}
	</div>
  )
}
