"use client"
import Button from '@/components/atoms/button/Button'
import Input from '@/components/atoms/input/Input'
import InputPhone from '@/components/atoms/input/InputPhone'
import TextArea from '@/components/atoms/input/TextArea'
import { ImgEmail, ImgPhone, ImgUser } from '@/constants/imgs'
import { hookContactUs } from '@/hooks/hookContactUs'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'

export default function page() {
	const t = useTranslations()
	const { register, errors , setValue, submit , loading } = hookContactUs()


  return (
	<div className='container py-[50px] ' >
		<div data-aos="fade-up" className="h1 text-center mt-[40px]  "> {t("contact_now")} </div>
		<div data-aos="fade-up" className="h4 text-center mt-[10px]   text-secondry3 font-[400]  "> {t("dont_hesitate")} </div>

		
		<div className={` max-md:grid-cols-1  max-w-[1000px] w-full mx-auto grid grid-cols-2 items-center gap-[50px] mt-[60px] `}>
			<div className=" max-md:mx-auto  flex flex-col gap-[25px] max-w-[500px] w-full  ">
				<Input dataAos="fade-up" KEY={"fullName"} register={register("fullName")} error={errors?.fullName}          cnInput="!border-[#E1E6EF] !border-[1px] "  icon={ImgUser}      type={"text"}    label={t("fullName")}    place={t("enterHallName")} />
				<Input dataAos="fade-up" KEY={"email"}    register={register("email")}    error={errors?.email}             cnInput="!border-[#E1E6EF] !border-[1px] "   icon={ImgEmail}    type={"email"}       label={t("email")}       place={t("emailPlaceholder")} />
				<InputPhone setValue={setValue} dataAos="fade-up" KEY={"phone"} register={register("phone")} error={errors?.phone} cnInput="!border-[#E1E6EF] !border-[1px] "   icon={ImgPhone}    type={"text"}    label={t("phoneNumber")}    place={t("enterNumber")} />
				<TextArea dataAos="fade-up" KEY={"message"} register={register("message")} error={errors?.message} cnInput="!border-[#E1E6EF] !border-[1px] "  type={"message"}    label={t("write_message")}    place={t("message_placeholder")} />
				<Button isLoading={loading} classname={"mt-[40px]"} name={t("send")} onClick={submit} dataAos={"fade-up"}  />
			</div>

			<Image  data-aos="fade-up" className=' max-md:order-[-1] max-md:h-fit w-full h-[400px] object-contain mx-auto '  src={"/assets/imgs/contact-us.png"} width={400} height={300} />
		</div>
	</div>
  )
}
