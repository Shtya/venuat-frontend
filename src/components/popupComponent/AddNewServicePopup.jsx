"use client"
import React from 'react'
import Button from '../atoms/button/Button'
import Input from '../atoms/input/Input'
import Select from '../atoms/select/Select'
import { useTranslations } from 'next-intl'
import { hookCreateService } from '@/hooks/hookCreateService'

export default function AddNewServicePopup({onClose}) {
  const t = useTranslations()
  const { register, icons ,errors , trigger , loading , loadingService , clearErrors, setError, getValues, setValue, submit , watch, reset } = hookCreateService(onClose)


  return (
	<div>
    
    <div className='grid grid-cols-2 max-md:grid-cols-1 gap-y-[20px] gap-x-[30px] ' >
      <Input cnLabel={" text-[#000000] font-[700] "} register={register(`name`)} error={errors?.name} label={t("nameService")}     KEY={"name"}    type={"text"}   place={t("enterNameService")}   cnInput="!border-secondry3 !border-[1px] " />
      <Select loading={loading} cnLabel={" text-[#000000] font-[700] "} sendId={true} showIcons={true} KEY={`icon`} error={errors?.icon} setValue={setValue} watch={watch} trigger={trigger} data={icons} label={t('addImg')} place={t('chooseFromHere')}  cnSelect=' !h-[45px]  px-[10px] rounded-[8px] !border-[#646369] !border-[1px] ' />
      <Input cnLabel={" text-[#000000] font-[700] "}  register={register(`count`)} error={errors?.count} label={t("countService")}     KEY={"price"}                 type={"number"}   place={t("EntercountService")}   cnInput="!border-secondry3 !border-[1px] " />
      <Input cnLabel={" text-[#000000] font-[700] "} unite={t("sar")} register={register(`price`)} error={errors?.price} label={t("price2")}     KEY={"price"}                 type={"number"}   place={t("enterPrice")}   cnInput="!border-secondry3 !border-[1px] " />
    </div>

    <div className='flex justify-center flex-wrap items-center gap-[10px]  mt-[40px]' >
      <Button isLoading={loadingService} width="max-w-[300px] w-full !max-w-[200px]"  onClick={submit}  name={t('addService')} />
      <Button width="max-w-[300px] w-full !max-w-[200px] "  onClick={onClose} outline={true} name={t('return')} />

    </div>
        
  </div>
  )
}
