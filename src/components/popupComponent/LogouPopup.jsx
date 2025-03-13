'use client';
import React from 'react';
import Button from '../atoms/button/Button';
import { useTranslations } from 'next-intl';

export default function LogoutPopup({ onClose, onClick }) {
    const t = useTranslations();

    return (
        <div className=''>

            <p className='text-gray-600 text-center mb-6'>{t('logoutMessage')}</p>
            <div className='flex justify-center items-center gap-4'>
                <Button  width='max-w-[300px] w-full !bg-red-500 rounded-full !border-red-500  hover:bg-red-200 cursor-pointer hover:bg-opacity-60 duration-200  ' onClick={onClick} name={t('logoutConfirm')} />
                <Button width='max-w-[300px] w-full' onClick={onClose} outline={true} name={t('logoutCancel')} />
            </div>
        </div>
    );
}
