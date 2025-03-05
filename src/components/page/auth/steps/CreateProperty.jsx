import React, { useEffect, useRef, useState } from 'react';
import Input from '@/components/atoms/input/Input';
import Button from '@/components/atoms/button/Button';
import { useTranslations } from 'next-intl';
import { hookCity } from '@/hooks/hookCity';
import Select from '@/components/atoms/select/Select';
import TextArea from '@/components/atoms/input/TextArea';
import { translated } from '@/config/translateText';
import { Upload } from 'lucide-react';
import FileUpload from '@/components/atoms/FileUpload';

export default function CreateProperty({ previousStep , loading, watch, submit, errors, register , title, trigger , setValue }) {
    const t = useTranslations();
    const { loading: loadingCities, cities } = hookCity();

    useEffect(() => {
        const ele = document.getElementById('layoutAuth');
        if (ele) {
            ele.style.maxWidth = '600px';
        }
    }, []);



    return (
        <div className=''>
            <h2  data-aos="fade-up" className='text-2xl font-semibold text-center  text-primary1 mb-6'>{t(title)}</h2>

            <form data-aos="fade-up" >
                {/* City ID */}
                <Select KEY='city_id' error={errors?.city_id} setValue={setValue} watch={watch} trigger={trigger} data={cities} place={t('city')} label={t('city')} cnSelect=' px-[10px] rounded-[8px] !border-[#E1E6EF] !border-[1px] ' />
                <Input error={errors?.name} register={register('name')} KEY={'name'} cnInput='!border-[#E1E6EF] !border-[1px] ' classname='mt-[20px] ' type={'text'} label={t('nameProperty')} place={t('namePropertyPlaceholder')} />
                <TextArea register={register('description')} error={errors?.description} cnLabel={' !h5 mt-[20px]  '} cnInput={'!border-[#E1E6EF] !border-[1px] '} KEY='description.ar' label={t('descriptionProperty')} place={t('descriptionPropertyPlaceholder')} />

                {/* File Upload */}
                <FileUpload register={register} setValue={setValue} trigger={trigger} errors={errors} label={t('propertyImage')} />
                <Button isLoading={loading} width='max-w-[300px] w-full mx-auto ' onClick={submit} classname='mt-[50px] ' name={t('containue')} />
                <Button width='max-w-[300px] w-full mx-auto ' onClick={previousStep} classname='mt-[10px] ' outline={true} name={t('return')} />
            </form>
        </div>
    );
}
