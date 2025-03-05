"use client"
import { ChevronDown, Globe, Globe2 } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useRouter , usePathname} from '../../navigation'
import { useLocale } from 'next-intl'
import Image from 'next/image'



const DropLang = ( {classname , color , noDir} ) => {

  const locale = useLocale()
  const [show , setShow] = useState(false)
  const styles = {
    a : " h4 hover:text-primary1 w-full  flex justify-center px-[20px] py-[5px] hover:bg-gray1 duration-100 transition-all "
  }

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
		router.push(pathname, { locale: language });
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