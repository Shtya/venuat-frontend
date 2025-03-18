import { useTranslations } from 'next-intl'
import React from 'react'
import { Link } from '../../navigation'
import Image from 'next/image'
import Input from "../../components/atoms/input/Input"
import Button from './button/Button'
import { TermsAndConditions } from '@/constants/links'
import { hookSubscribe } from '@/hooks/hookSubscribe'

export default function Footer() {
	const t = useTranslations()
	const { register, loading , errors , trigger , clearErrors, setError, getValues, setValue, submit , watch, reset } = hookSubscribe()

const pages = [
	{name : "home" , value : "/"},
	{name : "available_halls" , value : "/available-halls"},
	// {name : "exhibitions_and_events" , value : "/exhibitions-and-events"},
	// {name : "customer_reviews" , value : "/customer-reviews"},
	{name : "login" , value : "/sign-in"},
	{name : "contact_us" , value : "/contact-us"},
  ]
const files = [
	{name : "data_privacy" , value : "/data-privacy"},
	{name : "terms_and_conditions" , value : TermsAndConditions},
	{name : "necessary_laws" , value : "/necessary-laws"},
	{name : "faqstitle" , value : "/faqs"},
	// {name : "platform_documents" , value : "/platform-documents"},
  ]


  return (
	<div className=' footer mt-[50px] py-[40px]  bg-[#fbfbff] border-t-gray1 border-t-[1px]  ' >
		<div className="container grid grid-cols-[500px,auto,auto] max-lg:grid-cols-[350px,1fr,1fr] max-md:grid-cols-2 max-sm:grid-cols-1 gap-[40px] ">

			<div className="form  max-md:col-span-2 max-sm:col-span-1  w-fulls bg-white p-[20px] relative shadow-blur rounded-[20px] overflow-hidden ">
				<Image className=' max-sm:hidden  absolute ltr:scale-x-[-1] ltr:right-[-10px] rtl:left-[-10px] top-0 w-[70px] h-[70px] '  src="/assets/start-top.svg" alt='' width={190} height={100} />
				<Image className=' max-sm:hidden  absolute ltr:scale-x-[-1] ltr:right-[-10px] rtl:left-[-10px] bottom-0 w-[70px] h-[70px] '  src="/assets/start-bottom.svg" alt='' width={190} height={100} />


				<Image className=' max-sm:mx-auto max-sm:w-[120px] ' src="/assets/logo.svg" alt='' width={150} height={100} />
				<div className="h2 max-sm:text-center my-[10px] font-semibold ">  {t("dont_miss_offers")} </div>
				<div className="h3 max-sm:text-center my-[10px] text-secondry3 font-medium">  {t("dont_worry_offers")} </div>
				<Input  error={errors?.subscribe} register={register("subscribe")} cnInput={"!rounded-none"} classname={"w-[100%]"}  KEY={"subscribe"}  icon={"/assets/email.svg"} type={"text"}  place={t("enter_email")} />
				<Button onClick={submit} isLoading={loading} classname={" max-sm:max-w-full mt-[30px] max-w-fit px-[40px] "} name={t("send")}  />
			</div>

			<ul className='flex flex-col gap-[10px] ' >
				<div className="h2 font-bold "> {t("pages")} </div>
				{pages.map((e,i)=> <Link className='  w-fit h3 font-normal hover:ltr:translate-x-[10px] hover:rtl:translate-x-[-10px] hover:text-primary1 duration-300 ' key={i} href={e.value} > {t(e.name)} </Link>)}
			</ul>

			<ul className='flex flex-col gap-[10px] ' >
				<div className="h2 font-bold "> {t("platform_profiles")} </div>
				{files.map((e,i)=> <Link className='h3  w-fit font-normal hover:ltr:translate-x-[10px] hover:rtl:translate-x-[-10px] hover:text-primary1 duration-300 ' key={i} href={e.value} > {t(e.name)} </Link>)}
			</ul>

		</div>
	</div>
  )
}
