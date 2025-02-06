import Button from '@/components/atoms/button/Button';
import Calendar from '@/components/atoms/calendar/Calendar';
import Input from '@/components/atoms/input/Input';
import { ImgPlus } from '@/constants/imgs';
import { onEnter } from '@/helper/onEnter';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function GalleryHall({ KEY ,errors, submit, getValues, register, setValue, watch, trigger, step, setstep }) {
    const t = useTranslations();
    const [error , seterror] = useState()
    const [images, setImages] = useState([]);


    const handleGoToNextStep = () => {
        if(images?.length < 1){
            seterror("chooseOneImageAtLeast")
        }
        else {
            seterror(null)
            setstep(step + 1);
        }
    };

    useEffect(()=>{
        if(images?.length >=1 ){
            seterror(null)
        }
    } ,[images])

    onEnter(handleGoToNextStep);

    const handleReturn = e => {
        setstep(step - 1);
    };


    const handleImageChange = e => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => ({
            file,
            url: URL.createObjectURL(file),
        }));

        setImages(prevImages => {
            setValue(KEY , [...prevImages, ...newImages])
            return [...prevImages, ...newImages]
        });
        // setValue(KEY , images )
    };

    const removeImage = index => {
        setImages(prevImages => {
            setValue(KEY , prevImages.filter((_, i) => i !== index))
            return prevImages.filter((_, i) => i !== index)
        });
    };

    const watchKey = watch?.(KEY)
    useEffect(()=>{
        if(watchKey) { 
            setImages(watchKey) 
        }
    },[])

    return (
        <div className='w-full'>
            <div data-aos='fade-up' className='h2 text-center mt-[20px]  max-sm:mb-[20px] '>
                {t('detailsAboutHall')}
            </div>
            <div data-aos='fade-up' className='h4 text-secondry2 text-center mb-[40px] max-sm:mb-[20px] '>
                {t('addImage')}
            </div>

            <div data-aos="fade-up" className=' grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[40px] items-center '>
                {images.map((image, index) => (
                    <div key={index} className=' h-[160px] relative border-[1px] border-primary1 p-[10px] rounded-[4px] '>
                        <Image width={250} height={160} src={image.url} alt={`uploaded ${index}`} className='rounded-[4px] w-full h-full object-contain bg-gray-200 ' />
						<div onClick={() => removeImage(index)} className='cursor-pointer hover:border-[5px]  duration-200 border-[7px] border-white w-[35px] h-[35px] bg-primary1 rounded-[50%] flex items-center justify-center absolute right-[0px] top-[0px] ' > <X className=' text-white  w-[20px] h-[20px] ' /> </div>
                    </div>
                ))}

                {/* Add image button */}
                <label className=' h-[160px] cursor-pointer hover:opacity-80 duration-200 flex items-center gap-[5px] justify-center relative border-[1px] border-primary1 p-[10px] rounded-[4px]  w-full '>
                    <Image width={20} height={20} src={ImgPlus} alt={`uploaded`} className='' />
                    <span className='h4 text-primary1  ' > {t("addOneImage")} </span>
					<input type='file' accept='image/*' multiple onChange={handleImageChange} className='hidden' />
                </label>
            </div>

            {error && <div className="error mt-[10px] "> {t(error)} </div> }

            <Button width=' mx-auto max-w-[400px] w-full' dataAos='fade-up' onClick={handleGoToNextStep} classname='mt-[50px] ' name={t('containue')} />
            <Button width=' mx-auto max-w-[400px] w-full' dataAos='fade-up' onClick={handleReturn} classname='mt-[10px] ' outline={true} name={t('return')} />
        </div>
    );
}
