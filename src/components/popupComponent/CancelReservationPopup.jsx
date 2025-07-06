'use client';
import React from 'react';
import Button from '../atoms/button/Button';
import { useTranslations } from 'next-intl';
import { AlertTriangle } from 'lucide-react';

export default function CancelReservationPopup({ onClose, onConfirm }) {
    const t = useTranslations();

    return (
        <div className='text-center'>
            <div className='mx-auto bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-4'>
                <AlertTriangle className='text-red-600' size={28} />
            </div>
            
            <h3 className='text-lg font-semibold text-gray-800 mb-2'>{t('cancelReservationTitle')}</h3>
            <p className='text-gray-600 mb-6'>{t('cancelReservationMessage')}</p>
            
            <div className='flex justify-center items-center gap-4'>
                <Button 
                    width='max-w-[140px] w-full' 
                    className='!bg-red-600 hover:!bg-red-700 !border-red-600'
                    onClick={onConfirm} 
                    name={t('confirmCancel')} 
                />
                <Button 
                    width='max-w-[140px] w-full' 
                    outline={true}
                    onClick={onClose} 
                    name={t('goBack')} 
                />
            </div>
        </div>
    );
}