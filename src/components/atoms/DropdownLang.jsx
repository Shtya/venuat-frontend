"use client"
import { ChevronDown, Globe, Globe2 } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useRouter , usePathname} from '../../navigation'
import { useLocale } from 'next-intl'



const DropLang = ( {classname , color , noDir} ) => {

  const locale = useLocale()
  const [show , setShow] = useState(false)

  const selectRef = useRef(null);
  useEffect(() => {
      const handleClickOutside = (event) => {
        if (selectRef.current && !selectRef.current.contains(event.target)) 
        setShow(false)
      }

    document.addEventListener('mousedown', handleClickOutside);
    return () =>  document.removeEventListener('mousedown', handleClickOutside);
    }, []);


  const router = useRouter();
	const pathname = usePathname();
  const handleLanguageChange = (language) => {
    const searchParams = new URLSearchParams(window.location.search);
    const queryString = searchParams.toString(); // Convert search params to a string
  
    const newPath = `${pathname}${queryString ? '?' + queryString : ''}`;
  
    router.push(newPath, { locale: language });
  };

  return (
    <div ref={selectRef} className={`z-[10000] cursor-pointer w-[50px] h-[40px] relative ${classname} `} onClick={_=> setShow(!show)} >
      <div 
        style={{direction : "ltr"}}
        onClick={_=> handleLanguageChange(locale == "ar" ? "en" : "ar" ) } 
        className={`cursor-pointer flex items-center  gap-[2px] h-full h3 font-semibold uppercase ${color} `}  >
        <Globe className='flex-none' size={20} />
        {locale}  
        </div>
    </div>
  )
}

export default DropLang