import FAQs from '@/components/molecules/FAQ/FAQs'
import TextArea from '@/components/page/home/TextArea'
import { FAQsData } from '@/Dummy/dummy'
import { useTranslations } from 'next-intl'
import React from 'react'

export default function page() {
	const t = useTranslations()


  return (
	<div className='container' >
		<div data-aos="fade-up" className="h0 mt-[100px] text-center mb-[-20px]  "> {t("importantTermsAndConditions")} </div>
		<TextArea classname="max-w-[900px] mx-auto " />
		<FAQs data={FAQsData} cn=" mx-auto " cnTitle="!h0 text-center mb-[50px]  " />
	</div>
  )
}
