import Button from '@/components/atoms/button/Button'
import Input from '@/components/atoms/input/Input'
import { ImgEmail, ImgPassword, ImgPhone, ImgUser } from '@/constants/imgs'
import { hookUser } from '@/hooks/hookUser'
import { ChevronsDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'

export default function MyInformation({loadingInfo, user , loadingPassword, register , SubmitStep ,errors ,getValues ,setValue}) {
	const t = useTranslations()
	const [show , setShow] = useState(false)

	useEffect(()=> {
		if(user){
			setValue("full_name" , user?.full_name)
			setValue("phone_number" , user?.phone)
		}
	} ,[user])

  return (
	<div>
		<div data-aos="fade-up" className="h1 text-center mb-[50px] max-sm:mb-[20px] "> {t("editInfo")}  </div>
		<div className="grid grid-cols-2 max-md:grid-cols-1 gap-[30px] ">
			<Input register={register("full_name")}  dataAos="fade-up" cnInput="!border-secondry3 !border-[1px] " label={t("fullName")}  KEY={"name"} icon={ImgUser} type={"text"}    />
			<Input register={register("phone_number")}   dataAos="fade-up" cnInput="!border-secondry3 !border-[1px] " label={t("phoneNumber")}  KEY={"phone"} icon={ImgPhone} type={"text"}   />

			<div className='col-span-2 ' >
				<p data-aos="fade-up" onClick={()=> setShow(!show) }  className=' pt-[10px]  text-primary1 font-[600] h5  cursor-pointer hover:text-opacity-70 duration-300 flex items-center gap-[10px]  ' > {t("changePassword")}  <ChevronsDown size={16} className=''  />  </p>
				
				<div className={`grid grid-cols-2 gap-[30px] ${show ? "max-h-[1000px] opacity-100 py-[40px] " : " max-h-0 opacity-0 "} overflow-auto duration-500 ease-in-out transition-all `} >
					<Input register={register("currentPassword")}  error={errors?.currentPassword}  dataAos="fade-up" cnInput="!border-secondry3 !border-[1px] " label={t("currentPassword")}  KEY={"currentPassword"} icon={ImgPassword} type={"password"}   />
					<Input register={register("password")}  error={errors?.password}  dataAos="fade-up" cnInput="!border-secondry3 !border-[1px] " label={t("newPassword")}  KEY={"newPassword"} icon={ImgPassword} type={"password"}   />
					<Input register={register("confirmPassword")}  error={errors?.confirmPassword}  dataAos="fade-up" cnInput="!border-secondry3 !border-[1px] " label={t("confirmNewPassword")}  KEY={"confirmPassword"} icon={ImgPassword} type={"password"}   />
					
					<Button isLoading={loadingPassword} onClick={() => SubmitStep("password")} width={"col-span-2"} dataAos="fade-up" classname="  max-w-[250px] " name={t("changePassword")}  />
				</div>
			</div>
		</div>

		<Button onClick={() => SubmitStep("info")} isLoading={loadingInfo} dataAos="fade-up" classname="  mt-[40px] max-w-[250px] mx-auto " name={t("saveData")}  />
	</div>
  )
}
