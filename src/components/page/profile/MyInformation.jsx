import Button from '@/components/atoms/button/Button'
import Input from '@/components/atoms/input/Input'
import {  ImgPassword, ImgPhone, ImgUser } from '@/constants/imgs'
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
	<div className="w-full mx-auto px-4">
  {/* Header */}
  <div data-aos="fade-up" className="text-center mb-12 max-sm:mb-8">
    <h1 className="text-3xl font-bold text-gray-800">{t("editInfo")}</h1>
  </div>

  {/* Main Form */}
  <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Name Field */}
      <div data-aos="fade-up" data-aos-delay="100">
        <Input
          register={register("full_name")}
          cnInput="border-gray-300 focus:border-primary1 focus:ring-1 focus:ring-primary1"
          label={t("fullName")}
          KEY={"name"}
          icon={ImgUser}
          type={"text"}
        />
      </div>

      {/* Phone Field */}
      <div data-aos="fade-up" data-aos-delay="150">
        <Input
          register={register("phone_number")}
          cnInput="border-gray-300 focus:border-primary1 focus:ring-1 focus:ring-primary1"
          label={t("phoneNumber")}
          KEY={"phone"}
          icon={ImgPhone}
          type={"text"}
        />
      </div>

      {/* Password Section */}
      <div className="col-span-full">
        <div 
          onClick={() => setShow(!show)}
          className="flex items-center gap-2 py-3 text-primary1 font-semibold cursor-pointer hover:text-primary1/80 transition-colors"
        >
          <span>{t("changePassword")}</span>
          <ChevronsDown 
            size={18} 
            className={`transition-transform duration-300 ${show ? "rotate-180" : ""}`}
          />
        </div>

        {/* Password Fields */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden transition-all duration-500 ease-in-out ${
          show ? "max-h-[500px] opacity-100 py-4" : "max-h-0 opacity-0"
        }`}>
          <div data-aos="fade-up" data-aos-delay="200">
            <Input
              register={register("currentPassword")}
              error={errors?.currentPassword}
              cnInput="border-gray-300 focus:border-primary1 focus:ring-1 focus:ring-primary1"
              label={t("currentPassword")}
              KEY={"currentPassword"}
              icon={ImgPassword}
              type={"password"}
            />
          </div>
          
          <div data-aos="fade-up" data-aos-delay="250">
            <Input
              register={register("password")}
              error={errors?.password}
              cnInput="border-gray-300 focus:border-primary1 focus:ring-1 focus:ring-primary1"
              label={t("newPassword")}
              KEY={"newPassword"}
              icon={ImgPassword}
              type={"password"}
            />
          </div>
          
          <div data-aos="fade-up" data-aos-delay="300" className="md:col-span-2">
            <Input
              register={register("confirmPassword")}
              error={errors?.confirmPassword}
              cnInput="border-gray-300 focus:border-primary1 focus:ring-1 focus:ring-primary1"
              label={t("confirmNewPassword")}
              KEY={"confirmPassword"}
              icon={ImgPassword}
              type={"password"}
            />
          </div>

          <div data-aos="fade-up" data-aos-delay="350" className="md:col-span-2">
            <Button
              isLoading={loadingPassword}
              onClick={() => SubmitStep("password")}
              width="full"
              classname="max-w-xs mx-auto"
              name={t("changePassword")}
            />
          </div>
        </div>
      </div>
    </div>

    {/* Save Button */}
    <div data-aos="fade-up" data-aos-delay="400" className="mt-10 text-center">
      <Button
        onClick={() => SubmitStep("info")}
        isLoading={loadingInfo}
        classname="max-w-xs w-full"
        name={t("saveData")}
      />
    </div>
  </div>
</div>
  )
}
