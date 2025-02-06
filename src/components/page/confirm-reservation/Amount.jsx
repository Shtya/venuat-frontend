import { ImgMunis, ImgPlus } from '@/constants/imgs'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useState } from 'react'

export default function Amount({style , name , price , quantity}) {
	const [count , setcount] =useState(quantity)
	const t = useTranslations()

	const handle = (type)=>{
		if(type == "+") setcount(Number(count) + 1)
		if(type == "-" && count > 0) setcount(count - 1)
	}

  return (
	<div className={style} data-aos="fade-up" >
		<div className='h3 font-medium text-primary1  ' > {name} </div>
		<div className=' flex items-center gap-[20px] justify-center ' >
			<button onClick={()=> handle("+")} className=' flex-none max-sm:w-[25px] max-sm:h-[25px] cursor-pointer hover:bg-primary3 duration-300 border-[1px] border-[#D9D9D9] w-[35px] h-[35px]  flex items-center justify-center rounded-[50%] ' > <Image className=' w-[15px] ' src={ImgPlus} alt='' width={20} height={20} /> </button>
			 <span className='max-sm:text-[12px]  ' > {count}  </span>
			<button onClick={()=> handle("-")} className=' flex-none max-sm:w-[25px] max-sm:h-[25px] cursor-pointer hover:bg-primary3 duration-300 border-[1px] border-[#D9D9D9] w-[35px] h-[35px]  flex items-center justify-center rounded-[50%] ' > <Image className=' w-[15px] ' src={ImgMunis} alt='' width={20} height={20} /> </button>
		</div>
		<div className='h3 font-medium text-primary1 max-w-[70px] text-nowrap w-full ltr:ml-auto rtl:mr-auto' > {t("price" , {count : (count * price)})} </div>
	</div>
  )
}
