import { useTranslations } from 'next-intl'
import React from 'react'

export default function NotFound({title}) {
	const t = useTranslations()

  return (
	<div className=' col-span-5 bg-neutral-50 border-[1px] border-dashed border-gray-50 w-full p-[40px] py-[70px]  ' >
		<h1 className=' text-gray-500 text-2xl text-center'>{t('no_data_available')}</h1>
	</div>
  )
}
