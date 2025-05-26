'use client';
import Image from 'next/image';
import { useState } from 'react';
import clsx from 'clsx';

export default function ImageWithSkeleton({ loading = false , src, alt = '', width, height, className = '', fallbackSrc = '/fallback.png', ...rest }) {


    return (
        <div className={clsx('relative overflow-hidden rounded-[30px] bg-[#eee] border border-[#eee]', loading && 'skeleton ', className)} >
            {!loading && <img  src={src} alt={alt} width={width} height={height} className={clsx('   object-cover h-full w-full transition-opacity duration-300', !loading ? 'opacity-100' : 'opacity-0')} />}
        </div>
    );
}
