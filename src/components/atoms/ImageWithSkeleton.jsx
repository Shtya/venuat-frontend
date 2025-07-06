// 'use client';
// import Image from 'next/image';
// import { useState } from 'react';
// import clsx from 'clsx';

// export default function ImageWithSkeleton({ loading = false , src, alt = '', width, height, className = '', fallbackSrc = '/fallback.png', ...rest }) {

//     return (
//         <div className={clsx('relative overflow-hidden rounded-[30px] bg-[#eee] border border-[#eee]', loading && 'skeleton ', className)} >
//             {!loading && <img  src={src} alt={alt} width={width} height={height} className={clsx('   object-cover h-full w-full transition-opacity duration-300', !loading ? 'opacity-100' : 'opacity-0')} />}
//         </div>
//     );
// }

'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { Expand, Eye, Maximize2 } from 'lucide-react'; // أيقونة العين للمعاينة

function filterImageProps(props) {
  const { loading, ...rest } = props;
  const validLoading = loading === 'lazy' || loading === 'eager' ? loading : undefined;
  return { ...rest, ...(validLoading ? { loading: validLoading } : {}) };
}

export default function ImageWithSkeleton({ src, alt = '', width, height, className = '', blurDataURL = '/placeholder.jpg', enablePreview = false, ...rest }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isValidSrc, setIsValidSrc] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    if (typeof src === 'string' && src.trim() !== '') {
      setIsValidSrc(true);
    } else {
      setIsValidSrc(false);
    }
  }, [src]);

  const safeProps = filterImageProps(rest);

  return (
    <>
      <div className={clsx('relative overflow-hidden rounded-[20px] bg-[#eee] border border-[#eee]', !isLoaded && 'animate-pulse', className)}>
        {isValidSrc && (
          <>
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              placeholder='blur'
              blurDataURL={blurDataURL}
              onLoadingComplete={() => setIsLoaded(true)}
              onError={() => {
                console.warn(`Error loading image: ${src}`);
                setIsLoaded(true);
              }}
              className={clsx('object-cover h-full w-full transition-all duration-500 ease-in-out', isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md')}
              priority
              {...safeProps}
            />

            {/* ✅ أيقونة المعاينة */}
            {enablePreview && (
              <button type='button' className='absolute top-2 right-2 shadow-inner p-2 bg-white/60 backdrop-blur-[200px] rounded-full hover:scale-105 transition' onClick={() => setIsPreviewOpen(true)}>
                <Maximize2 className='w-4 h-4 text-gray-900' />
              </button>
            )}
          </>
        )}
      </div>

       <AnimatePresence>
        {isPreviewOpen && (
          <motion.div className='fixed inset-0 z-[10000]  bg-black/70 backdrop-blur-sm flex items-center justify-center p-4' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsPreviewOpen(false)}>
            <motion.div
              className='relative  h-screen p-8 max-w-4xl w-full'
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()} // منع الإغلاق عند الضغط على الصورة نفسها
            >
              <img src={src} alt={alt} width={1200} height={800} className='rounded-xl w-full h-full object-contain ' />
              <button onClick={() => setIsPreviewOpen(false)} className=' w-[35px] h-[35px] duration-300 rounded-full flex items-center justify-center absolute top-3 right-3 text-white bg-black/50 hover:bg-black/70 '>
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
