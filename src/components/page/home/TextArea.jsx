import { useTranslations } from 'next-intl'
import React from 'react'

export default function TextArea({classname , title , desc}) {
	const t = useTranslations()

  return (
	<div className={`my-[100px] max-w-[900px] ${classname} `} >

		{title && <div data-aos="fade-up" className=" text-center text-secondry1s font-[700] mb-[10px] h1"> {title} </div> }
		{desc && <div data-aos="fade-up" className=" text-center mb-[40px] h4 text-secondry3 "> {desc} </div> }

		<div id='accessibility' data-aos="fade-up" className="h2 font-[700] mb-[10px] "> {t("accessibility")} </div>
		<div data-aos="fade-up" className="h3  text-secondry3 "> {t("accessibility_description")} </div>
		
		<div id='policies' data-aos="fade-up" className="h2 font-[700] mt-[40px] mb-[10px] "> {t("policies")} </div>
		<div data-aos="fade-up" className="h2 font-[700] mt-[20px] mb-[10px] "> {t("policy_privacy")} </div>
		<div data-aos="fade-up" className="h3  text-secondry3 "> {t("policy_privacy_description")} </div>


		<div data-aos="fade-up" className="h2 font-[700] mt-[40px] mb-[10px] "> {t("policy_terms_of_use")} </div>
		<div data-aos="fade-up" className="h3  text-secondry3 "> {t("policy_terms_of_use_description1")} </div>
		<div data-aos="fade-up" className="h3  text-secondry3 "> {t("policy_terms_of_use_description2")} </div>
		<div data-aos="fade-up" className="h3  text-secondry3 "> {t("policy_terms_of_use_description3")} </div>


		<div data-aos="fade-up" className="h2 font-[700] mt-[40px] mb-[10px] "> {t("policy_payment")} </div>
		<div data-aos="fade-up" className="h3  text-secondry3 "> {t("policy_payment_description")} </div>

		<div data-aos="fade-up" className="h2 font-[700] mt-[40px] mb-[10px] "> {t("policy_cancellation_refund")} </div>
		<div data-aos="fade-up" className="h3  text-secondry3 "> {t("policy_cancellation_refund_description")} </div>

		<div data-aos="fade-up" className="h2 font-[700] mt-[40px] mb-[10px] "> {t("policy_support")} </div>
		<div data-aos="fade-up" className="h3  text-secondry3 "> {t("policy_support_description")} </div>

	
	</div>
  )
}
