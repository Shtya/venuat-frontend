'use client';
import { hookSetting } from '@/hooks/hookSettings';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';

export default function Page() {
    const { data, loading } = hookSetting();
    const locale = useLocale();
	const t = useTranslations()

    return (
        <div className='container py-[80px] !max-w-[900px] '>
            <h1 className='h0 mt-[50px] text-center mb-[20px] '>{loading ? t("privacy1") : t("privacy2") }</h1>

            {loading ? (
                <div className='animate-pulse space-y-4'>
                    <div className='h-8 bg-gray-300 rounded-md w-1/3'></div>
                    <div className='h-6 bg-gray-300 rounded-md w-2/4'></div>
                    <div className='h-6 bg-gray-300 rounded-md w-3/4'></div>
                    <div className='h-6 bg-gray-300 rounded-md w-full'></div>
                    <div className='h-6 bg-gray-300 rounded-md w-5/6'></div>
                    <div className='h-6 bg-gray-300 rounded-md w-4/5'></div>
                </div>
            ) : (
                <div
                    dangerouslySetInnerHTML={{
                        __html: data?.settings?.dataPrivacy?.[locale] || '<p>No content available</p>',
                    }}></div>
            )}
        </div>
    );
}
