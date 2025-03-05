import React from 'react'
import Image from "next/image"
import { useTranslations } from 'next-intl'


export default function TextArea({ unite , place , dataAos , rounded=true , error , cnInput , classname , label , type , icon , KEY , register , cnLabel}) {
  const t = useTranslations()


	return (
	<div data-aos={dataAos} className={`${classname} flex flex-col  gap-[5px]  relative `} >
		{label && <label htmlFor={KEY} className={`h5 ${cnLabel}`} > {label} </label> }
		<div className={`border-b-[#BCBBBF]  w-full ${rounded ? "!rounded-[8px]" : "!rounded-[0px]"} overflow-hidden  border-b-[1px] relative  h-[150px]  ${cnInput} `} >
			<textarea className={`focus:border-primary1 p-[10px] h-full  ${rounded ? "!focus:border-[1px]" : "!focus:border-b-[1px]"} placeholder:text-secondry3 h5 w-full h-full outline-none  text-secondry2 `} {...register} id={KEY} placeholder={place} />
		</div>
		{error && <div className='error  ' > {t(error?.message)} </div>}
	</div>
  )
}
