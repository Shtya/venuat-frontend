import Button from '@/components/atoms/button/Button'
import Input from '@/components/atoms/input/Input'
import { ImgEmail, ImgPassword, ImgPhone, ImgUser } from '@/constants/imgs'
import { useTranslations } from 'next-intl'
import React from 'react'

export default function MyInformation() {
	const t = useTranslations()

  return (
	<div>
		<div data-aos="fade-up" className="h1 text-center mb-[50px] max-sm:mb-[20px] "> {t("editInfo")}  </div>
		<div className="grid grid-cols-2 max-md:grid-cols-1 gap-[30px] ">
			<Input dataAos="fade-up" cnInput="!border-secondry3 !border-[1px] " label={t("fullName")}  KEY={"name"} icon={ImgUser} type={"text"}    />
			<Input dataAos="fade-up" cnInput="!border-secondry3 !border-[1px] " label={t("phoneNumber")}  KEY={"phone"} icon={ImgPhone} type={"text"}   />
			<Input dataAos="fade-up" cnInput="!border-secondry3 !border-[1px] " label={t("email")}  KEY={"email"} icon={ImgEmail} type={"email"}   />
			<Input dataAos="fade-up" cnInput="!border-secondry3 !border-[1px] " label={t("currentPassword")}  KEY={"currentPassword"} icon={ImgPassword} type={"password"}   />
			<Input dataAos="fade-up" cnInput="!border-secondry3 !border-[1px] " label={t("newPassword")}  KEY={"newPassword"} icon={ImgPassword} type={"password"}   />
			<Input dataAos="fade-up" cnInput="!border-secondry3 !border-[1px] " label={t("confirmNewPassword")}  KEY={"confirmPassword"} icon={ImgPassword} type={"password"}   />
		</div>

		<Button dataAos="fade-up" classname="mt-[40px] max-w-[250px] mx-auto " name={t("saveData")}  />
	</div>
  )
}
