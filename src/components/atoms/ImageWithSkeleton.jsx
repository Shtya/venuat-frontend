'use client';
import Image from 'next/image';
import { useState } from 'react';
import clsx from 'clsx';

export default function ImageWithSkeleton({ src, alt = '', width, height, className = '', fallbackSrc = '/fallback.png', ...rest }) {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    const handleLoad = () => {
		setLoaded(true);
	}
    const handleError = (e) => {
        setError(true);
        setLoaded(true); // Remove skeleton even on error
    };


    return (
        <div className={clsx('relative overflow-hidden rounded-[30px] bg-[#eee] border border-[#eee]', !loaded && 'skeleton ', className)} >
            <Image {...rest} src={src} alt={alt} width={width} height={height} onLoadingComplete={handleLoad} onError={handleError} className={clsx('   object-cover h-full w-full transition-opacity duration-300', loaded ? 'opacity-100' : 'opacity-0')} />
        </div>
    );
}
