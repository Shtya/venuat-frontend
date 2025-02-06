import TextArea from '../../home/TextArea'
import { useTranslations } from 'next-intl'
import Checkbox from '@/components/atoms/checkbox/Checkbox'
import Button from '@/components/atoms/button/Button'

import { onEnter } from '@/helper/onEnter'
import React, { useEffect, useState } from 'react'



export default function AcceptConditions({watch , setstep , step , KEY  , setValue , }) {
	const t = useTranslations()

	const handleGoToNextStep = ()=>{
		setstep(step + 1)
	}


	const handleReturn = (e)=>{ setstep(step - 1) }

	const watchKey = watch?.(KEY)
	const [next , setnext] = useState(true)
	useEffect(()=> {
			setnext(!watchKey)
	} ,[watchKey])



  return (
	<div>
		<TextArea classname={"mt-0 !mb-[50px]  "}  title={t("titleCondition")} desc={t("descCondition")}  />
		<Checkbox  dataAos={"fade-up"}  watch={watch} cn='!mt-0' cnLabel={"text-secondry1 !font-[600] !h3  "}  setValue={setValue}  KEY={KEY} label={t("acceptCondition")} />
	

		<Button disabled={next} width=" mx-auto max-w-[400px] w-full" dataAos='fade-up' onClick={handleGoToNextStep} classname='mt-[50px] ' name={t("containue")} />
		<Button width=" mx-auto max-w-[400px] w-full" dataAos='fade-up' onClick={handleReturn} classname='mt-[10px] ' outline={true} name={t("return")} />
	</div>
  )
}
