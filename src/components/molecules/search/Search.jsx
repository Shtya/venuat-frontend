import Button from '@/components/atoms/button/Button'
import Input from '@/components/atoms/input/Input'
import Select from '@/components/atoms/select/Select'
import { useTranslations } from 'next-intl'
import React from 'react'
import Calendar from "@/components/atoms/calendar/Calendar"
import {Cities, eventTypes} from "@/Dummy/dummy"
import { hookSearch } from '@/hooks/hookSearch'

export default function Search({dataAos}) {
	const t = useTranslations()
	const { register, errors, clearErrors, setError, getValues, setValue, submit , watch, reset , trigger } = hookSearch()

  return (
	
	<div data-aos={dataAos} className='main-shadow grid grid-cols-[1fr,400px] max-xl:grid-cols-[1fr,200px] max-lg:rounded-[10px] max-lg:grid-cols-1 max-lg:px-[70px] max-lg:py-[20px] max-sm:!p-[20px] max-lg:gap-[40px] items-center justify-between gap-[20px] rounded-[100px]  w-full my-[50px] shadow-blur  min-h-[140px] bg-white ' >
		
		<div className='grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 items-center gap-[40px] max-lg:!p-0 rtl:pr-[40px] ltr:pl-[40px] ' >
			<Calendar  KEY="date"      error={errors?.date} setValue={setValue}  watch={watch} trigger={trigger}  place={t("date")} classname={"w-full"}  />
			<Select    KEY="city"      error={errors?.city} setValue={setValue}   watch={watch} trigger={trigger}  data={Cities} place={t("city")}  icon={"/assets/location.svg"} />
			<Input     KEY="visitor"   error={errors?.visitor} register={register("visitor")} rounded={false} classname="!border-b-transparent " icon={"/assets/users.svg"} type={"number"}  place={t("count_vistor")} />
			<Select    KEY="typeEvent" error={errors?.typeEvent} setValue={setValue} watch={watch} trigger={trigger} data={eventTypes} place={t("type_occasion")}  icon={"/assets/occasion.svg"} />

		</div>

		<div className='rtl:mr-auto ltr:ml-auto max-lg:!mx-auto max-lg:w-full ' > 
			<Button onClick={submit} name={t("search")} classname={"rtl:ml-[40px]  ltr:mr-[40px] max-lg:!mx-auto max-lg:!max-w-[300px] max-w-fit !px-[60px] "} /> 
			</div>
	</div>
  )
}
