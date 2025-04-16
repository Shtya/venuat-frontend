import React from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Link } from '../../navigation'


export default function Breadcrumbs({data , noTranslation}) {
	const t = useTranslations()

  return (
	<div className='flex items-center flex-wrap gap-y-[20px] gap-x-[10px] my-[50px] z-0 relative ' >
		<Image data-aos="zoom-out" className='object-cover  ' src="/assets/home.svg" alt='' width={20} height={20} />
		{
			data?.map((e,i)=> 
				<div  data-aos="zoom-out" key={i} className={`h2 cursor-pointer hover:text-primary2 text-primary1 duration-300 flex  items-center ${data?.length == i+1 ? "opacity-50 pointer-events-none " : ""} `} > 
					<Image className='ltr:rotate-[180deg] ' src="/assets/prev.svg" alt='' width={20} height={20} />
					<Link href={e.value} className=''  > {noTranslation ? e.name : t(e.name) } </Link>
				</div> )
		}
	</div>
  )
}
