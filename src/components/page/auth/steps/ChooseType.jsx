import Button from '@/components/atoms/button/Button';
import Radio from '@/components/atoms/radio/Radio';
import { SignUpTypeOfClient } from '@/Dummy/dummy'
import { onEnter } from '@/helper/onEnter';
import { useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';

import React, { useState } from 'react';

export default function ChooseType({getValues , setstep , setValue }) {
	const t = useTranslations()
	const router = useRouter()

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
			type == "provider" ? router.push("/sign-up/provider?step=1") : router.push("/sign-up/client?step=1")
		}
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
