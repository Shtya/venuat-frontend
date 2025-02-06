"use client"
import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Starts from "../../atoms/start/Starts"
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('@/components/molecules/Map'), {  ssr: false });


export default function Section2() {
	const t = useTranslations()

	const data = [ 
		{value : "premium_experience" , name : "premiumExperience"},
		{value : "variety_of_activities" , name : "varietyOfActivities"},
		{value : "easy_access_to_location" , name : "easyAccessToLocation"},
	]

  return (
	<div id='summary' className='grid grid-cols-[1fr,600px]   max-lg:grid-cols-2 max-md:grid-cols-1 gap-[50px] max-md:gap-[10pxs]  my-[100px] ' >

		<div className='flex flex-col ' >

			<div data-aos="fade-up" className="row grid grid-cols-2 max-xl:grid-cols-1 ">
					<div className="box">
						<div className="h1 font-[700] "> {t("car_hall_in_jeddah")} </div>
						<div className='flex items-center gap-[15px] mt-[10px] ' >
							<span className='h2 font-[500] ' > {t("reviews_count")} </span>
							<Starts countFill={4} countEmpty={1} />
							<span className='h4' > 4.0/5 </span>
						</div>
					</div>
					<div className="box max-xl:mt-[10px] ">
						<div className="h1"> {t("hall_price")} </div>
						<div className='flex items-center gap-[5px] xl:mt-[10px] ' >
							<span className='h2 text-primary1 font-[700] ' > {t("price" , {count : 320})} </span>
						</div>
					</div>
			</div>

			<ul data-aos="fade-up" className="row grid grid-cols-[100px,100px,100px] gap-[10px] items-center mt-[30px] ">
				{data.map((e,i)=> 
					<li className={` flex flex-col items-center justify-start h-full duration-100  text-primary1 cursor-pointer  `} key={i} > 
						<Image className='' src={`/assets/${e.value}.svg`} alt='' width={75} height={75} />
						<div className="h4 text-center "> {t(e.name)}  </div>
					</li> )}	
			</ul>

			<div data-aos="fade-up" className="row mt-[30px] ">
				<div className="h1"> {t("brief_details")} </div>
				<div className="h3 text-secondry3 "> {t("car_hall_description")} </div>
			</div>

		</div>

		<div data-aos="fade-up">
			<div className="h1 font-[700] mb-[20px] "> {t("where_in_jeddah")} </div>
			<Map center={[21.2854, 39.2376]} zoom={13} />
		</div>

	</div>
  )
}
