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

  return (
	<div className='container' > 
		<FAQs data={data?.settings?.faqs} loading={loading} title={"faqstitle"} cn=" mx-auto " cnTitle="!h0 text-center mb-[50px]  " />
	</div>
  )
}
