import Button from '@/components/atoms/button/Button'
import Input from '@/components/atoms/input/Input'
import Select from '@/components/atoms/select/Select'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import Calendar from "@/components/atoms/calendar/Calendar"
import { hookOccasion } from '@/hooks/hookOccasion'
import { hookCity } from '@/hooks/hookCity'
import { usePathname } from '@/navigation'

export default function Search({dataAos , clearData , loading  , register, errors , trigger , setValue, submit , watch}) {
	const {occasion  } = hookOccasion()
	const { cities  } = hookCity()
	const t = useTranslations()

	const pathname = usePathname()
	const [showClear , setshowClear ] = useState(false)
	useEffect(()=> {
		if(pathname != "/") setshowClear(true)
			else setshowClear(false)
	} ,[pathname])
	
  return (
	
	<div data-aos={dataAos} className=' max-xl:py-[40px] main-shadow grid grid-cols-[1fr,400px] flex-wrap max-xl:grid-cols-[90%] max-xl:justify-center  max-lg:rounded-[10px] max-lg:grid-cols-1 max-lg:px-[70px] max-lg:py-[20px] max-sm:!p-[20px] max-lg:gap-[40px] items-center justify-between gap-[20px] rounded-[100px]  w-full my-[50px] shadow-blur  min-h-[140px] bg-white ' >
		
		<div className='grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 items-center gap-[40px] max-lg:!p-0 ltr:xl:ml-[30px] rtl:xl:mr-[30px] ' >
			<Calendar  KEY="date"   cnInput={""}    error={errors?.date} setValue={setValue}  watch={watch} trigger={trigger}  place={t("date")} classname={"w-full !px-0 "}  />
			<Select  sendId={true}  KEY="city"      error={errors?.city} setValue={setValue}   watch={watch} trigger={trigger}  data={cities} place={t("city")}  icon={"/assets/location.svg"} />
			<Input     KEY="visitor"   error={errors?.visitor} register={register("visitor")} rounded={false} classname="!border-b-transparent " icon={"/assets/users.svg"} type={"number"}  place={t("count_vistor")} />
			<Select  sendId={true}  KEY="typeEvent" error={errors?.typeEvent} setValue={setValue} watch={watch} trigger={trigger} data={occasion} place={t("type_occasion")}  icon={"/assets/occasion.svg"} />

		</div>

		<div className='rtl:mr-auto rtl:ml-[30px] ltr:ml-auto ltr:mr-[30px] max-xl:!mx-auto max-xl:w-full flex flex-wrap items-center max-xl:justify-center gap-[10px]  ' > 
			<Button isLoading={loading} onClick={submit} name={t("search")} classname={"  md:max-w-fit max-md:!max-w-[150px] !px-[40px] "} /> 
			{ showClear &&  <Button  onClick={clearData} outline={true} name={t("clear")} classname={"md:max-w-fit !px-[30px] max-md:!w-[150px] hover:!bg-[#c63434] !border-[#c63434] !text-[#c63434] "} /> }

		</div>
	</div>
  )
}
