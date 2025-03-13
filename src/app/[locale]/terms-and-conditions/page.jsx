"use client"
import FAQs from '@/components/molecules/FAQ/FAQs'
import TextArea from '@/components/page/home/TextArea'
import { FAQsData } from '@/Dummy/dummy'
import { hookSetting } from '@/hooks/hookSettings'
import { useTranslations } from 'next-intl'
import React from 'react'

export default function page() {
	const t = useTranslations()

	const {data , loading} = hookSetting()

	console.log(data)


  return (
	<div className='container' >
		<div data-aos="fade-up" className="h0 mt-[100px] text-center mb-[-20px]  "> {t("importantTermsAndConditions")} </div>
		<TextArea  policy={data?.settings?.policies} loading={loading} classname="max-w-[900px] mx-auto " />
		<FAQs data={data?.settings?.faqs} loading={loading} title={"faqstitle"} cn=" mx-auto " cnTitle="!h0 text-center mb-[50px]  " />
	</div>
  )
}
