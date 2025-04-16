import Button from '@/components/atoms/button/Button'
import TextArea from '@/components/atoms/input/TextArea'
import { hookSendFaqs } from '@/hooks/hookSendFaqs'
import { useTranslations } from 'next-intl'
import React from 'react'

export default function AskSomeThing({id}) {
	const t = useTranslations()

	const { register , loading , errors , submit} = hookSendFaqs({id})

  return (
	<div className=' h-fit max-w-[400px] mx-auto shadow-sm border-[#E1E6EF] border-[1px] p-[20px] py-[60px]  rounded-[8px] ' >
		<div data-aos="fade-up" className="h1 mb-[5px] text-center "> {t("questionNotFound")} </div>
		<div data-aos="fade-up" className="h3 text-center text-secondry3  "> {t("dontWorry")} </div>

		<TextArea register={register("msg")}   error={errors?.msg}  dataAos={"fade-up"} cnLabel={" !h3 mt-[40px]"} cnInput={"  border-[1px] border-[#E1E6EF] "} classname={"mb-[40px]"} KEY="ask"  icon={"/assets/message.svg"} label={t("addYourQuestion")} place={t("writeYourQuestion")} />
		<Button checkAuth={true} onClick={submit} isLoading={loading} classname={"!h3"} name={t("send")} dataAos={"fade-up"} width={"max-w-full w-full "} outline={true} />
	</div>
  )
}
