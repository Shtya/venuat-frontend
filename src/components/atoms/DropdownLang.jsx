"use client"
import { ChevronDown, Globe } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useRouter , usePathname} from '../../navigation'
import { useLocale } from 'next-intl'



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
    <div ref={selectRef} className={`z-[10000] w-[50px] h-[40px] relative ${classname} `} onClick={_=> setShow(!show)} >
      <div className={`cursor-pointer flex items-center justify-between gap-[2px] h-full h3 font-semibold uppercase ${color} `}  >  {locale}   <ChevronDown className={`  ${show ? "rotate-[180deg]" : "rotate-[0deg]"} duration-200 w-[17px] `} />  </div>

      <ul className={` ${show ? "fixed" : "hidden"} overflow-hidden w-fit absolute  bg-white shadow-md border-[1px] border-gray1 rounded-[10px] top-[120%]  ${noDir ? noDir : "ltr:left-[0px] rtl:right-[0px] max-lg:rtl:translate-x-[-50%] max-lg:rtl:left-[50%] max-lg:ltr:translate-x-[50%] max-lg:ltr:right-[50%]"}`} >
        <li className='ar' onClick={_=> handleLanguageChange("ar") }> <Link className={styles.a}  href="" locale="ar" >  العربية  </Link> </li>
        <li className='en' onClick={_=> handleLanguageChange("en") }> <Link className={styles.a}  href="" locale="en" >  English </Link> </li>
      </ul>
    </div>
  )
}

export default DropLang