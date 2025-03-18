"use client"
import FAQs from '@/components/molecules/FAQ/FAQs'
import TextArea from '@/components/page/home/TextArea'
import { FAQsData } from '@/Dummy/dummy'
import { hookSetting } from '@/hooks/hookSettings'
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'

export default function page() {
	const t = useTranslations()
	const locale = useLocale()

	const {data , loading} = hookSetting()
	

  return (
	<div className='container !max-w-[1000px] ' >
		<div data-aos="fade-up" className="h0 mt-[100px] text-center mb-[-20px]  "> {t("importantTermsAndConditions")} </div>
		<br/>
		<br/>
		{loading ? (
				<div>
					<div className="animate-pulse bg-gray-300 rounded-lg h-[20px] w-full mb-4"></div>
					<div className="animate-pulse bg-gray-300 rounded-lg h-[20px] w-full mb-4"></div>
					<div className="animate-pulse bg-gray-300 rounded-lg h-[20px] w-full mb-4"></div>
				</div>
			) : (
				<div dangerouslySetInnerHTML={{ __html: data?.settings?.termsAndCondition?.[locale] }}></div>
			)}
		<TextArea   policy={data?.settings?.policies} loading={loading} classname="max-w-[900px] mx-auto " />
	</div>
  )
}
