import Button from '@/components/atoms/button/Button'
import Checkbox from '@/components/atoms/checkbox/Checkbox'
import { services } from '@/Dummy/dummy'
import { onEnter } from '@/helper/onEnter'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'


export default function DetailsAboutHall ({errors , submit , getValues , register , setValue , watch , trigger  , step , setstep }) {
	const t = useTranslations()
	const vals = watch("details")

	const [error , setError] = useState()

	const handleGoToNextStep = ()=>{

		if(vals) {
			if(Object.keys(vals)?.length >= 1){
				setError(null)
				setstep(step + 1)
			}  
			else setError(t("youMustChooseAtone"))
		}
		else setError(t("youMustChooseAtone"))


	}

	onEnter(handleGoToNextStep)

	const handleReturn = (e)=>{
		setstep(step - 1)
	}




  return (
	<div className='w-full' >
		<div data-aos="fade-up" className="h2 text-center mt-[20px] max-sm:mb-[20px] "> {t("detailsAboutHall")}  </div>
		<div data-aos="fade-up" className="h4 text-secondry2 text-center mb-[40px] max-sm:mb-[20px] "> {t("genralInfo")}  </div>
		
                <div className='grid max-sm:grid-cols-1  grid-cols-3  gap-x-[100px] gap-y-[20px]  '>
                    {services.map((e, i) => (
                        <div data-aos="fade-up" key={i} className='  flex items-center justify-between gap-[10px]'>
                                <Checkbox watch={watch} cn='!mt-0' setValue={setValue}  KEY={`details.${e.name+i}`} label={t(e.name)} />
                         </div>
                    ))}
                </div>
				{error && <div className="error mt-[10px] "> {error} </div>}


		<Button width=" mx-auto max-w-[400px] w-full" dataAos='fade-up' onClick={handleGoToNextStep} classname='mt-[50px] ' name={t("containue")} />
		<Button width=" mx-auto max-w-[400px] w-full" dataAos='fade-up' onClick={handleReturn} classname='mt-[10px] ' outline={true} name={t("return")} />

	</div>
  )
}
