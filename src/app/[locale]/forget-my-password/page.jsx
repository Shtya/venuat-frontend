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
	const {register, errors , trigger , clearErrors, setError, getValues, setValue, submit , watch, reset } = hookForgetPassword()

	const [step , setstep] = useState(0)

  return ( <LayoutAuth >
				<div className='max-w-[400px] mx-auto  w-full ' >
					{step == 0 && <Step1 step={step} setstep={setstep} register={register} submit={submit} errors={errors} />}
					{step == 1 && <VerifyIdentity step={step} setstep={setstep} /> }
					{step == 2 && <Step3 step={step} setstep={setstep} register={register} submit={submit} errors={errors} /> }

				</div>
  		</LayoutAuth> )
}
