import Button from '@/components/atoms/button/Button'
import Calendar from '@/components/atoms/calendar/Calendar'
import Input from '@/components/atoms/input/Input'
import { onEnter } from '@/helper/onEnter'
import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'


export default function InformationAboutHall ({clearErrors , errors , submit , getValues , register , setValue , watch , trigger  , step , setstep }) {
	const t = useTranslations()
	const [file, setFile] = useState(null);
	const [preview, setPreview] = useState(null);
	const [fileIsRequired, setfileIsRequired] = useState(false);

	const handleImage = (e) => {
		const selectedFile = e.target.files[0];
		if (selectedFile) {
			setfileIsRequired(false)
			setFile(selectedFile);
			setPreview(URL.createObjectURL(selectedFile));
			setValue("mainImage" , selectedFile)
			setValue("mainImagePreview" , URL.createObjectURL(selectedFile))
		}
	};

	const watchPreview = watch("mainImagePreview") 
	useEffect(()=> {
		if(watchPreview) setPreview(watchPreview)
	}, [])

	const handleCancelImage = ()=>{
		setfileIsRequired(true)
		setPreview(null) 
		setFile(null)
		setValue("mainImage" , null)
	}


	const handleGoToNextStep = ()=>{
		!file ? setfileIsRequired(true) : setfileIsRequired(false)

		if (!preview || !getValues(`areaInMeters`)  || !getValues(`minPeople`)  || !getValues(`maxPeople`)  || !getValues(`openingTime`)  || !getValues(`closingTime`)  || !getValues(`price`)  ) {
			submit();
		} else {
			setstep(step + 1);
			clearErrors()
		}
	
	}
	onEnter(handleGoToNextStep)

	const handleReturn = (e)=> setstep(step - 1) 


	


  return (
	<div className='w-full' >
		<div data-aos="fade-up" className="h2 text-center mt-[20px] mb-[40px] max-sm:mb-[20px] "> {t("hallInfo")}  </div>
		
		<div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-x-[10px] gap-y-[30px] max-md:gap-y-[25px] ">
			<Input unite={t("meter")} register={register("areaInMeters")} error={errors?.areaInMeters} label={t("areaInMeters")}      KEY={"areaInMeters"}   type={"number"}   place={t("enterArea")}   dataAos="fade-up" cnInput="!border-[#DEE2E6] !border-[1px] " />
			<Input  register={register("minPeople")} error={errors?.minPeople} label={t("minPeople")}               KEY={"minPeople"}      type={"number"}   place={t("enterPeopleCount")}   dataAos="fade-up" cnInput="!border-[#DEE2E6] !border-[1px] " />
			<Input  register={register("maxPeople")} error={errors?.maxPeople} label={t("maxPeople")}               KEY={"maxPeople"}      type={"number"}   place={t("enterPeopleCount")}   dataAos="fade-up" cnInput="!border-[#DEE2E6] !border-[1px] " />
			<Calendar dataAos={"fade-up"} reverse={true} KEY="openingTime"  error={errors?.openingTime} setValue={setValue}  watch={watch} trigger={trigger} label={t("openingTime")} place={t("startsFrom")} classname={"w-full"} cnInput=" rounded-[8px] !h-[45px] !border-[#DEE2E6] !border-[1px] "  />
			<Calendar dataAos={"fade-up"} reverse={true} KEY="closingTime"  error={errors?.closingTime} setValue={setValue}  watch={watch} trigger={trigger} label={t("closingTime")} place={t("closesFrom")} classname={"w-full"} cnInput=" rounded-[8px] !h-[45px] !border-[#DEE2E6] !border-[1px] "  />
			<Input unite={t("currency")} register={register("price")} error={errors?.price}  label={t("price2")} KEY={"price"}  type={"number"}   place={t("enterPrice")}   dataAos="fade-up" cnInput="!border-[#DEE2E6] !border-[1px] " />

		</div>

		<div data-aos="fade-up">

			<div  className={`relative ${fileIsRequired && "border-red1 text-red1 "} w-full max-w-[500px] mx-auto mt-[50px] h5 border-[2px] border-[#DEE2E6] border-dotted h-[180px]  cursor-pointer hover:bg-[#DEE2E6] hover:bg-opacity-30 duration-200 rounded-[8px]`} >
				<label   htmlFor="upload" className={` cursor-pointer w-full h-full flex items-center justify-center`} >
					<input onChange={handleImage} className='hidden' type="file" name="" id="upload" />
					{preview 
						? <div className='w-full h-full relative' >
							<Image width={300} height={150} src={preview} alt="Selected preview" className=" p-[10px] w-full h-full object-contain " />
						</div>
						:<span className=' ' > {t("uploadHallImage")}  </span>
					}
				</label>
				{preview && <div onClick={handleCancelImage}  className=' z-[100] w-[30px] h-[30px] bg-primary1 rounded-[50%] flex items-center justify-center absolute right-[5px] top-[5px] ' > <X  className=' text-white  w-[20px] h-[20px] ' /> </div>}

			</div>
		</div >

		<Button width=" mx-auto max-w-[400px] w-full" dataAos='fade-up' onClick={handleGoToNextStep} classname='mt-[50px] ' name={t("containue")} />
		<Button width=" mx-auto max-w-[400px] w-full" dataAos='fade-up' onClick={handleReturn} classname='mt-[10px] ' outline={true} name={t("return")} />

	</div>
  )
}
