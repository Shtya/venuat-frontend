"use client" 
import LayoutAuth from '@/components/molecules/layout/LayoutAuth'
import Step1 from '@/components/page/auth/forgetpassword/Step1'
import Step3 from '@/components/page/auth/forgetpassword/Step3'
import VerifyIdentity from '@/components/page/auth/steps/VerifyIdentity' 
import { hookForgetPassword } from '@/hooks/hookForgetPassword'
import { useTranslations } from 'next-intl' 
import React, { useState } from 'react'

export default function page() {
	const t = useTranslations()
	// const { step, register, loading, errors, submit, handleStepChange , loadingCheckOTP , CheckCodeOTP , loadingMsgGmail , resendGmailMsg } = hookForgetPassword();
	const {  register, step , loading, errors, setstep, CheckCodeOTP ,resendGmailMsg, getValues, setValue, submit, watch, reset,  } = hookForgetPassword()

	console.log(step)
  return ( <LayoutAuth >
				<div className='max-w-[400px] mx-auto  w-full ' >
					{step == 1 && <Step1 submit={submit} loading={loading}  register={register} errors={errors} />}
					{step == 2 && <VerifyIdentity loading={loading} CheckCodeOTP={CheckCodeOTP} resendGmailMsg={resendGmailMsg} step={step} setstep={setstep} /> }
					{step == 3 && <Step3 loading={loading} register={register} submit={submit} errors={errors} /> }

				</div>
  		</LayoutAuth> )
}
