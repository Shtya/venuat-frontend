"use client" 
import LayoutAuth from '@/components/molecules/layout/LayoutAuth'
import Step1 from '@/components/page/auth/forgetpassword/Step1'
import Step3 from '@/components/page/auth/forgetpassword/Step3'
import VerifyIdentity from '@/components/page/auth/steps/VerifyIdentity' 
import { hookSignUp } from '@/hooks/hookSignUp'
import { useTranslations } from 'next-intl' 
import React, { useState } from 'react'

export default function page() {
	const t = useTranslations()
	const { step, register, loading, errors, submit, handleStepChange , loadingCheckOTP , CheckCodeOTP , loadingMsgGmail , resendGmailMsg } = hookSignUp();
	// const [step , setstep] = useState(0)

  return ( <LayoutAuth >
				<div className='max-w-[400px] mx-auto  w-full ' >
					{step == 1 && <Step1 resendGmailMsg={resendGmailMsg} loading={loadingMsgGmail}  register={register} errors={errors} />}
					{step == 2 && <VerifyIdentity step={step} setstep={handleStepChange} /> }
					{step == 3 && <Step3 step={step} setstep={handleStepChange} register={register} submit={submit} errors={errors} /> }

				</div>
  		</LayoutAuth> )
}
