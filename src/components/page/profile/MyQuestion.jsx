import Tabs from '@/components/atoms/tabs/Tabs'
import FAQs from '@/components/molecules/FAQ/FAQs'
import { FAQsData, tabsHome } from '@/Dummy/dummy'
import { useTranslations } from 'next-intl'
import React from 'react'

export default function MyQuestion() {
	const t = useTranslations()

  return (
	<div>
		<div data-aos="fade-up" className="h1 text-center "> {t("sent_questions")} </div>
		<div data-aos="fade-up" className="h3 text-center  text-secondry3 "> {t("Halls")} </div>
		<div className='max-w-[700px] w-full mx-auto my-[30px] !mb-[0px] ' > <Tabs WithoutT={true} data={t.raw("facility_names")}  /> </div>


		<FAQs unite={t("shortcutQuestion")} data={t.raw("faq_list")} cn={"!my-[0px] mx-auto "} cnTitle={"hidden"} />
	</div>
  )
}
