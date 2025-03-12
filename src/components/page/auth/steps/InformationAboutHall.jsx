import Button from '@/components/atoms/button/Button';
import Input from '@/components/atoms/input/Input';
import TextArea from '@/components/atoms/input/TextArea';
import TimePicker from '@/components/atoms/time-clock/Time';
import { onEnter } from '@/helper/onEnter';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

export default function InformationAboutHall({ previousStep , loading, errors, submit, register, setValue, watch, trigger }) {
    const t = useTranslations();
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = e => {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file)); // Set image preview
            setValue('file', file); // Update form value
            trigger('file'); // Validate input
        }
    };

    const handleCancelImage = () => {
        setPreview(null);
        setValue('file', null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reset input
        }
    };

    onEnter(submit);

    useEffect(() => {
        const ele = document.getElementById('layoutAuth');
        if (ele) {
            ele.style.maxWidth = '900px';
        }
    }, []);

    return (
        <div className='w-full' data-aos='fade-up'>
            <div data-aos='fade-up' className='h2 text-center mt-[20px] mb-[40px] max-sm:mb-[20px] '>
                {' '}
                {t('hallInfo')}{' '}
            </div>

            <div className='grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-x-[10px] gap-y-[30px] max-md:gap-y-[25px] '>
                <Input unite={t('meter')} register={register('areaInMeters')} error={errors?.areaInMeters} label={t('areaInMeters')} KEY={'areaInMeters'} type={'number'} place={t('enterArea')} cnInput='!border-[#DEE2E6] !border-[1px] ' />
                <Input register={register('minPeople')} error={errors?.minPeople} label={t('minPeople')} KEY={'minPeople'} type={'number'} place={t('enterPeopleCount')} cnInput='!border-[#DEE2E6] !border-[1px] ' />
                <Input register={register('maxPeople')} error={errors?.maxPeople} label={t('maxPeople')} KEY={'maxPeople'} type={'number'} place={t('enterPeopleCount')} cnInput='!border-[#DEE2E6] !border-[1px] ' />
                <TimePicker cnInput=' !w-full !text-[13px] placeholder:!text-[#646369] rounded-[8px] !h-[45px] !border-[#DEE2E6] !border-[1px] ' KEY={'openingTime'} error={errors?.openingTime} watch={watch} trigger={trigger} setValue={setValue} label={t('openingTime')} place={t('startsFrom')} />
                <TimePicker cnInput=' !w-full !text-[13px] placeholder:!text-[#646369] rounded-[8px] !h-[45px] !border-[#DEE2E6] !border-[1px] ' KEY={'closingTime'} error={errors?.closingTime} watch={watch} trigger={trigger} setValue={setValue} label={t('closingTime')} place={t('closesFrom')} />
                <Input unite={t('currency')} IconUnit={true}  register={register('price')} error={errors?.price} label={t('price2')} KEY={'price'} type={'number'} place={t('enterPrice')} cnInput='!border-[#DEE2E6] !border-[1px] ' />
            </div>

			<div className='max-w-[67%] mx-auto max-md:max-w-full w-full mt-[20px] ' >
				<TextArea register={register('description')} error={errors?.description} cnLabel={' !h5 mt-[20px]  '} cnInput={'!border-[#E1E6EF] !border-[1px] '} KEY='description.ar' label={t('descriptionHall')} place={t('EnterdescriptionHall')} />

			</div>
			


            {/* <div>
                <div className={`relative w-full max-w-[500px] mx-auto mt-[50px] h5 border-[2px] border-dotted h-[180px] cursor-pointer duration-200 rounded-[8px] flex items-center justify-center ${errors?.file?.message ? 'border-red-500 text-red-500' : 'border-gray-300 hover:bg-gray-200 hover:bg-opacity-30'}`}>
                    <label htmlFor='upload' className='cursor-pointer w-full h-full flex items-center justify-center'>
                        <input type='file' accept='image/png, image/jpeg' {...register('file', { onChange: handleFileChange })} ref={fileInputRef} className='hidden' id='upload' />

                        {preview ? (
                            <div className='w-full h-full relative'>
                                <Image width={300} height={150} src={preview} alt='Selected preview' className='p-[10px] w-full h-full object-contain' />
                            </div>
                        ) : (
                            <span>{t('uploadHallImage')}</span>
                        )}
                    </label>

                    {preview && (
                        <div onClick={handleCancelImage} className='absolute right-[5px] top-[5px] z-[100] w-[30px] h-[30px] bg-red-500 rounded-full flex items-center justify-center cursor-pointer'>
                            <X className='text-white w-[20px] h-[20px]' />
                        </div>
                    )}
                </div>
            </div> */}

            <Button width=' mx-auto max-w-[400px] w-full' isLoading={loading} onClick={submit} classname='mt-[50px] ' name={t('containue')} />
            <Button width=' mx-auto max-w-[400px] w-full' onClick={previousStep} classname='mt-[10px] ' outline={true} name={t('return')} />
        </div>
    );
}
