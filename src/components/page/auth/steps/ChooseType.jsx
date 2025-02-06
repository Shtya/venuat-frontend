import Button from '@/components/atoms/button/Button';
import Radio from '@/components/atoms/radio/Radio';
import { SignUpTypeOfClient } from '@/Dummy/dummy'
import { onEnter } from '@/helper/onEnter';
import { useTranslations } from 'next-intl';

import React, { useState } from 'react';

export default function ChooseType({getValues , setstep , setisClient , setValue }) {
	const t = useTranslations()
	const [type , settype ] = useState()

	const handleType = (e)=>{
		settype(e.value)
	}


	const [errorTypeClient , seterrorTypeClient ] = useState()

	const handleGoToNextStep = ()=>{
		const getValueOfTypeClient = getValues("typeClient")
		if(!getValueOfTypeClient){ seterrorTypeClient("errors.chooseTypeClient") }
		else{
			seterrorTypeClient(null)
			setisClient(type)
			setstep(2)  }
	}

	onEnter(handleGoToNextStep)

    return (
        <div className='max-w-[500px] w-full mx-auto ' >
            <Radio setError={seterrorTypeClient} onClick={handleType} data={SignUpTypeOfClient} setValue={setValue} KEY='typeClient' />
            {errorTypeClient && <div className='error'> {t(errorTypeClient)} </div>}
            <Button dataAos='fade-up'  onClick={handleGoToNextStep} classname='mt-[50px] ' name={t('completeYourData')} />
        </div>
    );
}
