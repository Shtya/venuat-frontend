import { Upload } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useRef, useState } from 'react';

export default function FileUpload({label , register , setValue , trigger , errors }) {
	const t = useTranslations()

	const [fileName, setFileName] = useState(t("CHOOSE_FILE"));
    const fileInputRef = useRef(null);

	
    const handleFileChange = e => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            setValue('file', file);
            trigger('file');
        }
    };
    return (
        <div>
            <div className='mb-6  !h5 mt-[20px]  '>
                <label className='block text-sm font-medium text-gray-700 mb-2'>{label}</label>
                <div className=' relative  w-full '>
                    <Upload size={15} className=' absolute ltr:left-[10px]  rtl:right-[10px] top-[50%] translate-y-[-50%] ' />
                    <input type='text' className=' border border-gray-300 rounded-lg focus:outline-none focus:border-primary1 cursor-pointer ltr:pl-[30px] rtl:pr-[30px] h-[45px]  w-full' value={fileName} placeholder='Choose a file' readOnly onClick={() => fileInputRef.current?.click()} />
                    <input type='file' accept="image/png, image/jpeg, image/jpg, image/svg+xml" {...register('file', { onChange: handleFileChange })} ref={fileInputRef} className='hidden' />
                </div>
            </div>
            {errors?.file && <div className='error mt-[-15px] '> {t(errors?.file?.message)} </div>}
        </div>
    );
}
