import TextArea from '../../home/TextArea'
import { useTranslations } from 'next-intl'
import Checkbox from '@/components/atoms/checkbox/Checkbox'
import Button from '@/components/atoms/button/Button'

import { onEnter } from '@/helper/onEnter'
import React, { useEffect, useState } from 'react'
import { hookPolicies } from '@/hooks/hookPolicies'



export default function AcceptConditions({previousStep , watch , loading : loadingPolicesSend ,  submit , KEY="accetpCondition"  , setValue }) {
	const t = useTranslations()
	const { policies , loading } = hookPolicies()
	onEnter(submit)

	const watchKey = watch?.(KEY)
	const [next , setnext] = useState(true)
	useEffect(()=> {
			setnext(!watchKey) 
			if(next){
				setValue("accetpCondition" , policies?.map((e,i)=> e?.id ) )
			}
		} ,[watchKey])


	useEffect(() => {
			const ele = document.getElementById('layoutAuth');
			if (ele) {
				ele.style.maxWidth = '900px';
			}
		}, []);


  return (
	<div data-aos="fade-up" >
		<TextArea policy={policies} loading={loading}  classname={"mt-0 !mb-[50px]  "}  title={t("titleCondition")} desc={t("descCondition")}  />
		<Checkbox  watch={watch} cn='!mt-0' cnLabel={"text-secondry1 !font-[600] !h3  "}  setValue={setValue}  KEY={KEY} label={t("acceptCondition")} />
	

		<Button isLoading={loadingPolicesSend} disabled={next} width=" mx-auto max-w-[400px] w-full"  onClick={submit} classname='mt-[50px] ' name={t("containue")} />
		<Button width=" mx-auto max-w-[400px] w-full"  onClick={previousStep} classname='mt-[10px] ' outline={true} name={t("return")} />
	</div>
  )
}
