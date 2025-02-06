import Button from '@/components/atoms/button/Button'
import TextArea from '@/components/atoms/input/TextArea'
import { useTranslations } from 'next-intl'
import React from 'react'

export default function AskSomeThing() {
	const t = useTranslations()

  return (
	<div className='shadow-sm border-[#E1E6EF] border-[1px] p-[20px] py-[60px]  rounded-[8px] ' >
		<div data-aos="fade-up" className="h1 mb-[5px] text-center "> {t("questionNotFound")} </div>
		<div data-aos="fade-up" className="h3 text-center text-secondry3  "> {t("dontWorry")} </div>

		<TextArea dataAos={"fade-up"} cnLabel={" !h3 mt-[40px]"} cnInput={" mb-[40px] border-[1px] border-[#E1E6EF] "} KEY="ask"  icon={"/assets/message.svg"} label={t("addYourQuestion")} place={t("writeYourQuestion")} />
		<Button classname={"!h3"} name={t("send")} dataAos={"fade-up"} width={"max-w-full w-full "} outline={true} />
	</div>
  )
}
