"use client"
import Button from '@/components/atoms/button/Button'
import Checkbox from '@/components/atoms/checkbox/Checkbox'
import Input from '@/components/atoms/input/Input'
import LayoutAuth from '@/components/molecules/layout/LayoutAuth'
import { login } from '@/config/Axios'
import { ImgEmail,ImgPassword } from '@/constants/imgs'
import { ForgetPassword, SignUp } from '@/constants/links'
import { hookSignIn } from '@/hooks/hookSignIn'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'

export default function page() {
	const t = useTranslations()
	const { register, errors , loading , trigger , clearErrors, setError, getValues, setValue, submit , watch, reset } = hookSignIn()


  return ( <LayoutAuth >
				<div className='max-w-[400px] w-full mx-auto max-md:mt-[0] ' >
					<div data-aos="fade-up" className="h1 font-semibold  text-center "> {t("login")} </div>
					<div className="flex items-center justify-center gap-[5px] my-[20px] ">
						<span data-aos="fade-up" className='h3 text-secondry3  ' > {t("noAccount")} </span>
						<Link data-aos="fade-up" href={"/sign-up/choose-type"} className='h4 text-primary1 underline cursor-pointer  ' > {t("createAccount")} </Link>
					</div>

					<Input dataAos="fade-up" KEY={"email"} register={register("email")} error={errors?.email} cnInput="!border-[#E1E6EF] !border-[1px] " classname="mt-[60px] max-md:mt-[20px] "      icon={ImgEmail}    type={"email"}    label={t("email")}    place={t("emailPlaceholder")} />
					<Input dataAos="fade-up" KEY={"password"} register={register("password")} error={errors?.password} cnInput="!border-[#E1E6EF] !border-[1px] " classname="mt-[20px] "   icon={ImgPassword} type={"password"} label={t("password")} place={t("passwordPlaceholder")} />
				
					<div data-aos="fade-up" className='flex items-center justify-between mt-[20px] max-sm:flex-wrap ' >
						<Checkbox setValue={setValue} KEY="REMEMBER" label={t("rememberMe")} cnLabel="text-[14px]   " />
						<Link href={ForgetPassword} className='h4 mt-5 text-primary1 underline cursor-pointer  ' > {t("forgotPassword")} </Link>
					</div>

					<Button isLoading={loading} dataAos="fade-up" onClick={()=> submit()} name={t("loginButton")}  classname="mt-[40px]"  />
				</div>
  		</LayoutAuth> )
}
